<template>
  <Grid>
    <template v-slot:one>
      <div class="logo">
        <router-link :to="{name: 'jobs'}"><Logo /></router-link>
        <Bug>Alpha</Bug>
      </div>
      <Navigation />
    </template>
    <template v-slot:two>
      <main class="main">
        <slot />
      </main>
    </template>
    <template v-slot:three>
      <JobsPromoted />
      <Newsletter />
      <Twitter />
    </template>
    <template v-slot:four>
      <div class="copyright">&copy; 2020 Blue Donkee - <router-link :to="{ name: 'questions' }">Questions</router-link></div>
    </template>
  </Grid>
</template>

<script>
import Bug from '@/components/atoms/Bug'
import Grid from '@/components/layouts/Grid'
import Logo from '@/components/atoms/Logo'
import Navigation from '@/components/molecules/Navigation'
import Newsletter from '@/components/forms/Newsletter'
import JobsPromoted from '@/components/molecules/JobsPromoted'
import Twitter from '@/components/molecules/Twitter'

export default {
  name: 'layout-full',

  components: { Bug, Grid, Logo, Navigation, Newsletter, JobsPromoted, Twitter }
}
</script>

<style lang="scss" scoped>
  .main {
    height: 100%;
    border-left: 1px solid $GREY;
    border-right: 1px solid $GREY;
  }

  .logo {
    align-items: center;
    display: flex;
    justify-content: flex-start;
    margin-bottom: 36px;

    img {margin-right: 12px}
  }

  .promoted,
  .newsletter {
    margin-bottom: 26px;
  }

  .copyright {
    color: $BLUEGREY;
    font-size: 13px;
  }
</style>
