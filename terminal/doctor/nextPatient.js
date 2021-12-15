'use strict';

const queuePull = require('./queuePull');
const { redApp } = require('./subscriptions');

function nextPatient (){
  rl.question(chalk.blueBright(`\nWould you like to move on to the next patient in the queue? ${chalk.white('[Y/N]')}\n`), (answer) => {
    if (answer.toLowerCase() === 'y') {
      queuePull();
    } else if (answer.toLowerCase() === 'n') {
      rl.emit('doctorEntry');
    }
    else {
      console.log(chalk.redBright(`\nOnly acceptable answers are ${chalk.white('Y')} or ${chalk.white('N')}`));
      redApp.emit('message_processed');
    }
  });
}

module.exports = nextPatient;