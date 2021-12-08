<template>
  <article class="questionnaire__article">
    <div
      class="questionnaire__title"
      v-html="this.stepData.main_title"
      v-if="questionnaireData.individualOrGroup==='Group'"
    ></div>
    <div class="questionnaire__title" v-html="this.stepData.main_title_for_individual" v-else></div>
    <transition name="fadeIn">
      <div class="questionnaire__answers" v-show="isVisible">
        <div class="questionnaire__title" v-html="this.stepData.answers_title"></div>
        <form class="form">
          <div class="form-group --select" @keydown.enter.prevent.self>
            <v-select
              @input="pickAnswer"
              label="country"
              :options="nationalities"
              class="form-control"
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
        return { steps: { step_6: {} } };
      }
    },
    questionnaireData: {
      type: Object,
      required: true
    }
  },
  components: {
    customInput
  },
  data() {
    return {
      isVisible: false,
      stepData: this.questions.steps.step_6,
      nationalities: nationalitiesJson,
      selectedAnswer: null
    };
  },
  validations: {
    selectedAnswer: {
      required
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
    pickAnswer(answer) {
      this.selectedAnswer = answer.country;
      this.submit();
    },
    submit() {
      if (!this.$v.$invalid) {
        this.$emit("update", {
          data: {
            nextStep: "/steps/07",
            nationality: this.selectedAnswer
          },
          valid: !this.$v.$$invalid
        });
      }
    }
  }
};
</script>
