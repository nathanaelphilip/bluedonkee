<template>
  <div id="app">
    <portal-target name="flash" multiple>
    </portal-target>
    <portal-target name="modal" multiple>
    </portal-target>
    <component :is="layout" v-if="loaded">
      <router-view :key="$route.fullPath" />
    </component>
    <Toast @close="open = false; $cookies.set('toast-form', true);" :open="open" />
  </div>
</template>

<script>
import _ from 'lodash'

import Basic from '@/layouts/Basic'
import Full from '@/layouts/Full'
import Toast from '@/components/molecules/Toast'

export default {
  name: 'app',

  metaInfo: {
    title: 'WorkBlue',
    titleTemplate: '%s + WorkBlue',
    htmlAttrs: { lang: 'en' }
  },

  components: {
    basic: Basic,
    full: Full,
    Toast
  },

  data () {
    return {
      open: false,
      loaded: false
    }
  },

  computed: {
    layout () {
      return this.$route.meta.layout ? this.$route.meta.layout : 'full'
    }
  },

  created () {
    this.open = !this.$cookies.isKey('toast-form')
  },

  async mounted () {
    this.$store.dispatch('app/setInnerHeight', window.innerHeight)

    if (!this.$store.state.states.repository.length) {
      await this.$store.dispatch('states/fetch')
    }

    if (!this.$store.state.locations.repository.length) {
      await this.$store.dispatch('locations/fetch')
    }

    if (!this.$store.state.groupCategories.repository.length) {
      await this.$store.dispatch('groupCategories/fetch', {
        params: { view: 'Grid view' }
      })
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

    document.addEventListener('scroll', _.throttle(event => {
      this.$store.dispatch('app/setInnerHeight', window.innerHeight)
    }, 200))

    this.loaded = true
  }
}
</script>
