const generatePluginCss = require('./generatePluginCss');
const { RatioBox } = require('../index');

describe('spacing plugin', () => {
  it('exists', () => {
    expect(typeof RatioBox).toBe('function');
  });

  test('generates correct css', () => {
    return generatePluginCss(RatioBox, {
      theme: {
        screens: {
          lg: '1024px',
        },
        ratios: {
          '1x1': '1:1',
          '16x9': '16:9',
        },
      },
    }).then((css) => {
      expect(css).toMatchSnapshot();
    });
  });

  test("doesn't output anything when no options set", () => {
    return generatePluginCss(RatioBox, {}).then((css) => {
      expect(css).toMatch('');
    });
  });
});
