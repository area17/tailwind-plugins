const getFirstBp = require('../util/getFirstBp');

module.exports = function({ addBase, theme }) {
  const spacingGroups = theme('spacingGroups', {});
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
    py: ['padding-top', 'padding-bottom']
  }
  const firstBp = getFirstBp(theme);
  const rootStyles = {
    ':root': {}
  };
  const spacingStyles = {};

  Object.entries(spacingGroups).forEach(group => {
    const [name, spacings] = group;
    Object.entries(spacings).forEach(spacing => {
      const [bp, space] = spacing;
      if (bp === firstBp) {
        rootStyles[':root'][`--spacing-${ name }`] = space;
        // create utility class
        Object.entries(cssSpacingProps).forEach(spacingProp => {
          const [prefix, cssProps] = spacingProp;
          spacingStyles[`.${prefix}-${name}`] = spacingStyles[`.${prefix}-${name}`] || {};
          cssProps.forEach(prop => {
            spacingStyles[`.${prefix}-${name}`][prop] = `var(--spacing-${name})`;
          });
          // negative margins
          if (prefix.indexOf('m') > -1) {
            spacingStyles[`.-${prefix}-${name}`] = spacingStyles[`.-${prefix}-${name}`] || {};
            cssProps.forEach(prop => {
              spacingStyles[`.-${prefix}-${name}`][prop] = `calc(var(--spacing-${name}) * -1)`;
            });
          }
        });
      } else {
        rootStyles[`@screen ${bp}`] = rootStyles[`@screen ${bp}`] || { ':root': {} };
        rootStyles[`@screen ${bp}`][':root'][`--spacing-${ name }`] = space;
      }
    });
  });

  addBase(rootStyles);
  addBase(spacingStyles);
};
