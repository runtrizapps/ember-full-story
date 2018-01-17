/* global window */
import Ember from 'ember';

const { Evented } = Ember;

export default Ember.Service.extend(Evented, {
  identify(userId, userVars = {}) {
    this._fsMethod('identify', userId, userVars);
  },

  setUserVars(userVars = {}) {
    this._fsMethod('setUserVars', userVars);
  },

  inject() {
    if (window && typeof window._fs_inject_script === 'function') {
      window._fs_inject_script();
      this.set('isInjected', true);
      this.trigger('injected');
    }
  },

  isInjected: Ember.computed(function() {
    return window && window.FS;
  }),

  _fsMethod(method, ...args) {
    if (window && window.FS) {
      window.FS[method](...args);
    } else {
      this.one('injected', () => this._fsMethod(...arguments));
    }
  }
});
