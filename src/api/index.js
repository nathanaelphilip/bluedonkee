import axios from 'axios'

const jobs = `/Jobs`
const groups = `/Groups`

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
