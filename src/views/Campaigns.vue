<template>
  <div>
    <Intro heading="Campaigns" />
    <div
      class="boxed"
      v-if="!closed"
      >
      <Banner
        @close="$cookies.set('banner:campaigns'); closed = true"
        heading="Pick a Race, Get Involved"
        content="Volunteer, knock doors, phone bank or apply for a job. Strengthening democracy is no joke. Its go time. #letsworkblue"
        :link="{name: 'questions'}"
        :items="$store.state.campaigns.repository"
      />
    </div>
    <Campaigns :campaigns="$store.getters['campaigns/sortAlphabetically']" />
    <BackTop />
  </div>
</template>

<script>
import BackTop from '@/components/molecules/BackTop'
import Banner from '@/components/molecules/Banner'
import Intro from '@/components/molecules/Intro'
import Campaigns from '@/components/molecules/Campaigns'

export default {
  name: 'views-campaigns',
  components: { BackTop, Banner, Campaigns, Intro },

  data () {
    return { closed: false }
  },

  async mounted () {
    if (this.$cookies.isKey('banner:campaigns')) {
      this.closed = true
    }

    if (!this.$store.state.offices.repository.length) {
      await this.$store.dispatch('offices/fetch')
    }

    await this.$store.dispatch('campaigns/fetch')
  }
}
</script>

<style lang="scss" scoped>
  .boxed {
    padding: 32px 36px 0 36px;
  }
</style>
