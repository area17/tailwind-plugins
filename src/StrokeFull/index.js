module.exports = function ({ addBase, theme }) {
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

  let styles = {
    "[class*='stroke-full']": {
      '--stroke-full-thickness': '0.0625em',
      '--stroke-full-style': 'solid',
      '--stroke-full-color': 'inherit',
      position: 'relative',
    },
    "[class*='stroke-full-']::after": {
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
    '.stroke-full-top::after': {
      bottom: '100%',
      'border-bottom':
        'var(--stroke-full-thickness, 0.0625em) var(--stroke-full-style, solid) var(--stroke-full-color, inherit)',
    },
    '.stroke-full-bottom::after': {
      top: '100%',
      'border-top':
        'var(--stroke-full-thickness, 0.0625em) var(--stroke-full-style, solid) var(--stroke-full-color, inherit)',
    },
    '.stroke-full-none::before': {
      content: 'none',
    },
  };

  Object.entries(borderColors).map((borderColor) => {
    const [name, color] = borderColor;
    let className = `.stroke-full-${name}`;
    styles[className] = {
      '--stroke-full-color': color,
    };
  });

  borderStyles.forEach((style) => {
    let className = `.stroke-full-${style}`;
    styles[className] = {
      '--stroke-full-style': style,
    };
  });

  Object.entries(borderThicknesses).map((thicknesses) => {
    const [name, weight] = thicknesses;
    let className = `.stroke-full-${name}`;
    styles[className] = {
      '--stroke-full-thickness': weight,
    };
  });

  addBase(styles);
};
