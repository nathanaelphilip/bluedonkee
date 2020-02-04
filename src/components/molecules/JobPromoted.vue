<template>
  <article class="job-promoted">
    <figure class="image">
      <router-link :to="{ name: 'job', params: { slug: job.fields.Slug } }">
        <Avatar :src="avatar" />
      </router-link>
    </figure>
    <div class="info">
      <h4 class="heading">
        <router-link :to="{ name: 'job', params: { slug: job.fields.Slug } }">
          {{ job.fields.Title }}
        </router-link>
      </h4>
      <aside class="group" v-if="group">
        <router-link
          :to="{
            name: 'group',
            params: {slug: group.fields.Slug }
          }"
          >
          {{ group.fields.Name }}
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
      groups: []
    }
  },

  computed: {
    avatar () {
      return this.group ? this.group.fields.Avatar[0].url : false
    },

    group () {
      return this.groups.length ? this.groups[0] : false
    }
  },

  async mounted () {
    this.groups = await getByIds({
      ids: this.job.fields.Group,
      type: 'groups'
    })
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

  .group {
    color: $BLUE;
    font-size: 14px;
  }
</style>
