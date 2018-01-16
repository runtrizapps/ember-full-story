import Ember from 'ember';
import FS from 'full-story';

export default Ember.Service.extend({
  identify(userId, userVars = {}) {
    this.inject();
    FS.identify(userId, userVars);
  },

  setUserVars(userVars = {}) {
    this.inject();
    FS.setUserVars(userVars);
  },

  inject() {
    if (typeof _fs_inject_script === 'function') {
      _fs_inject_script();
    }
  }
});
