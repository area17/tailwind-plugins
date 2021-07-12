const generatePluginCss = require('./generatePluginCss');
const cssMatcher = require('jest-matcher-css');
const { Typography } = require('../index');

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
            'h1': {
              "xs": {
                "font-family": "var(--sans)",
                "bold-weight": "500",
                "font-size": "32",
                "line-height": "1.2",
                "letter-spacing": "-0.02em",
                "font-smoothing": "true"
              },
              "md": {
                "font-size": "36px"
              },
              "lg": {
                "font-size": "48px"
              }
            }
          }
        }
      }
    }).then((css) => {
      console.log(css);
      expect(css).toMatchCss(`
.f-h1 {
  font-family: var(--sans);
  font-size: 32px;
  line-height: 1.2;
  letter-spacing: -0.02em;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  --bold-weight: 500;
}

.f-h1 b, .f-h1 strong {
  font-weight: var(--bold-weight);
}

@media (min-width: 768px) {
  .f-h1 {
    font-size: 36px;
  }
}

@media (min-width: 1024px) {
  .f-h1 {
    font-size: 48px;
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
