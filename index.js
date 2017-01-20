/* eslint-env node */
'use strict';

module.exports = {
  name: 'ember-cli-shims',

  included(app) {
    this._super.included.apply(this, arguments);

    let assetPath = 'vendor/ember-cli-shims/app-shims.js';
    if (this.import) {
      this.import(assetPath);
    } else {
      app.import(assetPath);
    }
  }
};
