const _ = require('lodash');
const getFirstBp = require('../util/getFirstBp');

// TODO:
// - Add options for customizing`prefixes`

module.exports = function({ addComponents, theme }) {
  const spacingGroups = theme('spacingGroups', {});
  const prefixes = { mt: 'margin-top', pt: 'padding-top' };
  const firstBp = getFirstBp(theme);

  const spacingStyles = _.map(prefixes, (property, prefix) => {
    return _.map(spacingGroups, (group, name) => {
      const className = `.${prefix}-${name}`;

      return _.map(group, (value, bp) => {
        if (bp === firstBp) {
          return {
            [className]: {
              [property]: value
            }
          };
        } else {
          return {
            [`@screen ${bp}`]: {
              [className]: {
                [property]: value
              }
            }
          };
        }
      });
    });
  });

  addComponents(...spacingStyles);
};
