<template>
  <div v-if="group.fields">
    {{ group.fields.Name }}
  </div>
</template>

<script>
export default {
  name: 'group',

  data () {
    return {
      group: {}
    }
  },

  async mounted () {
    const slug = this.$route.params.slug

    let group = this.$store.state.groups.repository.find((group) => {
      return group.fields.Slug === slug
    })

    if (!group) {
      group = await this.$store.dispatch('groups/get', {
        params: {
          filterByFormula: `SEARCH("${slug}", Slug)`
        }
      })
    }

    this.group = group
  }
}
</script>
