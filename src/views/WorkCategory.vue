<template>
  <section v-if="!loading">
    <Intro :heading="category.fields.Name" />
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
  name: 'work-category',

  metaInfo () {
    return {
      title: this.category && this.category.fields ? `Job Category: ${this.category.fields.Name}` : 'Job Level'
    }
  },

  components: { BackTop, Intro, Jobs, Pager },

  data () {
    return {
      id: false,
      loading: true,
      category: {}
    }
  },

  async mounted () {
    this.id = `jobs/category/${this.$route.params.slug}`

    this.category = await getBySlug({
      slug: this.$route.params.slug,
      type: 'workCategories'
    })

    this.$store.dispatch('app/setHeading', `Work Category: ${this.category.fields.Name}`)

    if (!this.$store.getters['jobs/getFetched'](this.id).length) {
      await this.load()
    }

    this.loading = false

    window.analytics.page('Work Category')
  },

  methods: {
    async load () {
      await this.$store.dispatch('jobs/fetch', {
        id: this.id,
        params: {
          filterByFormula: `AND(OR({Status} = 'Active', {Status} = 'Promoted'), SEARCH("${this.category.fields.Name}", {Work Categories}))`,
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
