<template>
  <div class="grid" :class="{'modal': $store.state.app.modalOpen}">
    <div class="column column-1">
      <slot name="one"></slot>
    </div>
    <div class="column column-2" :class="{'»open': $store.state.app.sidebar}">
      <div class="sticky-top">
        <slot name="two"></slot>
      </div>
      <button @click.prevent="$store.dispatch('app/sidebar', false)" class="close"></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'components-layouts-grid'
}
</script>

<style lang="scss" scoped>
  .modal {
    height: 100%;
    left: 0;
    overflow: hidden;
    position: fixed;
    top: 0;
    width: 100%;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 350px;

    @include mq($from: small) {
      @include Container;
      grid-column-gap: 55px;
    }

    @include mq($until: xsmall) {
     grid-template-columns: 1fr;
    }
  }

  .column {
    @include mq($from: xsmall) {
      min-height: 100vh;
      position: relative;
    }
  }

  .sticky-top {
    @include mq($from: xsmall) {
      padding-top: 36px;
      position: sticky;
      top: 120px;
    }
  }

  .column-1 {

  }

  .column-2 {
    @include mq($until: medium) {
      @include Flex($align: stretch, $justify: flex-end);
      height: 100%;
      right: 0;
      position: fixed;
      transform: translateX(100%);
      transition: transform .5s ease;
      top: 0;
      width: 100%;
      z-index: 12;
    }

    .sticky-top {
      @include mq($until: medium) {
        background: $WHITE;
        padding: grid(4);
        position: relative;
        width: 90%;
        z-index: 1
      }
    }

    &.»open {
      @include mq($until: medium) {
        transform: translateX(0);
      }
    }
  }

  .close {
    display: none;

    @include mq($until: medium) {
      background: rgba($BLACK, .15);
      border: none;
      display: block;
      padding: 0;
      position: absolute;
      left: 0%;
      opacity: 0;
      height: 100%;
      transition: opacity .2s 0s ease;
      top: 0;
      width: 100%;
      z-index: 0;

      .»open & {
        opacity: 1;
        transition-duration: 1s;
        transition-delay: .4s;
      }

      &:hover {cursor: pointer}
    }
  }
</style>
