<template>
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 18 18"
    style="enable-background:new 0 0 18 18;"
    xml:space="preserve"
    :height="height"
    :width="width"
    :class="`icon-link ${theme}`"
  >
    <path d="M14.7,11.8l-1.4-1.4L14.7,9c1-1,1.4-2.5,1-3.9c-0.4-1.4-1.4-2.5-2.8-2.8s-2.9,0-3.9,1L7.6,4.8L6.2,3.3l1.4-1.4c2.3-2.3,6.1-2.3,8.5,0c2.3,2.3,2.3,6.1,0,8.5L14.7,11.8z M11.8,14.7l-1.4,1.4c-1.5,1.5-3.7,2.1-5.8,1.6c-2.1-0.6-3.7-2.2-4.3-4.3s0.1-4.3,1.6-5.8l1.4-1.4l1.4,1.4L3.3,9c-1,1-1.4,2.5-1,3.9s1.4,2.5,2.8,2.8c1.4,0.4,2.9,0,3.9-1l1.4-1.4L11.8,14.7z M11.8,4.8l1.4,1.4l-7.1,7.1l-1.4-1.4L11.8,4.8L11.8,4.8z"/>
  </svg>
</template>

<script>
export default {
  props: ['theme', 'width', 'height']
}
</script>

<style lang="scss" scoped>
  .icon-link {}
</style>
