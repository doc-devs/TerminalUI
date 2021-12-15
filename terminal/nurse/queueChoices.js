'use strict';

const { PatientInfo, ptData } = require('./PatientInfo');

const queueChoices = (choice) => {

  if (choice.trim() === '1') {
    ptData['topic'] = process.env.SNS_TOPIC_RED;
    ptData['queue'] = 'RED'
    let ptInfo = new PatientInfo(ptData);
    rl.emit('save-pt-info', ptInfo);
  }
  else if (choice.trim() === '2') {
    ptData['topic'] = process.env.SNS_TOPIC_YELLOW;
    ptData['queue'] = 'YELLOW'
    let ptInfo = new PatientInfo(ptData);
    rl.emit('save-pt-info', ptInfo);
  }
  else if (choice.trim() === '3') {
    ptData['topic'] = process.env.SNS_TOPIC_GREEN;
    ptData['queue'] = 'GREEN'
    let ptInfo = new PatientInfo(ptData);
    rl.emit('save-pt-info', ptInfo);
  }
  else {
    console.log(chalk.red('\n Wrong input. Acceptable answers: 1, 2 or 3'));
    rl.question(chalk.blueBright(`\nChoose a queue: \n ${chalk.white(`[1] - Red (High priority) \n [2] - Yellow (Medium priority) \n [3] - Green (Low priority) \n\n`)}`), queueChoices)
  }
}

module.exports = queueChoices;
