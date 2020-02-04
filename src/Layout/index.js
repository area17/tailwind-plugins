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
        // ['[class*="cols-"]:not(.cols-container):not([class*="push"])']: {
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
          },
          [`.push-0, .${bp}\\:push-0`]: {
            'margin-left': 0
          },
          [`.cols-container .push-0, .cols-container .${bp}\\:push-0`]: {
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
      const colPush = `${colWidth} + ${innerGutters[bp]}`;
      const colPushContained = `${colWidth} + (${innerGutters[bp]} * 2)`;

      if (bp === firstBp) {
        col = {
          [`.cols-${i}`]: {
            width: `calc(${colWidth})`
          },
          [`.push-${i}`]: {
            'margin-left': `calc(${colPush})`
          },
          [`.cols-container .push-${i}`]: {
            'margin-left': `calc(${colPushContained})`
          }
        };
      }

      col = {
        ...col,
        [`@screen ${bp}`]: {
          [`.cols-${i}, .${bp}\\:cols-${i}`]: {
            width: `calc(${colWidth})`
          },
          [`.push-${i}, .${bp}\\:push-${i}`]: {
            'margin-left': `calc(${colPush})`
          },
          [`.cols-container .push-${i}, .cols-container .${bp}\\:push-${i}`]: {
            'margin-left': `calc(${colPushContained})`
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

    // add push reset styles to end
    let pushReset = {};

    if (bp === firstBp) {
      pushReset = {
        [`.push-0`]: {
          'margin-left': 0
        },
        [`.cols-container .push-0`]: {
          'margin-left': innerGutters[bp]
        }
      };
    } else {
      pushReset = {
        [`@screen ${bp}`]: {
          [`.push-0, .${bp}\\:push-0`]: {
            'margin-left': 0
          },
          [`.cols-container .push-0, .cols-container .${bp}\\:push-0`]: {
            'margin-left': innerGutters[bp]
          }
        }
      };
    }

    styles.push(pushReset);

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
