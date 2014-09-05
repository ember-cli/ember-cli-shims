(function() {
/* globals define, Ember, DS, jQuery */

  var shims = {
    'ember': {
      'default': Ember
    },
    'ember/computed': {
      'default': Ember.computed
    },

    'ember-data': {
      'default': DS
    },
    'jquery': {
      'default': jQuery
    }
  };

  // populate `ember/computed` named exports
  for (var key in Ember.computed) {
    shims['ember/computed'][key] = Ember.computed[key];
  }

  for (var moduleName in shims) {
    define(moduleName, [], function() {
      'use strict';

      return shims[moduleName];
    });
  }
})();
