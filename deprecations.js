'use strict';

const mappings = require('ember-rfc176-data/mappings.json');

const deprecations = {};

mappings.filter(it => it.deprecated && it.replacement).filter(it => it.module.indexOf('ember-') === 0).forEach(it => {
  if (!(it.module in deprecations)) {
    deprecations[it.module] = {};
  }

  let replacement = [it.replacement.module];
  if (it.replacement.export !== 'default') {
    replacement.push(it.replacement.export);
  }

  deprecations[it.module][it.export] = replacement;
});

module.exports = deprecations;
