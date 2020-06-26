<template>
  <Fragment>
    <router-link
      v-if="!simple"
      @click.native="$event.stopImmediatePropagation()"
      :to="{
        name: route,
        params: {
          slug: location.fields.Slug
        }
      }"
    >
      <template v-if="location.fields.City">{{ location.fields.City }}</template>
      <template v-if="location.fields.City && state">, </template>
      <template v-if="state">{{ state }}</template>
    </router-link>
    <div v-if="simple">
      <template v-if="location.fields.City">{{ location.fields.City }}</template>
      <template v-if="location.fields.City && state">, </template>
      <template v-if="state">{{ state }}</template>
    </div>
  </Fragment>
</template>

<script>
import { getByIds } from '@/store/helpers'
import { Fragment } from 'vue-fragment'

export default {
  props: ['location', 'route', 'simple'],
  components: { Fragment },

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
  a:hover {text-decoration: underline;}
</style>
