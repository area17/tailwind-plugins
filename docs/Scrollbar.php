<?php $title = 'Scrollbar'; ?>
<?php include 'includes/_header.php'; ?>

<div class="copy">
  <h2 id="description">Description</h2>

  <p></p>

  <h2 id="setup">Setup</h2>

  <figure class="code-example">
    <figcaption class="code-example-filename">tailwind.config.js</figcaption>
    <pre class="code-example-code"><code class="language-javascript">const { Scrollbar } = require('@area17/a17-tailwind-plugins');

module.exports = {
  ...
  plugins: [Scrollbar],
  theme: {

  }
  ...
};</code></pre>
  </figure>

  <figure class="code-example">
    <figcaption class="code-example-filename">document.html</figcaption>
    <pre class="code-example-code"><code class="language-html"></code></pre>
  </figure>
</div>

<ul class="flex flex-row gap-gutter overflow-x-auto pb-20 mt-40 max-w-400">
  <li class="flex-none bg-column pointer-events-none w-100 h-40"></li>
  <li class="flex-none bg-column pointer-events-none w-100 h-40"></li>
  <li class="flex-none bg-column pointer-events-none w-100 h-40"></li>
  <li class="flex-none bg-column pointer-events-none w-100 h-40"></li>
  <li class="flex-none bg-column pointer-events-none w-100 h-40"></li>
</ul>

<ul class="flex flex-row gap-gutter overflow-x-auto pb-20 mt-40 max-w-400 scrollbar-thin">
  <li class="flex-none bg-column pointer-events-none w-100 h-40"></li>
  <li class="flex-none bg-column pointer-events-none w-100 h-40"></li>
  <li class="flex-none bg-column pointer-events-none w-100 h-40"></li>
  <li class="flex-none bg-column pointer-events-none w-100 h-40"></li>
  <li class="flex-none bg-column pointer-events-none w-100 h-40"></li>
</ul>

<ul class="flex flex-row gap-gutter overflow-x-auto pb-20 mt-40 max-w-400 scrollbar-track-orange">
  <li class="flex-none bg-column pointer-events-none w-100 h-40"></li>
  <li class="flex-none bg-column pointer-events-none w-100 h-40"></li>
  <li class="flex-none bg-column pointer-events-none w-100 h-40"></li>
  <li class="flex-none bg-column pointer-events-none w-100 h-40"></li>
  <li class="flex-none bg-column pointer-events-none w-100 h-40"></li>
</ul>

<ul class="flex flex-row gap-gutter overflow-x-auto pb-20 mt-40 max-w-400 scrollbar-thumb-red">
  <li class="flex-none bg-column pointer-events-none w-100 h-40"></li>
  <li class="flex-none bg-column pointer-events-none w-100 h-40"></li>
  <li class="flex-none bg-column pointer-events-none w-100 h-40"></li>
  <li class="flex-none bg-column pointer-events-none w-100 h-40"></li>
  <li class="flex-none bg-column pointer-events-none w-100 h-40"></li>
</ul>

<ul class="flex flex-row gap-gutter overflow-x-auto pb-20 mt-40 max-w-400 scrollbar-track-orange scrollbar-thumb-red">
  <li class="flex-none bg-column pointer-events-none w-100 h-40"></li>
  <li class="flex-none bg-column pointer-events-none w-100 h-40"></li>
  <li class="flex-none bg-column pointer-events-none w-100 h-40"></li>
  <li class="flex-none bg-column pointer-events-none w-100 h-40"></li>
  <li class="flex-none bg-column pointer-events-none w-100 h-40"></li>
</ul>

<ul class="flex flex-row gap-gutter overflow-x-auto pb-20 mt-40 max-w-400 scrollbar-thin scrollbar-track-orange scrollbar-thumb-red">
  <li class="flex-none bg-column pointer-events-none w-100 h-40"></li>
  <li class="flex-none bg-column pointer-events-none w-100 h-40"></li>
  <li class="flex-none bg-column pointer-events-none w-100 h-40"></li>
  <li class="flex-none bg-column pointer-events-none w-100 h-40"></li>
  <li class="flex-none bg-column pointer-events-none w-100 h-40"></li>
</ul>

<ul class="flex flex-row gap-gutter overflow-x-auto pb-20 mt-40 max-w-400 scrollbar-thin-collapse">
  <li class="flex-none bg-column pointer-events-none w-100 h-40"></li>
  <li class="flex-none bg-column pointer-events-none w-100 h-40"></li>
  <li class="flex-none bg-column pointer-events-none w-100 h-40"></li>
  <li class="flex-none bg-column pointer-events-none w-100 h-40"></li>
  <li class="flex-none bg-column pointer-events-none w-100 h-40"></li>
</ul>

<ul class="flex flex-row gap-gutter overflow-x-auto pb-20 mt-40 max-w-400 scrollbar-thin-collapse scrollbar-track-orange scrollbar-thumb-red">
  <li class="flex-none bg-column pointer-events-none w-100 h-40"></li>
  <li class="flex-none bg-column pointer-events-none w-100 h-40"></li>
  <li class="flex-none bg-column pointer-events-none w-100 h-40"></li>
  <li class="flex-none bg-column pointer-events-none w-100 h-40"></li>
  <li class="flex-none bg-column pointer-events-none w-100 h-40"></li>
</ul>

<ul class="flex flex-row gap-gutter overflow-x-auto pb-20 mt-40 max-w-400 scrollbar-none">
  <li class="flex-none bg-column pointer-events-none w-100 h-40"></li>
  <li class="flex-none bg-column pointer-events-none w-100 h-40"></li>
  <li class="flex-none bg-column pointer-events-none w-100 h-40"></li>
  <li class="flex-none bg-column pointer-events-none w-100 h-40"></li>
  <li class="flex-none bg-column pointer-events-none w-100 h-40"></li>
</ul>


<?php include 'includes/_footer.php'; ?>
