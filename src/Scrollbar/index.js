module.exports = function ({ matchComponents, addUtilities, matchUtilities, theme, prefix, config }) {
  const classNameScrollbar = prefix('.scrollbar');
  const prefixString = config('prefix');
  const trackColors = {
    track: theme('scrollbarColor.track', {}),
    token: theme('colors', {}),
    bg: theme('backgroundColor', {}),
  };

  const thumbColors = {
    thumb: theme('scrollbarColor.thumb', {}),
    token: theme('colors', {}),
    bg: theme('backgroundColor', {}),
  };

  const trackColorsValues = {};
  Object.keys(trackColors).forEach(type => {
    for (const [name, setting] of Object.entries(trackColors[type])) {
      if (type === 'bg') {
        trackColorsValues[`${type}-${name}`] = setting;
      } else if (type === 'token') {
        trackColorsValues[name] = `var(--color-${name})`;
      } else {
        trackColorsValues[name] = setting;
      }
    }
  });

  const thumbColorsValues = {};
  Object.keys(thumbColors).forEach(type => {
    for (const [name, setting] of Object.entries(thumbColors[type])) {
      if (type === 'bg') {
        thumbColorsValues[`${type}-${name}`] = setting;
      } else if (type === 'token') {
        thumbColorsValues[name] = `var(--color-${name})`;
      } else {
        thumbColorsValues[name] = setting;
      }
    }
  });

  const componentValues = {
    thin: 'thin',
    'thin-collapse': 'thin-collapse',
  };
  ['track', 'thumb'].forEach(scrollBarNode => {
    Object.keys(thumbColors).forEach(type => {
      for (const [name, setting] of Object.entries(thumbColors[type])) {
        if (type === 'bg') {
          componentValues[`${scrollBarNode}-${type}-${name}`] = `${scrollBarNode}-${type}-${name}`;
        } else if (type === 'token') {
          componentValues[`${scrollBarNode}-${name}`] = `${scrollBarNode}-${type}-${name}`;
        } else {
          componentValues[`${scrollBarNode}-${name}`] = `${scrollBarNode}-${type}-${name}`;
        }
      }
    });
  });

  // add base styles when required
  matchComponents(
    {
      [`${prefixString}scrollbar`]: (value) => {
        return {
          '--scrollbar-bg': '#fafafa',
          '--scrollbar-fg': '#c1c1c1',
          '--scrollbar-border': '#e8e8e8',
          'scrollbar-color': 'var(--scrollbar-fg) var(--scrollbar-bg)',
          '&::-webkit-scrollbar': {
            width: 'var(--scrollbar-width, unset)',
            height: 'var(--scrollbar-width, unset)',
          },
          '&::-webkit-scrollbar-track': {
            background: 'var(--scrollbar-bg)',
          },
          '&::-webkit-scrollbar-track:horizontal': {
            'border-block-start': '1px solid var(--scrollbar-border)',
            'border-block-end': '1px solid var(--scrollbar-border)',
          },
          '&::-webkit-scrollbar-track:vertical': {
            'border-inline-start': '1px solid var(--scrollbar-border)',
            'border-inline-end': '1px solid var(--scrollbar-border)',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'var(--scrollbar-fg)',
            'border-radius': '20px',
            border: 'var(--scrollbar-padding, 4px) solid transparent',
            'background-clip': 'content-box',
          },
        };
      },
    },
    {
      values: componentValues,
    }
  );

  // add utility styles (only added to CSS when required)
  addUtilities({
    [`${classNameScrollbar}-none`]: {
      '-ms-overflow-style': 'none',
      'scrollbar-width': 'none',
    },
    [`${classNameScrollbar}-none::-webkit-scrollbar`]: {
      display: 'none',
    },
    [`${classNameScrollbar}-thin, ${classNameScrollbar}-thin-collapse`]: {
      '--scrollbar-width': '10px',
      '--scrollbar-padding': '2px',
      'scrollbar-width': 'thin',
    },
    [`${classNameScrollbar}-thin-collapse`]: {
      '--scrollbar-width': '6px',
      '--scrollbar-padding': '0px',
      'scrollbar-width': 'thin',
    },
  });

  // add colour styles (only added to CSS when required)
  matchUtilities(
    {
      [`${prefixString}scrollbar-track`]: (value) => {
        return {
          '--scrollbar-bg': value,
          '--scrollbar-border': 'var(--scrollbar-bg)',
        };
      },
    },
    {
      values: trackColorsValues,
    }
  );

  matchUtilities(
    {
      [`${prefixString}scrollbar-thumb`]: (value) => {
        return {
          '--scrollbar-fg': value,
        };
      },
    },
    {
      values: thumbColorsValues,
    }
  );
};
