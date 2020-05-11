<template>
  <router-link
    @click.native="$event.stopImmediatePropagation()"
    :to="{
      name: route,
      params: {
        slug: location.fields.Slug
      }
    }"
  >
    {{ location.fields.City }}<template v-if="state">, {{ state }}</template>
  </router-link>
</template>

<script>
import { getByIds } from '@/store/helpers'

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
      this.states = await getByIds({
        ids: this.location.fields.State,
        type: 'states'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
