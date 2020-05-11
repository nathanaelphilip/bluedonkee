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
      <mq-layout mq="small+">
        <Navigation />
      </mq-layout>
      <mq-layout mq="xsmall">
        <div class="alt-menu">
          <LinkPrimary classes="small" :to="{name: 'postJob'}">Post Job</LinkPrimary>
          <Hamburger />
        </div>
      </mq-layout>
    </div>
  </header>
</template>

<script>
import Bug from '@/components/atoms/Bug'
import ButtonBack from '@/components/atoms/ButtonBack'
import Hamburger from '@/components/atoms/Hamburger'
import LinkPrimary from '@/components/atoms/LinkPrimary'
import Logo from '@/components/atoms/Logo'
import Navigation from '@/components/molecules/Navigation'

export default {
  components: { Bug, ButtonBack, Hamburger, LinkPrimary, Logo, Navigation },

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

  .alt-menu {
    @include Flex ($justify: flex-end);

    > *:last-child {
      margin-left: grid(2);
    }
  }
</style>
