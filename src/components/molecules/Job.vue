<template>
  <article v-if="!loading" class="job">
    <div>
      <img class="avatar" :src="avatar" alt="">
    </div>
    <div>
      <header class="header">
        <div class="box">
          <h2 class="heading">{{ this.job.fields.Title }}</h2>
          <div class="meta">
            {{ group.fields.Name }}
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
  getWorkCategories,
  getWorkLevels,
  getWorkTypes
} from '@/store/helpers'

import Tag from '@/components/atoms/Tag'
import Tags from '@/components/molecules/Tags'

export default {
  name: 'components-molecules-job',
  props: ['job'],

  components: { Tag, Tags },

  data () {
    return {
      loading: false,
      groups: [],
      workCategories: [],
      workLevels: [],
      workTypes: []
    }
  },

  computed: {
    group () {
      return this.groups[0]
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

  .avatar {
    display: block;
    border-radius: 100%;
    height: auto;
    width: 60px;
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
