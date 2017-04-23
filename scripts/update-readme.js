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
### <%= key -%> 
\`\`\`javascript 
<%if (Object.keys(shims[key]).includes('default')) { -%>
// <%= shims[key]['default'] -%>
import <%= shims[key]['default'].split(\'.\')[shims[key]['default'].split('.').length-1] -%> from \`<%= key -%>\`;<% } -%>
<%if (Object.keys(shims[key]).filter(item => item !== 'default').length > 0) { -%>
import { <%= Object.keys(shims[key]).filter(item => item !== 'default').join(\', \') -%> } from \`<%= key -%>\`;<%= -%>
<% } %>
\`\`\`
<%if (Object.keys(shims[key]).filter(item => item !== 'default').length > 0) { -%>
Named exports of \`<%= key -%>\`
<% Object.keys(shims[key]).filter(item => item !== 'default').map((exportName) => { -%>
<%if (shims[key][exportName]) { -%>
- \`<%= shims[key][exportName].split(\'.\')[shims[key][exportName].split('.').length-1] -%>\` <%= shims[key][exportName] %>
<% } -%>
<% }); -%>
<% } -%>
<% }); -%>`;

const renderedShims = ejs.render(template, {
  shims: listEmberCliShims(),
});

// @TODO Insert `renderedShims` into README between `<!--[begin-apidocs]-->` and `<!--[end-apidocs]-->`,
// replacing existing content.
console.log(renderedShims);


// generate md file
const filepath = 'cheatsheet.md';
const fs = require('fs');
fs.openSync(filepath, 'w');
fs.writeFile(filepath, renderedShims, function(err) {
  if (err) {
    return console.log(err);
  }
  console.log('The file was saved!');
});
