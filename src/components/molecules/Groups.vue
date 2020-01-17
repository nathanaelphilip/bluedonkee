<template>
  <div class="groups">
    <div
      class="box"
      v-for="group in $store.state.groups.repository"
      :key="group.id"
      >
      <Group :group="group" />
    </div>
  </div>
</template>

<script>
import Group from '@/components/molecules/Group'

export default {
  components: { Group }
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
