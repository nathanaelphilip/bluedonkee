<template>
  <section v-if="!loading">
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
import BackTop from '@/components/molecules/BackTop'
import Jobs from '@/components/molecules/Jobs'
import Pager from '@/components/molecules/Pager'

const pageSize = 20

export default {
  name: 'work-remote',

  metaInfo: { title: 'Remote Jobs' },

  components: { BackTop, Jobs, Pager },

  data () {
    return {
      id: false,
      loading: true,
      type: {}
    }
  },

  async mounted () {
    this.id = 'jobs/remote'

    this.$store.dispatch('app/setHeading', 'Work Remote')

    if (!this.$store.getters['jobs/getFetched'](this.id).length) {
      await this.load()
    }

    this.loading = false

    window.analytics.page('Work Remote')
  },

  methods: {
    async load () {
      await this.$store.dispatch('jobs/fetch', {
        id: this.id,
        params: {
          filterByFormula: '{Remote}=1',
          pageSize,
          sort: [{ field: 'Post Date', direction: 'desc' }],
          offset: this.$store.getters['jobs/getOffset'](this.id)
        }
      })
    }
  }
}
</script>
