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
      return `full`
    }
  }
}
</script>
