# 快速开始

本文会帮助你从头启动项目

## 环境准备

本地环境需要安装 [Pnpm](https://www.pnpm.cn/)、[Node.js](http://nodejs.org/) 和 [Git](https://git-scm.com/)

- 推荐使用 [pnpm>=10.5.0](https://www.pnpm.cn/)，否则依赖可能安装不上，出现打包报错等问题
- [Node.js](http://nodejs.org/) 版本要求`20.x`以上，这里推荐 `>= 20.19.0 || >= 22.12.0 || >= 24.0.0`

## Vscode 配套插件

如果你使用的 IDE 是[vscode](https://code.visualstudio.com/)(推荐)的话，可以安装以下工具来提高开发效率及代码格式化

- [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) - vue 开发必备
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) - Tailwind CSS 提示插件
- [DotENV](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv) - `.env` 文件 高亮
- [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens) - 更好的错误定位
- [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) - 不同 IDE 维护一致的编码样式
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - 脚本代码检查
- [i18n Ally](https://marketplace.visualstudio.com/items?itemName=lokalise.i18n-ally) - 多合一的 I18n 支持
- [JavaScript and TypeScript Vscode Snippets](https://marketplace.visualstudio.com/items?itemName=sankeyangshu.vscode-javascript-typescript-snippets) - JavaScript 和 TypeScript 代码片段
- [Vue Collection Vscode Snippets](https://marketplace.visualstudio.com/items?itemName=sankeyangshu.vscode-vue-collection-snippets) - 提供 Vue 2/3 代码片段

## 代码获取

我们提供了以下几种方式拉取代码

### 脚手架

```bash
# 复制命令 - project 为你的项目名称
pnpm create lemon project -t mobile-uniapp
```

### GitHub 模板

[使用这个模板创建仓库](https://github.com/sankeyangshu/lemon-mobile-uniapp/generate)

### 克隆使用

```bash
# 克隆项目
git clone https://github.com/sankeyangshu/lemon-mobile-uniapp.git

# 进入项目目录
cd lemon-mobile-uniapp

# 安装依赖 - 推荐使用pnpm
pnpm install

# 选择合适的平台启动服务，默认微信小程序
pnpm dev

# 选择合适的平台打包发布，默认微信小程序
pnpm build

# 选择合适的平台启动服务，例如 H5
# pnpm dev h

# 选择合适的平台打包发布，例如 H5
# pnpm build h
```

## npm scripts

```json
{
  // 启动项目开发环境服务 - 默认平台：微信小程序
  "dev": "unh dev",
  // 打包构建生产环境代码 - 默认平台：微信小程序
  "build": "unh build",
  // 打印 unh 信息
  "about": "unh info",
  // 类型检查
  "typecheck": "vue-tsc --noEmit",
  // 执行 ESLint 检查代码规范
  "lint": "eslint",
  // 执行 ESLint 检查并自动修复代码
  "lint:fix": "eslint --fix",
  // 限制仅允许使用 pnpm 作为包管理器
  "preinstall": "npx only-allow pnpm",
  // tailwindcss 支持小程序的修复补丁
  "postinstall": "weapp-tw patch",
  // 初始化 simple-git-hooks
  "prepare": "simple-git-hooks"
}
```

::: tip
如果想修改默认平台，请修改 `unh.config.ts` 中的配置，更多关于 `unh` 的配置请查阅[文档](https://uni-helper.js.org/unh/installation)
:::

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
