# AREA 17 Tailwind Plugins

## Introduction

A series of plugins to enable/encourage systematised web design/development and some other useful utility classes.

AREA 17 strongly believes in design systems and then using these systems to build products for both ourselves and our clients. Tailwind is thus a natural fit for us, but we wanted more "system" to the utilities to tie closer to our design methodology.

We also wanted to include a few utility classes that would simplify some common styling requirements.

## Documentation and demos

* [area17.github.io/tailwind-plugins/](https://area17.github.io/tailwind-plugins/)

## Requirements

* [TailwindCSS](https://tailwindcss.com/)
  * `v5.0.0` is tested with Tailwind `v4.0.0` and Tailwind `v3.4.17`
  * Versions before `v5.0.0` (`<=4.0.6`) are tested with Tailwind `v`2.x.x` (with and without JIT) and `v3.x.x`</code>`

## Setup

Install via npm:

```shell
$ npm install @area17/a17-tailwind-plugins
```

Include plugins in `tailwind.config.js`:
* [Walk through of our set up](https://area17.github.io/tailwind-plugins/Setup.html)

## Sample set up files

* [frontend.config.json](https://github.com/area17/tailwind-plugins/blob/main/docs/frontend.config.json)
* [tailwind.config.js](https://github.com/area17/tailwind-plugins/blob/main/docs/tailwind.config.js)
* [input.css](https://github.com/area17/tailwind-plugins/blob/main/docs/input.css)

### Breaking changes to Layout in `v5-0-0`

The generated class names in the Layout plugin have been changed to align them closer to Tailwind. In `v3.x.x`/`v4.x.x` the format of the Layout class names was `.w-N-cols`, from `v5.x.x` it is `.w-cols-N`.
[See the migration notes](https://area17.github.io/tailwind-plugins/Layout.html#v5-0-0).

## Contribution

### Adding a new plugin

See [adding a new plugin](https://github.com/area17/tailwind-plugins/tree/main/docs#adding-a-new-plugin)

### Updating the documentation

See [docs/readme](https://github.com/area17/tailwind-plugins/tree/main/docs)

### Code of Conduct

AREA 17 is dedicated to building a welcoming, diverse, safe community. We expect everyone participating in the AREA 17 community to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it. Please follow it.

### Bug reports and features submission

To submit an issue or request a feature, please do so on [Github](https://github.com/area17/tailwind-plugins/issues).

If you file a bug report, your issue should contain a title and a clear description of the issue. You should also include as much relevant information as possible and a code sample that demonstrates the issue. The goal of a bug report is to make it easy for yourself - and others - to replicate the bug and develop a fix.

Remember, bug reports are created in the hope that others with the same problem will be able to collaborate with you on solving it. Do not expect that the bug report will automatically see any activity or that others will jump to fix it. Creating a bug report serves to help yourself and others start on the path of fixing the problem.

## Versioning scheme

Our Tailwind Plugins follows [Semantic Versioning](https://semver.org/). Major releases are released only when breaking changes are necessary, while minor and patch releases may be released as often as every week. Minor and patch releases should never contain breaking changes.

When referencing Tailwind Plugins from your application, you should always use a version constraint such as `^1.0`, since major releases of Tailwind Plugins will include breaking changes.

