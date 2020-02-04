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
          flex-flow: row wrap;
        }
        [class*="cols-"]:not(.cols-container) {
          margin-left: 16px;
        }
        @media (min-width: 544px) {
        .cols-container {
            margin-left: -16px;
        }
        [class*="cols-"]:not(.cols-container) {
            margin-left: 16px;
        }
        .push-0, .sm\\:push-0 {
            margin-left: 0;
        }
        .cols-container .push-0, .cols-container .sm\\:push-0 {
            margin-left: 16px;
        }
        }
        @media (min-width: 768px) {
        .cols-container {
            margin-left: -16px;
        }
        [class*="cols-"]:not(.cols-container) {
            margin-left: 16px;
        }
        .push-0, .md\\:push-0 {
            margin-left: 0;
        }
        .cols-container .push-0, .cols-container .md\\:push-0 {
            margin-left: 16px;
        }
        }
        @media (min-width: 1024px) {
        .cols-container {
            margin-left: -24px;
        }
        [class*="cols-"]:not(.cols-container) {
            margin-left: 24px;
        }
        .push-0, .lg\\:push-0 {
            margin-left: 0;
        }
        .cols-container .push-0, .cols-container .lg\\:push-0 {
            margin-left: 24px;
        }
        }
        @media (min-width: 1440px) {
        .cols-container {
            margin-left: -24px;
        }
        [class*="cols-"]:not(.cols-container) {
            margin-left: 24px;
        }
        .push-0, .xl\\:push-0 {
            margin-left: 0;
        }
        .cols-container .push-0, .cols-container .xl\\:push-0 {
            margin-left: 24px;
        }
        }
        .cols-1 {
          width: calc((100% - ((5 * 16px) + 16px)) / 6 * 1 + (0 * 16px ));
        }
        .push-1 {
          margin-left: calc((100% - ((5 * 16px) + 16px)) / 6 * 1 + (0 * 16px ) + 16px);
        }
        .cols-container .push-1 {
          margin-left: calc((100% - ((5 * 16px) + 16px)) / 6 * 1 + (0 * 16px ) + (16px * 2));
        }
        @media (max-width: 543px) {
        .cols-1, .xs\\:cols-1 {
            width: calc((100% - ((5 * 16px) + 16px)) / 6 * 1 + (0 * 16px ));
        }
        .push-1, .xs\\:push-1 {
            margin-left: calc((100% - ((5 * 16px) + 16px)) / 6 * 1 + (0 * 16px ) + 16px);
        }
        .cols-container .push-1, .cols-container .xs\\:push-1 {
            margin-left: calc((100% - ((5 * 16px) + 16px)) / 6 * 1 + (0 * 16px ) + (16px * 2));
        }
        }
        .cols-2 {
          width: calc((100% - ((5 * 16px) + 16px)) / 6 * 2 + (1 * 16px ));
        }
        .push-2 {
          margin-left: calc((100% - ((5 * 16px) + 16px)) / 6 * 2 + (1 * 16px ) + 16px);
        }
        .cols-container .push-2 {
          margin-left: calc((100% - ((5 * 16px) + 16px)) / 6 * 2 + (1 * 16px ) + (16px * 2));
        }
        @media (max-width: 543px) {
        .cols-2, .xs\\:cols-2 {
            width: calc((100% - ((5 * 16px) + 16px)) / 6 * 2 + (1 * 16px ));
        }
        .push-2, .xs\\:push-2 {
            margin-left: calc((100% - ((5 * 16px) + 16px)) / 6 * 2 + (1 * 16px ) + 16px);
        }
        .cols-container .push-2, .cols-container .xs\\:push-2 {
            margin-left: calc((100% - ((5 * 16px) + 16px)) / 6 * 2 + (1 * 16px ) + (16px * 2));
        }
        }
        .cols-3 {
          width: calc((100% - ((5 * 16px) + 16px)) / 6 * 3 + (2 * 16px ));
        }
        .push-3 {
          margin-left: calc((100% - ((5 * 16px) + 16px)) / 6 * 3 + (2 * 16px ) + 16px);
        }
        .cols-container .push-3 {
          margin-left: calc((100% - ((5 * 16px) + 16px)) / 6 * 3 + (2 * 16px ) + (16px * 2));
        }
        @media (max-width: 543px) {
        .cols-3, .xs\\:cols-3 {
            width: calc((100% - ((5 * 16px) + 16px)) / 6 * 3 + (2 * 16px ));
        }
        .push-3, .xs\\:push-3 {
            margin-left: calc((100% - ((5 * 16px) + 16px)) / 6 * 3 + (2 * 16px ) + 16px);
        }
        .cols-container .push-3, .cols-container .xs\\:push-3 {
            margin-left: calc((100% - ((5 * 16px) + 16px)) / 6 * 3 + (2 * 16px ) + (16px * 2));
        }
        }
        .cols-4 {
          width: calc((100% - ((5 * 16px) + 16px)) / 6 * 4 + (3 * 16px ));
        }
        .push-4 {
          margin-left: calc((100% - ((5 * 16px) + 16px)) / 6 * 4 + (3 * 16px ) + 16px);
        }
        .cols-container .push-4 {
          margin-left: calc((100% - ((5 * 16px) + 16px)) / 6 * 4 + (3 * 16px ) + (16px * 2));
        }
        @media (max-width: 543px) {
        .cols-4, .xs\\:cols-4 {
            width: calc((100% - ((5 * 16px) + 16px)) / 6 * 4 + (3 * 16px ));
        }
        .push-4, .xs\\:push-4 {
            margin-left: calc((100% - ((5 * 16px) + 16px)) / 6 * 4 + (3 * 16px ) + 16px);
        }
        .cols-container .push-4, .cols-container .xs\\:push-4 {
            margin-left: calc((100% - ((5 * 16px) + 16px)) / 6 * 4 + (3 * 16px ) + (16px * 2));
        }
        }
        .cols-5 {
          width: calc((100% - ((5 * 16px) + 16px)) / 6 * 5 + (4 * 16px ));
        }
        .push-5 {
          margin-left: calc((100% - ((5 * 16px) + 16px)) / 6 * 5 + (4 * 16px ) + 16px);
        }
        .cols-container .push-5 {
          margin-left: calc((100% - ((5 * 16px) + 16px)) / 6 * 5 + (4 * 16px ) + (16px * 2));
        }
        @media (max-width: 543px) {
        .cols-5, .xs\\:cols-5 {
            width: calc((100% - ((5 * 16px) + 16px)) / 6 * 5 + (4 * 16px ));
        }
        .push-5, .xs\\:push-5 {
            margin-left: calc((100% - ((5 * 16px) + 16px)) / 6 * 5 + (4 * 16px ) + 16px);
        }
        .cols-container .push-5, .cols-container .xs\\:push-5 {
            margin-left: calc((100% - ((5 * 16px) + 16px)) / 6 * 5 + (4 * 16px ) + (16px * 2));
        }
        }
        .cols-6 {
          width: calc(100% - 16px);
        }
        .push-6 {
          margin-left: calc(100% - 16px + 16px);
        }
        .cols-container .push-6 {
          margin-left: calc(100% - 16px + (16px * 2));
        }
        @media (max-width: 543px) {
        .cols-6, .xs\\:cols-6 {
            width: calc(100% - 16px);
        }
        .push-6, .xs\\:push-6 {
            margin-left: calc(100% - 16px + 16px);
        }
        .cols-container .push-6, .cols-container .xs\\:push-6 {
            margin-left: calc(100% - 16px + (16px * 2));
        }
        }
        .push-0 {
          margin-left: 0;
        }
        .cols-container .push-0 {
          margin-left: 16px;
        }
        @media (min-width: 544px) {
        .cols-1, .sm\\:cols-1 {
            width: calc((100% - ((5 * 16px) + 16px)) / 6 * 1 + (0 * 16px ));
        }
        .push-1, .sm\\:push-1 {
            margin-left: calc((100% - ((5 * 16px) + 16px)) / 6 * 1 + (0 * 16px ) + 16px);
        }
        .cols-container .push-1, .cols-container .sm\\:push-1 {
            margin-left: calc((100% - ((5 * 16px) + 16px)) / 6 * 1 + (0 * 16px ) + (16px * 2));
        }
        }
        @media (min-width: 544px) {
        .cols-2, .sm\\:cols-2 {
            width: calc((100% - ((5 * 16px) + 16px)) / 6 * 2 + (1 * 16px ));
        }
        .push-2, .sm\\:push-2 {
            margin-left: calc((100% - ((5 * 16px) + 16px)) / 6 * 2 + (1 * 16px ) + 16px);
        }
        .cols-container .push-2, .cols-container .sm\\:push-2 {
            margin-left: calc((100% - ((5 * 16px) + 16px)) / 6 * 2 + (1 * 16px ) + (16px * 2));
        }
        }
        @media (min-width: 544px) {
        .cols-3, .sm\\:cols-3 {
            width: calc((100% - ((5 * 16px) + 16px)) / 6 * 3 + (2 * 16px ));
        }
        .push-3, .sm\\:push-3 {
            margin-left: calc((100% - ((5 * 16px) + 16px)) / 6 * 3 + (2 * 16px ) + 16px);
        }
        .cols-container .push-3, .cols-container .sm\\:push-3 {
            margin-left: calc((100% - ((5 * 16px) + 16px)) / 6 * 3 + (2 * 16px ) + (16px * 2));
        }
        }
        @media (min-width: 544px) {
        .cols-4, .sm\\:cols-4 {
            width: calc((100% - ((5 * 16px) + 16px)) / 6 * 4 + (3 * 16px ));
        }
        .push-4, .sm\\:push-4 {
            margin-left: calc((100% - ((5 * 16px) + 16px)) / 6 * 4 + (3 * 16px ) + 16px);
        }
        .cols-container .push-4, .cols-container .sm\\:push-4 {
            margin-left: calc((100% - ((5 * 16px) + 16px)) / 6 * 4 + (3 * 16px ) + (16px * 2));
        }
        }
        @media (min-width: 544px) {
        .cols-5, .sm\\:cols-5 {
            width: calc((100% - ((5 * 16px) + 16px)) / 6 * 5 + (4 * 16px ));
        }
        .push-5, .sm\\:push-5 {
            margin-left: calc((100% - ((5 * 16px) + 16px)) / 6 * 5 + (4 * 16px ) + 16px);
        }
        .cols-container .push-5, .cols-container .sm\\:push-5 {
            margin-left: calc((100% - ((5 * 16px) + 16px)) / 6 * 5 + (4 * 16px ) + (16px * 2));
        }
        }
        @media (min-width: 544px) {
        .cols-6, .sm\\:cols-6 {
            width: calc(100% - 16px);
        }
        .push-6, .sm\\:push-6 {
            margin-left: calc(100% - 16px + 16px);
        }
        .cols-container .push-6, .cols-container .sm\\:push-6 {
            margin-left: calc(100% - 16px + (16px * 2));
        }
        }
        @media (min-width: 544px) {
        .push-0, .sm\\:push-0 {
            margin-left: 0;
        }
        .cols-container .push-0, .cols-container .sm\\:push-0 {
            margin-left: 16px;
        }
        }
        @media (min-width: 768px) {
        .cols-1, .md\\:cols-1 {
            width: calc((100% - ((11 * 16px) + 16px)) / 12 * 1 + (0 * 16px ));
        }
        .push-1, .md\\:push-1 {
            margin-left: calc((100% - ((11 * 16px) + 16px)) / 12 * 1 + (0 * 16px ) + 16px);
        }
        .cols-container .push-1, .cols-container .md\\:push-1 {
            margin-left: calc((100% - ((11 * 16px) + 16px)) / 12 * 1 + (0 * 16px ) + (16px * 2));
        }
        }
        @media (min-width: 768px) {
        .cols-2, .md\\:cols-2 {
            width: calc((100% - ((11 * 16px) + 16px)) / 12 * 2 + (1 * 16px ));
        }
        .push-2, .md\\:push-2 {
            margin-left: calc((100% - ((11 * 16px) + 16px)) / 12 * 2 + (1 * 16px ) + 16px);
        }
        .cols-container .push-2, .cols-container .md\\:push-2 {
            margin-left: calc((100% - ((11 * 16px) + 16px)) / 12 * 2 + (1 * 16px ) + (16px * 2));
        }
        }
        @media (min-width: 768px) {
        .cols-3, .md\\:cols-3 {
            width: calc((100% - ((11 * 16px) + 16px)) / 12 * 3 + (2 * 16px ));
        }
        .push-3, .md\\:push-3 {
            margin-left: calc((100% - ((11 * 16px) + 16px)) / 12 * 3 + (2 * 16px ) + 16px);
        }
        .cols-container .push-3, .cols-container .md\\:push-3 {
            margin-left: calc((100% - ((11 * 16px) + 16px)) / 12 * 3 + (2 * 16px ) + (16px * 2));
        }
        }
        @media (min-width: 768px) {
        .cols-4, .md\\:cols-4 {
            width: calc((100% - ((11 * 16px) + 16px)) / 12 * 4 + (3 * 16px ));
        }
        .push-4, .md\\:push-4 {
            margin-left: calc((100% - ((11 * 16px) + 16px)) / 12 * 4 + (3 * 16px ) + 16px);
        }
        .cols-container .push-4, .cols-container .md\\:push-4 {
            margin-left: calc((100% - ((11 * 16px) + 16px)) / 12 * 4 + (3 * 16px ) + (16px * 2));
        }
        }
        @media (min-width: 768px) {
        .cols-5, .md\\:cols-5 {
            width: calc((100% - ((11 * 16px) + 16px)) / 12 * 5 + (4 * 16px ));
        }
        .push-5, .md\\:push-5 {
            margin-left: calc((100% - ((11 * 16px) + 16px)) / 12 * 5 + (4 * 16px ) + 16px);
        }
        .cols-container .push-5, .cols-container .md\\:push-5 {
            margin-left: calc((100% - ((11 * 16px) + 16px)) / 12 * 5 + (4 * 16px ) + (16px * 2));
        }
        }
        @media (min-width: 768px) {
        .cols-6, .md\\:cols-6 {
            width: calc((100% - ((11 * 16px) + 16px)) / 12 * 6 + (5 * 16px ));
        }
        .push-6, .md\\:push-6 {
            margin-left: calc((100% - ((11 * 16px) + 16px)) / 12 * 6 + (5 * 16px ) + 16px);
        }
        .cols-container .push-6, .cols-container .md\\:push-6 {
            margin-left: calc((100% - ((11 * 16px) + 16px)) / 12 * 6 + (5 * 16px ) + (16px * 2));
        }
        }
        @media (min-width: 768px) {
        .cols-7, .md\\:cols-7 {
            width: calc((100% - ((11 * 16px) + 16px)) / 12 * 7 + (6 * 16px ));
        }
        .push-7, .md\\:push-7 {
            margin-left: calc((100% - ((11 * 16px) + 16px)) / 12 * 7 + (6 * 16px ) + 16px);
        }
        .cols-container .push-7, .cols-container .md\\:push-7 {
            margin-left: calc((100% - ((11 * 16px) + 16px)) / 12 * 7 + (6 * 16px ) + (16px * 2));
        }
        }
        @media (min-width: 768px) {
        .cols-8, .md\\:cols-8 {
            width: calc((100% - ((11 * 16px) + 16px)) / 12 * 8 + (7 * 16px ));
        }
        .push-8, .md\\:push-8 {
            margin-left: calc((100% - ((11 * 16px) + 16px)) / 12 * 8 + (7 * 16px ) + 16px);
        }
        .cols-container .push-8, .cols-container .md\\:push-8 {
            margin-left: calc((100% - ((11 * 16px) + 16px)) / 12 * 8 + (7 * 16px ) + (16px * 2));
        }
        }
        @media (min-width: 768px) {
        .cols-9, .md\\:cols-9 {
            width: calc((100% - ((11 * 16px) + 16px)) / 12 * 9 + (8 * 16px ));
        }
        .push-9, .md\\:push-9 {
            margin-left: calc((100% - ((11 * 16px) + 16px)) / 12 * 9 + (8 * 16px ) + 16px);
        }
        .cols-container .push-9, .cols-container .md\\:push-9 {
            margin-left: calc((100% - ((11 * 16px) + 16px)) / 12 * 9 + (8 * 16px ) + (16px * 2));
        }
        }
        @media (min-width: 768px) {
        .cols-10, .md\\:cols-10 {
            width: calc((100% - ((11 * 16px) + 16px)) / 12 * 10 + (9 * 16px ));
        }
        .push-10, .md\\:push-10 {
            margin-left: calc((100% - ((11 * 16px) + 16px)) / 12 * 10 + (9 * 16px ) + 16px);
        }
        .cols-container .push-10, .cols-container .md\\:push-10 {
            margin-left: calc((100% - ((11 * 16px) + 16px)) / 12 * 10 + (9 * 16px ) + (16px * 2));
        }
        }
        @media (min-width: 768px) {
        .cols-11, .md\\:cols-11 {
            width: calc((100% - ((11 * 16px) + 16px)) / 12 * 11 + (10 * 16px ));
        }
        .push-11, .md\\:push-11 {
            margin-left: calc((100% - ((11 * 16px) + 16px)) / 12 * 11 + (10 * 16px ) + 16px);
        }
        .cols-container .push-11, .cols-container .md\\:push-11 {
            margin-left: calc((100% - ((11 * 16px) + 16px)) / 12 * 11 + (10 * 16px ) + (16px * 2));
        }
        }
        @media (min-width: 768px) {
        .cols-12, .md\\:cols-12 {
            width: calc(100% - 16px);
        }
        .push-12, .md\\:push-12 {
            margin-left: calc(100% - 16px + 16px);
        }
        .cols-container .push-12, .cols-container .md\\:push-12 {
            margin-left: calc(100% - 16px + (16px * 2));
        }
        }
        @media (min-width: 768px) {
        .push-0, .md\\:push-0 {
            margin-left: 0;
        }
        .cols-container .push-0, .cols-container .md\\:push-0 {
            margin-left: 16px;
        }
        }
        @media (min-width: 1024px) {
        .cols-1, .lg\\:cols-1 {
            width: calc((100% - ((11 * 24px) + 24px)) / 12 * 1 + (0 * 24px ));
        }
        .push-1, .lg\\:push-1 {
            margin-left: calc((100% - ((11 * 24px) + 24px)) / 12 * 1 + (0 * 24px ) + 24px);
        }
        .cols-container .push-1, .cols-container .lg\\:push-1 {
            margin-left: calc((100% - ((11 * 24px) + 24px)) / 12 * 1 + (0 * 24px ) + (24px * 2));
        }
        }
        @media (min-width: 1024px) {
        .cols-2, .lg\\:cols-2 {
            width: calc((100% - ((11 * 24px) + 24px)) / 12 * 2 + (1 * 24px ));
        }
        .push-2, .lg\\:push-2 {
            margin-left: calc((100% - ((11 * 24px) + 24px)) / 12 * 2 + (1 * 24px ) + 24px);
        }
        .cols-container .push-2, .cols-container .lg\\:push-2 {
            margin-left: calc((100% - ((11 * 24px) + 24px)) / 12 * 2 + (1 * 24px ) + (24px * 2));
        }
        }
        @media (min-width: 1024px) {
        .cols-3, .lg\\:cols-3 {
            width: calc((100% - ((11 * 24px) + 24px)) / 12 * 3 + (2 * 24px ));
        }
        .push-3, .lg\\:push-3 {
            margin-left: calc((100% - ((11 * 24px) + 24px)) / 12 * 3 + (2 * 24px ) + 24px);
        }
        .cols-container .push-3, .cols-container .lg\\:push-3 {
            margin-left: calc((100% - ((11 * 24px) + 24px)) / 12 * 3 + (2 * 24px ) + (24px * 2));
        }
        }
        @media (min-width: 1024px) {
        .cols-4, .lg\\:cols-4 {
            width: calc((100% - ((11 * 24px) + 24px)) / 12 * 4 + (3 * 24px ));
        }
        .push-4, .lg\\:push-4 {
            margin-left: calc((100% - ((11 * 24px) + 24px)) / 12 * 4 + (3 * 24px ) + 24px);
        }
        .cols-container .push-4, .cols-container .lg\\:push-4 {
            margin-left: calc((100% - ((11 * 24px) + 24px)) / 12 * 4 + (3 * 24px ) + (24px * 2));
        }
        }
        @media (min-width: 1024px) {
        .cols-5, .lg\\:cols-5 {
            width: calc((100% - ((11 * 24px) + 24px)) / 12 * 5 + (4 * 24px ));
        }
        .push-5, .lg\\:push-5 {
            margin-left: calc((100% - ((11 * 24px) + 24px)) / 12 * 5 + (4 * 24px ) + 24px);
        }
        .cols-container .push-5, .cols-container .lg\\:push-5 {
            margin-left: calc((100% - ((11 * 24px) + 24px)) / 12 * 5 + (4 * 24px ) + (24px * 2));
        }
        }
        @media (min-width: 1024px) {
        .cols-6, .lg\\:cols-6 {
            width: calc((100% - ((11 * 24px) + 24px)) / 12 * 6 + (5 * 24px ));
        }
        .push-6, .lg\\:push-6 {
            margin-left: calc((100% - ((11 * 24px) + 24px)) / 12 * 6 + (5 * 24px ) + 24px);
        }
        .cols-container .push-6, .cols-container .lg\\:push-6 {
            margin-left: calc((100% - ((11 * 24px) + 24px)) / 12 * 6 + (5 * 24px ) + (24px * 2));
        }
        }
        @media (min-width: 1024px) {
        .cols-7, .lg\\:cols-7 {
            width: calc((100% - ((11 * 24px) + 24px)) / 12 * 7 + (6 * 24px ));
        }
        .push-7, .lg\\:push-7 {
            margin-left: calc((100% - ((11 * 24px) + 24px)) / 12 * 7 + (6 * 24px ) + 24px);
        }
        .cols-container .push-7, .cols-container .lg\\:push-7 {
            margin-left: calc((100% - ((11 * 24px) + 24px)) / 12 * 7 + (6 * 24px ) + (24px * 2));
        }
        }
        @media (min-width: 1024px) {
        .cols-8, .lg\\:cols-8 {
            width: calc((100% - ((11 * 24px) + 24px)) / 12 * 8 + (7 * 24px ));
        }
        .push-8, .lg\\:push-8 {
            margin-left: calc((100% - ((11 * 24px) + 24px)) / 12 * 8 + (7 * 24px ) + 24px);
        }
        .cols-container .push-8, .cols-container .lg\\:push-8 {
            margin-left: calc((100% - ((11 * 24px) + 24px)) / 12 * 8 + (7 * 24px ) + (24px * 2));
        }
        }
        @media (min-width: 1024px) {
        .cols-9, .lg\\:cols-9 {
            width: calc((100% - ((11 * 24px) + 24px)) / 12 * 9 + (8 * 24px ));
        }
        .push-9, .lg\\:push-9 {
            margin-left: calc((100% - ((11 * 24px) + 24px)) / 12 * 9 + (8 * 24px ) + 24px);
        }
        .cols-container .push-9, .cols-container .lg\\:push-9 {
            margin-left: calc((100% - ((11 * 24px) + 24px)) / 12 * 9 + (8 * 24px ) + (24px * 2));
        }
        }
        @media (min-width: 1024px) {
        .cols-10, .lg\\:cols-10 {
            width: calc((100% - ((11 * 24px) + 24px)) / 12 * 10 + (9 * 24px ));
        }
        .push-10, .lg\\:push-10 {
            margin-left: calc((100% - ((11 * 24px) + 24px)) / 12 * 10 + (9 * 24px ) + 24px);
        }
        .cols-container .push-10, .cols-container .lg\\:push-10 {
            margin-left: calc((100% - ((11 * 24px) + 24px)) / 12 * 10 + (9 * 24px ) + (24px * 2));
        }
        }
        @media (min-width: 1024px) {
        .cols-11, .lg\\:cols-11 {
            width: calc((100% - ((11 * 24px) + 24px)) / 12 * 11 + (10 * 24px ));
        }
        .push-11, .lg\\:push-11 {
            margin-left: calc((100% - ((11 * 24px) + 24px)) / 12 * 11 + (10 * 24px ) + 24px);
        }
        .cols-container .push-11, .cols-container .lg\\:push-11 {
            margin-left: calc((100% - ((11 * 24px) + 24px)) / 12 * 11 + (10 * 24px ) + (24px * 2));
        }
        }
        @media (min-width: 1024px) {
        .cols-12, .lg\\:cols-12 {
            width: calc(100% - 24px);
        }
        .push-12, .lg\\:push-12 {
            margin-left: calc(100% - 24px + 24px);
        }
        .cols-container .push-12, .cols-container .lg\\:push-12 {
            margin-left: calc(100% - 24px + (24px * 2));
        }
        }
        @media (min-width: 1024px) {
        .push-0, .lg\\:push-0 {
            margin-left: 0;
        }
        .cols-container .push-0, .cols-container .lg\\:push-0 {
            margin-left: 24px;
        }
        }
        @media (min-width: 1440px) {
        .cols-1, .xl\\:cols-1 {
            width: calc((100% - ((11 * 24px) + 24px)) / 12 * 1 + (0 * 24px ));
        }
        .push-1, .xl\\:push-1 {
            margin-left: calc((100% - ((11 * 24px) + 24px)) / 12 * 1 + (0 * 24px ) + 24px);
        }
        .cols-container .push-1, .cols-container .xl\\:push-1 {
            margin-left: calc((100% - ((11 * 24px) + 24px)) / 12 * 1 + (0 * 24px ) + (24px * 2));
        }
        }
        @media (min-width: 1440px) {
        .cols-2, .xl\\:cols-2 {
            width: calc((100% - ((11 * 24px) + 24px)) / 12 * 2 + (1 * 24px ));
        }
        .push-2, .xl\\:push-2 {
            margin-left: calc((100% - ((11 * 24px) + 24px)) / 12 * 2 + (1 * 24px ) + 24px);
        }
        .cols-container .push-2, .cols-container .xl\\:push-2 {
            margin-left: calc((100% - ((11 * 24px) + 24px)) / 12 * 2 + (1 * 24px ) + (24px * 2));
        }
        }
        @media (min-width: 1440px) {
        .cols-3, .xl\\:cols-3 {
            width: calc((100% - ((11 * 24px) + 24px)) / 12 * 3 + (2 * 24px ));
        }
        .push-3, .xl\\:push-3 {
            margin-left: calc((100% - ((11 * 24px) + 24px)) / 12 * 3 + (2 * 24px ) + 24px);
        }
        .cols-container .push-3, .cols-container .xl\\:push-3 {
            margin-left: calc((100% - ((11 * 24px) + 24px)) / 12 * 3 + (2 * 24px ) + (24px * 2));
        }
        }
        @media (min-width: 1440px) {
        .cols-4, .xl\\:cols-4 {
            width: calc((100% - ((11 * 24px) + 24px)) / 12 * 4 + (3 * 24px ));
        }
        .push-4, .xl\\:push-4 {
            margin-left: calc((100% - ((11 * 24px) + 24px)) / 12 * 4 + (3 * 24px ) + 24px);
        }
        .cols-container .push-4, .cols-container .xl\\:push-4 {
            margin-left: calc((100% - ((11 * 24px) + 24px)) / 12 * 4 + (3 * 24px ) + (24px * 2));
        }
        }
        @media (min-width: 1440px) {
        .cols-5, .xl\\:cols-5 {
            width: calc((100% - ((11 * 24px) + 24px)) / 12 * 5 + (4 * 24px ));
        }
        .push-5, .xl\\:push-5 {
            margin-left: calc((100% - ((11 * 24px) + 24px)) / 12 * 5 + (4 * 24px ) + 24px);
        }
        .cols-container .push-5, .cols-container .xl\\:push-5 {
            margin-left: calc((100% - ((11 * 24px) + 24px)) / 12 * 5 + (4 * 24px ) + (24px * 2));
        }
        }
        @media (min-width: 1440px) {
        .cols-6, .xl\\:cols-6 {
            width: calc((100% - ((11 * 24px) + 24px)) / 12 * 6 + (5 * 24px ));
        }
        .push-6, .xl\\:push-6 {
            margin-left: calc((100% - ((11 * 24px) + 24px)) / 12 * 6 + (5 * 24px ) + 24px);
        }
        .cols-container .push-6, .cols-container .xl\\:push-6 {
            margin-left: calc((100% - ((11 * 24px) + 24px)) / 12 * 6 + (5 * 24px ) + (24px * 2));
        }
        }
        @media (min-width: 1440px) {
        .cols-7, .xl\\:cols-7 {
            width: calc((100% - ((11 * 24px) + 24px)) / 12 * 7 + (6 * 24px ));
        }
        .push-7, .xl\\:push-7 {
            margin-left: calc((100% - ((11 * 24px) + 24px)) / 12 * 7 + (6 * 24px ) + 24px);
        }
        .cols-container .push-7, .cols-container .xl\\:push-7 {
            margin-left: calc((100% - ((11 * 24px) + 24px)) / 12 * 7 + (6 * 24px ) + (24px * 2));
        }
        }
        @media (min-width: 1440px) {
        .cols-8, .xl\\:cols-8 {
            width: calc((100% - ((11 * 24px) + 24px)) / 12 * 8 + (7 * 24px ));
        }
        .push-8, .xl\\:push-8 {
            margin-left: calc((100% - ((11 * 24px) + 24px)) / 12 * 8 + (7 * 24px ) + 24px);
        }
        .cols-container .push-8, .cols-container .xl\\:push-8 {
            margin-left: calc((100% - ((11 * 24px) + 24px)) / 12 * 8 + (7 * 24px ) + (24px * 2));
        }
        }
        @media (min-width: 1440px) {
        .cols-9, .xl\\:cols-9 {
            width: calc((100% - ((11 * 24px) + 24px)) / 12 * 9 + (8 * 24px ));
        }
        .push-9, .xl\\:push-9 {
            margin-left: calc((100% - ((11 * 24px) + 24px)) / 12 * 9 + (8 * 24px ) + 24px);
        }
        .cols-container .push-9, .cols-container .xl\\:push-9 {
            margin-left: calc((100% - ((11 * 24px) + 24px)) / 12 * 9 + (8 * 24px ) + (24px * 2));
        }
        }
        @media (min-width: 1440px) {
        .cols-10, .xl\\:cols-10 {
            width: calc((100% - ((11 * 24px) + 24px)) / 12 * 10 + (9 * 24px ));
        }
        .push-10, .xl\\:push-10 {
            margin-left: calc((100% - ((11 * 24px) + 24px)) / 12 * 10 + (9 * 24px ) + 24px);
        }
        .cols-container .push-10, .cols-container .xl\\:push-10 {
            margin-left: calc((100% - ((11 * 24px) + 24px)) / 12 * 10 + (9 * 24px ) + (24px * 2));
        }
        }
        @media (min-width: 1440px) {
        .cols-11, .xl\\:cols-11 {
            width: calc((100% - ((11 * 24px) + 24px)) / 12 * 11 + (10 * 24px ));
        }
        .push-11, .xl\\:push-11 {
            margin-left: calc((100% - ((11 * 24px) + 24px)) / 12 * 11 + (10 * 24px ) + 24px);
        }
        .cols-container .push-11, .cols-container .xl\\:push-11 {
            margin-left: calc((100% - ((11 * 24px) + 24px)) / 12 * 11 + (10 * 24px ) + (24px * 2));
        }
        }
        @media (min-width: 1440px) {
        .cols-12, .xl\\:cols-12 {
            width: calc(100% - 24px);
        }
        .push-12, .xl\\:push-12 {
            margin-left: calc(100% - 24px + 24px);
        }
        .cols-container .push-12, .cols-container .xl\\:push-12 {
            margin-left: calc(100% - 24px + (24px * 2));
        }
        }
        @media (min-width: 1440px) {
        .push-0, .xl\\:push-0 {
            margin-left: 0;
        }
        .cols-container .push-0, .cols-container .xl\\:push-0 {
            margin-left: 24px;
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
