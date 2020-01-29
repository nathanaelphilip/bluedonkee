<template>
  <section class="campaigns">
    <div
      v-for="campaign in campaigns"
      :key="campaign.id"
      class="box">
      <Campaign :campaign="campaign" />
    </div>
  </section>
</template>

<script>
import Campaign from '@/components/molecules/Campaign'

export default {
  props: ['campaigns'],
  components: { Campaign }
}
</script>

<style lang="scss" scoped>
  .box {
    padding: 25px 36px;

    &:not(:last-child) {
      border-bottom: 1px solid $GREY;
    }
  }
</style>
