<template>
  <article v-if="!loading">
    <Intro :back="{ name: 'groups' }" :heading="`Category: ${category.fields.Name}`" />
    <Groups :groups="$store.getters['groups/getFetched'](id)" />
    <Pager
      @load="load"
      :loading="$store.state.groups.loading === id"
      v-if="$store.getters['groups/getOffset'](id)"
    />
    <BackTop v-if="!$store.getters['groups/getOffset'](id)" />
  </article>
</template>

<script>
import {
  getBySlug
} from '@/store/helpers'

import BackTop from '@/components/molecules/BackTop'
import Groups from '@/components/molecules/Groups'
import Intro from '@/components/molecules/Intro'
import Pager from '@/components/molecules/Pager'

const pageSize = 20

export default {
  name: 'group-category',

  metaInfo () {
    return {
      title: this.category && this.category.fields ? `Group Category: ${this.category.fields.Name}` : 'Group Category'
    }
  },

  components: { BackTop, Groups, Intro, Pager },

  data () {
    return {
      id: false,
      loading: true,
      category: {}
    }
  },

  async mounted () {
    this.id = `groups/categories/${this.$route.params.slug}`

    this.category = await getBySlug({
      slug: this.$route.params.slug,
      type: 'groupCategories'
    })

    if (!this.$store.getters['groups/getFetched'](this.id).length) {
      await this.load()
    }

    this.loading = false
  },

  methods: {
    async load () {
      await this.$store.dispatch('groups/fetch', {
        id: this.id,
        params: {
          filterByFormula: `SEARCH("${this.category.fields.Name}", {Groups Categories})`,
          pageSize,
          sort: [{ field: 'Name', direction: 'asc' }],
          offset: this.$store.getters['groups/getOffset'](this.id)
        }
      })
    }
  }
}
</script>
