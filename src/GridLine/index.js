module.exports = function({ addComponents, theme }) {
  const breakpoints = theme('screens');
  const firstBp = Object.keys(breakpoints)[0];
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
        'top': '0',
        'bottom': 'calc(var(--inner-gutter) / -2)',
        'border-top': '0 solid transparent',
        'border-bottom': '0 solid transparent'
      },
      '.grid-line-xfull > *::before': {
        'left': 'calc(var(--inner-gutter) / -2)',
        'right': 'calc(var(--inner-gutter) / -2)',
        'top': '0',
        'bottom': 'calc(var(--inner-gutter) / -2)',
        'border-top': '0 solid transparent',
        'border-bottom': '0 solid transparent'
      },
      '.grid-line-y > *::after': {
        'left': '0',
        'right': 'calc(var(--inner-gutter) / -2)',
        'top': '0',
        'bottom': '0',
        'border-left': '0 solid transparent',
        'border-right': '0 solid transparent'
      },
      '.grid-line-yfull > *::after': {
        'left': '0',
        'right': 'calc(var(--inner-gutter) / -2)',
        'top': 'calc(var(--inner-gutter) / -1)',
        'bottom': '0',
        'border-left': '0 solid transparent',
        'border-right': '0 solid transparent'
      },
      '.grid-line-yfull[class*="grid-line-x"] > *::after': {
        'left': '0',
        'right': 'calc(var(--inner-gutter) / -2)',
        'top': 'calc(var(--inner-gutter) / -2)',
        'bottom': 'calc(var(--inner-gutter) / -2)',
        'border-left': '0 solid transparent',
        'border-right': '0 solid transparent'
      },
    }
  ];

  // set stroke colours
  Object.entries(colors).forEach(group => {
    const [name, color] = group;
    styles.push({
      [`.grid-line-x-${ name }[class*="grid-line-x-"] > *::before`]: {
        'border-bottom-color': color
      }
    });
    styles.push({
      [`.grid-line-y-${ name }[class*="grid-line-y-"] > *::after`]: {
        'border-right-color': color
      }
    });
    styles.push({
      [`.grid-line-xy-${ name }[class*="grid-line-xy-"] > *::before`]: {
        'border-bottom-color': color
      }
    });
    styles.push({
      [`.grid-line-xy-${ name }[class*="grid-line-xy-"] > *::after`]: {
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
        // horizontal last row, hide bottom border
        bpStyles.push({
          [`.grid-cols-${ i }[class*="grid-line-x"] > *:nth-child(${ i }n+1):nth-last-child(-n+${ i })::before, .grid-cols-${ i }[class*="grid-line-x"] > *:nth-child(${ i }n+1):nth-last-child(-n+${ i }) ~ *::before`] : {
            'border-bottom-width': '0'
          }
        });

        if (i > 1) {
          // vertical lines, reset
          bpStyles.push({
            [`.grid-cols-${ i }[class*="grid-line-y"] > *:nth-child(n)::after`]: {
              'border-right-width': '1px'
            }
          });
          // vertical last in row, fix right
          bpStyles.push({
            [`.grid-cols-${ i }[class*="grid-line-y"][class*="grid-line-y"] > *:nth-child(${ i }n+${ i })::after`]: {
              'border-right-width': '0'
            }
          });
          // vertical lines, fix top position of first row
          bpStyles.push({
            [`.grid-cols-${ i }[class*="grid-line-y"][class*="grid-line-y"] > *:nth-child(-n+${ i })::after`]: {
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

      // set stroke colours
      Object.entries(colors).forEach(group => {
        const [name, color] = group;
        bpStyles.push({
          [`.${ bp }\\:grid-line-x-${ name }[class*="grid-line-x-"] > *::before`]: {
            'border-bottom-color': color
          }
        });
        bpStyles.push({
          [`.${ bp }\\:grid-line-y-${ name }[class*="grid-line-y-"] > *::after`]: {
            'border-right-color': color
          }
        });
        bpStyles.push({
          [`.${ bp }\\:grid-line-xy-${ name }[class*="grid-line-xy-"] > *::before`]: {
            'border-bottom-color': color
          }
        });
        bpStyles.push({
          [`.${ bp }\\:grid-line-xy-${ name }[class*="grid-line-xy-"] > *::after`]: {
            'border-right-color': color
          }
        });
      });

      // horizontal lines, reset
      bpStyles.push({
        [`.${ bp }\\:grid-cols-${ i }.grid-line-x > *:nth-child(n):nth-child(n)::before, .${ bp }\\:grid-cols-${ i }.grid-line-x > *:nth-child(n):nth-child(n) ~ *::before`]: {
          'left': '0',
          'right': '0',
          'border-bottom-width': '1px'
        }
      });
      bpStyles.push({
        [`.${ bp }\\:grid-cols-${ i }.grid-line-xfull > *:nth-child(n):nth-child(n)::before, .${ bp }\\:grid-cols-${ i }.grid-line-xfull > *:nth-child(n):nth-child(n) ~ *::before`]: {
          'left': 'calc(var(--inner-gutter) / -2)',
          'right': 'calc(var(--inner-gutter) / -2)',
          'border-bottom-width': '1px'
        }
      });
      // horizontal first in row, fix left
      bpStyles.push({
        [`.${ bp }\\:grid-cols-${ i }[class*="grid-line-x"] > *:nth-child(n):nth-child(${ i }n+1)::before`]: {
          'left': '0'
        }
      });
      // horizontal last in row, fix right
      bpStyles.push({
        [`.${ bp }\\:grid-cols-${ i }[class*="grid-line-x"] > *:nth-child(n):nth-child(${ i }n+${ i })::before`]: {
          'right': '0'
        }
      });
      // horizontal last row, hide bottom border
      bpStyles.push({
        [`.${ bp }\\:grid-cols-${ i }[class*="grid-line-x"] > *:nth-child(${ i }n+1):nth-last-child(-n+${ i })::before, .${ bp }\\:grid-cols-${ i }[class*="grid-line-x"] > *:nth-child(${ i }n+1):nth-last-child(-n+${ i }) ~ *::before`] : {
          'border-bottom-width': '0'
        }
      });

      if (i > 1) {
        // vertical lines, reset
        bpStyles.push({
          [`.${ bp }\\:grid-cols-${ i }.grid-line-y[class*="grid-line-y"] > *:nth-child(n)::after`]: {
            'top': '0',
            'bottom': '0',
            'border-right-width': '1px'
          }
        });
        bpStyles.push({
          [`.${ bp }\\:grid-cols-${ i }.grid-line-yfull[class*="grid-line-y"] > *:nth-child(n)::after`]: {
            'top': 'calc(var(--inner-gutter) / -1)',
            'bottom': '0',
            'border-right-width': '1px'
          }
        });
        bpStyles.push({
          [`.${ bp }\\:grid-cols-${ i }.grid-line-yfull[class*="grid-line-x"] > *:nth-child(n)::after`]: {
            'top': 'calc(var(--inner-gutter) / -2)',
            'bottom': 'calc(var(--inner-gutter) / -2)',
            'border-right-width': '1px'
          }
        });
        // vertical last in row, fix right
        bpStyles.push({
          [`.${ bp }\\:grid-cols-${ i }[class*="grid-line-y"][class*="grid-line-y"] > *:nth-child(${ i }n+${ i })::after`]: {
            'border-right-width': '0'
          }
        });
        // vertical lines, fix top position of first row
        bpStyles.push({
          [`.${ bp }\\:grid-cols-${ i }[class*="grid-line-y"][class*="grid-line-y"] > *:nth-child(-n+${ i })::after`]: {
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
