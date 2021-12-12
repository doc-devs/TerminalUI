'use strict';

const { signIn } = require('./axiosCalls.js')

async function getUserCredentials() {
  let userData = {}

  rl.question('What is your USERNAME?\n', (answer) => {
    userData['username'] = answer;
    rl.question('What is your PASSWORD?\n', async (answer) => {
      userData['password'] = answer; 
      signIn(userData)
    });
  });
}

rl.on('invalid-login', () => {
  getUserCredentials();
});

module.exports = getUserCredentials;
