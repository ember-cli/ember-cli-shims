import require from 'require';
import { module, test } from 'qunit';

module('shims generally work');

test('ember shim', function(assert) {
  assert.equal(self.Ember, require('ember').default);
});

test('ember-component', function(assert) {
  assert.equal(self.Ember.Component, require('ember-component').default);
})
