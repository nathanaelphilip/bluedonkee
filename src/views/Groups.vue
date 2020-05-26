<template>
  <section>
    <portal to="banner">
      <Banner
        heading="People-Powered Groups"
        content="Find jobs with advocacy groups working to make our democracy more equitable. #letsworkblue"
      />
    </portal>
    <portal to="filters">
      <Navigation alignment="»center" :menu="menu" />
    </portal>
    <Groups
      :groups="$store.getters['groups/getFetched']('groups')"
      :showJobs="$mq !== 'small' && $mq !== 'xsmall' && $mq !== 'xxsmall'"
    />
    <Pager
      @load="load"
      :loading="$store.state.groups.loading === 'groups'"
      v-if="$store.getters['groups/getOffset']('groups')"
    />
    <BackTop v-if="!$store.getters['groups/getOffset']('groups')" />
  </section>
</template>

<script>
import { slice } from 'lodash'

import BackTop from '@/components/molecules/BackTop'
import Banner from '@/components/molecules/Banner'
import Groups from '@/components/molecules/Groups'
import Navigation from '@/components/molecules/Navigation'
import Pager from '@/components/molecules/Pager'

const pageSize = 5

export default {
  name: 'views-groups',

  metaInfo: {
    title: 'Groups'
  },

  components: { BackTop, Banner, Groups, Pager, Navigation },

  data () {
    return { closed: false }
  },

  computed: {
    menu () {
      const menu = []
      const more = []
      const categories = this.$store.state.groupCategories.repository
      const exposed = slice(categories, 0, 6)
      const rest = slice(categories, 6, categories.length)

      menu.push({
        type: 'shallow',
        name: 'All',
        to: { name: 'groups' }
      })

      for (let i = 0; i < exposed.length; i++) {
        menu.push({
          type: 'shallow',
          name: exposed[i].fields.Name,
          to: { name: 'groupCategory', params: { slug: exposed[i].fields.Slug } }
        })
      }

      for (let i = 0; i < rest.length; i++) {
        more.push({
          name: rest[i].fields.Name,
          to: { name: 'groupCategory', params: { slug: rest[i].fields.Slug } }
        })
      }

      menu.push({
        type: 'deep',
        name: 'More',
        menu: more
      })

      return menu
    }
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
          pageSize: ['xxsmall', 'xsmall'].includes(this.$mq) ? 20 : pageSize,
          sort: [{ field: 'Name', direction: 'asc' }],
          offset: this.$store.getters['groups/getOffset']('groups')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .nav {
    background: $WHITE;
    margin-bottom: grid(18);

    .filters.»stuck & {
      border-bottom: 1px solid $GREY;
      position: relative;
      padding: grid(3) 0;
      top: -1px;
    }
  }
</style>
