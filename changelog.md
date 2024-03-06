# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [4.0.4] - 2024-03-06

### Fixed

- Make sure the `GridLayout` and `GridGap` plugins are working with prefix.

## [4.0.3] - 2024-03-05

### Changed

- Changed `Typography` plugin to allow any font/text property, which also fixes the overriding caveat of being limited to a preset list of properties

## [4.0.2] - 2024-03-05

### Added

- added `text-transform` to `Typography` plugin defaults

## [4.0.1] - 2024-03-01

### Fixed

- fixed `Typography` plugin generating excessive CSS variables for smaller CSS output

## [4.0.0] - 2024-02-21

### Changed

- Fix typo in frontend config, this is a **breaking change** as this require updating config file when upgrading to this version :

For Spacing now use "arbitraries" instead of "arbritraries"

## [3.14.0] - 2024-02-18

### Changed

- Underline - Improve how underline variants are generated

## [3.13.0] - 2024-02-14

### Fixed

- Fix usage of a global Prefix with the plugins
  For example by setting up `a17-` as prefix, the generated classes will look like this :
  ```
  .container => .a17-container
  .f-heading-01 => .a17-f-heading-01
  ```

## [3.12.0] - 2024-01-23

### Changed

- `npm audit` updated browser sync
- updated node version to `20.11.0`

## [3.11.1] - 2024-01-22

### Fixed

- `Typography` plugin updated to fix broken typography CSS variable names when making CSS changes whilst using Vite to compile
  Previously, the responsive CSS variables could get erroneous duplicates of the type style name in the variable name - eg:
  ```
  @media (min-width: 990px)
    :root {
      --f-h1--f-h1-font-size: 3rem;
    }
  }
  ```
  The behavior seemed only to manifest itself in Vite 5.
  An updated deep clone and an update to property naming fixes the issue.

## [3.11.0] - 2024-01-18

### Changed

- Update dependencies - TailwindCSS >2.4.x
- ran `npm update`

## [3.10.0] - 2023-12-07

## Added

- add `ms-`, `me-`, `ps-`, `pe-`, `start-` and `end-`

### Fixed

- make vw calc variants demo more clear
- layout and typography tests updated

### Changed

- ran eslint/prettier
- ran `npm update`

## [3.9.0] - 2023-06-22

### Changed

- refactor typography generation to use CSS variables to allow overridable type

## [3.8.1] - 2023-04-13

### Changed

Readme updated

## [3.8.0] - 2023-04-13

## Added

- `BackgroundFill` - draws a 100vw background colour pseudo layer
- `StrokeFull` - draws a 100vw stroke pseudo layer

### Changed

Re-arranged `index.html` to group plugins.

## [3.7.2] - 2023-03-16

## Added

Docs have been added to this repo, using GitHub pages, see `/docs/README.md`.

### Fixed
- update `ApplyColorVariables` to handle `-` in token names better - [e2bbb75](https://github.com/area17/tailwind-plugins/pull/8)

Can now handle:

```
"color": {
  "tokens": {
    "grey-950": "#0D0C0C",
    "grey-900": "#1B1918",
    "grey-850": "#282525",
    "grey-700": "#ADADAD",
    "grey-100": "#D3D3D3",
    "green": "#4BB543",
    "red": {
      "100": "#D3B2C0",
      "400": "#EF4637",
      "500": "#EE3523",
      "700": "#772848",
      "800": "#6C002C"
    },
    "purple": "#793CB8",
    "purple-light": "rgba(121, 60, 184, 0.1)"
  },
  "text": {
    "text": "grey-700",
    "go": "green",
    "danger": "red-400",
    "tag": "purple",
    "tip": "purple-light",
    "custom": "#00f"
  }
}

```

Previously the `text-tip` would be incorrectly set to `var(--purple)` and not `var(--purple-light)` as the `ApplyColorVariables` func would find `purple` before `purple-light`.

## [3.7.1] - 2022-12-13

### Fixed
- Clean and lock dependencies version - [f844563](https://github.com/area17/tailwind-plugins/pull/7)

## [3.6.2] - 2022-08-03

### Summary of main changes

Merged PRs:

- Spacing Group Updates - [5](https://github.com/area17/tailwind-plugins/pull/5)
- Update test snapshot and docs css with tailwind-3.1.6 - [4](https://github.com/area17/tailwind-plugins/pull/4)
- Update Github link - [3](https://github.com/area17/tailwind-plugins/pull/3)
- Prettier and ESLint upgrades - [2](https://github.com/area17/tailwind-plugins/pull/2)

## Added

- Added gap and positioning properties to spacing plugin - [5](https://github.com/area17/tailwind-plugins/pull/5)
- Added prettier and eslint as npm scripts - [2](https://github.com/area17/tailwind-plugins/pull/2)

### Changed

- Tailwind version of docs updated to latest - [5](https://github.com/area17/tailwind-plugins/pull/5)
- Container and Typography tests updated - [4](https://github.com/area17/tailwind-plugins/pull/4)
- Update Github link in docs [3](https://github.com/area17/tailwind-plugins/pull/3)
- Upgraded prettier and eslint (and corresponding plugins) to latest stable versions - [2](https://github.com/area17/tailwind-plugins/pull/2)
- Set `trailingComma = es5`, as it looked like that was already been used in most places - [2](https://github.com/area17/tailwind-plugins/pull/2)

### Removed

- Removed deprecated config from `.eslintrc` - [2](https://github.com/area17/tailwind-plugins/pull/2)

## [3.6.1] - 2022-01-07

### Summary of main changes

Adds `FullBleedScroller`, `InteractionMediaQueries` and `Scrollbar` to `src/index`


## [3.6.0] - 2022-01-07

### Summary of main changes

New plugins, `FullBleedScroller`, `InteractionMediaQueries` and `Scrollbar`, updates to `Container` to make it more useful and `vw` additions to `Layout`.

### Added

- `FullBleedScroller` - easy full bleed `overflow-x: auto` scrolling containers
- `InteractionMediaQueries` - adds interaction based media queries, think targeting devices with hover capability
- `Scrollbar` - scrollbar styling, unifies the CSS standard and non-standard scrollbar styling

### Changed

- `Container` has been refactored to
  - allow nesting of `.container`
  - `.breakout` controls gutters to be inline with `.container` if need be
  - `.container-reset` and `.breakout-reset` styles added
- `Layout` has additional `vw` calc based width/spacing options


## [3.5.1] - 2021-12-20

### Summary of main changes

Updated `Underline` plugin to add utility classes from Tailwind config theme colours and a dedicated them underline colour list.

### Changed

- `Underline` plugin
  - adds utility classes from `theme.colors` (not name spaced)
  - adds utility classes from `theme.underlineColor` (not name spaced)
  - retains utility classes from `theme.textColor`, `theme.borderColor` and `theme.backgroundColor` (name spaced as before)
- `docs/Underline` 
  - updated to document changes to plugin
  

## [3.5.0] - 2021-12-16

### Summary of main changes

Documentation ported from dedicated repository to live inside the main plugins repository.

### Added

- Added `docs` folder with a collection of PHP files, Tailwind config files and CSS files. And a `README` to explain how to run the documentation locally.
- Added code of conduct

### Changed

- `package.json` now as dependencies for generating the Tailwind documentation
  - `@area17/a17-tailwind-plugins` to use the plugins in the docs
  - updated versions of `postCSS` and `tailwindcss`
  - added `browser-sync` and updated version of `dotenv`
- Sample config file have been moved to the `docs` folder, these are now actual config files styling the documentation build


## [3.4.0] - 2021-12-14

### Summary of main changes

Updated `SpacingTokens` plugin to auto generate spacing tokens.

### Changed

- `SpacingTokens` plugin re-written
  - can now auto generate a spacing token scale based on multiples of 5
  - generates arbitrary 0 - 10px spaces
  - can specify the scale to use
  - can specify other arbitrary values
  - can still specify a full scale as before (no breaking change)


## [3.3.0] - 2021-12-14

### Summary of main changes

Added `GridLayout` plugin

### Added

- `GridLayout` plugin - generates CSS grid utility classes to set elements onto the design grid


## [3.2.3] - 2021-12-13

### Summary of main changes

Removed `console.log` from `GridLine`

### Changed

- `GridLine` plugin, removed `console.log`


## [3.2.2] - 2021-12-13

### Summary of main changes

Removed references to old Git repository

### Changed

- readme
  - removed reference to old sample files
- changelog
  - removed git diff urls


## [3.2.1] - 2021-12-13

### Summary of main changes

Fixed bug with `GridLine` CSS generation which could affect grid lines on last row of complex grid line setups

### Changed

- split comma separated selectors in `GridLine` plugin into their own selectors so that survive CSS purging better with JIT


## [3.2.0] - 2021-12-10

### Summary of main changes

Added CssInJs and Components plugins.

### Added

- `CssInJs` plugin - allows you to pass through CSS from your Tailwind config
- `Components` plugin - allows you to generate component CSS from your Tailwind config


## [3.1.0] - 2021-12-08

### Summary of main changes

Added Underline plugin.

### Added

- `Underline` plugin - for modern CSS text underline styling


## [3.0.0] - 2021-12-07

### Summary of main changes

Refactored Layout plugin, generates more classes which are closer aligned to Tailwind classes.

### Changed

- Layout plugin has been totally re-factored
  - added ability to nest
  - fractional values can now also be used, eg: `w-1/2-cols`
  - now generates Tailwind like `w-N-cols` type classes for widths
  - `m?-` margin classes for push/pulls: `ml-N-cols`, `mr-N-cols`, `mx-N-cols`, `-ml-N-cols`, `-mr-N-cols`, `-mx-N-cols`
  - `p?-` padding classes: `pl-N-cols`, `pr-N-cols`, `px-N-cols`
  - margins, paddings and positioning assume added inner gutters, a full series of gutter-less versions are also generated
  - the generated class names in the Layout plugin **have been changed** to align them closer to Tailwind. [See the migration notes](http://tailwind-plugins.dev.area17.com/Layout.html#v3-0-0)



## [2.2.1] - 2021-12-03

### Changed

- Change Layout plugin to use `addComponents` vs `addUtilities` to allow the `flex-direction` to be overwritten with the Tailwind classes

## [2.2.0] - 2021-12-02

### Summary of main changes

Fixes some responsive bugs with `Layout` and adds `pull` and `left`/`right` classes for absolute positioning.

#### Fixed

- `Layout` plugin
  - using Tailwind native `prefix()` function to fix responsive bugs when using `cols-container` only at larger breakpoints
  - no longer makes `cols-0` and correctly makes a class for the largest column

#### Added

- `Layout` plugin
  - added `pull`, `pull-r`, `left` and `right` classes for more layout options based on design columns


## [2.1.5] - 2021-11-30

### Summary of main changes

`package.json` updated to include repository and homepage info.


## [2.1.4] - 2021-11-30

### Summary of main changes

Readme updated to point to remote docs: http://tailwind-plugins.dev.area17.com/
Moved repo to GitHub.


## [2.1.3] - 2021-11-01

### Summary of main changes

Adds refactored `RatioBox` and `GridLine` plugins

#### Fixed

- fix sample config JSON fixed breakpoint outer gutter
- fix sample config include and color token name

#### Changed

- added refactored RatioBox with new expandable box and ratio freer classes
- add refactored gridline plugin
  - allows prefix and more consistent results across breakpoints

## [2.1.2] - 2021-09-07

#### Fixed

- Prefixing classes with `prefix` option in `tailwind.config.js`
- issue in `ApplyColorVariables` when colors are undefined which would break builds

## [2.1.1] - 2021-08-23

#### Fixed

- Spacing group plugin now always outputs breakpoint spacing info in correct breakpoint order (not the order a user specifies breakpoints in their config)


## [2.1.0] - 2021-08-02

#### Added

- Added spacing tokens plugin to convert spacing tokens from `px` to `rem`

#### Changed

- Typography plugin converts `px` to `rem`
- Spacing plugin converts `px` to `rem`
- Spacing tokens added to tailwind config sample
- Spacing tokens and spacing groups split out in config JSON


## [2.0.2] - 2021-06-17

#### Changed

- Removed console log

## [2.0.1] - 2021-06-17

#### Fixed

- Using dashes in the color name when declaring colors in a js object was breaking the var output

## [2.0.0] - 2021-05-25

### Summary of main changes

Large refactor, rewrite and added new things.

#### Changed

- remove dependency on lowdash
- now uses `frontend.config.json` for set up
- adds `GridLine` plugin
- `GridGap` uses CSS variables
- adds `RatioBox` plugin
- no longer uses `getFirstBp` utility
- adds color token CSS variables

## [1.0.1] - 2020-11-25

### Summary of main changes

Fix nested `.cols-container` element left margin in `Layout` plugin

#### Changed

- `Layout` plugin: only immediate child `[class*="cols-"]` inside of `.cols-container` get a `gutter` margin to stop `.cols-container`'s inside of `.cols-N` getting their `margin-left` reset

## [1.9.0] - 2020-11-23

Initial public release
