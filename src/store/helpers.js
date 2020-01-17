import $store from '@/store'

export const getJob = async (slug) => {
  const stored = $store.getters['jobs/getBySlug'](slug)

  if (!stored) {
    const item = await $store.dispatch('jobs/get', {
      params: {
        filterByFormula: `SEARCH("${slug}", Slug)`
      }
    })

    return item
  }

  return stored
}

export const getJobs = async (jobs) => {
  const items = jobs.map(async id => {
    const stored = $store.getters['jobs/getById'](id)

    if (!stored) {
      const item = await $store.dispatch('jobs/getById', id)
      return item
    }

    return stored
  })

  const data = await Promise.all(items)

  return data
}

export const getJobGroups = async (jobGroups) => {
  const groups = jobGroups.map(async (id) => {
    const stored = $store.getters['groups/getById'](id)

    if (!stored) {
      const item = await $store.dispatch('groups/getById', id)
      return item
    }

    return stored
  })

  const data = await Promise.all(groups)

  return data
}

export const getWorkCategory = async (slug) => {
  const stored = $store.getters['workCategories/getBySlug'](slug)

  if (!stored) {
    const item = await $store.dispatch('workCategories/get', {
      params: {
        filterByFormula: `SEARCH("${slug}", Slug)`
      }
    })

    return item
  }

  return stored
}

export const getWorkCategories = async (jobWorkCategories) => {
  const categories = jobWorkCategories.map(async (id) => {
    const stored = $store.getters['workCategories/getById'](id)

    if (!stored) {
      const item = await $store.dispatch('workCategories/getById', id)
      return item
    }

    return stored
  })

  const data = await Promise.all(categories)

  return data
}

export const getWorkLevel = async (slug) => {
  const stored = $store.getters['workLevels/getBySlug'](slug)

  if (!stored) {
    const item = await $store.dispatch('workLevels/get', {
      params: {
        filterByFormula: `SEARCH("${slug}", Slug)`
      }
    })

    return item
  }

  return stored
}

export const getWorkLevels = async (jobWorkLevels) => {
  const items = jobWorkLevels.map(async (id) => {
    const stored = $store.getters['workLevels/getById'](id)

    if (!stored) {
      const item = await $store.dispatch('workLevels/getById', id)
      return item
    }

    return stored
  })

  const data = await Promise.all(items)

  return data
}

export const getWorkType = async (slug) => {
  const stored = $store.getters['workTypes/getBySlug'](slug)

  if (!stored) {
    const item = await $store.dispatch('workTypes/get', {
      params: {
        filterByFormula: `SEARCH("${slug}", Slug)`
      }
    })

    return item
  }

  return stored
}

export const getWorkTypes = async (jobWorkTypes) => {
  const items = jobWorkTypes.map(async (id) => {
    const stored = $store.getters['workTypes/getById'](id)

    if (!stored) {
      const item = await $store.dispatch('workTypes/getById', id)
      return item
    }

    return stored
  })

  const data = await Promise.all(items)

  return data
}
