<template>
  <aside class="twitter">
    <div class="icon">
      <IconTwitter :width="25" :height="21" theme="blue" />
    </div>
    <div class="box">
      <h5 class="heading">Follow on Twitter</h5>
      <div class="action">
        <a href="https://twitter.com/@WorkBlueOrg" target="_blank">@WorkBlueOrg</a>
      </div>
    </div>
  </aside>
</template>

<script>
import IconTwitter from '@/components/icons/Twitter'

export default {
  components: { IconTwitter }
}
</script>

<style lang="scss" scoped>
  .twitter {
    align-items: center;
    background: $BLUELIGHT;
    border-radius: grid(2);
    display: grid;
    grid-template-columns: grid(12) 1fr;
    grid-column-gap: grid(3);
    padding: grid(4);
  }

  .icon {
    $d: 48px;
    @include Flex($justify: center);
    background: $WHITE;
    border: 1px solid $GREY;
    border-radius: 100%;
    height: $d;
    width: $d;
  }

  .heading {
    font-weight: 600;
    margin-bottom: 6px;
  }

  .action {
    color: $BLUE;
    font-size: 14px;
    font-weight: 400;
  }
</style>
