# AREA 17 Tailwind Plugins - Documentation

To view these in a browser, visit [tailwind-plugins.dev.area17.com](http://tailwind-plugins.dev.area17.com/).

To view these locally and for local development of plugins and their documentation you will need to install a few dependencies and have an Apache web server running locally.

Firstly, you'll need Node version `v14.15.5`. If you have NVM installed it should have detected the `.nvmrc` file and switched you, if not, we'd recommend you [install NVM](https://github.com/nvm-sh/nvm#installing-and-updating).

And then:

```bash
$ npm install
```

You'll need to make an `.env` with a `PROXY` key set to your local web server. This tells browser-sync which URL to proxy.

```bash
$ cp .env.example .env
```

Open `.env` and update:

```yml
PROXY=tailwind-plugins.dev
```

Scripts available to run are:

* `npm run dev` - builds the Tailwind CSS file
* `npm run watch:dev` - builds Tailwind CSS and watches for changes
* `npm run prod` - builds a minified Tailwind CSS file
* `npm run sync` - starts browser-sync proxying the documentation and watching for changes for live reload
* `npm run watch` - runs both `npm run watch:dev` and `npm run sync` (and possibly only works on Linux based systems, you may have to run those tasks in separate Terminal tabs on your system)

For local development, you'll likely just run:

```bash
$ npm run watch
```

And you'll be good to know.

## Adding a new plugin

Every plugin needs documentation, with config options and/or output demonstrated or demos of the output. Adding the documentation for a plugin is also a handy way to develop a new plugin. Lets say your plugin is called `Foo`.

First step is to create a PHP file, with the name of your new plugin in the `docs` folder:

```bash
touch docs/Foo.php
```

If you open any of the other plugin docs, you'll see the basic structure of:

```PHP
<?php $title = 'TITLE'; ?>
<?php include 'includes/_header.php'; ?>
  <!-- content -->
<?php include 'includes/_footer.php'; ?>
```

The content is made up of `<div class="copy">...</div>` blocks and in between any demonstration HTML needed. `.copy` blocks have styles for `h2` to `h4`, paragraphs, lists, nested lists, code, links and HR's. You'll see the structure of them is easy to replicate.

Code example blocks are inserted like:

```HTML
  <figure class="code-example">
    <figcaption class="code-example-filename">tailwind.config.js</figcaption>
    <pre class="code-example-code"><code class="language-javascript">module.exports = {
};</code></pre>
  </figure>
```

Too add your work-in-progress plugin, you'll want to add a folder for your plugin to the `src` folder with the name of your plugin and add an `index.js`:

```bash
mkdir -p src/Foo && touch $_/index.js
```

And then open `docs/tailwind.config.js` and require your plugin:

```JS
// A17 tailwind plugins
const { Setup, RatioBox, Layout, GridLine, PseudoElements, DevTools, GridGap, Container, Keyline, Spacing, Typography, ColorTokens, ApplyColorVariables, Underline, Components, CssInJs, GridLayout, SpacingTokens } = require('@area17/a17-tailwind-plugins');
const Foo = require('./../src/Foo/index.js');
```

You can now add your plugin to the list of plugins in `docs/tailwind.config.js` and assign it to which ever `theme` entity required.

Make your plugin, write the documentation and submit a pull request to the main for it.

Please send coherent history - make sure each individual commit in your pull request is meaningful. If you had to make a lot of intermediate commits while developing, please [squash them](http://www.git-scm.com/book/en/v2/Git-Tools-Rewriting-History#Changing-Multiple-Commit-Messages) before submitting.


