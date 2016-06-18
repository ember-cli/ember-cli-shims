(function() {
/* globals define, Ember, jQuery */

  var globalContext = (function() {
      /* globals global, window, self */

      // from lodash to catch fake globals
      function checkGlobal(value) {
        return (value && value.Object === Object) ? value : undefined;
      }

      // element ids can ruin global miss checks
      function checkElementIdShadowing(value) {
        return (value && value.nodeType === undefined) ? value : undefined;
      }

      // export real global
      return checkGlobal(checkElementIdShadowing(typeof global === 'object' && global)) ||
             checkGlobal(typeof self === 'object' && self) ||
             checkGlobal(typeof window === 'object' && window) ||
             new Function('return this')(); // eval outside of strict mode
  })();

  function processEmberShims() {
    var shims = {
      'ember': {
        'default': globalContext.Ember
      },
      'ember-application': {
        'default': globalContext.Ember.Application
      },
      'ember-array': {
        'default': globalContext.Ember.Array
      },
      'ember-array/mutable': {
        'default': globalContext.Ember.MutableArray
      },
      'ember-array/utils': {
        'A':            globalContext.Ember.A,
        'isEmberArray': globalContext.Ember.isArray,
        'wrap':         globalContext.Ember.makeArray
      },
      'ember-component': {
        'default': globalContext.Ember.Component
      },
      'ember-components/checkbox': {
        'default': globalContext.Ember.Checkbox
      },
      'ember-components/text-area': {
        'default': globalContext.Ember.TextArea
      },
      'ember-components/text-field': {
        'default': globalContext.Ember.TextField
      },
      'ember-controller': {
        'default': globalContext.Ember.Controller
      },
      'ember-controller/inject': {
        'default': globalContext.Ember.inject.controller
      },
      'ember-controller/proxy': {
        'default': globalContext.Ember.ArrayProxy
      },
      'ember-controllers/sortable': {
        'default': globalContext.Ember.SortableMixin
      },
      'ember-debug': {
        'log':      globalContext.Ember.debug,
        'inspect':  globalContext.Ember.inspect,
        'run':      globalContext.Ember.runInDebug,
        'warn':     globalContext.Ember.warn
      },
      'ember-debug/container-debug-adapter': {
        'default': globalContext.Ember.ContainerDebugAdapter
      },
      'ember-debug/data-adapter': {
        'default': globalContext.Ember.DataAdapter
      },
      'ember-deprecations': {
        'deprecate':      globalContext.Ember.deprecate,
        'deprecateFunc':  globalContext.Ember.deprecateFunc
      },
      'ember-enumerable': {
        'default': globalContext.Ember.Enumerable
      },
      'ember-evented': {
        'default': globalContext.Ember.Evented
      },
      'ember-evented/on': {
        'default': globalContext.Ember.on
      },
      'ember-globals-resolver': {
        'default': globalContext.Ember.DefaultResolver
      },
      'ember-helper': {
        'default':  globalContext.Ember.Helper,
        'helper':   globalContext.Ember.Helper && globalContext.Ember.Helper.helper
      },
      'ember-instrumentation': {
        'instrument':   globalContext.Ember.Instrumentation.instrument,
        'reset':        globalContext.Ember.Instrumentation.reset,
        'subscribe':    globalContext.Ember.Instrumentation.subscribe,
        'unsubscribe':  globalContext.Ember.Instrumentation.unsubscribe
      },
      'ember-locations/hash': {
        'default': globalContext.Ember.HashLocation
      },
      'ember-locations/history': {
        'default': globalContext.Ember.HistoryLocation
      },
      'ember-locations/none': {
        'default': globalContext.Ember.NoneLocation
      },
      'ember-map': {
        'default':      globalContext.Ember.Map,
        'withDefault':  globalContext.Ember.MapWithDefault
      },
      'ember-metal/destroy': {
        'default': globalContext.Ember.destroy
      },
      'ember-metal/events': {
        'addListener':    globalContext.Ember.addListener,
        'removeListener': globalContext.Ember.removeListener,
        'send':           globalContext.Ember.sendEvent
      },
      'ember-metal/get': {
        'default': globalContext.Ember.get,
        'getProperties': globalContext.Ember.getProperties
      },
      'ember-metal/mixin': {
        'default': globalContext.Ember.Mixin
      },
      'ember-metal/observer': {
        'default':        globalContext.Ember.observer,
        'addObserver':    globalContext.Ember.addObserver,
        'removeObserver': globalContext.Ember.removeObserver
      },
      'ember-metal/on-load': {
        'default':  globalContext.Ember.onLoad,
        'run':      globalContext.Ember.runLoadHooks
      },
      'ember-metal/set': {
        'default':        globalContext.Ember.set,
        'setProperties':  globalContext.Ember.setProperties,
        'trySet':         globalContext.Ember.trySet
      },
      'ember-metal/utils': {
        'aliasMethod':  globalContext.Ember.aliasMethod,
        'assert':       globalContext.Ember.assert,
        'cacheFor':     globalContext.Ember.cacheFor,
        'copy':         globalContext.Ember.copy,
        'guidFor':      globalContext.Ember.guidFor
      },
      'ember-object': {
        'default': globalContext.Ember.Object
      },
      'ember-owner/get': {
        'default': globalContext.Ember.getOwner
      },
      'ember-owner/set': {
        'default': globalContext.Ember.setOwner
      },
      'ember-platform': {
        'assign':         globalContext.Ember.merge,
        'create':         globalContext.Ember.create,
        'defineProperty': globalContext.Ember.platform.defineProperty,
        'hasAccessors':   globalContext.Ember.platform.hasPropertyAccessors,
        'keys':           globalContext.Ember.keys
      },
      'ember-route': {
        'default': globalContext.Ember.Route
      },
      'ember-router': {
        'default': globalContext.Ember.Router
      },
      'ember-runloop': {
        'default':      globalContext.Ember.run,
        'begin':        globalContext.Ember.run.begin,
        'bind':         globalContext.Ember.run.bind,
        'cancel':       globalContext.Ember.run.cancel,
        'debounce':     globalContext.Ember.run.debounce,
        'end':          globalContext.Ember.run.end,
        'join':         globalContext.Ember.run.join,
        'later':        globalContext.Ember.run.later,
        'next':         globalContext.Ember.run.next,
        'once':         globalContext.Ember.run.once,
        'schedule':     globalContext.Ember.run.schedule,
        'scheduleOnce': globalContext.Ember.run.scheduleOnce,
        'throttle':     globalContext.Ember.run.throttle
      },
      'ember-service': {
        'default': globalContext.Ember.Service
      },
      'ember-service/inject': {
        'default': globalContext.Ember.inject.service
      },
      'ember-set/ordered': {
        'default': globalContext.Ember.OrderedSet
      },
      'ember-string': {
        'camelize':     globalContext.Ember.String.camelize,
        'capitalize':   globalContext.Ember.String.capitalize,
        'classify':     globalContext.Ember.String.classify,
        'dasherize':    globalContext.Ember.String.dasherize,
        'decamelize':   globalContext.Ember.String.decamelize,
        'fmt':          globalContext.Ember.String.fmt,
        'htmlSafe':     globalContext.Ember.String.htmlSafe,
        'loc':          globalContext.Ember.String.loc,
        'underscore':   globalContext.Ember.String.underscore,
        'w':            globalContext.Ember.String.w
      },
      'ember-utils': {
        'isBlank':    globalContext.Ember.isBlank,
        'isEmpty':    globalContext.Ember.isEmpty,
        'isNone':     globalContext.Ember.isNone,
        'isPresent':  globalContext.Ember.isPresent,
        'tryInvoke':  globalContext.Ember.tryInvoke,
        'typeOf':     globalContext.Ember.typeOf
      }
    };

    // populate `ember/computed` named exports
    shims['ember-computed'] = {
      'default': globalContext.Ember.computed
    };
    var computedMacros = [
      "empty","notEmpty", "none", "not", "bool", "match",
      "equal", "gt", "gte", "lt", "lte", "alias", "oneWay",
      "reads", "readOnly", "deprecatingAlias",
      "and", "or", "collect", "sum", "min", "max",
      "map", "sort", "setDiff", "mapBy", "mapProperty",
      "filter", "filterBy", "filterProperty", "uniq",
      "union", "intersect"
    ];
    for (var i = 0, l = computedMacros.length; i < l; i++) {
      var key = computedMacros[i];
      shims['ember-computed'][key] = globalContext.Ember.computed[key];
    }

    for (var moduleName in shims) {
      generateModule(moduleName, shims[moduleName]);
    }
  }

  function processTestShims() {
    if (Ember.Test) {
      var testShims = {
        'ember-test': {
          'default': globalContext.Ember.Test
        },
        'ember-test/adapter': {
          'default': globalContext.Ember.Test.Adapter
        },
        'ember-test/qunit-adapter': {
          'default': globalContext.Ember.Test.QUnitAdapter
        }
      };

      for (var moduleName in testShims) {
        generateModule(moduleName, testShims[moduleName]);
      }
    }
  }

  function generateModule(name, values) {
    define(name, [], function() {
      'use strict';

      Object.defineProperty(values, '__esModule', {
        value: true
      });

      return values;
    });
  }

  processEmberShims();
  processTestShims();
  generateModule('jquery', { 'default': globalContext.jQuery });
  generateModule('rsvp', { 'default': globalContext.Ember.RSVP });
})();
