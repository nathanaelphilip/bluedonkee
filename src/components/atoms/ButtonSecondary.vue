<template>
  <button :disabled="disabled" class="button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ['disabled']
}
</script>

<style lang="scss" scoped>
  .button {
    @include ButtonSecondary;

    &.small { padding: 10px 12px; }
  }
</style>
