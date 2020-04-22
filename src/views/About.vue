<template>
  <article class="about">
    <HeaderPage
      :heading="`Positioned for <span>Change.</span>`"
    />
    <Colophon />
  </article>
</template>

<script>
import Colophon from '@/components/molecules/Colophon'
import HeaderPage from '@/components/molecules/HeaderPage'

export default {
  name: 'views-questions',

  metaInfo: {
    title: 'About'
  },

  components: { Colophon, HeaderPage }
}
</script>

<style lang="scss" scoped>
  .about {
    padding-top: grid(5);
  }

  .header {
    margin-bottom: grid(17);
  }
</style>
