<?php $title = 'Container'; ?>
<?php include 'includes/_header.php'; ?>

<div class="copy">
  <h2 id="description">Description</h2>

  <p>By default all components render across the full width of the viewport. You can use the <code>.container</code> class to create a contained layout. The container class uses the values set in <code>outerGutters</code> and <code>mainColWidths</code> in your <code>tailwind.config.js</code> to create a responsive container.</p>

  <p>Note that the default Tailwind container plugin will need to be disabled.</p>

  <p>Also includes a <code>breakout</code> class to allow full 100vw elements inside a container.</p>

  <h2 id="setup">Setup</h2>

  <figure class="code-example">
    <figcaption class="code-example-filename">tailwind.config.js</figcaption>
    <pre class="code-example-code"><code class="language-javascript">const { Setup, Container } = require('@area17/a17-tailwind-plugins');

module.exports = {
  ...
  plugins: [Setup, Container],
  corePlugins: {
    container: false
  },
  theme: {
    mainColWidths: {
      xs: "auto",
      sm: "auto",
      md: "auto",
      lg: "auto",
      xl: "auto",
      xxl: "1440px"
    },
    outerGutters: {
      xs: "20px",
      sm: "30px",
      md: "40px",
      lg: "40px",
      xl: "40px",
      xxl: "0px"
    },
  }
  ...
};</code></pre>
  </figure>

  <p>Requires <code>Setup</code> plugin with <code>theme.mainColWidths</code> and <code>theme.outerGutters</code> configured.</p>

  <h2 id="demo">Demo</h2>

  <p>This preview window has its content wrapped in <code>&lt;div class="container"></code>. Below is a demo of <code>&lt;div class="breakout"></code>:</p>

</div>

<div class="breakout mt-20 bg-column py-20">
  <div class="copy px-20">
    <p>Paragraph wrapped in <code>&lt;div class="breakout"></code> - useful for <code>100vw</code> images or video</p>
  </div>
</div>

<div class="copy">
  <figure class="code-example">
    <figcaption class="code-example-filename">document.html</figcaption>
    <pre class="code-example-code"><code class="language-html">&lt;div class="container">
  ...
  &lt;div class="breakout">
    ...
  &lt;/div>
&lt;/div></code></pre>
  </figure>
</div>

<?php include 'includes/_footer.php'; ?>
