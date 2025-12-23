# 图标

本项目内置了灵活强大的图标解决方案，同时支持 **Tailwind CSS Icons** 和 **wot-design-uni 图标组件**两种方式。

## 技术方案

本项目采用以下技术实现图标功能：

- **@egoist/tailwindcss-icons** - Tailwind CSS 图标插件，支持 200,000+ 图标（H5 和小程序）
- **wot-design-uni 图标组件** - 组件库内置图标，支持多端
- **本地图标** - 自定义 SVG/图片图标，支持多端

这种组合提供了：

- 🎨 **海量图标** - 访问 200,000+ 在线图标，无需手动下载
- 📱 **多端支持** - H5 和小程序都支持
- 🎯 **类型安全** - 完整的 TypeScript 类型支持
- 🔧 **灵活定制** - 支持自定义本地图标
- ⚡ **按需加载** - 只加载使用的图标，优化包体积

## Tailwind CSS Icons（推荐）

Tailwind CSS Icons 是一个基于 Iconify 的图标解决方案，支持 H5 和小程序。

### 核心特性

- **海量图标** - 超过 150 个图标集，200,000+ 图标可选
- **跨端支持** - H5 和小程序全平台支持
- **统一语法** - 一种使用方式适用于所有图标集
- **按需加载** - 自动加载使用的图标数据
- **像素完美** - 渲染高质量的 SVG 图标

### 配置

项目已完成 Tailwind CSS Icons 的配置：

**src/styles/global.css**

```css
@plugin '@egoist/tailwindcss-icons' {
  scale: 1.2;
}
```

**package.json**

```json
{
  "devDependencies": {
    "@egoist/tailwindcss-icons": "^1.9.0",
    "@iconify-json/mdi": "^1.2.3"
  }
}
```

::: tip 图标集安装
项目默认安装了 Material Design Icons (mdi) 图标集。如需使用其他图标集，可以安装对应的包：

```bash
# Carbon Icons
pnpm add @iconify-json/carbon -D

# Heroicons
pnpm add @iconify-json/heroicons -D

# Font Awesome
pnpm add @iconify-json/fa6-solid -D

# 或安装完整图标集（50MB+）
pnpm add @iconify/json -D
```

:::

### 使用步骤

**1. 搜索图标**

在 [Icônes](https://icones.js.org/) 或 [Iconify](https://icon-sets.iconify.design/) 搜索你需要的图标。

例如搜索 "github"，复制图标名称：`mdi:github`

**2. 转换为类名**

将图标名称转换为 Tailwind CSS 类名格式：

- `mdi:github` → `i-mdi-github`
- `carbon:home` → `i-carbon-home`
- 规则：`i-{collection}-{icon}`

**3. 在组件中使用**

```vue
<template>
  <view>
    <!-- 基础用法 -->
    <view class="i-mdi-github" />

    <!-- 自定义大小 -->
    <view class="i-mdi-github text-2xl" />

    <!-- 自定义颜色 -->
    <view class="i-mdi-github text-3xl text-primary" />

    <!-- 响应暗黑模式 -->
    <view
      class="
        i-mdi-heart text-2xl text-red-500
        dark:text-red-400
      "
    />
  </view>
</template>
```

::: tip 智能提示
输入 `i-` 后会自动显示智能提示，列出所有可用的图标。
:::

### 基础用法

```vue
<template>
  <view class="flex flex-wrap gap-4">
    <!-- 基础图标 -->
    <view class="i-mdi-github text-2xl" />
    <view class="i-mdi-home text-2xl" />
    <view class="i-mdi-settings text-2xl" />

    <!-- 自定义大小 -->
    <view class="i-mdi-heart text-xl" />
    <view class="i-mdi-heart text-2xl" />
    <view class="i-mdi-heart text-3xl" />

    <!-- 自定义颜色 -->
    <view class="i-mdi-wechat text-3xl text-[#83DC42]" />
    <view class="i-mdi-sina-weibo text-3xl text-[#F9221D]" />
    <view
      class="
        i-mdi-github text-3xl text-black
        dark:text-white
      "
    />
  </view>
</template>
```

### 常用图标示例

**社交图标**

```vue
<template>
  <view class="flex items-center justify-center gap-4">
    <view class="i-mdi-wechat text-3xl text-[#83DC42]" />
    <view class="i-mdi-sina-weibo text-3xl text-[#F9221D]" />
    <view class="i-mdi-github text-3xl" />
  </view>
</template>
```

**功能图标**

```vue
<template>
  <view class="flex flex-wrap gap-4">
    <!-- 基础图标 -->
    <view class="i-mdi-home text-xl" />
    <view class="i-mdi-search text-xl" />
    <view class="i-mdi-settings text-xl" />
    <view class="i-mdi-account text-xl" />

    <!-- 操作图标 -->
    <view class="i-mdi-plus text-xl" />
    <view class="i-mdi-delete text-xl" />
    <view class="i-mdi-edit text-xl" />
    <view class="i-mdi-check text-xl" />
    <view class="i-mdi-close text-xl" />

    <!-- 箭头图标 -->
    <view class="i-mdi-chevron-left text-xl" />
    <view class="i-mdi-chevron-right text-xl" />
    <view class="i-mdi-chevron-up text-xl" />
    <view class="i-mdi-chevron-down text-xl" />
  </view>
</template>
```

### 兼容性说明

- ✅ **H5**: 完美支持
- ✅ **微信小程序**: 完美支持
- ✅ **支付宝小程序**: 完美支持
- ✅ **其他小程序**: 支持（需测试）

::: tip
`mask-image` 和 CSS 变量在现代浏览器和小程序中都有很好的支持。如遇到兼容性问题，可以考虑使用 wot-design-uni 图标或本地图标替代。
:::

## wot-design-uni 图标组件

wot-design-uni 提供了内置的图标组件，支持跨端使用。

### 基础用法

```vue
<template>
  <view>
    <!-- 基础用法 -->
    <wd-icon name="check" />

    <!-- 设置大小和颜色 -->
    <wd-icon name="github-filled" size="22px" color="#333" />

    <!-- 在列表项中使用 -->
    <wd-cell title="设置" is-link>
      <wd-icon name="setting" />
    </wd-cell>
  </view>
</template>
```

更多图标请参考 [wot-design-uni 图标文档](https://wot-ui.cn/component/icon.html)。

## 本地图标

对于项目特定的图标，可以使用本地图标文件。

### SVG 图标

**目录结构**

```
src/static/svg-icon/
├── logo.svg
└── ...
```

**使用方法**

```vue
<template>
  <image
    class="size-12"
    src="/static/svg-icon/logo.svg"
    mode="aspectFit"
  />
</template>
```

### 图片图标

**Tabbar 图标**

```
src/static/tabbar/
├── home.png
├── home-active.png
├── example.png
├── example-active.png
├── mine.png
└── mine-active.png
```

**使用方法**

```vue
<template>
  <wd-tabbar v-model="activeTab">
    <wd-tabbar-item
      name="home"
      title="首页"
      icon="/static/tabbar/home.png"
      active-icon="/static/tabbar/home-active.png"
    />
  </wd-tabbar>
</template>
```

## 方案对比

| 特性     | Tailwind CSS Icons | wot-design-uni  | 本地图标       |
| -------- | ------------------ | --------------- | -------------- |
| 图标数量 | 200,000+           | 数百个          | 自定义         |
| 跨端支持 | ✅ H5 + 小程序     | ✅ H5 + 小程序  | ✅ H5 + 小程序 |
| 安装大小 | 按需安装图标集     | 内置于组件库    | 需手动添加     |
| 使用难度 | ⭐⭐               | ⭐              | ⭐⭐⭐         |
| 智能提示 | ✅ 完整提示        | ✅ 组件提示     | ❌ 无提示      |
| 样式控制 | ✅ Tailwind 类名   | ✅ Props + 类名 | ✅ 类名 + 样式 |
| 推荐场景 | 需要大量图标       | 常用图标        | 品牌图标       |

## 最佳实践

### 1. 优先使用 Tailwind CSS Icons

```vue
<template>
  <!-- ✅ 推荐：图标丰富，用法统一 -->
  <view class="i-mdi-github text-2xl text-primary" />

  <!-- ✅ 也可以：组件库图标 -->
  <wd-icon name="github-filled" size="24" />
</template>
```

### 2. 保持图标大小一致

```vue
<template>
  <!-- ✅ 推荐：统一使用 text-xl 或 text-2xl -->
  <view class="i-mdi-home text-xl" />
  <view class="i-mdi-settings text-xl" />
  <view class="i-mdi-user text-xl" />
</template>
```

### 3. 响应暗黑模式

```vue
<template>
  <!-- Tailwind CSS Icons -->
  <view
    class="
      i-mdi-heart text-2xl text-gray-900
      dark:text-white
    "
  />

  <!-- wot-design-uni -->
  <wd-icon
    name="heart"
    size="24"
    class="
      text-black
      dark:text-white
    "
  />
</template>
```

### 4. 图标命名使用语义化

```vue
<template>
  <view>
    <!-- ✅ 推荐：语义清晰 -->
    <view class="i-mdi-account-circle text-2xl" />
    <view class="i-mdi-cog text-2xl" />
    <view class="i-mdi-book-open-variant text-2xl" />
  </view>
</template>
```

### 5. Tabbar 使用图片图标

```vue
<template>
  <!-- ✅ 推荐：使用图片，各端表现一致 -->
  <wd-tabbar-item
    name="home"
    title="首页"
    icon="/static/tabbar/home.png"
    active-icon="/static/tabbar/home-active.png"
  />
</template>
```

## 常见问题

### 1. 图标不显示？

**可能原因**：

- 图标集未安装
- 类名拼写错误
- CSS 未正确引入

**解决方案**：

```bash
# 1. 确认图标集已安装
pnpm add @iconify-json/mdi -D

# 2. 检查 global.css 是否引入
# 确保 @import 'tailwindcss'; 存在

# 3. 重启开发服务器
pnpm dev
```

### 2. 智能提示不显示？

**解决方案**：

```css
/* 确保 @tailwind components; 或 @import 'tailwindcss'; 已引入 */
@import 'tailwindcss';
```

重启编辑器或开发服务器。

### 3. 如何添加更多图标集？

**解决方案**：

```bash
# 安装你需要的图标集
pnpm add @iconify-json/carbon -D
pnpm add @iconify-json/heroicons -D

# 或安装所有图标集（50MB+）
pnpm add @iconify/json -D
```

### 4. 图标颜色无法修改？

**解决方案**：

```vue
<template>
  <!-- ✅ 正确：使用 text-* 类名 -->
  <view class="i-mdi-heart text-2xl text-red-500" />

  <!-- ✅ 或使用内联样式 -->
  <view
    class="i-mdi-heart text-2xl"
    :style="{ color: '#ff0000' }"
  />
</template>
```

### 5. 图标大小如何设置？

**解决方案**：

图标大小继承 `font-size`，使用 Tailwind 的文本大小类：

```vue
<template>
  <view class="i-mdi-home text-sm" />   <!-- 14px -->
  <view class="i-mdi-home text-base" />  <!-- 16px -->
  <view class="i-mdi-home text-lg" />    <!-- 18px -->
  <view class="i-mdi-home text-xl" />    <!-- 20px -->
  <view class="i-mdi-home text-2xl" />   <!-- 24px -->
  <view class="i-mdi-home text-3xl" />   <!-- 30px -->
  <view class="i-mdi-home text-4xl" />   <!-- 36px -->
</template>
```

### 6. 小程序中图标显示异常？

**可能原因**：

- `mask-image` 兼容性问题（极少数情况）
- CSS 未正确编译

**解决方案**：

```bash
# 1. 确保安装了 weapp-tailwindcss
pnpm list weapp-tailwindcss

# 2. 检查 build/plugins/index.ts 配置
# 确保 UnifiedViteWeappTailwindcssPlugin 已注册

# 3. 清理缓存重新构建
rm -rf dist
pnpm dev
```

如果仍有问题，可以降级使用 wot-design-uni 图标或本地图标。

### 7. 如何在 Tailwind v4 中使用？

**解决方案**：

在 CSS 文件中添加 `@config` 指令：

```css
@import 'tailwindcss';
/* 如果你有 tailwind.config.js，需要手动引入 */
@config '../tailwind.config.js';
```

::: tip
本项目使用 Tailwind CSS v4，已在 `global.css` 中正确配置，无需额外设置。
:::

## 相关链接

- [Icônes 图标搜索](https://icones.js.org/)
- [Iconify 图标集](https://icon-sets.iconify.design/)
- [@egoist/tailwindcss-icons 文档](https://github.com/egoist/tailwindcss-icons)
- [wot-design-uni 图标文档](https://wot-ui.cn/component/icon.html)
- [weapp-tailwindcss 图标方案](https://weapp-tw.icebreaker.top/docs/icons)
