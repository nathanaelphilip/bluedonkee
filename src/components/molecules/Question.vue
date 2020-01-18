<template>
  <div class="question">
    <div class="emoji">{{ emoji }}</div>
    <h3 class="heading">{{ heading }}</h3>
    <div class="subheading" v-if="subheading">{{ subheading }}</div>
    <div class="content" v-html="content"></div>
  </div>
</template>

<script>
export default {
  props: [ 'emoji', 'heading', 'subheading', 'content' ]
}
</script>

<style lang="scss" scoped>
  .question {}
  .emoji {
    font-size: 40px;
    margin-bottom: 12px;
  }

  .heading {
    font-size: 28px;
    font-weight: 800;
    margin-bottom: 15px;
  }

  .subheading {
    color: $GREY2;
    font-size: 18px;
    margin-bottom: 22px;
  }

  .content {
    line-height: 1.5;

    &::v-deep p {
      &:not(:last-child) {
        margin-bottom: 1.5em;
      }
    }
  }
</style>
