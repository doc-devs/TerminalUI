'use strict';

const { signUp } = require('./axiosCalls.js')

let userData = { role: 'admin' };

async function createUserCredentials() {

  rl.question(chalk.blueBright('\nCreate a username\n\n'), (answer) => {
    userData['username'] = answer;
    rl.emit('question2')
  })

  rl.once('question2', () => {
    rl.question(chalk.blueBright('\nCreate a password\n\n'), (answer) => {
      userData['password'] = answer;
      rl.emit('question3');
    })
  })

  rl.on('question3', () => {
    rl.question(chalk.blueBright(`\nPick your job description:\n ${chalk.white(`\n[1] - Nurse\n[2] - Doctor\n\n`)}`), (answer) => {
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
