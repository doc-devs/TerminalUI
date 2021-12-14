'use strict';

const { signIn } = require('./axiosCalls.js')

async function getUserCredentials() {
  let userData = {}

  rl.question(chalk.blueBright('\nWhat is your USERNAME?\n\n'), (answer) => {
    userData['username'] = answer;
    rl.question(chalk.blueBright('\nWhat is your PASSWORD?\n\n'), async (answer) => {
      userData['password'] = answer; 
      signIn(userData)
    });
  });
}

module.exports = getUserCredentials;
