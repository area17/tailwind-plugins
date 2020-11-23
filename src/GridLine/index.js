const getFirstBp = require('../util/getFirstBp');

module.exports = function({ addComponents, theme }) {
  const breakpoints = theme('screens');
  const firstBp = getFirstBp(theme);
  const colors = theme('borderColor', theme('color', {}));
  const columnCount = theme('columnCount', {});
  const maxCols = theme('maxGridCols', columnCount);

  // set base
  const styles = [
    {
      '[class*="grid-line-"] > *': {
        'position': 'relative'
      },
      '[class*="grid-line-"] > *::before, [class*="grid-line-"] > *::after': {
        'content': 'attr(👻)',
        'position': 'absolute',
        'z-index': 0,
        'pointer-events': 'none'
      },
      '.grid-line-x > *::before': {
        'left': '0',
        'right': '0',
        'top': 'calc(var(--inner-gutter) / -2)',
        'bottom': 'calc(var(--inner-gutter) / -2 - 1px)',
        'border-top': '0 solid transparent',
        'border-bottom': '0 solid transparent'
      },
      '.grid-line-xfull > *::before': {
        'left': 'calc(var(--inner-gutter) / -2)',
        'right': 'calc(var(--inner-gutter) / -2 - 1px)',
        'top': 'calc(var(--inner-gutter) / -2)',
        'bottom': 'calc(var(--inner-gutter) / -2 - 1px)',
        'border-top': '0 solid transparent',
        'border-bottom': '0 solid transparent'
      },
      '.grid-line-y > *::after': {
        'left': 'calc(var(--inner-gutter) / -2)',
        'right': 'calc(var(--inner-gutter) / -2 - 1px)',
        'top': '0',
        'bottom': '0',
        'border-left': '0 solid transparent',
        'border-right': '0 solid transparent'
      },
      '.grid-line-yfull > *::after': {
        'left': 'calc(var(--inner-gutter) / -2)',
        'right': 'calc(var(--inner-gutter) / -2 - 1px)',
        'top': 'calc(var(--inner-gutter) / -1)',
        'bottom': '0',
        'border-left': '0 solid transparent',
        'border-right': '0 solid transparent'
      },
    }
  ];

  // set stroke colours
  Object.entries(colors).forEach(group => {
    const [name, color] = group;
    styles.push({
      [`.grid-line-x-${ name } > *::before`]: {
        'border-top-color': color,
        'border-bottom-color': color
      }
    });
    styles.push({
      [`.grid-line-y-${ name } > *::after`]: {
        'border-left-color': color,
        'border-right-color': color
      }
    });
    styles.push({
      [`.grid-line-xy-${ name } > *::before`]: {
        'border-top-color': color,
        'border-bottom-color': color
      }
    });
    styles.push({
      [`.grid-line-xy-${ name } > *::after`]: {
        'border-left-color': color,
        'border-right-color': color
      }
    });
  });

  // position strokes
  Object.entries(maxCols).forEach(group => {
    const [bp, cols] = group;
    const bpStyles = [];

    for (let i = 1; i <= cols; i++) {
      if (bp === firstBp) {
        // horizontal lines, reset
        bpStyles.push({
          [`.grid-cols-${ i }[class*="grid-line-x"] > *:nth-child(n)::before`]: {
            'border-top-width': '1px',
            'border-bottom-width': '1px'
          }
        });
        // horizontal first in row, fix left
        bpStyles.push({
          [`.grid-cols-${ i }[class*="grid-line-x"] > *:nth-child(${ i }n+1)::before`]: {
            'left': '0',
          }
        });
        // horizontal last in row, fix right
        bpStyles.push({
          [`.grid-cols-${ i }[class*="grid-line-x"] > *:nth-child(${ i }n+${ i })::before`]: {
            'right': '0'
          }
        });
        // horizontal first row, hide top border
        bpStyles.push({
          [`.grid-cols-${ i }[class*="grid-line-x"] > *:nth-child(-n+${ i })::before`]: {
            'border-top-width': '0'
          }
        });
        // horizontal last row, hide bottom border
        bpStyles.push({
          [`.grid-cols-${ i }[class*="grid-line-x"] > *:nth-child(${ i }n+1):nth-last-child(-n+${ i })::before, .grid-cols-${ i }[class*="grid-line-x"] > *:nth-child(${ i }n+1):nth-last-child(-n+${ i }) ~ li::before`] : {
            'border-bottom-width': '0'
          }
        });

        if (i > 1) {
          // vertical lines, reset
          bpStyles.push({
            [`.grid-cols-${ i }[class*="grid-line-y"] > *:nth-child(n)::after`]: {
              'border-left-width': '1px',
              'border-right-width': '1px'
            }
          });
          // vertical lines, hide first in row
          bpStyles.push({
            [`.grid-cols-${ i }[class*="grid-line-y"] > *:nth-child(${ i }n+1)::after`]: {
              'border-left-width': '0'
            }
          });
          // vertical last in row, fix right
          bpStyles.push({
            [`.grid-cols-${ i }[class*="grid-line-x"] > *:nth-child(${ i }n+${ i })::after`]: {
              'border-right-width': '0'
            }
          });
          // vertical lines, fix top position of first row
          bpStyles.push({
            [`.grid-cols-${ i }[class*="grid-line-y"] > *:nth-child(-n+${ i })::after`]: {
              'top': '0'
            }
          });
          // vertical lines, fix bottom position of last row
          bpStyles.push({
            [`.grid-cols-${ i }[class*="grid-line-y"] > *:nth-child(${ i }n+1):nth-last-child(-n+${ i })::after, .grid-cols-${ i }[class*="grid-line-y"] > *:nth-child(${ i }n+1):nth-last-child(-n+${ i }) ~ li::after`] : {
              'bottom': '0'
            }
          });
        }
      }

      // horizontal lines, reset
      bpStyles.push({
        [`.${ bp }\\:grid-cols-${ i }.grid-line-x > *:nth-child(n)::before`]: {
          'left': '0',
          'right': '0',
          'border-top-width': '1px',
          'border-bottom-width': '1px'
        }
      });
      bpStyles.push({
        [`.${ bp }\\:grid-cols-${ i }.grid-line-xfull > *:nth-child(n)::before`]: {
          'left': 'calc(var(--inner-gutter) / -2)',
          'right': 'calc(var(--inner-gutter) / -2 - 1px)',
          'border-top-width': '1px',
          'border-bottom-width': '1px'
        }
      });
      // horizontal first in row, fix left
      bpStyles.push({
        [`.${ bp }\\:grid-cols-${ i }[class*="grid-line-x"] > *:nth-child(${ i }n+1)::before`]: {
          'left': '0'
        }
      });
      // horizontal last in row, fix right
      bpStyles.push({
        [`.${ bp }\\:grid-cols-${ i }[class*="grid-line-x"] > *:nth-child(${ i }n+${ i })::before`]: {
          'right': '0'
        }
      });
      // horizontal first row, hide top border
      bpStyles.push({
        [`.${ bp }\\:grid-cols-${ i }[class*="grid-line-x"] > *:nth-child(-n+${ i })::before`]: {
          'border-top-width': '0'
        }
      });
      // horizontal last row, hide bottom border
      bpStyles.push({
        [`.${ bp }\\:grid-cols-${ i }[class*="grid-line-x"] > *:nth-child(${ i }n+1):nth-last-child(-n+${ i })::before, .${ bp }\\:grid-cols-${ i }[class*="grid-line-x"] > *:nth-child(${ i }n+1):nth-last-child(-n+${ i }) ~ li::before`] : {
          'border-bottom-width': '0'
        }
      });

      if (i > 1) {
        // vertical lines, reset
        bpStyles.push({
          [`.${ bp }\\:grid-cols-${ i }.grid-line-y > *:nth-child(n)::after`]: {
            'top': '0',
            'border-left-width': '1px',
            'border-right-width': '1px'
          }
        });
        bpStyles.push({
          [`.${ bp }\\:grid-cols-${ i }.grid-line-yfull > *:nth-child(n)::after`]: {
            'top': 'calc(var(--inner-gutter) / -1)',
            'border-left-width': '1px',
            'border-right-width': '1px'
          }
        });
        // vertical lines, hide first in row
        bpStyles.push({
          [`.${ bp }\\:grid-cols-${ i }[class*="grid-line-y"] > *:nth-child(${ i }n+1)::after`]: {
            'border-left-width': '0'
          }
        });
        // vertical last in row, fix right
        bpStyles.push({
          [`.${ bp }\\:grid-cols-${ i }[class*="grid-line-x"] > *:nth-child(${ i }n+${ i })::after`]: {
            'border-right-width': '0'
          }
        });
        // vertical lines, fix top position of first row
        bpStyles.push({
          [`.${ bp }\\:grid-cols-${ i }[class*="grid-line-y"] > *:nth-child(-n+${ i })::after`]: {
            'top': '0'
          }
        });
        // vertical lines, fix bottom position of last row
        bpStyles.push({
          [`.${ bp }\\:grid-cols-${ i }[class*="grid-line-y"] > *:nth-child(${ i }n+1):nth-last-child(-n+${ i })::after, .${ bp }\\:grid-cols-${ i }[class*="grid-line-y"] > *:nth-child(${ i }n+1):nth-last-child(-n+${ i }) ~ li::after`] : {
            'bottom': '0'
          }
        });
      }
    }

    styles.push({
      [`@screen ${bp}`]: bpStyles
    });
  });

  addComponents(styles);
};
