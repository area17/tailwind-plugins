module.exports = function ({ addBase, theme, config }) {
  const breakpoints = theme('screens');
  const colors = theme('borderColor', theme('color', {}));
  const directions = { l: 'inline-start', r: 'inline-end' };
  const prefixString = config('prefix');

  // TODO: refactor to use `addUtilities` (see BackgroundFill/index.js)

  let styles = [
    {
      [`[class*="${prefixString}keyline-"]`]: {
        position: 'relative',
      },
      [`[class*="${prefixString}keyline-"]::before`]: {
        content: 'attr(👻)',
        position: 'absolute',
        'z-index': 0,
        'inset-inline-start': `calc(var(--inner-gutter) / -2 - 1px)`,
        'inset-inline-end': `calc(var(--inner-gutter) / -2)`,
        top: 0,
        bottom: 0,
        border: '1px solid transparent',
        'pointer-events': 'none',
      },
      [`[class*="${prefixString}keyline-0"]::before`]: {
        'border-inline-end-color': 'transparent',
        'border-inline-start-color': 'transparent',
      },
    },
  ];

  function generateDirectionStyles(bp) {
    const arr = [];
    bp = bp ? `${bp}\\:` : '';

    Object.entries(directions).map((a) => {
      const [dir, property] = a;
      // add colors
      Object.entries(colors).map((b) => {
        const [name, color] = b;
        arr.push({
          [`.${bp}${prefixString}keyline-${dir}-${name}::before`]: {
            [`border-${property}-color`]: color,
          },
        });
      });
      // add hiding classes
      arr.push({
        [`.${bp}${prefixString}keyline-${dir}-0::before`]: {
          [`border-${property}-color`]: 'transparent',
        },
      });
      arr.push({
        [`.${bp}${prefixString}keyline-0::before`]: {
          [`border-${property}-color`]: 'transparent',
        },
      });
    });

    return arr;
  }

  const directionStyles = generateDirectionStyles();

  const bpStyles = Object.keys(breakpoints).map((bp) => {
    return {
      [`@media (width >= ${breakpoints[bp]})`]: generateDirectionStyles(bp),
    };
  });

  styles = styles.concat(directionStyles, bpStyles);

  addBase(styles, {
    respectPrefix: false,
  });
};
