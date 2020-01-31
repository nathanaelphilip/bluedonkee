<template>
  <Grid>
    <template v-slot:one>
      <ButtonSecondary @click.native.prevent="back()">
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
  components: { Grid, ButtonSecondary },

  methods: {
    back () {
      window.history.length > 2 ? this.$router.go(-1) : this.$router.push({ name: 'jobs' })
    }
  }
}
</script>
