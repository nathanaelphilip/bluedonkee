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
        <Markdown :content="description" />
      </div>
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
  </article>
</template>

<script>
import moment from 'moment'
import { truncate } from 'lodash'

import Markdown from '@/components/molecules/Markdown'

import {
  getByIds
} from '@/store/helpers'

import Avatar from '@/components/atoms/Avatar'
import Tag from '@/components/atoms/Tag'
import Tags from '@/components/molecules/Tags'

export default {
  name: 'components-molecules-job',
  props: ['job', 'simple'],

  components: { Avatar, Markdown, Tag, Tags },

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
      return moment(this.job.fields.Created).format('MMM DD')
    },

    description () {
      return truncate(this.job.fields['Long Description'], { 'length': 220, 'separator': /,? +/ })
    }
  },

  async mounted () {
    if (this.job.fields.Group) {
      this.groups = await getByIds({
        ids: this.job.fields.Group,
        type: 'groups'
      })
    }

    if (this.job.fields['Work Categories']) {
      this.workCategories = await getByIds({
        ids: this.job.fields['Work Categories'],
        type: 'workCategories'
      })
    }

    if (this.job.fields['Work Levels']) {
      this.workLevels = await getByIds({
        ids: this.job.fields['Work Levels'],
        type: 'workLevels'
      })
    }

    if (this.job.fields['Work Types']) {
      this.workTypes = await getByIds({
        ids: this.job.fields['Work Types'],
        type: 'workTypes'
      })
    }

    if (this.job.fields['Location']) {
      this.locations = await getByIds({
        ids: this.job.fields['Location'],
        type: 'locations'
      })
    }

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

    @include mq($until: xsmall) {
      grid-template-columns: 48px 1fr;
    }

    &.simple { grid-template-columns: 1fr; }
  }

  .header {
    display: grid;
    grid-template-columns: 1fr 50px;
    grid-column-gap: 16px;
    margin-bottom: grid(4);
    margin-top: 11px;

    @include mq ($until: xsmall) {
      margin-top: 0;
    }

    .simple & {margin-top: 0}
  }

  .heading {
    font-size: 16px;
    font-weight: 600;
    line-height: 1.25;
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
