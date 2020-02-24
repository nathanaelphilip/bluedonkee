<template>
  <div>
    <Intro heading="Groups" />
    <div
      class="boxed"
      v-if="!closed"
      >
      <Banner
        @close="$cookies.set('banner:groups'); closed = true"
        heading="The Good Fight."
        content="Find jobs with advocacy groups working to make our democracy more equitable. #letsworkblue"
        :link="{name: 'questions'}"
        :items="$store.getters['groups/sortAlphabetically']"
      />
    </div>
    <Groups :groups="$store.getters['groups/sortAlphabetically']" />
    <BackTop />
  </div>
</template>

<script>
import BackTop from '@/components/molecules/BackTop'
import Banner from '@/components/molecules/Banner'
import Groups from '@/components/molecules/Groups'
import Intro from '@/components/molecules/Intro'

export default {
  name: 'views-groups',
  components: { BackTop, Banner, Intro, Groups },

  data () {
    return { closed: false }
  },

  async mounted () {
    if (this.$cookies.isKey('banner:groups')) {
      this.closed = true
    }

    if (!this.$store.state.groupCategories.repository.length) {
      await this.$store.dispatch('groupCategories/fetch')
    }

    await this.$store.dispatch('groups/fetch')
  }
}
</script>

<style lang="scss" scoped>
  .boxed {
    padding: 32px 36px 0 36px;
  }
</style>
