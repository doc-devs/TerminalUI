require('../index')
const { signIn, signUp } = require('../terminal/axiosCalls')
const axios = require('axios');
const nurseQuestions = require('../terminal/nurse/nurseQuestions')

jest.mock('axios');
// jest.mock(signIn);

// let spyFunction = jest.spyOn(nurseQuestions)

let user = {
  username: 'test-username',
  password: 'test-password',
  jobDescription: 'nurse'
}
const response = {
  data: user
}

const doctorEntry = jest.fn(); // mocking a function

xdescribe('signIn', () => {

  test('does what it is supposed to do', () => {

    // make an axios call
    // depending on the response, a condiional that takes an object

    // after that it fires off a function

    // if we mock signIn, result - function gets called

    let result = axios.post.mockResolvedValue(response)
    Promise.resolve(result).then(() => {

      spyFunction()

    })
    expect(spyFunction).toHaveBeenCalled()

  })

})

