module.exports = function(tokens, colors) {
  Object.entries(colors).forEach((item) => {
    const [name, color] = item;
    const colorSplit = color.split('-');
    const found = Object.entries(tokens).find((token) => {
      const [key, value] = token;
      return key === color || key === colorSplit[0];
    });

    if (found) {
      if (typeof found[1] === 'string') {
        colors[name] = `var(--${found[0]})`;
      } else {
        const foundChild = Object.keys(found[1]).find(
          (key) => key === colorSplit[1]
        );

        if (foundChild) {
          colors[name] = `var(--${found[0]}-${foundChild})`;
        }
      }
    } else {
      colors[name] = color;
    }
  });

  return colors;
};
