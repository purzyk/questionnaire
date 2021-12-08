<template>
  <article
    class="questionnaire__article --top --results"
    id="template_invoice"
    v-loader="isWorking"
  >
    <header class="questionnaire__article__header">
      <div class="col-lg-10 mx-auto">
        <h1 class="heroBanner__listing__heading">
          We found {{filteredCentres.length}}
          <span v-if="filteredCentres.length===1">course</span>
          <span v-else>courses</span>
          tailored to you
        </h1>
        <div
          class="heroBanner__listing__text"
        >Scroll down to find out about the different courses we have selected for you</div>
      </div>
      <div class="header__buttons">
        <a
          class="header__button whatsapp is-loading"
          target="_blank"
          href="#"
          data-action="share/whatsapp/share"
        >
          Share via Whatsapp
          <span class="header__button__loader">
            <span class="header__button__spinner"></span>
          </span>
        </a>
        <a class="header__button pdf is-loading" href="#">
          Download PDF
          <span class="header__button__loader">
            <span class="header__button__spinner"></span>
          </span>
        </a>
      </div>
    </header>
    <div class="loading" v-if="isWorking">
      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div v-else class="choice row results results__wrapper">
      <div
        class="col-md-4 grid-item"
        v-for="post in filteredCentres"
        v-bind:key="post.id"
        :data-rel="post.product_categories"
      >
        <div class="listing__item">
          <div class="listing__item__single">
            <a :href="post.permalink" target="_blank">
              <div
                class="listing__item__single__thumbnail"
                :style="{
    backgroundImage: 'url(\'' + post.featured_img_src + '\')',
    backgroundPosition: 'center center',
    backgroundSize: 'cover'
    }"
              >
                <div
                  v-if="questionnaireData.searchSelectedFlagUrl"
                  class="listing__item__single__thumbnail__flag"
                  :style="{
    backgroundImage: 'url(\'' + questionnaireData.searchSelectedFlagUrl + '\')',
    backgroundPosition: 'center center',
    backgroundSize: 'cover'
    }"
                ></div>
              </div>
            </a>
            <div class="listing__item__single__desc">
              <div>
                <h3>{{post.title}}</h3>
              </div>
              <div>
                <a :href="post.permalink" target="_blank">
                  find out more
                  <arrowRight />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>
<script>
import { required } from "vuelidate/lib/validators";
import arrowRight from "../icons/arrowRight.vue";
import axios from "axios";
import queryString from "qs";

export default {
  props: {
    questions: {
      type: Object,
      apiCentres: Object
    },
    questionnaireData: {
      type: Object,
      required: true
    }
  },
  components: {
    arrowRight
  },
  data() {
    return {
      isWorking: true,
      isError: false
    };
  },
  mounted: function() {
    this.enableNext(false);
    this.addUser();
  },
  created: function() {
    this.generateAndSendPDF();
  },
  computed: {
    filteredCentres: function() {
      this.isWorking = false;
      const searchSeason = this.questionnaireData.timeOfYear;
      const searchArea = this.questionnaireData.searchCountryName;
      return this.questionnaireData.centres.filter(function(filter_post) {
        return (
          filter_post.seasons.indexOf(searchSeason) !== -1 &&
          filter_post.areas.indexOf(searchArea) !== -1
        );
      });
    }
  },
  methods: {
    addUser() {
      const data = {
        action: "add_user_to_mailchimp_list",
        email: this.questionnaireData.email,
        firstName: this.questionnaireData.firstName,
        lastName: this.questionnaireData.lastName
      };
      if (this.questionnaireData.mailingList === true) {
        axios.post(window.THEME.ajax_url, queryString.stringify(data));
      }
    },
    generateAndSendPDF() {
      const data = {
        action: "generate_pdf",
        results: this.filteredCentres.map(item => item.id),
        email: this.questionnaireData.email
      };

      axios
        .post(window.THEME.ajax_url, queryString.stringify(data))
        .then(function(response) {
          const whatsappButton = document.querySelector(
            ".header__button.whatsapp"
          );
          const downloadButton = document.querySelector(".header__button.pdf");

          whatsappButton.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(
            response.data.data.file
          )}`;
          whatsappButton.classList.remove("is-loading");

          downloadButton.href = response.data.data.file;
          downloadButton.download = response.data.data.file_name;
          downloadButton.classList.remove("is-loading");
        });
    },
    enableNext(val) {
      this.$emit("enableNext", val);
    }
  }
};
</script>