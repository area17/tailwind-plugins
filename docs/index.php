<?php $index = true; ?>
<?php $title = 'A17 Tailwind Plugins'; ?>
<?php include 'includes/_header.php'; ?>

<div class="copy">
  <p>A series of plugins to enable/encourage systematised web design/development and some other useful utility classes.</p>

  <p>AREA 17 strongly believes in design systems and then using these systems to build products for both ourselves and our clients. Tailwind is thus a natural fit for us, but we wanted more "system" to the utilities to tie closer to our design methodology.</p>

  <p>We also wanted to include a few utility classes that would simplify some common styling requirements.</p>

  <p>Firstly, our Tailwind setup:</p>

  <ul>
    <li><a href="/tailwind-setup.php">tailwind-setup</a> - a walk through of our basic Tailwind setup, consuming a config JSON and applying plugins</li>
  </ul>

  <p>And then, the our plugins themselves:</p>

  <ul>
    <li class="mt-28"><a href="/Setup.php">Setup</a> - the center pin of many of our plugins, creates the basis the other plugins build of</li>
    <li><a href="/DevTools.php">DevTools</a> - generates the CSS for the grid helper (in the bottom left corner of the page)</li>
    <li class="mt-28"><a href="/ColorTokens.php">ColorTokens</a> - generates colour variables</li>
    <li><a href="/ApplyColourVariables.php">ApplyColourVariables</a> - generates utility classes</li>
    <li class="mt-28"><a href="/SpacingTokens.php">SpacingTokens</a> - generates <code>rem</code> based spacing tokens based on pixel based scales or inputs (updated in <code>v3.4.0</code>)</li>
    <li><a href="/Spacing.php">Spacing</a> - generates responsive spacing classes</li>
    <li class="mt-28"><a href="/Container.php">Container</a> - generates a custom container class based on supplied config (resets and more useful breakout styles new in <code>v3.6.0</code>)</li>
    <li><a href="/Layout.php">Layout</a> - generates utility classes to set elements onto the design grid (<code>vw</code> based calcs variants new in <code>v3.6.0</code>)</li>
    <li><a href="/GridLayout.php">GridLayout</a> - creates classes to handle css grid layouts</li>
    <li><a href="/GridGap.php">GridGap</a> - generates grid gap utilities based on the configured grid</li>
    <li class="mt-28"><a href="/Typography.php">Typography</a> - generates responsive typography classes</li>
    <li class="mt-28"><a href="/GridLine.php">GridLine</a> - generates vertical and horizontal grid line/stroke classes (borders in the gutters between elements)</li>
    <li><a href="/Keyline.php">Keyline</a> - generates keylines in the gutter between elements</li>
    <li class="mt-28"><a href="/PseudoElements.php">PseudoElements</a> - adds additional pseudo classes</li>
    <li class="mt-28"><a href="/RatioBox.php">RatioBox</a> - generates ratio box utilities</li>
    <li class="mt-28"><a href="/Underline.php">Underline</a> - generates text underline styling classes (new in <code>v3.1.0</code>)</li>
    <li class="mt-28"><a href="/CssInJs.php">CssInJs</a> - allows you to pass through CSS from your Tailwind config (new in <code>v3.2.0</code>)</li>
    <li><a href="/Components.php">Components</a> - allows you to generate component CSS from your Tailwind config (new in <code>v3.2.0</code>)</li>
    <li class="mt-28"><a href="/FullBleedScroller.php">FullBleedScroller</a> - easy full bleed `overflow-x: auto` scrolling containers (new in <code>v3.6.0</code>)</li>
    <li class="mt-28"><a href="/InteractionMediaQueries.php">InteractionMediaQueries</a> - adds interaction based media queries, think targeting devices with hover capability (new in <code>v3.6.0</code>)</li>
    <li class="mt-28"><a href="/Scrollbar.php">Scrollbar</a> - scrollbar styling, unifies the CSS standard and non-standard scrollbar styling (new in <code>v3.6.0</code>)</li>
  </ul>

  <p>For AREA 17 staffers used to the legacy <a href="https://code.area17.com/a17/fe-boilerplate/-/tree/main" target="_blank">A17 Boilerplate</a> - these classes bring into Tailwind some of the useful classes from there (and in return, some of the Tailwind classes have been taken back to the A17 SCSS set up).</p>

  <p>Tested in Tailwind <code>2.x.x</code> (with and without JIT) and <code>3.2.x</code>.</p>
</div>

<?php include 'includes/_footer.php'; ?>
