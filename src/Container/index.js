const _ = require('lodash');

module.exports = function({ addComponents, theme }) {
  const screens = theme('screens', {});
  const widths = theme('main-col-widths', {});
  const outerGutters = theme('outer-gutters', {});
  const className = '.container';

  const containerStyles = _.map(screens, (width, bp) => {
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

    if (bp === 'xs') {
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

  addComponents(containerStyles);
};
