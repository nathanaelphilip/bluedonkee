<template>
  <aside class="twitter">
    <div class="box">
      <h5 class="heading">Follow on Twitter</h5>
      <div class="action">
        <a href="https://twitter.com/@LetsWorkBlue" target="_blank">@LetsWorkBlue</a>
      </div>
    </div>
    <IconTwitter :width="25" :height="21" theme="blue" />
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
    background: $BLUELIGHT;
    display: grid;
    grid-template-columns: 1fr 25px;
    padding: 24px;
  }

  .heading {
    font-size: 18px;
    font-weight: 900;
    margin-bottom: 6px;
  }

  .action {
    color: $BLUE;
    font-size: 15px;
  }
</style>
