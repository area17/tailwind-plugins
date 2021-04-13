module.exports = function(tokens, colors) {
  Object.entries(colors).forEach((item) => {
    const [name, color] = item;
    const found = Object.keys(tokens).find((key) => key === color);
    if (found) {
      colors[name] = `var(--${found})`;
    }
  });

  return colors;
};
