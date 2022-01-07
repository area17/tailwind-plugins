module.exports = function({ addBase }) {

  let styles = {
    '.container': {
      'width': 'calc(var(--container-width, 100%) - (2 * var(--breakout-container-outer-gutter, var(--container-outer-gutter, var(--outer-gutter, 0)))))',
      'margin-right': 'auto',
      'margin-left': 'auto'
    },
    '.container > *': {
      '--container-outer-gutter': '0',
      '--breakout-container-outer-gutter': '0',
    },
    '.container-reset': {
      'width': 'unset',
      'margin-right': 'unset',
      'margin-left': 'unset'
    },
    '.container-reset > *': {
      '--container-outer-gutter': 'var(--outer-gutter, 0)',
      '--breakout-container-outer-gutter': 'inherit',
    },
    '.breakout': {
      '--breakout-outer-gutter': 'max(var(--outer-gutter), calc((100% - var(--container-width, 100%)) / 2))',
      '--breakout-container-outer-gutter': 'var(--outer-gutter)',
      'position': 'relative',
      'left': '50%',
      'width': 'calc(100vw - var(--scroll-bar-visible-width, 0px))',
      'margin-left': 'calc((100vw - var(--scroll-bar-visible-width, 0px)) / -2)'
    },
    ['.breakout.px-outer-gutter, .breakout > .px-outer-gutter']: {
      'padding-left': 'var(--breakout-outer-gutter)',
      'padding-right': 'var(--breakout-outer-gutter)'
    },
    ['.breakout.pr-outer-gutter, .breakout > .pr-outer-gutter']: {
      'padding-right': 'var(--breakout-outer-gutter)'
    },
    ['.breakout.pl-outer-gutter, .breakout > .pl-outer-gutter']: {
      'padding-left': 'var(--breakout-outer-gutter)',
    },
    '.breakout > .w-outer-gutter': {
      'width': 'var(--breakout-outer-gutter)',
    },
    '.breakout-reset': {
      '--breakout-outer-gutter': 'var(--outer-gutter)',
      '--breakout-container-outer-gutter': '0',
      'position': 'unset',
      'left': 'unset',
      'width': 'unset',
      'margin-left': 'unset'
    }
  };

  addBase(styles);
};
