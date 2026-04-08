const plugin = require('tailwindcss/plugin');

module.exports = plugin(function ({ addBase, addUtilities, theme }) {
  const themes = theme('colorThemes', {});
  const colors = theme('colors', {});

  const tokens = colors;
  const textColors = theme('textColor', {});
  const bgColors = theme('backgroundColor', {});
  const borderColors = theme('borderColor', {});
  const outlineColors = theme('outlineColor', {});
  const divideColors = theme('divideColor', {});
  const ringColors = theme('ringColor', {});
  const ringOffsetColors = theme('ringOffsetColor', {});
  const underlineColors = theme('underlineColor', {});

  const baseStyles = {
    ':root': Object.fromEntries(
      Object.entries(tokens).map(([name, value]) => [`--${name}`, value])
    ),
  };

  Object.entries(themes).forEach(([themeName, groups]) => {
    baseStyles[`.theme-${themeName}`] = getThemeRules(groups);
  });

  const utilities = {
    ...buildUtilities('text', textColors, 'color', 'text'),
    ...buildUtilities('bg', bgColors, 'background-color', 'background'),
    ...buildUtilities('border', borderColors, 'border-color', 'border'),
    ...buildUtilities('outline', outlineColors, 'outline-color', 'border'),
    ...buildUtilities('divide', divideColors, '--tw-divide-color', 'border'),
    ...buildUtilities('ring', ringColors, '--tw-ring-color', 'ring'),
    ...buildUtilities(
      'ring-offset',
      ringOffsetColors,
      '--tw-ring-offset-color',
      'border'
    ),
    ...buildUtilities(
      'underline',
      underlineColors,
      'text-decoration-color',
      'text'
    ),
  };

  addBase(baseStyles);
  addUtilities(
    Object.fromEntries(
      Object.entries(utilities).map(([selector, styles]) => [
        `[class*="theme-"] ${selector}`,
        styles,
      ])
    )
  );

  function buildUtilities(prefix, values, cssProperty, variableGroup) {
    return Object.fromEntries(
      Object.entries(values).map(([name, fallback]) => [
        `.${prefix}-${name}`,
        {
          [cssProperty]: `var(--${variableGroup}-${name}, ${resolveColor(fallback)})`,
        },
      ])
    );
  }

  function getThemeRules(groups) {
    const rules = {};

    Object.entries(groups).forEach(([usage, values]) => {
      Object.entries(values).forEach(([name, color]) => {
        rules[`--${usage}-${name}`] = resolveColor(color);
      });
    });

    return rules;
  }

  function resolveColor(color) {
    if (typeof color !== 'string') return color;

    // already a CSS value
    if (
      color.startsWith('var(') ||
      color.startsWith('#') ||
      color.startsWith('rgb') ||
      color.startsWith('hsl') ||
      color === 'transparent' ||
      color === 'currentColor'
    ) {
      return color;
    }

    // treat everything else as a token reference
    return `var(--${color})`;
  }
});
