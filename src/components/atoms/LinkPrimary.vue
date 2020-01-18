<template>
  <router-link :to="to" class="button">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: ['to']
}
</script>

<style lang="scss" scoped>
  .button {
    @include ButtonPrimary;
  }
</style>
