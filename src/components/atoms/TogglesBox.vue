<template lang="html">
  <div class="box" :class="{'visible': visible == _uid}">
    <button class="heading" @click.prevent="toggle">
      {{ heading }}
      <IconPlus v-if="visible !== _uid" :width="10" :height="10" />
      <IconMinus v-if="visible === _uid" :width="10" :height="2" />
    </button>
    <div class="boxed" v-if="visible === _uid">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import IconPlus from '@/components/icons/Plus'
import IconMinus from '@/components/icons/Minus'

export default {
  props: ['heading', 'visible'],
  components: { IconMinus, IconPlus },

  methods: {
    toggle () {
      this.$emit('toggle', this.visible === this._uid ? false : this._uid)
    }
  }
}
</script>

<style lang="scss" scoped>
  .box {
  }

  .heading {
    @include ButtonStripped;
    @include Flex;
    font-size: 17px;
    padding: grid(5) grid(4);
    width: 100%;

    &:hover {cursor: pointer}
  }

  .icon-chevron-down {
    fill: $BLUEGREY;
  }

  .boxed {
    padding: 0 grid(4);
  }
</style>
