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
        <router-link :to="{ name: 'locationGroup', params: { slug: locations[0].fields.Slug } }">
          {{ locations[0].fields.City }}
        </router-link>
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
import { getGroupCategories, getLocations } from '@/store/helpers'

import Avatar from '@/components/atoms/Avatar'
import Tag from '@/components/atoms/Tag'
import Tags from '@/components/molecules/Tags'

export default {
  name: 'components-molecules-group',
  props: ['group'],
  components: { Avatar, Tag, Tags },

  data () {
    return {
      categories: [],
      locations: []
    }
  },

  async mounted () {
    this.categories = this.group.fields['Groups Categories'].length ? await getGroupCategories(this.group.fields['Groups Categories']) : []
    this.locations = this.group.fields['Location'] ? await getLocations(this.group.fields['Location']) : []
  }
}
</script>

<style lang="scss" scoped>
  .group {
    align-items: center;
    display: grid;
    grid-template-columns: 60px 1fr 200px;
    grid-column-gap: 16px;
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
