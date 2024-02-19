module.exports = function ({ addBase, theme, prefix, config }) {
  const className = prefix('.stroke-full');
  const prefixString = config('prefix');
  const borderColors = theme('borderColor', {});
  const borderStyles = [
    'none',
    'hidden',
    'dotted',
    'dashed',
    'solid',
    'double',
    'groove',
    'ridge',
    'inset',
    'outset',
  ];
  const borderThicknesses = theme('spacing', {});

  const styles = {
    [`[class*='${prefixString}stroke-full']`]: {
      '--stroke-full-thickness': '0.0625em',
      '--stroke-full-style': 'solid',
      '--stroke-full-color': 'inherit',
      position: 'relative',
    },
    [`[class*='${prefixString}stroke-full-']::after`]: {
      content: '""',
      position: 'absolute',
      'z-index': -1,
      left: '50%',
      top: 0,
      bottom: 0,
      width: '100vw',
      'margin-left': '-50vw',
      'pointer-events': 'none',
    },
    [`${className}-top::after`]: {
      bottom: '100%',
      'border-bottom':
        'var(--stroke-full-thickness, 0.0625em) var(--stroke-full-style, solid) var(--stroke-full-color, inherit)',
    },
    [`${className}-bottom::after`]: {
      top: '100%',
      'border-top':
        'var(--stroke-full-thickness, 0.0625em) var(--stroke-full-style, solid) var(--stroke-full-color, inherit)',
    },
    [`${className}-none::before`]: {
      content: 'none',
    },
  };

  Object.entries(borderColors).map((borderColor) => {
    const [name, color] = borderColor;
    styles[`${className}-${name}`] = {
      '--stroke-full-color': color,
    };
  });

  borderStyles.forEach((style) => {
    styles[`${className}-${style}`] = {
      '--stroke-full-style': style,
    };
  });

  Object.entries(borderThicknesses).map((thicknesses) => {
    const [name, weight] = thicknesses;
    styles[`${className}-${name}`] = {
      '--stroke-full-thickness': weight,
    };
  });

  addBase(styles);
};
