<template>
  <header class="header">
    <div class="top">
      <Avatar :src="avatar" />
      <div class="links">
        <a :href="website" target="_blank">Website</a>
        <a :href="`https://twitter.com/${twitter}`" target="_blank">{{ twitter }}</a>
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
        <Location
          v-for="location in locations"
          :key="location.id"
          :location="location"
          :route="locationroute"
        />
      </template>
    </div>

    <div class="tags">
      <Tags>
        <Tag
          v-for="category in groupCategories"
          :key="`work-category-${category.id}`"
          :slug="category.fields.Slug"
          :name="category.fields.Name"
          route="workCategory"
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
     </Tags>
    </div>
  </header>
</template>

<script>
import Avatar from '@/components/atoms/Avatar'
import Location from '@/components/atoms/Location'
import Tag from '@/components/atoms/Tag'
import Tags from '@/components/molecules/Tags'

export default {
  props: [
    'avatar',
    'group',
    'heading',
    'workCategories',
    'workLevels',
    'workTypes',
    'groupCategories',
    'locations',
    'locationroute',
    'twitter',
    'website'
  ],

  components: { Avatar, Location, Tag, Tags }
}
</script>

<style lang="scss" scoped>
  .top {
    display: grid;
    grid-template-columns: 120px auto;
    margin-bottom: 18px;
  }

  .links {
    color: $BLUE;
    display: flex;
    font-size: 15px;
    justify-content: flex-end;

    > a {
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
</style>
