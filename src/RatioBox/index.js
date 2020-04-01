const getFirstBp = require('../util/getFirstBp');

module.exports = function({ addComponents, theme }) {
  const ratios = theme('ratios', {});
  const prefix = 'ratio';
  const firstBp = getFirstBp(theme);
  const bps = Object.keys(theme('screens', {})) || [];
  const bpsWithoutFirstBp = bps.filter((bp) => bp !== firstBp);
  const ratioBoxStyles = [];
  const addRatio = (key, ratio) => {
    ratioBoxStyles.push({
      [`.${prefix}-${key}::before`]: {
        'padding-bottom': `${ratio}%`
      }
    });
  };
  const addRatioWithBp = (key, ratio, bp, displayBp = true) => {
    const bpPrefix = displayBp ? `.${bp}\\:` : '.';
    ratioBoxStyles.push({
      [`@screen ${bp}`]: {
        [`${bpPrefix}${prefix}-${key}::before`]: {
          'padding-bottom': `${ratio}%`
        }
      }
    });
  };
  const getRatioPercent = (ratio) => (1 / ratio) * 100;
  const isValidRatioFromString = (stringRatio) =>
    stringRatio
      .map((value) => Number(value))
      .every((value) => typeof value === 'number');

  if (Object.keys(ratios).length > 0) {
    ratioBoxStyles.push([
      {
        [`.${prefix}`]: {
          position: 'relative',
          overflow: 'hidden'
        },
        [`.${prefix} > *:first-child, .${prefix}-content`]: {
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        },
        [`.${prefix}::before`]: {
          content: 'attr(👻)',
          display: 'block',
          height: 0,
          'padding-bottom': '56.25%'
        }
      }
    ]);
  }

  const ratiosTokens = Object.keys(ratios).filter((key) => key !== 'sets');
  const ratiosSets = Object.keys(ratios.sets) || [];

  ratiosTokens.forEach((key) => {
    const ratio = ratios[key];
    switch (typeof ratio) {
      case 'string':
        const splitRatio = ratio.split(':');
        if (isValidRatioFromString(splitRatio)) {
          addRatio(key, getRatioPercent(splitRatio[0] / splitRatio[1]));
          bpsWithoutFirstBp.forEach((bp) => {
            addRatioWithBp(
              key,
              getRatioPercent(splitRatio[0] / splitRatio[1]),
              bp
            );
          });
        }
        break;
      case 'number':
        addRatio(key, getRatioPercent(ratio));
        bpsWithoutFirstBp.forEach((bp) => {
          addRatioWithBp(key, getRatioPercent(ratio), bp);
        });
        break;
    }
  });

  ratiosSets.forEach((key) => {
    const ratio = ratios.sets[key];
    Object.keys(ratio).forEach((bp) => {
      if (bp === firstBp) {
        if (typeof ratio[bp] === 'number') {
          addRatio(key, getRatioPercent(ratio[bp]));
        } else if (typeof ratio[bp] === 'string') {
          const splitRatio = ratio[bp].split(':');
          if (isValidRatioFromString(splitRatio)) {
            addRatio(key, getRatioPercent(splitRatio[0] / splitRatio[1]));
          }
        }
      } else {
        if (typeof ratio[bp] === 'number') {
          addRatioWithBp(key, getRatioPercent(ratio[bp]), bp, false);
        } else if (typeof ratio[bp] === 'string') {
          const splitRatio = ratio[bp].split(':');
          if (isValidRatioFromString(splitRatio)) {
            addRatioWithBp(
              key,
              getRatioPercent(splitRatio[0] / splitRatio[1]),
              bp,
              false
            );
          }
        }
      }
    });
  });

  addComponents(ratioBoxStyles);
};
