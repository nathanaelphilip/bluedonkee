<template>
  <ul>
    <li :key="group.id" v-for="group in groups">
      <router-link :to="`/group/${group.fields.Slug}`">{{ group.fields.Name }}</router-link>
    </li>
  </ul>
</template>

<script>
import { getGroups } from '@/api'

export default {
  name: 'groups',

  data () {
    return {
      groups: []
    }
  },

  async mounted () {
    const { data } = await getGroups()

    this.groups = data.records
  }
}
</script>
