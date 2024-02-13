module.exports = function ({ addBase, prefix, theme }) {
  const bgColors = theme('backgroundColor', {});

  // handle global prefix
  const classNameBgFill = prefix('.background-fill');
  const classNameBgFillNoDot = classNameBgFill.replace(/^\.+/, '');

  let styles = {};
  styles[`[class*='${classNameBgFillNoDot}']`] = {
    '--background-fill-bg': 'inherit',
    position: 'relative',
  };

  styles[`[class*='${classNameBgFillNoDot}']::before`] = {
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
  };

  styles[`.${classNameBgFill}-none::before`] = {
    content: 'none',
  };

  Object.entries(bgColors).map((bgColor) => {
    const [name, color] = bgColor;
    let className = prefix(`${classNameBgFill}-${name}`);
    styles[className] = {
      '--background-fill-bg': color,
    };
  });

  addBase(styles);
};
