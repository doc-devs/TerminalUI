require('../index');
const welcome = require('../terminal/welcome');

// jest.mock('../terminal/welcome');

describe('Welcome function', () => {

  it('gets invoked', () => {
    welcome.welcome = jest.fn()
    // rl.emit('welcome');

    expect(welcome.welcome).toBeTruthy()
  })
})