const _ = require('lodash');

module.exports = function({ addComponents, theme }) {
  const typography = theme('typography', {});

  const typoStyles = _.map(typography.sets, (typo, name) => {
    const className = `.f-${name}`;
    const fontFamily = typography.family[typo['font-family']] || 'inherit';

    return _.map(typo.settings, (settings, bp) => {
      if (bp === 'xs') {
        return {
          [className]: {
            'font-family': fontFamily,
            ...typo.settings.xs
          }
        };
      } else {
        return {
          [`@screen ${bp}`]: {
            [className]: {
              ...settings
            }
          }
        };
      }
    });
  });

  addComponents(typoStyles);
};
