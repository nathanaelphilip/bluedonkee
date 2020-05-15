<template>
  <header class="header">
    <div class="top">
      <div>
        <Avatar :src="avatar" />
      </div>
      <mq-layout class="links" mq="small+">
        <a :href="website" target="_blank"><IconLink width="19" height="19" class="icon" /></a>
        <a :href="`https://twitter.com/${twitter}`" target="_blank"><IconTwitter width="19" height="16" class="icon" /></a>
        <Share :path="$route.path" />
        <LinkPrimary
           v-if="apply"
           classes="small"
           @clicked="track('Applied for Job')"
           :href="apply">
           Apply
        </LinkPrimary>
        <LinkPrimary
           v-if="donate"
           classes="small"
           @clicked="track('Donated')"
           :href="donate">
           Donate
        </LinkPrimary>
      </mq-layout>
      <mq-layout class="links" :mq="['xxsmall', 'xsmall', 'small']">
        <a :href="website" target="_blank"><IconLink width="19" height="19" class="icon" /></a>
        <a :href="`https://twitter.com/${twitter}`" target="_blank"><IconTwitter width="19" height="16" class="icon" /></a>
      </mq-layout>
      <mq-layout class="links-mobile" :mq="['xxsmall', 'xsmall', 'small']">
        <Share :path="$route.path" />
        <LinkPrimary
           v-if="apply"
           classes="small"
           @clicked="track('Applied for Job')"
           :href="apply">
           Apply
        </LinkPrimary>
        <LinkPrimary
           v-if="donate"
           classes="small"
           @clicked="track('Donated')"
           :href="donate">
           Donate
        </LinkPrimary>
      </mq-layout>
    </div>

    <h2 class="heading">{{ heading }}</h2>

    <div class="info">
      <Bug v-if="isNew">New</Bug>
      <template v-if="entity">
        <router-link :to="{
          name: entityType,
          params: {slug: entity.fields.Slug}
          }">{{ entity.fields.Name }}
        </router-link> –
      </template>
      <template v-if="locations && locations.length">
        <Locations
          :locations="locations"
          :route="locationroute"
        />
      </template>
    </div>

    <div class="description" v-if="description">
      <Markdown :content="description" />
    </div>

    <div class="tags">
      <Tags>
        <Tag
          v-for="category in groupCategories"
          :key="`work-category-${category.id}`"
          :slug="category.fields.Slug"
          :name="category.fields.Name"
          route="groupCategory"
         />
        <Tag
          v-for="category in workCategories"
          :key="`work-category-${category.id}`"
          :slug="category.fields.Slug"
          :name="category.fields.Name"
          route="workCategory"
         />
       <Tag
         v-for="level in workLevels"
         :key="`work-level-${level.id}`"
         :slug="level.fields.Slug"
         :name="level.fields.Name"
         route="workLevel"
        />
      <Tag
        v-for="type in workTypes"
        :key="`type-${type.id}`"
        :slug="type.fields.Slug"
        :name="type.fields.Name"
        route="workType"
       />
       <Tag
         v-for="office in offices"
         :key="`type-${office.id}`"
         :slug="office.fields.Slug"
         :name="office.fields.Name"
         route="office"
        />
        <Tag
          key="remote"
          name="Remote"
          v-if="remote"
          route="workRemote"
        />
     </Tags>
    </div>
  </header>
</template>

<script>
import Avatar from '@/components/atoms/Avatar'
import Bug from '@/components/atoms/Bug'
import LinkPrimary from '@/components/atoms/LinkPrimary'
import Locations from '@/components/molecules/Locations'
import Markdown from '@/components/molecules/Markdown'
import Share from '@/components/molecules/Share'
import Tag from '@/components/atoms/Tag'
import Tags from '@/components/molecules/Tags'

import IconLink from '@/components/icons/Link'
import IconTwitter from '@/components/icons/Twitter'

export default {
  props: [
    'apply',
    'avatar',
    'description',
    'donate',
    'entity',
    'entityType',
    'groupCategories',
    'heading',
    'isNew',
    'locations',
    'locationroute',
    'offices',
    'remote',
    'twitter',
    'website',
    'workCategories',
    'workLevels',
    'workTypes'
  ],

  components: {
    Avatar,
    Bug,
    LinkPrimary,
    Locations,
    Markdown,
    Share,
    Tag,
    Tags,
    IconLink,
    IconTwitter
  },

  methods: {
    track (text) {
      window.analytics.track(text, {
        id: this.job.id,
        title: this.job.fields.Title,
        entity: this.entity.fields.Name
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .top {
    align-items: flex-start;
    display: grid;
    grid-template-columns: 120px auto;
    margin-bottom: 18px;

    @include mq ($until: xsmall) {
      grid-template-columns: 90px auto;
    }
  }

  .links-mobile {
    @include Flex;
    background: $WHITE;
    bottom: 0px;
    left: 0;
    padding: grid(3) grid(6);
    position: fixed;
    width: 100%;

    ::v-deep a {
      flex: 1;
      margin-left: grid(4);
      text-align: center;
    }
  }

  .links {
    @include Flex;
    color: $BLUE;
    font-size: 15px;
    margin-top: 6px;
    justify-content: flex-end;

    > * {
      &:not(:last-child) {
        margin-right: grid(3);
      }
    }

    > a {
      @include ButtonSquareIcon;
    }
  }

  .header {
    margin-bottom: grid(15);

    @include mq ($until: xsmall) {
      margin-bottom: grid(12);
    }
  }

  .heading {
    font-size: 36px;
    font-weight: 900;
    line-height: 1.35;
    max-width: 405px;
    margin-bottom: 8px;

    @include mq ($until: xsmall) {
      font-size: 24px;
    }
  }

  .info {
    @include Flex ($justify: flex-start);
    color: $BLUE;
    font-size: 17px;
    margin-bottom: grid(6);

    .bug {
      margin-right: grid(3)
    }
  }

  .tags {
    margin-bottom: grid(9);
  }

  .description {
    font-size: 17px;
    line-height: 1.4;
    margin-bottom: grid(6);
  }
</style>
