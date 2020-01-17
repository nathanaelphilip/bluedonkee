<template>
  <section v-if="!loading">
    <Jobs :jobs="jobs" />
  </section>
</template>

<script>
import {
  getJobs,
  getWorkCategory
} from '@/store/helpers'

import Jobs from '@/components/molecules/Jobs'

export default {
  name: 'work-category',
  components: { Jobs },

  data () {
    return {
      loading: true,
      category: {},
      jobs: []
    }
  },

  async mounted () {
    this.category = await getWorkCategory(this.$route.params.slug)
    this.jobs = await getJobs(this.category.fields.Jobs)

    this.loading = false
  }
}
</script>

<style lang="scss" scoped>

</style>
