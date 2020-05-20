<template>
  <main class="site" :class="{'»mobilesticky' : $store.state.app.mobileNavOpen}">
    <Header />
    <portal-target name="banner">
    </portal-target>
    <div id="sticky-filters" class="filters">
      <portal-target name="filters">
      </portal-target>
    </div>
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
import _ from 'lodash'

import Grid from '@/components/layouts/Grid'
import Header from '@/components/molecules/HeaderGlobal'
import Newsletter from '@/components/forms/Newsletter'
import JobsPromoted from '@/components/molecules/JobsPromoted'
import Twitter from '@/components/molecules/Twitter'

export default {
  name: 'layout-full',

  components: { Grid, Header, Newsletter, JobsPromoted, Twitter },

  mounted () {
    const element = document.getElementById('sticky-filters')

    document.addEventListener('scroll', _.throttle(event => {
      element.classList.toggle('»stuck', element.offsetTop <= (window.scrollY + 70))
    }, 150))
  }
}
</script>

<style lang="scss" scoped>
  .»mobilesticky {
    height: 100%;
    left: 0;
    overflow: hidden;
    position: fixed;
    top: 0;
    width: 100%;
  }

  .promoted,
  .newsletter,
  .twitter {
    margin-bottom: 26px;
  }

  .filters {
    position: sticky;
    top: 70px;
    z-index: 8;
  }
</style>
