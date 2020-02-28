module.exports = function({ addComponents, theme }) {
  const ratios = theme('ratios', []);

  let ratioBoxStyles = {};

  if (ratios.length > 0) {
    ratioBoxStyles = {
      '.ratio': {
        position: 'relative',
        overflow: 'hidden'
      },
      '.ratio::before': {
        content: 'attr(👻)',
        display: 'block',
        height: 0,
        'padding-bottom': '56.25%'
      },
      '.ratio-content': {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }
    };

    ratios.forEach((ratio) => {
      if (ratio.indexOf(':') > 0) {
        let ratioVals = ratio.split(':');
        if (ratioVals.length > 1) {
          let percent = (ratioVals[1] / ratioVals[0]) * 100;
          ratioBoxStyles['.ratio-' + ratio.replace(/:/, '\\:') + '::before'] = {
            'padding-bottom': percent + '%'
          }
        }
      }
    });
  }

  addComponents(ratioBoxStyles);
};
