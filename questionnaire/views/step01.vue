<template>
  <article class="questionnaire__article">
    <div class="questionnaire__title" v-html="this.stepData.main_title"></div>
    <transition name="fadeIn">
      <div class="questionnaire__answers" v-show="isVisible">
        <div class="questionnaire__title" v-html="this.stepData.answers_title"></div>
        <form class="form" @input="submit" @keydown.enter.prevent.self>
          <div class="form-group">
            <customInput
              v-model="$v.form.firstName.$model"
              :placeholder="this.stepData.first_name_placeholder"
            />
            <div v-if="$v.form.firstName.$error" class="questionnaire__error">First name is required</div>
          </div>
          <div class="form-group">
            <customInput
              v-model="$v.form.lastName.$model"
              :placeholder="this.stepData.last_name_placeholder"
            />
            <div v-if="$v.form.lastName.$error" class="questionnaire__error">Last name is required</div>
          </div>
        </form>
      </div>
    </transition>
  </article>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import customInput from "../components/input.vue";
export default {
  props: {
    questions: {
      type: Object,
      default: function() {
        return { steps: { step_1: {} } };
      }
    }
  },
  components: {
    customInput
  },
  data() {
    return {
      isVisible: false,
      stepData: this.questions.steps.step_1,
      form: {
        firstName: null,
        lastName: null
      }
    };
  },
  validations: {
    form: {
      firstName: {
        required
      },
      lastName: {
        required
      }
    }
  },
  mounted() {
    this.fadeIn();
    this.enableNext(false);
  },
  methods: {
    enableNext(val) {
      this.$emit("enableNext", val);
    },
    fadeIn() {
      if (this.stepData.disable_answers_fade_in === "yes") {
        this.showContent();
      } else {
        setTimeout(() => this.showContent(), 3000);
      }
    },
    showContent() {
      this.isVisible = true;
      this.$emit("enableBack", true);
    },
    submit() {
      if (!this.$v.$invalid) {
        this.$emit("update", {
          data: {
            firstName: this.form.firstName,
            lastName: this.form.lastName,
            nextStep: "/steps/02"
          },
          valid: !this.$v.$$invalid
        });
      }
    }
  }
};
</script>
