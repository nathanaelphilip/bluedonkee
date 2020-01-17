<template>
  <article v-if="!loading">
    <div>
      <a :href="`${groups[0].fields.Website}`" target="_blank">Website</a>
      <a :href="`https://twitter.com/${groups[0].fields.Twitter}`" target="_blank">{{ groups[0].fields.Twitter }}</a>
    </div>

    <h2>{{ job.fields.Title }}</h2>

    <div>
      <router-link
        v-for="group in groups"
        :key="`group-${group.id}`"
        :to="{ name: 'group', params: { slug: group.fields.Slug } }">
        {{ group.fields.Name }}
      </router-link>
    </div>
    <div>
      <router-link
        v-for="category in workCategories"
        :key="`work-category-${category.id}`"
        :to="{ name: 'workCategory', params: { slug: category.fields.Slug } }"
      >
        {{ category.fields.Name }}
      </router-link>
      <router-link
        v-for="level in workLevels"
        :key="`work-level-${level.id}`"
        :to="{ name: 'workLevel', params: { slug: level.fields.Slug } }"
      >
        {{ level.fields.Name }}
      </router-link>
      <router-link
        v-for="type in workTypes"
        :key="`work-type-${type.id}`"
        :to="{ name: 'workType', params: { slug: type.fields.Slug } }"
      >
        {{ type.fields.Name }}
      </router-link>
    </div>
    <div>
      <h3>Job Overview</h3>
      {{ job.fields.Description }}
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
  getJobGroups,
  getWorkCategories,
  getWorkLevels,
  getWorkTypes
} from '@/store/helpers'

export default {
  name: 'job',

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

  async mounted () {
    this.job = await getJob(this.$route.params.slug)
    this.groups = await getJobGroups(this.job.fields.Group)
    this.workCategories = await getWorkCategories(this.job.fields['Work Categories'])
    this.workLevels = await getWorkLevels(this.job.fields['Work Levels'])
    this.workTypes = await getWorkTypes(this.job.fields['Work Types'])
    this.loading = false
  }
}
</script>
