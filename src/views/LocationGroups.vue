<template>
  <section v-if="!loading">
    <Intro :back="{ name: 'groups' }" :heading="`Location: ${location.fields.City}`" />
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
import Intro from '@/components/molecules/Intro'
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

  components: { BackTop, Intro, Groups, Pager },

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

    if (!this.$store.getters['groups/getFetched'](this.id).length) {
      await this.load()
    }

    this.loading = false

    window.analytics.page('Location Groups')
  },

  methods: {
    async load () {
      await this.$store.dispatch('groups/fetch', {
        id: this.id,
        params: {
          filterByFormula: `SEARCH("${this.location.fields.City}", {Location})`,
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
