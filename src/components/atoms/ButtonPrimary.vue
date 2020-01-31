<template>
  <button :class="{button: true, full, simple}">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ['full', 'simple']
}
</script>

<style lang="scss" scoped>
  .button {
    @include ButtonPrimary;

    &.full {display: block; width: 100%}
    &.simple {background: none; border-color: transparent}
  }
</style>
