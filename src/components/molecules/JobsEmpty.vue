<template>
  <aside class="jobs-empty">
    <div class="box">
      <h4 class="heading">Currently no jobs posted.</h4>
      <div class="content"><slot></slot></div>
    </div>
    <div class="action">
      <LinkPrimary :to="{name: 'postJob'}">Post Job</LinkPrimary>
    </div>
  </aside>
</template>

<script>
import LinkPrimary from '@/components/atoms/LinkPrimary'

export default {
  components: { LinkPrimary }
}
</script>

<style lang="scss" scoped>
  .jobs-empty {
    align-items: center;
    background: $BLUELIGHT;
    border-radius: 4px;
    border: 1px solid $GREY;
    display: grid;
    grid-template-columns: auto auto;
    grid-column-gap: 36px;
    justify-content: space-between;
    padding: 18px 24px;
  }

  .heading {
    font-size: 17px;
    font-weight: 800;
    margin-bottom: 5px;
  }

  .content {
    font-size: 15px;
  }
</style>
