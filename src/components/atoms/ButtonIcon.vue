<template>
  <button
    @click.prevent
    class="button-icon"
    :class="{'»active': $store.state.app.mobileNavOpen}"
    >
    <slot></slot>
  </button>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  .button-icon {
    @include ButtonStripped;
    @include Flex ($justify: center);
    border: 1px solid $GREY;
    border-radius: grid(1);
    height: grid(9);
    padding: grid(2.5) grid(2);
    width: grid(9);
  }
</style>
