const generatePluginCss = require('./generatePluginCss');
const cssMatcher = require('jest-matcher-css');
const { Spacing } = require('../index');

expect.extend({
  toMatchCss: cssMatcher
});

describe('spacing plugin', () => {
  it('exists', () => {
    expect(typeof Spacing).toBe('function');
  });

  test('generates correct css', () => {
    return generatePluginCss(Spacing, {
      theme: {
        screens: {
          xs: { max: '543px' },
          sm: '544px',
          md: '768px',
          lg: '1024px',
          xl: '1440px'
        },

        spacing: {
          '0': 0,
          px: '1px',
          '1': '4px',
          '2': '8px',
          '3': '12px',
          '4': '16px',
          '5': '20px',
          '6': '24px',
          '7': '28px',
          '8': '32px',
          '9': '36px',
          '10': '48px',
          '11': '60px',
          '12': '72px',
          '13': '84px',
          '14': '96px'
        },

        spacingGroups: (theme) => ({
          'outer-1': {
            xs: theme('spacing.11'),
            md: theme('spacing.12'),
            lg: theme('spacing.13'),
            xl: theme('spacing.14')
          },

          'inner-1': {
            xs: theme('spacing.9'),
            md: theme('spacing.10'),
            lg: theme('spacing.11'),
            xl: theme('spacing.12')
          },

          'inner-2': {
            xs: theme('spacing.6'),
            md: theme('spacing.9'),
            lg: theme('spacing.10'),
            xl: theme('spacing.11')
          },

          'inner-3': {
            xs: theme('spacing.4'),
            md: theme('spacing.5'),
            lg: theme('spacing.6'),
            xl: theme('spacing.8')
          },

          'inner-4': {
            xs: theme('spacing.2'),
            lg: theme('spacing.3'),
            xl: theme('spacing.4')
          },

          'inner-5': {
            xs: theme('spacing.1')
          }
        })
      }
    }).then((css) => {
      expect(css).toMatchCss(`
      .mt-outer-1 {
        margin-top: 60px;
      }
      @media (min-width: 768px) {
      .mt-outer-1 {
          margin-top: 72px;
      }
      }
      @media (min-width: 1024px) {
      .mt-outer-1 {
          margin-top: 84px;
      }
      }
      @media (min-width: 1440px) {
      .mt-outer-1 {
          margin-top: 96px;
      }
      }
      .mt-inner-1 {
        margin-top: 36px;
      }
      @media (min-width: 768px) {
      .mt-inner-1 {
          margin-top: 48px;
      }
      }
      @media (min-width: 1024px) {
      .mt-inner-1 {
          margin-top: 60px;
      }
      }
      @media (min-width: 1440px) {
      .mt-inner-1 {
          margin-top: 72px;
      }
      }
      .mt-inner-2 {
        margin-top: 24px;
      }
      @media (min-width: 768px) {
      .mt-inner-2 {
          margin-top: 36px;
      }
      }
      @media (min-width: 1024px) {
      .mt-inner-2 {
          margin-top: 48px;
      }
      }
      @media (min-width: 1440px) {
      .mt-inner-2 {
          margin-top: 60px;
      }
      }
      .mt-inner-3 {
        margin-top: 16px;
      }
      @media (min-width: 768px) {
      .mt-inner-3 {
          margin-top: 20px;
      }
      }
      @media (min-width: 1024px) {
      .mt-inner-3 {
          margin-top: 24px;
      }
      }
      @media (min-width: 1440px) {
      .mt-inner-3 {
          margin-top: 32px;
      }
      }
      .mt-inner-4 {
        margin-top: 8px;
      }
      @media (min-width: 1024px) {
      .mt-inner-4 {
          margin-top: 12px;
      }
      }
      @media (min-width: 1440px) {
      .mt-inner-4 {
          margin-top: 16px;
      }
      }
      .mt-inner-5 {
        margin-top: 4px;
      }
      `);
    });
  });

  test("doesn't output anything when no options set", () => {
    return generatePluginCss(Spacing, {}).then((css) => {
      expect(css).toMatchCss(``);
    });
  });
});
