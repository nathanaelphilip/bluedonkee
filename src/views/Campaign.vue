<template>
  <article class="job" v-if="!loading">
    <Intro :back="{ name: 'campaigns' }" :heading="campaign.fields.Name">
      <LinkPrimary :href="campaign.fields['Donation URL']">Donate</LinkPrimary>
    </Intro>
    <div class="boxed">
      <Header
        :avatar="avatar"
        :heading="campaign.fields.Name"
        :website="campaign.fields.Website"
        :twitter="campaign.fields.Twitter"
      />
      <div class="overview">
        <h3 class="subheading">Overview</h3>
        <div class="content">
          {{ campaign.fields['Long Description'] }}
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import {
  getCampaign
} from '@/store/helpers'

import Header from '@/components/molecules/Header'
import Intro from '@/components/molecules/Intro'
import LinkPrimary from '@/components/atoms/LinkPrimary'

export default {
  name: 'campaign',
  components: { Header, Intro, LinkPrimary },

  data () {
    return {
      loading: true,
      campaign: {}
    }
  },

  computed: {
    avatar () {
      return this.campaign.fields.Avatar ? this.campaign.fields.Avatar[0].url : ''
    }
  },

  async mounted () {
    this.campaign = await getCampaign(this.$route.params.slug)
    this.loading = false
  }
}
</script>

<style lang="scss" scoped>
  .boxed {
    background-image: linear-gradient(#f6fafc 25%, rgba($GREY, .01));
    padding: 32px;
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