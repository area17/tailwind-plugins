const _ = require('lodash');
const getFirstBp = require('../util/getFirstBp');

module.exports = function({ addComponents, theme }) {
  const widths = theme('mainColWidths', {});
  const outerGutters = theme('outerGutters', {});
  const className = '.container';
  const firstBp = getFirstBp(theme);
  let prevGutter = -1;
  let prevWidth = -1;

  const containerStyles = _.map(widths, (width, bp) => {
    let styles = {};
    let gutter = outerGutters[bp];

    if (prevWidth === width && prevGutter === gutter) {
      return;
    }

    prevGutter = gutter;
    prevWidth = width;

    if (width === 'auto' || width === 'fluid') {
      styles = {
        width: `calc(100% - (${gutter} * 2))`
      };
    } else {
      styles = {
        width: width
      };
    }

    if (bp === firstBp) {
      return {
        [className]: {
          ...styles,
          'margin-right': 'auto',
          'margin-left': 'auto'
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
      width: 'auto'
    }
  };

  containerStyles.push(nestedContainer);

  addComponents(containerStyles);
};
