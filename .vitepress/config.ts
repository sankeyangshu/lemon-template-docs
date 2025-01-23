import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'LemonTemplate',
  cleanUrls: true,
  metaChunk: true,
  lastUpdated: true,
  assetsDir: 'public',
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
    ['meta', { property: 'og:locale', content: 'zh' }],
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

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '指引', link: '/guide/' },
      {
        text: '项目模板',
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
        text: '链接',
        items: [
          {
            text: '预览',
            items: [
              {
                text: '在线预览(Vue)',
                link: 'https://lemon-template-vue.vercel.app',
              },
              {
                text: '在线预览(React)',
                link: 'https://lemon-template-react.vercel.app',
              },
            ],
          },
          {
            text: '源码仓库',
            items: [
              {
                text: 'Github(Vue模版)',
                link: 'https://github.com/sankeyangshu/lemon-template-vue',
              },
              {
                text: 'Github(React模版)',
                link: 'https://github.com/sankeyangshu/lemon-template-react',
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
          text: 'Vue 模板',
          items: [
            { text: '介绍', link: '/vue/' },
            { text: '快速开始', link: '/vue/quick-start' },
            { text: '样式', link: '/vue/style' },
            { text: '图标', link: '/vue/icon' },
            { text: '多语言', link: '/vue/locale' },
            { text: '状态', link: '/vue/store' },
            { text: '路由', link: '/vue/router' },
            { text: '请求', link: '/vue/request' },
          ],
        },
      ],
      '/react/': [
        {
          text: 'React 模板',
          items: [
            { text: '介绍', link: '/react/' },
            { text: '快速开始', link: '/react/quick-start' },
            { text: '样式', link: '/react/style' },
            { text: '图标', link: '/react/icons' },
            { text: '多语言', link: '/react/locale' },
            { text: '状态', link: '/react/store' },
            { text: '路由', link: '/react/router' },
            { text: '请求', link: '/react/request' },
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
