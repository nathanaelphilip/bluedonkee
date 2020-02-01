<template>
  <section class="home">
    <Intro heading="Jobs">
      <ButtonSecondary>Filter</ButtonSecondary>
      <LinkPrimary :to="{name: 'postJob'}">Post Job</LinkPrimary>
    </Intro>
    <div
      class="boxed"
      v-if="!closed"
      >
      <Banner
        @close="$cookies.set('banner:jobs'); closed = true"
        heading="Positioned for Change."
        content="Find campaigns and organizations fighting to make democracy more equitable. #letsworkblue"
        :link="{name: 'questions'}"
        :items="$store.state.groups.repository"
      />
    </div>
    <Jobs :jobs="$store.state.jobs.repository" />
  </section>
</template>

<script>
import Banner from '@/components/molecules/Banner'
import ButtonSecondary from '@/components/atoms/ButtonSecondary'
import Intro from '@/components/molecules/Intro'
import Jobs from '@/components/molecules/Jobs'
import LinkPrimary from '@/components/atoms/LinkPrimary'

export default {
  name: 'views-jobs',
  components: { Banner, ButtonSecondary, Intro, Jobs, LinkPrimary },

  data () {
    return {
      closed: false
    }
  },

  async mounted () {
    if (this.$cookies.isKey('banner:jobs')) {
      this.closed = true
    }

    if (!this.$store.state.workCategories.repository.length) {
      await this.$store.dispatch('workCategories/fetch')
    }

    if (!this.$store.state.workLevels.repository.length) {
      await this.$store.dispatch('workLevels/fetch')
    }

    if (!this.$store.state.workTypes.repository.length) {
      await this.$store.dispatch('workTypes/fetch')
    }

    await this.$store.dispatch('groups/fetch')
    await this.$store.dispatch('jobs/fetch')
  }
}
</script>

<style lang="scss" scoped>
  .boxed {
    padding: 32px 36px 0 36px;
  }
</style>
