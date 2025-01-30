module.exports = function ({ matchComponents, addComponents, theme, prefix }) {
  // docs: http://tailwind-plugins.dev.area17.com/Layout.html

  const e = (str) => {
    str = str.replace(/\\,/g, '\\2c ');
    str = str.replace(/\//g, '\\/');
    str = str.replace(/\(/g, '\\(');
    str = str.replace(/\)/g, '\\)');
    return str;
  };
  const breakpoints = theme('screens');
  const firstBp = Object.keys(breakpoints)[0];
  const columnCount = theme('columnCount', {});
  const maxCols = theme('maxGridCols', columnCount);
  const maxColAmount = Math.max.apply(Math, Object.values(maxCols));
  // the fractional classes we're going to generate
  const fractions = ['1/2', '1/3', '1/4', '2/3', '3/4'];
  const valuesCalc = () => {
    let obj = {};
    for (i = 1; i < maxColAmount + 1; i++) {
      obj[i] = i;
    }
    fractions.forEach(fraction => {
      obj[fraction] = fraction;
    });
    return obj;
  };
  const values = valuesCalc();
  // the classes we want to generate, along with some information to help fill out the CSS calc
  const classes = [
    /* width */
    {
      name: 'w',
      suffix: '-cols',
      attribute: 'width',
      addMarginLeft: true,
    },
    /* margins */
    {
      name: 'me',
      suffix: '-cols',
      attribute: 'margin-inline-end',
      addGutter: true,
      allowsNegative: true,
    },
    {
      name: 'ms',
      suffix: '-cols',
      attribute: 'margin-inline-start',
      addGutter: true,
      allowsNegative: true,
    },
    {
      name: 'mr',
      suffix: '-cols',
      attribute: 'margin-right',
      addGutter: true,
      allowsNegative: true,
    },
    {
      name: 'ml',
      suffix: '-cols',
      attribute: 'margin-left',
      addGutter: true,
      allowsNegative: true,
    },
    {
      name: 'mx',
      suffix: '-cols',
      attribute: 'margin-inline',
      addGutter: true,
      allowsNegative: true,
    },
    /* margins - no gutter */
    {
      name: 'me',
      suffix: '-cols-no-gutter',
      attribute: 'margin-inline-end',
      addGutter: false,
      allowsNegative: true,
    },
    {
      name: 'ms',
      suffix: '-cols-no-gutter',
      attribute: 'margin-inline-start',
      //accountForContainerMarginLeft: true,
      addGutter: false,
      allowsNegative: true,
    },
    {
      name: 'mr',
      suffix: '-cols-no-gutter',
      attribute: 'margin-right',
      addGutter: false,
      allowsNegative: true,
    },
    {
      name: 'ml',
      suffix: '-cols-no-gutter',
      attribute: 'margin-left',
      //accountForContainerMarginLeft: true,
      addGutter: false,
      allowsNegative: true,
    },
    {
      name: 'mx',
      suffix: '-cols-no-gutter',
      attribute: 'margin-inline',
      addGutter: false,
      allowsNegative: true,
    },
    /* paddings */
    {
      name: 'pe',
      suffix: '-cols',
      attribute: 'padding-inline-end',
      addGutter: true,
    },
    {
      name: 'ps',
      suffix: '-cols',
      attribute: 'padding-inline-start',
      addGutter: true,
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
      attribute: 'padding-inline',
      addGutter: true,
    },
    /* paddings - no gutter */
    {
      name: 'pe',
      suffix: '-cols-no-gutter',
      attribute: 'padding-inline-end',
    },
    {
      name: 'ps',
      suffix: '-cols-no-gutter',
      attribute: 'padding-inline-start',
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
      attribute: 'padding-inline',
    },
    /* positioning */
    {
      name: 'start',
      suffix: '-cols',
      attribute: 'inset-inline-start',
      addGutter: true,
      allowsNegative: true,
    },
    {
      name: 'end',
      suffix: '-cols',
      attribute: 'inset-inline-end',
      addGutter: true,
      allowsNegative: true,
    },
    {
      name: 'left',
      suffix: '-cols',
      attribute: 'left',
      addGutter: true,
      allowsNegative: true,
    },
    {
      name: 'right',
      suffix: '-cols',
      attribute: 'right',
      addGutter: true,
      allowsNegative: true,
    },
    {
      name: 'inset-x',
      suffix: '-cols',
      attribute: 'inset-inline',
      addGutter: true,
      allowsNegative: true,
    },
    /* positioning - no gutter */
    {
      name: 'start',
      suffix: '-cols-no-gutter',
      attribute: 'inset-inline-start',
      allowsNegative: true,
    },
    {
      name: 'end',
      suffix: '-cols-no-gutter',
      attribute: 'inset-inline-end',
      allowsNegative: true,
    },
    {
      name: 'left',
      suffix: '-cols-no-gutter',
      attribute: 'left',
      allowsNegative: true,
    },
    {
      name: 'right',
      suffix: '-cols-no-gutter',
      attribute: 'right',
      allowsNegative: true,
    },
    {
      name: 'inset-x',
      suffix: '-cols-no-gutter',
      attribute: 'inset-inline',
      allowsNegative: true,
    },
  ];

  function returnCalc(type, cols) {
    if (type.fraction) {
      const splitFraction = cols.split('/');
      const numeric =
        Math.floor((splitFraction[0] / splitFraction[1]) * 1000) / 1000;
      const oneMinusNumeric =
        Math.floor((1 - splitFraction[0] / splitFraction[1]) * 1000) / 1000;
      const percent =
        Math.floor((splitFraction[0] / splitFraction[1]) * 100000) / 1000;

      //let calc = `${percent}% - (var(--inner-gutter) * ${oneMinusNumeric})`;
      // adds `--cols-container` var to work within `cols-container` -- v5.0.0 deprecate to remove in v6.0.0
      let calc = `${percent}% - (var(--inner-gutter) * max(${oneMinusNumeric}, var(--cols-container, 0)))`;

      if (type.addGutter) {
        calc = `((${calc}) + var(--inner-gutter))`;
      }

      return calc;
    }

    if (type.negative) {
      // find the passed cols num
      var match = cols.match(/\d+/);
      cols = parseInt(match[0], 10);
    }

    //let calc = `((${cols} / var(--container-grid-columns, var(--grid-columns))) * 100%) - (var(--inner-gutter) - (${cols} / var(--container-grid-columns, var(--grid-columns)) * var(--inner-gutter)))`;
    // adds `--cols-container` var to work within `cols-container` -- v5.0.0 deprecate to remove in v6.0.0
    let calc = `((${cols} / var(--container-grid-columns, var(--grid-columns))) * (100% - (var(--inner-gutter) * var(--cols-container, 0)))) - (var(--inner-gutter) - (${cols} / var(--container-grid-columns, var(--grid-columns)) * var(--inner-gutter)))`;
    let vwCalc = `((var(--container-width, 100vw - var(--scrollbar-visible-width, 0px)) - (((var(--grid-columns) - 1) * var(--inner-gutter)) + (2 * var(--outer-gutter)))) / (var(--grid-columns)))`;

    if (cols > 1) {
      vwCalc = `${vwCalc} * ${cols}`;
      vwCalc = `(${vwCalc}) + (${cols - 1} * var(--inner-gutter))`;
    }

    if (type.addGutter) {
      calc = `((${calc}) + var(--inner-gutter))`;
    }

    if (type.negative) {
      calc = `(${calc}) * -1`;
      vwCalc = `(${vwCalc}) * -1`;
    }

    // return
    if (type.calcType === 'vwCalc') {
      return vwCalc;
    }

    return calc;
  }

  function add(type) {
    let name = `${type.name}${type.suffix}`;

    if (type.calcType === 'vwCalc') {
      name += '-vw';
    }

    let selector = {};
    selector[`${name}`] = (cols) => {
      type.fraction = typeof(cols) === 'string' && cols.indexOf('/') > -1;
      type.negative = typeof(cols) === 'string' && cols.indexOf('calc') > -1;

      let attributes = {};
      if (typeof(type.attribute) === 'string') {
        attributes[type.attribute] = `calc(${returnCalc(type, cols)})`;
      }
      if (typeof(type.attribute) === 'object' && Array.isArray(type.attribute)) {
        type.attribute.forEach(attribute => {
          attributes[attribute] = `calc(${returnCalc(type, cols)})`;
        });
      }
      return attributes;
    };

    matchComponents(selector, {
      values: values,
      supportsNegativeValues: type.allowsNegative ? true : false,
    });
  }

  classes.forEach(type => {
    ['calc', 'vwCalc'].forEach(calcType => {
      add({
        ...type,
        calcType: calcType,
      });
    });
  });

  // fix nesting
  // nesting N cols wide columns needs an override to the --grid-columns to allow nesting of N cols wide columns
  let styles = {};

  function fixNesting(cols) {
    return {
      [`.w-cols-${cols}`]: {
        '& > *': {
          '--container-grid-columns': `${cols}`,
          '--cols-container': 0,
        },
      },
      [`.w-cols-vw-${cols}`]: {
        '& > *': {
          '--container-grid-columns': `${cols}`,
          '--cols-container': 0,
        },
      },
    };
  }

  for (let i = 1; i <= maxColAmount; i++) {
    styles = {...styles, ...fixNesting(i)};
  }


  // add .cols-container
  styles['.cols-container'] = {
    display: 'flex',
    'flex-flow': 'row wrap',
    'margin-left': 'calc(var(--inner-gutter) * -1)',
    '& > [class*="-cols"]': {
      '--cols-container': 1,
      'margin-left': 'var(--inner-gutter)',
    },
    '& > .ml-0': {
      'margin-left': 0,
    },
    '& > .ms-0': {
      'margin-left': 0,
    },
  }

  addComponents(styles);
};
