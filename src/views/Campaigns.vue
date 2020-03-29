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
        content="Volunteer, knock doors, phone bank or apply for a job. Its go time. #letsworkblue"
        :link="{name: 'questions'}"
        :items="$store.state.campaigns.repository"
      />
    </div>
    <Campaigns :campaigns="$store.getters['campaigns/getFetched']('campaigns')" />
    <Pager
      @load="load"
      :loading="$store.state.campaigns.loading === 'campaigns'"
      v-if="$store.getters['campaigns/getOffset']('campaigns')"
    />
    <BackTop v-if="!$store.getters['campaigns/getOffset']('campaigns')" />
  </div>
</template>

<script>
import BackTop from '@/components/molecules/BackTop'
import Banner from '@/components/molecules/Banner'
import Intro from '@/components/molecules/Intro'
import Campaigns from '@/components/molecules/Campaigns'
import Pager from '@/components/molecules/Pager'

const pageSize = 20

export default {
  name: 'views-campaigns',
  components: {
    BackTop,
    Banner,
    Campaigns,
    Intro,
    Pager
  },

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

    if (!this.$store.getters['campaigns/getFetched']('campaigns').length) {
      await this.load()
    }
  },

  methods: {
    async load () {
      await this.$store.dispatch('campaigns/fetch', {
        id: 'campaigns',
        params: {
          pageSize,
          sort: [{ field: 'Name', direction: 'asc' }],
          offset: this.$store.getters['campaigns/getOffset']('campaigns')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .boxed {
    padding: grid(8) grid(8) 0 grid(8);

    @include mq($until: xsmall) {
      padding: grid(6) grid(4) 0 grid(4);
    }
  }
</style>
