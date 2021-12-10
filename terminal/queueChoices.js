'use strict'

const { PatientInfo, ptData } = require('./PatientInfo');

const queueChoices = (choice) => {

  if (choice.trim() === '1') {
    ptData['topic'] = 'arn:aws:sns:us-west-2:452365260800:Red.fifo'
    let ptInfo = new PatientInfo(ptData);
    rl.emit('save-pt-info', ptInfo);
  }
  else if (choice.trim() === '2') {
    ptData['topic'] = 'arn:aws:sns:us-west-2:452365260800:Yellow.fifo'
    let ptInfo = new PatientInfo(ptData);
    rl.emit('save-pt-info', ptInfo);
  }
  else if (choice.trim() === '3') {
    ptData['topic'] = 'arn:aws:sns:us-west-2:452365260800:Green.fifo'
    let ptInfo = new PatientInfo(ptData);
    rl.emit('save-pt-info', ptInfo);
  }
  else {
    console.log('\n Wrong input: acceptable answers: 1, 2 or 3');
    rl.question('\nchoose a queue: \n [1] - Red \n [2] - Yellow \n [3] - Green \n', queueChoices)
  }
}

module.exports = queueChoices;
