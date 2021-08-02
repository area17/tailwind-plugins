module.exports = function(spacingTokens) {

  let tokens = {};

  Object.entries(spacingTokens).forEach(group => {
    const [name, space] = group;
    tokens[name] = (parseInt(space, 10) / 16) + 'rem';
  });

  return tokens;
};
