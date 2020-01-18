<template>
  <article v-if="!loading" class="job">
    <div>
      <Avatar :src="avatar" />
    </div>
    <div>
      <header class="header">
        <div class="box">
          <h2 class="heading">
            <router-link :to="{ name: 'job', params: { slug: job.fields.Slug } }">
              {{ job.fields.Title }}
            </router-link>
          </h2>
          <div class="meta" v-if="group">
            <router-link :to="{ name: 'group', params: { slug: group.fields.Slug } }">
              {{ group.fields.Name }}
            </router-link>
            <template v-if="locations.length">
              -
              <router-link :to="{ name: 'locationJob', params: { slug: locations[0].fields.Slug } }">
                {{ locations[0].fields.City }}
              </router-link>
            </template>
          </div>
        </div>
        <time class="time">
          {{ date }}
        </time>
      </header>
      <div class="content">
        {{ this.job.fields.Description }}
      </div>
      <div class="tags">
        <Tags>
          <Tag
            v-for="item in workCategories"
            :key="`work-category-${item.id}`"
            :name="item.fields.Name"
            :slug="item.fields.Slug"
            route="workCategory"
          />
          <Tag
            v-for="item in workTypes"
            :key="`work-type-${item.id}`"
            :name="item.fields.Name"
            :slug="item.fields.Slug"
            route="workType"
          />
          <Tag
            v-for="item in workLevels"
            :key="`work-level-${item.id}`"
            :name="item.fields.Name"
            :slug="item.fields.Slug"
            route="workLevel"
          />
        </Tags>
      </div>
    </div>
  </article>
</template>

<script>
import moment from 'moment'
import {
  getGroups,
  getLocations,
  getWorkCategories,
  getWorkLevels,
  getWorkTypes
} from '@/store/helpers'

import Avatar from '@/components/atoms/Avatar'
import Tag from '@/components/atoms/Tag'
import Tags from '@/components/molecules/Tags'

export default {
  name: 'components-molecules-job',
  props: ['job'],

  components: { Avatar, Tag, Tags },

  data () {
    return {
      loading: false,
      groups: [],
      locations: [],
      workCategories: [],
      workLevels: [],
      workTypes: []
    }
  },

  computed: {
    group () {
      return this.groups.length ? this.groups[0] : false
    },

    avatar () {
      return this.group ? this.group.fields.Avatar[0].url : ''
    },

    date () {
      return moment(this.job.fields.Create).format('MMM DD')
    }
  },

  async mounted () {
    this.groups = await getGroups(this.job.fields.Group)
    this.workCategories = await getWorkCategories(this.job.fields['Work Categories'])
    this.workLevels = await getWorkLevels(this.job.fields['Work Levels'])
    this.workTypes = await getWorkTypes(this.job.fields['Work Types'])
    this.locations = await getLocations(this.job.fields['Location'])
    this.loading = false
  }
}
</script>

<style lang="scss" scoped>
  .job {
    align-items: start;
    display: grid;
    grid-template-columns: 60px 1fr;
    grid-column-gap: 16px;
  }

  .header {
    display: grid;
    grid-template-columns: 1fr 50px;
    grid-column-gap: 16px;
    margin-bottom: 15px;
    margin-top: 11px;
  }

  .heading {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 5px;
  }

  .meta {
    color: $BLUE;
    font-size: 15px;
  }

  .time {
    color: $BLUEGREY;
    font-size: 15px;
  }

  .content {
    font-size: 15px;
    line-height: 1.46;
    margin-bottom: 15px;
  }
</style>
