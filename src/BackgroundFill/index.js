module.exports = function ({ matchUtilities, addUtilities, theme }) {
  const bgColors = theme('backgroundColor', {});
  let matchValues = {};

  Object.keys(bgColors).forEach((key) => {
    matchValues[key] = key;
  });

  let psuedoEl = {
    '&::before': {
      content: '""',
      position: 'absolute',
      'z-index': -1,
      'inset-inline-start': '50%',
      top: 0,
      bottom: 0,
      width: '100vw',
      'margin-inline-start': '-50vw',
      'background-color': 'var(--background-fill-bg, inherit)',
      'pointer-events': 'none',
    },
  };

  addUtilities({
    '.background-fill': {
      '--background-fill-bg': 'inherit',
      position: 'relative',
      ...psuedoEl,
    },
    '.background-fill-none': {
      '&::before': {
        content: 'none',
      },
    },
  });

  matchUtilities(
    {
      'background-fill': (value) => {
        return {
          '--background-fill-bg': bgColors[value] || 'inherit',
          position: 'relative',
          ...psuedoEl,
        };
      },
    },
    {
      values: matchValues,
    }
  );
};
