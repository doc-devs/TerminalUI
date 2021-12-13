'use strict';

const chalk = require('chalk');
const { Consumer } = require('sqs-consumer');

// ============== message handler ========= //

const handler = (message) => {
  let patientRaw = JSON.parse(message.Body);
  let patient= JSON.parse(patientRaw.Message);
  console.log(chalk.magenta('\nYou are assigned the following patient:\n'), patient);
}

// ========= subscriptions to queues =========//

const redApp = Consumer.create({
  queueUrl: process.env.SQS_URL_RED,
  handleMessage: handler,
  waitTimeSeconds: 2,
});

const yellowApp = Consumer.create({
  queueUrl: process.env.SQS_URL_YELLOW,
  handleMessage: handler,
  waitTimeSeconds: 2,
});

const greenApp = Consumer.create({
  queueUrl: process.env.SQS_URL_GREEN,
  handleMessage: handler,
  waitTimeSeconds: 2,
});
// ============= queue pull ==================== //

let queuePull = () => {
  redApp.start();
  console.log(`\nChecking ${chalk.redBright('RED')} queue...`)
}

// ========== listeners for message received ============ //

redApp.on('message_processed', (message) => {
  redApp.stop();
  nextPatient();
});

yellowApp.on('message_processed', (message) => {
  yellowApp.stop();
  nextPatient();
});

greenApp.on('message_processed', (message) => {
  greenApp.stop();
  nextPatient();
});

// ========= listeners for empty queues ========== //

redApp.on('empty', () => {
  redApp.stop();
  console.log(`\n${chalk.redBright('RED')} ${chalk.grey('queue is empty')}.\n\nChecking ${chalk.yellow('YELLOW')} queue...`);
  yellowApp.start();
});
yellowApp.on('empty', () => {
  yellowApp.stop();
  console.log(`\n${chalk.yellow('YELLOW')} ${chalk.grey('queue is empty')}.\n\nChecking ${chalk.green('GREEN')} queue...`);
  greenApp.start();
});
greenApp.on('empty', () => {
  greenApp.stop();
  console.log(chalk.green('All patient queues are empty\n'));
  doctorEntry();
});

// ========== doctor entry function ========== //

function doctorEntry() {
  rl.question(`${chalk.blueBright('\nSelect an option')}\n\n[1] - Begin seeing patients\n[2] - Exit\n\n`, (answer) => {
    if (answer === '1') {
      rl.question(chalk.blueBright('\nPress enter when you are ready to take the next patient\n'), (answer) => {
        // console.log('*', answer);
        queuePull();
      });
    } else if (answer === '2') {
      rl.close();
      console.log(chalk.cyan.bold('\nYou are signed off. Thank you for using iCare!\n\n'));
    } else {
      console.log(chalk.redBright(`\nInvalid input. Please choose a number and press ${chalk.white('ENTER')}.\n`));
    }
  });
};

function nextPatient (){
  rl.question(chalk.blueBright(`\nWould you like to move on to the next patient in the queue? ${chalk.white('[Y/N]')}\n`), (answer) => {
    if (answer.toLowerCase() === 'y') {
      queuePull();
    } else if (answer.toLowerCase() === 'n') {
      doctorEntry();
    }
    else {
      console.log(chalk.redBright(`\nOnly acceptable answers are ${chalk.white('Y')} or ${chalk.white('N')}`));
      redApp.emit('message_processed');
    }
  });
}


module.exports = { doctorEntry }
