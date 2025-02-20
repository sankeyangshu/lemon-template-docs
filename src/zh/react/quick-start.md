# 快速开始

本文会帮助你从头启动项目

## 环境准备

本地环境需要安装 [Pnpm](https://www.pnpm.cn/)、[Node.js](http://nodejs.org/) 和 [Git](https://git-scm.com/)

- 推荐使用 [pnpm>=8.15.4](https://www.pnpm.cn/)，否则依赖可能安装不上，出现打包报错等问题。
- [Node.js](http://nodejs.org/) 版本要求`18.x`以上，这里推荐 `^18.18.0 || >=20.0.0`。

## Vscode 配套插件

如果你使用的 IDE 是[vscode](https://code.visualstudio.com/)(推荐)的话，可以安装以下工具来提高开发效率及代码格式化

- [UnoCSS](https://marketplace.visualstudio.com/items?itemName=antfu.unocss) - UnoCSS 提示插件
- [DotENV](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv) - `.env` 文件 高亮
- [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens) - 更好的错误定位
- [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) - 不同 IDE 维护一致的编码样式
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - 脚本代码检查
- [i18n Ally](https://marketplace.visualstudio.com/items?itemName=lokalise.i18n-ally) - 多合一的 I18n 支持
- [JavaScript and TypeScript Vscode Snippets](https://marketplace.visualstudio.com/items?itemName=sankeyangshu.vscode-javascript-typescript-snippets) - JavaScript 和 TypeScript 代码片段
- [React Collection Vscode Snippets](https://marketplace.visualstudio.com/items?itemName=sankeyangshu.vscode-react-collection-snippets) - 提供 React 代码片段支持

## 代码获取

我们提供了以下几种方式拉取代码。

### GitHub 模板

[使用这个模板创建仓库](https://github.com/sankeyangshu/lemon-template-react/generate)

### 克隆使用

```bash
# 克隆项目
git clone https://github.com/sankeyangshu/lemon-template-react.git

# 进入项目目录
cd lemon-template-react

# 安装依赖 - 推荐使用pnpm
pnpm install

# 启动服务
pnpm dev

# 打包发布
pnpm build
```

## npm scripts

```json
{
  // 启动项目开发环境服务
  "dev": "vite",
  // 打包构建开发环境代码
  "build:dev": "vite build --mode development",
  // 打包构建生产环境代码
  "build:prod": "vite build --mode production",
  // 打包构建测试环境代码
  "build:test": "vite build --mode test",
  // 执行 ESLint 检查代码规范
  "lint": "eslint .",
  // 执行 ESLint 检查并自动修复代码
  "lint:fix": "eslint . --fix",
  // 运行单元测试脚本
  "test": "vitest",
  // 本地环境预览构建后的dist
  "preview": "vite preview",
  // 清理缓存文件
  "clean:cache": "rimraf node_modules/.cache/ && rimraf node_modules/.vite",
  // 清理依赖包文件
  "clean:lib": "rimraf node_modules",
  // 发布新版本
  "release": "bumpp",
  // 限制仅允许使用 pnpm 作为包管理器
  "preinstall": "npx only-allow pnpm",
  // 初始化 simple-git-hooks
  "prepare": "simple-git-hooks"
}
```

## 目录结构

```
lemon-template-react
├── .vscode                                  // vscode插件和设置
│   ├── extensions.json                      // vscode推荐的插件
│   └── settings.json                        // vscode配置(在该项目中生效)
├── build                                    // vite构建相关配置和插件
│   ├── config                               // 构建打包配置
│   │   ├── index.ts                         // 配置汇总
│   │   ├── proxy.ts                         // 代理配置
│   │   └── utils.ts                         // 工具函数
│   └── plugins                              // 构建插件
│       ├── compress.ts                      // gzip压缩插件
│       ├── index.ts                         // 插件汇总
│       └── svgPlugin.ts                     // svg插件
├── mock                                     // mock数据
│   ├── modules                              // mock模块
│   │   └── user.mock.ts                     // 用户mock数据
│   └── util.ts                              // mock工具函数
├── public                                   // 公共目录(文件夹里面的资源打包后会在根目录下)
│   ├── logo.png                             // 网站logo
│   └── logo.svg                             // 网站logo
├── src                                      // 源码目录
│   ├── api                                  // 接口模块
│   │   └── System                           // 系统接口模块
│   │       └── user.ts                      // 用户接口
│   ├── assets                               // 静态资源
│   │   ├── icons                            // 图标
│   │   └── images                           // 图片
│   ├── components                           // 组件
│   │   ├── Icon                             // 图标组件
│   │   │   ├── IconifyIcon.tsx              // Iconify图标组件
│   │   │   ├── SvgIcon.tsx                  // Svg图标组件
│   │   │   └── index.less                   // 图标组件样式
│   │   └── SwitchDark                       // 深色模式切换组件
│   ├── config                               // 配置文件
│   ├── hooks                                // 自定义hooks
│   │   ├── useECharts.ts                    // ECharts hooks
│   │   ├── useLanguage.ts                   // 多语言hooks
│   │   └── useTheme.ts                      // 主题hooks
│   ├── layout                               // 布局
│   │   └── index.tsx                        // 基本布局(包含头部导航栏、底部导航栏、主体)
│   ├── locales                              // 国际化配置
│   │   ├── index.ts                         // 国际化配置汇总
│   │   └── modules                          // 语言文件
│   ├── plugins                              // 插件
│   │   └── ECharts.ts                       // ECharts插件
│   ├── routers                              // 路由
│   │   ├── index.tsx                        // 路由配置
│   │   └── utils                            // 路由工具函数
│   │       ├── authGuard.tsx                // 路由守卫
│   │       ├── index.ts                     // 路由工具函数汇总
│   │       ├── lazyLoad.tsx                 // 路由懒加载
│   │       └── routeType.ts                 // 路由类型
│   ├── store                                // zustand状态管理
│   │   ├── setting.ts                       // 系统设置状态管理
│   │   └── user.ts                          // 用户状态管理
│   ├── styles                               // 全局样式
│   │   ├── index.less                       // 全局样式入口
│   │   ├── theme.less                       // 主题样式
│   │   ├── transition.less                  // 动画样式
│   │   └── variables.less                   // 全局样式变量
│   ├── types                                // 类型定义
│   │   ├── global.d.ts                      // 全局类型定义
│   │   ├── shims.d.ts                       // 模块类型定义
│   │   └── vite-env.d.ts                    // vite环境变量类型定义
│   ├── utils                                // 工具函数
│   │   ├── color.ts                         // 颜色工具函数
│   │   ├── is.ts                            // 判断工具函数
│   │   ├── request                          // 网络请求封装
│   │   │   ├── AxiosCancel.ts               // 取消请求
│   │   │   ├── CheckStatus.ts               // 状态码检查
│   │   │   ├── index.ts                     // axios封装
│   │   │   └── request.ts                   // axios配置文件
│   │   └── validate.ts                      // 验证工具函数
│   └── views                                // 页面
│       ├── ErrorPages                       // 错误页面
│       │   └── 404.tsx                      // 404页面
│       ├── Example                          // 示例页面
│       │   ├── echartsDemo.tsx              // ECharts示例
│       │   ├── iconDemo.tsx                 // 图标示例
│       │   ├── index.tsx                    // 示例页面入口
│       │   ├── keepAliveDemo.tsx            // KeepAlive示例
│       │   └── mockDemo.tsx                 // Mock示例
│       ├── Home                             // 首页
│       │   ├── index.less                   // 首页样式
│       │   └── index.tsx                    // 首页
│       ├── Login                            // 登录
│       │   ├── components                   // 登录组件
│       │   ├── forgotPassword.tsx           // 忘记密码
│       │   ├── index.tsx                    // 登录页面
│       │   └── register.tsx                 // 注册
│       ├── Mine                             // 我的
│       └── ThemeSetting                     // 主题设置
│   ├── App.tsx                              // React文件入口
│   ├── main.tsx                             // 项目入口TS文件
├── .editorconfig                            // 统一编辑器配置
├── .env                                     // 环境变量配置
├── .env.development                         // 开发环境变量配置
├── .env.production                          // 生产环境变量配置
├── LICENSE                                  // 开源协议
├── README.md                                // 项目英文说明
├── README.zh-CN.md                          // 项目中文说明
├── commitlint.config.ts                     // commitlint配置
├── eslint.config.js                         // eslint配置
├── index.html                               // html文件
├── package.json                             // npm依赖描述文件
├── pnpm-lock.yaml                           // npm包管理器pnpm依赖锁定文件
├── tsconfig.app.json                        // tsconfig配置
├── tsconfig.json                            // tsconfig配置
├── tsconfig.node.json                       // tsconfig配置
├── uno.config.ts                            // UnoCss配置
├── vercel.json                              // vercel配置
└── vite.config.ts                           // vite配置
```

## 提交规范

项目使用 `simple-git-hooks` 和 `commitlint` 规范 Git 提交信息，遵循社区主流的 [Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular) 规范。

- `feat`: 新增功能
- `fix`: 修复 bug
- `docs`: 文档变更
- `style`: 代码格式（不影响功能，例如空格、分号等格式修正）
- `refactor`: 代码重构（不包括 bug 修复、功能新增）
- `perf`: 性能优化
- `test`: 添加、修改测试用例
- `build`: 构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）
- `ci`: 修改 CI 配置、脚本
- `chore`: 对构建过程或辅助工具和库的更改（不影响源文件、测试用例）
- `revert`: 回滚 commit
