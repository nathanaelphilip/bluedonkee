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
    font-size: 22px;
    font-weight: 900;
    margin-bottom: grid(8);

    @include mq ($until: small) {
      margin-bottom: grid(6);
      padding: 0 grid(6);
    }
  }

  .box {
    @include mq ($until: small) {
      border-bottom: 1px solid $GREY;
    }

    &:not(:last-child) {
      margin-bottom: grid(8);

      @include mq ($until: small) {
        margin-bottom: grid(0);
      }
    }
  }
</style>
