<template>
  <header class="header">
    <div class="top">
      <Avatar :src="avatar" />
      <div class="links">
        <a :href="`${group.fields.Website}`" target="_blank">Website</a>
        <a :href="`https://twitter.com/${group.fields.Twitter}`" target="_blank">{{ group.fields.Twitter }}</a>
      </div>
    </div>

    <h2 class="heading">{{ heading }}</h2>

    <div class="location">
      Group / Location Here
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
import Tag from '@/components/atoms/Tag'
import Tags from '@/components/molecules/Tags'

export default {
  props: ['avatar', 'group', 'heading', 'workCategories', 'workLevels', 'workTypes', 'groupCategories'],
  components: { Avatar, Tag, Tags }
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

  .location {
    color: $BLUE;
    font-size: 17px;
    margin-bottom: 24px;
  }

  .tags {
    margin-bottom: 36px;
  }
</style>
