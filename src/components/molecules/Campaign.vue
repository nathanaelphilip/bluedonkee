<template>
  <article class="campaign">
    <Avatar :src="avatar" />
    <div class="info">
      <h3 class="heading">
        <router-link :to="{ name: 'campaign', params: { slug: campaign.fields.Slug } }">{{ campaign.fields.Name }}</router-link>
      </h3>
      <div class="location">Location</div>
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
import { getOffices } from '@/store/helpers'

import Avatar from '@/components/atoms/Avatar'
import Tag from '@/components/atoms/Tag'
import Tags from '@/components/molecules/Tags'

export default {
  props: ['campaign'],
  components: { Avatar, Tag, Tags },

  data () {
    return {
      offices: {}
    }
  },

  computed: {
    avatar () {
      return this.campaign.fields.Avatar ? this.campaign.fields.Avatar[0].url : ''
    }
  },

  async mounted () {
    this.offices = await getOffices(this.campaign.fields['Office'])
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