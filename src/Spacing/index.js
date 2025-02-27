module.exports = function ({ addBase, matchUtilities, theme }) {
  const spacingGroups = theme('spacingGroups', {});
  const breakpoints = theme('screens');
  const firstBp = Object.keys(breakpoints)[0];
  const cssSpacingProps = {
    m: ['margin'],
    mt: ['margin-top'],
    mb: ['margin-bottom'],
    mr: ['margin-right'],
    ml: ['margin-left'],
    mx: ['margin-inline'],
    my: ['margin-block'],
    ms: ['margin-inline-start'],
    me: ['margin-inline-end'],
    p: ['padding'],
    pt: ['padding-top'],
    pb: ['padding-bottom'],
    pr: ['padding-right'],
    pl: ['padding-left'],
    ps: ['padding-inline-start'],
    pe: ['padding-inline-end'],
    px: ['padding-inline'],
    py: ['padding-block'],
    gap: ['gap'],
    'gap-x': ['column-gap'],
    'gap-y': ['row-gap'],
    top: ['top'],
    bottom: ['bottom'],
    left: ['left'],
    right: ['right'],
    start: ['inset-inline-start'],
    end: ['inset-inline-end'],
    inset: ['inset'],
    'inset-x': ['inset-inline'],
    'inset-y': ['inset-block'],
  };
  const rootStyles = {
    ':root': {},
  };

  // create root bp keys in bp order
  Object.keys(breakpoints).forEach((bp) => {
    if (bp !== firstBp) {
      rootStyles[`@media (width >= ${breakpoints[bp]})`] = { ':root': {} };
    }
  });

  // fill in root bp sizing info and make classes
  Object.entries(spacingGroups).forEach((group) => {
    const [name, spacings] = group;
    Object.entries(spacings).forEach((spacing) => {
      let [bp, space] = spacing;
      if (space && typeof space === 'number') {
        space = parseInt(space, 10) / 16 + 'rem';
      }
      if (bp === firstBp) {
        rootStyles[':root'][`--spacing-${name}`] = space;
      } else {
        rootStyles[`@media (width >= ${breakpoints[bp]})`][':root'][`--spacing-${name}`] = space;
      }
    });
  });

  // clean up empty keys
  Object.keys(rootStyles).forEach((key) => {
    if (
      key !== ':root' &&
      rootStyles[key][':root'] &&
      Object.keys(rootStyles[key][':root']).length === 0 &&
      rootStyles[key][':root'].constructor === Object
    ) {
      delete rootStyles[key];
    }
  });

  // add root styles
  addBase(rootStyles);

  // add utility classes
  const valuesCalc = () => {
    let obj = {};
    Object.keys(spacingGroups).forEach((group) => {
      obj[group] = group;
    });
    return obj;
  };
  const values = valuesCalc();
  const spacingStyles = {};

  function add(cssSelector, cssAttributes) {
    let selector = {};
    selector[`${cssSelector}`] = (value) => {
      if (value.indexOf('var(') > -1) {
        return {};
      }
      let negative = typeof(value) === 'string' && value.indexOf('calc') > -1;
      let attributes = {};

      if (negative) {
        value = value.replace(/calc\(/i, '');
        value = value.replace(/ \* -1\)/i, '');

        if (typeof(cssAttributes) === 'string') {
          attributes[cssAttributes] = `calc(var(--spacing-${value}) * -1)`;
        }

        if (typeof(cssAttributes) === 'object' && Array.isArray(cssAttributes)) {
          cssAttributes.forEach(cssAttribute => {
            attributes[cssAttribute] = `calc(var(--spacing-${value}) * -1)`;
          });
        }
      } else {
        if (typeof(cssAttributes) === 'string') {
          attributes[cssAttributes] = `var(--spacing-${value})`;
        }

        if (typeof(cssAttributes) === 'object' && Array.isArray(cssAttributes)) {
          cssAttributes.forEach(cssAttribute => {
            attributes[cssAttribute] = `var(--spacing-${value})`;
          });
        }
      }

      return attributes;
    };

    matchUtilities(selector, {
      values: values,
      supportsNegativeValues: true,
    });
  }

  Object.keys(cssSpacingProps).forEach(prop => {
    let attributes = cssSpacingProps[prop];
    add(prop, attributes);
  });
};
