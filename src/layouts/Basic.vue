<template>
  <Grid>
    <template v-slot:one>
      <router-link :to="{name: 'jobs'}">Close</router-link>
    </template>
    <template v-slot:two>
      <slot />
    </template>
    <template v-slot:three>
      &nbsp;
    </template>
  </Grid>
</template>

<script>
import Grid from '@/components/layouts/Grid'

export default {
  name: 'layout-basic',
  components: { Grid }
}
</script>
