const generatePluginCss = require('./generatePluginCss');
const { Layout } = require('../index');

describe('layout plugin', () => {
  it('exists', () => {
    expect(typeof Layout).toBe('function');
  });

  test('generates correct css', () => {
    return generatePluginCss(
      Layout,
      {
        theme: {
          screens: {
            xs: '0px',
            lg: '1024px',
          },
          innerGutters: {
            xs: '16px',
            lg: '24px',
          },
          columnCount: {
            xs: 6,
            lg: 12,
          },
        },
      },
      {
        safelist: [
          'cols-container',
          'w-1-cols',
          'w-3-cols',
          'w-12-cols',
          'mx-1-cols',
          'mx-3-cols',
          'lg:w-1-cols',
          'lg:w-3-cols',
          'lg:w-12-cols',
          'lg:mx-1-cols',
          'lg:mx-3-cols',
        ],
      }
    ).then((css) => {
      expect(css).toMatchSnapshot();
    });
  });

  test("doesn't output anything when no options set", () => {
    return generatePluginCss(Layout, {}).then((css) => {
      expect(css).toMatch('');
    });
  });
});
