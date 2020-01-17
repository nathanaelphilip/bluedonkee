<template>
  <Grid>
    <template v-slot:one>
      <Navigation />
    </template>
    <template v-slot:two>
      <slot />
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
