<template>
  <mq-layout
    class="form-search"
    :mq="['xxsmall', 'xsmall', 'small']"
    v-if="$store.state.app.mobileSearchOpen"
    >
    <div class="box">
      <FormSearch ref="form" />
    </div>
  </mq-layout>
</template>

<script>
import FormSearch from '@/components/forms/Search'

export default {
  components: { FormSearch },

  mounted () {
    this.unwatch = this.$store.watch(
      state => state.app.mobileSearchOpen,
      open => {
        if (open === true) {
          this.$refs.form.$refs.input.focus()
        }
      }
    )
  },

  beforeDestroy () {
    this.unwatch()
  }
}
</script>

<style lang="scss" scoped>
  .form-search {
    background: $WHITE;
    height: 100%;
    height: calc(100vh - 64px);
    padding-top: grid(2);
    position: fixed;
    top: 64px;
    width: 100%;
    z-index: 9;

    .box {
      @include Container;
    }
  }
</style>
