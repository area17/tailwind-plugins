// A17 tailwind plugins
const { Setup, RatioBox, Layout, GridLine, PseudoElements, DevTools, GridGap, Container, Keyline, SpacingTokens, Spacing, Typography, ColorTokens, ApplyColorVariables } = require('@area17/a17-tailwind-plugins');

// conf
const feConfig = require('./frontend.config.json');

module.exports = {
  corePlugins: {
    container: false
  },
  plugins: [Setup, Typography, Spacing, RatioBox, Layout, GridLine, PseudoElements, DevTools, GridGap, Container, Keyline, ColorTokens],
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
    borderColor: ApplyColorVariables(feConfig.color.tokens, feConfig.color.borderColor),
    textColor: ApplyColorVariables(feConfig.color.tokens, feConfig.color.textColor),
    backgroundColor: ApplyColorVariables(feConfig.color.tokens, feConfig.color.backgroundColor),
    ratios: feConfig.ratios,
    extend: {
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
        'gutter': 'var(--inner-gutter)',
        'outer-gutter': 'var(--outer-gutter)'
      }
    }
  }
}
