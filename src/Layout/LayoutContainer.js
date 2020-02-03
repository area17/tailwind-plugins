const _ = require('lodash');

module.exports = function({ addComponents, theme }) {
  // @mixin columns-container() {
  //   display: flex;
  //   flex-flow: row wrap;

  //   @each $name, $point in $breakpoints {
  //     @include breakpoint('#{$name}') {
  //       margin-left: (map-get($inner-gutters, $name) / -1);
  //     }
  //   }
  // }
  const spacing = theme('spacing', {});
  const spacingGroups = theme('spacingGroups', {});
  const prefixes = { mt: 'margin-top', pt: 'padding-top' };

  const spacingStyles = _.map(prefixes, (property, prefix) => {
    return _.map(spacingGroups, (group, name) => {
      const className = `.${prefix}-${name}`;

      return _.map(group, (value, bp) => {
        if (bp === 'xs') {
          return {
            [className]: {
              [property]: value
            }
          };
        } else {
          return {
            [`@screen ${bp}`]: {
              [className]: {
                [property]: value
              }
            }
          };
        }
      });
    });
  });

  addComponents(spacingStyles);
};
