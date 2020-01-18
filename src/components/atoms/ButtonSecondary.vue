<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
  .button {
    appearance: none;
    background: none;
    border: 1px solid $GREY;
    border-radius: 5px;
    display: inline-block;
    font-family: $INTER;
    font-weight: 600;
    padding: 10px 18px;
  }
</style>
