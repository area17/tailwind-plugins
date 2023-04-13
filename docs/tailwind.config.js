// A17 tailwind plugins
const {
  Setup,
  ApplyColorVariables,
  BackgroundFill,
  ColorTokens,
  Components,
  Container,
  CssInJs,
  DevTools,
  FullBleedScroller,
  GridGap,
  GridLayout,
  GridLine,
  InteractionMediaQueries,
  Keyline,
  Layout,
  PseudoElements,
  RatioBox,
  Scrollbar,
  Spacing,
  SpacingTokens,
  StrokeFull,
  Typography,
  Underline,
} = require('../index');

// conf
const feConfig = require('./frontend.config.json');

module.exports = {
  content: ['./docs/**/*.html', './docs/*.html'],
  corePlugins: {
    container: false,
  },
  plugins: [
    Setup,
    ColorTokens,
    Components,
    BackgroundFill,
    Container,
    CssInJs,
    DevTools,
    FullBleedScroller,
    GridGap,
    GridLayout,
    GridLine,
    InteractionMediaQueries,
    Keyline,
    Layout,
    PseudoElements,
    RatioBox,
    Scrollbar,
    Spacing,
    StrokeFull,
    Typography,
    Underline,
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
    spacing: SpacingTokens(feConfig.spacing.tokens),
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
