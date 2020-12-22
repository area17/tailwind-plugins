module.exports = function({ addComponents, theme }) {
  const colorShades = theme('colorShades', {});

  let styles = {};
  styles[':root'] = {};

  Object.entries(colorShades).forEach(item => {
    const [name, colour] = item;
    styles[':root'][`--${ name }`] = colour;
  });

  addComponents(styles);
};
