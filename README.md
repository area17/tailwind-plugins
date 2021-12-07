# Tailwind Plugins

## Introduction

A series of plugins to enable/encourage systematised web design/development and some other useful utility classes.

AREA 17 strongly believes in design systems and then using these systems to build products for both ourselves and our clients. Tailwind is thus a natural fit for us, but we wanted more "system" to the utilities to tie closer to our design methodology.

We also wanted to include a few utility classes that would simplify some common styling requirements.

## Requirements

* [TailwindCSS](https://tailwindcss.com/)

## Setup

1. Install via npm:

```shell
$ npm install @area17/a17-tailwind-plugins
```

Or, add package to `package.json` dependencies

```json
"@area17/a17-tailwind-plugins": "^3.0.1"
```

2. Include plugins in `tailwind.config.js`. Configs for each plugin can be found below.

```javascript
const { Container, SpacingTokens, Spacing, Typography, RatioBox, Layout, Keyline, PseudoElements, GridGap } = require('@area17/a17-tailwind-plugins');

module.exports = {
  ...

  plugins: [Setup, Container, SpacingTokens, Spacing, Typography, RatioBox, Layout, Keyline, PseudoElements, GridGap, GridLine]

  ...
};
```

## Sample set up files

* [tailwind.config.js](https://code.area17.com/a17/tailwind-plugins/-/blob/v2/sample/tailwind.config.js)
* [frontend.config.json](https://code.area17.com/a17/tailwind-plugins/-/blob/v2/sample/frontend.config.json)
* [walk through of our set up](http://tailwind-plugins.dev.area17.com/Setup.php)


## Documentation and demos

* [tailwind-plugins.dev.area17.com](http://tailwind-plugins.dev.area17.com/)

### The plugins

* [DevTools](http://tailwind-plugins.dev.area17.com/DevTools.php) - generates the CSS for the grid helper (in the bottom left corner of the page)

* [ColorTokens](http://tailwind-plugins.dev.area17.com/ColorTokens.php) - generates colour variables
* [ApplyColourVariables](http://tailwind-plugins.dev.area17.com/ApplyColourVariables.php) - generates utility classes

* [SpacingTokens](http://tailwind-plugins.dev.area17.com/SpacingTokens.php) - generates rem based spacing tokens based on pixel based inputs
* [Spacing](http://tailwind-plugins.dev.area17.com/Spacing.php) - generates responsive spacing classes

* [Container](http://tailwind-plugins.dev.area17.com/Container.php) - generates a custom container class based on supplied config
* [Layout](http://tailwind-plugins.dev.area17.com/Layout.php) - generates utility classes to set elements onto the design grid
* [GridGap](http://tailwind-plugins.dev.area17.com/GridGap.php) - generates grid gap utilities based on the configured grid

* [Typography](http://tailwind-plugins.dev.area17.com/Typography.php) - generates responsive typography classes

* [GridLine](http://tailwind-plugins.dev.area17.com/GridLine.php) - generates vertical and horizontal grid line/stroke classes (borders in the gutters between elements)
* [Keyline](http://tailwind-plugins.dev.area17.com/Keyline.php) - generates keylines in the gutter between elements

* [PseudoElements](http://tailwind-plugins.dev.area17.com/PseudoElements.php) - adds additional pseudo classes

* [RatioBox](http://tailwind-plugins.dev.area17.com/RatioBox.php) - generates ratio box utilities


### Breaking changes to Layout in `v3.0.0`

The generated class names in the Layout plugin have been changed to align them closer to Tailwind. [See the migration notes](http://tailwind-plugins.dev.area17.com/Layout.php#v3-0-0) and also [see the changelog](https://github.com/area17/tailwind-plugins/blob/main/changelog.md#300---2021-12-07).
