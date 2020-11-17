require('dotenv').config();
const getFirstBp = require('../util/getFirstBp');

module.exports = function({ addBase, theme }) {
  const breakpoints = theme('screens');
  const mainColWidths = theme('mainColWidths', {});
  const outerGutters = theme('outerGutters', {});
  const innerGutters = theme('innerGutters', {});
  const columnCount = theme('columnCount', {});
  const firstBp = getFirstBp(theme);
  const rootVariables = [];

  Object.keys(breakpoints).forEach(bp => {
    let styles = {
      ':root': {
        '--breakpoint': `${JSON.stringify(bp + "")}`,
        '--env': `${JSON.stringify((process.env.ENV || process.env.APP_ENV || 'dev') + "")}`,
        '--container-width': mainColWidths[bp],
        '--inner-gutter': innerGutters[bp],
        '--outer-gutter': outerGutters[bp],
        '--grid-columns': `${ columnCount[bp] }`,
        '--grid-column-bg': 'rgba(127, 255, 255, 0.25)'
      }
    };

    if (bp === firstBp) {
      rootVariables.push(styles);
    } else {
      rootVariables.push({
        [`@screen ${bp}`]: {
          ...styles
        }
      });
    }
  });

  addBase(rootVariables);

  addBase({
    '.dev-tools': {
      'position': 'fixed',
      'z-index': '9999999999',
      'left': '0',
      'bottom': '0',
      'font-size': '0',
    },
    '.dev-tools::before': {
      'content': 'var(--breakpoint) " • " var(--env)',
      'position': 'absolute',
      'z-index': '2',
      'left': '0',
      'bottom': '100%',
      'padding': '4px 5px',
      'background': 'green',
      'color': 'white',
      'font': '12px/1 sans-serif',
      'white-space': 'nowrap',
      'pointer-events': 'none',
    },
    '.dev-tools-toggle': {
      'position': 'relative',
      'z-index': '2',
      'width': '30px',
      'height': '30px',
      'border': '0',
      'background': 'black',
      'color': 'transparent',
      'font': '0/0 a',
      'appearance': 'none',
      'cursor': 'pointer',
    },
    '.dev-tools-toggle::before, .dev-tools-toggle::after': {
      'content': `''`,
      'position': 'absolute',
      'left': '8px',
      'top': '10px',
      'width': '5px',
      'height': '10px',
      'border-left': '1px solid white',
      'border-right': '1px solid white',
    },
    '.dev-tools-toggle::after': {
      'left': '16px',
    },
    '.dev-tools-grid': {
      'position': 'fixed',
      'z-index': '1',
      'left': '0',
      'right': '0',
      'top': '0',
      'bottom': '0',
      'width': 'var(--container-width)',
      'height': '100%',
      'margin': '0 var(--outer-gutter)',
      'background': `repeating-linear-gradient(
        90deg,
        var(--grid-column-bg),
        var(--grid-column-bg) calc((100% - (((var(--grid-columns) - 1) * var(--inner-gutter)))) / var(--grid-columns)),
        rgba(0,0,0,0) calc((100% - (((var(--grid-columns) - 1) * var(--inner-gutter)))) / var(--grid-columns)),
        rgba(0,0,0,0) calc((100% - (((var(--grid-columns) - 1) * var(--inner-gutter)))) / var(--grid-columns) + var(--inner-gutter))
      )`,
      'pointer-events': 'none',
    }
  });
};
