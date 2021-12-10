'use strict';

const publish = require('./sns');
const queueChoices = require('./queueChoices');

const { ptData } = require('./PatientInfo');

const nurseQuestions = () => {

  rl.question(`\nWhat is the patient's name?\n`, (answer) => {
    ptData['name'] = answer;

    rl.question(`\nWhat is patient's age?\n`, (answer) => {
      ptData['age'] = answer;

      rl.question('\nReason for visit?\n', (answer) => {
        ptData['symptoms'] = answer;

        rl.question('\nchoose a queue: \n [1] - Red \n [2] - Yellow \n [3] - Green \n', queueChoices)
      });
    });
  });

}

rl.on('save-pt-info', (info) => {
  console.log(info);
  if (info.topic) {
    publish(info.topic, info)
  } else {
    throw new Error('wrong queue picked!')
  }
});

rl.on('nurse-questions', () => {
  nurseQuestions();
});


module.exports = { nurseQuestions }


