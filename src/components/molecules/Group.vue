<template>
  <article class="group">
    <div class="box">
      <Avatar :src="group.fields.Avatar[0].url" />
    </div>
    <div class="box">
      <h2 class="heading">
        <router-link :to="{ name: 'group', params: { slug: group.fields.Slug } }">
          {{ group.fields.Name }}
        </router-link>
      </h2>
      <div class="location" v-if="locations.length">
        <Locations
          :locations="locations"
          route="locationGroup"
        />
      </div>
    </div>
    <div class="tags">
       <Tags>
         <Tag
           v-for="category in categories"
           :key="`group-category-${category.id}`"
           :name="category.fields.Name"
           :slug="category.fields.Slug"
           route="groupCategory"
         />
       </Tags>
    </div>
  </article>
</template>

<script>
import { getByIds } from '@/store/helpers'

import Avatar from '@/components/atoms/Avatar'
import Locations from '@/components/molecules/Locations'
import Tag from '@/components/atoms/Tag'
import Tags from '@/components/molecules/Tags'

export default {
  name: 'components-molecules-group',
  props: ['group'],
  components: { Avatar, Locations, Tag, Tags },

  data () {
    return {
      categories: [],
      locations: []
    }
  },

  async mounted () {
    this.categories = this.group.fields['Groups Categories'].length ? await getByIds({
      ids: this.group.fields['Groups Categories'],
      type: 'groupCategories'
    }) : []

    this.locations = this.group.fields.Location ? await getByIds({
      ids: this.group.fields.Location,
      type: 'locations'
    }) : []
  }
}
</script>

<style lang="scss" scoped>
  .group {
    align-items: center;
    display: grid;
    grid-template-columns: 60px 1fr 200px;
    grid-column-gap: 16px;

    @include mq($until: xsmall) {
      grid-template-columns: 48px 1fr 100px;
    }
  }

  .heading {
    font-weight: 600;
    margin-bottom: 5px;
  }

  .location {
    color: $BLUE;
    font-size: 15px;
  }

  .tags {
    display: flex;
    justify-content: flex-end
  }
</style>
