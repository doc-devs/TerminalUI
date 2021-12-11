'use strict';

const { Consumer } = require('sqs-consumer');

const handler = (message) => {
  let patient = JSON.parse(message.Body);
  console.log(JSON.parse(patient.Message));
}

const redApp = Consumer.create({
  queueUrl: 'https://sqs.us-west-2.amazonaws.com/452365260800/RedQueue.fifo',
  handleMessage: handler,
  waitTimeSeconds: 3,
});

const yellowApp = Consumer.create({
  queueUrl: 'https://sqs.us-west-2.amazonaws.com/452365260800/YellowQueue.fifo',
  handleMessage: handler,
  waitTimeSeconds: 3,
});

const greenApp = Consumer.create({
  queueUrl: 'https://sqs.us-west-2.amazonaws.com/452365260800/GreenQueue.fifo',
  handleMessage: handler,
  waitTimeSeconds: 3,
});

let queuePull = () => {
  redApp.start();
}

redApp.on('message_processed', (message) => {
  redApp.stop();
  rl.question('Are you ready to take the next patient?\n', (answer) => {
    if (answer === 'y') {
      queuePull();
    } else {
      console.log('Only acceptable answers are y or n');
      redApp.emit('message_processed');
    }
  });
});

yellowApp.on('message_processed', (message) => {
  yellowApp.stop();
  rl.question('Are you ready to take the next patient?\n', (answer) => {
    if (answer === 'y') {
      queuePull();
    } else {
      console.log('Only acceptable answers are y or n');
      yellowApp.emit('message_processed');
    }
  });
});

greenApp.on('message_processed', (message) => {
  greenApp.stop();
  rl.question('Are you ready to take the next patient?\n', (answer) => {
    if (answer === 'y') {
      queuePull();
    } else {
      console.log('Only acceptable answers are y or n');
      greenApp.emit('message_processed');
    }
  });
});

redApp.on('empty', () => {
  redApp.stop();
  console.log('Red queue empty\nFetching yellow queue...');
  yellowApp.start();
});
yellowApp.on('empty', () => {
  yellowApp.stop();
  console.log('Yellow queue empty\nFetching green queue...');
  greenApp.start();
});
greenApp.on('empty', () => {
  greenApp.stop();
  console.log('Patient list empty');
  doctorEntry();
});

function doctorEntry() {
  rl.question('\nSelect an option\n\n[1] - Begin seeing patients\n[2] - Exit\n\n', (answer) => {
    if (answer === '1') {
      rl.question('Hello, press enter whenever you are ready to take the next patient', (answer) => {
        // console.log('*', answer);
        queuePull();
      });
    } else if (answer === '2') {
      rl.close();
      console.log('Goodbye from iCare');
    } else {
      console.log('\nInvalid input. Please choose a number and press ENTER.\n');
    }
  });
};

module.exports = { doctorEntry }
