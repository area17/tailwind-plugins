// A17 tailwind plugins
const { Setup, RatioBox, GridLine, PseudoElements, DevTools, GridGap, Keyline, Spacing, Typography, ColorTokens, ApplyColorVariables, Components, CssInJs, GridLayout, SpacingTokens, Underline } = require('@area17/a17-tailwind-plugins');
const Container = require('../src/Container/index.js');
const Layout = require('../src/Layout/index.js');

const FullBleedScroller = require('../src/FullBleedScroller/index.js');
const InteractionMediaQueries = require('../src/InteractionMediaQueries/index.js');

// conf
const feConfig = require('./frontend.config.json');

module.exports = {
  content: ['./docs/**/*.php', './docs/*.php'],
  corePlugins: {
    container: false
  },
  plugins: [Setup, Typography, Spacing, RatioBox, Layout, GridLine, PseudoElements, DevTools, GridGap, Container, Keyline, ColorTokens, Underline, Components, CssInJs, GridLayout, FullBleedScroller, InteractionMediaQueries],
  theme: {
    screens: feConfig.structure.breakpoints,
    mainColWidths: feConfig.structure.container,
    innerGutters: feConfig.structure.gutters.inner,
    outerGutters: feConfig.structure.gutters.outer,
    columnCount: feConfig.structure.columns,
    fontFamilies: feConfig.typography.families,
    typesets: feConfig.typography.typesets,
    spacingGroups: feConfig.spacing.groups,
    spacing: SpacingTokens(feConfig.spacing.tokens),
    colors: feConfig.color.tokens,
    borderColor: ApplyColorVariables(feConfig.color.tokens, feConfig.color.border),
    textColor: ApplyColorVariables(feConfig.color.tokens, feConfig.color.text),
    backgroundColor: ApplyColorVariables(feConfig.color.tokens, feConfig.color.background),
    underlineColor: ApplyColorVariables(feConfig.color.tokens, feConfig.color.underline),
    ratios: feConfig.ratios,
    components: feConfig.components,
    css: feConfig.css,
    extend: {
      minHeight: ({ theme }) => theme('spacing'),
      maxWidth: ({ theme }) => theme('spacing'),
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
        'gutter': 'var(--inner-gutter)',
        'outer-gutter': 'var(--outer-gutter, 0px)'
      }
    }
  }
}
