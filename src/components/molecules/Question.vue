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
  .question {
    background: $BLUELIGHT;
    border-radius: 12px;
    padding: 32px;
  }

  .heading {
    font-size: 28px;
    font-weight: 800;
    margin-bottom: 15px;
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
