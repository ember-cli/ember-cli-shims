const ejs = require('ejs');
const { readFileSync, openSync, writeFileSync } = require('fs');
const { join } = require('path');

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

// @TODO Sort shims before pushing into template
const template = `
Shims provided by this addon
----------------------------

<% Object.keys(shims).map((key) => { -%>
### <%= key %>
\`\`\`javascript <%if (Object.keys(shims[key]).includes('default')) { %>
// <%= shims[key]['default'] %>
import <%= shims[key]['default'].split(\'.\')[shims[key]['default'].split('.').length-1] %> from \`<%= key %>\`;<% } %>
<%if (Object.keys(shims[key]).filter(item => item !== 'default').length > 0) { %>import { <%= Object.keys(shims[key]).filter(item => item !== 'default').join(\', \') %> } from \`<%= key %>\`;
<% } %>\`\`\`
<%_ if (Object.keys(shims[key]).filter(item => item !== 'default').length > 0) { %>
Named exports of \`<%= key %>\`

<% Object.keys(shims[key]).filter(item => item !== 'default').map((exportName) => { -%> <%if (shims[key][exportName]) { %>
- \`<%= shims[key][exportName].split(\'.\')[shims[key][exportName].split('.').length-1] %>\` <%= shims[key][exportName] %>
      <%_ } -%>
    <%_ }); -%>
  <%_ } -%>

<% }); -%>`;

const renderedShims = ejs.render(template, {
  shims: listEmberCliShims(),
});


// Update README.md
try {
  const filepath = join(__dirname, '..', 'README.md');
  const readme = readFileSync(filepath, { encoding: 'utf-8' }).toString();
  const [before, resplit] = readme.split('<!--[begin-apidocs]-->');
  const [, after] = resplit.split('<!--[end-apidocs]-->');

  const reconstructedReadme = [
    before,
    '<!--[begin-apidocs]-->\n',
    renderedShims,
    '<!--[end-apidocs]-->',
    after,
  ].join('');

  openSync(filepath, 'w');
  writeFileSync(filepath, reconstructedReadme, { encoding: 'utf-8' });
} catch (err) {
  console.error('Error updating README.md', err);
}
