<template>
  <header class="header">
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
  .header {
    align-items: center;
    border-bottom: 1px solid $GREY;
    display: flex;
    justify-content: space-between;
    padding: 24px 32px;
  }

  .heading {
    font-size: 22px;
    font-weight: 900;
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

    > *:first-child {
      margin-right: 12px;
    }
  }
</style>
