'use strict';

const { signUp } = require('./axiosCalls.js')

async function createUserCredentials() {
  let userData = { role: 'admin' };

  rl.question('\nCreate a username\n', (answer) => {
    userData['username'] = answer;
    rl.emit('question2')
  })

  rl.once('question2', () => {
    rl.question('\nCreate a password\n', (answer) => {
      userData['password'] = answer;
      rl.emit('question3');
    })
  })

  rl.on('question3', () => {
    rl.question('\nPick your job description:\n[1] - Nurse\n[2] - Doctor\n', (answer) => {
      if (answer === '1') {
        userData['jobDescription'] = 'nurse';
        signUp(userData);
      }
      else if (answer === '2') {
        userData['jobDescription'] = 'doctor';
        signUp(userData);
      }
      else {
        console.log('\n Invalid input. Type a number and press ENTER');
        rl.emit('question3');
      }
    })
  })
}

module.exports = createUserCredentials;