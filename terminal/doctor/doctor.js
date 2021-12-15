'use strict';

const chalk = require('chalk');
const nextPatient = require('./nextPatient');
const queuePull = require('./queuePull');
const {redApp, yellowApp, greenApp} = require('./subscriptions');

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
  rl.emit('doctorEntry');
});

// ========== doctor entry function ========== //

rl.on('doctorEntry', ()=>{
  doctorEntry();
})

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

module.exports = { doctorEntry }
