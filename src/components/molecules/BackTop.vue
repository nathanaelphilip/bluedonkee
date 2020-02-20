<template>
  <div class="up">
    <button class="button" @click.prevent="backToTop">
      <IconArrowUp :width="14" :height="14" />
    </button>
  </div>
</template>

<script>
import IconArrowUp from '@/components/icons/ArrowUp'

export default {
  components: { IconArrowUp },

  mounted () {
    window.smoothscroll = () => {
      let currentScroll = document.documentElement.scrollTop || document.body.scrollTop
      if (currentScroll > 0) {
        window.requestAnimationFrame(window.smoothscroll)
        window.scrollTo(0, Math.floor(currentScroll - (currentScroll / 5)))
      }
    }
    window.addEventListener('scroll', this.catchScroll)
  },

  destroyed () {
    window.removeEventListener('scroll', this.catchScroll)
  },

  methods: {
    catchScroll () {
      const pastTopOffset = window.pageYOffset > parseInt(this.visibleoffset)
      const pastBottomOffset = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - parseInt(this.visibleoffsetbottom)
      this.visible = parseInt(this.visibleoffsetbottom) > 0 ? pastTopOffset && !pastBottomOffset : pastTopOffset
    },

    backToTop () {
      window.smoothscroll()
    }
  }
}
</script>

<style lang="scss" scoped>
  .up {
    @include Flex($justify: center);
    padding: grid(10) 0;
  }

  .button {
    $d: grid(8);
    @include ButtonStripped;
    @include Flex($justify: center);
    border: 1px solid $GREY;
    border-radius: 100%;
    transition: background .5s, border-color .5s;
    height: $d;
    width: $d;

    &:hover {
      background: $GREY;
      cursor: pointer;
    }
  }
</style>
