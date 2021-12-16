'use strict'

const axios = require('axios');
const { nurseQuestions } = require('./nurse/nurseQuestions');
const { doctorEntry } = require('./doctor/doctor');
const { ptData } = require('./nurse/PatientInfo');
const server = process.env.SERVER_URL || 'http://localhost:3000';

function signIn(obj) {
  console.log(chalk.grey('\nFetching credentials ...\n'))
  axios({
    method: 'post',
    url: `${server}/signin`, 
    responseType: 'json',
    auth: {
      username: obj['username'],
      password: obj['password']
    },
  })
    .then(function (response) {

      console.log(chalk.cyanBright(`Successfully logged in as a: ${chalk.white(response.data.user.jobDescription)} \nWelcome back, user ${chalk.white(response.data.user.username)}!\n`));      
      if (response.data.user.jobDescription === 'nurse') {        
        ptData['screenedBy'] = response.data.user.username;
        nurseQuestions()
      }
      else if (response.data.user.jobDescription === 'doctor') {
        doctorEntry();
      }
    })
    .catch(e => {
      console.log(chalk.red(e.response.data))
      rl.emit('welcome');
    })
}

function signUp(obj) {
  console.log(chalk.grey('\ncreating credentials ...\n'))
  axios({
    method: 'post',
    url: `${server}/signup`,
    responseType: 'json',
    data: {
      username: obj['username'],
      password: obj['password'],
      jobDescription: obj['jobDescription'],
      role: obj['role']
    },
  })
    .then(function (response) {
      console.log(chalk.cyanBright(`Registration is successful. You're signed up as: ${chalk.white(response.data.user.jobDescription)}\n`));
      rl.emit('welcome');
    })
    .catch((e) => {
      if (e.response.status === 409) {
        console.log(chalk.red(e.response.data));
        rl.emit('welcome');
      } else {
        console.log(e);
      }
    });
}

module.exports = { signIn, signUp }
