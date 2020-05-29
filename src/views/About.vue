<template>
  <article class="about">
    <HeaderPage
      :newsletter="true"
      :heading="`Empower People<br>Power Democracy`"
      :content="`WorkBlue is a digital tool designed to build a community of Democraitc job seekers and employers; designed to help talented change-makers (like you!) find opportunities to work for Democratic candidates and committees, progressive organizations, and nonprofits.`"
    />
    <div class="people">
      <AvatarGrid :entities="entities" />
    </div>
    <div class="content">
      <h3>Our Story</h3>
      <p>Finding a job in the world of Democratic politics is not exactly easy — but it should be.</p>
      <p>Here’s how we see it: If folks want to get involved in changing our country for the better, shouldn’t we do everything we can to help them get connected with the groups and people doing that good work?</p>
      <p>So we set out to do something about it.</p>
      <p>WorkBlue is a digital tool designed to build a community of Democraitc job seekers and employers; designed to help talented change-makers (like you!) find opportunities to work for Democratic candidates and committees, progressive organizations, and nonprofits.</p>
      <p>Our team sifts through job postings from credible groups, organizations, and campaigns in the world of Democraitc politics. We compile the active job postings into one central and searchable place — WorkBlue.org.</p>
    </div>
    <div class="content">
      <h3>People-Powered</h3>
      <p>We’re a community-run platform — meaning we rely on our WorkBlue community to help find new job postings from committees and candidates, organizations and nonprofits. So if you know of a job opportunity, let us know!</p>
      <p>Click “Post Job” at WorkBlue.org or tweet at us (<a href="https://twitter.com/@workblueorg">@WorkBlueOrg</a>), and we’ll happily add the posting.</p>
      <p>We are currently in Beta mode — welcoming any and all feedback and suggestions for improvements to WorkBlue. Fill out our contact form, and a real human we’ll be in touch.</p>
    </div>
    <div class="content">
      <h3>Press Kit</h3>
      <p>Thanks for your interest in WorkBlue! We're happy to help with any questions you have. Send us a message and you'll reach a real human who can help you navigate the WorkBlue story. Here's our logo and product screenshots.</p>
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
