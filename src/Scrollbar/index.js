module.exports = function ({ addBase, addComponents, matchComponents, theme, prefix, config }) {
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
        trackColorsValues[name] = `var(--${name})`;
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
        thumbColorsValues[name] = `var(--${name})`;
      } else {
        thumbColorsValues[name] = setting;
      }
    }
  });

  // base styles (always added to the CSS regardless of usage in site)
  const baseStyles = {
    [`[class*='${prefixString}scrollbar-track-'], [class*='${prefixString}scrollbar-thumb-']`]:
      {
        '--scrollbar-bg': '#fafafa',
        '--scrollbar-fg': '#c1c1c1',
        '--scrollbar-border': '#e8e8e8',
        'scrollbar-color': 'var(--scrollbar-fg) var(--scrollbar-bg)',
      },
    [`[class*='${prefixString}scrollbar-track-']::-webkit-scrollbar, [class*='${prefixString}scrollbar-thumb-']::-webkit-scrollbar`]:
      {
        width: 'var(--scrollbar-width, 15px)',
        height: 'var(--scrollbar-width, 15px)',
      },
    [`[class*='${prefixString}scrollbar-track-']::-webkit-scrollbar-track, [class*='${prefixString}scrollbar-thumb-']::-webkit-scrollbar-track`]:
      {
        background: 'var(--scrollbar-bg)',
      },
    [`[class*='${prefixString}scrollbar-track-']::-webkit-scrollbar-track:horizontal, [class*='${prefixString}scrollbar-thumb-']::-webkit-scrollbar-track:horizontal`]:
      {
        'border-block-start': '1px solid var(--scrollbar-border)',
        'border-block-end': '1px solid var(--scrollbar-border)',
      },
    [`[class*='${prefixString}scrollbar-track-']::-webkit-scrollbar-track:vertical, [class*='${prefixString}scrollbar-thumb-']::-webkit-scrollbar-track:vertical`]:
      {
        'border-inline-start': '1px solid var(--scrollbar-border)',
        'border-inline-end': '1px solid var(--scrollbar-border)',
      },
    [`[class*='${prefixString}scrollbar-track-']::-webkit-scrollbar-thumb, [class*='${prefixString}scrollbar-thumb-']::-webkit-scrollbar-thumb`]:
      {
        background: 'var(--scrollbar-fg)',
        'border-radius': '20px',
        border: 'var(--scrollbar-padding, 4px) solid transparent',
        'background-clip': 'content-box',
      },
  };

  addBase(baseStyles);

  // add component styles (only added to CSS when required)
  const componentStyles = {
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
      '--scrollbar-bg': '#fafafa',
      '--scrollbar-fg': '#c1c1c1',
      '--scrollbar-border': '#e8e8e8',
      'scrollbar-width': 'thin',
    },
    [`${classNameScrollbar}-thin-collapse`]: {
      '--scrollbar-width': '6px',
      '--scrollbar-padding': '0px',
      'scrollbar-width': 'thin',
    },
    [`${classNameScrollbar}-thin::-webkit-scrollbar, ${classNameScrollbar}-thin-collapse::-webkit-scrollbar`]:
      {
        width: 'var(--scrollbar-width, unset)',
        height: 'var(--scrollbar-width, unset)',
      },
    [`${classNameScrollbar}-thin::-webkit-scrollbar-track, ${classNameScrollbar}-thin-collapse::-webkit-scrollbar-track`]:
      {
        background: 'var(--scrollbar-bg)',
      },
    [`${classNameScrollbar}-thin::-webkit-scrollbar-track:horizontal, ${classNameScrollbar}-thin-collapse::-webkit-scrollbar-track:horizontal`]:
      {
        'border-top': '1px solid var(--scrollbar-border)',
        'border-bottom': '1px solid var(--scrollbar-border)',
      },
    [`${classNameScrollbar}-thin::-webkit-scrollbar-track:vertical, ${classNameScrollbar}-thin-collapse::-webkit-scrollbar-track:vertical`]:
      {
        'border-inline-start': '1px solid var(--scrollbar-border)',
        'border-inline-end': '1px solid var(--scrollbar-border)',
      },
    [`${classNameScrollbar}-thin::-webkit-scrollbar-thumb, ${classNameScrollbar}-thin-collapse::-webkit-scrollbar-thumb`]:
      {
        background: 'var(--scrollbar-fg)',
        'border-radius': '20px',
        border: 'var(--scrollbar-padding) solid transparent',
        'background-clip': 'content-box',
      },
  };

  addComponents(componentStyles);

  // add colour styles (only added to CSS when required)
  matchComponents(
    {
      [`${prefixString}scrollbar-track`]: (value) => {
        return {
          '--scrollbar-bg': value,
          '--scrollbar-border': 'var(--scrollbar-bg)',
        }
      },
    },
    {
      values: trackColorsValues,
    },
  );

  matchComponents(
    {
      [`${prefixString}scrollbar-thumb`]: (value) => {
        return {
          '--scrollbar-fg': value,
        }
      },
    },
    {
      values: thumbColorsValues,
    },
  );
};
