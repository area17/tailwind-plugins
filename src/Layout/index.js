module.exports = function({ addComponents, theme }) {
  const breakpoints = theme('screens');
  const firstBp = Object.keys(breakpoints)[0];
  const columnCount = theme('columnCount', {});
  const maxCols = theme('maxGridCols', columnCount);
  const maxColAmount = Math.max.apply(Math, Object.values(maxCols));

  const styles = [
    {
      '.cols-container': {
        'display': 'flex',
        'flex-flow': 'row wrap',
        'margin-left': 'calc(var(--inner-gutter) * -1)',
      },
      ['.cols-container > [class*="cols-"]']: {
        'width': 'calc(100% - var(--inner-gutter))',
        'margin-left': 'var(--inner-gutter)'
      },
      ['.cols-container > .cols-ml-reset']: {
        'margin-left': 0
      }
    }
  ];

  function coreCalc(inContainer, cols, bump) {
    let calc = `((${ cols } / var(--grid-columns)) * 100%) - (var(--inner-gutter) - (${ cols } / var(--grid-columns) * var(--inner-gutter)))`;

    if (inContainer) {
      calc = `((${ cols } / var(--grid-columns)) * (100% - var(--inner-gutter))) - (var(--inner-gutter) - (${ cols } / var(--grid-columns) * var(--inner-gutter)))`;
    }

    if (bump) {
      calc = `(${ calc }) + ${ bump }`;
    }

    return `calc(${ calc })`;
  }

  [...Array(maxColAmount).keys()].forEach(n => {
    const colStyles = {
      [`.cols-${ n }`]: {
        'width': coreCalc(false, n)
      },
      [`.cols-container > .cols-${ n }`]: {
        'width': coreCalc(true, n)
      },
      [`.push-${ n }`]: {
        'margin-left': coreCalc(false, n, 'var(--inner-gutter)')
      },
      [`.cols-container > .push-${ n }`]: {
        'margin-left': coreCalc(true, n, 'var(--inner-gutter)')
      },
      [`.push-${ n }-gutter`]: {
        'margin-left': coreCalc(false, n, '(var(--inner-gutter) * 2)')
      },
      [`.cols-container > .push-${ n }-gutter`]: {
        'margin-left': coreCalc(true, n, '(var(--inner-gutter) * 2)')
      }
    }
    styles.push(colStyles);
  });

  Object.keys(breakpoints).forEach(bp => {
    const bpStyles = [
      {
        [`.${ bp }\\:cols-container`]: {
          'display': 'flex',
          'flex-flow': 'row wrap',
          'margin-left': 'calc(var(--inner-gutter) * -1)'
        },
        [`.${ bp }\\:cols-container > [class*="cols-"]`]: {
          'width': '100%',
          'margin-left': 'var(--inner-gutter)'
        },
        [`.${ bp }\\:cols-container > .cols-ml-reset`]: {
          'margin-left': 0
        }
      }
    ];

    [...Array(maxColAmount).keys()].forEach(n => {
      const colStyles = {
        [`.${ bp }\\:cols-${ n }`]: {
          'width': coreCalc(false, n)
        },
        [`.cols-container > .${ bp }\\:cols-${ n }`]: {
          'width': coreCalc(true, n)
        },
        [`.${ bp }\\:push-${ n }`]: {
          'margin-left': coreCalc(false, n, 'var(--inner-gutter)')
        },
        [`.cols-container > .${ bp }\\:push-${ n }`]: {
          'margin-left': coreCalc(true, n, 'var(--inner-gutter)')
        },
        [`.${ bp }\\:push-${ n }-gutter`]: {
          'margin-left': coreCalc(false, n, '(var(--inner-gutter) * 2)')
        },
        [`.cols-container > .${ bp }\\:push-${ n }-gutter`]: {
          'margin-left': coreCalc(true, n, '(var(--inner-gutter) * 2)')
        }
      }
      bpStyles.push(colStyles);
    });

    styles.push({
      [`@screen ${bp}`]: bpStyles
    });
  });

  addComponents(styles);
};
