<template>
  <Fragment>
    <template
      v-for="(location, index) in locations"
    >
      <Location
        :key="location.id"
        :location="location"
        :route="route"
        :simple="simple"
      />
      <template v-if="locations.length > 1 && index !== locations.length - 1"><div class="divider" :key="`${location.id}-divider`">•</div></template>
    </template>
  </Fragment>
</template>

<script>
import { Fragment } from 'vue-fragment'
import Location from '@/components/atoms/Location'

export default {
  props: ['locations', 'route', 'simple'],
  components: { Fragment, Location }
}
</script>

<style lang="scss" scoped>
  .divider {
    margin: 0 grid(1);
  }
</style>
