import require from 'require';
import { module, test } from 'qunit';

module('shims generally work');

test('ember shim', function(assert) {
  assert.equal(self.Ember, require('ember').default);
});

test('ember-component', function(assert) {
  assert.equal(self.Ember.Component, require('ember-component').default);
});

test('ember-runloop', function(assert) {
  assert.equal(self.Ember.run.debounce, require('ember-runloop').debounce);
});

test('ember-helper', function(assert) {
  assert.equal(self.Ember.Helper, require('ember-helper').default);
});

test('ember-set/ordered', function(assert) {
  assert.equal(self.Ember.OrderedSet, require('ember-set/ordered').default);
});
