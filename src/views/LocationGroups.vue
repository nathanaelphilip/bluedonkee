<template>
  <section v-if="!loading">
    <Groups :groups="$store.getters['groups/getFetched'](id)" />
    <Pager
      @load="load"
      :loading="$store.state.groups.loading === id"
      v-if="$store.getters['groups/getOffset'](id)"
     />
    <BackTop v-if="!$store.getters['groups/getOffset'](id)" />
  </section>
</template>

<script>
import {
  getBySlug
} from '@/store/helpers'

import BackTop from '@/components/molecules/BackTop'
import Groups from '@/components/molecules/Groups'
import Pager from '@/components/molecules/Pager'

const pageSize = 20

export default {
  name: 'views-location-groups',

  metaInfo () {
    return {
      title: this.location && this.location.fields ? `Location Groups: ${this.location.fields.City}` : 'Location Groups'
    }
  },

  components: { BackTop, Groups, Pager },

  data () {
    return {
      id: false,
      loading: true,
      location: {}
    }
  },

  async mounted () {
    this.id = `groups/location/${this.$route.params.slug}`

    this.location = await getBySlug({
      slug: this.$route.params.slug,
      type: 'locations'
    })

    this.$store.dispatch('app/setHeading', `Location: ${this.location.fields.City}`)

    if (!this.$store.getters['groups/getFetched'](this.id).length) {
      await this.load()
    }

    this.loading = false

    window.analytics.page('Location Groups')
  },

  methods: {
    async load () {
      const state = this.$store.getters['states/getById'](this.location.fields.State[0])

      await this.$store.dispatch('groups/fetch', {
        id: this.id,
        params: {
          filterByFormula: `SEARCH("${this.location.fields.City}, ${state.fields.Name}", {Location})`,
          pageSize,
          sort: [{ field: 'Name', direction: 'asc' }],
          offset: this.$store.getters['groups/getOffset'](this.id)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
