const PluginError = require('../../PluginError');

describe('PluginError (error)', () => {
  it('extends the error class', () => {
    expect(new PluginError('hello')).toStrictEqual(expect.any(Error));
  });
})
