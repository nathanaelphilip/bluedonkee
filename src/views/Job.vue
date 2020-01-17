<template>
  <article class="job" v-if="!loading">
    <Header
      :avatar="avatar"
      :group="group"
      :heading="job.fields.Title"
      :workCategories="workCategories"
      :workLevels="workLevels"
      :workTypes="workTypes"
    />

    <div class="overview">
      <h3 class="subheading">Job Overview</h3>
      <div class="content">
        {{ job.fields.Description }}
      </div>
    </div>
    <div>
      Something off with this post?
      <button>Flag Posting</button>
    </div>
  </article>
</template>

<script>
import {
  getJob,
  getGroups,
  getWorkCategories,
  getWorkLevels,
  getWorkTypes
} from '@/store/helpers'

import Header from '@/components/molecules/Header'

export default {
  name: 'job',
  components: { Header },

  data () {
    return {
      loading: true,
      job: {},
      groups: [],
      workTypes: [],
      workLevels: [],
      workCategories: []
    }
  },

  computed: {
    avatar () {
      return this.group.fields.Avatar[0].url
    },

    group () {
      return this.groups[0]
    }
  },

  async mounted () {
    this.job = await getJob(this.$route.params.slug)
    this.groups = await getGroups(this.job.fields.Group)
    this.workCategories = await getWorkCategories(this.job.fields['Work Categories'])
    this.workLevels = await getWorkLevels(this.job.fields['Work Levels'])
    this.workTypes = await getWorkTypes(this.job.fields['Work Types'])
    this.loading = false
  }
}
</script>

<style lang="scss" scoped>
  .job {
    background-image: linear-gradient(#f6fafc 25%, rgba($GREY, .01));
    padding: 32px;
  }

  .overview {
    margin-bottom: 24px;
  }

  .subheading {
    font-size: 18px;
    font-weight: 900;
    margin-bottom: 10px;
  }

  .content {
    font-size: 15px;
    line-height: 1.6666;
  }
</style>
