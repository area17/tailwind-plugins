module.exports = function ({ addBase, prefix }) {
  const classNameContainer = prefix('.full-bleed-scroller');

  let styles = {};
  styles[classNameContainer] = {
    display: 'flex',
    'flex-flow': 'row nowrap',
    'overflow-x': 'auto',
    'overflow-y': 'hidden',
    gap: 'var(--inner-gutter)',
  };
  styles[`${classNameContainer}::before`] = {
    content: "''",
    flex: '0 0 auto',
    width:
      'calc(var(--breakout-outer-gutter, var(--outer-gutter, 0px)) - var(--inner-gutter, 0px))',
  };
  styles[`${classNameContainer}::after`] = {
    content: "''",
    flex: '0 0 auto',
    width:
      'calc(var(--breakout-outer-gutter, var(--outer-gutter, 0px)) - var(--inner-gutter, 0px))',
  };
  styles[`${classNameContainer}-reset`] = {
    display: 'unset',
    'flex-flow': 'unset',
    'flex-wrap': 'unset',
    'overflow-x': 'unset',
  };
  styles[`${classNameContainer}-reset::before`] = {
    content: 'none',
    flex: 'unset',
    width: 'unset',
  };
  styles[`${classNameContainer}-reset::after`] = {
    content: 'none',
    flex: 'unset',
    width: 'unset',
  };

  addBase(styles);
};
