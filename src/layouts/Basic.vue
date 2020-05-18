<template>
  <main class="site" :class="{'»mobilesticky' : $store.state.app.mobileNavOpen}">
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
  .site {
    padding-bottom: grid(15);
  }

  .»mobilesticky {
    height: 100%;
    left: 0;
    overflow: hidden;
    position: fixed;
    top: 0;
    width: 100%;
  }

  .grid {
    display: grid;
    justify-content: center;
    grid-template-columns: minmax(auto, 650px);
  }

  .column {
    padding: 0 grid(5);
  }
</style>
