(function() {
/* globals define, Ember, DS, jQuery */

  var _DS = typeof DS === 'object' ? DS : null;

  var shims = {
    'ember': {
      'default': Ember
    },
    'ember-data': {
      'default': _DS
    },
    'jquery': {
      'default': jQuery
    }
  };

  function generateModule(name, values) {
    define(name, [], function() {
      'use strict';

      return values;
    });
  }

  for (var moduleName in shims) {
    generateModule(moduleName, shims[moduleName]);
  }
})();

