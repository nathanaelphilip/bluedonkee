<template>
  <div class="groups">
    <h3 v-if="heading" class="heading">{{ heading }}</h3>
    <div
      class="box"
      :class="{'»grouped': showJobs}"
      v-for="group in groups"
      :key="group.id"
      >
      <GroupWithJobs :group="group" v-if="showJobs" />
      <Group :group="group" v-if="!showJobs" />
    </div>
  </div>
</template>

<script>
import Group from '@/components/molecules/Group'
import GroupWithJobs from '@/components/molecules/GroupWithJobs'

export default {
  props: ['groups', 'heading', 'showJobs'],
  components: { Group, GroupWithJobs }
}
</script>

<style lang="scss" scoped>
  .heading {
    font-size: 22px;
    font-weight: 900;
    margin-bottom: grid(8);
  }

  .box {
    @include mq($until: medium) {
      padding: 0 grid(8);
    }

    &:not(.»grouped) {
      @include mq($until: medium) {
        border-bottom: 1px solid $GREY;
      }
    }

    &.»grouped {
      &:not(:last-child) {
        margin-bottom: grid(8);
      }
    }
  }
</style>
