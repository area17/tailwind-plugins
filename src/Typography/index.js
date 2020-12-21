module.exports = function({ addBase, theme }) {
  const breakpoints = theme('screens', {});
  const fontFamilies = theme('fontFamilies', {});
  const typesets = theme('typesets', {});
  const firstBp = Object.keys(breakpoints)[0];

  const families = Object.entries(fontFamilies).map(a => {
    const [name, family] = a;
    return {
      ':root': {
        [`--${ name }`]: family
      }
    }
  });

  const typoStyles = Object.entries(typesets).map(a => {
    const [name, typo] = a;
    const className = `.f-${name}`;

    return Object.entries(typo).map(b => {
      const [bp, settings] = b;
      if (bp === firstBp) {
        return {
          [className]: {
            ...settings
          }
        };
      } else {
        return {
          [`@screen ${bp}`]: {
            [className]: {
              ...settings
            }
          }
        };
      }
    });
  });

  addBase(families);
  addBase(typoStyles);
};
