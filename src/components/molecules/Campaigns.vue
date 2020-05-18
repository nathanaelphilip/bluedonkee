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
  }

  .box {
    @include mq ($until: small) {
      border-bottom: 1px solid $GREY;
    }
  }
</style>
