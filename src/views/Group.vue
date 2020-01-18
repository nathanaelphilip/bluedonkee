<template>
  <article class="group" v-if="!loading">
    <Intro :back="{ name: 'groups' }" :heading="group.fields.Name" />
    <div class="box">
      <Header
        :avatar="avatar"
        :group="group"
        :heading="group.fields.Name"
        :groupCategories="categories"
      />
      <h3 class="subheading">Available Positions</h3>
    </div>
    <Jobs :jobs="jobs" />
  </article>
</template>

<script>
import {
  getJobs,
  getGroup,
  getGroupCategories
} from '@/store/helpers'

import Header from '@/components/molecules/Header'
import Intro from '@/components/molecules/Intro'
import Jobs from '@/components/molecules/Jobs'

export default {
  name: 'views-group',
  components: { Header, Intro, Jobs },

  data () {
    return {
      loading: true,
      categories: [],
      group: {},
      jobs: []
    }
  },

  computed: {
    avatar () {
      return this.group.fields.Avatar[0].url
    }
  },

  async mounted () {
    this.group = await getGroup(this.$route.params.slug)
    this.jobs = this.group.fields.Jobs ? await getJobs(this.group.fields.Jobs) : []
    this.categories = this.group.fields['Groups Categories'] ? await getGroupCategories(this.group.fields['Groups Categories']) : []
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
