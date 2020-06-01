<template>
  <router-link v-if="!loading" class="job" :to="{ name: 'job', params: { entityType: entityType, entity: entity.fields.Slug , slug: job.fields.Slug } }">
    <Bug v-if="isNew">New</Bug>
    <h3 class="heading">{{ job.fields.Title }}</h3>
    <div class="divider">•</div>
    <Locations :simple="true" :locations="locations" />
  </router-link>
</template>

<script>
import { getByIds } from '@/store/helpers'
import moment from 'moment'

import Bug from '@/components/atoms/Bug'
import Locations from '@/components/molecules/Locations'

export default {
  props: ['job'],
  components: { Bug, Locations },

  data () {
    return {
      campaigns: [],
      groups: [],
      locations: false,
      loading: true
    }
  },

  computed: {
    entityType () {
      return this.groups.length ? 'group' : 'campaign'
    },

    entity () {
      if (this.groups.length) {
        return this.groups[0]
      }

      if (this.campaigns.length) {
        return this.campaigns[0]
      }

      return false
    },

    isNew () {
      return moment(this.job.fields['Post Date']) > moment().subtract(5, 'days')
    }
  },

  async mounted () {
    if (this.job.fields.Location) {
      this.locations = this.job.fields.Location ? await getByIds({
        ids: this.job.fields.Location,
        type: 'locations'
      }) : []
    }

    if (this.job.fields.Group) {
      this.groups = await getByIds({
        ids: this.job.fields.Group,
        type: 'groups'
      })
    }

    if (this.job.fields.Campaigns) {
      this.campaigns = await getByIds({
        ids: this.job.fields.Campaigns,
        type: 'campaigns'
      })
    }

    this.loading = false
  }
}
</script>

<style lang="scss" scoped>
  .job {
    @include Flex ($justify: flex-start);
    background: $WHITE;
    border: 1px solid $GREY3;
    border-radius: grid(1);
    font-size: 14px;
    line-height: 1.4;
    padding: grid(4);

    &:hover {
      background: $GREY3;
      border-color: $GREY;
    }

    &:not(:last-child) {
      margin-bottom: grid(3);
    }
  }

  .bug {
    margin-right: grid(2);
  }

  .heading {
    font-weight: 600;
  }

  .divider {
    margin: 0 grid(1);
  }
</style>
