<template>
  <article class="about" v-if="!loading">
    <HeaderPage
      :newsletter="true"
      :heading="fields.Heading"
      :content="fields.Subheading"
    />
    <div class="people">
      <AvatarGrid :entities="entities" />
    </div>
    <Markdown class="content" :content="fields.Content" />
    <div class="actions">
      <LinkPrimary href="https://www.dropbox.com/sh/vbiobw20gv98oto/AABGFjvfpdrCdmkuAq6e0fyFa?dl=0" target="_blank">Download Press Package</LinkPrimary>
      <LinkSecondary classes="large" :to="{'name': 'contact'}">Contact Us</LinkSecondary>
    </div>
  </article>
</template>

<script>
import { shuffle, slice } from 'lodash'

import AvatarGrid from '@/components/molecules/AvatarGrid'
import HeaderPage from '@/components/molecules/HeaderPage'
import LinkPrimary from '@/components/atoms/LinkPrimary'
import LinkSecondary from '@/components/atoms/LinkSecondary'
import Markdown from '@/components/molecules/Markdown'

export default {
  name: 'views-questions',

  metaInfo: {
    title: 'About'
  },

  components: { AvatarGrid, HeaderPage, LinkPrimary, LinkSecondary, Markdown },

  data () {
    return {
      loading: true,
      fields: false
    }
  },

  computed: {
    entities () {
      const campaigns = this.$store.state.campaigns.repository
      const groups = this.$store.state.groups.repository
      const entities = shuffle(campaigns.concat(groups))

      return slice(entities, 0, 14)
    }
  },

  async mounted () {
    const key = 'About'

    if (!(key in this.$store.state.cms.pages)) {
      await this.$store.dispatch('cms/fetchPage', key)
    }

    this.fields = this.$store.state.cms.pages[key].fields

    if (this.$store.state.campaigns.repository.length <= 7) {
      await this.$store.dispatch('campaigns/fetch', {
        id: 'groups-campaigns',
        params: {
          pageSize: 20,
          sort: [{ field: 'Name', direction: 'asc' }]
        }
      })
    }

    if (this.$store.state.groups.repository.length <= 7) {
      await this.$store.dispatch('groups/fetch', {
        id: 'groups-avatars',
        params: {
          pageSize: 20,
          sort: [{ field: 'Name', direction: 'asc' }]
        }
      })
    }

    this.loading = false
  }
}
</script>

<style lang="scss" scoped>
  .about {
    padding-bottom: grid(15);
    padding-top: grid(22);

    @include mq ($until: xsmall) {
      padding-bottom: grid(8);
      padding-top: grid(8);
    }
  }

  .header {
    margin-bottom: grid(11);

    @include mq ($until: xsmall) {
      margin-bottom: grid(12);
    }
  }

  .people {
    width: 100vw;
    position: relative;
    left: 50%;
    right: 50%;
    margin-bottom: grid(16);
    margin-left: -50vw;
    margin-right: -50vw;
  }

  .content {
    @include Content;

    &:not(:last-child) {
      margin-bottom: grid(4);
    }
  }

  .actions {
    @include Flex ($justify: flex-start);

    @include mq ($until: xsmall) {
      align-items: flex-start;
      flex-direction: column;
    }

    ::v-deep .button {
      &:not(:last-child) {
        @include mq ($from: xsmall) {
          margin-right: grid(4);
        }

        @include mq ($until: xsmall) {
          margin-bottom: grid(2);
        }
      }
    }
  }
</style>
