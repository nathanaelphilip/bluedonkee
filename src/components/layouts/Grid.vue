<template>
  <div class="grid">
    <div class="column">
      <div class="sticky-top">
        <slot name="one"></slot>
      </div>
      <div class="sticky-bottom">
        <slot name="four"></slot>
      </div>
    </div>
    <div class="column">
      <slot name="two"></slot>
    </div>
    <div class="column">
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
    grid-template-columns: 1fr 3fr 1fr;
    grid-column-gap: 33px;
    margin: 0 auto;
    max-width: 1295px;
  }

  .column { min-height: 100vh; position: relative; }

  .sticky-bottom {
    bottom: 36px;
    position: fixed;
  }

  .sticky-top {
    padding-top: 36px;
    position: sticky;
    top: 0;
  }
</style>
