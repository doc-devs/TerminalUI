'use strict';

require('dotenv').config();

const { Consumer } = require('sqs-consumer');
const handler = require('./handler')


const redApp = Consumer.create({
  queueUrl: process.env.SQS_URL_RED,
  handleMessage: handler,
  waitTimeSeconds: 2,
});

const yellowApp = Consumer.create({
  queueUrl: process.env.SQS_URL_YELLOW,
  handleMessage: handler,
  waitTimeSeconds: 2,
});

const greenApp = Consumer.create({
  queueUrl: process.env.SQS_URL_GREEN,
  handleMessage: handler,
  waitTimeSeconds: 2,
});

module.exports = {
  redApp,
  yellowApp,
  greenApp
}
