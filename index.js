/* jshint node: true */
'use strict';

const fs = require('fs');

function fsValidateConfig(addonConfig) {
  if (!addonConfig['org']) {
    throw new Error("ember-full-story requires ENV['ember-full-story']['org'] to be set when enabled.");
  }
}

function fsRecordingSnipppet(addonConfig) {
  const fsSnippet = fs.readFileSync('fs-snippet.js', 'utf8');

  return `
    if (typeof Fastboot === 'undefined') {
      window['_fs_debug'] =${addonConfig.debug};
      window['_fs_host'] = ${addonConfig.host};
      window['_fs_org'] = ${addonConfig.org};
      window['_fs_namespace'] = ${addonConfig.namespace};

      var _fs_inject_script = function() { ${fsSnippet}; _fs_inject_script = null; };

      ${ invokeFs ? '_fs_inject_script();' : '' }
    }
  `;
}

module.exports = {
  name: 'ember-full-story',

  config: function(/* environment, appConfig */) {
    return {
      'ember-full-story': {
        debug: false,
        enabledEnvironments: ['production'],
        host: 'www.fullstory.com',
        namespace: 'FS'
      }
    };
  },

  contentFor: function(type, config) {
    var environment = config['environment'];
    var addonConfig = config['ember-full-story'];
    var shouldInsertFs = addonConfig['enabledEnvironments'].indexOf(environment) > -1;

    if (type === 'head-footer' && shouldInsertFs) {
      fsValidateConfig(addonConfig);

      return fsRecordingSnipppet(addonConfig);
    }
  }
};
