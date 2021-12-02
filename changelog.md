# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).


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

- `git diff -b v1.0.1 v2.0.0`
- [Compare](https://code.area17.com/a17/tailwind-plugins/-/compare/v1.0.1...v2.0.0)

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

- `git diff -b v1.0.0 v1.0.1`
- [Compare](https://code.area17.com/a17/tailwind-plugins/compare/release%2F1.0.0...release%2F1.0.1)

Fix nested `.cols-container` element left margin in `Layout` plugin

#### Changed

- `Layout` plugin: only immediate child `[class*="cols-"]` inside of `.cols-container` get a `gutter` margin to stop `.cols-container`'s inside of `.cols-N` getting their `margin-left` reset

## [1.9.0] - 2020-11-23

Initial public release
