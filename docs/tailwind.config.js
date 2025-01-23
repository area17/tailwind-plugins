// A17 tailwind plugins
const {
  setup,
  colorTokens,
  applyColorVariables,
  typography,
} = require('../index');

// conf
const feConfig = require('./frontend.config.json');

module.exports = {
  content: ['./docs/**/*.html', './docs/*.html'],
  plugins: [
    setup,
    colorTokens,
    typography,
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
    components: feConfig.components,
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
  },
};
