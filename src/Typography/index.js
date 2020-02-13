const _ = require('lodash');
const getFirstBp = require('../util/getFirstBp');

module.exports = function({ addComponents, theme }) {
  const typography = theme('typography', {});
  const firstBp = getFirstBp(theme);

  const typoStyles = _.map(typography.sets, (typo, name) => {
    const className = `.f-${name}`;

    return _.map(typo.settings, (settings, bp) => {
      if (bp === firstBp) {
        return {
          [className]: {
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
