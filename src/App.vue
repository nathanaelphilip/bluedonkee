<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
import Basic from '@/layouts/Basic'
import Full from '@/layouts/Full'

export default {
  name: 'app',

  components: {
    'basic': Basic,
    'full': Full
  },

  computed: {
    layout () {
      return this.$route.meta.layout ? this.$route.meta.layout : `full`
    }
  },

  async mounted () {
    if (!this.$store.state.states.repository.length) {
      await this.$store.dispatch('states/fetch')
    }

    if (!this.$store.state.locations.repository.length) {
      await this.$store.dispatch('locations/fetch')
    }
  }
}
</script>
