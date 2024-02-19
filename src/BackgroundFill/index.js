module.exports = function ({ addBase, prefix, theme, config }) {
  const bgColors = theme('backgroundColor', {});

  // handle global prefix
  const className = 'background-fill';
  const classNameFull = prefix(`.${className}`);
  const classNameNoDot = `${config('prefix')}${className}`;

  const styles = {
    [`[class*='${classNameNoDot}']`]: {
      '--background-fill-bg': 'inherit',
      position: 'relative',
    },
    [`[class*='${classNameNoDot}']::before`]: {
      content: '""',
      position: 'absolute',
      'z-index': -1,
      left: '50%',
      top: 0,
      bottom: 0,
      width: '100vw',
      'margin-left': '-50vw',
      'background-color': `var(--${className}-bg, inherit)`,
      'pointer-events': 'none',
    },
    [`${classNameFull}-none::before`]: {
      content: 'none',
    },
  };

  Object.entries(bgColors).map((bgColor) => {
    const [name, color] = bgColor;
    styles[prefix(`${classNameFull}-${name}`)] = {
      '--background-fill-bg': color,
    };
  });

  addBase(styles);
};
