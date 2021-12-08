<template>
  <article class="questionnaire__article">
    <div class="questionnaire__title" v-html="this.stepData.main_title"></div>

    <div class="questionnaire__answers" v-show="isVisible">
      <div class="questionnaire__title" v-html="this.stepData.answers_title"></div>
      <form class="form">
        <div class="questionnaire__ageRange">
          <div class="questionnaire__ageRange__numbers">
            <span v-if="this.ageRange !== undefined && this.ageRange[0]">{{this.ageRange[0]}}</span>
            <span>to</span>
            <span v-if="this.ageRange !== undefined && this.ageRange[1]">{{this.ageRange[1]}}</span>
          </div>
          <vue-slider
            :tooltip="'none'"
            :min="12"
            :max="17"
            :height="11"
            :marks="true"
            :interval="1"
            :hide-label="true"
            v-on:change="submit"
            class="questionnaire__ageRange__rangeSlider"
            v-model="ageRange"
          ></vue-slider>
          <p class="questionnaire__ageRange__text --left">Youngest</p>
          <p class="questionnaire__ageRange__text --right">Oldest</p>
        </div>
      </form>
    </div>
  </article>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import VueRangeSlider from "vue-range-component";

export default {
  props: {
    questions: {
      type: Object,
      default: function() {
        return { steps: { step_5: {} } };
      }
    }
  },
  components: { VueRangeSlider },
  data() {
    return {
      isVisible: false,
      form: {
        ageYoungest: null,
        ageOldest: null
      },
      ageRange: [12, 17],
      stepData: this.questions.steps.step_5
    };
  },
  mounted() {
    this.fadeIn();
    this.submit();
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
      this.$emit("update", {
        data: {
          ageYoungest: this.ageRange[0],
          ageOldest: this.ageRange[1],
          nextStep: "/steps/06"
        }
      });
    }
  }
};
</script>
