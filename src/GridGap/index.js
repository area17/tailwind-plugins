module.exports = function ({ addBase, theme }) {
  let styles = {
    '.gap-gutter': {
      'grid-gap': 'var(--inner-gutter)',
      gap: 'var(--inner-gutter)',
    },
    '.gap-y-gutter': {
      'grid-row-gap': 'var(--inner-gutter)',
      'row-gap': 'var(--inner-gutter)',
    },
    '.gap-x-gutter': {
      'grid-column-gap': 'var(--inner-gutter)',
      'column-gap': 'var(--inner-gutter)',
    },
  };

  addBase(styles);
};
