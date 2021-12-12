'use strict'

const axios = require('axios');
const { nurseQuestions } = require('./nurseQuestions');
const { doctorEntry } = require('./doctor');

function signIn(obj) {
  console.log('\nfetching credentials ...')
  axios({
    method: 'post',
    url: 'https://ii-care.herokuapp.com/signin',
    // url: 'http://localhost:3000/signin',
    responseType: 'json',
    auth: {
      username: obj['username'],
      password: obj['password']
    },
  })
    .then(function (response) {
      // console.log('**', response);
      if (response.data.user.jobDescription === 'nurse') {
        console.log(`\nLogin Successful. \nWelcome back ${response.data.user.username}! \nYou're signed in as: ${response.data.user.jobDescription}\n`)
        nurseQuestions()
      } else if (response.data.user.jobDescription === 'doctor') {
        console.log(`\nLogin Successful. \nWelcome back ${response.data.user.username}! \nYou're signed in as: ${response.data.user.jobDescription}\n`)
        doctorEntry();
      }
    })
    .catch(e => {
      console.log(e.response.data)
      rl.emit('invalid-login');
    })
}

function signUp(obj) {
  console.log('creating credentials ...')
  axios({
    method: 'post',
    url: 'https://ii-care.herokuapp.com/signup',
    // url: 'http://localhost:3000/signup',
    responseType: 'json',
    data: {
      username: obj['username'],
      password: obj['password'],
      jobDescription: obj['jobDescription'],
      role: obj['role']
    },
  })
    .then(function (response) {
      if (response.data.user.jobDescription === 'nurse') {
        console.log(`\n Registration Successful. You're signed up as: ${response.data.user.jobDescription}\n`)
        rl.emit('welcome');
      } else if (response.data.user.jobDescription === 'doctor') {
        console.log(`\nRegistration Successful. \nYou're signed up as: ${response.data.user.jobDescription}\n`)
        rl.emit('welcome');
      }
    })
    .catch((e) => {
      if (e.response.status === 409) {
        console.log(e.response.data);
        rl.emit('bad-username');
      } else {
        console.log(e);
      }
    });
}

module.exports = { signIn, signUp }
