module.exports = function ({ addComponents, prefix }) {
  const className = prefix('.dev-tools');

  const styles = {
    [className]: {
      position: 'fixed',
      'z-index': '9999999999',
      'inset-inline-start': '0',
      bottom: '0',
      'font-size': '0',
    },
    [`${className}::before`]: {
      content: 'var(--breakpoint) " • " var(--env)',
      position: 'absolute',
      'z-index': '2',
      'inset-inline-start': '0',
      bottom: '100%',
      padding: '4px 5px',
      background: 'green',
      color: 'white',
      font: '12px/1 sans-serif',
      'white-space': 'nowrap',
      'pointer-events': 'none',
    },
    [`${className}-toggle`]: {
      position: 'relative',
      'z-index': '2',
      width: '30px',
      height: '30px',
      border: '0',
      background: 'black',
      color: 'transparent',
      font: '0/0 a',
      appearance: 'none',
      cursor: 'pointer',
    },
    [`${className}-toggle::before, ${className}-toggle::after`]: {
      content: `''`,
      position: 'absolute',
      'inset-inline-start': '8px',
      top: '10px',
      width: '5px',
      height: '10px',
      'border-inline-start': '1px solid white',
      'border-inline-end': '1px solid white',
    },
    [`${className}-toggle::after`]: {
      'inset-inline-start': '16px',
    },
    [`${className}-grid`]: {
      position: 'fixed',
      'z-index': '1',
      'inset-inline-start': '0',
      'inset-inline-end': '0',
      top: '0',
      bottom: '0',
      width:
        'calc(var(--container-width, 100%) - (2 * var(--outer-gutter, 0)));',
      height: '100%',
      margin: '0 auto',
      background: `repeating-linear-gradient(
        90deg,
        var(--grid-column-bg),
        var(--grid-column-bg) calc((100% - (((var(--grid-columns) - 1) * var(--inner-gutter)))) / var(--grid-columns)),
        rgba(0,0,0,0) calc((100% - (((var(--grid-columns) - 1) * var(--inner-gutter)))) / var(--grid-columns)),
        rgba(0,0,0,0) calc((100% - (((var(--grid-columns) - 1) * var(--inner-gutter)))) / var(--grid-columns) + var(--inner-gutter))
      )`,
      'pointer-events': 'none',
    },
  };

  addComponents(styles);
};
