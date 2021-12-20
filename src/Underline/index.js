module.exports = function({ addUtilities, theme }) {

  const colors = {
    'underline': theme('underlineColor', {}),
    'token': theme('colors', {}),
    'text': theme('textColor', {}),
    'bg': theme('backgroundColor', {}),
    'border': theme('borderColor', {})
  };

  const styles = {
    '[class*=underline-]': {
      'text-decoration-line': 'underline'
    },
    '.underline-solid': {
      'text-decoration-style': 'solid',
    },
    '.underline-dotted': {
      'text-decoration-style': 'dotted',
    },
    '.underline-double': {
      'text-decoration-style': 'double',
    },
    '.underline-dashed': {
      'text-decoration-style': 'dashed',
    },
    '.underline-wavy': {
      'text-decoration-style': 'wavy',
    },
    '.underline-skip-none': {
      'text-decoration-skip-ink': 'none',
    },
    '.underline-skip-auto': {
      'text-decoration-skip-ink': 'auto',
    },
    '.underline-skip-all': {
      'text-decoration-skip-ink': 'all',
    },
    '.underline-thickness-auto': {
      'text-decoration-thickness': 'auto',
    },
    '.underline-thickness-from-font': {
      'text-decoration-thickness': 'from-font',
    },
  };

  for (let i = 1; i < 21; i++) {
    styles[`.underline-thickness-${ i }`] = {
      'text-decoration-thickness': `${ i }px`
    };
  }

  styles[`.underline-offset-0`] = {
    'text-underline-offset': `0`
  };

  for (let i = 1; i < 21; i++) {
    styles[`.underline-offset-${ i }`] = {
      'text-underline-offset': `${ i / 20 }em`
    };
    styles[`.-underline-offset-${ i }`] = {
      'text-underline-offset': `${ i / -20 }em`
    };
  }

  Object.entries(colors).map((a) => {
    const [type, obj] = a;
    Object.entries(obj).map((b) => {
      const [name, color] = b;
      let className = '.underline-';
      if (type !== 'token' && type !== 'underline') {
        className += `${ type }-`;
      }
      className += name;
      styles[className] = {
        'text-decoration-color': color
      }
    });
  });

  addUtilities(styles);
};
