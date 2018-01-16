(function() {
  function vendorModule() {
    'use strict';

    return { 'default': self['FS'] || { identify: function() {}, setUserVars: function() {} } };
  }

  define('full-story', [], vendorModule);
})();
