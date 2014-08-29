(function() {
  "use strict";
/* global define, Ember */
define('ember', [], function() {
  "use strict";

  return {
    'default': Ember
  };
});

define('ember/computed', [], function() {
  "use strict";

  var exports = {
    'default': Ember.computed
  };

  for (var key in Ember.computed) {
    exports[key] = Ember.computed[key];
  }

  return exports;
});


define('ember-data', [], function() {
  "use strict";

  return {
    'default': DS
  };
});

define('jquery', [], function() {
  "use strict";

  return {
    'default': jQuery
  };
});

})();
