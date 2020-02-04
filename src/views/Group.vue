<template>
  <article class="group" v-if="!loading">
    <Intro :back="{ name: 'groups' }" :heading="group.fields.Name" />
    <div class="box">
      <Header
        :avatar="avatar"
        :heading="group.fields.Name"
        :locations="locations"
        locationroute="locationGroup"
        :groupCategories="categories"
        :website="group.fields.Website"
        :twitter="group.fields.Twitter"
      />
      <h3 class="subheading">Available Positions</h3>
    </div>
    <Jobs :jobs="jobs" />
  </article>
</template>

<script>
import {
  getByIds,
  getBySlug
} from '@/store/helpers'

import Header from '@/components/molecules/Header'
import Intro from '@/components/molecules/Intro'
import Jobs from '@/components/molecules/Jobs'

export default {
  name: 'views-group',
  components: { Header, Intro, Jobs },

  data () {
    return {
      categories: [],
      group: {},
      jobs: [],
      locations: [],
      loading: true
    }
  },

  computed: {
    avatar () {
      return this.group.fields.Avatar[0].url
    }
  },

  async mounted () {
    this.group = await getBySlug({
      slug: this.$route.params.slug,
      type: 'groups'
    })

    this.jobs = this.group.fields.Jobs ? await getByIds({
      ids: this.group.fields.Jobs,
      type: 'jobs'
    }) : []

    this.locations = await getByIds({
      ids: this.group.fields.Location,
      type: 'locations'
    })

    this.categories = this.group.fields['Groups Categories'] ? await getByIds({
      ids: this.group.fields['Groups Categories'],
      type: 'groupCategories'
    }) : []

    this.loading = false
  }
}
</script>

<style lang="scss" scoped>
  .box {
    background-image: linear-gradient(#f6fafc 25%, rgba($GREY, .01));
    padding: 32px 32px 0 32px;
  }

  .subheading {
    font-size: 18px;
    font-weight: 900;
    margin-bottom: 5px;
    margin-top: 36px;
  }
</style>
