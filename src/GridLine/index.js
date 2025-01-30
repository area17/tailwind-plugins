module.exports = function ({ addBase, theme, config }) {
  const breakpoints = theme('screens');
  const firstBp = Object.keys(breakpoints)[0];
  const colors = theme('borderColor', theme('color', {}));
  const spacing = theme('spacing', {});
  const columnCount = theme('columnCount', {});
  const maxCols = theme('maxGridCols', columnCount);
  const prefixString = config('prefix');
  const bpString = '::BP::';
  const regEx = new RegExp('::BP::', 'ig');
  let stylesToReturn = {};

  // TODO: refactor to use `addUtilities` (see BackgroundFill/index.js)

  // set base
  const styles = [
    {
      [`[class*="${prefixString}grid-line-"] > *`]: {
        position: 'relative',
      },
    },
    {
      [`[class*="${prefixString}grid-line-"] > *::before, [class*="${prefixString}grid-line-"] > *::after`]:
        {
          content: 'attr(👻)',
          position: 'absolute',
          'z-index': 0,
          'pointer-events': 'none',
        },
    },
    {
      [`.${bpString + prefixString}grid-line-x > *::before`]: {
        content: 'attr(👻)',
        'inset-inline-start': '0',
        'inset-inline-end': '0',
        top: '0',
        bottom: 'calc(var(--inner-gutter) / -2)',
        'border-top': '0 solid transparent',
        'border-bottom': '0 solid transparent',
      },
    },
    {
      [`.${bpString + prefixString}grid-line-xfull > *::before`]: {
        content: 'attr(👻)',
        'inset-inline-start': 'calc(var(--inner-gutter) / -2)',
        'inset-inline-end': 'calc(var(--inner-gutter) / -2)',
        top: '0',
        bottom: 'calc(var(--inner-gutter) / -2)',
        'border-top': '0 solid transparent',
        'border-bottom': '0 solid transparent',
      },
    },
    {
      [`.${bpString + prefixString}grid-line-x-0 > *::before`]: {
        content: 'none',
      },
    },
    {
      [`.${bpString + prefixString}grid-line-y > *::after`]: {
        content: 'attr(👻)',
        'inset-inline-start': '0',
        'inset-inline-end': 'calc(var(--inner-gutter) / -2)',
        top: '0',
        bottom: '0',
        'border-inline-start': '0 solid transparent',
        'border-inline-end': '0 solid transparent',
      },
    },
    {
      [`.${bpString + prefixString}grid-line-yfull > *::after`]: {
        content: 'attr(👻)',
        'inset-inline-start': '0',
        'inset-inline-end': 'calc(var(--inner-gutter) / -2)',
        top: 'calc(var(--inner-gutter) / -1)',
        bottom: '0',
        'border-inline-start': '0 solid transparent',
        'border-inline-end': '0 solid transparent',
      },
    },
    {
      [`.${
        bpString + prefixString
      }grid-line-yfull[class*="${prefixString}grid-line-x"] > *::after`]: {
        'inset-inline-start': '0',
        'inset-inline-end': 'calc(var(--inner-gutter) / -2)',
        top: 'calc(var(--inner-gutter) / -2)',
        bottom: 'calc(var(--inner-gutter) / -2)',
        'border-inline-start': '0 solid transparent',
        'border-inline-end': '0 solid transparent',
      },
    },
    {
      [`.${bpString + prefixString}grid-line-y-0 > *::after`]: {
        content: 'none',
      },
    },
  ];

  // set spacing
  Object.entries(spacing).forEach((group) => {
    const [name, space] = group;

    styles.push({
      [`.${bpString + prefixString}grid-line-x-${name.replace(
        '/',
        '\\/'
      )}[class*="${prefixString}grid-line-x-"] > *::before`]: {
        bottom: `-${space}`,
      },
    });

    styles.push({
      [`.${bpString + prefixString}grid-line-x-${name.replace(
        '/',
        '\\/'
      )}[class*="${prefixString}grid-line-yfull"] > *::after`]: {
        top: `-${space}`,
        bottom: `-${space}`,
      },
    });
  });

  // set stroke colours
  Object.entries(colors).forEach((group) => {
    const [name, color] = group;
    styles.push({
      [`.${
        bpString + prefixString
      }grid-line-x-${name}[class*="${prefixString}grid-line-x-"] > *::before`]:
        {
          'border-bottom-color': color,
        },
    });
    styles.push({
      [`.${
        bpString + prefixString
      }grid-line-y-${name}[class*="${prefixString}grid-line-y-"] > *::after`]: {
        'border-inline-end-color': color,
      },
    });
    styles.push({
      [`.${
        bpString + prefixString
      }grid-line-xy-${name}[class*="${prefixString}grid-line-xy-"] > *::before`]:
        {
          'border-bottom-color': color,
        },
    });
    styles.push({
      [`.${
        bpString + prefixString
      }grid-line-xy-${name}[class*="${prefixString}grid-line-xy-"] > *::after`]:
        {
          'border-inline-end-color': color,
        },
    });
  });

  // position strokes
  let largestColCount = 0;
  Object.entries(maxCols).forEach((group) => {
    const [name, count] = group;
    if (count > largestColCount) {
      largestColCount = count;
    }
  });

  for (let i = 1; i <= largestColCount; i++) {
    // horizontal lines, reset
    styles.push({
      [`.${
        bpString + prefixString
      }grid-cols-${i}[class*="${prefixString}grid-line-x"][class*="${prefixString}grid-line-x"] > *:nth-child(n)::before`]:
        {
          'border-bottom-width': '1px',
        },
    });
    if (i === 1) {
      styles.push({
        [`.${
          bpString + prefixString
        }grid-cols-${i}[class*="${prefixString}grid-line-xfull"] > *:nth-child(n)::before`]:
          {
            'inset-inline-start': '0',
            'inset-inline-end': '0',
          },
      });
    } else {
      styles.push({
        [`.${
          bpString + prefixString
        }grid-cols-${i}[class*="${prefixString}grid-line-xfull"] > *:nth-child(n)::before`]:
          {
            'inset-inline-start': 'calc(var(--inner-gutter) / -2)',
            'inset-inline-end': 'calc(var(--inner-gutter) / -2)',
          },
      });
    }
    // horizontal first in row, fix left
    styles.push({
      [`.${
        bpString + prefixString
      }grid-cols-${i}[class*="${prefixString}grid-line-x"] > *:nth-child(${i}n+1)::before`]:
        {
          'inset-inline-start': '0',
        },
    });
    // horizontal last in row, fix right
    styles.push({
      [`.${
        bpString + prefixString
      }grid-cols-${i}[class*="${prefixString}grid-line-x"] > *:nth-child(${i}n+${i})::before`]:
        {
          'inset-inline-end': '0',
        },
    });
    // horizontal last row, hide bottom border
    styles.push({
      [`.${
        bpString + prefixString
      }grid-cols-${i}[class*="${prefixString}grid-line-x"] > *:nth-child(${i}n+1):nth-last-child(-n+${i})::before`]:
        {
          'border-bottom-width': '0',
        },
    });
    styles.push({
      [`.${
        bpString + prefixString
      }grid-cols-${i}[class*="${prefixString}grid-line-x"] > *:nth-child(${i}n+1):nth-last-child(-n+${i}) ~ *::before`]:
        {
          'border-bottom-width': '0',
        },
    });

    if (i > 1) {
      // vertical lines, reset
      styles.push({
        [`.${
          bpString + prefixString
        }grid-cols-${i}[class*="${prefixString}grid-line-y"][class*="${prefixString}grid-line-y"] > *:nth-child(n)::after`]:
          {
            'border-inline-end-width': '1px',
          },
      });
      // vertical last in row, fix right
      styles.push({
        [`.${
          bpString + prefixString
        }grid-cols-${i}[class*="${prefixString}grid-line-y"][class*="${prefixString}grid-line-y"] > *:nth-child(${i}n+${i})::after`]:
          {
            'border-inline-end-width': '0',
          },
      });
      // vertical lines, fix top position of first row
      styles.push({
        [`.${
          bpString + prefixString
        }grid-cols-${i}[class*="${prefixString}grid-line-y"][class*="${prefixString}grid-line-y"] > *:nth-child(-n+${i})::after`]:
          {
            top: '0',
          },
      });
      // vertical lines, fix bottom position of last row
      styles.push({
        [`.${
          bpString + prefixString
        }grid-cols-${i}[class*="${prefixString}grid-line-y"][class*="${prefixString}grid-line-y"] > *:nth-child(${i}n+1):nth-last-child(-n+${i})::after`]:
          {
            bottom: '0',
          },
      });
      styles.push({
        [`.${
          bpString + prefixString
        }grid-cols-${i}[class*="${prefixString}grid-line-y"][class*="${prefixString}grid-line-y"] > *:nth-child(${i}n+1):nth-last-child(-n+${i}) ~ li::after`]:
          {
            bottom: '0',
          },
      });
    }
  }

  Object.keys(breakpoints).forEach((bp) => {
    if (bp === firstBp) {
      styles.forEach((style) => {
        for (const [key, value] of Object.entries(style)) {
          stylesToReturn[key.replace(regEx, '')] = value;
        }
      });
    } else {
      stylesToReturn[`@media (width >= ${breakpoints[bp]})`] = stylesToReturn[`@media (width >= ${breakpoints[bp]})`] || {};
      let mq = stylesToReturn[`@media (width >= ${breakpoints[bp]})`];

      styles.forEach((style) => {
        for (const [key, value] of Object.entries(style)) {
          mq[key.replace(regEx, `${bp}\\:`)] = value;
        }
      });
    }
  });

  addBase(stylesToReturn, {
    respectPrefix: false,
  });
};
