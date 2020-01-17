<template>
  <article class="job" v-if="!loading">
    <header class="header">
      <div class="top">
        <Avatar :src="avatar" />
        <div class="links">
          <a :href="`${groups[0].fields.Website}`" target="_blank">Website</a>
          <a :href="`https://twitter.com/${groups[0].fields.Twitter}`" target="_blank">{{ groups[0].fields.Twitter }}</a>
        </div>
      </div>

      <h2 class="heading">{{ job.fields.Title }}</h2>

      <div class="location">
        <router-link :to="{ name: 'group', params: { slug: group.fields.Slug } }">
          {{ group.fields.Name }}
        </router-link>
      </div>
    </header>
    <div class="tags">
      <Tags>
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
    <div class="overview">
      <h3 class="subheading">Job Overview</h3>
      <div class="content">
        {{ job.fields.Description }}
      </div>
    </div>
    <div>
      Something off with this post?
      <button>Flag Posting</button>
    </div>
  </article>
</template>

<script>
import {
  getJob,
  getGroups,
  getWorkCategories,
  getWorkLevels,
  getWorkTypes
} from '@/store/helpers'

import Avatar from '@/components/atoms/Avatar'
import Tag from '@/components/atoms/Tag'
import Tags from '@/components/molecules/Tags'

export default {
  name: 'job',
  components: { Avatar, Tag, Tags },

  data () {
    return {
      loading: true,
      job: {},
      groups: [],
      workTypes: [],
      workLevels: [],
      workCategories: []
    }
  },

  computed: {
    avatar () {
      return this.group.fields.Avatar[0].url
    },

    group () {
      return this.groups[0]
    }
  },

  async mounted () {
    this.job = await getJob(this.$route.params.slug)
    this.groups = await getGroups(this.job.fields.Group)
    this.workCategories = await getWorkCategories(this.job.fields['Work Categories'])
    this.workLevels = await getWorkLevels(this.job.fields['Work Levels'])
    this.workTypes = await getWorkTypes(this.job.fields['Work Types'])
    this.loading = false
  }
}
</script>

<style lang="scss" scoped>
  .job {
    background-image: linear-gradient(#f6fafc 25%, rgba($GREY, .01));
    padding: 32px;
  }

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
  }

  .tags {
    margin-bottom: 36px;
  }

  .overview {
    margin-bottom: 24px;
  }

  .subheading {
    font-size: 18px;
    font-weight: 900;
    margin-bottom: 10px;
  }

  .content {
    font-size: 15px;
    line-height: 1.6666;
  }
</style>
