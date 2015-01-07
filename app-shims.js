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
    var shims = {
      'ember-data':                          '',
      'ember-data/model':                    'Model',
      'ember-data/serializers/rest':         'RESTSerializer',
      'ember-data/serializers/active-model': 'ActiveModelSerializer',
      'ember-data/serializers/json':         'JSONSerializer',
      'ember-data/adapters/rest':            'RESTAdapter',
      'ember-data/adapter':                  'Adapter',
      'ember-data/adapters/active-model':    'ActiveModelAdapter',
      'ember-data/serializers/json':         'JSONSerializer',
      'ember-data/store':                    'Store',
      'ember-data/transform':                'Transform',
      'ember-data/attr':                     'attr',
      'ember-data/relationships':            ['hasMany', 'belongsTo']
    };

    for (var moduleName in shims) {
      generateLazyModule('DS', moduleName, shims[moduleName]);
    }
  }

  function generateModule(name, values) {
    define(name, [], function() {
      'use strict';

      return values;
    });
  }

  function generateLazyModule(namespace, name, globalName) {
    define(name, [], function() {
      'use strict';

      var exportObject = {};

      if (typeof globalName === 'object') {
        for (var i = 0, l = globalName.length; i < l; i++) {
          exportObject[globalName[i]] = window[namespace][globalName[i]];
        }
      } else {
        exportObject['default'] = (globalName !== '') ? window[namespace][globalName] : window[namespace];
      }

      return exportObject;
    });
  }

  processEmberShims();
  processEmberDataShims();
  generateModule('jquery', { 'default': jQuery });
})();
