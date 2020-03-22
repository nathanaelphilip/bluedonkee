import $store from '@/store'

export const getByEntityAndSlug = async ({ entity, entityType, slug, type }) => {
  const stored = $store.getters[`${type}/getByEntityAndSlug`]({ entity, entityType, slug })

  if (!stored) {
    const item = await $store.dispatch(`${type}/get`, {
      params: {
        filterByFormula: `SEARCH("${slug}", Slug)`
      }
    })

    return item
  }

  return stored
}

export const getBySlug = async ({ slug, type }) => {
  const stored = $store.getters[`${type}/getBySlug`](slug)

  if (!stored) {
    const item = await $store.dispatch(`${type}/get`, {
      params: {
        filterByFormula: `SEARCH("${slug}", Slug)`
      }
    })

    return item
  }

  return stored
}

export const getByIds = async ({ ids, type }) => {
  const items = ids.map(async id => {
    const stored = $store.getters[`${type}/getById`](id)

    if (!stored) {
      const item = await $store.dispatch(`${type}/getById`, id)
      return item
    }

    return stored
  })

  const data = await Promise.all(items)

  return data
}
