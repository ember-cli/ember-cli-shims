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

  const defined = [];

  global.define = (name, [], cb) => {
    const val = cb();

    if (val.default && val.default._key) {
      val.default = val.default._key;
    }

    const defaultExport = val.default;
    delete val.default;

    const namedExports = Object.keys(val).map((key) => ({
      name: key,
      target: val[key],
    })).sort((a, b) => {
      a = a.name.toLowerCase();
      b = b.name.toLowerCase();

      return (a < b) ? -1 : (a > b) ? 1 : 0;
    });

    defined.push({
      name,
      defaultExport,
      namedExports,
    });
  };

  global.self = {
    jQuery: 'self.jQuery',
  };

  require('../vendor/ember-cli-shims/app-shims');

  return defined.sort((a, b) => {
    a = a.name.toLowerCase();
    b = b.name.toLowerCase();

    return (a < b) ? -1 : (a > b) ? 1 : 0;
  });
}

const template = `
Shims provided by this addon
----------------------------
<% shims.forEach(shim => { %>
### <%= shim.name %>

\`\`\`javascript
  <%_ if (shim.defaultExport) { -%>
// <%= shim.defaultExport %>
import <%= getLastSegment(shim.defaultExport) %> from '<%= shim.name %>';
  <%_ } -%>
  <%_ if (shim.namedExports.length > 0) { -%>
import { <%= shim.namedExports.map(exp => exp.name).join(', ') %> } from '<%= shim.name %>';
  <%_ } -%>
\`\`\`
  <%_ if (shim.namedExports.length > 0) { -%>

Named exports of \`<%= shim.name %>\`

    <%_ shim.namedExports.forEach(namedExport => { -%>
- \`<%= namedExport.name %>\` <%= namedExport.target %>
    <%_ }); -%>
  <%_ } -%>
<%_ }); -%>`;

const renderedShims = ejs.render(template, {
  shims: listEmberCliShims(),

  getLastSegment(str, split = '.') {
    if (!str) {
      return undefined;
    }

    const segments = str.split(split);

    return segments[segments.length - 1];
  },
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
    '\n<!--[end-apidocs]-->',
    after,
  ].join('');

  openSync(filepath, 'w');
  writeFileSync(filepath, reconstructedReadme, { encoding: 'utf-8' });
} catch (err) {
  console.error('Error updating README.md', err);
}
