<template>
  <article class="job" v-if="!loading">
    <Intro :back="{ name: 'campaigns' }" :heading="campaign.fields.Name">
      <Share :path="$route.path" />
      <LinkPrimary classes="small" :href="campaign.fields['Donation URL']">Donate</LinkPrimary>
    </Intro>
    <div class="boxed">
      <Header
        :avatar="avatar"
        :description="campaign.fields['Short Description']"
        :heading="campaign.fields.Name"
        :locations="locations"
        locationroute="locationCampaign"
        :offices="offices"
        :website="campaign.fields.Website"
        :twitter="campaign.fields.Twitter"
      />
      <div class="overview" v-if="campaign.fields['Long Description']">
        <h3 class="subheading">Overview</h3>
        <div class="content">
          <Markdown :content="campaign.fields['Long Description']" />
        </div>
      </div>
    </div>
    <Jobs heading="Available Jobs" :jobs="jobs" :simple="true">
      <template v-slot:empty>
        <JobsEmpty>
          Check back later or view related campaigns below.
        </JobsEmpty>
      </template>
    </Jobs>
    <Campaigns heading="Related Campaigns" :campaigns="$store.getters['campaigns/getFetched'](id)" />
    <BackTop />
  </article>
</template>

<script>
import {
  getByIds,
  getBySlug
} from '@/store/helpers'

import BackTop from '@/components/molecules/BackTop'
import Campaigns from '@/components/molecules/Campaigns'
import Jobs from '@/components/molecules/Jobs'
import JobsEmpty from '@/components/molecules/JobsEmpty'
import Header from '@/components/molecules/Header'
import Intro from '@/components/molecules/Intro'
import LinkPrimary from '@/components/atoms/LinkPrimary'
import Markdown from '@/components/molecules/Markdown'
import Share from '@/components/molecules/Share'

export default {
  name: 'campaign',

  metaInfo () {
    return {
      title: this.campaign && this.campaign.fields ? this.campaign.fields.Name : 'Campaign'
    }
  },

  components: {
    BackTop,
    Campaigns,
    Header,
    Intro,
    Jobs,
    JobsEmpty,
    LinkPrimary,
    Markdown,
    Share
  },

  data () {
    return {
      id: false,
      loading: true,
      campaign: {},
      locations: [],
      offices: [],

      campaigns: [],
      jobs: []
    }
  },

  computed: {
    avatar () {
      return this.campaign && this.campaign.fields.Avatar ? this.campaign.fields.Avatar[0].url : ''
    }
  },

  async mounted () {
    this.id = `campaign/${this.$route.params.slug}`

    this.campaign = await getBySlug({
      slug: this.$route.params.slug,
      type: 'campaigns'
    })

    this.locations = await getByIds({
      ids: this.campaign.fields.Location,
      type: 'locations'
    })

    this.offices = await getByIds({
      ids: this.campaign.fields.Office,
      type: 'offices'
    })

    this.jobs = this.campaign.fields.Jobs ? await getByIds({
      ids: this.campaign.fields.Jobs,
      type: 'jobs'
    }) : []

    if (!this.$store.getters['campaigns/getFetched'](this.id).length) {
      const search = []

      for (var i = 0; i < this.offices.length; i++) {
        search.push(`SEARCH("${this.offices[i].fields.Name}", {Office})`)
      }

      await this.$store.dispatch('campaigns/fetch', {
        id: this.id,
        params: {
          filterByFormula: `AND(OR(${search.join(',')}), RECORD_ID() != "${this.campaign.id}")`,
          maxRecords: 3
        }
      })
    }

    this.loading = false

    window.analytics.page('Campaign')
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
    font-size: 15px;
    line-height: 1.6666;

    &::v-deep p {
      margin-bottom: 10px;
    }
  }

  .jobs {
    margin-bottom: 48px;
  }
</style>
