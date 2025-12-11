import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  cleanUrls: true,
  metaChunk: true,
  lastUpdated: true,
  srcDir: 'src',

  head: [
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    [
      'link',
      {
        rel: 'alternate icon',
        href: '/favicon.ico',
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
    [
      'meta',
      {
        property: 'og:title',
        content: 'LemonTemplate',
      },
    ],
    ['meta', { property: 'og:site_name', content: 'LemonTemplate' }],
  ],

  title: 'LemonTemplate',
  description: 'Lemon Template 官方文档',
  themeConfig: {
    logo: { src: '/logo.svg', width: 24, height: 24 },

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '指引', link: '/guide/' },
      {
        text: '移动模板',
        items: [
          {
            text: 'lemon-mobile-react',
            link: '/mobile-react/',
          },
          {
            text: 'lemon-mobile-vue',
            link: '/mobile-vue/',
          },
        ],
      },
      {
        text: '链接',
        items: [
          {
            text: '预览',
            items: [
              {
                text: '移动端(React)',
                link: 'https://lemon-mobile-react.vercel.app',
              },
              {
                text: '移动端(Vue)',
                link: 'https://lemon-mobile-vue.vercel.app',
              },
            ],
          },
          {
            text: '源码仓库',
            items: [
              {
                text: '移动端(React)',
                link: 'https://github.com/sankeyangshu/lemon-mobile-react',
              },
              {
                text: '移动端(Vue)',
                link: 'https://github.com/sankeyangshu/lemon-mobile-vue',
              },
            ],
          },
          {
            text: '文档',
            items: [
              {
                text: '文档源码',
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
          text: '开始',
          items: [
            {
              text: '简介',
              link: '/guide/',
            },
          ],
        },
        {
          text: '移动模板',
          items: [
            {
              text: 'lemon-mobile-react',
              link: '/mobile-react/',
            },
            {
              text: 'lemon-mobile-vue',
              link: '/mobile-vue/',
            },
          ],
        },
      ],
      '/mobile-react/': [
        {
          text: 'lemon-mobile-react',
          items: [
            { text: '介绍', link: '/mobile-react/' },
            { text: '快速开始', link: '/mobile-react/quick-start' },
            { text: '样式', link: '/mobile-react/style' },
            { text: '图标', link: '/mobile-react/icons' },
            { text: '多语言', link: '/mobile-react/locale' },
            { text: '状态', link: '/mobile-react/store' },
            { text: '路由', link: '/mobile-react/router' },
            { text: '请求', link: '/mobile-react/request' },
          ],
        },
      ],
      '/mobile-vue/': [
        {
          text: 'lemon-mobile-vue',
          items: [
            { text: '介绍', link: '/mobile-vue/' },
            { text: '快速开始', link: '/mobile-vue/quick-start' },
            { text: '样式', link: '/mobile-vue/style' },
            { text: '图标', link: '/mobile-vue/icon' },
            { text: '多语言', link: '/mobile-vue/locale' },
            { text: '状态', link: '/mobile-vue/store' },
            { text: '路由', link: '/mobile-vue/router' },
            { text: '请求', link: '/mobile-vue/request' },
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
      label: '页面导航',
    },

    editLink: {
      pattern: 'https://github.com/sankeyangshu/lemon-docs/edit/main/:path',
      text: '在 GitHub 上编辑此页面',
    },

    lastUpdated: {
      text: '最后更新于',
    },

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    footer: {
      message: '基于 MIT 许可发布',
      copyright: '版权所有 © 2023-PRESENT sankeyangshu',
    },
  },

  ignoreDeadLinks: [
    // 忽略所有 localhost 链接
    /^https?:\/\/localhost/,
  ],
});
