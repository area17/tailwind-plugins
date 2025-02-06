module.exports = function ({ matchComponents, theme }) {
  const breakpoints = theme('screens');
  const colors = theme('borderColor', theme('color', {}));
  const directions = { l: 'inline-start', r: 'inline-end' };
  const componentValues = {
    [`0`]: '0',
    'l-0': 'l::0',
    'r-0': 'r::0',
  };

  Object.entries(directions).map((a) => {
    const [dir, property] = a;
    Object.entries(colors).map((b) => {
      const [name, color] = b;
      componentValues[`${dir}-${name}`] = `${dir}::${color}`;
    });
  });

  matchComponents(
    {
      [`keyline`]: (value) => {
        let parts = value.split('::');
        let borderColours = {
          '--keyline-l-color': 'transparent',
          '--keyline-r-color': 'transparent',
        };
        let psuedo = {
          '&::before': {
            content: '""',
            position: 'absolute',
            'z-index': 0,
            'inset-inline-start': `calc(var(--inner-gutter) / -2 - 1px)`,
            'inset-inline-end': `calc(var(--inner-gutter) / -2)`,
            top: 0,
            bottom: 0,
            borderLeft: '1px solid var(--keyline-l-color, transparent)',
            borderRight: '1px solid var(--keyline-r-color, transparent)',
            'pointer-events': 'none',
          },
        };
        if (parts[0] === 'l' && parts[1] && parts[1] !== '0') {
          borderColours['--keyline-l-color'] = parts[1];
          borderColours = {
            position: 'relative',
            ...borderColours,
            ...psuedo,
          };
        } else if (parts[0] === 'r' && parts[1] && parts[1] !== '0') {
          borderColours['--keyline-r-color'] = parts[1];
          borderColours = {
            position: 'relative',
            ...borderColours,
            ...psuedo,
          };
        }
        return {
          ...borderColours,
        };
      },
    },
    {
      values: componentValues,
    }
  );
};
