import PluginError from '../../';

describe('PluginError (error)', () => {
  it('extends the error class', () => {
    expect(new PluginError('hello')).toStrictEqual(expect.any(Error));
  });
})
