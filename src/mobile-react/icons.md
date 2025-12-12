# 图标

本项目内置了灵活强大的图标解决方案，支持 **Iconify 图标集**和**本地 SVG 图标**两种方式。

## 技术方案

本项目采用以下技术实现图标功能：

- **@iconify/react** - 统一的图标框架，支持超过 150 个图标集和 200,000+ 开源矢量图标
- **unplugin-svg-component** - 本地 SVG 图标处理插件，支持类型安全和按需加载
- **SvgIcon 组件** - 统一的图标组件封装，同时支持在线和本地图标

这种组合提供了：

- 🎨 **海量图标** - 访问 200,000+ 在线图标，无需手动下载
- 📦 **按需加载** - 只加载使用的图标，优化包体积
- 🎯 **类型安全** - 完整的 TypeScript 类型支持
- 🔧 **灵活定制** - 支持自定义本地 SVG 图标
- 🌈 **多色支持** - 保留本地 SVG 图标的原始颜色

## SvgIcon 组件

项目封装了统一的 `SvgIcon` 组件，位于 `src/components/custom/svg-icon.tsx`，可以同时处理 Iconify 图标和本地 SVG 图标。

### 组件属性

```typescript
interface SvgIconProps {
  /**
   * 自定义类名
   */
  className?: string;
  /**
   * Iconify 图标名称
   */
  icon?: string | IconifyIcon;
  /**
   * 本地 SVG 图标名称
   */
  localIcon?: SvgName;
  /**
   * 样式
   */
  style?: CSSProperties;
}
```

### 基础用法

```tsx
import SvgIcon from '@/components/custom/svg-icon';

function IconDemo() {
  return (
    <div>
      {/* 使用 Iconify 图标 */}
      <SvgIcon icon="mdi:github" className="text-2xl" />

      {/* 使用本地 SVG 图标 */}
      <SvgIcon localIcon="icon-logo" className="text-2xl" />
    </div>
  );
}
```

## Iconify 图标

Iconify 是一个统一的图标框架，提供了海量的开源图标资源。您可以在 [Iconify](https://iconify.design/) 或 [Icones](https://icones.js.org/) 中浏览和搜索所有图标。

### 核心优势

- **海量图标** - 超过 150 个图标集，200,000+ 图标可选
- **统一语法** - 一种使用方式适用于所有图标集
- **像素完美** - 渲染高质量的 SVG 图标，非图标字体
- **按需加载** - 自动加载使用的图标数据，无需手动打包
- **定期更新** - 图标集持续更新维护

### 使用步骤

**1. 搜索图标**

在 [Icones](https://icones.js.org/) 搜索你需要的图标，例如搜索 "github"：

- 点击图标查看详情
- 复制图标名称，格式为 `集合名:图标名`，如 `mdi:github`

**2. 在组件中使用**

```tsx
import SvgIcon from '@/components/custom/svg-icon';

function MyComponent() {
  return (
    <div>
      {/* 基础用法 */}
      <SvgIcon icon="mdi:github" />

      {/* 设置大小和颜色 */}
      <SvgIcon
        icon="mdi:palette"
        className="text-2xl text-primary"
      />

      {/* 使用自定义样式 */}
      <SvgIcon
        icon="mdi:heart"
        style={{ fontSize: '24px', color: '#f44336' }}
      />
    </div>
  );
}
```

### 样式控制

```tsx
function StyleExamples() {
  return (
    <>
      {/* Tailwind CSS 类名 */}
      <SvgIcon
        icon="mdi:github"
        className="text-2xl text-gray-600 dark:text-white"
      />

      {/* 响应式大小 */}
      <SvgIcon
        icon="mdi:home"
        className="text-sm md:text-lg lg:text-2xl"
      />

      {/* 主题色适配 */}
      <SvgIcon
        icon="mdi:heart"
        className="text-primary hover:text-primary-focus"
      />

      {/* 动画效果 */}
      <SvgIcon
        icon="mdi:loading"
        className="text-2xl animate-spin"
      />

      {/* 内联样式 */}
      <SvgIcon
        icon="mdi:star"
        style={{
          fontSize: '32px',
          color: 'var(--fallback-p,oklch(var(--p)/1))'
        }}
      />
    </>
  );
}
```

## 本地 SVG 图标

对于项目特定的图标或需要精细控制的图标，可以使用本地 SVG 文件。项目使用 `unplugin-svg-component` 插件自动处理 SVG 图标。

### 目录结构

本地 SVG 图标存放在 `src/assets/svg-icon` 目录：

```
src/assets/svg-icon/
├── logo.svg      # Logo 图标
├── moon.svg      # 月亮图标
├── sunny.svg     # 太阳图标
└── ...
```

### 配置说明

项目已完成插件配置，位于 `build/plugins/unplugin.ts`：

```typescript
import createSvgIconsPlugin from 'unplugin-svg-component/vite';

export function setupUnPluginSvgIconConfig(viteEnv: Env.ImportMeta) {
  const { VITE_ICON_PREFIX } = viteEnv;

  const plugins: PluginOption = createSvgIconsPlugin({
    projectType: 'react',
    iconDir: path.join(process.cwd(), 'src/assets/svg-icon'),
    dts: true,
    dtsDir: path.join(process.cwd(), 'src/types'),
    prefix: VITE_ICON_PREFIX, // 使用图标时的前缀，例如 'icon-'
    componentName: 'LocalSvgIcon',
    treeShaking: false,
    preserveColor: /.*\.svg$/, // 保留多色图标的原始颜色
    symbolIdFormatter: (svgName: string, prefix: string): string => {
      const nameArr = svgName.split('/');
      if (prefix)
        nameArr.unshift(prefix);
      return nameArr.join('-').replace(/\.svg$/, '');
    },
  });

  return plugins;
}
```

**配置说明：**

- `prefix: VITE_ICON_PREFIX` - 定义使用图标时的前缀（默认为 `icon-`）
- 该前缀会在使用图标时自动添加，而不是文件名的前缀
- 例如：文件名为 `logo.svg`，使用时需要写 `icon-logo`（前缀由环境变量配置）

### 添加本地图标

**1. 准备 SVG 文件**

将 SVG 文件放入 `src/assets/svg-icon` 目录。文件名直接命名即可，无需添加前缀。

例如：

- `logo.svg` - Logo 图标
- `custom.svg` - 自定义图标
- `brand.svg` - 品牌图标

**2. 类型自动生成**

插件会自动生成类型定义文件 `src/types/svg-component.d.ts`，提供完整的类型提示。

**3. 在组件中使用**

使用图标时，需要添加配置的前缀（默认为 `icon-`）：

```tsx
import type { SvgName } from '~virtual/svg-component';
import SvgIcon from '@/components/custom/svg-icon';

function MyComponent() {
  return (
    <div>
      {/* 文件名: logo.svg，使用时: icon-logo */}
      <SvgIcon localIcon="icon-logo" className="text-2xl" />

      {/* 文件名: custom.svg，使用时: icon-custom */}
      <SvgIcon localIcon="icon-custom" className="text-2xl" />

      {/* 类型安全的用法 */}
      const iconName: SvgName = 'icon-logo';
      <SvgIcon localIcon={iconName} className="text-2xl" />
    </div>
  );
}
```

::: tip 前缀说明

- **文件名**：直接命名，如 `logo.svg`、`custom.svg`
- **使用时**：需添加前缀，如 `icon-logo`、`icon-custom`
- **前缀配置**：在环境变量 `VITE_ICON_PREFIX` 中配置（默认为 `icon-`）
  :::

### 本地图标特性

**保留多色**

本地 SVG 图标默认保留原始颜色，适合品牌 Logo 等多色图标：

```tsx
{ /* 保持 SVG 原始颜色 */ }
<SvgIcon localIcon="icon-logo" className="text-2xl" />;
```

**支持样式覆盖**

对于单色 SVG，可以通过 CSS 覆盖颜色：

```tsx
{ /* 通过类名设置颜色 */ }
<SvgIcon
  localIcon="icon-custom"
  className="text-2xl text-primary"
/>;

{ /* 通过内联样式设置 */ }
<SvgIcon
  localIcon="icon-custom"
  style={{ fontSize: '24px', color: '#3b82f6' }}
/>;
```

**类型提示**

TypeScript 会自动提示可用的图标名称：

```tsx
// 输入 localIcon=" 后会自动提示所有可用图标
<SvgIcon localIcon="icon-" />; // 自动补全
```

## VSCode 插件推荐

为了更好的开发体验，推荐安装以下 VSCode 插件：

### Iconify IntelliSense

- **插件 ID**: `antfu.iconify`
- **功能**:
  - 在编辑器中预览 Iconify 图标
  - 自动补全图标名称
  - 实时显示图标预览

安装后，在代码中输入图标名称时会自动显示图标预览。

## 常见问题

### 1. Iconify 图标不显示？

确保网络连接正常，Iconify 需要从 CDN 加载图标数据。如果需要离线使用，可以安装图标集到本地：

```bash
pnpm add @iconify-json/mdi
```

### 2. 如何批量导入本地 SVG 图标？

直接将 SVG 文件放入 `src/assets/svg-icon` 目录即可，插件会自动处理和生成类型。

### 3. 本地图标颜色无法修改？

检查 SVG 文件中是否硬编码了 `fill` 或 `stroke` 属性。如需通过 CSS 控制颜色，需要移除这些属性或设置为 `currentColor`。

### 4. 如何组织大量本地图标？

可以在 `src/assets/svg-icon` 下创建子目录分类管理：

```
src/assets/svg-icon/
├── brand/
│   ├── logo.svg
│   └── company.svg
├── ui/
│   ├── menu.svg
│   └── close.svg
└── theme/
    ├── moon.svg
    └── sunny.svg
```

使用时会自动处理路径（根据 `symbolIdFormatter` 配置）：

- 文件 `brand/logo.svg` → 使用 `icon-brand-logo`
- 文件 `ui/menu.svg` → 使用 `icon-ui-menu`
- 文件 `theme/moon.svg` → 使用 `icon-theme-moon`

### 5. 为什么使用图标时要加前缀？

前缀 `VITE_ICON_PREFIX`（默认为 `icon-`）用于：

- **命名空间隔离**：避免与 Iconify 图标名称冲突
- **统一管理**：方便区分本地图标和在线图标
- **类型安全**：提供更好的 TypeScript 类型提示

示例：

```tsx
// 文件名：logo.svg
// 使用时：icon-logo (自动添加前缀)
<SvgIcon localIcon="icon-logo" />;
```

## 相关链接

- [Iconify 官方文档](https://iconify.design/)
- [Icones 图标搜索](https://icones.js.org/)
- [unplugin-svg-component](https://github.com/Jevon617/unplugin-svg-component)
- [@iconify/react 文档](https://iconify.design/docs/icon-components/react/)
