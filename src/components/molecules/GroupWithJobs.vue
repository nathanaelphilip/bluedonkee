<template>
  <article class="group">
    <header class="header">
      <div class="box">
        <Avatar :src="group.fields.Avatar[0].url" />
      </div>
      <div class="box">
        <h2 class="heading">
          <router-link :to="{ name: 'group', params: { slug: group.fields.Slug } }">
            {{ group.fields.Name }}
          </router-link>
        </h2>
        <div class="meta">
          <template v-if="categories.length">
            <router-link
              @click.native="$event.stopImmediatePropagation()"
              :to="{
                name: 'groupCategory',
                params: { slug: categories[0].fields.Slug }
              }">
              {{ categories[0].fields.Name }}
            </router-link>
          </template>
          <template v-if="categories.length && locations.length">
            <div class="meta-divider">•</div>
          </template>
          <template v-if="locations.length">
            <Locations
              :locations="locations"
              route="locationGroup"
            />
          </template>
        </div>
      </div>
    </header>
    <div class="jobs" v-if="$store.getters['jobs/getFetched'](id).length">
      <JobMini v-for="job in $store.getters['jobs/getFetched'](id)" :key="job.id" :job="job" />
    </div>
  </article>
</template>

<script>
import { getByIds } from '@/store/helpers'

import Avatar from '@/components/atoms/Avatar'
import JobMini from '@/components/molecules/JobMini'
import Locations from '@/components/molecules/Locations'

export default {
  name: 'components-molecules-group',
  props: ['group'],
  components: { Avatar, JobMini, Locations },

  data () {
    return {
      id: false,
      categories: [],
      jobs: [],
      locations: []
    }
  },

  async mounted () {
    this.id = `group/${this.group.fields.Slug}`

    this.categories = this.group.fields['Groups Categories'] ? await getByIds({
      ids: this.group.fields['Groups Categories'],
      type: 'groupCategories'
    }) : []

    await this.$store.dispatch('jobs/fetch', {
      id: this.id,
      params: {
        filterByFormula: `AND(OR({Status} = 'Active', {Status} = 'Promoted'), {Group} = '${this.group.fields.Name}')`,
        sort: [{ field: 'Post Date', direction: 'desc' }]
      }
    })

    this.locations = this.group.fields.Location ? await getByIds({
      ids: this.group.fields.Location,
      type: 'locations'
    }) : []
  }
}
</script>

<style lang="scss" scoped>
  .group {
    background: $BLUELIGHT;
    border: 1px solid $GREY3;
    border-radius: grid(2);
    padding: grid(5);
  }

  .header {
    align-items: center;
    display: grid;
    grid-template-columns: 60px 1fr;
    grid-column-gap: 16px;

    @include mq($until: xsmall) {
      grid-template-columns: 48px 1fr;
    }

    &:not(:last-child) {
      margin-bottom: grid(4);
    }
  }

  .heading {
    font-size: 18px;
    font-weight: 800;
    margin-bottom: grid(1);
  }

  .meta {
    @include Flex ($justify: flex-start);
    color: $BLUE;
    font-size: 15px;

    a:hover { text-decoration: underline; }
  }

  .meta-divider {
    margin: 0 grid(1);
  }
</style>
