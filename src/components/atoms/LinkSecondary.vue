<template>
  <Fragment>
    <router-link :to="to" v-if="to" class="button">
      <slot></slot>
    </router-link>
    <a :href="href" v-if="href" target="_blank" class="button">
      <slot></slot>
    </a>
  </Fragment>
</template>

<script>
import { Fragment } from 'vue-fragment'

export default {
  props: ['to', 'href'],
  components: { Fragment }
}
</script>

<style lang="scss" scoped>
  .button {
    @include ButtonSecondary;
  }
</style>
