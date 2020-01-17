<template>
  <div>
    <div class="groups">
      <div
        class="box"
        v-for="group in $store.state.groups.repository"
        :key="group.id"
        >
        <Group :group="group" />
      </div>
    </div>
  </div>
</template>

<script>
import Group from '@/components/molecules/Group'

export default {
  name: 'views-groups',
  components: { Group },

  async mounted () {
    await this.$store.dispatch('groups/fetch')
  }
}
</script>

<style lang="scss" scoped>
  .box {
    padding: 25px 33px;

    &:not(:last-child) {
      border-bottom: 1px solid $GREY;
    }
  }
</style>
