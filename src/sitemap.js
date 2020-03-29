const fs = require('fs')

const Airtable = require('airtable')
var base = new Airtable({apiKey: 'keygoihFMlDmSxbL3'}).base('appkK3vHJcH4114kk');

const processRecords = (table, options) => {
  let records = []

  return new Promise ((resolve, reject) => {
    const processPage = (partialRecords, fetchNextPage) => {
      records = [...records, ...partialRecords]
      fetchNextPage()
    }

    const processRecords = err => {
      if (err) {
        reject(err)
        return
      }

      resolve(records)
    }

    base(table).select(options).eachPage(processPage, processRecords)
  })
}

const generate = async function () {
  fs.unlinkSync('public/sitemap.xml')

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\r\n`
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\r\n`

  const groups = await processRecords('Groups')
  const campaigns = await processRecords('Campaigns')
  const jobs = await processRecords('Jobs')

  xml += `<url>\r\n\xa0\xa0<loc>https://workblue.com/jobs</loc>\r\n\</url>\r\n`

  for (var i = 0; i < jobs.length; i++) {
    const entityType = jobs[i].fields.Group ? 'Group' : 'Campaigns'
    const entities = jobs[i].fields.Group ? groups : campaigns

    const entity = entities.find(entity => {
      return entity.id === jobs[i].fields[entityType][0]
    })

    xml += `<url>\r\n\xa0\xa0<loc>https://workblue.com/${entity.fields.Slug}/${jobs[i].fields.Slug}</loc>\r\n\xa0\xa0<lastmod>${jobs[i].fields.Updated}</lastmod>\r\n</url>\r\n`
  }

  xml += `<url>\r\n\xa0\xa0<loc>https://workblue.com/groups</loc>\r\n\</url>\r\n`

  for (var i = 0; i < groups.length; i++) {
    xml += `<url>\r\n\xa0\xa0<loc>https://workblue.com/groups/${groups[i].fields.Slug}</loc>\r\n\xa0\xa0<lastmod>${groups[i].fields.Updated}</lastmod>\r\n</url>\r\n`
  }

  xml += `<url>\r\n\xa0\xa0<loc>https://workblue.com/campaigns</loc>\r\n\</url>\r\n`

  for (var i = 0; i < campaigns.length; i++) {
    xml += `<url>\r\n\xa0\xa0<loc>https://workblue.com/campaigns/${campaigns[i].fields.Slug}</loc>\r\n\xa0\xa0<lastmod>${campaigns[i].fields.Updated}</lastmod>\r\n</url>\r\n`
  }

  xml += `</urlset>\r\n`

  fs.appendFileSync(`public/sitemap.xml`, xml);
}

generate()
