import axios from 'axios'

const jobs = `appkK3vHJcH4114kk/Jobs`

console.log(process.env)

const api = axios.create({
  baseURL: `https://api.airtable.com/v0/`,
  timeout: 1000,
  headers: { 'Authorization': `Bearer ${process.env.VUE_APP_AIRTABLE_API_KEY}` }
})

export const getJobs = (settings) => {
  return api.get(jobs, settings)
}
