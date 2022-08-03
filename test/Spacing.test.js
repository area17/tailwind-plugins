const generatePluginCss = require('./generatePluginCss');
const { Spacing } = require('../index');

describe('spacing plugin', () => {
  it('exists', () => {
    expect(typeof Spacing).toBe('function');
  });

  test('generates correct css', () => {
    return generatePluginCss(
      Spacing,
      {
        theme: {
          screens: {
            xs: { max: '543px' },
            sm: '544px',
            lg: '1024px',
          },
          spacingGroups: {
            'outer-1': {
              xs: 16,
              lg: '32px',
            },
          },
        },
      },
      {
        safelist: ['pt-outer-1', 'lg:mt-outer-1', 'mx-outer-1', '-mx-outer-1'],
      }
    ).then((css) => {
      expect(css).toMatchSnapshot();
    });
  });

  test("doesn't output anything when no options set", () => {
    return generatePluginCss(Spacing, {}).then((css) => {
      expect(css).toMatch('');
    });
  });
});
