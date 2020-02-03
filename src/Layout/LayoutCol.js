const _ = require('lodash');

// TODO:
// - class for columns container (support responsive variants) - .layout-container
// - class to set column width. Use 'column-count' setting as base for deciding column base number (support responsive variants) .layout-col-#
// - catch all css to set gutter on classes starting with [class^="layout-col"]
// -
// -
// -

// @mixin column($colspans: false, $native-scrolls: false) {
//   flex: 0 0 auto;
//   @each $name, $point in $breakpoints {
//     @include breakpoint('#{$name}') {
//       @if $colspans {
//         $colspan: map-get($colspans, #{$name});
//         $native-scroll: false;

//         @if index($native-scrolls, $name) {
//           $native-scroll: true;
//         }

//         @if $colspan {
//           @if $native-scroll {
//             width: colspan($colspan, #{$name}, 0px, false, true, true);
//           } @else {
//             width: colspan($colspan, #{$name});
//           }
//         }
//       }
//       margin-left: map-get($inner-gutters, $name);
//     }
//   }
// }

module.exports = function({ addComponents, theme }) {
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
  addComponents(...spacingStyles);
};
