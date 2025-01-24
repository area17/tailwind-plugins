module.exports = function ({ addBase, theme }) {
  const spacingGroups = theme('spacingGroups', {});
  const breakpoints = theme('screens');
  const firstBp = Object.keys(breakpoints)[0];
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
      space = parseInt(space, 10) / 16 + 'rem';
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

  // add
  addBase(rootStyles);
};
