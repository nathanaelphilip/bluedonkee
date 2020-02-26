<template>
  <div class="question">
    <h3 class="heading">{{ question.fields.Heading }}</h3>
    <Markdown class="content" :content="question.fields.Content" />
  </div>
</template>

<script>
import Markdown from '@/components/molecules/Markdown'

export default {
  props: [ 'question' ],
  components: { Markdown }
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
