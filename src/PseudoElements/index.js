const pseudoElements = [
  'after',
  'backdrop ',
  'before',
  'cue',
  'first-letter',
  'first-line',
  'grammar-error ',
  'marker ',
  'placeholder ',
  'selection'
];

module.exports = function({ addVariant, e }) {
  const escape = e || ((x) => x);
  pseudoElements.forEach((pseudo) => {
    addVariant(pseudo, ({ modifySelectors, separator }) => {
      modifySelectors(({ className }) => {
        return `.${escape(`${pseudo}${separator}${className}`)}::${pseudo}`;
      });
    });
  });
};
