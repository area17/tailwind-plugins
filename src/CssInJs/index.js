module.exports = function ({ addComponents, theme }) {
  const styles = theme('css', {});

  addComponents(styles);
};
