# 介绍

[lemon-mobile-react](https://github.com/sankeyangshu/lemon-mobile-react) 一个基于 `React` 生态系统的移动端 web 应用模板，使用了最新的`React19`、`Vite7`、`TanStack Router`、`TanStack Query`、`Daisyui`、`Zustand`、`Typescript`、`Tailwindcss V4`等主流技术开发，内置了 `layout布局`、`axios封装`、`登录拦截` 等基础功能，同时还提供了业务当中常用的组件，例如：`Dark Mode`、`i18n`、`Mock`、`ECharts`、`Zustand 持久化`、`SVG Icon` 等示例。采用模块化设计，无需额外配置，开箱即用，让开发者能够专注于业务逻辑的开发。

## 在线预览

👓 [点击这里](https://lemon-mobile-react.vercel.app)（PC浏览器请切换手机端模式）

## 特性

- ⚡️ 使用 `React` + `Hooks` 开发
- ✨ 采用 `Vite7` 作为项目开发、打包工具（配置 `Gzip` 打包、`TSX` 语法、跨域代理…）
- 🍕 整个项目集成了 `TypeScript`
- 🚦 使用 `TanStack Router` 作为路由管理方案，提供类型安全的路由系统
- 🔄 使用 `TanStack Query` 进行服务端状态管理，简化数据获取和缓存
- 🍍 使用 `Zustand` 做状态管理，轻量、简单、易用
- 📦 `@reactuses/core` 高质量可靠的 React Hooks 库
- 🎨 `daisyui` 组件库
- 🌀 `tailwindcss` 即时原子化 CSS 引擎
- 👏 集成多种图标方案
- 🌓 支持深色模式
- 🌍 多语言国际化，支持 `i18n` 国际化方案
- 🔥 集成 `Echarts` 数据可视化图表，封装 `useECharts Hooks`
- ⚙️ 使用 `Vitest` 进行单元测试
- ☁️ `Axios` 封装
- 💾 本地 `Mock` 数据模拟的支持
- 📱 浏览器适配
- 📥 打包资源 `gzip` 压缩
- 🛡️ 首屏加载动画
- 💪 集成 `Eslint` 代码校验规范，并且该 `Eslint` 配置默认使用 `Prettier` 格式化代码，
- 🌈 使用 `simple-git-hooks`、`lint-staged`、`commitlint` 规范提交信息

## 基础知识

提前了解和学习这些知识会对使用本项目有很大的帮助。

- [React](https://react.dev/) - 熟悉 `React` 基础语法
- [Vite](https://cn.vitejs.dev/) - 熟悉 `Vite` 特性
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction) - 熟悉 `Zustand` 基本使用
- [TypeScript](https://www.typescriptlang.org/) - 熟悉 `TypeScript` 基本语法
- [TanStack Router](https://tanstack.com/router/latest/docs/framework/react/overview) - 熟悉 `TanStack Router`基本使用
- [Icones](https://icones.js.org/) - 本项目推荐图标库，当然你也可以使用 `SVG Icon`
- [Tailwind CSS](https://tailwindcss.com/) - 高性能且极具灵活性的即时原子化 CSS 引擎
- [@reactuses/core](https://reactuse.com/zh-Hans/) - 一套高质量可靠的 React Hooks 库
- [Daisyui](https://daisyui.com/docs/intro/) - Tailwind CSS 插件，更快、更简洁、更简单的Tailwind CSS 开发
- [ECharts6](https://echarts.apache.org/handbook/zh/get-started/) - 熟悉 `Echarts` 基本使用
- [Mock.js](https://github.com/nuysoft/Mock) - 了解 `Mockjs` 基本语法
- [Es6+](http://es6.ruanyifeng.com/) - 熟悉 `ES6` 基本语法

## 浏览器支持

- 本地开发推荐使用 Chrome 最新版浏览器 [Download](https://www.google.com/intl/zh-CN/chrome/)。
- 生产环境支持现代浏览器，不在支持 IE 浏览器，更多浏览器可以查看 [Can I Use Es Module](https://caniuse.com/?search=ESModule)。

| [<img src="https://i.imgtg.com/2023/04/11/8z7ot.png" alt=" IE" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| :----------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                      not support                                                                       |                                                                                            last 2 versions                                                                                             |                                                                                                  last 2 versions                                                                                                  |                                                                                                last 2 versions                                                                                                |                                                                                                last 2 versions                                                                                                |

## 许可证

[MIT](https://github.com/sankeyangshu/lemon-mobile-react/blob/main/LICENSE) License © 2023-PRESENT [sankeyangshu](https://github.com/sankeyangshu)
