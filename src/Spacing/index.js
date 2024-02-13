module.exports = function ({ addBase, theme, prefix }) {
  const spacingGroups = theme('spacingGroups', {});
  const themeCssSpacingProps = theme('spacingGroupProperties', {});
  const cssSpacingProps = {
    m: ['margin'],
    mt: ['margin-top'],
    mb: ['margin-bottom'],
    mr: ['margin-right'],
    ml: ['margin-left'],
    mx: ['margin-left', 'margin-right'],
    my: ['margin-top', 'margin-bottom'],
    p: ['padding'],
    pt: ['padding-top'],
    pb: ['padding-bottom'],
    pr: ['padding-right'],
    pl: ['padding-left'],
    px: ['padding-left', 'padding-right'],
    py: ['padding-top', 'padding-bottom'],
    gap: ['gap'],
    'gap-x': ['column-gap'],
    'gap-y': ['row-gap'],
    top: ['top'],
    bottom: ['bottom'],
    left: ['left'],
    right: ['right'],
    inset: ['inset'],
    'inset-x': ['inset-x'],
    'inset-y': ['inset-y'],
    ...themeCssSpacingProps,
  };
  const breakpoints = theme('screens');
  const firstBp = Object.keys(breakpoints)[0];
  const rootStyles = {
    ':root': {},
  };
  const spacingStyles = {};

  // create root bp keys in bp order
  Object.keys(breakpoints).forEach((bp) => {
    if (bp !== firstBp) {
      rootStyles[`@screen ${bp}`] = { ':root': {} };
    }
  });

  // fill in root bp sizing info and make classes
  Object.entries(spacingGroups).forEach((group) => {
    const [name, spacings] = group;
    Object.entries(spacings).forEach((spacing) => {
      let [bp, space] = spacing;
      space = parseInt(space, 10) / 16 + 'rem';
      if (bp === firstBp) {
        rootStyles[':root'][`--spacing-${name}`] = space;
        // create utility class
        Object.entries(cssSpacingProps).forEach((spacingProp) => {
          const [propName, cssProps] = spacingProp;
          const className = prefix(`.${propName}-${name}`);
          spacingStyles[className] = spacingStyles[className] || {};
          cssProps.forEach((prop) => {
            spacingStyles[className][prop] = `var(--spacing-${name})`;
          });
          // negative margins
          if (propName.indexOf('m') > -1) {
            const classNameNegative = prefix(`.-${propName}-${name}`);
            spacingStyles[classNameNegative] =
              spacingStyles[classNameNegative] || {};
            cssProps.forEach((prop) => {
              spacingStyles[classNameNegative][prop] =
                `calc(var(--spacing-${name}) * -1)`;
            });
          }
        });
      } else {
        rootStyles[`@screen ${bp}`][':root'][`--spacing-${name}`] = space;
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

  // add
  addBase(rootStyles);
  addBase(spacingStyles);
};
