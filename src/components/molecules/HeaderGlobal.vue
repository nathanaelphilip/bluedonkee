<template>
  <header class="header">
    <div class="container">
      <div class="back" v-if="$store.state.app.heading">
        <ButtonBack v-if="back" />
        {{ $store.state.app.heading }}
      </div>
      <div class="logo" v-if="!$store.state.app.heading">
        <router-link :to="{name: 'jobs'}"><Logo /></router-link>
        <Bug>Beta</Bug>
      </div>
      <Navigation />
    </div>
  </header>
</template>

<script>
import Bug from '@/components/atoms/Bug'
import ButtonBack from '@/components/atoms/ButtonBack'
import Logo from '@/components/atoms/Logo'
import Navigation from '@/components/molecules/Navigation'

export default {
  components: { Bug, ButtonBack, Logo, Navigation },

  computed: {
    back () {
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
  .header {
    background: $WHITE;
    border-bottom: 1px solid $GREY;
    padding: grid(4);
    position: sticky;
    top: 0;
    z-index: 8;
  }

  .container {
    @include Flex;
    @include Container;
  }

  .logo {
    @include Flex ($justify: flex-start);
  }
</style>
