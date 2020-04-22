<template>
  <div class="question">
    <h3 @click.prevent="open = !open" class="heading">{{ question.fields.Heading }}</h3>
    <Markdown v-if="open" class="content" :content="question.fields.Content" />
  </div>
</template>

<script>
import Markdown from '@/components/molecules/Markdown'

export default {
  props: ['question'],
  components: { Markdown },
  data () {
    return {
      open: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .question {
    background: $BLUELIGHT;
    border-radius: 12px;
    padding: grid(6);
  }

  .heading {
    font-size: 22px;
    font-weight: 800;
  }

  .content {
    line-height: 1.5;
    margin-top: grid(4);

    &::v-deep p {
      font-size: 18px;

      &:not(:last-child) {
        margin-bottom: 1.5em;
      }
    }
  }
</style>
