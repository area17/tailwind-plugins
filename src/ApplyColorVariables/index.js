module.exports = function(tokens, colors) {
  if (!colors) return;

  Object.entries(colors).forEach((item) => {
    const [name, color] = item;
    const colorSplitIndex = color.lastIndexOf('-');
    const colorSplit =
      colorSplitIndex > -1
        ? [color.slice(0, colorSplitIndex), color.slice(colorSplitIndex + 1)]
        : [color];

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
