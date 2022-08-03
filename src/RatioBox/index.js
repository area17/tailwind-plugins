module.exports = function ({ addUtilities, theme, config }) {
  const ratios = theme('ratios', {});
  const prefixString = config('prefix');

  let styles = {
    '.ratio': {
      '--ratio': '100%',
      display: 'block',
      position: 'relative',
      overflow: 'hidden',
    },
    '.ratio::before': {
      content: 'attr(👻)',
      display: 'block',
      width: '100%',
      height: '0',
      'padding-bottom': 'var(--ratio)',
    },
    [`.ratio > [class*="${prefixString}ratio-content"]`]: {
      position: 'absolute',
      left: '0',
      right: '0',
      top: '0',
      bottom: '0',
      width: '100%',
      height: '100%',
    },
    '.ratio-expandable::before': {
      float: 'left',
      width: '1px',
      'margin-left': '-1px',
    },
    '.ratio-expandable::after': {
      content: 'attr(👻)',
      display: 'table',
      clear: 'both',
    },
    '.ratio-free::before': {
      content: 'unset',
    },
    '.ratio-free::after': {
      content: 'unset',
    },
    [`.ratio-free > [class*="${prefixString}ratio-content"]`]: {
      position: 'static',
      left: 'auto',
      right: 'auto',
      top: 'auto',
      bottom: 'auto',
      width: 'auto',
      height: 'auto',
    },
    [`.ratio-free > [class*="${prefixString}ratio-content"][class*="${prefixString}w-full"]`]:
      {
        width: '100%',
      },
    [`.ratio-free > [class*="${prefixString}ratio-content"][class*="${prefixString}h-auto"]`]:
      {
        height: 'auto',
      },
  };

  for (const [key, ratio] of Object.entries(ratios)) {
    let ratioFloat = 1;
    let ratioPercent = 100;
    let r = ratio;

    if (typeof ratio === 'string') {
      r = r.replace(/[:\/]/, 'x');
      let ratioParts = r.split('x');
      ratioFloat = ratioParts[1] / ratioParts[0];
    }

    if (typeof ratio === 'number') {
      ratioFloat = ratio;
    }

    ratioPercent = ratioFloat * 100;
    ratioPercent = Math.round((ratioPercent + Number.EPSILON) * 100) / 100;

    styles[`.ratio-${key}`] = {
      '--ratio': `${ratioPercent}%`,
    };
  }

  addUtilities(styles, {
    variants: ['responsive'],
  });
};
