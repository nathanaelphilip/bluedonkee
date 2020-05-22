<template lang="html">
  <div class="box" :class="{'visible': visible == _uid}">
    <button class="heading" @click.prevent="toggle">
      {{ heading }}<IconPlus :width="10" :height="10" />
    </button>
    <div class="boxed" v-if="visible === _uid">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import IconPlus from '@/components/icons/Plus'

export default {
  props: ['heading', 'open', 'visible'],
  components: { IconPlus },

  methods: {
    toggle () {
      this.$emit('toggle', this.visible === this._uid ? false : this._uid)
    }
  }
}
</script>

<style lang="scss" scoped>
  .box {
    &.visible:not(:last-child) {
      border-bottom: 1px solid $GREY;
    }
  }

  .heading {
    @include ButtonStripped;
    @include Flex;
    border-bottom: 1px solid $GREY;
    font-size: 19px;
    font-weight: 800;
    padding: grid(5) grid(4);
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
