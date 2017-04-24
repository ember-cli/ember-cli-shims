Ember CLI Shims
===============

[![Greenkeeper badge](https://badges.greenkeeper.io/ember-cli/ember-cli-shims.svg)](https://greenkeeper.io/)


NOTE: this repo is frozen until ember's public module interface has been finalized.

About
-----

Ember CLI Shims (ECS) contain all the shims used in Ember CLI.

Note: The `ember-data` shim has been removed as of v0.1.0. The latest 
[Ember-Data](https://github.com/emberjs/data) no longer has a bower dependency; 
`ember-cli-shims` >= v0.1.0 is only intended for use with Ember-Data v2.3.0 and up.

Usage
-----

Simply import any of the shims as an ES6 module:

```js
import Component from 'ember-component';
import run from 'ember-runloop';
import injectService from 'ember-service/inject';
```

Some of the shims have named exports (instead of/in addition to a `default` export):

```js
import { assert, copy } from 'ember-metal/utils';
import { debounce } from 'ember-runloop';
import { isEmpty } from 'ember-utils';
```

Shims
-----
The [app-shims](https://github.com/ember-cli/ember-cli-shims/blob/master/vendor/ember-cli-shims/app-shims.js) 
file provides a complete reference of all modules currently supported by this library. 

Why?
----

Historically, Ember has recommended that developers reference core classes 
& utilities (ie `Component`, `Route`, `isEmpty`) via the root `Ember` namespace. 
This leads to the entire `Ember` module being imported into nearly every file:

```js
import Ember from 'ember';

export default Ember.Component.extend({
  foo: Ember.inject.service(),
  bar: Ember.computed.readOnly('foo.bar')
});
```

It would be preferable to have different parts of Ember available as separate modules, 
allowing developers to only import what they need. This is the direction the framework 
is moving in, but the modules are not yet available. This has led to a common pattern of 
ES6 destructuring assignment to enable writing future-proof code:

```js
import Ember from 'ember';

const { Component, computed, inject } = Ember;

export default Component.extend({
  foo: inject.service(),
  bar: computed.readOnly('foo.bar');
});
```

However, this library provides shims to mimic the future modules that Ember may provide, 
enabling developers to avoid destructuring and instead import the namespaces as modules *today*.

```js
import Component from 'ember-component';
import computed from 'ember-computed';
import injectService from 'ember-service/inject';

export default Component.extend({
  foo: injectService(),
  bar: computed.readOnly('foo.bar');
});
```

That way, as true modules become available in the Ember ecosystem, we can merely remove 
the shims from `ECS` upstream, requiring little to no refactoring on the part of 
developers who have opted-in to this pattern early. Ultimately, the goal of this 
library is to be replaced completely once Ember itself is an npm package/addon and exports its own modules.

<!--[begin-apidocs]-->

Shims provided by this addon
----------------------------

### ember

```javascript
// Ember
import Ember from 'ember';
```

### ember-application

```javascript
// Ember.Application
import Application from 'ember-application';
```

### ember-array

```javascript
// Ember.Array
import Array from 'ember-array';
```

### ember-array/mutable

```javascript
// Ember.MutableArray
import MutableArray from 'ember-array/mutable';
```

### ember-array/utils

```javascript
import { A, isEmberArray, wrap } from 'ember-array/utils';
```

Named exports of `ember-array/utils`

- `A` Ember.A
- `isEmberArray` Ember.isArray
- `wrap` Ember.makeArray

### ember-component

```javascript
// Ember.Component
import Component from 'ember-component';
```

### ember-components/checkbox

```javascript
// Ember.Checkbox
import Checkbox from 'ember-components/checkbox';
```

### ember-components/text-area

```javascript
// Ember.TextArea
import TextArea from 'ember-components/text-area';
```

### ember-components/text-field

```javascript
// Ember.TextField
import TextField from 'ember-components/text-field';
```

### ember-computed

```javascript
// Ember.computed
import computed from 'ember-computed';
import { alias, and, bool, collect, deprecatingAlias, empty, equal, filter, filterBy, filterProperty, gt, gte, intersect, lt, lte, map, mapBy, mapProperty, match, max, min, none, not, notEmpty, oneWay, or, readOnly, reads, setDiff, sort, sum, union, uniq } from 'ember-computed';
```

Named exports of `ember-computed`

- `alias` Ember.computed.alias
- `and` Ember.computed.and
- `bool` Ember.computed.bool
- `collect` Ember.computed.collect
- `deprecatingAlias` Ember.computed.deprecatingAlias
- `empty` Ember.computed.empty
- `equal` Ember.computed.equal
- `filter` Ember.computed.filter
- `filterBy` Ember.computed.filterBy
- `filterProperty` Ember.computed.filterProperty
- `gt` Ember.computed.gt
- `gte` Ember.computed.gte
- `intersect` Ember.computed.intersect
- `lt` Ember.computed.lt
- `lte` Ember.computed.lte
- `map` Ember.computed.map
- `mapBy` Ember.computed.mapBy
- `mapProperty` Ember.computed.mapProperty
- `match` Ember.computed.match
- `max` Ember.computed.max
- `min` Ember.computed.min
- `none` Ember.computed.none
- `not` Ember.computed.not
- `notEmpty` Ember.computed.notEmpty
- `oneWay` Ember.computed.oneWay
- `or` Ember.computed.or
- `readOnly` Ember.computed.readOnly
- `reads` Ember.computed.reads
- `setDiff` Ember.computed.setDiff
- `sort` Ember.computed.sort
- `sum` Ember.computed.sum
- `union` Ember.computed.union
- `uniq` Ember.computed.uniq

### ember-controller

```javascript
// Ember.Controller
import Controller from 'ember-controller';
```

### ember-controller/inject

```javascript
// Ember.inject.controller
import controller from 'ember-controller/inject';
```

### ember-controller/proxy

```javascript
// Ember.ArrayProxy
import ArrayProxy from 'ember-controller/proxy';
```

### ember-controllers/sortable

```javascript
// Ember.SortableMixin
import SortableMixin from 'ember-controllers/sortable';
```

### ember-debug

```javascript
import { inspect, log, run, warn } from 'ember-debug';
```

Named exports of `ember-debug`

- `inspect` Ember.inspect
- `log` Ember.debug
- `run` Ember.runInDebug
- `warn` Ember.warn

### ember-debug/container-debug-adapter

```javascript
// Ember.ContainerDebugAdapter
import ContainerDebugAdapter from 'ember-debug/container-debug-adapter';
```

### ember-debug/data-adapter

```javascript
// Ember.DataAdapter
import DataAdapter from 'ember-debug/data-adapter';
```

### ember-deprecations

```javascript
import { deprecate, deprecateFunc } from 'ember-deprecations';
```

Named exports of `ember-deprecations`

- `deprecate` Ember.deprecate
- `deprecateFunc` Ember.deprecateFunc

### ember-enumerable

```javascript
// Ember.Enumerable
import Enumerable from 'ember-enumerable';
```

### ember-evented

```javascript
// Ember.Evented
import Evented from 'ember-evented';
```

### ember-evented/on

```javascript
// Ember.on
import on from 'ember-evented/on';
```

### ember-globals-resolver

```javascript
// Ember.DefaultResolver
import DefaultResolver from 'ember-globals-resolver';
```

### ember-helper

```javascript
// Ember.Helper
import Helper from 'ember-helper';
import { helper } from 'ember-helper';
```

Named exports of `ember-helper`

- `helper` 

### ember-instrumentation

```javascript
import { instrument, reset, subscribe, unsubscribe } from 'ember-instrumentation';
```

Named exports of `ember-instrumentation`

- `instrument` Ember.Instrumentation.instrument
- `reset` Ember.Instrumentation.reset
- `subscribe` Ember.Instrumentation.subscribe
- `unsubscribe` Ember.Instrumentation.unsubscribe

### ember-locations/hash

```javascript
// Ember.HashLocation
import HashLocation from 'ember-locations/hash';
```

### ember-locations/history

```javascript
// Ember.HistoryLocation
import HistoryLocation from 'ember-locations/history';
```

### ember-locations/none

```javascript
// Ember.NoneLocation
import NoneLocation from 'ember-locations/none';
```

### ember-map

```javascript
// Ember.Map
import Map from 'ember-map';
import { withDefault } from 'ember-map';
```

Named exports of `ember-map`

- `withDefault` Ember.MapWithDefault

### ember-metal/destroy

```javascript
// Ember.destroy
import destroy from 'ember-metal/destroy';
```

### ember-metal/events

```javascript
import { addListener, removeListener, send } from 'ember-metal/events';
```

Named exports of `ember-metal/events`

- `addListener` Ember.addListener
- `removeListener` Ember.removeListener
- `send` Ember.sendEvent

### ember-metal/get

```javascript
// Ember.get
import get from 'ember-metal/get';
import { getProperties } from 'ember-metal/get';
```

Named exports of `ember-metal/get`

- `getProperties` Ember.getProperties

### ember-metal/mixin

```javascript
// Ember.Mixin
import Mixin from 'ember-metal/mixin';
```

### ember-metal/observer

```javascript
// Ember.observer
import observer from 'ember-metal/observer';
import { addObserver, removeObserver } from 'ember-metal/observer';
```

Named exports of `ember-metal/observer`

- `addObserver` Ember.addObserver
- `removeObserver` Ember.removeObserver

### ember-metal/on-load

```javascript
// Ember.onLoad
import onLoad from 'ember-metal/on-load';
import { run } from 'ember-metal/on-load';
```

Named exports of `ember-metal/on-load`

- `run` Ember.runLoadHooks

### ember-metal/set

```javascript
// Ember.set
import set from 'ember-metal/set';
import { setProperties, trySet } from 'ember-metal/set';
```

Named exports of `ember-metal/set`

- `setProperties` Ember.setProperties
- `trySet` Ember.trySet

### ember-metal/utils

```javascript
import { aliasMethod, assert, cacheFor, copy, guidFor } from 'ember-metal/utils';
```

Named exports of `ember-metal/utils`

- `aliasMethod` Ember.aliasMethod
- `assert` Ember.assert
- `cacheFor` Ember.cacheFor
- `copy` Ember.copy
- `guidFor` Ember.guidFor

### ember-object

```javascript
// Ember.Object
import Object from 'ember-object';
```

### ember-owner/get

```javascript
// Ember.getOwner
import getOwner from 'ember-owner/get';
```

### ember-owner/set

```javascript
// Ember.setOwner
import setOwner from 'ember-owner/set';
```

### ember-platform

```javascript
import { assign, create, defineProperty, hasAccessors, keys } from 'ember-platform';
```

Named exports of `ember-platform`

- `assign` Ember.assign
- `create` Ember.create
- `defineProperty` Ember.platform.defineProperty
- `hasAccessors` Ember.platform.hasPropertyAccessors
- `keys` Ember.keys

### ember-route

```javascript
// Ember.Route
import Route from 'ember-route';
```

### ember-router

```javascript
// Ember.Router
import Router from 'ember-router';
```

### ember-runloop

```javascript
// Ember.run
import run from 'ember-runloop';
import { begin, bind, cancel, debounce, end, join, later, next, once, schedule, scheduleOnce, throttle } from 'ember-runloop';
```

Named exports of `ember-runloop`

- `begin` Ember.run.begin
- `bind` Ember.run.bind
- `cancel` Ember.run.cancel
- `debounce` Ember.run.debounce
- `end` Ember.run.end
- `join` Ember.run.join
- `later` Ember.run.later
- `next` Ember.run.next
- `once` Ember.run.once
- `schedule` Ember.run.schedule
- `scheduleOnce` Ember.run.scheduleOnce
- `throttle` Ember.run.throttle

### ember-service

```javascript
// Ember.Service
import Service from 'ember-service';
```

### ember-service/inject

```javascript
// Ember.inject.service
import service from 'ember-service/inject';
```

### ember-set/ordered

```javascript
// Ember.OrderedSet
import OrderedSet from 'ember-set/ordered';
```

### ember-string

```javascript
import { camelize, capitalize, classify, dasherize, decamelize, fmt, htmlSafe, loc, underscore, w } from 'ember-string';
```

Named exports of `ember-string`

- `camelize` Ember.String.camelize
- `capitalize` Ember.String.capitalize
- `classify` Ember.String.classify
- `dasherize` Ember.String.dasherize
- `decamelize` Ember.String.decamelize
- `fmt` Ember.String.fmt
- `htmlSafe` Ember.String.htmlSafe
- `loc` Ember.String.loc
- `underscore` Ember.String.underscore
- `w` Ember.String.w

### ember-test

```javascript
// Ember.Test
import Test from 'ember-test';
```

### ember-test/adapter

```javascript
// Ember.Test.Adapter
import Adapter from 'ember-test/adapter';
```

### ember-test/qunit-adapter

```javascript
// Ember.Test.QUnitAdapter
import QUnitAdapter from 'ember-test/qunit-adapter';
```

### ember-utils

```javascript
import { isBlank, isEmpty, isNone, isPresent, tryInvoke, typeOf } from 'ember-utils';
```

Named exports of `ember-utils`

- `isBlank` Ember.isBlank
- `isEmpty` Ember.isEmpty
- `isNone` Ember.isNone
- `isPresent` Ember.isPresent
- `tryInvoke` Ember.tryInvoke
- `typeOf` Ember.typeOf

### jquery

```javascript
// self.jQuery
import jQuery from 'jquery';
```

### rsvp

```javascript
// Ember.RSVP
import RSVP from 'rsvp';
```

<!--[end-apidocs]-->

License
-------

Ember CLI Shims is [MIT Licensed](https://github.com/stefanpenner/ember-cli-shims/blob/master/LICENSE.md).
