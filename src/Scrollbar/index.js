module.exports = function ({ addBase, theme }) {
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

  let styles = {
    '.scrollbar-none': {
      '-ms-overflow-style': 'none',
      'scrollbar-width': 'none',
    },
    '.scrollbar-none::-webkit-scrollbar': {
      display: 'none',
    },
    '.scrollbar-thin, .scrollbar-thin-collapse': {
      '--scrollbar-width': '10px',
      '--scrollbar-padding': '2px',
      '--scrollbar-bg': '#fafafa',
      '--scrollbar-fg': '#c1c1c1',
      '--scrollbar-border': '#e8e8e8',
      'scrollbar-width': 'thin',
    },
    '.scrollbar-thin-collapse': {
      '--scrollbar-width': '6px',
      '--scrollbar-padding': '0px',
      'scrollbar-width': 'thin',
    },
    '.scrollbar-thin::-webkit-scrollbar, .scrollbar-thin-collapse::-webkit-scrollbar':
      {
        width: 'var(--scrollbar-width, unset)',
        height: 'var(--scrollbar-width, unset)',
      },
    '.scrollbar-thin::-webkit-scrollbar-track, .scrollbar-thin-collapse::-webkit-scrollbar-track':
      {
        background: 'var(--scrollbar-bg)',
      },
    '.scrollbar-thin::-webkit-scrollbar-track:horizontal, .scrollbar-thin-collapse::-webkit-scrollbar-track:horizontal':
      {
        'border-top': '1px solid var(--scrollbar-border)',
        'border-bottom': '1px solid var(--scrollbar-border)',
      },
    '.scrollbar-thin::-webkit-scrollbar-track:vertical, .scrollbar-thin-collapse::-webkit-scrollbar-track:vertical':
      {
        'border-left': '1px solid var(--scrollbar-border)',
        'border-right': '1px solid var(--scrollbar-border)',
      },
    '.scrollbar-thin::-webkit-scrollbar-thumb, .scrollbar-thin-collapse::-webkit-scrollbar-thumb':
      {
        background: 'var(--scrollbar-fg)',
        'border-radius': '20px',
        border: 'var(--scrollbar-padding) solid transparent',
        'background-clip': 'content-box',
      },
    "[class*='scrollbar-track-'], [class*='scrollbar-thumb-']": {
      '--scrollbar-bg': '#fafafa',
      '--scrollbar-fg': '#c1c1c1',
      '--scrollbar-border': '#e8e8e8',
      'scrollbar-color': 'var(--scrollbar-fg) var(--scrollbar-bg)',
    },
    "[class*='scrollbar-track-']::-webkit-scrollbar, [class*='scrollbar-thumb-']::-webkit-scrollbar":
      {
        width: 'var(--scrollbar-width, 15px)',
        height: 'var(--scrollbar-width, 15px)',
      },
    "[class*='scrollbar-track-']::-webkit-scrollbar-track, [class*='scrollbar-thumb-']::-webkit-scrollbar-track":
      {
        background: 'var(--scrollbar-bg)',
      },
    "[class*='scrollbar-track-']::-webkit-scrollbar-track:horizontal, [class*='scrollbar-thumb-']::-webkit-scrollbar-track:horizontal":
      {
        'border-top': '1px solid var(--scrollbar-border)',
        'border-bottom': '1px solid var(--scrollbar-border)',
      },
    "[class*='scrollbar-track-']::-webkit-scrollbar-track:vertical, [class*='scrollbar-thumb-']::-webkit-scrollbar-track:vertical":
      {
        'border-left': '1px solid var(--scrollbar-border)',
        'border-right': '1px solid var(--scrollbar-border)',
      },
    "[class*='scrollbar-track-']::-webkit-scrollbar-thumb, [class*='scrollbar-thumb-']::-webkit-scrollbar-thumb":
      {
        background: 'var(--scrollbar-fg)',
        'border-radius': '20px',
        border: 'var(--scrollbar-padding, 4px) solid transparent',
        'background-clip': 'content-box',
      },
  };

  Object.entries(trackColors).map((a) => {
    const [type, obj] = a;
    Object.entries(obj).map((b) => {
      const [name, color] = b;
      let className = '.scrollbar-track-';
      if (type !== 'token' && type !== 'track') {
        className += `${type}-`;
      }
      className += name;
      styles[className] = {
        '--scrollbar-bg': color,
        '--scrollbar-border': 'var(--scrollbar-bg)',
      };
    });
  });

  Object.entries(thumbColors).map((a) => {
    const [type, obj] = a;
    Object.entries(obj).map((b) => {
      const [name, color] = b;
      let className = '.scrollbar-thumb-';
      if (type !== 'token' && type !== 'thumb') {
        className += `${type}-`;
      }
      className += name;
      styles[className] = {
        '--scrollbar-fg': color,
      };
    });
  });

  addBase(styles);
};
