<template>
  <div v-if="group.fields">
    {{ group.fields.Name }}
  </div>
</template>

<script>
import { getGroups } from '@/api'

export default {
  name: 'group',

  data () {
    return {
      group: {}
    }
  },

  async mounted () {
    const { data } = await getGroups({
      params: {
        filterByFormula: `SEARCH("${this.$route.params.slug}", Slug)`
      }
    })

    this.group = data.records[0]
  }
}
</script>
