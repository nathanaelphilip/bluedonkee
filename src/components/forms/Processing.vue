<template>
  <Fragment>
    <div class="spinner" v-if="processing"></div>
    <span :class="{'text': true, 'hidden': processing}"><slot></slot></span>
  </Fragment>
</template>

<script>
import { Fragment } from 'vue-fragment'

export default {
  props: ['processing'],
  components: { Fragment }
}
</script>

<style lang="scss" scoped>
  .spinner {
    $d: 15px;
    animation: spin .75s linear infinite;
    border: 3px solid $WHITE;
    border-right-color: transparent;
    border-radius: 100%;
    left: 50%;
    top: 50%;
    position: absolute;
    transform: translate3d(-50%, -50%, 0);
    height: $d;
    width: $d;
  }

  .text.hidden { opacity: 0 }

  @keyframes spin {
    100% { transform: translate3d(-50%, -50%, 0) rotate(360deg); }
  }
</style>
