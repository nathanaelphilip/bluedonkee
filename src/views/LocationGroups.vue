<template>
  <section v-if="!loading">
    <Intro :heading="`Location: ${location.fields.City}`" />
    <Groups :groups="groups" />
  </section>
</template>

<script>
import {
  getByIds,
  getBySlug
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
    this.location = await getBySlug({
      slug: this.$route.params.slug,
      type: 'locations'
    })

    this.groups = await getByIds({
      ids: this.location.fields.Groups,
      type: 'groups'
    })

    this.loading = false
  }
}
</script>

<style lang="scss" scoped>

</style>
