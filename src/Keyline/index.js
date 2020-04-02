const _ = require('lodash');

// TODO:
// - Add ability to set different keyline colors at different breakpoints

module.exports = function({ addComponents, theme }) {
  const columnCount = theme('columnCount', {});
  const directions = { l: 'left', r: 'right' };
  const colors = theme('borderColor', theme('color', {}));
  const innerGutters = theme('innerGutters', {});
  let styles = [
    {
      ['[class*="keyline-"]']: {
        position: 'relative'
      },
      ['[class*="keyline-"]:before']: {
        content: 'attr(👻)',
        display: 'none',
        position: 'absolute',
        'z-index': 0,
        top: 0,
        bottom: 0,
        'pointer-events': 'none'
      }
    }
  ];

  const responsiveStyles = _.map(columnCount, (cols, bp) => {
    return {
      [`@screen ${bp}`]: {
        [`[class*="keyline-"]:before`]: {
          left: `calc(${innerGutters[bp]} / -2)`
        },
        [`[class*="${bp}\\:keyline-"]:before`]: {
          display: 'block'
        },
        [`[class*="${bp}\\:keyline-0"]:before`]: {
          display: 'none'
        }
      }
    };
  });

  styles.push(responsiveStyles);

  _.forEach(directions, (property, dir) => {
    styles.push({
      [`[class*="keyline-${dir}"]:before`]: {
        [`border-${property}`]: '1px solid'
      }
    });

    _.forEach(colors, (color, name) => {
      const className = `keyline-${dir}-${name}`;

      buildColorStyles(color, className, property);
    });

    const responsiveResetStyles = _.map(columnCount, (cols, bp) => {
      return {
        [`@screen ${bp}`]: {
          [`[class*="${bp}\\:keyline-${dir}-0"]:before`]: {
            display: 'none'
          }
        }
      };
    });

    styles.push(responsiveResetStyles);
  });

  addComponents(styles);

  function buildColorStyles(color, className, property) {
    let colorStyles = [];

    if (typeof color === 'string') {
      styles.push(getStyles(color, className, property));
    } else {
      _.forEach(color, (shade, key) => {
        let newClassName = `${className}-${key}`;
        buildColorStyles(shade, newClassName, property);
      });
    }

    return colorStyles;
  }

  function getStyles(color, className, property) {
    return {
      [`.${className}:before`]: {
        display: 'block'
      },
      [`[class*="${className}"]:before`]: {
        [`border-${property}-color`]: color
      }
    };
  }
};
