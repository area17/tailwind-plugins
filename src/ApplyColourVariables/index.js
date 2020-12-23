module.exports = function(tokens, colors) {

  Object.entries(colors).forEach(item => {
    const [name, colour] = item;
    const found = Object.keys(tokens).find(key => key === colour);
    if (found) {
      colors[name] = `var(--${ found })`;
    }
  });

  return colors;

};
