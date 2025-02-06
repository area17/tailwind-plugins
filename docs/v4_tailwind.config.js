// A17 tailwind plugins
const {
  setup,
  applyColorVariables,
  backgroundFill,
  colorTokens,
  container,
  devTools,
  fullBleedScroller,
  gridGap,
  gridLayout,
  gridLine,
  interactionMediaQueries,
  keyline,
  layout,
  pseudoElements,
  ratioBox,
  scrollbar,
  spacing,
  spacingTokens,
  strokeFull,
  typography,
  underline,
} = require('../index');

// conf
const feConfig = require('./frontend.config.json');

module.exports = {
  content: ['./docs/**/*.html', './docs/*.html'],
  corePlugins: {
    container: false,
  },
  plugins: [
    setup,
    colorTokens,
    backgroundFill,
    container,
    devTools,
    fullBleedScroller,
    gridGap,
    gridLayout,
    gridLine,
    interactionMediaQueries,
    keyline,
    layout,
    pseudoElements,
    ratioBox,
    scrollbar,
    spacing,
    strokeFull,
    typography,
    underline,
  ],
  theme: {
    screens: feConfig.structure.breakpoints,
    mainColWidths: feConfig.structure.container,
    innerGutters: feConfig.structure.gutters.inner,
    outerGutters: feConfig.structure.gutters.outer,
    columnCount: feConfig.structure.columns,
    fontFamilies: feConfig.typography.families,
    typesets: feConfig.typography.typesets,
    spacingGroups: feConfig.spacing.groups,
    spacing: spacingTokens(feConfig.spacing.tokens),
    colors: feConfig.color.tokens,
    borderColor: applyColorVariables(
      feConfig.color.tokens,
      feConfig.color.border
    ),
    textColor: applyColorVariables(feConfig.color.tokens, feConfig.color.text),
    backgroundColor: applyColorVariables(
      feConfig.color.tokens,
      feConfig.color.background
    ),
    underlineColor: applyColorVariables(
      feConfig.color.tokens,
      feConfig.color.underline
    ),
    scrollbarColor: {
      track: applyColorVariables(
        feConfig.color.tokens,
        feConfig.color.scrollbar.track
      ),
      thumb: applyColorVariables(
        feConfig.color.tokens,
        feConfig.color.scrollbar.thumb
      ),
    },
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
        gutter: 'var(--inner-gutter)',
        'outer-gutter': 'var(--outer-gutter, 0px)',
      },
    },
  },
};
