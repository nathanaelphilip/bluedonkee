<template>
  <div class="spinner"></div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  .spinner {
    $d: 15px;
    animation: rotate 1s linear infinite;
    border: 1px solid $BLUE;
    border-right: 1px solid rgba($WHITE, 0);
    border-radius: 100%;
    margin: 0 auto;
    height: $d;
    width: $d;
  }

  @keyframes rotate {
    0% { transform: rotate(0deg) }
    100% { transform: rotate(359deg) }
  }
</style>
