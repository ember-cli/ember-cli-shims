(function() {
/* globals define, Ember, DS, jQuery */

  var shims = {
    'ember': {
      'default': Ember
    },
    'ember-data': {
      'default': DS
    },
    'jquery': {
      'default': jQuery
    }
  };

  for (var moduleName in shims) {
    define(moduleName, [], function() {
      'use strict';

      return shims[moduleName];
    });
  }
})();

