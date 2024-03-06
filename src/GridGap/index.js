module.exports = function ({ addBase, prefix }) {
  const className = prefix('.gap-gutter');
  const classNameY = prefix('.gap-y-gutter');
  const classNameX = prefix('.gap-x-gutter');

  let styles = {
    [className]: {
      'grid-gap': 'var(--inner-gutter)',
      gap: 'var(--inner-gutter)',
    },
    [classNameY]: {
      'grid-row-gap': 'var(--inner-gutter)',
      'row-gap': 'var(--inner-gutter)',
    },
    [classNameX]: {
      'grid-column-gap': 'var(--inner-gutter)',
      'column-gap': 'var(--inner-gutter)',
    },
  };

  addBase(styles, {
    respectPrefix: false,
  });
};
