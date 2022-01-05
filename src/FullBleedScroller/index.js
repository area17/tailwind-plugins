module.exports = function({ addBase }) {

  let styles = {
    '.full-bleed-scroller': {
      'display': 'flex',
      'flex-flow': 'row nowrap',
      'overflow-x': 'auto',
      'overflow-y': 'hidden',
      'gap': 'var(--inner-gutter)'
    },
    '.full-bleed-scroller::before': {
      'content': '\'\'',
      'flex': '0 0 auto',
      'width': 'calc(var(--breakout-outer-gutter, var(--outer-gutter, 0px)) - var(--inner-gutter, 0px))'
    },
    '.full-bleed-scroller::after': {
      'content': '\'\'',
      'flex': '0 0 auto',
      'width': 'calc(var(--breakout-outer-gutter, var(--outer-gutter, 0px)) - var(--inner-gutter, 0px))'
    },
    '.full-bleed-scroller-reset': {
      'display': 'unset',
      'flex-flow': 'unset',
      'flex-wrap': 'unset',
      'overflow-x': 'unset'
    },
    '.full-bleed-scroller-reset::before': {
      'content': 'none',
      'flex': 'unset',
      'width': 'unset'
    },
    '.full-bleed-scroller-reset::after': {
      'content': 'none',
      'flex': 'unset',
      'width': 'unset'
    },
  };

  addBase(styles);
};
