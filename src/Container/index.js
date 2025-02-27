module.exports = function ({ addUtilities, prefix }) {
  // handle global prefix
  const classNameContainer = prefix('.container[class]');
  const classNameBreakout = prefix('.breakout[class]');

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
    [`${classNameBreakout}, ${classNameContainer} > ${classNameBreakout}`]: {
      '--breakout-outer-gutter':
        'max(var(--outer-gutter), calc((100% - var(--container-width, 100%)) / 2))',
      '--breakout-container-outer-gutter': 'var(--outer-gutter)',
      position: 'relative',
      'inset-inline-start': '50%',
      width: 'calc(100vw - var(--scrollbar-visible-width, 0px))',
      'margin-inline-start': 'calc((100vw - var(--scrollbar-visible-width, 0px)) / -2)',
    },
    [`${classNameBreakout}.px-outer-gutter, ${classNameBreakout} > .px-outer-gutter`]:
      {
        'padding-inline-start': 'var(--breakout-outer-gutter)',
        'padding-inline-end': 'var(--breakout-outer-gutter)',
      },
    [`${classNameBreakout}.pr-outer-gutter, ${classNameBreakout} > .pr-outer-gutter`]:
      {
        'padding-inline-end': 'var(--breakout-outer-gutter)',
      },
    [`${classNameBreakout}.pl-outer-gutter, ${classNameBreakout} > .pl-outer-gutter`]:
      {
        'padding-inline-start': 'var(--breakout-outer-gutter)',
      },
    [`${classNameBreakout} > .w-outer-gutter`]: {
      width: 'var(--breakout-outer-gutter)',
    },
    [`${classNameBreakout}-reset`]: {
      '--breakout-outer-gutter': 'var(--outer-gutter)',
      '--breakout-container-outer-gutter': '0',
      position: 'unset',
      'inset-inline-start': 'unset',
      width: 'unset',
      'margin-inline-start': 'unset',
    },
  };

  addUtilities(styles);
};
