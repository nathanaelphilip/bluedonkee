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
        <div class="location" v-if="locations.length">
          <Locations
            :locations="locations"
            route="locationGroup"
          />
        </div>
      </div>
    </header>
    <div class="jobs">
      <JobMini v-for="job in jobs" :key="job.id" :job="job" />
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
      categories: [],
      jobs: [],
      locations: []
    }
  },

  async mounted () {
    this.categories = this.group.fields.Categories ? await getByIds({
      ids: this.group.fields.Categories,
      type: 'categories'
    }) : []

    this.jobs = this.group.fields.Jobs ? await getByIds({
      ids: this.group.fields.Jobs,
      type: 'jobs'
    }) : []

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
    font-weight: 600;
    margin-bottom: 5px;
  }

  .location {
    @include Flex ($justify: flex-start);
    color: $BLUE;
    font-size: 15px;
  }

  .jobs {}

  .job {

  }
</style>
