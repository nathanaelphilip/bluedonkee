<template>
  <article class="campaign">
    <div>
      <Avatar :src="avatar" />
    </div>
    <div class="info">
      <h3 class="heading">
        <router-link :to="{ name: 'campaign', params: { slug: campaign.fields.Slug } }">{{ campaign.fields.Name }}</router-link>
      </h3>
      <Locations
        :locations="locations"
        route="locationCampaign"
      />
    </div>
    <Tags>
      <Tag
        v-for="office in offices"
        :key="office.id"
        route="office"
        :slug="office.fields.Slug"
        :name="office.fields.Name"
      />
    </Tags>
  </article>
</template>

<script>
import { getByIds } from '@/store/helpers'

import Avatar from '@/components/atoms/Avatar'
import Locations from '@/components/molecules/Locations'
import Tag from '@/components/atoms/Tag'
import Tags from '@/components/molecules/Tags'

export default {
  props: ['campaign'],
  components: { Avatar, Locations, Tag, Tags },

  data () {
    return {
      locations: [],
      offices: {}
    }
  },

  computed: {
    avatar () {
      return this.campaign.fields.Avatar ? this.campaign.fields.Avatar[0].url : ''
    }
  },

  async mounted () {
    if (this.campaign.fields['Office'] && this.campaign.fields['Office'].length) {
      this.offices = await getByIds({
        ids: this.campaign.fields['Office'],
        type: 'offices'
      })
    }

    this.locations = this.campaign.fields['Location'] ? await getByIds({
      ids: this.campaign.fields['Location'],
      type: 'locations'
    }) : []
  }
}
</script>

<style lang="scss" scoped>
  .campaign {
    align-items: center;
    display: grid;
    grid-template-columns: 60px 1fr 1fr;
    grid-column-gap: 12px;
  }

  .heading {
    font-weight: 800;
    margin-bottom: 5px;
  }

  .tags {
    justify-content: flex-end;
  }
</style>
