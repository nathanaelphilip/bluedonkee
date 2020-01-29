import $store from '@/store'

// TODO: convert all this to a factory – DRY

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

export const getJobs = async (ids) => {
  const items = ids.map(async id => {
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

export const getGroup = async (slug) => {
  const stored = $store.getters['groups/getBySlug'](slug)

  if (!stored) {
    const item = await $store.dispatch('groups/get', {
      params: {
        filterByFormula: `SEARCH("${slug}", Slug)`
      }
    })

    return item
  }

  return stored
}

export const getGroups = async (ids) => {
  const groups = ids.map(async (id) => {
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

export const getGroupCategory = async (slug) => {
  const stored = $store.getters['groupCategories/getBySlug'](slug)

  if (!stored) {
    const item = await $store.dispatch('groupCategories/get', {
      params: {
        filterByFormula: `SEARCH("${slug}", Slug)`
      }
    })

    return item
  }

  return stored
}

export const getGroupCategories = async (ids) => {
  const items = ids.map(async (id) => {
    const stored = $store.getters['groupCategories/getById'](id)

    if (!stored) {
      const item = await $store.dispatch('groupCategories/getById', id)
      return item
    }

    return stored
  })

  const data = await Promise.all(items)

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

export const getWorkCategories = async (ids) => {
  const categories = ids.map(async (id) => {
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

export const getWorkLevels = async (ids) => {
  const items = ids.map(async (id) => {
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

export const getWorkTypes = async (ids) => {
  const items = ids.map(async (id) => {
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

export const getLocation = async (slug) => {
  const stored = $store.getters['locations/getBySlug'](slug)

  if (!stored) {
    const item = await $store.dispatch('locations/get', {
      params: {
        filterByFormula: `SEARCH("${slug}", Slug)`
      }
    })

    return item
  }

  return stored
}

export const getLocations = async (ids) => {
  const items = ids.map(async (id) => {
    const stored = $store.getters['locations/getById'](id)

    if (!stored) {
      const item = await $store.dispatch('locations/getById', id)
      return item
    }

    return stored
  })

  const data = await Promise.all(items)

  return data
}

export const getCampaign = async (slug) => {
  const stored = $store.getters['campaigns/getBySlug'](slug)

  if (!stored) {
    const item = await $store.dispatch('campaigns/get', {
      params: {
        filterByFormula: `SEARCH("${slug}", Slug)`
      }
    })

    return item
  }

  return stored
}

export const getCampaigns = async (ids) => {
  const items = ids.map(async (id) => {
    const stored = $store.getters['campaigns/getById'](id)

    if (!stored) {
      const item = await $store.dispatch('campaigns/getById', id)
      return item
    }

    return stored
  })

  const data = await Promise.all(items)

  return data
}

export const getOffice = async (slug) => {
  const stored = $store.getters['offices/getBySlug'](slug)

  if (!stored) {
    const item = await $store.dispatch('offices/get', {
      params: {
        filterByFormula: `SEARCH("${slug}", Slug)`
      }
    })

    return item
  }

  return stored
}

export const getOffices = async (ids) => {
  const items = ids.map(async (id) => {
    const stored = $store.getters['offices/getById'](id)

    if (!stored) {
      const item = await $store.dispatch('offices/getById', id)
      return item
    }

    return stored
  })

  const data = await Promise.all(items)

  return data
}
