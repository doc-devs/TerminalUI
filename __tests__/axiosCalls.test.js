require('../index')
const { signIn, signUp } = require('../terminal/axiosCalls')
const axios = require('axios');
const nurseQuestions = require('../terminal/nurse/nurseQuestions')

jest.mock('axios');
// jest.mock(signIn);

let spyFunction = jest.spyOn(nurseQuestions)

let user = {
  username: 'test-username',
  password: 'test-password',
  jobDescription: 'nurse'
}
const response = {
  data: user
}

const doctorEntry = jest.fn(); // mocking a function

describe('signIn', () => {

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



// let response = data: {
//   user: {
//     token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImF5cmF0IiwiaWF0IjoxNjM5NTM4MTQyfQ.VH_xD-7AmBKfKaofbLqgwi_nemsyTPsPi39kRVd0mc8',
//     capabilities: [Array],
//     id: 2,
//     username: 'ayrat',
//     jobDescription: 'nurse',
//     password: '$2b$10$XJCb8UDZ3RXm/0lKMk/8zOY5UBlGJlgJIJsxD7purqax/RR0hUeWm',
//     role: 'admin',
//     createdAt: '2021-12-11T03:37:24.692Z',
//     updatedAt: '2021-12-11T03:37:24.692Z'
//   },
//   token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImF5cmF0IiwiaWF0IjoxNjM5NTM4MTQyfQ.VH_xD-7AmBKfKaofbLqgwi_nemsyTPsPi39kRVd0mc8'
// }