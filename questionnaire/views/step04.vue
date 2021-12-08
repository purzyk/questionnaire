<template>
  <article class="questionnaire__article">
    <div class="questionnaire__title" v-html="this.stepData.main_title"></div>
    <figure class="questionnaireJr__figure">
      <groupOne v-if="form.numberOfStudents < 2" />
      <groupThree v-if="form.numberOfStudents >= 2" />
      <groupExtraLeft class="--groupExtraLeft" v-if="form.numberOfStudents > 5" />
      <groupExtraRight class="--groupExtraRight" v-if="form.numberOfStudents > 5" />
    </figure>

    <transition name="fadeIn">
      <div class="questionnaire__answers" v-show="isVisible">
        <div class="questionnaire__title" v-html="this.stepData.answers_title"></div>
        <form class="form" @input="submit">
          <div class="form-group --howMany" @keydown.enter.prevent.self>
            <customInput v-model="$v.form.numberOfStudents.$model" />
          </div>
        </form>
      </div>
    </transition>
  </article>
</template>

<script>
import { required, between } from "vuelidate/lib/validators";
import customInput from "../components/input.vue";
import groupOne from "../icons/groupOne.vue";
import groupThree from "../icons/groupThree.vue";
import groupExtraLeft from "../icons/groupExtraLeft.vue";
import groupExtraRight from "../icons/groupExtraRight.vue";

export default {
  props: {
    questions: {
      type: Object,
      default: function() {
        return { steps: { step_4: {} } };
      }
    }
  },
  components: {
    customInput,
    groupOne,
    groupThree,
    groupExtraLeft,
    groupExtraRight
  },
  data() {
    return {
      isVisible: false,
      stepData: this.questions.steps.step_4,
      form: {
        numberOfStudents: null
      }
    };
  },
  validations: {
    form: {
      numberOfStudents: {
        required,
        between: between(1, 100)
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
            numberOfStudents: this.form.numberOfStudents,
            nextStep: "/steps/05"
          },
          valid: !this.$v.$$invalid
        });
      }
    }
  }
};
</script>
