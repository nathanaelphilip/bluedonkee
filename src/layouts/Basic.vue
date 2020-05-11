<template>
  <main class="site">
    <Header />
    <div class="grid">
      <div class="column">
        <slot />
        <Colophon />
      </div>
    </div>
  </main>
</template>

<script>
import Colophon from '@/components/molecules/Colophon'
import Header from '@/components/molecules/HeaderGlobal'

export default {
  name: 'layout-basic',
  components: { Colophon, Header },

  methods: {
    back () {
      window.history.length > 2 ? this.$router.go(-1) : this.$router.push({ name: 'jobs' })
    }
  }
}
</script>

<style lang="scss" scoped>
  .grid {
    display: grid;
    justify-content: center;
    grid-template-columns: minmax(auto, 650px);
  }

  .column {
    padding: 0 grid(5);
  }
</style>
