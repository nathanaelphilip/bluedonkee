<template>
  <img class="avatar" :src="src" />
</template>

<script>
export default {
  props: ['src']
}
</script>

<style lang="scss" scoped>
  .avatar {
    display: block;
    border: 1px solid $GREY;
    border-radius: 100%;
    height: auto;
    width: 100%;
  }
</style>
