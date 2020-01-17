<template>
  <div class="grid">
    <div class="column">
      <div class="sticky">
        <slot name="one"></slot>
      </div>
    </div>
    <div class="column">
      <slot name="two"></slot>
    </div>
    <div class="column">
      <div class="sticky">
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
    align-items: stretch;
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    grid-column-gap: 33px;
    margin: 0 auto;
    max-width: 1295px;
    min-height: 100vh;
  }

  .sticky {
    position: sticky;
    top: 0;
  }
</style>
