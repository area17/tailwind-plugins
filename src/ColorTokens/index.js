module.exports = function ({ addComponents, theme }) {
  const tokens = theme('colors', {});

  let styles = {};
  styles[':root'] = {};

  Object.entries(tokens).forEach((item) => {
    const parentName = [];

    setColor(item, parentName);
  });

  function setColor(item, names) {
    const [name, color] = item;

    if (typeof color === 'string') {
      const colorName = names.length > 0 ? `${names.join('-')}-${name}` : name;

      styles[':root'][`--${colorName}`] = color;
    } else {
      const parentNames = [...names, name];

      Object.entries(color).forEach((child) => {
        setColor(child, parentNames);
      });
    }
  }

  addComponents(styles);
};
