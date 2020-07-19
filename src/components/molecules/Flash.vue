<template lang="html">
  <aside class="aside" :class="{'open': open}">
    <div class="grid">
      <div class="flash">
        <div class="message"><slot></slot></div>
        <button class="close" @click.prevent="$emit('close')"><IconClose width="10" height="10" /></button>
      </div>
    </div>
  </aside>
</template>

<script>
import IconClose from '@/components/icons/Close'

export default {
  props: {
    open: { type: Boolean, default: false }
  },

  components: { IconClose },

  watch: {
    open () {
      setTimeout(() => {
        this.$emit('close')
      }, 3500)
    }
  }
}
</script>

<style lang="scss" scoped>
  .aside {
    left: 0;
    position: fixed;
    top: 10px;
    transform: translateY(-130%);
    transition: transform .2s .15s ease;
    width: 100%;
    z-index: 10;

    &.open {
      transform: translateY(0);
      transition-delay: 0s;
    }

    &.»bottom {
      bottom: grid(5);
      top: auto;
      transform: translateY(130%);

      &.open {
        transform: translateY(0);
      }
    }
  }

  .grid {
    @include Container;
    display: grid;
    grid-template-columns: 1fr 2.25fr 1fr;
    grid-column-gap: 33px;

    .»full & { grid-template-columns: 1fr; }
  }

  .flash {
    @include Shadow;
    align-items: center;
    border-radius: 12px;
    display: grid;
    grid-template-columns: 1fr 35px;
    grid-column-gap: 22px;
    background: $WHITE;
    grid-column: 2 / 3;
    padding: 22px 25px;
    max-width: 800px;

    .»full & {
      max-width: 100%;
      grid-column: 1 / 3;
      width: 100%;
    }
  }

  .message {
    font-size: 22px;
    font-weight: 900;
  }

  .close {
    @include ButtonClose;
  }
</style>
