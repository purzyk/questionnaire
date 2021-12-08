<template>
  <div class="questionnaire__content questionnaire__steps">
    <div class="container">
      <div class="row">
        <transition name="slide">
          <router-view
            :questionnaire-data="form"
            @enableBack="enableBack"
            @update="processStep"
            :questions="questions"
            @enableNext="enableNext"
            @allowContactData="allowContactData"
            @allowNewsletterData="allowNewsletterData"
          ></router-view>
        </transition>
      </div>
    </div>
    <div class="questionnaire__buttons">
      <div class="questionnaire__buttons__wrapper">
        <button class="questionnaire__button --prev" :disabled="!canGoBack" @click="goBack">Back</button>
        <button class="questionnaire__button --next" :disabled="!canGoNext" @click="goNext">Next</button>
      </div>
    </div>
  </div>
</template>
 
<script>
import axios from "axios";
export default {
  props: {
    questions: {
      type: Object,
      default: ""
    }
  },
  data() {
    return {
      steps: ["Question01"],
      currentStepNumber: 1,
      canGoNext: false,
      nextUrl: "/results",
      canGoBack: false,
      centresUrl: this.questions.apiCentres,
      form: {
        centres: [],
        email: null,
        nextStep: null,
        firstName: null,
        lastName: null,
        birthDay: null,
        birthMonth: null,
        birthyear: null,
        numberOfStudents: null,
        ageYoungest: null,
        ageOldest: null,
        individualOrGroup: null,
        nationality: null,
        timeOfYear: null,
        selectedCity: null,
        selectedCountry: null,
        allowContact: false,
        mailingList: false,
        countryOfResidence: null,
        searchCountryName: null,
        searchSelectedFlagUrl: null
      }
    };
  },
  created: function() {
    this.getCentresRequest();
  },
  methods: {
    getCentresRequest: function() {
      axios
        .get(this.centresUrl)
        .then(response => {
          this.form.centres = response.data;
        })
        .catch(function(error) {})
        .finally(() => (this.isWorking = false));
    },
    enableNext(val) {
      this.canGoNext = val;
    },
    allowContactData(val) {
      this.form.allowContact = val;
    },
    allowNewsletterData(val) {
      this.form.mailingList = val;
    },
    enableBack(val) {
      this.canGoBack = val;
    },
    processStep(step) {
      Object.assign(this.form, step.data);
      this.canGoNext = true;
    },
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    goNext() {
      this.$router.push(this.form.nextStep);
    }
  }
};
</script>  