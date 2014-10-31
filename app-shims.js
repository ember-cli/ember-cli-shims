(function() {
/* globals define, Ember, DS, jQuery */

  function processEmberShims() {
    var shims = {
      'ember': {
        'default': Ember,
        'get': Ember.get,
        'set': Ember.set
      },
      'ember/computed': {
        'default': Ember.computed
      },
      'ember/route': {
        'default': Ember.Route
      },
      'ember/router': {
        'default': Ember.Router
      },
      'ember/controller': {
        'default': Ember.Controller
      },
      'ember/controllers/array': {
        'default': Ember.ArrayController
      },
      'ember/controllers/object': {
        'default': Ember.ObjectController
      },
      'ember/component': {
        'default': Ember.Component
      },
      'ember/view': {
        'default': Ember.View
      },
      'ember/views/container': {
        'default': Ember.ContainerView
      },
      'ember/mixin': {
        'default': Ember.Mixin
      },
      'ember/object': {
        'default': Ember.Object
      }
    };

    // populate `ember/computed` named exports
    for (var key in Ember.computed) {
      shims['ember/computed'][key] = Ember.computed[key];
    }

    for (var moduleName in shims) {
      generateModule(moduleName, shims[moduleName]);
    }
  }

  function processEmberDataShims() {
    if (typeof DS !== 'object') { return; }

    var shims = {
      'ember-data': {
        'default': DS
      },
      'ember-data/model': {
        'default': DS.Model
      },
      'ember-data/serializers/rest': {
        'default': DS.RESTSerializer
      },
      'ember-data/serializers/active-model': {
        'default': DS.ActiveModelSerializer
      },
      'ember-data/serializers/json': {
        'default': DS.JSONSerializer
      },
      'ember-data/adapters/rest': {
        'default': DS.RESTAdapter
      },
      'ember-data/adapter': {
        'default': DS.Adapter
      },
      'ember-data/adapters/active-model': {
        'default': DS.ActiveModelAdapter
      },
      'ember-data/serializers/json': {
        'default': DS.JSONSerializer
      },
      'ember-data/store': {
        'default': DS.Store
      },
      'ember-data/transform': {
        'default': DS.Transform
      }
    };

    for (var moduleName in shims) {
      generateModule(moduleName, shims[moduleName]);
    }
  }

  function generateModule(name, values) {
    define(name, [], function() {
      'use strict';

      return values;
    });
  }

  processEmberShims();
  processEmberDataShims();
  generateModule('jquery', { 'default': jQuery });
})();
