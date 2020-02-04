const _ = require('lodash');
const getFirstBp = require('../util/getFirstBp');

// TODO:
// - Add styles so that layouts can be inheritted across breakpoints

module.exports = function({ addComponents, theme }) {
  const innerGutters = theme('innerGutters', {});
  const columnCount = theme('columnCount', {});
  const className = '.cols-container';
  const firstBp = getFirstBp(theme);
  // const breakpoints = Object.keys(columnCount);

  const containerStyles = _.map(innerGutters, (gutter, bp) => {
    if (bp === firstBp) {
      return {
        [className]: {
          display: 'flex',
          'flex-flow': 'row wrap'
        },
        ['[class*="cols-"]:not(.cols-container)']: {
          'margin-left': gutter
        }
      };
    } else {
      return {
        [`@screen ${bp}`]: {
          [className]: {
            'margin-left': `-${gutter}`
          },
          ['[class*="cols-"]:not(.cols-container)']: {
            'margin-left': gutter
          }
        }
      };
    }
  });

  const columnStyles = _.map(columnCount, (maxCols, bp) => {
    const styles = [];
    // const bpIndex = breakpoints.indexOf(bp);

    for (let i = 1; i <= maxCols; i++) {
      let col = {};
      const colWidth = getWidthCalc(bp, i);

      if (bp === firstBp) {
        col = {
          [`.cols-${i}`]: {
            width: `calc(${colWidth})`
          }
        };
      }

      col = {
        ...col,
        [`@screen ${bp}`]: {
          [`.${bp}\\:cols-${i}`]: {
            width: `calc(${colWidth})`
          }
        }
      };

      // loop over any following breakpoints and add the width calcs so that it can inherit styles
      // Commented out for now. need to test how much bloat it adds to the css
      // const inheritStyles = _.map(columnCount, (inheritMaxCols, inheritBp) => {
      //   const inheritBpIndex = breakpoints.indexOf(inheritBp);
      //   if (inheritBpIndex > bpIndex) {
      //   }
      //   // compare to index of in-loop breakpoint
      //   // do whatever
      // });

      styles.push(col);
    }

    return styles;
  });

  addComponents(containerStyles);
  addComponents(columnStyles);

  function getWidthCalc(bp, cols) {
    const maxCols = columnCount[bp];
    const innerGutter = innerGutters[bp];

    let colWidth = `(100% - ((${maxCols -
      1} * ${innerGutter}) + ${innerGutter})) / ${maxCols} * ${cols}`;

    if (cols >= 1) {
      colWidth = `${colWidth} + (${cols - 1} * ${innerGutter} )`;
    }

    if (cols === maxCols) {
      colWidth = `100% - ${innerGutter}`;
    }

    return colWidth;
  }
};
