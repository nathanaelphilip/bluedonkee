<template>
  <div id="app">
    <portal-target name="flash" multiple>
    </portal-target>
    <portal-target name="modal" multiple>
    </portal-target>
    <component :is="layout" v-if="loaded">
      <router-view :key="$route.fullPath" />
    </component>
  </div>
</template>

<script>
import Basic from '@/layouts/Basic'
import Full from '@/layouts/Full'

export default {
  name: 'app',

  metaInfo: {
    title: 'WorkBlue',
    titleTemplate: '%s + WorkBlue',
    htmlAttrs: { lang: 'en' }
  },

  components: {
    basic: Basic,
    full: Full
  },

  data () {
    return {
      loaded: false
    }
  },

  computed: {
    layout () {
      return this.$route.meta.layout ? this.$route.meta.layout : 'full'
    }
  },

  async mounted () {
    if (!this.$store.state.states.repository.length) {
      await this.$store.dispatch('states/fetch')
    }

    if (!this.$store.state.locations.repository.length) {
      await this.$store.dispatch('locations/fetch')
    }

    if (!this.$store.state.groupCategories.repository.length) {
      await this.$store.dispatch('groupCategories/fetch')
    }

    if (!this.$store.state.workCategories.repository.length) {
      await this.$store.dispatch('workCategories/fetch')
    }

    if (!this.$store.state.workLevels.repository.length) {
      await this.$store.dispatch('workLevels/fetch')
    }

    if (!this.$store.state.workTypes.repository.length) {
      await this.$store.dispatch('workTypes/fetch', {
        params: {
          sort: [{ field: 'Order', direction: 'asc' }]
        }
      })
    }

    this.loaded = true
  }
}
</script>
