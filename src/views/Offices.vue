<template>
  <div v-if="!loading">
    <Intro :heading="`Office: ${office.fields.Name}`" :back="{ name: 'campaigns' }" />
    <Campaigns :campaigns="$store.getters['campaigns/getFetched'](id)" />
    <Pager
      @load="load"
      :loading="$store.state.campaigns.loading === id"
      v-if="$store.getters['campaigns/getOffset'](id)"
    />
    <BackTop v-if="!$store.getters['campaigns/getOffset'](id)" />
  </div>
</template>

<script>
import {
  getBySlug
} from '@/store/helpers'

import BackTop from '@/components/molecules/BackTop'
import Campaigns from '@/components/molecules/Campaigns'
import Intro from '@/components/molecules/Intro'
import Pager from '@/components/molecules/Pager'

const pageSize = 20

export default {
  name: 'views-campaigns',

  metaInfo () {
    return {
      title: this.office && this.office.fields ? `Office: ${this.office.fields.Name}` : 'Office'
    }
  },

  components: { BackTop, Campaigns, Intro, Pager },

  data () {
    return {
      id: false,
      loading: true,
      office: {}
    }
  },

  async mounted () {
    this.id = `campaigns/office/${this.$route.params.slug}`

    this.office = await getBySlug({
      slug: this.$route.params.slug,
      type: 'offices'
    })

    if (!this.$store.getters['campaigns/getFetched'](this.id).length) {
      await this.load()
    }

    this.loading = false

    window.analytics.page('Offices')
  },

  methods: {
    async load () {
      await this.$store.dispatch('campaigns/fetch', {
        id: this.id,
        params: {
          filterByFormula: `SEARCH("${this.office.fields.Name}", {Office})`,
          pageSize,
          sort: [{ field: 'Name', direction: 'asc' }],
          offset: this.$store.getters['campaigns/getOffset'](this.id)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
