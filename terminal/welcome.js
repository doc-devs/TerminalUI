'use strict';

const getUserCredentials = require('./getUserCredentials');
const createUserCredentials = require('./createUserCredentials');

console.log('\n\x1b[47m\x1b[31m  Welcome to iCare Queue Management System  \x1b[0m')

const welcome = () => {
  new Promise((resolve) => {
    rl.question('\nPress 1 or 2 and then Enter to access iCare\nOr press 3 to exit \n\n[1] - sign in\n[2] - sign up\n[3] - exit\n', (answer) => {
      resolve(answer);
    })
  }).then((data) => {
    if (data === '1') {
      getUserCredentials();
    } else if (data === '2') {
      createUserCredentials();
    } else if (data === '3') {
      console.log('\n Thank You For using Icare, Goodbye...for now >:|')
      rl.close()
    } else {
      console.log('\nInvalid input. Please choose a number and press ENTER.\n')
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




