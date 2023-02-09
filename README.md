# AREA 17 Tailwind Plugins

## Introduction

A series of plugins to enable/encourage systematised web design/development and some other useful utility classes.

AREA 17 strongly believes in design systems and then using these systems to build products for both ourselves and our clients. Tailwind is thus a natural fit for us, but we wanted more "system" to the utilities to tie closer to our design methodology.

We also wanted to include a few utility classes that would simplify some common styling requirements.

## Requirements

* [TailwindCSS](https://tailwindcss.com/)
  * tested in Tailwind <code>2.x.x</code> (with and without JIT) and <code>3.2.x</code>

## Setup

1. Install via npm:

```shell
$ npm install @area17/a17-tailwind-plugins
```

2. Include plugins in `tailwind.config.js`. Configs for each plugin can be found below.

```javascript
const { Setup, RatioBox, Layout, GridLine, PseudoElements, DevTools, GridGap, Container, Keyline, Spacing, Typography, ColorTokens, ApplyColorVariables, Underline, Components, CssInJs, GridLayout, SpacingTokens } = require('@area17/a17-tailwind-plugins');

module.exports = {
  ...

  plugins: [Setup, Typography, Spacing, RatioBox, Layout, GridLine, PseudoElements, DevTools, GridGap, Container, Keyline, ColorTokens, Underline, Components, CssInJs, GridLayout],

  ...
};
```

## Sample set up files

* [tailwind.config.js](https://github.com/area17/tailwind-plugins/blob/main/docs/tailwind.config.js)
* [frontend.config.json](https://github.com/area17/tailwind-plugins/blob/main/docs/frontend.config.json)
* [Walk through of our set up](https://area17.github.io/tailwind-plugins/Setup.html)


## Documentation and demos

* [area17.github.io/tailwind-plugins/](https://area17.github.io/tailwind-plugins/)

### The plugins

* [DevTools](https://area17.github.io/tailwind-plugins/DevTools.html) - generates the CSS for the grid helper (in the bottom left corner of the page)

* [ColorTokens](https://area17.github.io/tailwind-plugins/ColorTokens.html) - generates colour variables
* [ApplyColourVariables](https://area17.github.io/tailwind-plugins/ApplyColourVariables.html) - generates utility classes

* [SpacingTokens](https://area17.github.io/tailwind-plugins/SpacingTokens.html) - generates `rem` based spacing tokens based on pixel based scales or inputs (updated in `v3.4.0`)
* [Spacing](https://area17.github.io/tailwind-plugins/Spacing.html) - generates responsive spacing classes

* [Container](https://area17.github.io/tailwind-plugins/Container.html) - generates a custom container class based on supplied config
* [Layout](https://area17.github.io/tailwind-plugins/Layout.html) - generates utility classes to set elements onto the design grid
* [GridLayout](https://area17.github.io/tailwind-plugins/GridLayout.html) - generates CSS grid utility classes to set elements onto the design grid (new in `v3.3.0`)
* [GridGap](https://area17.github.io/tailwind-plugins/GridGap.html) - generates grid gap utilities based on the configured grid

* [Typography](https://area17.github.io/tailwind-plugins/Typography.html) - generates responsive typography classes

* [GridLine](https://area17.github.io/tailwind-plugins/GridLine.html) - generates vertical and horizontal grid line/stroke classes (borders in the gutters between elements)
* [Keyline](https://area17.github.io/tailwind-plugins/Keyline.html) - generates keylines in the gutter between elements

* [PseudoElements](https://area17.github.io/tailwind-plugins/PseudoElements.html) - adds additional pseudo classes

* [RatioBox](https://area17.github.io/tailwind-plugins/RatioBox.html) - generates ratio box utilities

* [Underline](https://area17.github.io/tailwind-plugins/Underline.html) - generates text underline styling utilities (new in `v3.1.0`)

* [CssInJs](https://area17.github.io/tailwind-plugins/CssInJs.html) - allows you to pass through CSS from your Tailwind config (new in `v3.2.0`)
* [Components](https://area17.github.io/tailwind-plugins/Components.html) - allows you to generate component CSS from your Tailwind config (new in `v3.2.0`)

* [FullBleedScroller](https://area17.github.io/tailwind-plugins/FullBleedScroller.html) - easy full bleed `overflow-x: auto` scrolling containers (new in `v3.6.0`)

* [InteractionMediaQueries](https://area17.github.io/tailwind-plugins/InteractionMediaQueries.html) - adds interaction based media queries, think targeting devices with hover capability (new in `v3.6.0`)

* [Scrollbar](https://area17.github.io/tailwind-plugins/Scrollbar.html) - scrollbar styling, unifies the CSS standard and non-standard scrollbar styling (new in `v3.6.0`)


### Breaking changes to Layout in `v3.0.0`

The generated class names in the Layout plugin have been changed to align them closer to Tailwind. [See the migration notes](https://area17.github.io/tailwind-plugins/Layout.html#v3-0-0) and also [see the changelog](https://github.com/area17/tailwind-plugins/blob/main/changelog.md#300---2021-12-07).

## Contribution

### Code of Conduct

AREA 17 is dedicated to building a welcoming, diverse, safe community. We expect everyone participating in the AREA 17 community to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it. Please follow it.

### Adding a new plugin

See [adding a new plugin](https://github.com/area17/tailwind-plugins/tree/main/docs#adding-a-new-plugin)

### Bug reports and features submission

To submit an issue or request a feature, please do so on [Github](https://github.com/area17/tailwind-plugins/issues).

If you file a bug report, your issue should contain a title and a clear description of the issue. You should also include as much relevant information as possible and a code sample that demonstrates the issue. The goal of a bug report is to make it easy for yourself - and others - to replicate the bug and develop a fix.

Remember, bug reports are created in the hope that others with the same problem will be able to collaborate with you on solving it. Do not expect that the bug report will automatically see any activity or that others will jump to fix it. Creating a bug report serves to help yourself and others start on the path of fixing the problem.

## Versioning scheme

Our Tailwind Plugins follows [Semantic Versioning](https://semver.org/). Major releases are released only when breaking changes are necessary, while minor and patch releases may be released as often as every week. Minor and patch releases should never contain breaking changes.

When referencing Tailwind Plugins from your application, you should always use a version constraint such as `^1.0`, since major releases of Tailwind Plugins will include breaking changes.

