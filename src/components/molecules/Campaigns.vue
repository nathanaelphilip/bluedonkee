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
    padding: 0 32px;

    @include mq ($until: small) {
      padding: 0px 16px;
    }
  }

  .box {
    padding: 24px 36px;

    @include mq ($until: small) {
      padding: 24px 16px;
    }

    &:not(:last-child) {
      border-bottom: 1px solid $GREY;
    }
  }
</style>
