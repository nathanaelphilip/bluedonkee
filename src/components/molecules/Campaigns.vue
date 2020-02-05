<template>
  <section class="campaigns">
    <h3 v-if="heading" class="heading">{{ heading }}</h3>
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
  props: ['heading', 'campaigns'],
  components: { Campaign }
}
</script>

<style lang="scss" scoped>
  .heading {
    font-size: 18px;
    font-weight: 900;
    margin-bottom: 5px;
    padding: 0 36px;
  }

  .box {
    padding: 25px 36px;

    &:not(:last-child) {
      border-bottom: 1px solid $GREY;
    }
  }
</style>
