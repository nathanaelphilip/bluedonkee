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
    <Pager
      @load="load"
      :loading="$store.state.groups.loading === 'groups'"
      v-if="$store.state.groups.offset"
    />
    <BackTop v-if="!$store.state.groups.offset" />
  </div>
</template>

<script>
import BackTop from '@/components/molecules/BackTop'
import Banner from '@/components/molecules/Banner'
import Groups from '@/components/molecules/Groups'
import Intro from '@/components/molecules/Intro'
import Pager from '@/components/molecules/Pager'

const pageSize = 20

export default {
  name: 'views-groups',
  components: { BackTop, Banner, Intro, Groups, Pager },

  data () {
    return { closed: false }
  },

  async mounted () {
    await this.$store.dispatch('groups/remove')

    if (this.$cookies.isKey('banner:groups')) {
      this.closed = true
    }

    if (!this.$store.state.groupCategories.repository.length) {
      await this.$store.dispatch('groupCategories/fetch')
    }

    await this.load()
  },

  methods: {
    async load () {
      await this.$store.dispatch('groups/fetch', {
        params: {
          pageSize,
          sort: [{ field: 'Name', direction: 'asc' }],
          offset: this.$store.state.groups.offset
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .boxed {
    padding: 32px 36px 0 36px;

    @include mq($until: xsmall) {
      padding: 24px 16px 0 16px;
    }
  }
</style>
