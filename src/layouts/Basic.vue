<template>
  <Grid>
    <template v-slot:one>
      <LinkSecondary :to="{name: 'jobs'}">
        Close
      </LinkSecondary>
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
import LinkSecondary from '@/components/atoms/LinkSecondary'
import Grid from '@/components/layouts/Grid'

export default {
  name: 'layout-basic',
  components: { Grid, LinkSecondary }
}
</script>
