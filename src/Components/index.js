module.exports = function ({ addComponents, theme }) {
  const components = theme('components', {});
  const breakpoints = theme('screens', {});

  const styles = {};

  function clearEmpties(o) {
    for (var k in o) {
      if (!o[k] || typeof o[k] !== 'object') {
        continue; // If null or not an object, skip to the next iteration
      }

      // The property is an object
      clearEmpties(o[k]); // <-- Make a recursive call on the nested object
      if (Object.keys(o[k]).length === 0) {
        delete o[k]; // The object had no properties, so delete that property
      }
    }
    return o;
  }

  function loopSelectors(selectors, base, breakpoint) {
    Object.entries(selectors).map((s) => {
      const [subselectorName, subselectorSettings] = s;
      processSelector(subselectorName, subselectorSettings, base, breakpoint);
    });
  }

  function processSelector(selector, settings, base, breakpoint) {
    // sort out CSS selector
    let componentStyles = {};
    let selectors = selector.split(',');
    if (base) {
      selectors = selectors.map((n) => {
        n = n.trim();
        if (n.indexOf(':') === 0) {
          return `${base}${n}`;
        } else {
          return `${base} ${n}`;
        }
      });
    } else {
      selectors = selectors.map((n) => (n = `${n.trim()}`));
    }
    selector = selectors.join(',');

    if (breakpoint) {
      styles[selector] = styles[selector] || {};
      let stylesSelector = styles[selector];
      stylesSelector[`@media (min-width: ${breakpoints[breakpoint]})`] =
        stylesSelector[`@media (min-width: ${breakpoints[breakpoint]})`] || {};
      componentStyles =
        stylesSelector[`@media (min-width: ${breakpoints[breakpoint]})`];
    } else {
      styles[selector] = styles[selector] || {};
      componentStyles = styles[selector];
    }

    // if settings is a string, apply them
    if (typeof settings === 'string') {
      componentStyles[`@apply ${settings}`] = '';
      return;
    }

    // apply anything to this selector
    if (settings.apply) {
      componentStyles[`@apply ${settings.apply}`] = '';
    }

    // apply any attributes to this selector
    if (settings.attributes) {
      Object.entries(settings.attributes).map((a) => {
        const [attribute, value] = a;
        componentStyles[attribute] = value;
      });
    }

    // loop this selectors children
    if (settings.selectors) {
      selector.split(',').forEach((s) => {
        loopSelectors(settings.selectors, s, breakpoint);
      });
    }

    // apply any media queries to this selector
    if (settings.breakpoints) {
      Object.entries(settings.breakpoints).map((b) => {
        const [breakpointName, breakpointSettings] = b;
        if (breakpoints[breakpointName]) {
          processSelector(selector, breakpointSettings, base, breakpointName);
        }
      });
    }

    // apply variants
    if (settings.variants) {
      Object.entries(settings.variants).map((v) => {
        const [variantName, variantSettings] = v;
        variantSelectors = selectors.map(
          (n) => (n = `${n.trim()}-${variantName}`)
        );
        processSelector(
          variantSelectors.join(','),
          variantSettings,
          base,
          breakpoint
        );
      });
    }
  }

  // loop components
  loopSelectors(components);

  addComponents(clearEmpties(styles));
};
