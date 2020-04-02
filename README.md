# Tailwind Plugins

## Introduction

These plugins extend Tailwind to include utility classes for our commonly used FE Boilerplate mixins - Typography sets, Layout, Spacing sets.

## Requirements

- [TailwindCSS](https://tailwindcss.com/)

## Setup

1. Add package to `package.json` dependencies

```json
"a17-tailwind": "git+ssh://git@code.area17.com:a17/tailwind-plugins.git"
```

2. Include plugins in `tailwind.config.js`. Configs for each plugin can be found below.

```javascript
const { Container, Spacing, Typography } = require('a17-tailwind');

module.exports = {
  ...

  plugins: [Container, Typography, Spacing]

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
      md: '768px',
      lg: '1024px',
      xl: '1440px'
    },

    'main-col-widths': {
      xl: '1220px',
      lg: 'fluid',
      md: 'fluid',
      sm: 'fluid',
      xs: 'fluid'
    },

    'outer-gutters': {
      xl: '60px',
      lg: '36px',
      md: '24px',
      sm: '16px',
      xs: '16px'
    }
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
        xs: theme('spacing.11'),
        md: theme('spacing.12'),
        lg: theme('spacing.13'),
        xl: theme('spacing.14')
      },

      'inner-1': {
        xs: theme('spacing.9'),
        md: theme('spacing.10'),
        lg: theme('spacing.11'),
        xl: theme('spacing.12')
      },

      'inner-2': {
        xs: theme('spacing.6'),
        md: theme('spacing.9'),
        lg: theme('spacing.10'),
        xl: theme('spacing.11')
      },

      'inner-3': {
        xs: theme('spacing.4'),
        md: theme('spacing.5'),
        lg: theme('spacing.6'),
        xl: theme('spacing.8')
      },

      'inner-4': {
        xs: theme('spacing.2'),
        lg: theme('spacing.3'),
        xl: theme('spacing.4')
      },

      'inner-5': {
        xs: theme('spacing.1')
      }
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

module.exports = {
  'body-1': {
    'font-family': 'sans',
    settings: {
      xs: suisse400['suisse-400-4'],
      md: suisse400['suisse-400-5'],
      lg: suisse400['suisse-400-6'],
      xl: suisse400['suisse-400-7']
    }
  },

  'body-2': {
    'font-family': 'sans',
    settings: {
      xs: suisse400['suisse-400-8'],
      md: suisse400['suisse-400-9'],
      lg: suisse400['suisse-400-10']
    }
  }
};
```

Finally it needs to be added to the main `tailwind.config.js`. This is where you can also set the font-family stacks

```javascript
module.exports = {
  ...

  theme: {
    typography: {
      family: {
        sans: "Suisse, Helvetica, Arial, sans-serif",
        serif: "Georgia, serif"
      },

      sets: {
        ...require('./setup/typography/body'),
      }
    }
  }

  ...
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
      md: '16px',
      lg: '24px',
      xl: '24px'
    },

    columnCount: {
      xs: 6,
      sm: 6,
      md: 12,
      lg: 12,
      xl: 12
    },
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
<div class=".ratio .ratio-1x1 .md:ratio-4x3">
  <div class=".ratio-content">
    ...
  </div>
</div>

// Sets
<div class=".ratio .ratio-01">
  <div class=".ratio-content">
    ...
  </div>
</div>
<div class=".ratio .ratio-cover-full ">
  <div class=".ratio-content">
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

## Todo

- Finish adding plugins
- Add tests
- Documentation
