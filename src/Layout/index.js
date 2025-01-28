module.exports = function ({ matchUtilities, theme }) {
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
  const valuesCalc = () => {
    let obj = {};
    for (i = 1; i < maxColAmount + 1; i++) {
      obj[i] = i;
    }
    return obj;
  };
  const values = valuesCalc();
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
  ];

  function returnCalc(type, cols) {
    let calc = `((${cols} / var(--container-grid-columns, var(--grid-columns))) * 100%) - (var(--inner-gutter) - (${cols} / var(--container-grid-columns, var(--grid-columns)) * var(--inner-gutter)))`;
    let cCalc = `((${cols} / var(--container-grid-columns, var(--grid-columns))) * (100% - var(--inner-gutter))) - (var(--inner-gutter) - (${cols} / var(--container-grid-columns, var(--grid-columns)) * var(--inner-gutter)))`;
    let vwCalc = `((var(--container-width, 100vw - var(--scrollbar-visible-width, 0px)) - (((var(--grid-columns) - 1) * var(--inner-gutter)) + (2 * var(--outer-gutter)))) / (var(--grid-columns)))`;

    if (cols > 1) {
      vwCalc = `${vwCalc} * ${cols}`;
      vwCalc = `(${vwCalc}) + (${cols - 1} * var(--inner-gutter))`;
    }

    if (type.addGutter) {
      calc = `((${calc}) + var(--inner-gutter))`;
      cCalc = `((${cCalc}) + (2 * var(--inner-gutter)))`;
    }

    if (type.accountForContainerMarginLeft) {
      // for when you have a margin-left inside of a cols-container
      // need to account for the cols-container negative margin left
      cCalc = `((${cCalc}) + var(--inner-gutter))`;
    }

    // return
    if (type.calcType === 'cCalc') {
      return cCalc;
    }

    if (type.calcType === 'vwCalc') {
      return vwCalc;
    }

    return calc;
  }

  function add(type) {
    let name = `${type.name}${type.suffix}${type.calcType === 'vwCalc'?'-vw':''}`;
    let selector = {};
    selector[`${name}`] = (cols) => {
      let attributes = {};
      attributes[type.attribute] = `calc(${returnCalc(type, cols)})`;
      return attributes;
    };
    matchUtilities(selector, {
      values: values,
      supportsNegativeValues: type.allowsNegative ? true : false,
    });
  }

  classes.forEach(type => {
    ['calc', 'cCalc', 'vwCalc'].forEach(calcType => {
      if (typeof(type.attribute) === 'string') {
        add({
          ...type,
          calcType: calcType,
        });
      } else {
        type.attribute.forEach(attribute => {
          add({
            ...type,
            attribute: attribute,
            calcType: calcType,
          });
        });
      }
    });
  });
};
