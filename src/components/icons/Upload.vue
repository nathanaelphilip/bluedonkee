<template>
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 30 33.6"
    style="enable-background:new 0 0 30 33.6;"
    xml:space="preserve"
    :height="height"
    :width="width"
    :class="`icon-upload ${animate}`"
  >
    <path class="icon-upload-cloud" d="M4.6,18.4C1.8,16.6,0,13.5,0,10C0,4.5,4.5,0,10,0c4.7,0,8.6,3.2,9.7,7.5h4.1c3.5,0,6.2,2.8,6.2,6.2S27.2,20,23.8,20h-15C7.1,20,5.7,19.4,4.6,18.4z"/>
    <path class="icon-upload-arrow" d="M9.9,29.4h3.3v3.3c0,0.5,0.4,0.8,0.8,0.8h1.7c0.5,0,0.8-0.4,0.8-0.8v-3.3h3.3c0.5,0,0.8-0.4,0.8-0.8c0-0.2-0.1-0.4-0.2-0.5l-4.9-5.8c-0.3-0.4-0.8-0.4-1.2-0.1c0,0-0.1,0.1-0.1,0.1l-4.9,5.8C9,28.4,9,29,9.4,29.2C9.5,29.4,9.7,29.4,9.9,29.4z"/>
  </svg>
</template>

<script>
export default {
  props: ['width', 'height', 'animate']
}
</script>

<style lang="scss" scoped>
  .icon-upload-cloud {
    fill: #a8d8ff;
  }

  .icon-upload-arrow {
    fill: $BLUE;
  }
</style>
