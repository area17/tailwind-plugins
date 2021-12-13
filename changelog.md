# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
  - the generated class names in the Layout plugin **have been changed** to align them closer to Tailwind. [See the migration notes](http://tailwind-plugins.dev.area17.com/Layout.php#v3-0-0)



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
