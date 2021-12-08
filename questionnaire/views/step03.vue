<template>
  <article class="questionnaire__article">
    <div class="questionnaire__title" v-html="this.stepData.main_title"></div>
    <figure class="questionnaireJr__figure" v-if="this.calculateAge === undefined">
      <birthdayCake />
    </figure>
    <figure class="questionnaireJr__figure" v-if="this.calculateAge !== undefined">
      <birdthdayBackground />
      <span class="questionnaireJr__figure__number">{{this.calculateAge}}</span>
    </figure>
    <transition name="fadeIn">
      <div class="questionnaire__answers" v-show="isVisible">
        <div class="questionnaire__title" v-html="this.stepData.answers_title"></div>
        <form class="form" @input="submit">
          <div class="form-group --dateOfBirth" @keydown.enter.prevent.self>
            <customInput v-model="$v.form.birthDay.$model" placeholder="DD" />
            <span class="--separator">-</span>
            <customInput v-model="$v.form.birthMonth.$model" placeholder="MM" class="--mm" />
            <span class="--separator">-</span>
            <customInput id="yearField" v-model="$v.form.birthyear.$model" placeholder="YYYY" />
          </div>
        </form>
      </div>
    </transition>
  </article>
</template>

<script>
import { required, between } from "vuelidate/lib/validators";
import customInput from "../components/input.vue";
import birthdayCake from "../icons/birthdayCake.vue";
import birdthdayBackground from "../icons/birdthdayBackground.vue";

export default {
  props: {
    questions: {
      type: Object,
      default: function() {
        return { steps: { step_3: {} } };
      }
    }
  },
  components: {
    customInput,
    birthdayCake,
    birdthdayBackground
  },
  data() {
    return {
      isVisible: false,
      stepData: this.questions.steps.step_3,
      form: {
        birthDay: null,
        birthMonth: null,
        birthyear: null,
        ageinNumber: 0
      }
    };
  },
  validations: {
    form: {
      birthDay: {
        required,
        between: between(1, 31)
      },
      birthMonth: {
        required,
        between: between(1, 12)
      },
      birthyear: {
        required,
        between: between(1900, new Date().getFullYear())
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
            birthDay: this.form.birthDay,
            birthMonth: this.form.birthMonth,
            birthyear: this.form.birthyear,
            nextStep: "/steps/06"
          },
          valid: !this.$v.$$invalid
        });
      }
    }
  },
  computed: {
    calculateAge() {
      var today_date = new Date();
      var today_year = today_date.getFullYear();
      var today_month = today_date.getMonth();
      var today_day = today_date.getDate();
      if (this.form.birthyear && this.form.birthyear.length === 4) {
        var age = today_year - this.form.birthyear;
      }

      if (today_month < this.form.birthMonth - 1) {
        age--;
      }
      if (
        this.form.birthMonth - 1 == today_month &&
        today_day < this.form.birthDay
      ) {
        age--;
      }
      if (age > 0) {
        this.form.ageinNumber = age;
        return age;
      }
    }
  }
};
</script>
