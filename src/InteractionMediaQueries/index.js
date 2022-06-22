module.exports = function ({ addVariant }) {
  // https://css-tricks.com/touch-devices-not-judged-size/
  addVariant('pointer-course', '@media (pointer: coarse)');
  addVariant('pointer-fine', '@media (pointer: fine)');
  addVariant('pointer-none', '@media (pointer: none)');
  addVariant('hover-hover', '@media (hover: hover)');
  addVariant('hover-none', '@media (hover: none)');
  addVariant('any-pointer-course', '@media (any-pointer: coarse)');
  addVariant('any-pointer-fine', '@media (any-pointer: fine)');
  addVariant('any-pointer-none', '@media (any-pointer: none)');
  addVariant('any-hover-hover', '@media (any-hover: hover)');
  addVariant('any-hover-on-demand', '@media (any-hover: on-demand)');
  addVariant('any-hover-none', '@media (any-hover: none)');
};
