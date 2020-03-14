<template>
  <header class="intro">
    <div class="box">
      <ButtonBack :to="back" v-if="back" />
      <h1 class="heading">{{ heading }}</h1>
    </div>
    <div class="actions">
      <slot></slot>
    </div>
  </header>
</template>

<script>
import ButtonBack from '@/components/atoms/ButtonBack'

export default {
  props: ['back', 'heading'],
  components: { ButtonBack }
}
</script>

<style lang="scss" scoped>
  .intro {
    align-items: center;
    background: $WHITE;
    border-bottom: 1px solid $GREY;
    display: flex;
    justify-content: space-between;
    padding: 24px 32px;
    position: sticky;
    top: 0;
    z-index: 8;

    @include mq($until: xsmall) {
      padding: 16px;
    }
  }

  .heading {
    font-size: 22px;
    font-weight: 900;
    line-height: 1.25;
    max-width: 330px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    @include mq($until: xsmall) {
      font-size: 18px;
      max-width: 160px;
    }
  }

  .button-back {
    margin-right: 16px;
  }

  .box {
    align-items: center;
    display: flex;
    justify-content: flex-start;
  }

  .actions {
    display: flex;
    justify-content: flex-end;

    &::v-deep > *:first-child:not(:last-child) {
      margin-right: 12px;
    }
  }
</style>
