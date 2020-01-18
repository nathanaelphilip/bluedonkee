<template>
  <div>
    <Intro heading="Groups" />
    <Groups :groups="$store.state.groups.repository" />
  </div>
</template>

<script>
import Groups from '@/components/molecules/Groups'
import Intro from '@/components/molecules/Intro'

export default {
  name: 'views-groups',
  components: { Intro, Groups },

  async mounted () {
    if (!this.$store.state.groupCategories.repository.length) {
      await this.$store.dispatch('groupCategories/fetch')
    }

    await this.$store.dispatch('groups/fetch')
  }
}
</script>

<style lang="scss" scoped>

</style>
