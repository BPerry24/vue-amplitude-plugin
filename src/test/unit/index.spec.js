jest.mock('amplitude-js');
jest.mock('../../errors/PluginError', () => class extends Error {});
import VueAmplitude from '../../';
import amplitude from 'amplitude-js'

describe('VueAmplitude (plugin)', () => {
  let MockVue;
  beforeEach(() => {
    amplitude.getInstance = jest.fn(() => amplitude);
    amplitude.init = jest.fn(() => amplitude);
    amplitude.logEvent = jest.fn();
    MockVue = class {};
  });

  it('has an install method', () => {
    expect(typeof VueAmplitude.install).toBe('function');
  });

  describe('install (method)', () => {
    let options;
    beforeEach(() => {
      options = {
        apiKey: 'someapikey',
        userId: 1
      };
    });

    it('throws if \'Vue\' or \'options.apiKey\' params not provided', () => {
      expect(() => VueAmplitude.install()).toThrow('Must provide global Vue object');
      expect(() => VueAmplitude.install(MockVue)).toThrow('Must provide an \'apiKey\' option');
      expect(() => VueAmplitude.install(MockVue, options)).not.toThrow();
    });

    it('inits amplitude object with apiKey and userId if provided', () => {
      VueAmplitude.install(MockVue, options);
      expect(amplitude.getInstance).toHaveBeenCalled();
      expect(amplitude.init).toHaveBeenCalledWith(
        options.apiKey,
        options.userId
      )
    });

    it('does not invoke init with userId if it is not provided', () => {
      const optionsCopy = Object.assign({}, options);
      delete optionsCopy.userId;
      VueAmplitude.install(MockVue, optionsCopy);
      expect(amplitude.init).not.toHaveBeenCalledWith(
        options.apiKey,
        expect.anything()
      );
      expect(amplitude.init).toHaveBeenCalledWith(
        options.apiKey
      );
    });

    it('sets $logEvent method on the Vue prototype', () => {
      VueAmplitude.install(MockVue, options);
      expect(MockVue.prototype.$logEvent).toBeTruthy();
      expect(typeof MockVue.prototype.$logEvent).toBe('function');
      expect(MockVue.prototype.$logEvent).toBe(VueAmplitude.logEvent);
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
