<template>
  <div>
    <Groups :groups="$store.state.groups.repository" />
  </div>
</template>

<script>
import Groups from '@/components/molecules/Groups'

export default {
  name: 'views-groups',
  components: { Groups },

  async mounted () {
    await this.$store.dispatch('groups/fetch')
  }
}
</script>

<style lang="scss" scoped>

</style>
