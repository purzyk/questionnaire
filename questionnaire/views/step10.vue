<template>
  <article class="questionnaire__article">
    <div class="questionnaire__title" v-html="this.stepData.main_title"></div>
    <transition name="fadeIn">
      <div class="questionnaire__answers" v-show="isVisible">
        <div class="questionnaire__title" v-html="this.stepData.answers_title"></div>
        <form class="form" @input="submit">
          <div class="form-group" @keydown.enter.prevent.self>
            <customInput v-model="$v.form.email.$model" placeholder="Email address" />
          </div>
        </form>
        <div class="form-group text__section">
          <div class="text__section__wrapper">
            <p>
              Would you like a member of the team to contact you
              <br />to discuss your results?
            </p>

            <div class="pretty p-default p-round">
              <input
                @input="allowContactData('yes')"
                type="radio"
                name="radio1"
                id="one"
                value="yes"
                v-model="form.allowContact"
              />
              <div class="state">
                <label for="one">Yes</label>
              </div>
            </div>

            <div class="pretty p-default p-round">
              <input
                @input="allowContactData('no')"
                type="radio"
                name="radio2"
                id="two"
                value="no"
                v-model="form.allowContact"
              />
              <div class="state">
                <label for="two">No</label>
              </div>
            </div>
          </div>
        </div>
        <div class="form-group text__section">
          <div class="text__section__wrapper">
            <div class="pretty p-default p-checkbox">
              <input type="checkbox" @input="allowNewsletterData" />
              <div class="state --top">
                <label>
                  <p>Join our mailing list to get the latest news on our courses and activities{{this.form.mailingList}}</p>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </article>
</template>

<script>
import nationalitiesJson from "../assets/countries.json";
import { required, email } from "vuelidate/lib/validators";
import customInput from "../components/input.vue";
export default {
  props: {
    questions: {
      type: Object,
      default: function() {
        return { steps: { step_10: {} } };
      }
    }
  },
  components: {
    customInput
  },
  data() {
    return {
      isVisible: false,
      stepData: this.questions.steps.step_10,
      form: {
        email: null,
        allowContact: false,
        mailingList: false
      }
    };
  },
  validations: {
    form: {
      email: {
        required,
        email
      }
    }
  },
  mounted() {
    this.fadeIn();
    this.enableNext(false);
  },
  methods: {
    allowContactData(value) {
      this.$emit("allowContactData", value);
    },
    allowNewsletterData() {
      this.form.mailingList = !this.form.mailingList;
      this.$emit("allowNewsletterData", this.form.mailingList);
    },
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
            email: this.form.email,
            nextStep: "/steps/results"
          },
          valid: !this.$v.$$invalid
        });
      }
    }
  }
};
</script>
