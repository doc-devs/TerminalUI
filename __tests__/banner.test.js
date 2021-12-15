require('../index');

const banner = require('../terminal/banner');

describe('banner', ()=>{
  let logSpy;
  let clearSpy
  let req = {};
  let res = {};
  let next = jest.fn(); // spy on next method

  beforeEach(() => {
    // Attach to the console (take it over)
    logSpy = jest.spyOn(console, 'log').mockImplementation();
    clearSpy = jest.spyOn(console, 'clear');
  });

  afterEach(() => {
    // Put the console back
    logSpy.mockRestore();
    clearSpy.mockRestore();
  });

  it('properly logs some output', () => {
    banner();
    // expect(clearSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledTimes(4);
  });
})