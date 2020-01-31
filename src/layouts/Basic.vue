<template>
  <Grid>
    <template v-slot:one>
      <ButtonSecondary @click.native.prevent="$router.go(-1)">
        Close
      </ButtonSecondary>
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
import ButtonSecondary from '@/components/atoms/ButtonSecondary'
import Grid from '@/components/layouts/Grid'

export default {
  name: 'layout-basic',
  components: { Grid, ButtonSecondary }
}
</script>
