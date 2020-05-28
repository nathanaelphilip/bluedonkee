<template>
  <router-link @click.native="$store.dispatch('breadcrumbs/remove')" class="button-back" :to="to">
    <ArrowLeft width="14" height="14" />
  </router-link>
</template>

<script>
import ArrowLeft from '@/components/icons/ArrowLeft'
export default {
  props: ['to'],
  components: { ArrowLeft }
}
</script>

<style lang="scss" scoped>
  .button-back {
    @include ButtonSecondary;
    align-items: center;
    display: flex;
    justify-content: center;
    height: 40px;
    padding: 0;
    width: 40px;
  }
</style>
