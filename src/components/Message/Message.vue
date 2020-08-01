<template>
  <div class="message">
    <p class="message__text">Message Component - {{ message }}</p>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
      default: 'default message',
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./Message.module.scss";
</style>