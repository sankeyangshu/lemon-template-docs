export default {
  label: '简体中文',
  lang: 'zh',
  dir: 'src/zh',
  title: 'LemonTemplate',
  description: 'Lemon Template 官方文档',
  themeConfig: {
    logo: { src: '/logo.svg', width: 24, height: 24 },

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '指引', link: '/zh/guide/' },
      {
        text: '项目模板',
        items: [
          {
            text: 'lemon-template-vue',
            link: '/zh/vue/',
          },
          {
            text: 'lemon-template-react',
            link: '/zh/react/',
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
      '/zh/guide/': [
        {
          text: '开始',
          items: [
            {
              text: '简介',
              link: '/zh/guide/',
            },
          ],
        },
        {
          text: '移动模板',
          items: [
            {
              text: 'lemon-template-vue',
              link: '/zh/vue/',
            },
            {
              text: 'lemon-template-react',
              link: '/zh/react/',
            },
          ],
        },
      ],
      '/zh/vue/': [
        {
          text: 'Vue 模板',
          items: [
            { text: '介绍', link: '/zh/vue/' },
            { text: '快速开始', link: '/zh/vue/quick-start' },
            { text: '样式', link: '/zh/vue/style' },
            { text: '图标', link: '/zh/vue/icon' },
            { text: '多语言', link: '/zh/vue/locale' },
            { text: '状态', link: '/zh/vue/store' },
            { text: '路由', link: '/zh/vue/router' },
            { text: '请求', link: '/zh/vue/request' },
          ],
        },
      ],
      '/zh/react/': [
        {
          text: 'React 模板',
          items: [
            { text: '介绍', link: '/zh/react/' },
            { text: '快速开始', link: '/zh/react/quick-start' },
            { text: '样式', link: '/zh/react/style' },
            { text: '图标', link: '/zh/react/icons' },
            { text: '多语言', link: '/zh/react/locale' },
            { text: '状态', link: '/zh/react/store' },
            { text: '路由', link: '/zh/react/router' },
            { text: '请求', link: '/zh/react/request' },
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
};
