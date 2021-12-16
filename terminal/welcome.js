'use strict';

const getUserCredentials = require('./getUserCredentials');
const createUserCredentials = require('./createUserCredentials');

const welcome = () => {
  console.log(chalk.blueBright(`\nSelect an option and press ${chalk.white('Enter')}`));

  new Promise((resolve) => {
    rl.question('\n[1] - sign in\n[2] - sign up\n[3] - exit\n\n', (answer) => {
      resolve(answer);
    })
  }).then((data) => {
    if (data === '1') {
      getUserCredentials();
    } else if (data === '2') {
      createUserCredentials();
    } else if (data === '3') {
      console.log(chalk.cyan.bold('\nYou are signed off. Thank you for using iCare!\n\n'))
      rl.close()
    } else {
      console.log(chalk.redBright(`\nInvalid input. Please choose a number and press ${chalk.white('ENTER')}.\n`))
      welcome()
    }
  }).catch((e) => {
    console.log(e)
  })
}

rl.on('welcome', () => {
  welcome();
});

module.exports = { welcome }




