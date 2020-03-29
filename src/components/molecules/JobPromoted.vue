<template>
  <article class="job-promoted" v-if="!loading">
    <figure class="image">
      <router-link :to="{ name: 'job', params: { entityType: entityType, entity: entity.fields.Slug , slug: job.fields.Slug } }">
        <Avatar :src="avatar" />
      </router-link>
    </figure>
    <div class="info">
      <h4 class="heading">
        <router-link :to="{ name: 'job', params: { entityType: entityType, entity: entity.fields.Slug , slug: job.fields.Slug } }">
          {{ job.fields.Title }}
        </router-link>
      </h4>
      <aside class="entity" v-if="entity">
        <router-link
          :to="{
            name: entityType,
            params: {slug: entity.fields.Slug }
          }"
          >
          {{ entity.fields.Name }}
        </router-link>
      </aside>
    </div>
  </article>
</template>

<script>
import { getByIds } from '@/store/helpers'

import Avatar from '@/components/atoms/Avatar'

export default {
  props: ['job'],
  components: { Avatar },

  data () {
    return {
      loading: true,
      campaigns: [],
      groups: []
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

    avatar () {
      return this.entity && this.entity.fields.Avatar ? this.entity.fields.Avatar[0].url : ''
    }
  },

  async mounted () {
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
  .job-promoted {
    align-items: center;
    display: grid;
    grid-template-columns: 48px 1fr;
    grid-column-gap: 12px;
  }

  .heading {
    font-weight: 600;
    margin-bottom: 5px;
  }

  .entity {
    color: $BLUE;
    font-size: 14px;
  }
</style>
