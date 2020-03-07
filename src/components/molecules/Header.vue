<template>
  <header class="header">
    <div class="top">
      <div>
        <Avatar :src="avatar" />
      </div>
      <div class="links">
        <a :href="website" target="_blank"><IconLink width="19" height="19" />Website</a>
        <a :href="`https://twitter.com/${twitter}`" target="_blank"><IconTwitter width="19" height="16" />{{ twitter }}</a>
      </div>
    </div>

    <h2 class="heading">{{ heading }}</h2>

    <div class="info">
      <template v-if="group">
        <router-link :to="{
          name: 'group',
          params: {slug: group.fields.Slug}
          }">{{ group.fields.Name }}
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
     </Tags>
    </div>
  </header>
</template>

<script>
import Avatar from '@/components/atoms/Avatar'
import Locations from '@/components/molecules/Locations'
import Markdown from '@/components/molecules/Markdown'
import Tag from '@/components/atoms/Tag'
import Tags from '@/components/molecules/Tags'

import IconLink from '@/components/icons/Link'
import IconTwitter from '@/components/icons/Twitter'

export default {
  props: [
    'avatar',
    'description',
    'group',
    'groupCategories',
    'heading',
    'locations',
    'locationroute',
    'offices',
    'twitter',
    'website',
    'workCategories',
    'workLevels',
    'workTypes'
  ],

  components: {
    Avatar,
    Locations,
    Markdown,
    Tag,
    Tags,
    IconLink,
    IconTwitter
  }
}
</script>

<style lang="scss" scoped>
  .top {
    align-items: flex-start;
    display: grid;
    grid-template-columns: 120px auto;
    margin-bottom: 18px;
  }

  .links {
    color: $BLUE;
    display: flex;
    font-size: 15px;
    margin-top: 6px;
    justify-content: flex-end;

    > a {
      @include Flex($justify: flex-start);

      &:not(:last-child) {
        margin-right: 24px;
      }
    }
  }

  .header {
    margin-bottom: 24px;
  }

  .heading {
    font-size: 26px;
    font-weight: 900;
    line-height: 1.15;
    max-width: 405px;
    margin-bottom: 8px;
  }

  .info {
    color: $BLUE;
    font-size: 17px;
    margin-bottom: 24px;
  }

  .tags {
    margin-bottom: 36px;
  }

  .icon-link,
  .icon-twitter {
    fill: $GREY;
    margin-right: 6px;
  }
</style>
