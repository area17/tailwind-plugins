module.exports = function ({ addUtilities, theme, config }) {
  const className = prefix('.underline');
  const prefixString = config('prefix');
  const colors = {
    underline: theme('underlineColor', {}),
    token: theme('colors', {}),
    text: theme('textColor', {}),
    bg: theme('backgroundColor', {}),
    border: theme('borderColor', {}),
  };

  const styles = {
    '[class*=underline-]': {
      'text-decoration-line': 'underline',
    },
    [`${className}-solid`]: {
      'text-decoration-style': 'solid',
    },
    [`${className}-dotted`]: {
      'text-decoration-style': 'dotted',
    },
    [`${className}-double`]: {
      'text-decoration-style': 'double',
    },
    [`${className}-dashed`]: {
      'text-decoration-style': 'dashed',
    },
    [`${className}-wavy`]: {
      'text-decoration-style': 'wavy',
    },
    [`${className}-skip-none`]: {
      'text-decoration-skip-ink': 'none',
    },
    [`${className}-skip-auto`]: {
      'text-decoration-skip-ink': 'auto',
    },
    [`${className}-skip-all`]: {
      'text-decoration-skip-ink': 'all',
    },
    [`${className}-thickness-auto`]: {
      'text-decoration-thickness': 'auto',
    },
    [`${className}-thickness-from-font`]: {
      'text-decoration-thickness': 'from-font',
    },
  };

  for (let i = 1; i < 21; i++) {
    styles[`${className}-thickness-${i}`] = {
      'text-decoration-thickness': `${i}px`,
    };
  }

  styles[`${className}-offset-0`] = {
    'text-underline-offset': `0`,
  };

  for (let i = 1; i < 21; i++) {
    styles[`${className}-offset-${i}`] = {
      'text-underline-offset': `${i / 20}em`,
    };
    styles[`.-${prefixString}underline-offset-${i}`] = {
      'text-underline-offset': `${i / -20}em`,
    };
  }

  Object.entries(colors).map((a) => {
    const [type, obj] = a;
    Object.entries(obj).map((b) => {
      const [name, color] = b;
      let className = `.${prefixString}underline-`;
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
