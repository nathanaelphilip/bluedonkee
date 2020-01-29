<template>
  <div>
    <Intro :heading="`Office: ${office.fields.Name}`" :back="{ name: 'campaigns' }" />
    <Campaigns :campaigns="campaigns" />
  </div>
</template>

<script>
import { getCampaigns, getOffice } from '@/store/helpers'

import Intro from '@/components/molecules/Intro'
import Campaigns from '@/components/molecules/Campaigns'

export default {
  name: 'views-campaigns',
  components: { Campaigns, Intro },

  data () {
    return {
      office: {},
      campaigns: []
    }
  },

  async mounted () {
    this.office = await getOffice(this.$route.params.slug)
    this.campaigns = await getCampaigns(this.office.fields.Campaigns)
  }
}
</script>

<style lang="scss" scoped>

</style>
