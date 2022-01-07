# AREA 17 Tailwind Plugins

## Introduction

A series of plugins to enable/encourage systematised web design/development and some other useful utility classes.

AREA 17 strongly believes in design systems and then using these systems to build products for both ourselves and our clients. Tailwind is thus a natural fit for us, but we wanted more "system" to the utilities to tie closer to our design methodology.

We also wanted to include a few utility classes that would simplify some common styling requirements.

## Requirements

* [TailwindCSS](https://tailwindcss.com/)
  * tested in Tailwind <code>2.x.x</code> (with and without JIT) and <code>3.0.x</code>

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
* [Walk through of our set up](http://tailwind-plugins.dev.area17.com/Setup.php)


## Documentation and demos

* [tailwind-plugins.dev.area17.com](http://tailwind-plugins.dev.area17.com/)

### The plugins

* [DevTools](http://tailwind-plugins.dev.area17.com/DevTools.php) - generates the CSS for the grid helper (in the bottom left corner of the page)

* [ColorTokens](http://tailwind-plugins.dev.area17.com/ColorTokens.php) - generates colour variables
* [ApplyColourVariables](http://tailwind-plugins.dev.area17.com/ApplyColourVariables.php) - generates utility classes

* [SpacingTokens](http://tailwind-plugins.dev.area17.com/SpacingTokens.php) - generates `rem` based spacing tokens based on pixel based scales or inputs (updated in `v3.4.0`)
* [Spacing](http://tailwind-plugins.dev.area17.com/Spacing.php) - generates responsive spacing classes

* [Container](http://tailwind-plugins.dev.area17.com/Container.php) - generates a custom container class based on supplied config
* [Layout](http://tailwind-plugins.dev.area17.com/Layout.php) - generates utility classes to set elements onto the design grid
* [GridLayout](http://tailwind-plugins.dev.area17.com/GridLayout.php) - generates CSS grid utility classes to set elements onto the design grid (new in `v3.3.0`)
* [GridGap](http://tailwind-plugins.dev.area17.com/GridGap.php) - generates grid gap utilities based on the configured grid

* [Typography](http://tailwind-plugins.dev.area17.com/Typography.php) - generates responsive typography classes

* [GridLine](http://tailwind-plugins.dev.area17.com/GridLine.php) - generates vertical and horizontal grid line/stroke classes (borders in the gutters between elements)
* [Keyline](http://tailwind-plugins.dev.area17.com/Keyline.php) - generates keylines in the gutter between elements

* [PseudoElements](http://tailwind-plugins.dev.area17.com/PseudoElements.php) - adds additional pseudo classes

* [RatioBox](http://tailwind-plugins.dev.area17.com/RatioBox.php) - generates ratio box utilities

* [Underline](http://tailwind-plugins.dev.area17.com/Underline.php) - generates text underline styling utilities (new in `v3.1.0`)

* [CssInJs](http://tailwind-plugins.dev.area17.com/CssInJs.php) - allows you to pass through CSS from your Tailwind config (new in `v3.2.0`)
* [Components](http://tailwind-plugins.dev.area17.com/Components.php) - allows you to generate component CSS from your Tailwind config (new in `v3.2.0`)

* [FullBleedScroller](http://tailwind-plugins.dev.area17.com/FullBleedScroller.php) - easy full bleed `overflow-x: auto` scrolling containers (new in `v3.6.0`)

* [InteractionMediaQueries](http://tailwind-plugins.dev.area17.com/InteractionMediaQueries.php) - adds interaction based media queries, think targeting devices with hover capability (new in `v3.6.0`)

* [Scrollbar](http://tailwind-plugins.dev.area17.com/Scrollbar.php) - scrollbar styling, unifies the CSS standard and non-standard scrollbar styling (new in `v3.6.0`)


### Breaking changes to Layout in `v3.0.0`

The generated class names in the Layout plugin have been changed to align them closer to Tailwind. [See the migration notes](http://tailwind-plugins.dev.area17.com/Layout.php#v3-0-0) and also [see the changelog](https://github.com/area17/tailwind-plugins/blob/main/changelog.md#300---2021-12-07).

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

