import { defineConfig } from 'vitepress';
import zh from './locales/zh';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  locales: {
    root: {
      label: 'English',
      lang: 'en',
      dir: 'src/en',
      title: 'LemonTemplate',
      description: 'Lemon Template official documentation',
    },
    zh,
  },
  base: '/lemon-template-docs/',
  cleanUrls: true,
  metaChunk: true,
  lastUpdated: true,
  assetsDir: 'public',
  srcDir: 'src',

  head: [
    ['link', { rel: 'icon', href: '/lemon-template-docs/favicon.svg', type: 'image/svg+xml' }],
    [
      'link',
      {
        rel: 'alternate icon',
        href: '/lemon-template-docs/favicon.ico',
        type: 'image/png',
        sizes: '16x16',
      },
    ],
    [
      'meta',
      {
        name: 'author',
        content: 'sankeyangshu',
      },
    ],
    [
      'meta',
      {
        name: 'viewport',
        content:
          'width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no',
      },
    ],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en' }],
    [
      'meta',
      {
        property: 'og:title',
        content: 'LemonTemplate | Out of the box mobile web application template',
      },
    ],
    ['meta', { property: 'og:site_name', content: 'LemonTemplate' }],
  ],

  themeConfig: {
    logo: { src: '/logo.svg', width: 24, height: 24 },

    nav: [
      { text: 'Guide', link: '/guide/' },
      {
        text: 'Templates',
        items: [
          {
            text: 'lemon-template-vue',
            link: '/vue/',
          },
          {
            text: 'lemon-template-react',
            link: '/react/',
          },
        ],
      },
      {
        text: 'Links',
        items: [
          {
            text: 'Preview',
            items: [
              {
                text: 'Live Demo (Vue)',
                link: 'https://lemon-template-vue.vercel.app',
              },
              {
                text: 'Live Demo (React)',
                link: 'https://lemon-template-react.vercel.app',
              },
            ],
          },
          {
            text: 'Source Code',
            items: [
              {
                text: 'Github (Vue Template)',
                link: 'https://github.com/sankeyangshu/lemon-template-vue',
              },
              {
                text: 'Github (React Template)',
                link: 'https://github.com/sankeyangshu/lemon-template-react',
              },
            ],
          },
          {
            text: 'Documentation',
            items: [
              {
                text: 'Documentation Source',
                link: 'https://github.com/sankeyangshu/lemon-template-docs',
              },
            ],
          },
        ],
      },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            {
              text: 'Introduction',
              link: '/guide/',
            },
          ],
        },
        {
          text: 'Mobile Templates',
          items: [
            {
              text: 'lemon-template-vue',
              link: '/vue/',
            },
            {
              text: 'lemon-template-react',
              link: '/react/',
            },
          ],
        },
      ],
      '/vue/': [
        {
          text: 'Vue Template',
          items: [
            { text: 'Introduction', link: '/vue/' },
            { text: 'Quick Start', link: '/vue/quick-start' },
            { text: 'Styling', link: '/vue/style' },
            { text: 'Icons', link: '/vue/icon' },
            { text: 'Localization', link: '/vue/locale' },
            { text: 'State Management', link: '/vue/store' },
            { text: 'Router', link: '/vue/router' },
            { text: 'HTTP Requests', link: '/vue/request' },
          ],
        },
      ],
      '/react/': [
        {
          text: 'React Template',
          items: [
            { text: 'Introduction', link: '/react/' },
            { text: 'Quick Start', link: '/react/quick-start' },
            { text: 'Styling', link: '/react/style' },
            { text: 'Icons', link: '/react/icons' },
            { text: 'Localization', link: '/react/locale' },
            { text: 'State Management', link: '/react/store' },
            { text: 'Router', link: '/react/router' },
            { text: 'HTTP Requests', link: '/react/request' },
          ],
        },
      ],
    },

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/sankeyangshu/lemon-template-docs',
      },
    ],

    search: {
      provider: 'local',
    },

    outline: {
      label: 'On this page',
    },

    editLink: {
      pattern: 'https://github.com/sankeyangshu/lemon-docs/edit/main/:path',
      text: 'Edit this page on GitHub',
    },

    lastUpdated: {
      text: 'Last updated on',
    },

    docFooter: {
      prev: 'Prev page',
      next: 'Next page',
    },

    footer: {
      message: 'Publish under the MIT license',
      copyright: 'Copyright © 2023-PRESENT sankeyangshu',
    },
  },

  ignoreDeadLinks: [
    // 忽略所有 localhost 链接
    /^https?:\/\/localhost/,
  ],
});
