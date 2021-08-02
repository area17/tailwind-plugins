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

        spacingGroups: (theme) => ({
          'outer-1': {
            xs: 16,
            md: '32px',
            lg: 48,
            xl: '56px'
          },
        })
      }
    }).then((css) => {
      expect(css).toMatchCss(`.mt-outer-1 {
  margin-top: var(--spacing-outer-1);
}`);
    });
  });

  test("doesn't output anything when no options set", () => {
    return generatePluginCss(Spacing, {}).then((css) => {
      expect(css).toMatchCss(``);
    });
  });
});
