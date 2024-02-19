module.exports = function ({ addBase, prefix }) {
  const className = prefix('.full-bleed-scroller');

  const styles = {
    [className]: {
      display: 'flex',
      'flex-flow': 'row nowrap',
      'overflow-x': 'auto',
      'overflow-y': 'hidden',
      gap: 'var(--inner-gutter)',
    },
    [`${className}::before`]: {
      content: "''",
      flex: '0 0 auto',
      width:
        'calc(var(--breakout-outer-gutter, var(--outer-gutter, 0px)) - var(--inner-gutter, 0px))',
    },
    [`${className}::after`]: {
      content: "''",
      flex: '0 0 auto',
      width:
        'calc(var(--breakout-outer-gutter, var(--outer-gutter, 0px)) - var(--inner-gutter, 0px))',
    },
    [`${className}-reset`]: {
      display: 'unset',
      'flex-flow': 'unset',
      'flex-wrap': 'unset',
      'overflow-x': 'unset',
    },
    [`${className}-reset::before`]: {
      content: 'none',
      flex: 'unset',
      width: 'unset',
    },
    [`${className}-reset::after`]: {
      content: 'none',
      flex: 'unset',
      width: 'unset',
    },
  };

  addBase(styles);
};
