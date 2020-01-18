<template>
  <article v-if="!loading">
    <Intro :back="{ name: 'groups' }" :heading="`Category: ${category.fields.Name}`" />
    <Groups :groups="groups" />
  </article>
</template>

<script>
import {
  getGroups,
  getGroupCategory
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
    this.category = await getGroupCategory(this.$route.params.slug)
    this.groups = this.category.fields.Groups ? await getGroups(this.category.fields.Groups) : []

    this.loading = false
  }
}
</script>
