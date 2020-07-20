<template>
  <router-link :to="to" class="result" v-if="!loading">
    <div class="mini-avatar">
      <Avatar :src="avatar" />
    </div>
    <div class="box">
      <h4 class="heading">{{ title }}</h4>
      <div class="entity" v-if="entity">{{ entity.fields.Name }}</div>
    </div>
  </router-link>
</template>

<script>
import {
  getByIds
} from '@/store/helpers'

import Avatar from '@/components/atoms/Avatar'

export default {
  props: ['result', 'type'],
  components: { Avatar },

  data () {
    return {
      loading: true,
      groups: [],
      campaigns: []
    }
  },

  computed: {
    avatar () {
      if (this.entity && this.entity.fields.Avatar) {
        return this.entity.fields.Avatar[0].url
      }

      if (this.result.fields.Avatar && this.result.fields.Avatar[0]) {
        return this.result.fields.Avatar[0].url
      }

      return ''
    },

    title () {
      return this.result.fields.Title ? this.result.fields.Title : this.result.fields.Name
    },

    entityType () {
      return this.groups.length ? 'group' : 'campaign'
    },

    entity () {
      if (this.groups && this.groups.length) {
        return this.groups[0]
      }

      if (this.campaigns && this.campaigns.length) {
        return this.campaigns[0]
      }

      return false
    },

    to () {
      if (this.type === 'jobs') {
        return {
          name: 'job',
          params: {
            entityType: this.entityType,
            entity: this.entity.fields.Slug,
            slug: this.result.fields.Slug
          }
        }
      }

      return {}
    }
  },

  async mounted () {
    if (this.result.fields.Group) {
      this.groups = await getByIds({
        ids: this.result.fields.Group,
        type: 'groups'
      })
    }

    if (this.result.fields.Campaigns) {
      this.campaigns = await getByIds({
        ids: this.result.fields.Campaigns,
        type: 'campaigns'
      })
    }

    this.loading = false
  }
}
</script>

<style lang="scss" scoped>
  .mini-avatar {
    height: 36px;
    width: 36px;
  }

  .result {
    border-radius: grid(2);
    display: grid;
    padding: grid(3);
    grid-template-columns: 36px 1fr;
    grid-column-gap: grid(3);

    &:hover {
      background: $GREY;
    }
  }

  .heading {
    font-size: 15px;
    margin-bottom: grid(1);
  }

  .entity {
    color: $BLUEGREY;
    font-size: 13px;
  }
</style>
