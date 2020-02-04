const generatePluginCss = require('./generatePluginCss');
const cssMatcher = require('jest-matcher-css');
const { Container } = require('../index');

expect.extend({
  toMatchCss: cssMatcher
});

describe('container plugin', () => {
  it('exists', () => {
    expect(typeof Container).toBe('function');
  });

  test('generates correct css', () => {
    return generatePluginCss(Container, {
      theme: {
        screens: {
          xs: { max: '543px' },
          sm: '544px',
          md: '768px',
          lg: '1024px',
          xl: '1440px'
        },
        mainColWidths: {
          xs: 'fluid',
          sm: 'fluid',
          md: 'fluid',
          lg: 'fluid',
          xl: '1220px'
        },
        outerGutters: {
          xs: '16px',
          sm: '16px',
          md: '24px',
          lg: '36px',
          xl: '60px'
        }
      }
    }).then((css) => {
      expect(css).toMatchCss(`
      .container {
        margin-right: auto;
        margin-left: auto;
        width: calc(100vw - (16px * 2));
      }
      @media (min-width: 544px) {
      .container {
          width: calc(100vw - (16px * 2));
      }
      }
      @media (min-width: 768px) {
      .container {
          width: calc(100vw - (24px * 2));
      }
      }
      @media (min-width: 1024px) {
      .container {
          width: calc(100vw - (36px * 2));
      }
      }
      @media (min-width: 1440px) {
      .container {
          width: 1220px;
          padding-right: 0;
          padding-left: 0;
      }
      }
      `);
    });
  });

  test("doesn't output anything when no options set", () => {
    return generatePluginCss(Container, {}).then((css) => {
      expect(css).toMatchCss(``);
    });
  });
});
