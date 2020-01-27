<template lang="html">
  <aside class="aside" :class="{'open': open}">
    <div class="grid">
      <div class="banner">
        <div class="message"><slot></slot></div>
        <button class="close" @click.prevent="$emit('close')"><IconClose width="10" height="10" /></button>
      </div>
    </div>
  </aside>
</template>

<script>
import IconClose from '@/components/icons/Close'

export default {
  props: ['open'],
  components: { IconClose }
}
</script>

<style lang="scss" scoped>
  .aside {
    left: 0;
    position: fixed;
    top: 0;
    transform: translateY(-100%);
    transition: transform .4s .15s ease-out;
    width: 100%;
    z-index: 10;

    &.open {transform: translateY(0);}
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 2.25fr 1fr;
    grid-column-gap: 33px;
    margin: 0 auto;
    max-width: 1400px;
    width: 95%;
  }

  .banner {
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
  }

  .message {
    font-size: 22px;
    font-weight: 900;
  }

  .close {
    $d: 35px;
    appearance: none;
    align-items: center;
    background: $BLUELIGHT;
    border: none;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    height: $d;
    width: $d;

    &:hover {
      background: $BLUE;
      cursor: pointer;

      svg { fill: $WHITE; }
    }
  }
</style>
