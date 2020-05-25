<template>
  <button
    @click.prevent
    class="hamburger"
    :class="{'»active': $store.state.app.mobileNavOpen}"
    >
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
  </button>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  .hamburger {
    @include ButtonStripped;
    @include Flex ($align: stretch, $direction: column);
    border: 1px solid $GREY;
    border-radius: grid(1);
    height: grid(9);
    padding: grid(2.5) grid(2);
    width: grid(9);
  }

  .line {
    background: $BLACK;
    height: 2px;
    position: relative;

    $o: 6px;

    .hamburger.»active &:nth-child(1) {
      transform: rotate(45deg);
      top: $o;
    }

    .hamburger.»active &:nth-child(2) {
      opacity: 0;
    }

    .hamburger.»active &:nth-child(3) {
      transform: rotate(-45deg);
      top: -$o;
    }
  }
</style>
