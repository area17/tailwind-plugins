module.exports = function(shades, colors) {

  Object.entries(colors).forEach(item => {
    const [name, colour] = item;
    const found = Object.keys(shades).find(key => key === colour);
    if (found) {
      colors[name] = `var(--${ found })`;
    }
  });

  return colors;

};
