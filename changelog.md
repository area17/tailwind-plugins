# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.2] - 2021-06-17

#### Changed

- Removed console log

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
