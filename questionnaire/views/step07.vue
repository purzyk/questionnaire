<template>
  <article class="questionnaire__article">
    <div class="questionnaire__title" v-html="this.stepData.main_title"></div>
    <transition name="fadeIn">
      <div class="questionnaire__answers" v-show="isVisible">
        <div class="questionnaire__title" v-html="this.stepData.answers_title"></div>
        <customButton
          v-for="answer in this.stepData.question_answers"
          :key="answer.answer"
          :answer="answer"
          @select="pickAnswer"
          :class="[{'--active': selectedAnswer === answer}]"
        ></customButton>
      </div>
    </transition>
  </article>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import customButton from "../components/button.vue";
export default {
  props: {
    questions: {
      type: Object,
      default: function() {
        return { steps: { step_7: {} } };
      }
    },
    questionnaireData: {
      type: Object,
      required: true
    }
  },
  components: {
    customButton
  },
  data() {
    return {
      stepData: this.questions.steps.step_7,
      isVisible: false,
      selectedAnswer: null,
      timeOfYear: null
    };
  },
  validations: {
    selectedAnswer: {
      required
    }
  },
  created: function() {
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

    pickAnswer(answer) {
      this.selectedAnswer = answer;
      this.timeOfYear = answer.time_of_year.name;
      if (answer.notSure === true) {
        this.timeOfYear = "notSure";
      }
      this.submit();
    },

    submit() {
      if (!this.$v.$invalid) {
        this.$emit("update", {
          data: {
            nextStep: "/steps/08",
            timeOfYear: this.timeOfYear
          },
          valid: !this.$v.$$invalid
        });
      }
    }
  }
};
</script>
