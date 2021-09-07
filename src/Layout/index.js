module.exports = function({ addUtilities, theme, prefix, config }) {
  const breakpoints = theme('screens');
  const firstBp = Object.keys(breakpoints)[0];
  const columnCount = theme('columnCount', {});
  const maxCols = theme('maxGridCols', columnCount);
  const maxColAmount = Math.max.apply(Math, Object.values(maxCols));
  const prefixString = config('prefix');

  const styles = [
    {
      [prefix('.cols-container')]: {
        display: 'flex',
        'flex-flow': 'row wrap',
        'margin-left': 'calc(var(--inner-gutter) * -1)'
      },
      [prefix('.cols-container > [class*="cols-"]')]: {
        width: 'calc(100% - var(--inner-gutter))',
        'margin-left': 'var(--inner-gutter)'
      },
      [prefix('.cols-container > .cols-ml-reset')]: {
        'margin-left': 0
      }
    }
  ];

  function coreCalc(inContainer, cols, bump) {
    let calc = `((${cols} / var(--grid-columns)) * 100%) - (var(--inner-gutter) - (${cols} / var(--grid-columns) * var(--inner-gutter)))`;

    if (inContainer) {
      calc = `((${cols} / var(--grid-columns)) * (100% - var(--inner-gutter))) - (var(--inner-gutter) - (${cols} / var(--grid-columns) * var(--inner-gutter)))`;
    }

    if (bump) {
      calc = `(${calc}) + ${bump}`;
    }

    return `calc(${calc})`;
  }

  [...Array(maxColAmount).keys()].forEach((n) => {
    const colStyles = {
      [prefix(`.cols-${n}`)]: {
        width: coreCalc(false, n)
      },
      [prefix(`.cols-container > .cols-${n}`)]: {
        width: coreCalc(true, n)
      },
      [prefix(`.push-${n}`)]: {
        'margin-left': coreCalc(false, n, 'var(--inner-gutter)')
      },
      [prefix(`.push-r-${n}`)]: {
        'margin-right': coreCalc(false, n, 'var(--inner-gutter)')
      },
      [prefix(`.cols-container > .push-${n}`)]: {
        'margin-left': coreCalc(true, n, 'var(--inner-gutter)')
      },
      [prefix(`.cols-container > .push-r-${n}`)]: {
        'margin-right': coreCalc(true, n, 'var(--inner-gutter)')
      },
      [prefix(`.push-${n}-gutter`)]: {
        'margin-left': coreCalc(false, n, '(var(--inner-gutter) * 2)')
      },
      [prefix(`.push-r-${n}-gutter`)]: {
        'margin-right': coreCalc(false, n, '(var(--inner-gutter) * 2)')
      },
      [prefix(`.cols-container > .push-${n}-gutter`)]: {
        'margin-left': coreCalc(true, n, '(var(--inner-gutter) * 2)')
      },
      [prefix(`.cols-container > .push-r-${n}-gutter`)]: {
        'margin-right': coreCalc(true, n, '(var(--inner-gutter) * 2)')
      }
    };
    styles.push(colStyles);
  });

  Object.keys(breakpoints).forEach((bp) => {
    const bpStyles = [
      {
        [`.${bp}\\:${prefixString}cols-container`]: {
          display: 'flex',
          'flex-flow': 'row wrap',
          'margin-left': 'calc(var(--inner-gutter) * -1)'
        },
        [`.${bp}\\:${prefixString}cols-container > [class*="cols-"]`]: {
          width: '100%',
          'margin-left': 'var(--inner-gutter)'
        },
        [`.${bp}\\:${prefixString}cols-container > .${prefixString}cols-ml-reset`]: {
          'margin-left': 0
        }
      }
    ];

    [...Array(maxColAmount).keys()].forEach((n) => {
      const colStyles = {
        [`.${bp}\\:${prefixString}cols-${n}`]: {
          width: coreCalc(false, n)
        },
        [`.${prefixString}cols-container > .${bp}\\:${prefixString}cols-${n}`]: {
          width: coreCalc(true, n)
        },
        [`.${bp}\\:${prefixString}push-${n}`]: {
          'margin-left': coreCalc(false, n, 'var(--inner-gutter)')
        },
        [`.${prefixString}cols-container > .${bp}\\:${prefixString}push-${n}`]: {
          'margin-left': coreCalc(true, n, 'var(--inner-gutter)')
        },
        [`.${bp}\\:${prefixString}push-${n}-gutter`]: {
          'margin-left': coreCalc(false, n, '(var(--inner-gutter) * 2)')
        },
        [`.${prefixString}cols-container > .${bp}\\:${prefixString}push-${n}-gutter`]: {
          'margin-left': coreCalc(true, n, '(var(--inner-gutter) * 2)')
        }
      };
      bpStyles.push(colStyles);
    });

    styles.push({
      [`@screen ${bp}`]: bpStyles
    });
  });

  addUtilities(styles, {
    respectPrefix: false
  });
};
