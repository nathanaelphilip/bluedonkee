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
      <div class="copyright">&copy; {{ new Date().getFullYear() }} Work Blue - <router-link :to="{ name: 'questions' }">Questions</router-link></div>
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

  .bug {
    @include mq($until: small) {display: none}
  }

  .logo {
    align-items: center;
    display: flex;
    justify-content: flex-start;
    margin-bottom: 36px;

    @include mq($until: small) {display: none}

    img {
      margin-right: 12px;
    }
  }

  .promoted,
  .newsletter,
  .twitter {
    margin-bottom: 26px;
  }

  .copyright {
    color: $BLUEGREY;
    font-size: 13px;
    text-align: center;
  }
</style>
