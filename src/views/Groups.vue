<template>
  <section>
    <portal to="banner">
      <Banner
        heading="People-Powered Groups"
        content="Find jobs with advocacy groups working to make our democracy more equitable. #letsworkblue"
      />
    </portal>
    <Groups :groups="$store.getters['groups/getFetched']('groups')" />
    <Pager
      @load="load"
      :loading="$store.state.groups.loading === 'groups'"
      v-if="$store.getters['groups/getOffset']('groups')"
    />
    <BackTop v-if="!$store.getters['groups/getOffset']('groups')" />
  </section>
</template>

<script>
import BackTop from '@/components/molecules/BackTop'
import Banner from '@/components/molecules/Banner'
import Groups from '@/components/molecules/Groups'
import Pager from '@/components/molecules/Pager'

const pageSize = 5

export default {
  name: 'views-groups',

  metaInfo: {
    title: 'Groups'
  },

  components: { BackTop, Banner, Groups, Pager },

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

    if (!this.$store.getters['groups/getFetched']('groups').length) {
      await this.load()
    }

    window.analytics.page('Groups')
  },

  methods: {
    async load () {
      await this.$store.dispatch('groups/fetch', {
        id: 'groups',
        params: {
          pageSize,
          sort: [{ field: 'Name', direction: 'asc' }],
          offset: this.$store.getters['groups/getOffset']('groups')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .boxed {
    padding: grid(8) grid(8) 0 grid(8);

    @include mq($until: xsmall) {
      padding: grid(6) grid(4) 0 grid(4);
    }
  }
</style>
