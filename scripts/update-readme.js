const ejs = require('ejs');

function handlerFactory(path = '') {
  return {
    get(target, name) {
      return name in target? target[name] : `${path}.${name.toString()}`;
    },
  }
}

const obj = {};

function listEmberCliShims() {
  global.Ember = new Proxy([
    'inject',
    'Instrumentation',
    'platform',
    'run',
    'String',
    'computed',
    'Test',
  ].reduce((acc, key) => {
    acc[key] = new Proxy({ _key: `Ember.${key}` }, handlerFactory(`Ember.${key}`));

    return acc;
  }, { _key: 'Ember' }), handlerFactory('Ember'));

  const defined = {};

  global.define = (name, [], cb) => {
    const val = cb();

    if (val.default && val.default._key) {
      val.default = val.default._key;
    }

    defined[name] = val;
  };

  global.self = {
    jQuery: 'self.jQuery',
  };

  require('../vendor/ember-cli-shims/app-shims');

  return defined;
}

// @TODO Sort shims, find better template
const template = `
Shims provided by this addon
----------------------------

<% Object.keys(shims).map((key) => { -%>
### \`<%= key %>\`

<% Object.keys(shims[key]).map((exportName) => { -%>
- \`<%= exportName %>\` <%= shims[key][exportName] %>
<% }); -%>

<% }); -%>
`;

const renderedShims = ejs.render(template, {
  shims: listEmberCliShims(),
});

// @TODO Insert `renderedShims` into README between `<!--[begin-apidocs]-->` and `<!--[end-apidocs]-->`,
// replacing existing content.
console.log(renderedShims);
