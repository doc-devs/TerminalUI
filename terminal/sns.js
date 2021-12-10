'use strict';
const AWS = require('aws-sdk');
const { nurseOptions } = require('./nurseOptions');
AWS.config.update({ region: 'us-west-2' });
const sns = new AWS.SNS();

const publish = async (topic, ptInfo) => {

  const payload = {
    Message: JSON.stringify(ptInfo),
    TopicArn: topic,
    MessageGroupId: '1'
  };

  await sns.publish(payload).promise()
    .then(() => {
      console.log('\nPatient added successfully\n');
      rl.emit('repeat-questions');
    })
    .catch( () => {
      console.log('Could not add patient, please try again')
      rl.emit('repeat-questions-failed-attempt');
      console.error()
    });

}

rl.on('repeat-questions', () => {
  nurseOptions();
});

rl.emit('repeat-questions-failed-attempt', () => {
  nurseOptions();
});

module.exports = publish
