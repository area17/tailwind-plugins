module.exports = function ({ addUtilities, theme, config }) {
  const breakpoints = theme('screens');
  const colors = theme('borderColor', theme('color', {}));
  const directions = { l: 'left', r: 'right' };
  const prefixString = config('prefix');

  let styles = [
    {
      [`[class*="${prefixString}keyline-"]`]: {
        position: 'relative',
      },
      [`[class*="${prefixString}keyline-"]::before`]: {
        content: 'attr(👻)',
        position: 'absolute',
        'z-index': 0,
        left: `calc(var(--inner-gutter) / -2 - 1px)`,
        right: `calc(var(--inner-gutter) / -2)`,
        top: 0,
        bottom: 0,
        border: '1px solid transparent',
        'pointer-events': 'none',
      },
      [`[class*="${prefixString}keyline-0"]::before`]: {
        'border-right-color': 'transparent',
        'border-left-color': 'transparent',
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
      [`@screen ${bp}`]: generateDirectionStyles(bp),
    };
  });

  styles = styles.concat(directionStyles, bpStyles);

  addUtilities(styles, {
    respectPrefix: false,
  });
};
