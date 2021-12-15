const handler = require('../terminal/doctor/handler');

xdescribe('handler', () => {
  let logSpy;

  beforeEach(() => {
    // Attach to the console (take it over)
    logSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    // Put the console back
    logSpy.mockRestore();
  });

  it('handler logs out info', () => {
    let obj = {
      Body: { 
        '"Message"': '"test"'
      }
    }
    handler(obj);
    expect(logSpy).toHaveBeenCalled();
  });
})