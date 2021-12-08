<template>
  <input type="text" v-on:input="onInput" class="form-control" />
</template>
 
<script>
export default {
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  name: "inputComponent",
  methods: {
    onInput(e) {
      this.$emit("input", e.target.value);
    }
  }
};
</script>