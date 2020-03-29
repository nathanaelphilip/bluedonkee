<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
  .button {
    @include ButtonSecondary;

    &.small { padding: 10px 12px; }
  }
</style>
