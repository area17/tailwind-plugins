module.exports = function({ addComponents, theme }) {
  const tokens = theme('colorTokens', {});

  let styles = {};
  styles[':root'] = {};

  Object.entries(tokens).forEach(item => {
    const [name, colour] = item;
    styles[':root'][`--${ name }`] = colour;
  });

  addComponents(styles);
};
