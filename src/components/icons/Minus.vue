<template>
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 10 2"
    enable-background="new 0 0 10 2"
    xml:space="preserve"
    :height="height"
    :width="width"
    :class="`icon-minus`"
  >
    <path d="M1,0h8c0.6,0,1,0.4,1,1l0,0c0,0.6-0.4,1-1,1H1C0.4,2,0,1.6,0,1l0,0C0,0.4,0.4,0,1,0z"/>
  </svg>
</template>

<script>
export default {
  props: ['width', 'height']
}
</script>

<style lang="scss" scoped>
  .icon-minus {}
</style>
