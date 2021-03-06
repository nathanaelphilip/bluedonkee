<template>
  <article class="job" v-if="!loading">
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
        :donate="campaign.fields['Donation URL']"
      />
      <div class="overview" v-if="campaign.fields['Long Description']">
        <h3 class="subheading">Overview</h3>
        <div class="content">
          <Markdown :content="campaign.fields['Long Description']" />
        </div>
      </div>
    </div>
    <Jobs heading="Available Jobs" :jobs="$store.getters['jobs/getFetched'](id)" :simple="true">
      <template v-slot:empty>
        <JobsEmpty />
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
import Markdown from '@/components/molecules/Markdown'

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
    Jobs,
    JobsEmpty,
    Markdown
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

    this.$store.dispatch('app/setHeading', this.campaign.fields.Name)

    this.locations = await getByIds({
      ids: this.campaign.fields.Location,
      type: 'locations'
    })

    this.offices = await getByIds({
      ids: this.campaign.fields.Office,
      type: 'offices'
    })

    await this.$store.dispatch('jobs/fetch', {
      id: this.id,
      params: {
        filterByFormula: `AND(OR({Status} = 'Active', {Status} = 'Promoted'), {Campaigns} = '${this.campaign.fields.Name}')`,
        sort: [{ field: 'Post Date', direction: 'desc' }]
      }
    })

    if (!this.$store.getters['campaigns/getFetched'](this.id).length) {
      const search = []

      for (var i = 0; i < this.offices.length; i++) {
        search.push(`SEARCH("${this.offices[i].fields.Name}", {Office})`)
      }

      await this.$store.dispatch('campaigns/fetch', {
        id: this.id,
        params: {
          filterByFormula: `AND({Status} = 'Active', OR(${search.join(',')}), RECORD_ID() != "${this.campaign.id}")`,
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

  .jobs {
    margin-bottom: 48px;
  }
</style>
