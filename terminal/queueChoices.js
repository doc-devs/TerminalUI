'use strict';

const path = require('path');

const dotenvAbsolutePath = path.join(__dirname, '../.env');

const dotenv = require('dotenv').config({
  path: dotenvAbsolutePath
});
if (dotenv.error) {
  throw dotenv.error;
}

const { PatientInfo, ptData } = require('./PatientInfo');

const queueChoices = (choice) => {

  if (choice.trim() === '1') {
    ptData['topic'] = process.env.SNS_TOPIC_RED
    let ptInfo = new PatientInfo(ptData);
    rl.emit('save-pt-info', ptInfo);
  }
  else if (choice.trim() === '2') {
    ptData['topic'] = process.env.SNS_TOPIC_YELLOW
    let ptInfo = new PatientInfo(ptData);
    rl.emit('save-pt-info', ptInfo);
  }
  else if (choice.trim() === '3') {
    ptData['topic'] = process.env.SNS_TOPIC_GREEN
    let ptInfo = new PatientInfo(ptData);
    rl.emit('save-pt-info', ptInfo);
  }
  else {
    console.log('\n Wrong input: acceptable answers: 1, 2 or 3');
    rl.question('\nchoose a queue: \n [1] - Red \n [2] - Yellow \n [3] - Green \n', queueChoices)
  }
}

module.exports = queueChoices;
