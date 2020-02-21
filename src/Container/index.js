const _ = require('lodash');
const getFirstBp = require('../util/getFirstBp');

module.exports = function({ addComponents, theme }) {
  const widths = theme('mainColWidths', {});
  const outerGutters = theme('outerGutters', {});
  const className = '.container';
  const firstBp = getFirstBp(theme);

  const containerStyles = _.map(widths, (width, bp) => {
    let styles = {};

    if (widths[bp] === 'fluid') {
      styles = {
        width: `calc(100vw - (${outerGutters[bp]} * 2))`
      };
    } else {
      styles = {
        width: widths[bp],
        'padding-right': 0,
        'padding-left': 0
      };
    }

    if (bp === firstBp) {
      return {
        [className]: {
          'margin-right': 'auto',
          'margin-left': 'auto',
          ...styles
        }
      };
    } else {
      return {
        [`@screen ${bp}`]: {
          [className]: {
            ...styles
          }
        }
      };
    }
  });

  const nestedContainer = {
    [`${className} ${className}`]: {
      width: 'auto',
      'padding-right': 0,
      'padding-left': 0
    }
  };

  containerStyles.push(nestedContainer);

  addComponents(containerStyles);
};
