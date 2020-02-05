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
    <div class="column column-3">
      <div class="sticky-top">
        <slot name="three"></slot>
      </div>
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
    grid-template-columns: 1fr 2.25fr 1fr;

    @include mq($from: small) {
      grid-column-gap: 33px;
      margin: 0 auto;
      max-width: 1400px;
      width: 95%;
    }

    @include mq($until: small) {
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
    @include mq($until: small) {
     height: 100%;
     right: 0;
     position: fixed;
     transform: translateX(100%);
     top: 0;
     width: 100%;
    }
  }
</style>
