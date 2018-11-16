'use strict'

const co = require('co')
const Promise = require('bluebird')
// const awscred = Promise.promisifyAll(require('awscred'))
const awscred = Promise.promisifyAll(require('../../lib/awscred'))

// const _ = require('lodash')
// const aws4 = require('../../lib/aws4')
// const AWS = require('aws-sdk');
// AWS.config.region = 'us-east-1';
// const SSM = new AWS.SSM();

let initialized = false

// const getParameters = co.wrap(function* (keys) {
//   const prefix = '/bigmouth/dev/';
//   const req = {
//     Names: keys.map(key => `${prefix}${key}`)
//   }
//   const resp = yield SSM.getParameters(req).promise();
//   return _.reduce(resp.Parameters, function(obj, param) {
//     obj[param.Name.substr(prefix.length)] = param.Value
//     return obj;
//   }, {})
// });

let init = co.wrap(function * () {
  if (initialized) {
    return
  }

  // const params = yield getParameters([
  //   'cognito_client_id',
  //   'cognito_user_pool_id',
  //   'restaurants_api'
  // ]);

  process.env.restaurants_api = 'https://y94uwslqk5.execute-api.us-east-1.amazonaws.com/dev/restaurants'
  process.env.restaurants_table = 'restaurants'
  process.env.AWS_REGION = 'us-east-1'
  process.env.cognito_client_id = 'test_cognito_client_id'
  process.env.cognito_user_pool_id = 'us-east-1_w0oiBcQQm'
  process.env.cognito_server_client_id = '7u3a2r65lddqeb7pupsh02vvq'

  if (!process.env.AWS_ACCESS_KEY_ID) {
    let cred = (yield awscred.loadAsync()).credentials
    process.env.AWS_ACCESS_KEY_ID = cred.accessKeyId
    process.env.AWS_SECRET_ACCESS_KEY = cred.secretAccessKey

    if (cred.sessionToken) {
      process.env.AWS_SESSION_TOKEN = cred.sessionToken
    }
  }

  initialized = true

  console.log('AWS credentials loaded')

  // process.env.AWS_XRAY_CONTEXT_MISSING = 'LOG_ERROR'
  // process.env.STAGE = 'dev'

  // yield aws4.init()
})

module.exports.init = init
