module.exports = function ({ addBase, theme, prefix, e }) {
  const breakpoints = theme('screens', {});
  const fontFamilies = theme('fontFamilies', {});
  const typesets = JSON.parse(JSON.stringify(theme('typesets', {})));
  const firstBp = Object.keys(breakpoints)[0];
  const defaults = {}; // will be a collection of all used css properties, so we can override
  const styles = {};
  styles[':root'] = {};

  Object.entries(fontFamilies).forEach((a) => {
    const [name, family] = a;
    styles[':root'][`--${name}`] = family;
  });

  // make class name objects
  Object.entries(typesets).forEach((a) => {
    const name = a[0];
    const className = prefix(`.f-${name}`);
    styles[className] = styles[className] || {};
  });

  // create root bp keys in bp order
  Object.keys(breakpoints).forEach((bp) => {
    if (bp !== firstBp && !styles[`@screen ${bp}`]) {
      styles[`@screen ${bp}`] = { ':root': {} };
    }
  });

  // process settings
  // clean up entry, gather all used properties for defaults
  Object.entries(typesets).forEach((a) => {
    const [name, typo] = a;

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
        delete settings['bold-weight'];
      }

      // process settings
      Object.entries(settings).forEach((c) => {
        let [property, setting] = c;
        if (typeof setting) {
          // unitless number settings where incorrectly being converted to pixels by Tailwind
          setting = `${setting}`;
        }
        // update namespace property names
        if (property.indexOf(`--f-${name}-`) === -1) {
          settings[`--f-${name}-${property}`] = setting;
          delete settings[property];
        }

        defaults[property] = 'initial';
      });
    });
  });

  // now start to fill out those class name objects and breakpoints
  // make class properties and root properties (for output)
  Object.entries(typesets).forEach((a) => {
    const [name, typo] = a;
    const className = prefix(`.f-${name}`);

    Object.entries(typo).forEach((b) => {
      let [bp, settings] = b;

      if (bp === firstBp) {
        // generate root styles
        styles[':root'] = {
          ...styles[':root'],
          ...settings,
        };
        // generate css classes
        const classSettings = {
          ...defaults,
          ...settings,
        };
        Object.entries(classSettings).forEach((c) => {
          let property = c[0];
          // don't assign variables inside the class
          if (property.startsWith('--')) {
            return;
          }
          styles[className][property] = `var(--f-${name}-${property})`;
          styles[`${className} b, ${className} strong`] = {
            'font-weight': `var(--f-${name}---bold-weight, bold)`,
          };
        });
      } else {
        // generate responsive root styles
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
