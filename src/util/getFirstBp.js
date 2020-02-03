module.exports = function(theme) {
  if (!theme) {
    return;
  }

  const screens = theme('screens', {});

  return Object.keys(screens)[0];
};
