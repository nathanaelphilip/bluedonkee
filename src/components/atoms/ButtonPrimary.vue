<template>
  <button :disabled="disabled" :class="{button: true, full, simple}">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ['disabled', 'full', 'simple']
}
</script>

<style lang="scss" scoped>
  .button {
    @include ButtonPrimary;

    &.small {padding: 9px 12px;}
    &.large { padding-bottom: grid(5); padding-top: grid(5); }
    &.full {display: block; width: 100%}
    &.simple {background: none; border-color: transparent}
  }
</style>
