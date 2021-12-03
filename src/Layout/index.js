module.exports = function({ addComponents, theme, prefix, config }) {
  const breakpoints = theme('screens');
  const firstBp = Object.keys(breakpoints)[0];
  const columnCount = theme('columnCount', {});
  const maxCols = theme('maxGridCols', columnCount);
  const maxColAmount = Math.max.apply(Math, Object.values(maxCols));
  const prefixString = config('prefix');

  function coreCalc(inContainer, cols, bump, pull) {
    let calc = `((${cols} / var(--grid-columns)) * 100%) - (var(--inner-gutter) - (${cols} / var(--grid-columns) * var(--inner-gutter)))`;

    if (inContainer) {
      calc = `((${cols} / var(--grid-columns)) * (100% - var(--inner-gutter))) - (var(--inner-gutter) - (${cols} / var(--grid-columns) * var(--inner-gutter)))`;
    }

    if (bump) {
      calc = `(${calc}) + ${bump}`;
    }

    if (pull) {
      calc = `(${ calc }) * -1`
    }

    return `calc(${calc})`;
  }

  const styles = [
    {
      [prefix('.cols-container')]: {
        display: 'flex',
        'flex-flow': 'row wrap',
        'margin-left': 'calc(var(--inner-gutter) * -1)'
      },
      [`${ prefix('.cols-container') } > ${ prefix('[class*="cols-"]') }`]: {
        'margin-left': 'var(--inner-gutter)'
      },
      [`${ prefix('.cols-container') } > ${ prefix('.cols-ml-reset') }`]: {
        'margin-left': 0
      }
    }
  ];

  [...Array(maxColAmount).keys()].forEach((n) => {
    const num = n + 1;
    const colStyles = {
      [prefix(`.cols-${ num }`)]: {
        width: coreCalc(false, num)
      },
      [`${ prefix('.cols-container') } > ${ prefix('.cols') }-${ num }`]: {
        width: coreCalc(true, num)
      },
      [prefix(`.push-${ num }`)]: {
        'margin-left': coreCalc(false, num, 'var(--inner-gutter)')
      },
      [`${ prefix('.cols-container') } > ${ prefix('.push') }-${ num }`]: {
        'margin-left': coreCalc(true, num, 'var(--inner-gutter)')
      },
      [prefix(`.pull-${ num }`)]: {
        'margin-left': coreCalc(false, num, 'var(--inner-gutter)', true)
      },
      [`${ prefix('.cols-container') } > ${ prefix('.pull') }-${ num }`]: {
        'margin-left': coreCalc(true, num, 'var(--inner-gutter)', true)
      },
      [prefix(`.push-r-${ num }`)]: {
        'margin-right': coreCalc(false, num, 'var(--inner-gutter)')
      },
      [`${ prefix('.cols-container') } > ${ prefix('.push') }-r-${ num }`]: {
        'margin-right': coreCalc(true, num, 'var(--inner-gutter)')
      },
      [prefix(`.pull-r-${ num }`)]: {
        'margin-right': coreCalc(false, num, 'var(--inner-gutter)', true)
      },
      [`${ prefix('.cols-container') } > ${ prefix('.pull') }-r-${ num }`]: {
        'margin-right': coreCalc(true, num, 'var(--inner-gutter)', true)
      },
      [prefix(`.push-${ num }-gutter`)]: {
        'margin-left': coreCalc(false, num, '(var(--inner-gutter) * 2)')
      },
      [`${ prefix('.cols-container') } > ${ prefix('.push') }-${ num }-gutter`]: {
        'margin-left': coreCalc(true, num, '(var(--inner-gutter) * 2)')
      },
      [prefix(`.pull-${ num }-gutter`)]: {
        'margin-left': coreCalc(false, num, '(var(--inner-gutter) * 2)', true)
      },
      [`${ prefix('.cols-container') } > ${ prefix('.pull') }-${ num }-gutter`]: {
        'margin-left': coreCalc(true, num, '(var(--inner-gutter) * 2)', true)
      },
      [prefix(`.push-r-${ num }-gutter`)]: {
        'margin-right': coreCalc(false, num, '(var(--inner-gutter) * 2)')
      },
      [`${ prefix('.cols-container') } > ${ prefix('.push') }-r-${ num }-gutter`]: {
        'margin-right': coreCalc(true, num, '(var(--inner-gutter) * 2)')
      },
      [prefix(`.pull-r-${ num }-gutter`)]: {
        'margin-right': coreCalc(false, num, '(var(--inner-gutter) * 2)', true)
      },
      [`${ prefix('.cols-container') } > ${ prefix('.pull') }-r-${ num }-gutter`]: {
        'margin-right': coreCalc(true, num, '(var(--inner-gutter) * 2)', true)
      },
      [prefix(`.left-${ num }-cols`)]: {
        'left': coreCalc(false, num, 'var(--inner-gutter)')
      },
      [prefix(`.right-${ num }-cols`)]: {
        'right': coreCalc(false, num, 'var(--inner-gutter)')
      },
      [prefix(`.left-${ num }-cols-gutter`)]: {
        'left': coreCalc(false, num, '(var(--inner-gutter) * 2)')
      },
      [prefix(`.right-${ num }-cols-gutter`)]: {
        'right': coreCalc(false, num, '(var(--inner-gutter) * 2)')
      },
    };
    styles.push(colStyles);
  });

  addComponents(styles, {
    respectPrefix: false
  });
};
