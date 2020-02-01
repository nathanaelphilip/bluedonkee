<template>
  <section v-if="!loading">
    <Intro :heading="`Location: ${location.fields.City}`" />
    <Groups :groups="groups" />
  </section>
</template>

<script>
import {
  getGroups,
  getLocation
} from '@/store/helpers'

import Intro from '@/components/molecules/Intro'
import Groups from '@/components/molecules/Groups'

export default {
  name: 'views-location-groups',
  components: { Intro, Groups },

  data () {
    return {
      loading: true,
      location: {},
      groups: []
    }
  },

  async mounted () {
    this.location = await getLocation(this.$route.params.slug)
    this.groups = await getGroups(this.location.fields.Groups)

    this.loading = false
  }
}
</script>

<style lang="scss" scoped>

</style>
