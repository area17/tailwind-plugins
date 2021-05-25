module.exports = function({ addComponents }) {
  addComponents({
    '.container': {
      'width': 'calc(var(--container-width, 100%) - (2 * var(--outer-gutter, 0)))',
      'margin-right': 'auto',
      'margin-left': 'auto'
    }
  });
  addComponents({
    '.container .container': {
      'width': 'auto'
    }
  });
  addComponents({
    '.breakout': {
      'position': 'relative',
      'left': '50%',
      'width': '100vw',
      'margin-left': '-50vw'
    }
  });
};
