<template>
  <section v-if="!loading">
    <div class="jobs">
      <div
        v-for="job in jobs"
        :key="job.id"
        class="box">
        <Job :job="job" />
      </div>
    </div>
  </section>
</template>

<script>
import {
  getJobs,
  getWorkCategory
} from '@/store/helpers'

import Job from '@/components/molecules/Job'

export default {
  name: 'work-category',
  components: { Job },

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
  .box {
    padding: 25px 36px;

    &:not(:last-child) {
      border-bottom: 1px solid $GREY;
    }
  }
</style>
