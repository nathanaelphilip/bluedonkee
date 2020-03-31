<template>
  <Grid class="basic">
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

<style lang="scss" scoped>
  .basic {
    grid-template-columns: 100px 1fr 100px;

    &::v-deep .column-2 {
      margin: 0 auto;
      max-width: 680px;
    }

    @include mq ($until: small) {
      grid-template-columns: 1fr;
      padding: grid(4);

      &::v-deep .column-1 {
        @include mq ($until: small) {
          min-height: 0;
        }

        .sticky-top {
          @include mq ($until: small) {
            padding-top: 0;
          }
        }
      }
    }
  }
</style>
