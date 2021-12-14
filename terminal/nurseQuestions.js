'use strict';

const publish = require('./sns');
const queueChoices = require('./queueChoices');

const { ptData } = require('./PatientInfo');

const nurseQuestions = () => {

  rl.question(chalk.blueBright(`\nEnter the patient's name:\n`), (answer) => {
    ptData['name'] = answer;

    rl.question(chalk.blueBright(`\nEnter the patient's age:\n`), (answer) => {
      ptData['age'] = answer;

      rl.question(chalk.blueBright('\nReason for a visit / chief complaint:\n'), (answer) => {
        ptData['symptoms'] = answer;

        rl.question(chalk.blueBright(`\nChoose a queue: \n ${chalk.white(`[1] - Red (High priority) \n [2] - Yellow (Medium priority) \n [3] - Green (Low priority) \n\n`)}`), queueChoices)
      });
    });
  });

}

let topic;
rl.on('save-pt-info', (info) => {
  topic = info.topic;
  delete info.topic;
  console.log();
  console.log(info);

  if (topic) {
    publish(topic, info)
  } else {
    throw new Error('wrong queue picked!')
  }
});

rl.on('nurse-questions', () => {
  nurseQuestions();
});


module.exports = { nurseQuestions }


