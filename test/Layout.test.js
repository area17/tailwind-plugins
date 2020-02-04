const generatePluginCss = require('./generatePluginCss');
const cssMatcher = require('jest-matcher-css');
const { Layout } = require('../index');

expect.extend({
  toMatchCss: cssMatcher
});

describe('layout plugin', () => {
  it('exists', () => {
    expect(typeof Layout).toBe('function');
  });

  test('generates correct css', () => {
    return generatePluginCss(Layout, {
      theme: {
        screens: {
          xs: { max: '543px' },
          sm: '544px',
          md: '768px',
          lg: '1024px',
          xl: '1440px'
        },
        innerGutters: {
          xs: '16px',
          sm: '16px',
          md: '16px',
          lg: '24px',
          xl: '24px'
        },
        columnCount: {
          xs: 6,
          sm: 6,
          md: 12,
          lg: 12,
          xl: 12
        }
      }
    }).then((css) => {
      expect(css).toMatchCss(`
        .cols-container {
          display: flex;
          flex-flow: row wrap
        }

        [class*="cols-"]:not(.cols-container) {
          margin-left: 16px
        }

        @media (min-width: 544px) {
          .cols-container {
            margin-left: -16px
          }

          [class*="cols-"]:not(.cols-container) {
            margin-left: 16px
          }
        }

        @media (min-width: 768px) {
          .cols-container {
            margin-left: -16px
          }

          [class*="cols-"]:not(.cols-container) {
            margin-left: 16px
          }
        }

        @media (min-width: 1024px) {
          .cols-container {
            margin-left: -24px
          }

          [class*="cols-"]:not(.cols-container) {
            margin-left: 24px
          }
        }

        @media (min-width: 1440px) {
          .cols-container {
            margin-left: -24px
          }

          [class*="cols-"]:not(.cols-container) {
            margin-left: 24px
          }
        }

        .cols-1 {
          width: calc((100% - ((5 * 16px) + 16px)) / 6 * 1 + (0 * 16px ))
        }

        @media (max-width: 543px) {
          .xs\\:cols-1 {
            width: calc((100% - ((5 * 16px) + 16px)) / 6 * 1 + (0 * 16px ))
          }
        }

        .cols-2 {
          width: calc((100% - ((5 * 16px) + 16px)) / 6 * 2 + (1 * 16px ))
        }

        @media (max-width: 543px) {
          .xs\\:cols-2 {
            width: calc((100% - ((5 * 16px) + 16px)) / 6 * 2 + (1 * 16px ))
          }
        }

        .cols-3 {
          width: calc((100% - ((5 * 16px) + 16px)) / 6 * 3 + (2 * 16px ))
        }

        @media (max-width: 543px) {
          .xs\\:cols-3 {
            width: calc((100% - ((5 * 16px) + 16px)) / 6 * 3 + (2 * 16px ))
          }
        }

        .cols-4 {
          width: calc((100% - ((5 * 16px) + 16px)) / 6 * 4 + (3 * 16px ))
        }

        @media (max-width: 543px) {
          .xs\\:cols-4 {
            width: calc((100% - ((5 * 16px) + 16px)) / 6 * 4 + (3 * 16px ))
          }
        }

        .cols-5 {
          width: calc((100% - ((5 * 16px) + 16px)) / 6 * 5 + (4 * 16px ))
        }

        @media (max-width: 543px) {
          .xs\\:cols-5 {
            width: calc((100% - ((5 * 16px) + 16px)) / 6 * 5 + (4 * 16px ))
          }
        }

        .cols-6 {
          width: calc(100% - 16px)
        }

        @media (max-width: 543px) {
          .xs\\:cols-6 {
            width: calc(100% - 16px)
          }
        }

        @media (min-width: 544px) {
          .sm\\:cols-1 {
            width: calc((100% - ((5 * 16px) + 16px)) / 6 * 1 + (0 * 16px ))
          }
        }

        @media (min-width: 544px) {
          .sm\\:cols-2 {
            width: calc((100% - ((5 * 16px) + 16px)) / 6 * 2 + (1 * 16px ))
          }
        }

        @media (min-width: 544px) {
          .sm\\:cols-3 {
            width: calc((100% - ((5 * 16px) + 16px)) / 6 * 3 + (2 * 16px ))
          }
        }

        @media (min-width: 544px) {
          .sm\\:cols-4 {
            width: calc((100% - ((5 * 16px) + 16px)) / 6 * 4 + (3 * 16px ))
          }
        }

        @media (min-width: 544px) {
          .sm\\:cols-5 {
            width: calc((100% - ((5 * 16px) + 16px)) / 6 * 5 + (4 * 16px ))
          }
        }

        @media (min-width: 544px) {
          .sm\\:cols-6 {
            width: calc(100% - 16px)
          }
        }

        @media (min-width: 768px) {
          .md\\:cols-1 {
            width: calc((100% - ((11 * 16px) + 16px)) / 12 * 1 + (0 * 16px ))
          }
        }

        @media (min-width: 768px) {
          .md\\:cols-2 {
            width: calc((100% - ((11 * 16px) + 16px)) / 12 * 2 + (1 * 16px ))
          }
        }

        @media (min-width: 768px) {
          .md\\:cols-3 {
            width: calc((100% - ((11 * 16px) + 16px)) / 12 * 3 + (2 * 16px ))
          }
        }

        @media (min-width: 768px) {
          .md\\:cols-4 {
            width: calc((100% - ((11 * 16px) + 16px)) / 12 * 4 + (3 * 16px ))
          }
        }

        @media (min-width: 768px) {
          .md\\:cols-5 {
            width: calc((100% - ((11 * 16px) + 16px)) / 12 * 5 + (4 * 16px ))
          }
        }

        @media (min-width: 768px) {
          .md\\:cols-6 {
            width: calc((100% - ((11 * 16px) + 16px)) / 12 * 6 + (5 * 16px ))
          }
        }

        @media (min-width: 768px) {
          .md\\:cols-7 {
            width: calc((100% - ((11 * 16px) + 16px)) / 12 * 7 + (6 * 16px ))
          }
        }

        @media (min-width: 768px) {
          .md\\:cols-8 {
            width: calc((100% - ((11 * 16px) + 16px)) / 12 * 8 + (7 * 16px ))
          }
        }

        @media (min-width: 768px) {
          .md\\:cols-9 {
            width: calc((100% - ((11 * 16px) + 16px)) / 12 * 9 + (8 * 16px ))
          }
        }

        @media (min-width: 768px) {
          .md\\:cols-10 {
            width: calc((100% - ((11 * 16px) + 16px)) / 12 * 10 + (9 * 16px ))
          }
        }

        @media (min-width: 768px) {
          .md\\:cols-11 {
            width: calc((100% - ((11 * 16px) + 16px)) / 12 * 11 + (10 * 16px ))
          }
        }

        @media (min-width: 768px) {
          .md\\:cols-12 {
            width: calc(100% - 16px)
          }
        }

        @media (min-width: 1024px) {
          .lg\\:cols-1 {
            width: calc((100% - ((11 * 24px) + 24px)) / 12 * 1 + (0 * 24px ))
          }
        }

        @media (min-width: 1024px) {
          .lg\\:cols-2 {
            width: calc((100% - ((11 * 24px) + 24px)) / 12 * 2 + (1 * 24px ))
          }
        }

        @media (min-width: 1024px) {
          .lg\\:cols-3 {
            width: calc((100% - ((11 * 24px) + 24px)) / 12 * 3 + (2 * 24px ))
          }
        }

        @media (min-width: 1024px) {
          .lg\\:cols-4 {
            width: calc((100% - ((11 * 24px) + 24px)) / 12 * 4 + (3 * 24px ))
          }
        }

        @media (min-width: 1024px) {
          .lg\\:cols-5 {
            width: calc((100% - ((11 * 24px) + 24px)) / 12 * 5 + (4 * 24px ))
          }
        }

        @media (min-width: 1024px) {
          .lg\\:cols-6 {
            width: calc((100% - ((11 * 24px) + 24px)) / 12 * 6 + (5 * 24px ))
          }
        }

        @media (min-width: 1024px) {
          .lg\\:cols-7 {
            width: calc((100% - ((11 * 24px) + 24px)) / 12 * 7 + (6 * 24px ))
          }
        }

        @media (min-width: 1024px) {
          .lg\\:cols-8 {
            width: calc((100% - ((11 * 24px) + 24px)) / 12 * 8 + (7 * 24px ))
          }
        }

        @media (min-width: 1024px) {
          .lg\\:cols-9 {
            width: calc((100% - ((11 * 24px) + 24px)) / 12 * 9 + (8 * 24px ))
          }
        }

        @media (min-width: 1024px) {
          .lg\\:cols-10 {
            width: calc((100% - ((11 * 24px) + 24px)) / 12 * 10 + (9 * 24px ))
          }
        }

        @media (min-width: 1024px) {
          .lg\\:cols-11 {
            width: calc((100% - ((11 * 24px) + 24px)) / 12 * 11 + (10 * 24px ))
          }
        }

        @media (min-width: 1024px) {
          .lg\\:cols-12 {
            width: calc(100% - 24px)
          }
        }

        @media (min-width: 1440px) {
          .xl\\:cols-1 {
            width: calc((100% - ((11 * 24px) + 24px)) / 12 * 1 + (0 * 24px ))
          }
        }

        @media (min-width: 1440px) {
          .xl\\:cols-2 {
            width: calc((100% - ((11 * 24px) + 24px)) / 12 * 2 + (1 * 24px ))
          }
        }

        @media (min-width: 1440px) {
          .xl\\:cols-3 {
            width: calc((100% - ((11 * 24px) + 24px)) / 12 * 3 + (2 * 24px ))
          }
        }

        @media (min-width: 1440px) {
          .xl\\:cols-4 {
            width: calc((100% - ((11 * 24px) + 24px)) / 12 * 4 + (3 * 24px ))
          }
        }

        @media (min-width: 1440px) {
          .xl\\:cols-5 {
            width: calc((100% - ((11 * 24px) + 24px)) / 12 * 5 + (4 * 24px ))
          }
        }

        @media (min-width: 1440px) {
          .xl\\:cols-6 {
            width: calc((100% - ((11 * 24px) + 24px)) / 12 * 6 + (5 * 24px ))
          }
        }

        @media (min-width: 1440px) {
          .xl\\:cols-7 {
            width: calc((100% - ((11 * 24px) + 24px)) / 12 * 7 + (6 * 24px ))
          }
        }

        @media (min-width: 1440px) {
          .xl\\:cols-8 {
            width: calc((100% - ((11 * 24px) + 24px)) / 12 * 8 + (7 * 24px ))
          }
        }

        @media (min-width: 1440px) {
          .xl\\:cols-9 {
            width: calc((100% - ((11 * 24px) + 24px)) / 12 * 9 + (8 * 24px ))
          }
        }

        @media (min-width: 1440px) {
          .xl\\:cols-10 {
            width: calc((100% - ((11 * 24px) + 24px)) / 12 * 10 + (9 * 24px ))
          }
        }

        @media (min-width: 1440px) {
          .xl\\:cols-11 {
            width: calc((100% - ((11 * 24px) + 24px)) / 12 * 11 + (10 * 24px ))
          }
        }

        @media (min-width: 1440px) {
          .xl\\:cols-12 {
            width: calc(100% - 24px)
          }
        }
      `);
    });
  });

  test('generates correct css', () => {
    return generatePluginCss(Layout, {}).then((css) => {
      expect(css).toMatchCss(``);
    });
  });
});
