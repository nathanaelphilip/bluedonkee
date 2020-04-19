<template>
  <main class="site">
    <Header />
    <Grid class="basic">
      <template v-slot:one>
        <slot />
      </template>
    </Grid>
  </main>
</template>

<script>
import Grid from '@/components/layouts/Grid'
import Header from '@/components/molecules/HeaderGlobal'

export default {
  name: 'layout-basic',
  components: { Grid, Header },

  methods: {
    back () {
      window.history.length > 2 ? this.$router.go(-1) : this.$router.push({ name: 'jobs' })
    }
  }
}
</script>

<style lang="scss" scoped>
  .basic {
    justify-content: center;
    grid-template-columns: 650px;

    &::v-deep .column-2 {
      display: none;
    }
  }
</style>
