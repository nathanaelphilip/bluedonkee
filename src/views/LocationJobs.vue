<template>
  <section v-if="!loading">
    <Intro :back="{ name: 'jobs' }" :heading="`Location: ${location.fields.City}`" />
    <Jobs :jobs="$store.getters['jobs/getFetched'](id)" />
    <Pager
      @load="load"
      :loading="$store.state.jobs.loading === id"
      v-if="$store.getters['jobs/getOffset'](id)"
     />
    <BackTop v-if="!$store.getters['jobs/getOffset'](id)" />
  </section>
</template>

<script>
import {
  getBySlug
} from '@/store/helpers'

import BackTop from '@/components/molecules/BackTop'
import Intro from '@/components/molecules/Intro'
import Jobs from '@/components/molecules/Jobs'
import Pager from '@/components/molecules/Pager'

const pageSize = 20

export default {
  name: 'views-location-jobs',

  metaInfo () {
    return {
      title: this.location && this.location.fields ? `Location Jobs: ${this.location.fields.City}` : 'Location Jobs'
    }
  },

  components: { BackTop, Intro, Jobs, Pager },

  data () {
    return {
      loading: true,
      location: {},
      jobs: []
    }
  },

  async mounted () {
    this.id = `jobs/location/${this.$route.params.slug}`

    this.location = await getBySlug({
      slug: this.$route.params.slug,
      type: 'locations'
    })

    if (!this.$store.getters['jobs/getFetched'](this.id).length) {
      await this.load()
    }

    this.loading = false

    window.analytics.page('Location Jobs')
  },

  methods: {
    async load () {
      await this.$store.dispatch('jobs/fetch', {
        id: this.id,
        params: {
          filterByFormula: `SEARCH("${this.location.fields.City}", {Location})`,
          pageSize,
          sort: [{ field: 'Post Date', direction: 'desc' }],
          offset: this.$store.getters['jobs/getOffset'](this.id)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
