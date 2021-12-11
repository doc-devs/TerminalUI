'use strict'

const axios = require('axios');
const getUserCredentials = require('./getUserCredentials');
const { nurseQuestions } = require('./nurseQuestions');
const welcome2 = require('./welcome');

function signIn(obj) {
  console.log('\nfetching credentials ...')
  axios({
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
        getUserCredentials()
      }
    })
    .catch(e => {
      console.log(e)
    })
}

function signUp(obj) {
  console.log('creating credentials ...')
  axios({
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
        console.log(`\n Login Successful. You're signed in as: ${response.data.user.jobDescription}\n`)
        nurseQuestions()
      }
      else return '\nError singing up\n'
    });

}

module.exports = { signIn, signUp }
