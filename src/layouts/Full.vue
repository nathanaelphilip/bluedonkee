<template>
  <main class="site">
    <Header />
    <Grid>
      <template v-slot:one>
        <main class="main">
          <slot />
        </main>
      </template>
      <template v-slot:two>
        <JobsPromoted />
        <Twitter />
        <Newsletter />
      </template>
    </Grid>
  </main>
</template>

<script>
import Grid from '@/components/layouts/Grid'
import Header from '@/components/molecules/HeaderGlobal'
import Newsletter from '@/components/forms/Newsletter'
import JobsPromoted from '@/components/molecules/JobsPromoted'
import Twitter from '@/components/molecules/Twitter'

export default {
  name: 'layout-full',

  components: { Grid, Header, Newsletter, JobsPromoted, Twitter }
}
</script>

<style lang="scss" scoped>
  .promoted,
  .newsletter,
  .twitter {
    margin-bottom: 26px;
  }
</style>
