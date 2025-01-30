module.exports = function ({ matchUtilities, addUtilities, theme, prefix, config }) {
  const className = prefix('.stroke-full');
  const prefixString = config('prefix');
  const borderColors = theme('borderColor', {});
  const borderStyles = {
    'none': 'none',
    'hidden': 'hidden',
    'dotted': 'dotted',
    'dashed': 'dashed',
    'solid': 'solid',
    'double': 'double',
    'groove': 'groove',
    'ridge': 'ridge',
    'inset': 'inset',
    'outset': 'outset',
  };
  const borderThicknesses = {};

  for (i = 1; i <= 100; i++) {
    borderThicknesses[i] = `${i}px`;
  }

  const styles = {
    [`${className}-top, ${className}-bottom`]: {
      '--stroke-full-thickness': '0.0625em',
      '--stroke-full-style': 'solid',
      '--stroke-full-color': 'inherit',
      position: 'relative',
    },
    [`${className}-top::after`]: {
      content: '""',
      position: 'absolute',
      'z-index': -1,
      'inset-inline-start': '50%',
      top: 0,
      bottom: '100%',
      width: '100vw',
      'margin-inline-start': '-50vw',
      'pointer-events': 'none',
      'border-bottom':
        'var(--stroke-full-thickness, 0.0625em) var(--stroke-full-style, solid) var(--stroke-full-color, inherit)',
    },
    [`${className}-bottom::after`]: {
      content: '""',
      position: 'absolute',
      'z-index': -1,
      'inset-inline-start': '50%',
      top: 0,
      top: '100%',
      width: '100vw',
      'margin-inline-start': '-50vw',
      'pointer-events': 'none',
      'border-top':
        'var(--stroke-full-thickness, 0.0625em) var(--stroke-full-style, solid) var(--stroke-full-color, inherit)',
    },
    [`${className}-none::before`]: {
      content: 'none',
    },
  };

  addUtilities(styles);

  matchUtilities(
    {
      'stroke-full': (value) => {
        console.log('stroke-full:color', value);
        return {
          '--stroke-full-color': value,
        }
      },
    },
    {
      values: borderColors,
    },
  );

  matchUtilities(
    {
      'stroke-full': (value) => {
        console.log('stroke-full:style', value);
        return {
          '--stroke-full-style': value,
        }
      },
    },
    {
      values: borderStyles,
    },
  );

  matchUtilities(
    {
      'stroke-full': (value) => {
        console.log('stroke-full:thickness', value);
        return {
          '--stroke-full-thickness': value,
        }
      },
    },
    {
      values: borderThicknesses,
    },
  );
};
