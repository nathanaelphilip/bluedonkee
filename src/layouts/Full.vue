<template>
  <Grid>
    <template v-slot:one>
      <Navigation />
    </template>
    <template v-slot:two>
      <main class="main">
        <slot />
      </main>
    </template>
    <template v-slot:three>
      Side Piece
    </template>
  </Grid>
</template>

<script>
import Grid from '@/components/layouts/Grid'
import Navigation from '@/components/molecules/Navigation'

export default {
  name: 'layout-full',

  components: { Grid, Navigation }
}
</script>

<style lang="scss" scoped>
  .main {
    height: 100%;
    border-left: 1px solid $GREY;
    border-right: 1px solid $GREY;
  }
</style>
