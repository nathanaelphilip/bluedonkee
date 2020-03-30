const fs = require('fs')

const production = `User-agent: *\r\nDisallow:`
const staging = `User-agent: *\r\nDisallow: /`

const text = process.env.NODE_ENV === 'production' ? production : staging

fs.appendFileSync(`dist/robots.txt`, text)
