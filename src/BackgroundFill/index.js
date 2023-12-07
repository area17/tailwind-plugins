module.exports = function ({ addBase, theme }) {
  const bgColors = theme('backgroundColor', {});

  let styles = {
    "[class*='background-fill']": {
      '--background-fill-bg': 'inherit',
      position: 'relative',
    },
    "[class*='background-fill']::before": {
      content: '""',
      position: 'absolute',
      'z-index': -1,
      left: '50%',
      top: 0,
      bottom: 0,
      width: '100vw',
      'margin-left': '-50vw',
      'background-color': 'var(--background-fill-bg, inherit)',
      'pointer-events': 'none',
    },
    '.background-fill-none::before': {
      content: 'none',
    },
  };

  Object.entries(bgColors).map((bgColor) => {
    const [name, color] = bgColor;
    let className = `.background-fill-${name}`;
    styles[className] = {
      '--background-fill-bg': color,
    };
  });

  addBase(styles);
};
