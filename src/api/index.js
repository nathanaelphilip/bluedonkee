import axios from 'axios'

const campaigns = `/Campaigns`
const contactForm = `/Contact%20Form`
const jobs = `/Jobs`
const groups = `/Groups`
const groupCategories = `/Groups%20Categories`
const workTypes = `/Work%20Types`
const workLevels = `/Work%20Levels`
const workCategories = `/Work%20Categories`
const locations = `/Locations`
const states = `/States`

const newsletterForm = process.env.VUE_APP_MAILCHIMP_URL

const api = axios.create({
  baseURL: `https://api.airtable.com/v0/appkK3vHJcH4114kk`,
  timeout: 3000,
  headers: { 'Authorization': `Bearer ${process.env.VUE_APP_AIRTABLE_API_KEY}` }
})

export const postContactForm = (data) => {
  return api.post(contactForm, data)
}

export const postNewsletterForm = (settings) => {
  return api.get(newsletterForm, settings)
}

export const getCampaigns = (settings) => {
  return api.get(campaigns, settings)
}

export const getCampaign = (id) => {
  return api.get(`${campaigns}/${id}`)
}

export const getJobs = (settings) => {
  return api.get(jobs, settings)
}

export const getJob = (id) => {
  return api.get(`${jobs}/${id}`)
}

export const getGroups = (settings) => {
  return api.get(groups, settings)
}

export const getGroup = (id) => {
  return api.get(`${groups}/${id}`)
}

export const getGroupCategories = (settings) => {
  return api.get(groupCategories, settings)
}

export const getGroupCategory = (id) => {
  return api.get(`${groupCategories}/${id}`, id)
}

export const getWorkTypes = (settings) => {
  return api.get(workTypes, settings)
}

export const getWorkType = (id) => {
  return api.get(`${workTypes}/${id}`)
}

export const getWorkLevels = (settings) => {
  return api.get(workLevels, settings)
}

export const getWorkLevel = (id) => {
  return api.get(`${workLevels}/${id}`)
}

export const getWorkCategories = (settings) => {
  return api.get(workCategories, settings)
}

export const getWorkCategory = (id) => {
  return api.get(`${workCategories}/${id}`)
}

export const getLocations = (settings) => {
  return api.get(locations, settings)
}

export const getLocation = (id) => {
  return api.get(`${locations}/${id}`)
}

export const getStates = (settings) => {
  return api.get(states, settings)
}

export const getState = (id) => {
  return api.get(`${states}/${id}`)
}
