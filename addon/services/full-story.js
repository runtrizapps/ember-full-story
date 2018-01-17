/* global window */
import Ember from 'ember';

const { Evented } = Ember;

export default Ember.Service.extend(Evented, {
  identify(userId, userVars = {}) {
    fsMethod('identify', userId, userVars);
  },

  setUserVars(userVars = {}) {
    fsMethod('setUserVars', userVars);
  },

  inject() {
    if (window && typeof window._fs_inject_script === 'function') {
      _fs_inject_script();
      this.set('isInjected', true);
      this.trigger('injected');
    }
  },

  isInjected: Ember.computed(function() {
    return window && window.FS;
  }),
});

function fsMethod(method, ...args) {
  if (window && window.FS) {
    window.FS[method](...args);
  } else {
    this.one('injected', () => fsMethod(...arguments));
  }
}
