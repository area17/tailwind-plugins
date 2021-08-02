module.exports = function({ addBase, theme }) {
  const breakpoints = theme('screens', {});
  const fontFamilies = theme('fontFamilies', {});
  const typesets = theme('typesets', {});
  const firstBp = Object.keys(breakpoints)[0];

  const families = Object.entries(fontFamilies).map((a) => {
    const [name, family] = a;
    return {
      ':root': {
        [`--${name}`]: family
      }
    };
  });

  const typoStyles = Object.entries(typesets).map((a) => {
    const [name, typo] = a;
    const className = `.f-${name}`;
    let setBoldWeight = false;

    return Object.entries(typo).map((b) => {
      const [bp, settings] = b;

      if (settings['font-size'] && (typeof settings['font-size'] === 'number' || settings['font-size'].match(/[0-9]$/ig) || settings['font-size'].match(/px$/ig))) {
        settings['font-size'] = (parseInt(settings['font-size'], 10) / 16) + 'rem';
      }

      if (settings['font-smoothing']) {
        const smoothing = settings['font-smoothing'];
        if (smoothing === 'true' || smoothing === 'on') {
          settings['-moz-osx-font-smoothing'] = 'grayscale';
          settings['-webkit-font-smoothing'] = 'antialiased';
        } else {
          settings['-moz-osx-font-smoothing'] = 'auto';
          settings['-webkit-font-smoothing'] = 'subpixel-antialiased';
        }
        delete settings['font-smoothing'];
      }

      if (settings['bold-weight']) {
        settings['--bold-weight'] = settings['bold-weight'];
          setBoldWeight = true;
          delete settings['bold-weight'];
      } else {
        setBoldWeight = false;
      }

      let styles = {};
      styles[className] = {
        ...settings
      };
      if (setBoldWeight) {
        styles[`${className} b, ${className} strong`] = {
          'font-weight': 'var(--bold-weight)'
        };
      }

      if (bp === firstBp) {
        return styles;
      } else {
        return {
          [`@screen ${bp}`]: {
            ...styles
          }
        };
      }
    });
  });

  addBase(families);
  addBase(typoStyles);
};
