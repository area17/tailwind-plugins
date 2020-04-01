const generatePluginCss = require('./generatePluginCss');
const cssMatcher = require('jest-matcher-css');
const { RatioBox } = require('../index');

expect.extend({
  toMatchCss: cssMatcher
});

describe('spacing plugin', () => {
  it('exists', () => {
    expect(typeof RatioBox).toBe('function');
  });

  test('generates correct css', () => {
    return generatePluginCss(RatioBox, {
      theme: {
        ratios: [
          '1:1',
          '16:9'
        ]
      }
    }).then((css) => {
      expect(css).toMatchCss(`
      .ratio {
        position: relative;
        overflow: hidden;
      }

      .ratio::before {
        content: 'attr(👻)';
        display: block;
        height: 0;
        padding-bottom: 56.25%;
      }

      .ratio-content {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
      }

      .ratio-1\\:1::before {
        padding-bottom: 100%;
      }

      .ratio-16\\:9::before {
        padding-bottom: 56.25%;
      }
      `);
    });
  });

  test("doesn't output anything when no options set", () => {
    return generatePluginCss(RatioBox, {}).then((css) => {
      expect(css).toMatchCss(``);
    });
  });
});
