module.exports = function ({ addBase, theme, prefix, e }) {
  const breakpoints = theme('screens', {});
  const fontFamilies = theme('fontFamilies', {});
  const typesets = theme('typesets', {});
  const firstBp = Object.keys(breakpoints)[0];

  const defaults = {
    'font-family': 'initial',
    'font-size': 'initial',
    'font-stretch': 'initial',
    'font-style': 'initial',
    'font-variant': 'initial',
    'font-weight': 'initial',
    'line-height': 'initial',
    'letter-spacing': 'initial',
    'font-feature-settings': 'initial',
    '-moz-osx-font-smoothing': 'initial',
    '-webkit-font-smoothing': 'initial',
    '--bold-weight': 'initial',
  };

  const styles = {};
  styles[':root'] = {};

  Object.entries(fontFamilies).forEach((a) => {
    const [name, family] = a;
    styles[':root'][`--${name}`] = family;
  });

  // make class name objects
  Object.entries(typesets).forEach((a) => {
    const [name, typo] = a;
    const className = prefix(`.f-${name}`);
    styles[className] = styles[className] || {};
  });

  // create root bp keys in bp order
  Object.keys(breakpoints).forEach((bp) => {
    if (bp !== firstBp && !styles[`@screen ${bp}`]) {
      styles[`@screen ${bp}`] = { ':root': {} };
    }
  });

  // now start to fill out those class name objects and breakpoints
  Object.entries(typesets).forEach((a) => {
    const [name, typo] = a;
    const className = prefix(`.f-${name}`);
    let setBoldWeight = false;

    // loop
    Object.entries(typo).forEach((b) => {
      let [bp, settings] = b;

      if (
        settings['font-size'] &&
        (typeof settings['font-size'] === 'number' ||
          settings['font-size'].match(/[0-9]$/gi) ||
          settings['font-size'].match(/px$/gi))
      ) {
        settings['font-size'] =
          parseInt(settings['font-size'], 10) / 16 + 'rem';
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

      // merge defaults with settings
      if (bp === firstBp) {
        settings = {
          ...defaults,
          ...settings,
        };
      }

      // generate class styles, set first BP settings, rename settings keys to vars
      Object.entries(settings).forEach((c) => {
        let [property, setting] = c;
        if (typeof setting) {
          // unitless number settings where incorrectly being converted to pixels by Tailwind
          setting = `${setting}`;
        }
        if (bp === firstBp) {
          styles[className][property] = `var(--f-${name}-${property})`;
          styles[`${className} b, ${className} strong`] = {
            'font-weight': `var(--f-${name}---bold-weight, bold)`,
          };
        }
        settings[`--f-${name}-${property}`] = setting;
        delete settings[property];
      });

      // set root styles, which describe the actual font settings
      if (bp === firstBp) {
        styles[':root'] = {
          ...styles[':root'],
          ...settings,
        };
      } else {
        styles[`@screen ${bp}`][':root'] = {
          ...styles[`@screen ${bp}`][':root'],
          ...settings,
        };
      }
    });
  });

  // clean up empty keys
  Object.keys(styles).forEach((key) => {
    if (
      key !== ':root' &&
      styles[key][':root'] &&
      Object.keys(styles[key][':root']).length === 0 &&
      styles[key][':root'].constructor === Object
    ) {
      delete styles[key];
    }
  });

  addBase(styles);
};
