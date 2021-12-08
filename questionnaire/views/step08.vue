<template>
  <article class="questionnaire__article">
    <div class="questionnaire__title" v-html="this.stepData.main_title"></div>
    <div class="questionnaire__answers">
      <div class="questionnaire__title" v-html="this.stepData.answers_title"></div>
      <button
        @click="pickCountry(answer)"
        v-for="(answer,index) in countries"
        :key="index"
        :class="[{'--active': selectedCountry === answer.label},{'--img': answer.img}]"
        class="questionnaire__answer"
      >
        <figure v-if="answer.img">
          <img v-bind:src="answer.img" />
        </figure>
        {{answer.label}}
      </button>
    </div>
    <div class="questionnaire__answers">
      <template v-if="countryIndex != -1">
        <button
          @click="pickCity(option)"
          class="questionnaire__answer"
          :class="{'--active': selectedCity === option}"
          :key="option"
          v-for="option in countries[countryIndex].cities"
        >{{ option }}</button>
      </template>
    </div>
  </article>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  props: {
    questions: {
      type: Object,
      default: function() {
        return { steps: { step_8: {} } };
      }
    },
    questionnaireData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      stepData: this.questions.steps.step_8,
      isVisible: false,
      selectedAnswer: null,
      countryIndex: -1,
      selectedCity: null,
      selectedCountry: null,
      searchCountryName: null,
      searchSelectedFlagUrl: null,
      countries: [
        {
          countryIndex: 0,
          label: "USA",
          searchCountryName: "United States",
          img: this.questions.steps.step_8.usa_flag,
          cities: ["San Diego"],
          allAreas: false
        },
        {
          countryIndex: 1,
          label: "UK",
          searchCountryName: "United Kingdom",
          img: this.questions.steps.step_8.uk_flag,
          cities: ["Oxford", "London", "Brighton"],
          allAreas: false
        },
        {
          countryIndex: 2,
          label: "Canada",
          searchCountryName: "Canada",
          img: this.questions.steps.step_8.canada_flag,
          cities: ["Toronto", "Vancouver"],
          allAreas: false
        },
        {
          countryIndex: 3,
          label: "Not sure",
          searchCountryName: "allAreas",
          img: this.questions.steps.step_8.not_sure_flag,
          allAreas: false,
          value: "not-sure"
        }
      ]
    };
  },
  validations: {
    selectedCity: {
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
    pickCountry(answer) {
      this.$emit("enableNext", false);
      this.countryIndex = answer.countryIndex;
      this.selectedCountry = answer.label;
      this.selectedCity = null;
      this.searchCountryName = answer.searchCountryName;
      this.searchSelectedFlagUrl = answer.img;
      if (this.searchCountryName === "allAreas") {
        this.searchCountryName = this.searchCountryName;
        this.selectedCity = this.searchCountryName;
        this.submit();
      }
    },
    pickCity(option) {
      this.selectedCity = option;
      this.submit();
    },
    submit() {
      if (!this.$v.$invalid) {
        this.$emit("update", {
          data: {
            nextStep: "/steps/09",
            selectedCountry: this.selectedCountry,
            selectedCity: this.selectedCity,
            searchCountryName: this.searchCountryName,
            searchSelectedFlagUrl: this.searchSelectedFlagUrl
          },
          valid: !this.$v.$$invalid
        });
      }
    }
  }
};
</script>
