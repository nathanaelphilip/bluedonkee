<template>
  <img
    class="avatar"
    :class="{loaded}"
    :src="src"
  />
</template>

<script>
export default {
  props: ['src'],

  data () {
    return {
      loaded: false
    }
  },

  created () {
    this.load()
  },

  watch: {
    src () {
      this.load()
    }
  },

  methods: {
    load () {
      const image = new Image()
      image.src = this.src

      image.onload = () => {
        this.loaded = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .avatar {
    display: block;
    border: 2px solid $GREY;
    border-radius: 100%;
    object-fit: cover;
    height: 100%;
    opacity: 0;
    transition: opacity .4s;
    width: 100%;

    &.loaded {
      opacity: 1;
    }
  }
</style>
