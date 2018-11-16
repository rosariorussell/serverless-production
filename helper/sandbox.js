const URL = require('url')
const aws4 = require('aws4')

const url = 'https://y94uwslqk5.execute-api.us-east-1.amazonaws.com/dev/restaurants'
const newUrl = URL.parse(url)

let opts = {
  host: newUrl.hostname,
  path: newUrl.pathname
}

aws4.sign(opts)

console.log(opts)

console.log(process.env)