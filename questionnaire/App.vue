<template>
  <section class="questionnaire__main questionnaireJr">
    <div class="flexboxIe11Wrap">
      <router-view :questions="questions"></router-view>
    </div>
  </section>
</template>
 
<script>
export default {
  props: {
    questions: {
      type: Object,
      default: ""
    }
  },
  name: "questionnaire"
};
</script>