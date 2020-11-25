# Tailwind Plugins

## Introduction

These plugins extend Tailwind to include utility classes for our commonly used FE Boilerplate mixins - Typography sets, Layout, Spacing sets.

## Requirements

- [TailwindCSS](https://tailwindcss.com/)

## Setup

1. Install via npm:

```shell
$ npm install @area17/a17-tailwind-plugins
```

Or, add package to `package.json` dependencies

```json
"a17-tailwind": "@area17/a17-helpers": "^1.0.1"
```

2. Include plugins in `tailwind.config.js`. Configs for each plugin can be found below.

```javascript
const { Container, Spacing, Typography, RatioBox, Layout, Keyline, PseudoElements, GridGap } = require('a17-tailwind');

module.exports = {
  ...

  plugins: [Container, Spacing, Typography, RatioBox, Layout, Keyline, PseudoElements, GridGap]

  ...
};
```

## Plugins

### Container

This plugin creates a class for a page container. It sets the max-width and outer gutters across all of the configured breakpoints. Note that the default Tailwind container plugin will need to be disabled.

#### Usage

```html
<div class="container">
  ...
</div>
```

#### Config

```javascript
module.exports = {
  ...

  theme: {
    screens: {
      xs: { max: '543px' },
      sm: '544px',
      md: '766px',
      lg: '1023px',
      xl: '1440px'
    },
    mainColWidths: {
      xs: 'auto',
      sm: 'auto',
      md: 'auto',
      lg: 'auto',
      xl: '1376px'
    },
    outerGutters: {
      xs: '16px',
      sm: '16px',
      md: '32px',
      lg: '32px',
      xl: 'auto'
    },
  },

  corePlugins: {
    container: false
  }

  ...
};
```

### Spacing

This plugin creates classes for the spacing scale sets. It uses the spacing scale in your `tailwind.config.js` or falls back to the default tailwind spacing values. It creates classes prefixed with both `mt-` and `pt-`.

#### Usage

```html
<div class="mt-outer-1">
  <h1>Lorem ipsum</h1>

  <div class="mt-inner-1">
    ...
  </div>
</div>
```

#### Config

```javascript
module.exports = {
  ...

  theme: {
    spacingGroups: (theme) => ({
      'outer-1': {
        xs: theme('spacing.16'),
        lg: theme('spacing.24')
      },
      'inner-1': {
        xs: theme('spacing.6'),
        md: theme('spacing.10'),
        lg: theme('spacing.16')
      },
    }),
  }

  ...
}
```

If you also have `innerGutters` and `outerGutters` set up, you may want to include your gutters as spacing groups:

```javascript
module.exports = {
  ...

  theme: {
    spacingGroups: (theme) => ({
      'inner-gutter': theme('innerGutters'),
      'outer-gutter': theme('outerGutters'),
      'outer-1': {
        xs: theme('spacing.16'),
        lg: theme('spacing.24')
      },
      'inner-1': {
        xs: theme('spacing.6'),
        md: theme('spacing.10'),
        lg: theme('spacing.16')
      },
      'inner-2': {
        xs: theme('spacing.4'),
        md: theme('spacing.6'),
        lg: theme('spacing.8')
      },
    }),
  }

  ...
}
```

### Typography

This creates classes for the responsive type sets based on predefined scales.

#### Usage

```html
<p class="f-body-1">
  Cras justo odio, dapibus ac facilisis in, egestas eget quam.
</p>
```

#### Config

Each type face requires a config containing it's scale. These are used within the responsive type set configs to create classes.

```javascript
// /setup/base/suisse-400.js

module.exports = {
  'suisse-400-1': {
    'font-size': 10,
    'line-height': 1.2,
    'font-weight': 400
  },
  'suisse-400-2': {
    'font-size': 11,
    'line-height': 1.2,
    'font-weight': 400
  },
  'suisse-400-3': {
    'font-size': 12,
    'line-height': 1.2,
    'font-weight': 400
  }

  ...
};
```

Type set config:

```javascript
// setup/body.js
const suisse400 = require('./base/suisse-400');
const sans = 'Suisse, Arial, sans-serif';

module.exports = {
  theme: {
    fontFamily: {
      sans: sans
    },
    typography: {
      // with tokens
      'body-1': {
        settings: {
          xs: {
            ...suisse400['suisse-400-4'],
            'font-family': sans
          },
          md: suisse400['suisse-400-5'],
          lg: suisse400['suisse-400-6'],
          xl: suisse400['suisse-400-7']
        }
      },
      // with directly entered values
      'caption': {
        settings: {
          xs: {
            'font-family': sans,
            'font-size': 11,
            'line-height': 1.2,
            'text-transform': 'uppercase',
            'letter-spacing': 1
          },
          md: {
            'font-size': 12,
          }
        }
      }
    }
  }
};
```

### Layout

This plugin creates classes to handle column layouts.

#### Usage

```html
<div class="cols-container">
  <div class="cols-3 sm:cols-2 md:cols-4 lg:cols-6 xl:cols-4">
    ...
  </div>
</div>
```

#### Config

```javascript
module.exports = {
  ...

  theme: {
    innerGutters: {
      xs: '16px',
      sm: '16px',
      md: '24px',
      lg: '24px',
      xl: '24px'
    },
    columnCount: {
      xs: 4,
      sm: 4,
      md: 8,
      lg: 12,
      xl: 12
    }
  }

  ...
};
```

### Ratio boxes

This plugin creates classes to be used with html ratio boxes.
All tokens are created with breakpoint prefix for keys not equals to sets.
For elements into sets, components are created

#### Usage

```html
// Tokens
<div class="ratio ratio-1x1 md:ratio-4x3">
  <div class="ratio-content">
    ...
  </div>
</div>

// Sets
<div class="ratio ratio-01">
  <div class="ratio-content">
    ...
  </div>
</div>
```

#### Config

```javascript
const ratios = {
  '1x1': 1,
  '4x3': '4:3',
  '3x2': 3 / 2,
  '16x9': 16 / 9,
  '21x9': 21 / 9,
  '4x5': 4 / 5
};

module.exports = {
  ...

  theme: {
    ratios: {
      ...ratios,
      sets: {
        '01': {
          sm: ratios['1x1']
        },
        '02': {
          sm: ratios['4x3']
        },
        '03': {
          sm: ratios['3x2']
        },
        '04': {
          sm: ratios['3x2'],
          lg: ratios['16x9']
        },
        'cover-full': {
          portrait: ratios['4x3'],
          landscape: ratios['4x5']
        },
        'cover-half': {
          landscape: ratios['4x5']
        }
      }
    }
  }

  ...
};
```

### Keyline

This plugin creates a border that sits in the gutter between elements.

It creates utility classes based on the `borderColor` settings in your Tailwind config (falls back to `colors`).

There is also a `{prefix}:keyline-0` class to remove the keylines at any of your set breakpoints.

#### Usage

```html
<div class="keyline-l-primary"></div>

<div class="md:keyline-l-primary"></div>

<div class="md:keyline-l-primary xl:keyline-0"></div>
```

#### Config

```javascript
module.exports = {
  ...

  theme: {
    borderColor: (theme) => ({
      primary: theme('colors.grey.light'),
      accent: {
        green: theme('colors.green.500'),
        red: theme('colors.red.500')
      }
    })
  }

  ...
}
```

The config above will generate the following classes:

```css
.keyline-l-primary
.sm:keyline-l-primary
.md:keyline-l-primary
.lg:keyline-l-primary
.xl:keyline-l-primary

.keyline-r-primary
.sm:keyline-r-primary
.md:keyline-r-primary
.lg:keyline-r-primary
.xl:keyline-r-primary

.keyline-l-accent-green
.sm:keyline-l-accent-green
.md:keyline-l-accent-green
.lg:keyline-l-accent-green
.xl:keyline-l-accent-green

.keyline-r-accent-red
.sm:keyline-r-accent-red
.md:keyline-r-accent-red
.lg:keyline-r-accent-red
.xl:keyline-r-accent-red

.sm:keyline-0
.md:keyline-0
.lg:keyline-0
.xl:keyline-0
```

### GridGap

This plugin creates classes to handle responsive grid gutters:

* `.gap-gutter`
* `.gap-y-gutter`
* `.gap-x-gutter`

Which are responsive CSS grid gutters to complement [grid-gap](https://tailwindcss.com/docs/gap)

#### Usage

```html
<div class="grid grid-cols-2 gap-gutter">
  ...
</div>
```

Where `grid` and `grid-cols-2` are Tailwind [classes](https://tailwindcss.com/docs/grid-template-columns).

#### Config

```javascript
module.exports = {
  ...

  theme: {
    innerGutters: {
      xs: '16px',
      sm: '16px',
      md: '16px',
      lg: '24px',
      xl: '24px'
    },
  }

  ...
};
```

### DevTools

This plugin creates a boilerplate style tool for the bottom left of your screen which reveals the current breakpoint, `APP_ENV` and a grid column overlay with toggle.

#### Usage

```html
<div class="dev-tools">
  <button class="dev-tools-toggle" onClick="this.nextElementSibling.hidden = !this.nextElementSibling.hidden;"></button>
  <div class="dev-tools-grid" hidden></div>
</div>
```

Add this at the end of your document, before the `</body>`.

To (optionally) display the `APP_ENV` you'll need a `.env` file:

```env
APP_ENV=local
```

#### Config

```javascript
module.exports = {
  ...

  theme: {
    screens: {
      xs: { max: '543px' },
      sm: '544px',
      md: '766px',
      lg: '1023px',
      xl: '1440px'
    },
    mainColWidths: {
      xs: 'auto',
      sm: 'auto',
      md: 'auto',
      lg: 'auto',
      xl: '1376px'
    },
    outerGutters: {
      xs: '16px',
      sm: '16px',
      md: '32px',
      lg: '32px',
      xl: 'auto'
    },
    innerGutters: {
      xs: '16px',
      sm: '16px',
      md: '24px',
      lg: '24px',
      xl: '24px'
    },
    columnCount: {
      xs: 4,
      sm: 4,
      md: 8,
      lg: 12,
      xl: 12
    },
  }

  ...
};
```

## Todo

- Finish adding plugins
- Add tests
- Documentation
