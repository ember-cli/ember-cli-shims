/* eslint-env node */
'use strict';

module.exports = {
  name: 'ember-cli-shims',

  included(app) {
    this._super.included.apply(this, arguments);

    let VersionChecker = require('ember-cli-version-checker');
    let checker = new VersionChecker(this);

    // specifically *not* trying to use `checker.forEmber` because
    // we actually want to see if this is from npm for specific versions
    let dep = checker.for('ember-source', 'npm');

    let emberSourceIncludesLegacyShims = dep.gt('2.11.0-alpha.0') && dep.lt('2.11.0');

    // ember-source@2.11.0-alpha and 2.11.0-beta series releases included
    // their own legacy shims system, so this import is not needed with
    // those ember-source versions
    if (!emberSourceIncludesLegacyShims) {
      let assetPath = 'vendor/ember-cli-shims/app-shims.js';
      if (this.import) {
        this.import(assetPath);
      } else {
        app.import(assetPath);
      }
    }
  }
};
