// A17 tailwind plugins
const {
  Setup,
  ColorTokens,
  ApplyColorVariables,
  Typography,
  Container,
  DevTools,
  GridGap,
  GridLayout,
  Spacing,
  Layout,
  GridLine,
  Keyline,
  BackgroundFill,
  StrokeFull,
  Underline,
  FullBleedScroller,
  Scrollbar,
  PseudoElements,
  InteractionMediaQueries,
  RatioBox,
} = require('../index');

// conf
const feConfig = require('./frontend.config.json');

module.exports = {
  content: ['./docs/**/*.html', './docs/*.html'],
  plugins: [
    Setup,
    ColorTokens,
    ApplyColorVariables,
    Typography,
    Container,
    DevTools,
    GridGap,
    GridLayout,
    Spacing,
    Layout,
    GridLine,
    Keyline,
    BackgroundFill,
    StrokeFull,
    Underline,
    FullBleedScroller,
    Scrollbar,
    PseudoElements,
    InteractionMediaQueries,
    RatioBox,
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
    borderColor: ApplyColorVariables(
      feConfig.color.tokens,
      feConfig.color.border
    ),
    textColor: ApplyColorVariables(feConfig.color.tokens, feConfig.color.text),
    backgroundColor: ApplyColorVariables(
      feConfig.color.tokens,
      feConfig.color.background
    ),
    underlineColor: ApplyColorVariables(
      feConfig.color.tokens,
      feConfig.color.underline
    ),
    scrollbarColor: {
      track: ApplyColorVariables(
        feConfig.color.tokens,
        feConfig.color.scrollbar.track
      ),
      thumb: ApplyColorVariables(
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
