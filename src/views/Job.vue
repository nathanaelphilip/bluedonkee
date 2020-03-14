<template>
  <article class="job" v-if="!loading">
    <Intro :back="{ name: 'jobs' }" :heading="job.fields.Title">
      <Share :path="$route.path" />
      <LinkPrimary :href="job.fields['Application URL']">Apply</LinkPrimary>
    </Intro>
    <div class="boxed">
      <Header
        :avatar="avatar"
        :group="group"
        :locations="locations"
        locationroute="locationJob"
        :heading="job.fields.Title"
        :workCategories="workCategories"
        :workLevels="workLevels"
        :workTypes="workTypes"
        :website="group.fields.Website"
        :twitter="group.fields.Twitter"
      />

      <div class="overview">
        <h3 class="subheading">Job Overview</h3>
        <div class="content">
          <Markdown :content="job.fields['Long Description']" />
        </div>
      </div>

      <Report :id="job.id" />
    </div>

    <Jobs heading="Related Jobs" :jobs="$store.getters['jobs/getRelated'](`job/${this.job.id}`)" :simple="true" />

    <BackTop />
  </article>
</template>

<script>
import {
  getByIds,
  getBySlug
} from '@/store/helpers'

import BackTop from '@/components/molecules/BackTop'
import Header from '@/components/molecules/Header'
import Intro from '@/components/molecules/Intro'
import Jobs from '@/components/molecules/Jobs'
import LinkPrimary from '@/components/atoms/LinkPrimary'
import Markdown from '@/components/molecules/Markdown'
import Report from '@/components/molecules/Report'
import Share from '@/components/molecules/Share'

export default {
  name: 'job',
  components: { BackTop, LinkPrimary, Header, Intro, Jobs, Markdown, Report, Share },

  data () {
    return {
      loading: true,
      locations: [],
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
    this.job = await getBySlug({
      slug: this.$route.params.slug,
      type: 'jobs'
    })

    this.locations = await getByIds({
      ids: this.job.fields.Location,
      type: 'locations'
    })

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

    if (!this.$store.getters['jobs/getRelated'](`job/${this.job.id}`)) {
      const search = []

      for (var i = 0; i < this.workCategories.length; i++) {
        search.push(`SEARCH("${this.workCategories[i].fields.Name}", {Work Categories})`)
      }

      await this.$store.dispatch('jobs/fetchRelated', {
        id: `job/${this.job.id}`,
        params: {
          filterByFormula: `AND(OR(${search.join(',')}), RECORD_ID() != "${this.job.id}")`,
          maxRecords: 3
        }
      })
    }

    this.loading = false
  }
}
</script>

<style lang="scss" scoped>
  .boxed {
    background-image: linear-gradient(#f6fafc 25%, rgba($GREY, .01));
    padding: 32px;

    @include mq ($until: xsmall) {
      padding: 24px 16px;
    }
  }

  .overview {
    margin-bottom: 24px;
  }

  .subheading {
    font-size: 21px;
    font-weight: 900;
    margin-bottom: 10px;
  }

  .content {
    @include Content;
  }
</style>
