<template>
  <article class="group" v-if="!loading">
    <Intro :back="{ name: 'groups' }" :heading="group.fields.Name">
      <Share :path="$route.path" />
    </Intro>
    <div class="box">
      <Header
        :avatar="avatar"
        :description="group.fields['Short Description']"
        :heading="group.fields.Name"
        :locations="locations"
        locationroute="locationGroup"
        :groupCategories="categories"
        :website="group.fields.Website"
        :twitter="group.fields.Twitter"
      />
    </div>
    <Jobs heading="Available Jobs" :jobs="jobs" :simple="true">
      <template v-slot:empty>
        <JobsEmpty>
          Check back later or view related campaigns below.
        </JobsEmpty>
      </template>
    </Jobs>
    <Groups heading="Related Groups" :groups="$store.getters['groups/getRelated'](`group/${this.group.id}`)" />
    <BackTop />
  </article>
</template>

<script>
import {
  getByIds,
  getBySlug
} from '@/store/helpers'

import BackTop from '@/components/molecules/BackTop'
import Groups from '@/components/molecules/Groups'
import Header from '@/components/molecules/Header'
import Intro from '@/components/molecules/Intro'
import Jobs from '@/components/molecules/Jobs'
import JobsEmpty from '@/components/molecules/JobsEmpty'
import Share from '@/components/molecules/Share'

export default {
  name: 'views-group',
  components: { BackTop, Groups, Header, Intro, Jobs, JobsEmpty, Share },

  data () {
    return {
      campaigns: [],
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

    if (!this.$store.getters['groups/getRelated'](`group/${this.group.id}`)) {
      const search = []

      for (var i = 0; i < this.categories.length; i++) {
        search.push(`SEARCH("${this.categories[i].fields.Name}", {Groups Categories})`)
      }

      await this.$store.dispatch('groups/fetchRelated', {
        id: `group/${this.group.id}`,
        params: {
          filterByFormula: `AND(OR(${search.join(',')}), RECORD_ID() != "${this.group.id}")`,
          maxRecords: 3
        }
      })
    }

    this.loading = false
  }
}
</script>

<style lang="scss" scoped>
  .box {
    background-image: linear-gradient(#f6fafc 25%, rgba($GREY, .01));
    padding: 32px 32px 0 32px;

    @include mq ($until: xsmall) {
      padding: 24px 16px 0 16px;
    }
  }

  .jobs {
    margin-bottom: 24px;
  }
</style>
