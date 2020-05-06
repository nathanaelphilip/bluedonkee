<template>
  <header class="header">
    <div class="container">
      <div class="back" v-if="$store.state.app.heading">
        <ButtonBack :to="back" v-if="back" />
        <h2 class="heading">{{ $store.state.app.heading }}</h2>
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
      if (this.$store.state.route.from && this.$store.state.route.from.name !== null) {
        const { name, params } = this.$store.state.route.from
        return { name, params }
      }

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

  .back {
    @include Flex;
  }

  .button-back {
    margin-right: grid(4);
  }

  .heading {
    font-size: 18px;
    font-weight: 600;
  }

  .container {
    @include Flex;
    @include Container;
  }

  .logo {
    @include Flex ($justify: flex-start);
  }
</style>
