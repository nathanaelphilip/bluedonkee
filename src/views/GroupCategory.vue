<template>
  <article v-if="!loading">
    <h2>{{ category.fields.Name }}</h2>
    <div>
      <router-link
        v-for="group in groups"
        :key="`group-${group.id}`"
        :to="{name: 'group', params: { slug: group.fields.Slug }}"
       >
         {{ group.fields.Name }}<br>
      </router-link>
    </div>
  </article>
</template>

<script>
import {
  getGroups,
  getGroupCategory
} from '@/store/helpers'

export default {
  name: 'group-category',

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
