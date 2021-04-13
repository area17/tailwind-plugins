module.exports = function(tokens, colors) {
  Object.entries(colors).forEach((item) => {
    const [name, color] = item;
    const colorSplit = color.split('-');
    const found = Object.entries(tokens).find((token) => {
      const [key, value] = token;
      return key === color || key === colorSplit[0];
    });

    if (!found) return;

    const colorVal =
      typeof found[1] === 'string' ? found[1] : found[1][colorSplit[1]];

    colors[name] = `var(--${colorVal})`;
  });

  return colors;
};
