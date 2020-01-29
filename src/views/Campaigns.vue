<template>
  <div>
    <Intro heading="Campaigns" />
    <Campaigns :campaigns="$store.state.campaigns.repository" />
  </div>
</template>

<script>
import Intro from '@/components/molecules/Intro'
import Campaigns from '@/components/molecules/Campaigns'

export default {
  name: 'views-campaigns',
  components: { Campaigns, Intro },

  async mounted () {
    if (!this.$store.state.offices.repository.length) {
      await this.$store.dispatch('offices/fetch')
    }

    await this.$store.dispatch('campaigns/fetch')
  }
}
</script>

<style lang="scss" scoped>

</style>
