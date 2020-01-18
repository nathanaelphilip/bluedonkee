<template>
  <header class="header">
    <div class="box">
      <h1 class="heading">{{ heading }}</h1>
    </div>
    <div class="actions">
      <slot></slot>
    </div>
  </header>
</template>

<script>
export default {
  props: ['heading']
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

  .actions {
    display: flex;
    justify-content: flex-end;

    > *:last-child {
      margin-left: 12px;
    }
  }
</style>
