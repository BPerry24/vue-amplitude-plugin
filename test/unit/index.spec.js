jest.mock('amplitude-js');
jest.mock('../../errors', () => ({
  PluginError: class extends Error {
    constructor (msg) {
      super(msg)
    }
  }
}));
const VueAmplitude = require('../../');
const amplitude = require('amplitude-js');

class Vue {

};

describe('VueAmplitude (plugin)', () => {
  beforeEach(() => {
    amplitude.getInstance = jest.fn(() => amplitude);
    amplitude.init = jest.fn(() => amplitude);
    amplitude.logEvent = jest.fn();
  });

  it('has an install method', () => {
    expect(typeof VueAmplitude.install).toBe('function');
  });

  describe('install (method)', () => {
    let vue;
    let options;
    beforeEach(() => {
      vue = Vue;
      options = {
        apiKey: 'someapikey',
        userId: 1
      };
    });

    it('throws if \'vue\' or \'options.apiKey\' params not provided', () => {
      expect(() => VueAmplitude.install()).toThrow('Must provide global Vue object');
      expect(() => VueAmplitude.install(vue)).toThrow('Must provide an \'apiKey\' option');
      expect(() => VueAmplitude.install(vue, options)).not.toThrow();
    });

    it('inits amplitude object with apiKey and userId if provided', () => {
      VueAmplitude.install(vue, options);
      expect(amplitude.getInstance).toHaveBeenCalled();
      expect(amplitude.init).toHaveBeenCalledWith(
        options.apiKey,
        options.userId
      )
    });

    it('does not invoke init with userId if it is not provided', () => {
      const optionsCopy = Object.assign({}, options);
      delete optionsCopy.userId;
      VueAmplitude.install(vue, optionsCopy);
      expect(amplitude.init).not.toHaveBeenCalledWith(
        options.apiKey,
        expect.anything()
      );
      expect(amplitude.init).toHaveBeenCalledWith(
        options.apiKey
      );
    });

    it('sets $logEvent method on the vue prototype', () => {
      VueAmplitude.install(vue, options);
      expect(vue.prototype.$logEvent).toBeTruthy();
      expect(typeof vue.prototype.$logEvent).toBe('function');
      expect(vue.prototype.$logEvent).toBe(VueAmplitude.logEvent);
    });
  });

  describe('logEvent (method)', () => {
    it('invokes the logEvent method on the amplitude instance with params', () => {
      VueAmplitude.logEvent('TEST_EVENT', { eventParam: 'eventParamVal' });
      expect(amplitude.getInstance).toHaveBeenCalled();
      expect(amplitude.logEvent).toHaveBeenCalledWith(
        'TEST_EVENT',
        expect.objectContaining({
          eventParam: 'eventParamVal'
        })
      );
    });
  });
});
