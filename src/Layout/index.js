const _ = require('lodash');
const getFirstBp = require('../util/getFirstBp');

// TODO:
// - automatically set column widths to 100%
// - Add styles so that layouts can be inheritted across breakpoints
// - Split prefixed and non-prefixed cols classes to prevent non-prefixed classes overriding

module.exports = function({ addComponents, theme }) {
  const innerGutters = theme('innerGutters', {});
  const columnCount = theme('columnCount', {});
  const className = '.columns-container';
  const firstBp = getFirstBp(theme);
  const breakpoints = Object.keys(columnCount);

  const containerStyles = _.map(innerGutters, (gutter, bp) => {
    if (bp === firstBp) {
      return {
        [className]: {
          display: 'flex',
          'flex-flow': 'row wrap',
          'margin-left': `-${gutter}`
        },
        ['.columns-container [class*="cols-"]']: {
          'margin-left': gutter
        }
      };
    } else {
      return {
        [`@screen ${bp}`]: {
          [className]: {
            'margin-left': `-${gutter}`
          },
          ['.columns-container [class*="cols-"]']: {
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
      const colWidth = getWidthCalc(bp, i, false);
      const colWidthContained = getWidthCalc(bp, i);
      const colPush = `${colWidth} + ${innerGutters[bp]}`;
      const colPushContained = `${colWidthContained} + (${innerGutters[bp]} * 2)`;

      if (bp === firstBp) {
        col = {
          [`.cols-${i}`]: {
            width: `calc(${colWidth})`
          },
          [`.columns-container > .cols-${i}`]: {
            width: `calc(${colWidthContained})`
          },
          [`.push-${i}`]: {
            'margin-left': `calc(${colPush})`
          },
          [`.columns-container > .push-${i}`]: {
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
          [`.columns-container > .cols-${i}`]: {
            width: `calc(${colWidthContained})`
          },
          [`.push-${i}`]: {
            'margin-left': `calc(${colPush})`
          },
          [`.columns-container > .push-${i}`]: {
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
    const bpIndex = breakpoints.indexOf(bp);

    for (let i = 1; i <= maxCols; i++) {
      let col = {};
      const colWidth = getWidthCalc(bp, i, false);
      const colWidthContained = getWidthCalc(bp, i);
      const colPush = `${colWidth} + ${innerGutters[bp]}`;
      const colPushContained = `${colWidthContained} + (${innerGutters[bp]} * 2)`;
      let inheritStyles = {};

      // loop over any following breakpoints and add the width calcs so that it can inherit styles
      // Commented out for now. need to test how much bloat it adds to the css
      breakpoints.forEach((inheritBp) => {
        let styles = {};
        const inheritBpIndex = breakpoints.indexOf(inheritBp);
        if (inheritBpIndex > bpIndex) {
          const inheritColWidth = getWidthCalc(inheritBp, i, false);
          const inheritColWidthContained = getWidthCalc(inheritBp, i);
          const inheritColPush = `${inheritColWidth} + ${innerGutters[inheritBp]}`;
          const inheritColPushContained = `${inheritColWidthContained} + (${innerGutters[inheritBp]} * 2)`;

          styles = {
            [`@screen ${inheritBp}`]: {
              [`.${bp}\\:cols-${i}`]: {
                width: `calc(${inheritColWidth})`
              },
              [`.columns-container > .${bp}\\:cols-${i}`]: {
                width: `calc(${inheritColWidthContained})`
              },
              [`.${bp}\\:push-${i}`]: {
                'margin-left': `calc(${inheritColPush})`
              },
              [`.columns-container > .${bp}\\:push-${i}`]: {
                'margin-left': `calc(${inheritColPushContained})`
              }
            }
          };
        }

        inheritStyles = {
          ...inheritStyles,
          ...styles
        };
      });

      col = {
        ...col,
        [`@screen ${bp}`]: {
          [`.${bp}\\:cols-${i}`]: {
            width: `calc(${colWidth})`
          },
          [`.columns-container > .${bp}\\:cols-${i}`]: {
            width: `calc(${colWidthContained})`
          },
          [`.${bp}\\:push-${i}`]: {
            'margin-left': `calc(${colPush})`
          },
          [`.columns-container > .${bp}\\:push-${i}`]: {
            'margin-left': `calc(${colPushContained})`
          }
        },
        ...inheritStyles
      };

      styles.push(col);
    }

    // add push reset styles to end
    let pushReset = {};

    if (bp === firstBp) {
      pushReset = {
        [`.push-0`]: {
          'margin-left': 0
        },
        [`.columns-container > .push-0`]: {
          'margin-left': innerGutters[bp]
        }
      };
    } else {
      pushReset = {
        [`@screen ${bp}`]: {
          [`.push-0, .${bp}\\:push-0`]: {
            'margin-left': 0
          },
          [`.columns-container > .push-0, .columns-container > .${bp}\\:push-0`]: {
            'margin-left': innerGutters[bp]
          }
        }
      };
    }

    styles.push(pushReset);

    return styles;
  });

  addComponents([...containerStyles, ...columnDefaultStyles, ...columnStyles]);

  function getWidthCalc(bp, cols, inContainer = true) {
    const maxCols = columnCount[bp];
    const innerGutter = innerGutters[bp];
    const containerBump = inContainer ? innerGutter : `0px`;

    let colWidth = `(100% - ((${maxCols -
      1} * ${innerGutter} + ${containerBump}))) / ${maxCols} * ${cols}`;

    if (cols >= 1) {
      colWidth = `${colWidth} + (${cols - 1} * ${innerGutter} )`;
    }

    if (cols === maxCols) {
      colWidth = `100% - ${containerBump}`;
    }

    return colWidth;
  }
};
