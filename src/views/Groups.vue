<template>
  <ul>
    <li :key="group.id" v-for="group in $store.state.groups.repository">
      <router-link :to="`/group/${group.fields.Slug}`">{{ group.fields.Name }}</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'groups',
  async mounted () {
    await this.$store.dispatch('groups/fetch')
  }
}
</script>
