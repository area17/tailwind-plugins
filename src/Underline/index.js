module.exports = function ({ addUtilities, matchUtilities, theme, prefix, config }) {
  const className = 'underline';
  const classNameFull = prefix(`.${className}`);
  const classNameNoDot = `${config('prefix')}${className}`;

  const decorationStyles = ['solid', 'dotted', 'double', 'dashed', 'wavy'];
  const decorationSkip = ['none', 'auto', 'all'];
  const decorationThickness = ['auto', 'from-font'];

  const colors = {
    underline: theme('underlineColor', {}),
    token: theme('colors', {}),
    text: theme('textColor', {}),
    bg: theme('backgroundColor', {}),
    border: theme('borderColor', {}),
  };

  const styles = {};

  decorationStyles.map((style) => {
    styles[`${classNameFull}-${style}`] = {
      'text-decoration-line': 'underline',
      'text-decoration-style': style,
    };
  });

  decorationSkip.map((skip) => {
    styles[`${classNameFull}-skip-${skip}`] = {
      'text-decoration-line': 'underline',
      'text-decoration-skip-ink': skip,
    };
  });

  decorationThickness.map((thickness) => {
    styles[`${classNameFull}-thickness-${thickness}`] = {
      'text-decoration-line': 'underline',
      'text-decoration-thickness': thickness,
    };
  });

  for (let i = 1; i < 21; i++) {
    styles[`${classNameFull}-thickness-${i}`] = {
      'text-decoration-line': 'underline',
      'text-decoration-thickness': `${i}px`,
    };
  }

  const offsets = {};
  for (i = 1; i <= 21; i++) {
    offsets[i] = `${i / 20}em`;
  }

  matchUtilities(
    {
      //[`${classNameFull}-offset`]: (value) => {
      [`underline-offset`]: (value) => {
        return {
          'text-decoration-line': 'underline',
          'text-underline-offset': value,
        };
      },
    },
    {
      values: offsets,
      supportsNegativeValues: true,
    }
  );

  Object.entries(colors).map((a) => {
    const [type, obj] = a;
    Object.entries(obj).map((b) => {
      const [name, color] = b;
      let className = `.${classNameNoDot}-`;
      if (type !== 'token' && type !== 'underline') {
        className += `${type}-`;
      }
      className += name;
      styles[className] = {
        'text-decoration-line': 'underline',
        'text-decoration-color': color,
      };
    });
  });

  addUtilities(styles);
};
