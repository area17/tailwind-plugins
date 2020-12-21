module.exports = function({ addComponents, theme }) {
  const breakpoints = theme('screens');
  const firstBp = Object.keys(breakpoints)[0];

  const typoStyles = Object.entries(typography.sets).map(a => {
    const [name, typo] = a;
    const className = `.f-${name}`;

    return Object.entries(typo.settings).map(b => {
      const [bp, settings] = b;
      if (bp === firstBp) {
        return {
          [className]: {
            ...typo.settings[firstBp]
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

  addComponents(typoStyles);
};
