const _ = require('lodash');
const getFirstBp = require('../util/getFirstBp');

module.exports = function({ addComponents, theme }) {
  const spacingGroups = theme('spacingGroups', {});
  const prefixes = theme('spacingGroupProperties', {
    mt: 'margin-top',
    pt: 'padding-top'
  });
  const firstBp = getFirstBp(theme);
  let spacingStyles = [];

  _.forEach(prefixes, (property, prefix) => {
    _.forEach(spacingGroups, (group, name) => {
      const className = `.${prefix}-${name}`;

      _.forEach(group, (value, bp) => {
        if (bp === firstBp) {
          spacingStyles.push({
            [className]: {
              [property]: value
            }
          });
        } else {
          spacingStyles.push({
            [`@screen ${bp}`]: {
              [className]: {
                [property]: value
              }
            }
          });
        }
      });
    });
  });

  addComponents(spacingStyles);
};
