const _ = require('lodash');
const getFirstBp = require('../util/getFirstBp');

module.exports = function({ addComponents, theme }) {
  const typography = theme('typography', {});
  const firstBp = getFirstBp(theme);

  const typoStyles = _.map(typography.sets, (typo, name) => {
    const className = `.f-${name}`;
    const fontFamily = typography.family[typo['font-family']] || 'inherit';

    return _.map(typo.settings, (settings, bp) => {
      if (bp === firstBp) {
        return {
          [className]: {
            'font-family': fontFamily,
            ...typo.settings[firstBp]
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
