<template>
  <section v-if="!loading">
    <Intro :heading="level.fields.Name" />
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
  name: 'work-level',

  metaInfo () {
    return {
      title: this.level && this.level.fields ? `Job Level: ${this.level.fields.Name}` : 'Job Level'
    }
  },

  components: { BackTop, Intro, Jobs, Pager },

  data () {
    return {
      id: false,
      loading: true,
      level: {}
    }
  },

  async mounted () {
    this.id = `jobs/level/${this.$route.params.slug}`

    this.level = await getBySlug({
      slug: this.$route.params.slug,
      type: 'workLevels'
    })

    this.$store.dispatch('app/setHeading', `Work Level: ${this.level.fields.Name}`)

    if (!this.$store.getters['jobs/getFetched'](this.id).length) {
      await this.load()
    }

    this.loading = false

    window.analytics.page('Work Level')
  },

  methods: {
    async load () {
      await this.$store.dispatch('jobs/fetch', {
        id: this.id,
        params: {
          filterByFormula: `SEARCH("${this.level.fields.Name}", {Work Levels})`,
          pageSize,
          sort: [{ field: 'Post Date', direction: 'desc' }],
          offset: this.$store.getters['jobs/getOffset'](this.id)
        }
      })
    }
  }
}
</script>
