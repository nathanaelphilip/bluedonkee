<template>
  <article class="job" v-if="!loading">
    <div class="boxed">
      <Header
        :avatar="avatar"
        :entity="entity"
        :entityType="entityType"
        :locations="locations"
        locationroute="locationJob"
        :heading="job.fields.Title"
        :isNew="isNew"
        :workCategories="workCategories"
        :workLevels="workLevels"
        :workTypes="workTypes"
        :remote="job.fields.Remote"
        :website="entity.fields.Website"
        :twitter="entity.fields.Twitter"
        :apply="job.fields['Application URL']"
      />

      <div class="overview">
        <h3 class="subheading">Job Overview</h3>
        <div class="content">
          <Markdown :content="job.fields['Long Description']" />
        </div>
      </div>

      <Report :id="job.id" />
    </div>

    <Jobs
      heading="Related Jobs"
      :jobs="$store.getters['jobs/getFetched'](`job/${this.job.id}`)"
     />

    <BackTop />
  </article>
</template>

<script>
import moment from 'moment'

import {
  getByIds,
  getBySlug,
  getByEntityAndSlug
} from '@/store/helpers'

import BackTop from '@/components/molecules/BackTop'
import Header from '@/components/molecules/Header'
import Jobs from '@/components/molecules/Jobs'
import Markdown from '@/components/molecules/Markdown'
import Report from '@/components/molecules/Report'

export default {
  name: 'job',

  metaInfo () {
    return {
      title: this.job && this.job.fields && this.entity && this.entity.fields ? `${this.job.fields.Title}, ${this.entity.fields.Name}` : 'Office'
    }
  },

  components: { BackTop, Header, Jobs, Markdown, Report },

  data () {
    return {
      entity: false,
      entityType: 'group',
      loading: true,
      locations: [],
      job: {},
      workTypes: [],
      workLevels: [],
      workCategories: []
    }
  },

  computed: {
    avatar () {
      return this.entity ? this.entity.fields.Avatar[0].url : false
    },

    isNew () {
      return moment(this.job.fields['Post Date']) > moment().subtract(5, 'days')
    }
  },

  async mounted () {
    this.entity = await getBySlug({
      slug: this.$route.params.entity,
      type: 'groups'
    })

    if (typeof (this.entity) === 'undefined') {
      this.entity = await getBySlug({
        slug: this.$route.params.entity,
        type: 'campaigns'
      })

      this.entityType = 'campaign'
    }

    this.job = await getByEntityAndSlug({
      entity: this.entity,
      entityType: this.entityType === 'group' ? 'Group' : 'Campaigns',
      slug: this.$route.params.slug,
      type: 'jobs'
    })

    this.$store.dispatch('app/setHeading', this.job.fields.Title)

    this.locations = await getByIds({
      ids: this.job.fields.Location,
      type: 'locations'
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

    if (!this.$store.getters['jobs/getFetched'](`job/${this.job.id}`).length) {
      const search = []

      for (var i = 0; i < this.workCategories.length; i++) {
        search.push(`SEARCH("${this.workCategories[i].fields.Name}", {Work Categories})`)
      }

      await this.$store.dispatch('jobs/fetch', {
        id: `job/${this.job.id}`,
        params: {
          filterByFormula: `AND(OR(${search.join(',')}), RECORD_ID() != "${this.job.id}")`,
          maxRecords: 3
        }
      })
    }

    this.loading = false

    window.analytics.page('Job')
  }
}
</script>

<style lang="scss" scoped>
  .boxed {
    margin-bottom: grid(15);
    padding-top: grid(15);

    @include mq ($until: small) {
      margin-bottom: grid(12);
      padding-left: grid(6);
      padding-right: grid(6);
      padding-top: grid(8);
    }
  }

  .overview {
    margin-bottom: grid(12);
  }

  .subheading {
    font-size: 22px;
    font-weight: 900;
    margin-bottom: 10px;

    @include mq ($until: xsmall) {
      font-size: 19px;
    }
  }

  .content {
    @include Content;
  }
</style>
