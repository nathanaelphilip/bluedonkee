<template>
  <header class="header">
    <div class="container">
      <div class="logo">
        <router-link :to="{name: 'jobs'}"><Logo /></router-link>
        <Bug>Beta</Bug>
      </div>
      <Navigation />
    </div>
  </header>
</template>

<script>
import Bug from '@/components/atoms/Bug'
import Logo from '@/components/atoms/Logo'
import Navigation from '@/components/molecules/Navigation'

export default {
  components: { Bug, Logo, Navigation }
}
</script>

<style lang="scss" scoped>
  .header {
    border-bottom: 1px solid $GREY;
    padding: grid(4);
  }

  .container {
    @include Flex;
    @include Container;
  }

  .logo {
    @include Flex ($justify: flex-start);
  }
</style>
