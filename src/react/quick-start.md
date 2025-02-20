# Quick Start

This article will help you start the project from scratch

## Environment Preparation

Your local environment needs to have [Pnpm](https://www.pnpm.cn/), [Node.js](http://nodejs.org/), and [Git](https://git-scm.com/) installed

- Recommended to use [pnpm>=8.15.4](https://www.pnpm.cn/), otherwise dependencies might not install properly, leading to packaging errors and other issues.
- [Node.js](http://nodejs.org/) version requirement is `18.x` or above, we recommend `^18.18.0 || >=20.0.0`.

## VSCode Plugins

If you're using [vscode](https://code.visualstudio.com/)(recommended) as your IDE, you can install the following tools to improve development efficiency and code formatting

- [UnoCSS](https://marketplace.visualstudio.com/items?itemName=antfu.unocss) - UnoCSS hint plugin
- [DotENV](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv) - `.env` file highlighting
- [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens) - Better error locating
- [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) - Maintain consistent coding styles across different IDEs
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - Script code checking
- [i18n Ally](https://marketplace.visualstudio.com/items?itemName=lokalise.i18n-ally) - All-in-one I18n support
- [JavaScript and TypeScript Vscode Snippets](https://marketplace.visualstudio.com/items?itemName=sankeyangshu.vscode-javascript-typescript-snippets) - JavaScript and TypeScript code snippets
- [React Collection Vscode Snippets](https://marketplace.visualstudio.com/items?itemName=sankeyangshu.vscode-react-collection-snippets) - Provides React code snippets support

## Getting the Code

We provide several ways to pull the code.

### GitHub Template

[Use this template to create repository](https://github.com/sankeyangshu/lemon-template-react/generate)

### Clone and Use

```bash
# Clone project
git clone https://github.com/sankeyangshu/lemon-template-react.git

# Enter project directory
cd lemon-template-react

# Install dependencies - pnpm recommended
pnpm install

# Start service
pnpm dev

# Build and publish
pnpm build
```

## npm scripts

```json
{
  // Start project development environment service
  "dev": "vite",
  // Build development environment code
  "build:dev": "vite build --mode development",
  // Build production environment code
  "build:prod": "vite build --mode production",
  // Build test environment code
  "build:test": "vite build --mode test",
  // Execute ESLint code standard check
  "lint": "eslint .",
  // Execute ESLint check and automatically fix code
  "lint:fix": "eslint . --fix",
  // Run unit test scripts
  "test": "vitest",
  // Preview built dist locally
  "preview": "vite preview",
  // Clean cache files
  "clean:cache": "rimraf node_modules/.cache/ && rimraf node_modules/.vite",
  // Clean dependency package files
  "clean:lib": "rimraf node_modules",
  // Release new version
  "release": "bumpp",
  // Restrict to only using pnpm as package manager
  "preinstall": "npx only-allow pnpm",
  // Initialize simple-git-hooks
  "prepare": "simple-git-hooks"
}
```

## Directory Structure

```
lemon-template-react
├── .vscode                                  // vscode plugins and settings
│   ├── extensions.json                      // vscode recommended plugins
│   └── settings.json                        // vscode configuration (effective in this project)
├── build                                    // vite build related configuration and plugins
│   ├── config                               // build packaging configuration
│   │   ├── index.ts                         // configuration summary
│   │   ├── proxy.ts                         // proxy configuration
│   │   └── utils.ts                         // utility functions
│   └── plugins                              // build plugins
│       ├── compress.ts                      // gzip compression plugin
│       ├── index.ts                         // plugin summary
│       └── svgPlugin.ts                     // svg plugin
├── mock                                     // mock data
│   ├── modules                              // mock modules
│   │   └── user.mock.ts                     // user mock data
│   └── util.ts                              // mock utility functions
├── public                                   // public directory (files in this folder will be at root after build)
│   ├── logo.png                             // website logo
│   └── logo.svg                             // website logo
├── src                                      // source code directory
│   ├── api                                  // interface modules
│   │   └── System                           // system interface module
│   │       └── user.ts                      // user interface
│   ├── assets                               // static resources
│   │   ├── icons                            // icons
│   │   └── images                           // images
│   ├── components                           // components
│   │   ├── Icon                             // icon components
│   │   │   ├── IconifyIcon.tsx              // Iconify icon component
│   │   │   ├── SvgIcon.tsx                  // Svg icon component
│   │   │   └── index.less                   // icon component styles
│   │   └── SwitchDark                       // dark mode switch component
│   ├── config                               // configuration files
│   ├── hooks                                // custom hooks
│   │   ├── useECharts.ts                    // ECharts hooks
│   │   ├── useLanguage.ts                   // multi-language hooks
│   │   └── useTheme.ts                      // theme hooks
│   ├── layout                               // layout
│   │   └── index.tsx                        // basic layout (includes header nav, footer nav, main body)
│   ├── locales                              // internationalization configuration
│   │   ├── index.ts                         // internationalization configuration summary
│   │   └── modules                          // language files
│   ├── plugins                              // plugins
│   │   └── ECharts.ts                       // ECharts plugin
│   ├── routers                              // router
│   │   ├── index.tsx                        // router configuration
│   │   └── utils                            // router utility functions
│   │       ├── authGuard.tsx                // router guard
│   │       ├── index.ts                     // router utility functions summary
│   │       ├── lazyLoad.tsx                 // router lazy loading
│   │       └── routeType.ts                 // router type
│   ├── store                                // zustand state management
│   │   ├── setting.ts                       // system settings state management
│   │   └── user.ts                          // user state management
│   ├── styles                               // global styles
│   │   ├── index.less                       // global style entry
│   │   ├── theme.less                       // theme styles
│   │   ├── transition.less                  // animation styles
│   │   └── variables.less                   // global style variables
│   ├── types                                // type definitions
│   │   ├── global.d.ts                      // global type definitions
│   │   ├── shims.d.ts                       // module type definitions
│   │   └── vite-env.d.ts                    // vite environment variable type definitions
│   ├── utils                                // utility functions
│   │   ├── color.ts                         // color utility functions
│   │   ├── is.ts                            // judgment utility functions
│   │   ├── request                          // network request encapsulation
│   │   │   ├── AxiosCancel.ts               // cancel request
│   │   │   ├── CheckStatus.ts               // status code check
│   │   │   ├── index.ts                     // axios encapsulation
│   │   │   └── request.ts                   // axios configuration file
│   │   └── validate.ts                      // validation utility functions
│   └── views                                // pages
│       ├── ErrorPages                       // error pages
│       │   └── 404.tsx                      // 404 page
│       ├── Example                          // example pages
│       │   ├── echartsDemo.tsx              // ECharts example
│       │   ├── iconDemo.tsx                 // icon example
│       │   ├── index.tsx                    // example page entry
│       │   ├── keepAliveDemo.tsx            // KeepAlive example
│       │   └── mockDemo.tsx                 // Mock example
│       ├── Home                             // home page
│       │   ├── index.less                   // home page styles
│       │   └── index.tsx                    // home page
│       ├── Login                            // login
│       │   ├── components                   // login components
│       │   ├── forgotPassword.tsx           // forgot password
│       │   ├── index.tsx                    // login page
│       │   └── register.tsx                 // register
│       ├── Mine                             // my page
│       └── ThemeSetting                     // theme settings
│   ├── App.tsx                              // React file entry
│   ├── main.tsx                             // project entry TS file
├── .editorconfig                            // unified editor configuration
├── .env                                     // environment variable configuration
├── .env.development                         // development environment variable configuration
├── .env.production                          // production environment variable configuration
├── LICENSE                                  // open source license
├── README.md                                // project English documentation
├── README.zh-CN.md                          // project Chinese documentation
├── commitlint.config.ts                     // commitlint configuration
├── eslint.config.js                         // eslint configuration
├── index.html                               // html file
├── package.json                             // npm dependency description file
├── pnpm-lock.yaml                           // npm package manager pnpm dependency lock file
├── tsconfig.app.json                        // tsconfig configuration
├── tsconfig.json                            // tsconfig configuration
├── tsconfig.node.json                       // tsconfig configuration
├── uno.config.ts                            // UnoCss configuration
├── vercel.json                              // vercel configuration
└── vite.config.ts                           // vite configuration
```

## Commit Standards

The project uses `simple-git-hooks` and `commitlint` to standardize Git commit messages, following the mainstream [Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular) specification.

- `feat`: Add new features
- `fix`: Fix bugs
- `docs`: Documentation changes
- `style`: Code formatting (no functional impact, e.g., spaces, semicolons, etc.)
- `refactor`: Code refactoring (not including bug fixes or feature additions)
- `perf`: Performance optimization
- `test`: Add or modify test cases
- `build`: Build process, external dependency changes (e.g., upgrading npm packages, modifying webpack configuration)
- `ci`: Modify CI configuration, scripts
- `chore`: Changes to build process or auxiliary tools and libraries (no source file, test case impact)
- `revert`: Revert commit
