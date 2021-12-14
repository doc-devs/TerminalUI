'use strict';
const path = require('path');

const dotenvAbsolutePath = path.join(__dirname, '../.env');

const dotenv = require('dotenv').config({
  path: dotenvAbsolutePath
});
if (dotenv.error) {
  throw dotenv.error;
}

const AWS = require('aws-sdk');
const { nurseOptions } = require('./nurseOptions');

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
const sns = new AWS.SNS();

const publish = async (topic, ptInfo) => {

  const payload = {
    Message: JSON.stringify(ptInfo),
    TopicArn: topic,
    MessageGroupId: '1'
  };

  await sns.publish(payload).promise()
    .then(() => {
      console.log(chalk.cyanBright(`\nPatient was successfully added to ${ptInfo.queue} queue\n`));
      rl.emit('repeat-questions');
    })
    .catch((e) => {
      console.log(chalk.red('Could not add patient, please try again'))
      rl.emit('repeat-questions');
      console.error(e)
    });

}

rl.on('repeat-questions', () => {
  nurseOptions();
});

module.exports = publish
