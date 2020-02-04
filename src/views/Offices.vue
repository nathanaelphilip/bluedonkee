<template>
  <div>
    <Intro :heading="`Office: ${office.fields.Name}`" :back="{ name: 'campaigns' }" />
    <Campaigns :campaigns="campaigns" />
  </div>
</template>

<script>
import {
  getByIds,
  getBySlug
} from '@/store/helpers'

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
    this.office = await getBySlug({
      slug: this.$route.params.slug,
      type: 'offices'
    })

    this.campaigns = await getByIds({
      ids: this.office.fields.Campaigns,
      type: 'campaigns'
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
