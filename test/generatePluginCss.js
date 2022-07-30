const _ = require('lodash');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');

module.exports = (plugin, config, { safelist = [] } = {}) => {
  const mergedConfig = _.merge(config, {
    // Decouple the tests from the docs source code
    content: [],
    // Support a per-test safelist config
    safelist: safelist,
    corePlugins: false,
    plugins: [plugin],
  });
  return postcss(tailwindcss(mergedConfig))
    .process('@tailwind base; @tailwind components; @tailwind utilities;', {
      from: undefined,
    })
    .then((result) => {
      return result.css;
    });
};
