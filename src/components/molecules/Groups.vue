<template>
  <div class="groups">
    <div
      class="box"
      v-for="group in groups"
      :key="group.id"
      >
      <Group :group="group" />
    </div>
  </div>
</template>

<script>
import Group from '@/components/molecules/Group'

export default {
  props: ['groups'],
  components: { Group }
}
</script>

<style lang="scss" scoped>
  .box {
    padding: grid(8) grid(12);

    @include mq($until: xsmall) {
      padding: grid(6) grid(4);
    }

    &:not(:last-child) {
      border-bottom: 1px solid $GREY;
    }
  }
</style>
