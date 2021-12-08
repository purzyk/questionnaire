<template>
  <div>
    <div
      class="questionnaire__content questionnaire__start"
      v-bind:style="{ 'background-image': 'url('+ questions.start.startImage + ')' }"
    >
      <div class="container">
        <div class="row">
          <h1 v-html="questions.start.startTitle"></h1>
          <p class="copy" v-html="questions.start.startCopy"></p>
          <button class="button button--pink">
            <router-link to="/steps/01">{{this.questions.start.startButtonCopy}}</router-link>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  props: {
    questions: {
      type: Object,
      default: ""
    }
  }
};
</script>