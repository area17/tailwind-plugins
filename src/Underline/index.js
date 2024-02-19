module.exports = function ({ addUtilities, theme, prefix, config }) {
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

  const styles = {
    [`[class*=${classNameNoDot}-]`]: {
      'text-decoration-line': 'underline',
    },
  };

  decorationStyles.map((style) => {
    styles[`${classNameFull}-${style}`] = {
      'text-decoration-style': style,
    };
  });

  decorationSkip.map((skip) => {
    styles[`${classNameFull}-skip-${skip}`] = {
      'text-decoration-skip-ink': skip,
    };
  });

  decorationThickness.map((thickness) => {
    styles[`${classNameFull}-thickness-${thickness}`] = {
      'text-decoration-thickness': thickness,
    };
  });

  for (let i = 1; i < 21; i++) {
    styles[`${classNameFull}-thickness-${i}`] = {
      'text-decoration-thickness': `${i}px`,
    };
  }

  styles[`${classNameFull}-offset-0`] = {
    'text-underline-offset': `0`,
  };

  for (let i = 1; i < 21; i++) {
    styles[`${classNameFull}-offset-${i}`] = {
      'text-underline-offset': `${i / 20}em`,
    };
    styles[`.-${classNameNoDot}-offset-${i}`] = {
      'text-underline-offset': `${i / -20}em`,
    };
  }

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
        'text-decoration-color': color,
      };
    });
  });

  addUtilities(styles);
};
