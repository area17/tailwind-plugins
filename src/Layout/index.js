module.exports = function({ addComponents, theme, e, prefix, config }) {
  const breakpoints = theme('screens');
  const firstBp = Object.keys(breakpoints)[0];
  const columnCount = theme('columnCount', {});
  const maxCols = theme('maxGridCols', columnCount);
  const maxColAmount = Math.max.apply(Math, Object.values(maxCols));
  const prefixString = config('prefix');
  const fractions = ['1/2', '1/3', '1/4', '2/3', '3/4'];

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

  function generateByFraction(fraction) {
    const splitFraction = fraction.split('/');
    const numeric = Math.floor((splitFraction[0] / splitFraction[1]) * 1000) / 1000;
    const oneMinusNumeric = Math.floor((1 - (splitFraction[0] / splitFraction[1])) * 1000) / 1000;
    const percent = Math.floor((splitFraction[0] / splitFraction[1]) * 100000) / 1000;

    const classes = [
      {
        name: 'cols',
        attribute: 'width'
      },
      {
        name: 'push',
        attribute: 'margin-left',
        addGutter: true
      },
      {
        name: 'push-r',
        attribute: 'margin-right',
        addGutter: true
      },
      {
        name: 'pull',
        attribute: 'margin-left',
        inverse: true,
        addGutter: true
      },
      {
        name: 'pull-r',
        attribute: 'margin-right',
        inverse: true,
        addGutter: true
      },
      {
        name: 'mr',
        suffix: '-cols',
        attribute: 'margin-right',
        addGutter: true
      },
      {
        name: 'ml',
        suffix: '-cols',
        attribute: 'margin-left',
        addGutter: true
      },
      {
        name: 'mx',
        suffix: '-cols',
        attribute: ['margin-right', 'margin-left'],
        addGutter: true
      },
      {
        name: '-mr',
        suffix: '-cols',
        attribute: 'margin-right',
        inverse: true,
        addGutter: true
      },
      {
        name: '-ml',
        suffix: '-cols',
        attribute: 'margin-left',
        inverse: true,
        addGutter: true
      },
      {
        name: '-mx',
        suffix: '-cols',
        attribute: ['margin-right', 'margin-left'],
        inverse: true,
        addGutter: true
      },
      {
        name: 'pr',
        suffix: '-cols',
        attribute: 'padding-right',
        addGutter: true
      },
      {
        name: 'pl',
        suffix: '-cols',
        attribute: 'padding-left',
        addGutter: true
      },
      {
        name: 'px',
        suffix: '-cols',
        attribute: ['padding-right', 'padding-left'],
        addGutter: true
      },
      {
        name: 'left',
        suffix: '-cols',
        attribute: 'left',
        addGutter: true
      },
      {
        name: 'right',
        suffix: '-cols',
        attribute: 'right',
        addGutter: true
      },
    ];

    classes.forEach(obj => {
      let calc = `${ percent }% - (var(--inner-gutter) * ${ oneMinusNumeric })`;
      let containerCalc = `${ percent }% - var(--inner-gutter)`;
      let attrs = {};
      let cAttrs = {};

      if (obj.addGutter) {
        calc = `((${ calc }) + var(--inner-gutter))`;
        containerCalc = `((${ containerCalc }) + (2 * var(--inner-gutter)))`;
      }

      if (obj.inverse) {
        calc = `(${ calc }) * -1`;
        containerCalc = `(${ containerCalc }) * -1`;
      }

      if (Array.isArray(obj.attribute)) {
        obj.attribute.forEach(attr => {
          attrs[attr] = `calc(${ calc })`;
          cAttrs[attr] = `calc(${ containerCalc })`;
        });
      } else {
        attrs[obj.attribute] = `calc(${ calc })`;
        cAttrs[obj.attribute] = `calc(${ containerCalc })`;
      }

      styles.push({
        [`${ prefix('.' + e(obj.name + '-' + fraction + (obj.suffix || ''))) }`]: attrs,
        [`${ prefix('.cols-container') } > ${ prefix('.' + e(obj.name + '-' + fraction + (obj.suffix || ''))) }`]: cAttrs,
      });
    });
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
      },
      [`${ prefix('.cols-container') } > ${ prefix('.ml-0') }`]: {
        'margin-left': 0
      },
    }
  ];

  [...Array(maxColAmount).keys()].forEach((n) => {
    const num = n + 1;
    const colStyles = {
      [`${ prefix('.cols') }-${ num }`]: {
        width: coreCalc(false, num)
      },
      [`${ prefix('.cols') }-${ num } > *`]: {
        '--grid-columns': `${ num }`
      },
      [`${ prefix('.cols-container') } > ${ prefix('.cols') }-${ num }`]: {
        width: coreCalc(true, num)
      },
      [`${ prefix('.cols-container') } > ${ prefix('.cols') }-${ num } > *`]: {
        '--grid-columns': `${ num }`
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

  fractions.forEach(fraction => {
    generateByFraction(fraction);
  });

  addComponents(styles, {
    respectPrefix: false
  });
};
