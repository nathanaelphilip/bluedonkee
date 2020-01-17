import $store from '@/store'

export const getJob = async (slug) => {
  let job = $store.getters['jobs/getBySlug'](slug)

  if (!job) {
    job = await $store.dispatch('jobs/get', {
      params: {
        filterByFormula: `SEARCH("${slug}", Slug)`
      }
    })
  }

  return job
}

export const getJobGroups = async (jobGroups) => {
  const groups = jobGroups.map(async (group) => {
    const stored = $store.getters['groups/getById'](group)

    if (!stored) {
      const data = await $store.dispatch('groups/getById', group)
      return data
    }

    return stored
  })

  const data = await Promise.all(groups)

  return data
}
