<template>
  <article class="about">
    <HeaderPage
      :newsletter="true"
      :heading="`We believe the power lies with the people`"
      :content="`WorkBlue is a nonprofit tech organization that helps change-makers find jobs with Democratic candidates and committees, progressive organizations, and other nonprofits.`"
    />
    <div class="people">
      <AvatarGrid :entities="entities" />
    </div>
    <div class="content">
      <h3>Our Story</h3>
      <p>Short answer: We were frustrated. Frustrated by not being able to find places to work whose causes aligned with our own. (Googling “progressive organizations” only got us so far.)</p>
      <p>So we built WorkBlue. We do the sifting for you to identify credible groups and organizations working for the right causes — and we’ve put them all in one central, searchable place.</p>
      <p>We fundamentally believe people want to work for inspiring people-powered campaigns and organizations. Our goal is to connect them.</p>
    </div>
    <div class="content">
      <h3>Get Involved</h3>
      <p>We’re currently a community-run platform — meaning we rely on our community to help find new organizations and jobs. So if you have a job at your organization, please let us know. Click “Post Job” or tweet at us <a href="https://twitter.com/@workblueorg">@workblueorg</a>, and we’ll happily add it.</p>
      <p>We are currently in a limited Beta. We welcome all product feedback and suggestions for improvements to WorkBlue. Fill out our contact form, and a real human we’ll be in touch.</p>
    </div>
    <div class="content">
      <h3>Press Kit</h3>
      <p>Thanks for your interest in WorkBlue! We're also happy to help with any questions you have. Just contact us and you'll reach a real human who can provide original materials. Here's our logo and product screenshots.</p>
      <div class="actions">
        <LinkPrimary href="#">Download Press Package</LinkPrimary>
        <LinkSecondary classes="large" :to="{'name': 'contact'}">Contact Us</LinkSecondary>
      </div>
    </div>
  </article>
</template>

<script>
import { shuffle, slice } from 'lodash'

import AvatarGrid from '@/components/molecules/AvatarGrid'
import HeaderPage from '@/components/molecules/HeaderPage'
import LinkPrimary from '@/components/atoms/LinkPrimary'
import LinkSecondary from '@/components/atoms/LinkSecondary'

export default {
  name: 'views-questions',

  metaInfo: {
    title: 'About'
  },

  components: { AvatarGrid, HeaderPage, LinkPrimary, LinkSecondary },

  computed: {
    entities () {
      const campaigns = this.$store.state.campaigns.repository
      const groups = this.$store.state.groups.repository
      const entities = shuffle(campaigns.concat(groups))

      return slice(entities, 0, 14)
    }
  },

  async mounted () {
    await this.$store.dispatch('groups/fetch', {
      id: 'groups-avatars',
      params: {
        pageSize: 20,
        sort: [{ field: 'Name', direction: 'asc' }]
      }
    })

    await this.$store.dispatch('campaigns/fetch', {
      id: 'groups-campaigns',
      params: {
        pageSize: 20,
        sort: [{ field: 'Name', direction: 'asc' }]
      }
    })
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
      margin-bottom: grid(15);
    }

    h3 {
      font-size: 28px;
      font-weight: 900;
      margin-bottom: grid(6);

      @include mq ($until: xsmall) {
        font-size: 19px;
        margin-bottom: grid(3);
      }
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
