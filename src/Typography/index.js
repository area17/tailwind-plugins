module.exports = function ({ addBase, theme, prefix, e }) {
  const breakpoints = theme('screens', {});
  const fontFamilies = theme('fontFamilies', {});
  const typesets = theme('typesets', {});
  const firstBp = Object.keys(breakpoints)[0];

  const styles = {};
  styles[':root'] = {};

  Object.entries(fontFamilies).forEach((a) => {
    const [name, family] = a;
    styles[':root'][`--${name}`] = family;
  });

  // make class name objects
  Object.entries(typesets).forEach((a) => {
    const [name, typo] = a;
    //const className = prefix(`.f-${name}`);
    const className = `.f-${name}`;
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
    //const className = prefix(`.f-${name}`);
    const className = `.f-${name}`;
    let setBoldWeight = false;
    let firstBpSettings = {};

    // loop
    Object.entries(typo).forEach((b) => {
      const [bp, settings] = b;

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
          firstBpSettings[property] = `var(--f-${name}-${property})`;
        }
        settings[`--f-${name}-${property}`] = setting;
        delete settings[property];
      });

      // set styles
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

    firstBpSettings[`b, strong`] = {
      'font-weight': `var(--f-${name}---bold-weight, bold)`,
    };

    // apply responsive font classes
    Object.keys(breakpoints).forEach((bp) => {
      if (bp !== firstBp) {
        let bpClassName = e(`${bp}:f-${name}`);
        styles[`@screen ${bp}`][`.${bpClassName}`] = {
          all: 'initial',
          '--bold-weight': `var(--f-${name}---bold-weight, bold)`,
          '--foo': 'bar',
          ...firstBpSettings,
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
