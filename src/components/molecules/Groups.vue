<template>
  <div class="groups">
    <h3 v-if="heading" class="heading">{{ heading }}</h3>
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
  props: ['groups', 'heading'],
  components: { Group }
}
</script>

<style lang="scss" scoped>
  .heading {
    font-size: 18px;
    font-weight: 900;
    margin-bottom: grid(2);
    padding: 0 grid(8);

    @include mq ($until: xsmall) {
      padding: 0 grid(4);
    }
  }
  .box {
    padding: grid(6) grid(8);

    @include mq($until: xsmall) {
      padding: grid(6) grid(4);
    }

    &:not(:last-child) {
      border-bottom: 1px solid $GREY;
    }
  }
</style>
