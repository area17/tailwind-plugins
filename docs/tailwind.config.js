// A17 tailwind plugins
const {
  setup,
  colorTokens,
  applyColorVariables,
  typography,
  container,
  devTools,
  gridGap,
  gridLayout,
  spacing,
  layout,
  gridLine,
  keyline,
  backgroundFill,
  strokeFull,
  underline,
  fullBleedScroller,
  scrollbar,
  pseudoElements,
  interactionMediaQueries,
  ratioBox,
} = require('../index');

// conf
const feConfig = require('./frontend.config.json');

module.exports = {
  content: ['./docs/**/*.html', './docs/*.html'],
  plugins: [
    setup,
    colorTokens,
    typography,
    container,
    devTools,
    gridGap,
    gridLayout,
    spacing,
    layout,
    gridLine,
    keyline,
    backgroundFill,
    strokeFull,
    underline,
    fullBleedScroller,
    scrollbar,
    pseudoElements,
    interactionMediaQueries,
    ratioBox,
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
    ratios: feConfig.ratios,
    css: feConfig.css,
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
  },
  extend: {
    spacing: {
      gutter: 'var(--inner-gutter)',
      'outer-gutter': 'var(--outer-gutter, 0px)',
    },
  },
};
