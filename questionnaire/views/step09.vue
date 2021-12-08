<template>
  <article class="questionnaire__article">
    <div class="questionnaire__title" v-html="this.stepData.main_title"></div>
    <transition name="fadeIn">
      <div class="questionnaire__answers" v-show="isVisible">
        <div class="questionnaire__title" v-html="this.stepData.answers_title"></div>
        <form class="form">
          <div class="form-group --select" @keydown.enter.prevent.self>
            <v-select
              @input="submit"
              v-model="$v.form.countryOfResidence.$model"
              label="country"
              :options="countries"
              class="form-control --globe"
              placeholder="Please select"
            ></v-select>
          </div>
        </form>
      </div>
    </transition>
  </article>
</template>

<script>
import nationalitiesJson from "../assets/countries.json";
import { required } from "vuelidate/lib/validators";
import customInput from "../components/input.vue";
export default {
  props: {
    questions: {
      type: Object,
      default: function() {
        return { steps: { step_9: {} } };
      }
    }
  },
  components: {
    customInput
  },
  data() {
    return {
      isVisible: false,
      stepData: this.questions.steps.step_9,
      countries: nationalitiesJson,
      form: {
        countryOfResidence: null
      }
    };
  },
  validations: {
    form: {
      countryOfResidence: {
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
            nextStep: "/steps/10",
            countryOfResidence: this.form.countryOfResidence
          },
          valid: !this.$v.$$invalid
        });
      }
    }
  }
};
</script>
