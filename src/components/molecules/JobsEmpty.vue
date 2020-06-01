<template>
  <aside class="jobs-empty">
    <h4 class="heading">Currently no jobs posted.</h4>
    <LinkPrimary :to="{name: 'postJob'}">Post Job</LinkPrimary>
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
    display: grid;
    background: $BLUELIGHT;
    border-radius: grid(1);
    border: 1px solid $GREY;
    font-size: 16px;
    font-weight: 500;
    padding: grid(3) grid(4);
    grid-template-columns: 1fr auto;

    @include mq ($until: small) {
      align-items: stretch;
      grid-template-columns: 1fr;
      grid-row-gap: grid(3);
      padding: grid(4) grid(4);
      text-align: center;
    }
  }

  .heading { }

  .button {
    font-size: 15px;
  }
</style>
