const generatePluginCss = require('./generatePluginCss');
const { Typography } = require('../index');

describe('typography plugin', () => {
  it('exists', () => {
    expect(typeof Typography).toBe('function');
  });

  test('generates correct css', () => {
    return generatePluginCss(
      Typography,
      {
        theme: {
          screens: {
            xs: { max: '543px' },
            sm: '544px',
            lg: '1024px',
          },
          fontFamilies: {
            sans: 'Helvetica, Arial, sans-serif',
          },
          typesets: {
            h1: {
              xs: {
                'font-family': 'var(--sans)',
                'bold-weight': '500',
                'font-size': '32',
                'line-height': '1.2',
                'letter-spacing': '-0.02em',
                'font-smoothing': 'true',
              },
              lg: {
                'font-size': '48px',
              },
            },
          },
        },
      },
      {
        safelist: ['f-h1', 'lg:f-h1'],
      }
    ).then((css) => {
      expect(css).toMatchSnapshot();
    });
  });

  test("doesn't output anything when no options set", () => {
    return generatePluginCss(Typography, {}).then((css) => {
      expect(css).toMatch('');
    });
  });
});
