<template>
  <article @click.prevent="go" v-if="!loading" class="job" :class="{simple}">
    <div class="box-avatar">
      <router-link :to="{ name: 'job', params: { entityType: entityType, entity: entity.fields.Slug , slug: job.fields.Slug } }">
        <Avatar :src="avatar" />
      </router-link>
    </div>
    <div class="box-content">
      <header class="header">
        <div class="box">
          <h2 class="heading">
            <router-link :to="{ name: 'job', params: { entityType: entityType, entity: entity.fields.Slug , slug: job.fields.Slug } }">
              {{ job.fields.Title }}
            </router-link>
          </h2>
          <div class="meta" v-if="entity">
            <router-link @click.native="$event.stopImmediatePropagation()" :to="{ name: entityType, params: { slug: entity.fields.Slug } }">
              {{ entity.fields.Name }}
            </router-link>
            <template v-if="locations.length">
              •
              <router-link @click.native="$event.stopImmediatePropagation()" :to="{ name: 'locationJob', params: { slug: locations[0].fields.Slug } }">
                {{ locations[0].fields.City }}
              </router-link>
            </template>
          </div>
        </div>
        <time class="time">
          <router-link :to="{ name: 'job', params: { entityType: entityType, entity: entity.fields.Slug , slug: job.fields.Slug } }">
            {{ date }}
          </router-link>
        </time>
      </header>
      <div class="content">
        <router-link :to="{ name: 'job', params: { entityType: entityType, entity: entity.fields.Slug , slug: job.fields.Slug } }">
          <Markdown :content="description" />
        </router-link>
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
        <Tag
          v-if="job.fields.Remote"
          key="remote"
          name="Remote"
          route="workRemote"
        />
      </Tags>
    </div>
    <router-link
      :to="{ name: 'job', params: { entityType: entityType, entity: entity.fields.Slug , slug: job.fields.Slug } }" class="background-link">
    </router-link>
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
      campaigns: [],
      loading: true,
      groups: [],
      locations: [],
      workCategories: [],
      workLevels: [],
      workTypes: []
    }
  },

  computed: {
    entityType () {
      return this.groups.length ? 'group' : 'campaign'
    },

    entity () {
      if (this.groups.length) {
        return this.groups[0]
      }

      if (this.campaigns.length) {
        return this.campaigns[0]
      }

      return false
    },

    avatar () {
      return this.entity && this.entity.fields.Avatar ? this.entity.fields.Avatar[0].url : ''
    },

    date () {
      return moment(this.job.fields['Post Date']).format('MMM DD')
    },

    description () {
      return truncate(this.job.fields['Long Description'], { length: 220, separator: /,? +/ })
    }
  },

  methods: {
    go () {
      this.$router.push({ name: 'job', params: { entityType: this.entityType, entity: this.entity.fields.Slug, slug: this.job.fields.Slug } })
    }
  },

  async mounted () {
    if (this.job.fields.Group) {
      this.groups = await getByIds({
        ids: this.job.fields.Group,
        type: 'groups'
      })
    }

    if (this.job.fields.Campaigns) {
      this.campaigns = await getByIds({
        ids: this.job.fields.Campaigns,
        type: 'campaigns'
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

    if (this.job.fields.Location) {
      this.locations = await getByIds({
        ids: this.job.fields.Location,
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
    border: 1px solid transparent;
    border-radius: grid(2);
    grid-template-columns: grid(15) 1fr;
    grid-column-gap: 16px;
    padding: grid(5) grid(6) grid(6) grid(6);
    position: relative;

    @include mq($until: xsmall) {
      grid-template-columns: grid(12) 1fr;
    }

    &.simple { grid-template-columns: 1fr; }

    &:hover {
      background: $BLUELIGHT;
      border-color: $GREY3;
      cursor: pointer;
    }
  }

  .header {
    display: grid;
    grid-template-columns: 1fr 54px;
    grid-column-gap: 16px;
    margin-bottom: grid(4);
    margin-top: 11px;

    @include mq ($until: small) {
      grid-template-columns: 1fr;
    }

    @include mq ($until: xsmall) {
      margin-top: 0;
    }

    .simple & {margin-top: 0}
  }

  .heading {
    font-size: 18px;
    font-weight: 800;
    line-height: 1.25;
    margin-bottom: 5px;
  }

  .meta {
    color: $BLUE;
    font-size: 15px;

    a:hover {
      text-decoration: underline;
    }
  }

  .time {
    color: $BLUEGREY;
    font-size: 15px;
    text-align: right;

    @include mq ($until: small) {
      display: none;
    }

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
