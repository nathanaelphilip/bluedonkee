import axios from 'axios'

const jobs = `/Jobs`
const groups = `/Groups`
const groupsCategories = `/Groups%20Categories`
const workTypes = `/Work%20Types`
const workLevels = `/Work%20Levels`
const workCategories = `/Work%20Categories`
const locations = `/Locations`
const states = `/States`

const api = axios.create({
  baseURL: `https://api.airtable.com/v0/appkK3vHJcH4114kk`,
  timeout: 1000,
  headers: { 'Authorization': `Bearer ${process.env.VUE_APP_AIRTABLE_API_KEY}` }
})

export const getJobs = (settings) => {
  return api.get(jobs, settings)
}

export const getGroups = (settings) => {
  return api.get(groups, settings)
}

export const getGroupsCategories = (settings) => {
  return api.get(groupsCategories, settings)
}

export const getWorkTypes = (settings) => {
  return api.get(workTypes, settings)
}

export const getWorkLevels = (settings) => {
  return api.get(workLevels, settings)
}

export const getWorkCategories = (settings) => {
  return api.get(workCategories, settings)
}

export const getLocations = (settings) => {
  return api.get(locations, settings)
}

export const getStates = (settings) => {
  return api.get(states, settings)
}
