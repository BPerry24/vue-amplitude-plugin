jest.mock('amplitude-js');
import VueAmplitude from '../../';
import amplitude from 'amplitude-js';

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
      let vue = {};
      let options = {
        apiKey: 'someapikey',
        userId: 1
      }
    });

    it('throws if \'vue\' or \'options.apiKey\' params not provided', () => {
      expect(VueAmplitude.install()).toThrow('Must provide a Vue object');
      expect(VueAmplitude.install(vue)).toThrow('Must provide an \'apiKey\' option');
      expect(VueAmplitude.install(vue, options)).not.toThrow();
    });

    it('inits amplitude object with apiKey and userId if provided', () => {
      VueAmplitude.install(vue, options);
      expect(amplitude.getInstance).toHaveBeenCalled();
      expect(amplitude.init).toHaveBeenCalledWith()
    });

    it('sets $logEvent method on the vue prototype', () => {
      VueAmplitude.install(vue, options);
      expect(vue.$logEvent).toBeTruthy();
      expect(typeof vue.$logEvent).toBe('function');
      expect(vue.$logEvent).toBe(VueAmplitude.logEvent);
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
