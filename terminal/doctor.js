'use strict';

const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
global.rl = readline.createInterface({ input, output });

const { Consumer } = require('sqs-consumer');

const handler = (message) => {
  let patient = JSON.parse(message.Body);
  console.log(JSON.parse(patient.Message));
}

const redApp = Consumer.create({
  queueUrl: 'https://sqs.us-west-2.amazonaws.com/452365260800/RedQueue.fifo',
  handleMessage: handler,
});

const yellowApp = Consumer.create({
  queueUrl: 'https://sqs.us-west-2.amazonaws.com/452365260800/YellowQueue.fifo',
  handleMessage: handler,
});

const greeApp = Consumer.create({
  queueUrl: 'https://sqs.us-west-2.amazonaws.com/452365260800/GreenQueue.fifo',
  handleMessage: handler,
});

const queueProcess = (app) => {
  app.on('message_processed', (message) => {
    app.stop();
    rl.question('Are you ready to take the next patient?\n', (answer) => {
      if (answer === 'y') {
        app.start();
      } else {
        console.log('Only acceptable answers are y or n');
        app.emit('message_processed');
      }
    });
  });
}

rl.question('Hello, press enter whenever you are ready to take the next patient', (answer) => {
  app.start();
  // queueProcess();
});
