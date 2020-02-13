const _ = require('lodash');
const getFirstBp = require('../util/getFirstBp');

// TODO:
// - automatically set column widths to 100%
// - Add styles so that layouts can be inheritted across breakpoints
// - Split prefixed and non-prefixed cols classes to prevent non-prefixed classes overriding

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
          'flex-flow': 'row wrap',
          'margin-left': `-${gutter}`
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
          }
        }
      };
    }
  });

  // Create non-prefixed cols classes before prefixed classes to prevent erroneous overriding
  const columnDefaultStyles = _.map(columnCount, (maxCols, bp) => {
    const styles = [];

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
          [`.cols-${i}`]: {
            width: `calc(${colWidth})`
          },
          [`.push-${i}`]: {
            'margin-left': `calc(${colPush})`
          },
          [`.cols-container .push-${i}`]: {
            'margin-left': `calc(${colPushContained})`
          }
        }
      };

      styles.push(col);
    }

    return styles;
  });

  const columnStyles = _.map(columnCount, (maxCols, bp) => {
    const styles = [];
    // const bpIndex = breakpoints.indexOf(bp);

    for (let i = 1; i <= maxCols; i++) {
      let col = {};
      const colWidth = getWidthCalc(bp, i);
      const colPush = `${colWidth} + ${innerGutters[bp]}`;
      const colPushContained = `${colWidth} + (${innerGutters[bp]} * 2)`;

      col = {
        ...col,
        [`@screen ${bp}`]: {
          [`.${bp}\\:cols-${i}`]: {
            width: `calc(${colWidth})`
          },
          [`.${bp}\\:push-${i}`]: {
            'margin-left': `calc(${colPush})`
          },
          [`.cols-container .${bp}\\:push-${i}`]: {
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

  addComponents([...containerStyles, ...columnDefaultStyles, ...columnStyles]);

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
