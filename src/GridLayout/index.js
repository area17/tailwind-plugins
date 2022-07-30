module.exports = function ({ addComponents, theme }) {
  const breakpoints = theme('screens');

  const styles = [
    {
      '.grid-layout': {
        display: 'grid',
        'grid-template-columns':
          'repeat(var(--container-grid-columns, var(--grid-columns)), 1fr)',
        'grid-gap': 'var(--inner-gutter)',
      },
    },
  ];

  const columnCount = theme('columnCount', {});
  const maxCols = theme('maxGridCols', columnCount);
  const maxColAmount = Math.max.apply(Math, Object.values(maxCols));

  for (let n = 1; n <= maxColAmount + 1; n++) {
    styles.push({
      [`.grid-col-span-${n}`]: {
        '--container-grid-columns': `${n}`,
        'grid-column': `span ${n} / span ${n}`,
      },
    });
  }

  for (let n = 1; n <= maxColAmount + 1; n++) {
    styles.push({
      [`.grid-col-start-${n}`]: {
        'grid-column-start': `${n}`,
      },
      [`.grid-col-end-${n}`]: {
        'grid-column-end': `${n}`,
      },
    });
  }

  addComponents(styles);
};
