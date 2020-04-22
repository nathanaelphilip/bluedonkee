<template>
  <article class="about">
    <HeaderPage
      :heading="`Positioned for <span>Change.</span>`"
    />
  </article>
</template>

<script>
import HeaderPage from '@/components/molecules/HeaderPage'

export default {
  name: 'views-questions',

  metaInfo: {
    title: 'About'
  },

  components: { HeaderPage }
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
