# AREA 17 Tailwind Plugins - Documentation

The documentation is made using [Jekyll](https://jekyllrb.com/) to compile [Liquid](https://shopify.github.io/liquid/) templates. 

To view these in a browser, visit [area17.github.io/tailwind-plugins/](https://area17.github.io/tailwind-plugins/).

To view these locally and for local development of plugins and their documentation you will need to install a few dependencies. See [docs.github.com - building-your-site-locally](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/testing-your-github-pages-site-locally-with-jekyll#building-your-site-locally)

Once everything is installed, `cd` into the `docs` folder and run: 

```bash
$ bundle install
$ bundle exec jekyll serve
```

The site should now be available in a browser at http://localhost:4000

And then open a new terminal tab, `cd` to the root of the project and run:

```bash
$ npm install
$ npm run watch
```

The site should now be available in a browser at http://localhost:3000 with browser-sync live reloading.

Scripts available to run are:

* `npm run dev` - builds the Tailwind CSS file
* `npm run watch:dev` - builds Tailwind CSS and watches for changes
* `npm run prod` - builds a minified Tailwind CSS file
* `npm run sync` - starts browser-sync proxying the documentation and watching for changes for live reload
* `npm run watch` - runs both `npm run watch:dev` and `npm run sync` (and possibly only works on Linux based systems, you may have to run those tasks in separate Terminal tabs on your system)


## Adding a new plugin

Every plugin needs documentation, with config options and/or output demonstrated or demos of the output. Adding the documentation for a plugin is also a handy way to develop a new plugin. Lets say your plugin is called `Foo`.

First step is to create a PHP file, with the name of your new plugin in the `docs` folder:

```bash
touch docs/Foo.html
```

If you open any of the other plugin docs, you'll see the basic structure of:

```HTML
---
title: TITLE
---
{% include_relative includes/_header.html %}
  <!-- content -->
{% include_relative includes/_footer.html %}
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

Too add your work-in-progress plugin, you'll want to add a folder for your plugin to the `src` folder with the name of your plugin and add an `index.js` in the root of this repository:

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


