require('dotenv').config();

module.exports = function ({ addBase, theme }) {
  const breakpoints = theme('screens');
  const mainColWidths = theme('mainColWidths', {});
  const outerGutters = theme('outerGutters', {});
  const innerGutters = theme('innerGutters', {});
  const columnCount = theme('columnCount', {});
  const firstBp = Object.keys(breakpoints)[0];
  const rootVariables = [];

  Object.keys(breakpoints).forEach((bp) => {
    let styles = {
      ':root': {
        '--breakpoint': `${JSON.stringify(bp + '')}`,
        '--container-width': parseInt(mainColWidths[bp], 10)
          ? mainColWidths[bp]
          : 'unset',
        '--inner-gutter': innerGutters[bp],
        '--outer-gutter': outerGutters[bp],
        '--grid-columns': `${columnCount[bp]}`,
      },
    };

    if (bp === firstBp) {
      styles[':root'] = {
        ...styles[':root'],
        '--env': `${JSON.stringify(
          (process.env.ENV || process.env.APP_ENV || 'dev') + ''
        )}`,
        '--grid-column-bg': 'rgba(127, 255, 255, 0.25)',
      };
      rootVariables.push({
        ...styles,
      });
    } else {
      rootVariables.push({
        [`@screen ${bp}`]: {
          ...styles,
        },
      });
    }
  });

  addBase(rootVariables);
};
