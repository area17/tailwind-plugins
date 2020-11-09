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
        },
        ['.columns-container .cols-ml-reset']: {
          'margin-left': 0
        },
        ['.columns-container .cols-screen-ml-reset']: {
          'margin-left': 0
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
          },
          ['.columns-container .cols-ml-reset']: {
            'margin-left': 0
          },
          ['.columns-container .cols-screen-ml-reset']: {
            'margin-left': 0
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
      const colWidthScreen = getWidthCalc(bp, i, false, true);
      const colWidthContained = getWidthCalc(bp, i);
      const colWidthContainedScreen = getWidthCalc(bp, i, true, true);
      const colPush = `${colWidth} + ${innerGutters[bp]}`;
      const colPushScreen = `${colWidthScreen} + ${innerGutters[bp]}`;
      const colPushContained = `${colWidthContained} + (${innerGutters[bp]} * 2)`;
      const colPushContainedScreen = `${colWidthContained} + (${innerGutters[bp]} * 2)`;

      if (bp === firstBp) {
        col = {
          [`.cols-${i}`]: {
            width: `calc(${colWidth})`
          },
          [`.cols-screen-${i}`]: {
            width: `calc(${colWidth})`
          },
          [`.columns-container > .cols-${i}`]: {
            width: `calc(${colWidthContained})`
          },
          [`.columns-container > .cols-screen-${i}`]: {
            width: `calc(${colWidthContainedScreen})`
          },
          [`.push-${i}`]: {
            'margin-left': `calc(${colPush})`
          },
          [`.columns-container > .push-${i}`]: {
            'margin-left': `calc(${colPushContained})`
          },
          [`.columns-container > .push-screen-${i}`]: {
            'margin-left': `calc(${colPushContainedScreen})`
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
      const colWidthScreen = getWidthCalc(bp, i, false, true);
      const colWidthContained = getWidthCalc(bp, i);
      const colWidthContainedScreen = getWidthCalc(bp, i, false, true);
      const colPush = `${colWidth} + ${innerGutters[bp]}`;
      const colPushScreen = `${colWidthScreen} + ${innerGutters[bp]}`;
      const colPushContained = `${colWidthContained} + (${innerGutters[bp]} * 2)`;
      const colPushContainedScreen = `${colWidthContainedScreen} + (${innerGutters[bp]} * 2)`;
      let inheritStyles = {};

      // loop over any following breakpoints and add the width calcs so that it can inherit styles
      // Commented out for now. need to test how much bloat it adds to the css
      breakpoints.forEach((inheritBp) => {
        let styles = {};
        const inheritBpIndex = breakpoints.indexOf(inheritBp);
        if (inheritBpIndex > bpIndex) {
          const inheritColWidth = getWidthCalc(inheritBp, i, false);
          const inheritColWidthScreen = getWidthCalc(inheritBp, i, false, true);
          const inheritColWidthContained = getWidthCalc(inheritBp, i);
          const inheritColWidthContainedScreen = getWidthCalc(
            inheritBp,
            i,
            false,
            true
          );
          const inheritColPush = `${inheritColWidth} + ${innerGutters[inheritBp]}`;
          const inheritColPushScreen = `${inheritColWidthScreen} + ${innerGutters[inheritBp]}`;
          const inheritColPushContained = `${inheritColWidthContained} + (${innerGutters[inheritBp]} * 2)`;
          const inheritColPushContainedScreen = `${inheritColWidthContainedScreen} + (${innerGutters[inheritBp]} * 2)`;

          styles = {
            [`@screen ${inheritBp}`]: {
              [`.${bp}\\:cols-${i}`]: {
                width: `calc(${inheritColWidth})`
              },
              [`.columns-container > .${bp}\\:cols-${i}`]: {
                width: `calc(${inheritColWidthContained})`
              },
              [`.${bp}\\:cols-screen-${i}`]: {
                width: `calc(${inheritColWidthScreen})`
              },
              [`.columns-container > .${bp}\\:cols-screen-${i}`]: {
                width: `calc(${inheritColWidthContainedScreen})`
              },
              [`.${bp}\\:push-${i}`]: {
                'margin-left': `calc(${inheritColPush})`
              },
              [`.columns-container > .${bp}\\:push-${i}`]: {
                'margin-left': `calc(${inheritColPushContained})`
              },
              [`.${bp}\\:push-screen-${i}`]: {
                'margin-left': `calc(${inheritColPushScreen})`
              },
              [`.columns-container > .${bp}\\:push-screen-${i}`]: {
                'margin-left': `calc(${inheritColPushContainedScreen})`
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
          [`.${bp}\\:cols-screen-${i}`]: {
            width: `calc(${colWidthScreen})`
          },
          [`.columns-container > .${bp}\\:cols-screen-${i}`]: {
            width: `calc(${colWidthContainedScreen})`
          },
          [`.${bp}\\:push-${i}`]: {
            'margin-left': `calc(${colPush})`
          },
          [`.columns-container > .${bp}\\:push-${i}`]: {
            'margin-left': `calc(${colPushContained})`
          },
          [`.${bp}\\:push-screen-${i}`]: {
            'margin-left': `calc(${colPushScreen})`
          },
          [`.columns-container > .${bp}\\:push-screen-${i}`]: {
            'margin-left': `calc(${colPushContainedScreen})`
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
        },
        [`.push-screen-0`]: {
          'margin-left': 0
        },
        [`.columns-container > .push-screen-0`]: {
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
        },
        [`@screen ${bp}`]: {
          [`.push-screen-0, .${bp}\\:push-screen-0`]: {
            'margin-left': 0
          },
          [`.columns-container > .push-screen-0, .columns-container > .${bp}\\:push-screen-0`]: {
            'margin-left': innerGutters[bp]
          }
        }
      };
    }

    styles.push(pushReset);

    return styles;
  });

  addComponents([...containerStyles, ...columnDefaultStyles, ...columnStyles]);

  function getWidthCalc(bp, cols, inContainer = true, inScreen = false) {
    const maxCols = columnCount[bp];
    const innerGutter = innerGutters[bp];
    const containerBump = inContainer ? innerGutter : `0px`;
    const baseWidth = inScreen ? '100vw' : '100%';
    let colWidth = `(${baseWidth} - ((${maxCols -
      1} * ${innerGutter} + ${containerBump}))) / ${maxCols} * ${cols}`;

    if (cols >= 1) {
      colWidth = `${colWidth} + (${cols - 1} * ${innerGutter} )`;
    }

    if (cols === maxCols) {
      colWidth = `${baseWidth} - ${containerBump}`;
    }

    return colWidth;
  }
};
