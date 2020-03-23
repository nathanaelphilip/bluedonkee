<template lang="html">
  <div class="box">
    <button class="heading" @click.prevent="toggle">
      {{ heading }}
      <IconChevronDown width="10" height="6" class="icon-chevron-down" />
    </button>
    <div class="boxed" v-if="visible === _uid">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import IconChevronDown from '@/components/icons/ChevronDown'

export default {
  props: ['heading', 'open', 'visible'],
  components: { IconChevronDown },

  methods: {
    toggle () {
      this.$emit('toggle', this.visible === this._uid ? false : this._uid)
    }
  }
}
</script>

<style lang="scss" scoped>
  .box {
    &:not(:last-child) {
      border-bottom: 1px solid $GREY;
    }
  }

  .heading {
    @include ButtonStripped;
    @include Flex;
    border-bottom: 1px solid $GREY;
    padding: grid(6) grid(4);
    width: 100%;

    &:hover {cursor: pointer}
  }

  .icon-chevron-down {
    fill: $BLUEGREY;
  }

  .boxed {
    padding: grid(6) grid(4);
  }
</style>
