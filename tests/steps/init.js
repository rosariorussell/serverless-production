'use strict'

const co = require('co')
const Promise = require('bluebird')

// const _ = require('lodash')
// const aws4 = require('../../lib/aws4');
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

  console.log('AWS credentials loaded')

  process.env.cognito_server_client_id = '7u3a2r65lddqeb7pupsh02vvq'
  // process.env.AWS_XRAY_CONTEXT_MISSING = 'LOG_ERROR'
  // process.env.STAGE = 'dev'

  // yield aws4.init();

  initialized = true
})

module.exports.init = init
