'use strict';

const { redApp } = require('./subscriptions')

let queuePull = () => {
  redApp.start();
  console.log(`\nChecking ${chalk.redBright('RED')} queue...`)
}

module.exports = queuePull;