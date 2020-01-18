<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
  .button {
    @include ButtonPrimary;
  }
</style>
