module.exports = function ({ addComponents, theme, e, prefix, config }) {
  // docs: http://tailwind-plugins.dev.area17.com/Layout.html

  const breakpoints = theme('screens');
  const firstBp = Object.keys(breakpoints)[0];
  const columnCount = theme('columnCount', {});
  const maxCols = theme('maxGridCols', columnCount);
  const maxColAmount = Math.max.apply(Math, Object.values(maxCols));
  // the fractional classes we're going to generate
  const fractions = ['1/2', '1/3', '1/4', '2/3', '3/4'];
  // the classes we want to generate, along with some information to help fill out the CSS calc
  const classes = [
    {
      name: 'w',
      suffix: '-cols',
      attribute: 'width',
      addMarginLeft: true,
    },
    {
      name: 'mr',
      suffix: '-cols',
      attribute: 'margin-right',
      addGutter: true,
    },
    {
      name: 'ml',
      suffix: '-cols',
      attribute: 'margin-left',
      addGutter: true,
    },
    {
      name: 'mx',
      suffix: '-cols',
      attribute: ['margin-right', 'margin-left'],
      addGutter: true,
    },
    {
      name: '-mr',
      suffix: '-cols',
      attribute: 'margin-right',
      inverse: true,
      addGutter: true,
    },
    {
      name: '-ml',
      suffix: '-cols',
      attribute: 'margin-left',
      inverse: true,
      addGutter: true,
    },
    {
      name: '-mx',
      suffix: '-cols',
      attribute: ['margin-right', 'margin-left'],
      inverse: true,
      addGutter: true,
    },
    {
      name: 'mr',
      suffix: '-cols-no-gutter',
      attribute: 'margin-right',
    },
    {
      name: 'ml',
      suffix: '-cols-no-gutter',
      attribute: 'margin-left',
      accountForContainerMarginLeft: true,
    },
    {
      name: 'mx',
      suffix: '-cols-no-gutter',
      attribute: ['margin-right', 'margin-left'],
    },
    {
      name: '-mr',
      suffix: '-cols-no-gutter',
      attribute: 'margin-right',
      inverse: true,
    },
    {
      name: '-ml',
      suffix: '-cols-no-gutter',
      attribute: 'margin-left',
      inverse: true,
    },
    {
      name: '-mx',
      suffix: '-cols-no-gutter',
      attribute: ['margin-right', 'margin-left'],
      inverse: true,
    },
    {
      name: 'pr',
      suffix: '-cols',
      attribute: 'padding-right',
      addGutter: true,
    },
    {
      name: 'pl',
      suffix: '-cols',
      attribute: 'padding-left',
      addGutter: true,
    },
    {
      name: 'px',
      suffix: '-cols',
      attribute: ['padding-right', 'padding-left'],
      addGutter: true,
    },
    {
      name: 'pr',
      suffix: '-cols-no-gutter',
      attribute: 'padding-right',
    },
    {
      name: 'pl',
      suffix: '-cols-no-gutter',
      attribute: 'padding-left',
    },
    {
      name: 'px',
      suffix: '-cols-no-gutter',
      attribute: ['padding-right', 'padding-left'],
    },
    {
      name: 'left',
      suffix: '-cols',
      attribute: 'left',
      addGutter: true,
    },
    {
      name: 'right',
      suffix: '-cols',
      attribute: 'right',
      addGutter: true,
    },
    {
      name: 'inset-x',
      suffix: '-cols',
      attribute: ['right', 'left'],
      addGutter: true,
    },
    {
      name: 'left',
      suffix: '-cols-no-gutter',
      attribute: 'left',
    },
    {
      name: 'right',
      suffix: '-cols-no-gutter',
      attribute: 'right',
    },
    {
      name: 'inset-x',
      suffix: '-cols-no-gutter',
      attribute: ['right', 'left'],
    },
    {
      name: '-left',
      suffix: '-cols',
      attribute: 'left',
      addGutter: true,
      inverse: true,
    },
    {
      name: '-right',
      suffix: '-cols',
      attribute: 'right',
      addGutter: true,
      inverse: true,
    },
    {
      name: '-inset-x',
      suffix: '-cols',
      attribute: ['right', 'left'],
      addGutter: true,
      inverse: true,
    },
    {
      name: '-left',
      suffix: '-cols-no-gutter',
      attribute: 'left',
      inverse: true,
    },
    {
      name: '-right',
      suffix: '-cols-no-gutter',
      attribute: 'right',
      inverse: true,
    },
    {
      name: '-inset-x',
      suffix: '-cols-no-gutter',
      attribute: ['right', 'left'],
      inverse: true,
    },
    {
      name: 'me',
      suffix: '-cols',
      attribute: 'margin-inline-end',
      addGutter: true,
    },
    {
      name: 'ms',
      suffix: '-cols',
      attribute: 'margin-inline-start',
      addGutter: true,
    },
    {
      name: '-me',
      suffix: '-cols',
      attribute: 'margin-inline-end',
      inverse: true,
      addGutter: true,
    },
    {
      name: '-ms',
      suffix: '-cols',
      attribute: 'margin-inline-start',
      inverse: true,
      addGutter: true,
    },
    {
      name: 'me',
      suffix: '-cols-no-gutter',
      attribute: 'margin-inline-end',
    },
    {
      name: 'ms',
      suffix: '-cols-no-gutter',
      attribute: 'margin-inline-start',
      accountForContainerMarginLeft: true,
    },
    {
      name: '-me',
      suffix: '-cols-no-gutter',
      attribute: 'margin-inline-end',
      inverse: true,
    },
    {
      name: '-ms',
      suffix: '-cols-no-gutter',
      attribute: 'margin-inline-start',
      inverse: true,
    },
    {
      name: 'pe',
      suffix: '-cols',
      attribute: 'padding-right',
      addGutter: true,
    },
    {
      name: 'ps',
      suffix: '-cols',
      attribute: 'padding-left',
      addGutter: true,
    },
    {
      name: 'pe',
      suffix: '-cols-no-gutter',
      attribute: 'padding-right',
    },
    {
      name: 'ps',
      suffix: '-cols-no-gutter',
      attribute: 'padding-left',
    },
    {
      name: 'start',
      suffix: '-cols',
      attribute: 'inset-inline-start',
      addGutter: true,
    },
    {
      name: 'end',
      suffix: '-cols',
      attribute: 'inset-inline-end',
      addGutter: true,
    },
    {
      name: 'start',
      suffix: '-cols-no-gutter',
      attribute: 'inset-inline-start',
    },
    {
      name: 'end',
      suffix: '-cols-no-gutter',
      attribute: 'inset-inline-end',
    },
    {
      name: '-start',
      suffix: '-cols',
      attribute: 'inset-inline-start',
      addGutter: true,
      inverse: true,
    },
    {
      name: '-end',
      suffix: '-cols',
      attribute: 'inset-inline-end',
      addGutter: true,
      inverse: true,
    },
    {
      name: '-start',
      suffix: '-cols-no-gutter',
      attribute: 'inset-inline-start',
      inverse: true,
    },
    {
      name: '-end',
      suffix: '-cols-no-gutter',
      attribute: 'inset-inline-end',
      inverse: true,
    },
  ];

  // makes CSS classes with calcs
  function generateClasses(variant, obj, calc, cCalc, vwCalc) {
    let attrs = {};
    let cAttrs = {};
    let vwAttrs = {};

    if (obj.addGutter) {
      calc = `((${calc}) + var(--inner-gutter))`;
      cCalc = `((${cCalc}) + (2 * var(--inner-gutter)))`;
    }

    if (obj.accountForContainerMarginLeft) {
      // for when you have a margin-left inside of a cols-container
      // need to account for the cols-container negative margin left
      cCalc = `((${cCalc}) + var(--inner-gutter))`;
    }

    if (obj.inverse) {
      calc = `(${calc}) * -1`;
      cCalc = `(${cCalc}) * -1`;
      vwCalc = `(${vwCalc}) * -1`;
    }

    if (Array.isArray(obj.attribute)) {
      obj.attribute.forEach((attr) => {
        attrs[attr] = `calc(${calc})`;
        cAttrs[attr] = `calc(${cCalc})`;
        vwAttrs[attr] = `calc(${vwCalc})`;
      });
    } else {
      attrs[obj.attribute] = `calc(${calc})`;
      cAttrs[obj.attribute] = `calc(${cCalc})`;
      vwAttrs[obj.attribute] = `calc(${vwCalc})`;
    }

    styles.push({
      [`${prefix('.' + e(obj.name + '-' + variant + (obj.suffix || '')))}`]:
        attrs,
      [`${prefix('.cols-container')} > ${prefix(
        '.' + e(obj.name + '-' + variant + (obj.suffix || ''))
      )}`]: cAttrs,
      [`${prefix('.' + e(obj.name + '-' + variant + (obj.suffix || '')))}-vw`]:
        vwAttrs,
    });
  }

  // loops the classes we want to generate, provides the base CSS calcs to generateClasses for N cols wide classes
  function generateByColumn(cols) {
    classes.forEach((obj) => {
      let calc = `((${cols} / var(--container-grid-columns, var(--grid-columns))) * 100%) - (var(--inner-gutter) - (${cols} / var(--container-grid-columns, var(--grid-columns)) * var(--inner-gutter)))`;
      let cCalc = `((${cols} / var(--container-grid-columns, var(--grid-columns))) * (100% - var(--inner-gutter))) - (var(--inner-gutter) - (${cols} / var(--container-grid-columns, var(--grid-columns)) * var(--inner-gutter)))`;
      let vwCalc = `((var(--container-width, 100vw - var(--scrollbar-visible-width, 0px)) - (((var(--grid-columns) - 1) * var(--inner-gutter)) + (2 * var(--outer-gutter)))) / (var(--grid-columns)))`;
      if (cols > 1) {
        vwCalc = `${vwCalc} * ${cols}`;
        vwCalc = `(${vwCalc}) + (${cols - 1} * var(--inner-gutter))`;
      }

      generateClasses(cols, obj, calc, cCalc, vwCalc);
    });
  }

  // nesting N cols wide columns needs an override to the --grid-columns to allow nesting of N cols wide columns
  function fixNesting(cols) {
    styles.push({
      [`${prefix('.w')}-${cols}-cols > *`]: {
        '--container-grid-columns': `${cols}`,
      },
      [`${prefix('.w')}-${cols}-cols-vw > *`]: {
        '--container-grid-columns': `${cols}`,
      },
    });
  }

  // loops the classes we want to generate, provides the base CSS calcs to generateClasses for fractional classes
  function generateByFraction(fraction) {
    const splitFraction = fraction.split('/');
    const numeric =
      Math.floor((splitFraction[0] / splitFraction[1]) * 1000) / 1000;
    const oneMinusNumeric =
      Math.floor((1 - splitFraction[0] / splitFraction[1]) * 1000) / 1000;
    const percent =
      Math.floor((splitFraction[0] / splitFraction[1]) * 100000) / 1000;

    classes.forEach((obj) => {
      let calc = `${percent}% - (var(--inner-gutter) * ${oneMinusNumeric})`;
      let cCalc = `${percent}% - var(--inner-gutter)`;

      generateClasses(fraction, obj, calc, cCalc);
    });
  }

  // base styles
  const styles = [
    {
      [prefix('.cols-container')]: {
        display: 'flex',
        'flex-flow': 'row wrap',
        'margin-left': 'calc(var(--inner-gutter) * -1)',
      },
      [`${prefix('.cols-container')} > ${prefix('[class*="-cols"]')}`]: {
        'margin-left': 'var(--inner-gutter)',
      },
      [`${prefix('.cols-container')} > ${prefix('.ml-0')}`]: {
        'margin-left': 0,
      },
    },
  ];

  // lets make classes for the N cols wide columns
  for (let i = 1; i <= maxColAmount; i++) {
    generateByColumn(i);
    fixNesting(i);
  }

  // lets make classes for fractionals
  fractions.forEach((fraction) => {
    generateByFraction(fraction);
  });

  addComponents(styles, {
    respectPrefix: false,
  });
};
