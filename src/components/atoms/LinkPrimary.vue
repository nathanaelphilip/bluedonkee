<template>
  <Fragment>
    <router-link :to="to" v-if="to" class="button" :class="classes">
      <slot></slot>
    </router-link>
    <a @click="$emit('clicked')" :href="href" v-if="href" target="_blank" class="button" :class="classes">
      <slot></slot>
    </a>
  </Fragment>
</template>

<script>
import { Fragment } from 'vue-fragment'

export default {
  props: ['to', 'href', 'classes'],
  components: { Fragment }
}
</script>

<style lang="scss" scoped>
  .button {
    @include ButtonPrimary;

    &.small {padding: 9px 12px 9px 12px}

    strong { font-weight: 900; }
  }
</style>
