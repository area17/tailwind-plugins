const _ = require('lodash');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');

module.exports = (plugin, config) => {
  return postcss(
    tailwindcss(
      _.merge(
        {
          corePlugins: false,
          plugins: [plugin]
        },
        config
      )
    )
  )
    .process('@tailwind components', {
      from: undefined
    })
    .then((result) => {
      return result.css;
    });
};
