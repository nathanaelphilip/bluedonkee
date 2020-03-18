<template>
  <div class="grid">
    <div class="column column-1">
      <div class="sticky-top">
        <slot name="one"></slot>
      </div>
    </div>
    <div class="column column-2">
      <slot name="two"></slot>
    </div>
    <div class="column column-3" :class="{'»open': $store.state.app.sidebar}">
      <div class="sticky-top">
        <slot name="three"></slot>
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
  .grid {
    display: grid;
    grid-template-columns: 250px 1fr 350px;

    @include mq($from: small) {
      grid-column-gap: 33px;
      margin: 0 auto;
      max-width: 1350px;
      width: 95%;
    }

    @include mq($until: large) {
     grid-template-columns: 93px 1fr 350px;
    }

    @include mq($until: medium) {
     grid-template-columns: 93px 1fr;
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
      top: 0;
    }
  }

  .column-1 {}

  .column-3 {
    @include mq($until: medium) {
      @include Flex($align: stretch, $justify: flex-end);
      height: 100%;
      right: 0;
      position: fixed;
      transform: translateX(100%);
      transition: transform .5s ease;
      top: 0;
      width: 100%;
      z-index: 11;
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
