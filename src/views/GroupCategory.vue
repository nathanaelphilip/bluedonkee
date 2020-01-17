<template>
  <article v-if="!loading">
    <h2>{{ category.fields.Name }}</h2>
    <Groups :groups="groups" />
  </article>
</template>

<script>
import {
  getGroups,
  getGroupCategory
} from '@/store/helpers'

import Groups from '@/components/molecules/Groups'

export default {
  name: 'group-category',
  components: { Groups },

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
