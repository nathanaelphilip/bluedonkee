<template>
  <section v-if="!loading">
    <Intro :back="{ name: 'jobs' }" :heading="`Type: ${type.fields.Name}`" />
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
  name: 'work-type',

  metaInfo () {
    return {
      title: this.type && this.type.fields ? `Job Type: ${this.type.fields.Name}` : 'Job Type'
    }
  },

  components: { BackTop, Intro, Jobs, Pager },

  data () {
    return {
      id: false,
      loading: true,
      type: {}
    }
  },

  async mounted () {
    this.id = `jobs/type/${this.$route.params.slug}`

    this.type = await getBySlug({
      slug: this.$route.params.slug,
      type: 'workTypes'
    })

    if (!this.$store.getters['jobs/getFetched'](this.id).length) {
      await this.load()
    }

    this.loading = false
  },

  methods: {
    async load () {
      await this.$store.dispatch('jobs/fetch', {
        id: this.id,
        params: {
          filterByFormula: `SEARCH("${this.type.fields.Name}", {Work Types})`,
          pageSize,
          sort: [{ field: 'Post Date', direction: 'desc' }],
          offset: this.$store.getters['jobs/getOffset'](this.id)
        }
      })
    }
  }
}
</script>
