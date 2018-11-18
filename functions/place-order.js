'use strict'

// const _ = require('lodash')
const co = require('co')
const AWS = require('aws-sdk')
const kinesis = new AWS.Kinesis()
// const kinesis = require('../lib/kinesis')
const chance = require('chance').Chance()
// const log = require('../lib/log')
// const cloudwatch = require('../lib/cloudwatch')
// const correlationIds = require('../lib/correlation-ids')
// const wrapper = require('../middleware/wrapper')

const streamName = process.env.order_events_stream

// const UNAUTHORIZED = {
//   statusCode: 401,
//   body: 'unauthorized'
// }

module.exports.handler = co.wrap(function * (event, context, cb) {
  // let req = JSON.parse(event.body)
  // log.debug(`request body is valid JSON`, { requestBody: event.body })

  let restaurantName = JSON.parse(event.body).restaurantName
  let userEmail = event.requestContext.authorizer.claims.email

  // if (!userEmail) {
  //   cb(null, UNAUTHORIZED)
  //   log.error('unauthorized request, user email is not provided')

  //   return;
  // }

  let orderId = chance.guid()
  console.log(`placing order ID [${orderId}] to [${restaurantName} from user [${userEmail}]]`)

  // correlationIds.set('order-id', orderId)
  // correlationIds.set('restaurant-name', restaurantName)
  // correlationIds.set('user-email', userEmail)

  // log.debug(`placing order...`, { orderId, restaurantName, userEmail })

  let data = {
    orderId,
    userEmail,
    restaurantName,
    eventType: 'order_placed'
  }

  let putReq = {
    Data: JSON.stringify(data), // the SDK would base64 encode this for us
    PartitionKey: orderId,
    StreamName: streamName
  }

  yield kinesis.putRecord(putReq).promise()

  // log.debug(`published event into Kinesis`, { eventName: 'order_placed' })

  let response = {
    statusCode: 200,
    body: JSON.stringify({ orderId })
  }

  cb(null, response)
})

// module.exports.handler = wrapper(handler)
