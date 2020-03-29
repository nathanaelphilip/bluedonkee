<template>
  <Fragment>
    <template
      v-for="(location, index) in locations"
    >
      <Location
        :key="location.id"
        :location="location"
        :route="route"
      />
      <template v-if="locations.length > 1 && index !== locations.length - 1"> • </template>
    </template>
  </Fragment>
</template>

<script>
import { Fragment } from 'vue-fragment'
import Location from '@/components/atoms/Location'

export default {
  props: ['locations', 'route'],
  components: { Fragment, Location }
}
</script>

<style lang="scss" scoped>
</style>
