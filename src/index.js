const amplitude = require('amplitude-js');
const { PluginError } = require('./errors');

module.exports = {
  install (Vue, options) {
    if (!Vue) throw new PluginError('Must provide global Vue object');
    if (!options || !options.apiKey) throw new PluginError('Must provide an \'apiKey\' option');
    const { apiKey, userId } = options;
    if (userId) {
      amplitude.getInstance().init(apiKey, userId);
    } else {
      amplitude.getInstance().init(apiKey);
    }
    Vue.prototype.$logEvent = this.logEvent;
  },
  logEvent (ev, evProps) {
    if (evProps) {
      amplitude.getInstance().logEvent(ev, evProps);
    } else {
      amplitude.getInstance().logEvent(ev);
    }
  }
}
