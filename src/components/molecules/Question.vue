<template>
  <div class="question">
    <h3 @click.prevent="open = !open" class="heading">{{ question.fields.Heading }} <i class="plus"><IconPlus class="icon" width="10" height="10" /></i></h3>
    <Markdown v-if="open" class="content" :content="question.fields.Content" />
  </div>
</template>

<script>
import Markdown from '@/components/molecules/Markdown'

import IconPlus from '@/components/icons/Plus'

export default {
  props: ['question'],
  components: { IconPlus, Markdown },
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
    border: 1px solid transparent;
    border-radius: grid(3);
    padding: grid(6);

    @include mq ($until: xsmall) {
      padding: grid(3) grid(5);
    }

    &:hover {
      border: 1px solid $GREY3;
    }
  }

  .heading {
    @include Flex;
    font-size: 22px;
    font-weight: 800;

    @include mq ($until: xsmall) {
      font-size: 16px;
    }

    &:hover {
      cursor: pointer;
    }
  }

  .plus {
    @include Flex ($justify: center);
    $d: grid(9);
    border-radius: 100%;
    height: $d;
    width: $d;

    .heading:hover & {
      background: $GREY3;
    }
  }

  .icon {
    fill: $BLACK;
  }

  .content {
    @include Content;
    margin-top: grid(4);
  }
</style>
