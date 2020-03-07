<template>
  <article v-if="!loading">
    <Intro :back="{ name: 'groups' }" :heading="`Category: ${category.fields.Name}`" />
    <Groups :groups="groups" />
  </article>
</template>

<script>
import {
  getByIds,
  getBySlug
} from '@/store/helpers'

import Groups from '@/components/molecules/Groups'
import Intro from '@/components/molecules/Intro'

export default {
  name: 'group-category',
  components: { Groups, Intro },

  data () {
    return {
      loading: true,
      category: {},
      groups: []
    }
  },

  async mounted () {
    this.category = await getBySlug({
      slug: this.$route.params.slug,
      type: 'groupCategories'
    })

    this.groups = this.category.fields.Groups ? await getByIds({
      ids: this.category.fields.Groups,
      type: 'groups'
    }) : []

    this.groups = this.groups.sort((a, b) => {
      return a.fields.Name > b.fields.Name ? 1 : -1
    })

    this.loading = false
  }
}
</script>
