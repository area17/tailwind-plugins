module.exports = function ({ addBase, prefix }) {
  // handle global prefix
  const classNameContainer = prefix('.container');
  const classNameBreakout = prefix('.breakout');

  const styles = {
    [classNameContainer]: {
      width:
        'calc(var(--container-width, 100%) - (2 * var(--breakout-container-outer-gutter, var(--container-outer-gutter, var(--outer-gutter, 0)))))',
      'margin-right': 'auto',
      'margin-left': 'auto',
    },
    [`${classNameContainer} > *`]: {
      '--container-outer-gutter': '0',
      '--breakout-container-outer-gutter': '0',
    },
    [`${classNameContainer}-reset`]: {
      width: 'unset',
      'margin-right': 'unset',
      'margin-left': 'unset',
    },
    [`${classNameContainer}-reset > *`]: {
      '--container-outer-gutter': 'var(--outer-gutter, 0)',
      '--breakout-container-outer-gutter': 'inherit',
    },
    [classNameBreakout]: {
      '--breakout-outer-gutter':
        'max(var(--outer-gutter), calc((100% - var(--container-width, 100%)) / 2))',
      '--breakout-container-outer-gutter': 'var(--outer-gutter)',
      position: 'relative',
      left: '50%',
      width: 'calc(100vw - var(--scrollbar-visible-width, 0px))',
      'margin-left': 'calc((100vw - var(--scrollbar-visible-width, 0px)) / -2)',
    },
    [`${classNameBreakout}.px-outer-gutter, ${classNameBreakout} > .px-outer-gutter`]:
      {
        'padding-left': 'var(--breakout-outer-gutter)',
        'padding-right': 'var(--breakout-outer-gutter)',
      },
    [`${classNameBreakout}.pr-outer-gutter, ${classNameBreakout} > .pr-outer-gutter`]:
      {
        'padding-right': 'var(--breakout-outer-gutter)',
      },
    [`${classNameBreakout}.pl-outer-gutter, ${classNameBreakout} > .pl-outer-gutter`]:
      {
        'padding-left': 'var(--breakout-outer-gutter)',
      },
    [`${classNameBreakout} > .w-outer-gutter`]: {
      width: 'var(--breakout-outer-gutter)',
    },
    [`${classNameBreakout}-reset`]: {
      '--breakout-outer-gutter': 'var(--outer-gutter)',
      '--breakout-container-outer-gutter': '0',
      position: 'unset',
      left: 'unset',
      width: 'unset',
      'margin-left': 'unset',
    },
  };

  addBase(styles);
};
