require('dotenv').config();
const getFirstBp = require('./util/getFirstBp');

module.exports = function({ addBase, theme }) {
  const innerGutters = theme('innerGutters', {});
  const firstBp = getFirstBp(theme);
  const gridGaps = [];
  let prevGutter = -1;

  Object.entries(innerGutters).forEach(bp => {
    const [name, gutter] = bp;

    if (gutter !== prevGutter) {

      prevGutter = gutter;

      let styles = {
        '.gap-gutter': {
          'grid-gap': gutter,
          'gap': gutter
        },
        '.gap-y-gutter': {
          'grid-row-gap': gutter,
          'row-gap': gutter
        },
        '.gap-x-gutter': {
          'grid-column-gap': gutter,
          'column-gap': gutter
        }
      };

      if (name === firstBp) {
        gridGaps.push(styles);
      } else {
        gridGaps.push({
          [`@screen ${name}`]: {
            ...styles
          }
        });
      }
    }
  });

  addBase(gridGaps);
};


