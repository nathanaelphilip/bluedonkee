<template>
  <section v-if="!loading">
    <Intro :back="{ name: 'jobs' }" :heading="`Category: ${category.fields.Name}`" />
    <Jobs :jobs="jobs.sort((a, b) => {
      return a.fields.Created < b.fields.Created ? 1 : -1
    })" />
  </section>
</template>

<script>
import {
  getByIds,
  getBySlug
} from '@/store/helpers'

import Intro from '@/components/molecules/Intro'
import Jobs from '@/components/molecules/Jobs'

export default {
  name: 'work-category',
  components: { Intro, Jobs },

  data () {
    return {
      loading: true,
      category: {},
      jobs: []
    }
  },

  async mounted () {
    this.category = await getBySlug({
      slug: this.$route.params.slug,
      type: 'workCategories'
    })

    this.jobs = await getByIds({
      ids: this.category.fields.Jobs,
      type: 'jobs'
    })

    this.loading = false
  }
}
</script>

<style lang="scss" scoped>

</style>
