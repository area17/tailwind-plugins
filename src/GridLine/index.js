module.exports = function ({ addComponents, matchComponents, theme, config }) {
  const breakpoints = theme('screens');
  const firstBp = Object.keys(breakpoints)[0];
  const colors = theme('borderColor', theme('color', {}));
  const spacing = theme('spacing', {});
  const columnCount = theme('columnCount', {});
  const maxCols = theme('maxGridCols', columnCount);
  const maxColAmount = Math.max.apply(Math, Object.values(maxCols));

  const gridlineTypes = {
    'x': 'x',
    'xfull': 'xfull',
    'x-0': 'x-0',
    'y': 'y',
    'yfull': 'yfull',
    'y-0': 'y-0',
  };

  const gridLineColours = {};
  ['x', 'y', 'xy'].forEach((dir) => {
    Object.entries(colors).forEach((group) => {
      const [name, color] = group;
      gridLineColours[`${dir}-${name}`] = `${dir}::${color}`;
    });
  });

  const offsets = {};
  for (i = 1; i <= 200; i++) {
    offsets[i] = `${i}px`;
  }

  const gridColsValues = {};
  for (i = 1; i < maxColAmount + 1; i++) {
    gridColsValues[i] = i;
  }

  Object.keys(gridlineTypes).forEach((value) => {
    let typeClassName = `.grid-line-${value}`;

    let props = {};

    if (value === 'x') {
      props = {
        [`${typeClassName} > *::before`]: {
          content: '""',
          'inset-inline-start': 'var(--gridline-x-start, 0)',
          'inset-inline-end': 'var(--gridline-x-end, 0)',
          top: '0',
          bottom: 'var(--gridline-x-bottom, calc(var(--inner-gutter) / -2))',
          'border-top': '0 solid transparent',
          'border-bottom': 'var(--gridline-x-width, 0) solid var(--gridline-x-color, transparent)',
        },
      };
    }

    if (value === 'xfull') {
      props = {
        [`${typeClassName} > *::before`]: {
          content: '""',
          'inset-inline-start': 'var(--gridline-x-start, calc(var(--inner-gutter) / -2))',
          'inset-inline-end': 'var(--gridline-x-end, calc(var(--inner-gutter) / -2))',
          top: '0',
          bottom: 'var(--gridline-x-bottom, calc(var(--inner-gutter) / -2))',
          'border-top': '0 solid transparent',
          'border-bottom': 'var(--gridline-x-width, 0) solid var(--gridline-x-color, transparent)',
        },
      };
    }

    if (value === 'x-0') {
      props = {
        [`${typeClassName} > *::before`]: {
          content: 'none',
        },
      };
    }

    if (value === 'y') {
      props = {
        [`${typeClassName} > *::after`]: {
          content: '""',
          'inset-inline-start': '0',
          'inset-inline-end': 'calc(var(--inner-gutter) / -2)',
          top: '0',
          bottom: '0',
          'border-inline-start': '0 solid transparent',
          'border-inline-end': 'var(--gridline-y-width, 0) solid var(--gridline-y-color, transparent)',
        },
      };
    }

    if (value === 'yfull') {
      props = {
        [`${typeClassName} > *::after`]: {
          content: '""',
          'inset-inline-start': '0',
          'inset-inline-end': 'calc(var(--inner-gutter) / -2)',
          top: 'var(--gridline-y-top, calc(var(--inner-gutter) / -1))',
          bottom: '0',
          'border-inline-start': '0 solid transparent',
          'border-inline-end': 'var(--gridline-y-width, 0) solid var(--gridline-y-color, transparent)',
        },
        [`${typeClassName}.grid-line-x > *::after`]: {
          'inset-inline-start': '0',
          'inset-inline-end': 'calc(var(--inner-gutter) / -2)',
          top: 'var(--gridline-y-top, calc(var(--inner-gutter) / -2))',
          bottom: 'var(--gridline-y-bottom, calc(var(--inner-gutter) / -2))',
          'border-inline-start': '0 solid transparent',
          'border-inline-end': 'var(--gridline-y-width, 0) solid var(--gridline-y-color, transparent)',
        },
        [`${typeClassName}.grid-line-xfull > *::after`]: {
          'inset-inline-start': '0',
          'inset-inline-end': 'calc(var(--inner-gutter) / -2)',
          top: 'var(--gridline-y-top, calc(var(--inner-gutter) / -2))',
          bottom: 'var(--gridline-y-bottom, calc(var(--inner-gutter) / -2))',
          'border-inline-start': '0 solid transparent',
          'border-inline-end': 'var(--gridline-y-width, 0) solid var(--gridline-y-color, transparent)',
        },
      };
    }

    if (value === 'y-0') {
      props = {
        [`${typeClassName} > *::after`]: {
          content: 'none',
        },
      };
    }

    addComponents({
      [`${typeClassName} > *`]: {
        position: 'relative',
      },
      [`${typeClassName} > *::before, ${typeClassName} > *::after`]: {
        position: 'absolute',
        'z-index': 0,
        'pointer-events': 'none',
      },
      ...props,
    });
  });

  // colours
  matchComponents(
    {
      [`grid-line`]: (value) => {
        let parts = value.split('::');
        let obj = {};
        if (parts[0] === 'x') {
          obj = {
            '& > *::before': {
              '--gridline-x-color': parts[1],
            },
          };
        }
        if (parts[0] === 'y') {
          obj = {
            '& > *::after': {
              '--gridline-y-color': parts[1],
            },
          };
        }
        if (parts[0] === 'xy') {
          obj = {
            '& > *::before': {
              '--gridline-x-color': parts[1],
            },
            '& > *::after': {
              '--gridline-y-color': parts[1],
            },
          };
        }
        return obj;
      },
    },
    {
      values: gridLineColours,
    }
  );

  // spacings
  matchComponents(
    {
      [`grid-line-x`]: (value) => {
        let obj = {
          '& > *::before': {
            '--gridline-x-bottom': `-${value}`,
            '--gridline-y-top': `-${value}`,
            '--gridline-y-bottom': `-${value}`,
          },
          [`&.grid-line-yfull > *::after`]: {
            '--gridline-x-bottom': `-${value}`,
            '--gridline-y-top': `-${value}`,
            '--gridline-y-bottom': `-${value}`,
          },
        };
        return obj;
      },
    },
    {
      values: offsets,
    }
  );

  // cols
  Object.keys(gridColsValues).forEach((i) => {
    let gridColObj = {};

    let obj = {
      [`.grid-cols-${i}.grid-line-x > *:nth-child(n)::before`]: {
        '--gridline-x-width': '1px',
        '--gridline-x-start': '0',
        '--gridline-x-end': '0',
      },
    };
    if (i === 1) {
      obj = {
        ...obj,
        [`.grid-cols-${i}.grid-line-xfull > *:nth-child(n)::before`]: {
          '--gridline-x-width': '1px',
          '--gridline-x-start': '0',
          '--gridline-x-end': '0',
        },
      };
    } else {
      obj = {
        ...obj,
        [`.grid-cols-${i}.grid-line-xfull > *:nth-child(n)::before`]: {
          '--gridline-x-width': '1px',
          '--gridline-x-start': 'calc(var(--inner-gutter) / -2)',
          '--gridline-x-end': 'calc(var(--inner-gutter) / -2)',
        },
      };
    }
    // horizontal first in row, fix left
    obj = {
      ...obj,
      [`.grid-cols-${i}.grid-line-x > *:nth-child(${i}n+1)::before`]: {
        '--gridline-x-start': '0',
      },
      [`.grid-cols-${i}.grid-line-xfull > *:nth-child(${i}n+1)::before`]: {
        '--gridline-x-start': '0',
      },
    };
    // horizontal last in row, fix right
    obj = {
      ...obj,
      [`.grid-cols-${i}.grid-line-x > *:nth-child(${i}n+${i})::before`]: {
        '--gridline-x-end': '0',
      },
      [`.grid-cols-${i}.grid-line-xfull > *:nth-child(${i}n+${i})::before`]: {
        '--gridline-x-end': '0',
      },
    };
    // horizontal last row, hide bottom border
    obj = {
      ...obj,
      [`.grid-cols-${i}.grid-line-x > *:nth-child(n):nth-last-child(n)::before`]: {
        '--gridline-x-width': '1px',
      },
      [`.grid-cols-${i}.grid-line-x > *:nth-child(${i}n+1):nth-last-child(-n+${i})::before`]: {
        '--gridline-x-width': '0',
      },
      [`.grid-cols-${i}.grid-line-x > *:nth-child(${i}n+1):nth-last-child(-n+${i}) ~ *::before`]: {
        '--gridline-x-width': '0',
      },
      [`.grid-cols-${i}.grid-line-xfull > *:nth-child(n):nth-last-child(n)::before`]: {
        '--gridline-x-width': '1px',
      },
      [`.grid-cols-${i}.grid-line-xfull > *:nth-child(${i}n+1):nth-last-child(-n+${i})::before`]: {
        '--gridline-x-width': '0',
      },
      [`.grid-cols-${i}.grid-line-xfull > *:nth-child(${i}n+1):nth-last-child(-n+${i}) ~ *::before`]: {
        '--gridline-x-width': '0',
      },
    };

    if (i > 1) {
      // vertical lines, reset
      obj = {
        ...obj,
        [`.grid-cols-${i}[class*="grid-line-y"] > *:nth-child(n)::after`]: {
          '--gridline-y-width': '1px',
        },
      };
      // vertical last in row, fix right
      obj = {
        ...obj,
        [`.grid-cols-${i}[class*="grid-line-y"] > *:nth-child(n)::after`]: {
          '--gridline-y-width': '1px',
          '--mike': 'a',
        },
        [`.grid-cols-${i}[class*="grid-line-y"] > *:nth-child(${i}n+${i})::after`]: {
          '--gridline-y-width': '0',
          '--mike': '1',
        },
      };
      // vertical lines, fix top position of first row
      obj = {
        ...obj,
        [`.grid-cols-${i}.grid-line-y > *:nth-child(-n+${i})::after`]: {
          '--gridline-y-top': '0',
        },
        [`.grid-cols-${i}.grid-line-yfull > *:nth-child(-n+${i})::after`]: {
          '--gridline-y-top': '0',
        },
      };
      // vertical lines, fix bottom position of last row
      obj = {
        ...obj,
        [`.grid-cols-${i}.grid-line-y > *:nth-child(${i}n+1):nth-last-child(-n+${i})::after`]: {
          '--gridline-y-bottom': '0',
        },
        [`.grid-cols-${i}.grid-line-y > *:nth-child(${i}n+1):nth-last-child(-n+${i})::after`]: {
          '--gridline-y-bottom': '0',
        },
        [`.grid-cols-${i}.grid-line-yfull > *:nth-child(${i}n+1):nth-last-child(-n+${i})::after`]: {
          '--gridline-y-bottom': '0',
        },
        [`.grid-cols-${i}.grid-line-yfull > *:nth-child(${i}n+1):nth-last-child(-n+${i})::after`]: {
          '--gridline-y-bottom': '0',
        },
      };
    }

    addComponents(obj);
  });
};
