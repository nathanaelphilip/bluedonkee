<template>
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 32 24.3"
    style="enable-background:new 0 0 32 24.3;"
    xml:space="preserve"
    :height="height"
    :width="width"
    :class="`icon-jobs`"
  >
    <path class="st0" d="M2.2,10.2L2.2,10.2c1.2,0,2.2,1,2.2,2.2l0,0c0,1.2-1,2.2-2.2,2.2l0,0c-1.2,0-2.2-1-2.2-2.2l0,0C0,11.2,1,10.2,2.2,10.2z"/>
    <path class="st1" d="M3.2,8h3.5c0.6,0,1,0.4,1,1v6.8c0,0.6-0.4,1-1,1H3.2c-0.6,0-1-0.4-1-1V9C2.2,8.4,2.7,8,3.2,8z"/>
    <path class="st1" d="M3.3,13c-0.6-0.4-0.6-1.3,0-1.7L20.5,0.2C21.1-0.3,22,0.2,22,1v22.3c0,0.8-0.9,1.3-1.5,0.8L3.3,13z"/>
    <path class="st0" d="M31,11.4c0.6,0,1,0.4,1,1c0,0.5-0.4,0.9-0.9,1l-0.1,0h-6.6c-0.6,0-1-0.4-1-1c0-0.5,0.4-0.9,0.9-1l0.1,0H31z"/>
    <path class="st0" d="M23.5,16.3c0.2-0.5,0.8-0.7,1.2-0.5l0.1,0l6.6,3.3c0.5,0.2,0.7,0.8,0.4,1.3c-0.2,0.5-0.8,0.7-1.2,0.5l-0.1,0l-6.6-3.3C23.4,17.4,23.2,16.8,23.5,16.3z"/>
    <path class="st0" d="M30.6,3.9c0.5-0.2,1.1,0,1.3,0.4c0.2,0.5,0.1,1-0.3,1.3l-0.1,0.1L24.8,9c-0.5,0.2-1.1,0-1.3-0.4c-0.2-0.5-0.1-1,0.3-1.3l0.1-0.1L30.6,3.9z"/>
    <path class="st0" d="M7.6,5.8h1.3c0.6,0,1,0.4,1,1V18c0,0.6-0.4,1-1,1H7.6c-0.6,0-1-0.4-1-1V6.8C6.6,6.2,7.1,5.8,7.6,5.8z"/>
  </svg>
</template>

<script>
export default {
  props: ['theme', 'width', 'height']
}
</script>

<style lang="scss" scoped>
  .icon-jobs {
    .st0{fill:#CDD5DF;}
    .st1{fill:#A0AEC0;}
  }
</style>
