<template>
  <article v-if="!loading" class="job" :class="{simple}">
    <div class="box-avatar">
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
        {{ description }}
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
import { truncate } from 'lodash'

import {
  getByIds
} from '@/store/helpers'

import Avatar from '@/components/atoms/Avatar'
import Tag from '@/components/atoms/Tag'
import Tags from '@/components/molecules/Tags'

export default {
  name: 'components-molecules-job',
  props: ['job', 'simple'],

  components: { Avatar, Tag, Tags },

  data () {
    return {
      loading: true,
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
      return this.group && this.group.fields.Avatar ? this.group.fields.Avatar[0].url : ''
    },

    date () {
      return moment(this.job.fields.Create).format('MMM DD')
    },

    description () {
      return truncate(this.job.fields.Description, { 'length': 220, 'separator': /,? +/ })
    }
  },

  async mounted () {
    this.groups = await getByIds({
      ids: this.job.fields.Group,
      type: 'groups'
    })

    this.workCategories = await getByIds({
      ids: this.job.fields['Work Categories'],
      type: 'workCategories'
    })

    this.workLevels = await getByIds({
      ids: this.job.fields['Work Levels'],
      type: 'workLevels'
    })

    this.workTypes = await getByIds({
      ids: this.job.fields['Work Types'],
      type: 'workTypes'
    })

    this.locations = await getByIds({
      ids: this.job.fields['Location'],
      type: 'locations'
    })

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

    &.simple { grid-template-columns: 1fr; }
  }

  .header {
    display: grid;
    grid-template-columns: 1fr 50px;
    grid-column-gap: 16px;
    margin-bottom: 15px;
    margin-top: 11px;

    .simple & {margin-top: 0}
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

    .simple & { display: none }
  }

  .box-avatar {
    .simple & { display: none }
  }

  .content {
    font-size: 15px;
    line-height: 1.46;
    margin-bottom: 15px;
  }
</style>
