const generatePluginCss = require('./generatePluginCss');
const { Container } = require('../index');

describe('container plugin', () => {
  it('exists', () => {
    expect(typeof Container).toBe('function');
  });

  test('generates correct css', () => {
    return generatePluginCss(
      Container,
      {
        theme: {
          screens: {
            xs: { max: '543px' },
            sm: '544px',
            lg: '1024px',
          },
          mainColWidths: {
            xs: 'fluid',
            sm: 'fluid',
            lg: 'fluid',
          },
          outerGutters: {
            xs: '16px',
            sm: '16px',
            lg: '36px',
          },
        },
      },
      {
        safelist: [
          'container',
          'container-reset',
          'breakout',
          'breakout-reset',
          'lg:container',
          'lg:container-reset',
          'lg:breakout',
          'lg:breakout-reset',
        ],
      }
    ).then((css) => {
      expect(css).toMatchSnapshot();
    });
  });

  test("doesn't output anything when no options set", () => {
    return generatePluginCss(Container, {}).then((css) => {
      expect(css).toMatch('');
    });
  });
});
