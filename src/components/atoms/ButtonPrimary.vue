<template>
  <button :class="{button: true, full}">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ['full']
}
</script>

<style lang="scss" scoped>
  .button {
    @include ButtonPrimary;

    &.full {display: block; width: 100%}
  }
</style>
