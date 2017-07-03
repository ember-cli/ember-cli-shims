import require from 'require';
import { module, test } from 'qunit';

module('shims generally work');

test('ember shim', function(assert) {
  assert.equal(self.Ember, require('ember').default);
});

test('ember-component', function(assert) {
  assert.equal(self.Ember.Component, require('ember-component').default);
});

test('API', function(assert) {
  assert.equal(self.Ember, require('ember').default);
  assert.equal(self.Ember.Application, require('ember-application').default);

  assert.equal(self.Ember.Array, require('ember-array').default);
  assert.equal(self.Ember.assign || self.Ember.merge, require('ember-platform').default.assign);
});
