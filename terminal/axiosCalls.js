'use strict'

const axios = require('axios');
const getUserCredentials = require('./getUserCredentials');
const { nurseQuestions } = require('./nurseQuestions');
const welcome2 = require('./welcome2');

async function signIn(obj) {
  console.log('\nfetching credentials ...')
  await axios({
    method: 'post',
    url: 'https://ii-care.herokuapp.com/signin',
    responseType: 'json',
    auth: {
      username: obj['username'],
      password: obj['password']
    },
  })
    .then(function (response) {

      if (response.data) {
        console.log(`\nLogin Successful. \nYou're signed in as: ${response.data.user.jobDescription}\n`)
        nurseQuestions()
      }
      else {
        console.log('Invalid login. Try again.')
        // welcome2();
        getUserCredentials()
      }
    })
}

async function signUp(obj) {
  console.log('creating credentials ...')
  await axios({
    method: 'post',
    url: 'https://ii-care.herokuapp.com/signup',
    responseType: 'json',
    data: {
      username: obj['username'],
      password: obj['password'],
      jobDescription: obj['jobDescription'],
      role: obj['role']
    },
  })
    .then(function (response) {

      if (response.data) {
        console.log(`\n Login is successful. You're signed in as: ${response.data.user.jobDescription}\n`)
        nurseQuestions()
      }
      else return '\nError singing up\n'
    });

  //end
}

module.exports = { signIn, signUp }
