<template>
  <button
    class="questionnaire__answer"
    v-on:click="pickAnswer(answer)"
    :class="[{'--img': answer.icon}]"
  >
    <figure v-if="answer.icon && isPNG(answer.icon)">
      <img v-bind:src="answer.icon" />
    </figure>
    <figure v-if="answer.icon && isSVG(answer.icon)">
      <simple-svg :src="answer.icon" />
    </figure>
    {{answer.answer}}
  </button>
</template>
 
<script>
export default {
  props: {
    answer: {
      type: Object,
      default: ""
    }
  },
  name: "buttonComponent",
  methods: {
    pickAnswer: function(answer) {
      this.$emit("select", answer);
    },
    isPNG(filename) {
      return /\.png$/i.test(filename);
    },
    isSVG(filename) {
      return /\.svg$/i.test(filename);
    }
  }
};
</script>