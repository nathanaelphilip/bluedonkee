<template>
  <router-link
    :to="{
      name: route,
      params: {
        slug: location.fields.Slug
      }
    }"
  >
    {{ location.fields.City }}
    <template v-if="state">, {{ state }}</template>
  </router-link>
</template>

<script>
import { getStates } from '@/store/helpers'

export default {
  props: ['location', 'route'],

  data () {
    return { states: [] }
  },

  computed: {
    state () {
      return this.states.length ? this.states[0].fields.Abbreviation : false
    }
  },

  async mounted () {
    if (this.location.fields.State && this.location.fields.State.length) {
      this.states = await getStates(this.location.fields.State)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
