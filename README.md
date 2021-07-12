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
"@area17/a17-tailwind-plugins": "^2.0.0"
```

2. Include plugins in `tailwind.config.js`. Configs for each plugin can be found below.

```javascript
const { Container, Spacing, Typography, RatioBox, Layout, Keyline, PseudoElements, GridGap } = require('a17-tailwind-plugins');

module.exports = {
  ...

  plugins: [Setup, Container, Spacing, Typography, RatioBox, Layout, Keyline, PseudoElements, GridGap, GridLine]

  ...
};
```

## Sample set up files

* [tailwind.config.js](https://code.area17.com/a17/tailwind-plugins/-/blob/v2/sample/tailwind.config.js)
* [frontend.config.json](https://code.area17.com/a17/tailwind-plugins/-/blob/v2/sample/frontend.config.json)


## Plugins

### Setup

This plugin sets up the breakpoint, container width, gutter, column count and breakpoint info as CSS variables that the other plugins here use.

#### Usage

*Produces no CSS classes, is setup for other plugins' classes*

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

### Container

This plugin creates a class for a page container. It sets the max-width and outer gutters across all of the configured breakpoints. Note that the default Tailwind container plugin will need to be disabled.

Also includes a breakout class to allow full 100vw elements inside a container.

#### Usage

```html
<div class="container">
  ...
</div>
```

```html
<div class="container">
  ...
  <div class="breakout">
    <!-- full 100vw box -->
  </div>
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

There are some special, none standard font properties you can set:

* `bold-weight` - sets a variable of `--bold-weight` and sets any `b` or `strong` children of the element to use `font-weight: var(--bold-weight);` to give you control over the font weights
* `font-smoothing` - `true` or `false`, equivalent to Tailwind's `antialiased` and `subpixel-antialiased` classes

```JavaScript
module.exports = {
  theme: {
    families: {
      sans: "\"Helvetica Neue\", Helvetica, Arial, \"Lucida Grande\", sans-serif"
    },
    typography: {
      h1: {
        xs: {
          "font-family": "var(--sans)",
          "font-size": "32",
          "line-height": "1.2",
          "letter-spacing": "-0.02em",
          "bold-weight": "500",
          "font-smoothing": "true"
        },
        md: {
          "font-size": "36px"
        },
        lg: {
          "font-size": "48px"
        }
      }
    }
  }
};
```

Produces CSS:

```CSS
.f-h1 {
  font-family: var(--sans);
  font-size: 32px;
  line-height: 1.2;
  letter-spacing: -0.02em;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  --bold-weight: 500;
}

.f-h1 b, .f-h1 strong {
  font-weight: var(--bold-weight);
}

@media (min-width: 650px) {
  .f-h1 {
    font-size: 36px;
  }
}

@media (min-width: 990px) {
  .f-h1 {
    font-size: 48px;
  }
}
```

### Layout

This plugin creates classes to handle column layouts:

* `.cols-container` on parent, makes a flex row wrap container with a negative inner gutter margin left
* `.cols-N` on child, sets with N columns wide, if inside of `.cols-container` also includes a inner gutter margin left
* `.push-N` on child, sets a margin left of N columns wide
* `.push-N-gutter` on child, sets a margin left of N columns wide with an additional inner gutter width
* `.push-r-N` on child, sets a margin right of N columns wide
* `.push-r-N-gutter` on child, sets a margin right of N columns wide with an additional inner gutter width
* `.cols-ml-reset` on child, resets margin left to 0

Each of these have tailwind responsive classes and all settings are breakpoint+.

Essentially `.cols-container` and multiple `.cols-N` will wrap in a grid as you'd expect with inner gutter margins. Just `.cols-N` on its own has no margins by default.



#### Usage

```html
<div class="cols-container">
  <div class="cols-3 sm:cols-2 md:cols-4 lg:cols-6 xl:cols-4">
    ...
  </div>
</div>
```

Or, without being in a `cols-container`:

```html
<div class="cols-2 md:cols-4 lg:cols-6">
<div class="cols-1 push-1 md:cols-2 md:push-2 lg:cols-3">
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

### Colour Tokens and ApplyColourVariables

These plugin turns colour tokens into CSS variables on the `:root`. And then `ApplyColourVariables` sets your border, text and background colours to these variables if they're found inside of the tokens. You can pass through Hex, RGB, HSL values into your border, text and background colours and not use tokens.

#### Config

```JavaScript
const color = {
  tokens: {
    white: "#fff",
    grey-5: "#f2f2f2",
    grey-10: "#e6e6e6",
    grey-15: "#d9d9d9",
    grey-54: "#757575",
    grey-90: "#1a1a1a",
    black: "#000",
    purple-600: "#6621d9",
    purple-900: "#5319ba"
  },
  borderColor: {
    primary: "grey-10",
    secondary: "grey-15",
    tertiary: "grey-5"
  },
  textColor: {
    title: "black",
    primary: "grey-90",
    secondary: "grey-54",
    accent: "purple-900"
  },
  backgroundColor: {
    primary: "white",
    banner: "#3d4892",
    accent: "purple-600"
  }
};

module.exports = {
  ...

  theme: {
    colorShades: color.shades,
    borderColor: ApplyColourVariables(color.shades, color.borderColor),
    textColor: ApplyColourVariables(color.shades, color.textColor),
    backgroundColor: ApplyColourVariables(color.shades, color.backgroundColor),
  }
  ...
};
```

### Keyline

This plugin creates a border that sits in the gutter between elements and assumes spacing is that of `var(--inner-gutter)`.

It creates utility classes based on the `borderColor` settings in your Tailwind config (falls back to `colors`).

* `keyline-l-primary` draws a keyline to the left of the element in the primary colour
* `keyline-r-primary` draws a keyline to the right of the element in the primary colour
* `md:keyline-l-secondary` draws a keyline to the left of the element in the secondary colour at the medium and up
* `keyline-0` hides both left and right keylines on the element, if previously set
* `md:keyline-0` hides both left and right keylines on the element, if previously set, at medium and up
* `md:keyline-l-0` hides just the left keyline at medium and up
* `md:keyline-right-0` hides just the right keyline and medium and up

*NB: for keylines in grids of items, you might be better served with GridLines and a Tailwind grid*

#### Usage

```html
<div class="keyline-l-primary"></div>

<div class="md:keyline-l-primary"></div>

<div class="md:keyline-l-primary xl:keyline-0"></div>

<div class="keyline-l-secondary keyline-r-secondary md:keyline-l-tertiary md:keyline-r-0 lg:keyline-0 xl:keyline-r-tertiary"></div>
```

#### Config

```javascript
module.exports = {
  ...

  theme: {
    borderColor: (theme) => ({
      primary: "grey-10",
      secondary: "grey-15",
      tertiary: "grey-5"
    })
  }

  ...
}
```

### GridLine

A series of classes to draw grid strokes inside the gutters of a grid. This is specifically intended to be used with Tailwind's `grid` classes and assumes your gutters are all `--inner-gutter` in size. That means, if you wish to add more vertical spacing, you'll need to do this with padding on the children.

The classes automatically account for first row, first of row, last row and last of row to only draw the internal grid lines and have no undesired lines outside of the grid of items. They will do this for any amount of columns at any breakpoint.

The classes support up to the maximum amount of columns at each breakpoint; so if your breakpoint has 12 design columns, you could have functioning grid lines up to 12 columns. If you need more, you can specify more with a `maxCols` object in your config.

You can mix item width, item height, row and column classes and control the color of the horizontal and vertical strokes independently.

* `grid-line-x` - draws grid lines above each child, each is the width of the child, except the first row
* `grid-line-xfull` - essentially draws row lines
* `grid-line-y` - draws grid lines to the left of each child, each is the height of the child, except the first column
* `grid-line-yfull` - essentially draws column lines
* `grid-line-x-primary` - makes the horizontal grid lines the primary border color
* `grid-line-y-primary` - makes the vertical grid lines the primary border color
* `grid-line-xy-primary` - makes both the horizontal and vertical grid lines the primary border color

The gridline color classes also have responsive states, which are breakpoint+ to switch them on, eg:

* `md:grid-line-x-primary` - switches primary border color horizontal grid lines at `md` breakpoint

(the intention being you likely don't want grid lines at smaller breakpoints because the gutters will likely be very small)


#### Usage

```html
<!-- Lines above each item, the width of each item, primary border color -->
<ul class="grid sm:grid-cols-2 lg:grid-cols-4 gap-gutter grid-line-x grid-line-x-primary">
  <li>...</li>
  ...
</ul>

<!-- Row lines, primary border color -->
<ul class="grid sm:grid-cols-2 lg:grid-cols-4 gap-gutter grid-line-xfull grid-line-x-primary">
  <li>...</li>
  ...
</ul>

<!-- Lines at the side each item, the height of each item, primary border color -->
<ul class="grid sm:grid-cols-2 lg:grid-cols-4 gap-gutter grid-line-y grid-line-y-primary">
  <li>...</li>
  ...
</ul>

<!-- Column lines, primary border color -->
<ul class="grid sm:grid-cols-2 lg:grid-cols-4 gap-gutter grid-line-yfull grid-line-y-primary">
  <li>...</li>
  ...
</ul>

<!-- Row and column lines, primary border color -->
<ul class="grid sm:grid-cols-2 lg:grid-cols-4 gap-gutter grid-line-xfull grid-line-yfull grid-line-xy-primary">
  <li>...</li>
  ...
</ul>
```

#### Config

```javascript
module.exports = {
  ...

  theme: {
    borderColor: {
      primary: 'red',
      secondary: 'green',
      tertiary: 'blue'
    }
  }

  ...
}
```

Optional, to have a different number of maximum columns:

```javascript
module.exports = {
  ...

  theme: {
    maxCols: {
      sm: 4,
      md: 10,
      lg: 20,
      xl: 20
    }
  }

  ...
}
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

None

## Todo

- Finish adding plugins
- Add tests
- Documentation
