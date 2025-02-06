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
          'w-cols-1',
          'w-cols-3',
          'w-cols-12',
          'mx-cols-1',
          'mx-cols-3',
          'lg:w-cols-1',
          'lg:w-cols-3',
          'lg:w-cols-12',
          'lg:mx-cols-1',
          'lg:mx-cols-3',
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
