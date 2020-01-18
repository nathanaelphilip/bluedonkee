<template>
  <section class="home">
    <Intro heading="Jobs">
      <ButtonSecondary>Filter</ButtonSecondary>
      <LinkPrimary :to="{name: 'submit'}">Submit Job</LinkPrimary>
    </Intro>
    <Jobs :jobs="$store.state.jobs.repository" />
  </section>
</template>

<script>
import ButtonSecondary from '@/components/atoms/ButtonSecondary'
import Intro from '@/components/molecules/Intro'
import Jobs from '@/components/molecules/Jobs'
import LinkPrimary from '@/components/atoms/LinkPrimary'

export default {
  name: 'views-jobs',
  components: { ButtonSecondary, Intro, Jobs, LinkPrimary },

  async mounted () {
    await this.$store.dispatch('jobs/fetch')
  }
}
</script>

<style lang="scss" scoped>
</style>
