const generatePluginCss = require('./generatePluginCss');
const cssMatcher = require('jest-matcher-css');
const { Typography } = require('../index');
const helvetica400 = {
  'helvetica-400-1': {
    'font-size': 10,
    'line-height': 1.2,
    'font-weight': 400
  },

  'helvetica-400-2': {
    'font-size': 11,
    'line-height': 1.2,
    'font-weight': 400
  },

  'helvetica-400-3': {
    'font-size': 12,
    'line-height': 1.2,
    'font-weight': 400
  }
};

expect.extend({
  toMatchCss: cssMatcher
});

describe('typography plugin', () => {
  it('exists', () => {
    expect(typeof Typography).toBe('function');
  });

  test('generates correct css', () => {
    return generatePluginCss(Typography, {
      theme: {
        screens: {
          xs: { max: '543px' },
          sm: '544px',
          md: '768px',
          lg: '1024px',
          xl: '1440px'
        },

        typography: {
          family: {
            sans: 'Helvetica, Arial, sans-serif'
          },
          sets: {
            'body-1': {
              'font-family': 'sans',
              settings: {
                xs: helvetica400['helvetica-400-1'],
                md: helvetica400['helvetica-400-2'],
                lg: helvetica400['helvetica-400-3']
              }
            }
          }
        }
      }
    }).then((css) => {
      expect(css).toMatchCss(`
        .f-body-1 {
          font-family: Helvetica, Arial, sans-serif;
          font-size: 10px;
          line-height: 1.2;
          font-weight: 400
        }

        @media (min-width: 768px) {
          .f-body-1 {
            font-size: 11px;
            line-height: 1.2;
            font-weight: 400
          }
        }

        @media (min-width: 1024px) {
          .f-body-1 {
            font-size: 12px;
            line-height: 1.2;
            font-weight: 400
          }
        }
      `);
    });
  });

  test("doesn't output anything when no options set", () => {
    return generatePluginCss(Typography, {}).then((css) => {
      expect(css).toMatchCss(``);
    });
  });
});
