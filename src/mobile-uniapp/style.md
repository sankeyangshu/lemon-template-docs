# 样式

本项目采用 **Tailwind CSS v4** + **wot-design-uni** 的样式解决方案，提供了灵活、高效、现代化的样式开发体验。

## 技术方案

本项目采用以下技术实现样式功能：

- **Tailwind CSS v4** - 极致高效的原子化 CSS 引擎，提供按需加载和即时编译
- **weapp-tailwindcss** - Tailwind CSS 小程序适配方案，支持 rem 转 rpx
- **wot-design-uni** - 基于 Vue3 的 uni-app 组件库
- **PostCSS** - CSS 处理工具，支持嵌套、变量等高级特性
- **主题系统** - 支持明暗模式、系统主题跟随、自定义主题色

这种组合提供了：

- ⚡ **极致性能** - Tailwind v4 的即时编译引擎，极速构建
- 🎨 **灵活定制** - 完整的设计系统，支持深度定制
- 🌓 **主题切换** - 内置明暗模式，支持系统主题跟随
- 📦 **开箱即用** - wot-design-uni 提供丰富的组件样式
- 🔧 **类型安全** - 完整的 TypeScript 支持
- 📱 **多端适配** - 自动适配各端小程序和 H5

## Tailwind CSS

Tailwind CSS 是一个功能类优先的 CSS 框架，通过组合原子化的工具类来构建用户界面。

### 核心特性

- **原子化类名** - 每个类名只做一件事，高度可复用
- **即时编译** - v4 引擎提供极速的构建体验
- **响应式设计** - 移动端优先，支持所有断点
- **状态变体** - hover、focus、active 等状态轻松处理
- **暗黑模式** - 内置暗黑模式支持
- **自定义设计系统** - 完全可定制的设计令牌

### 安装配置

项目已完成 Tailwind CSS v4 的配置，主要配置文件：

**vite.config.ts**

```typescript
export default defineConfig((config: ConfigEnv): UserConfig => {
  return {
    // ...
    css: {
      postcss: {
        plugins: [
          tailwindcss(),
        ],
      },
    },
  };
});
```

**src/styles/global.css**

```css
@import 'tailwindcss';
@source not "dist";

@custom-variant dark (.dark &);

:root {
  --app-color-primary: #009688;
  --app-color-text: #323233;
  --app-color-background: #f1f2f5;
}

.dark {
  --app-color-primary: #009688;
  --app-color-text: #f5f5f5;
  --app-color-background: #181818;
}

@theme inline {
  --color-primary: var(--app-color-primary);
  --color-text: var(--app-color-text);
  --color-background: var(--app-color-background);
}

@utility pt-safe {
  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);
}

@utility pb-safe {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
```

::: tip
完整的 `global.css` 文件还包含图标插件配置，详见[图标](./icon.md)。
:::

### 基础用法

在 Vue 组件中直接使用 Tailwind CSS 类名：

```vue
<template>
  <view class="box-border w-full rounded-xl bg-background px-5 py-3 text-lg">
    <view class="flex items-center justify-center leading-8">
      Lemon-Mobile-UniApp
    </view>
    <view class="mt-3 mb-1.5 text-center text-sm leading-6 font-bold">
      欢迎使用模板！
    </view>
  </view>
</template>
```

在上面的代码中，使用了 Tailwind CSS 的原子化类名：

- **布局** - `flex`、`items-center`、`justify-center`
- **尺寸** - `w-full`、`px-5`、`py-3`
- **边距** - `mt-3`、`mb-1.5`
- **盒模型** - `box-border`
- **圆角** - `rounded-xl`
- **背景色** - `bg-background`
- **文字** - `text-lg`、`text-sm`、`font-bold`、`text-center`
- **行高** - `leading-8`、`leading-6`

### 响应式设计

Tailwind 采用移动端优先的响应式设计：

```vue
<template>
  <view
    class="
      w-full
      md:w-1/2
      lg:w-1/3
    "
  >
    <view
      class="
        text-sm
        md:text-base
        lg:text-lg
      "
    >
      响应式文本大小
    </view>
    <view
      class="
        grid grid-cols-1 gap-4
        md:grid-cols-2
        lg:grid-cols-3
      "
    >
      <!-- 网格布局 -->
    </view>
  </view>
</template>
```

**断点说明：**

- `sm` - 640px
- `md` - 768px
- `lg` - 1024px
- `xl` - 1280px
- `2xl` - 1536px

### 状态变体

```vue
<template>
  <button
    class="
      rounded bg-primary px-4 py-2 text-white
      active:opacity-80
    "
  >
    点击我
  </button>
</template>
```

**常用状态：**

- `hover:` - 鼠标悬停（H5 端有效）
- `active:` - 激活状态
- `focus:` - 获得焦点
- `disabled:` - 禁用状态

### 暗黑模式

Tailwind 内置暗黑模式支持，使用 `dark:` 前缀：

```vue
<template>
  <view
    class="
      bg-white text-black
      dark:bg-gray-800 dark:text-white
    "
  >
    <view class="text-xl font-bold">
      标题
    </view>
    <view
      class="
        text-gray-600
        dark:text-gray-300
      "
    >
      内容文本
    </view>
    <button
      class="
        bg-primary
        dark:bg-gray-700
      "
    >
      按钮
    </button>
  </view>
</template>
```

### 自定义样式

项目支持自定义 Tailwind 配置，可以在 CSS 文件中使用 `@theme` 指令：

```css
/* src/styles/global.css */
@import 'tailwindcss';

@theme inline {
  /* 自定义颜色 */
  --color-brand: #3b82f6;
  --color-accent: #8b5cf6;

  /* 自定义间距 */
  --spacing-page: 1rem;
}
```

## 主题系统

项目内置了完善的主题系统，支持明暗模式切换和系统主题跟随。

### 主题变量

项目使用 CSS 变量实现动态主题系统：

**定义主题变量**

在 `src/styles/global.css` 中定义：

```css
:root {
  --app-color-primary: #009688;
  --app-color-text: #323233;
  --app-color-background: #f1f2f5;
}

.dark {
  --app-color-primary: #009688;
  --app-color-text: #f5f5f5;
  --app-color-background: #181818;
}

@theme inline {
  --color-primary: var(--app-color-primary);
  --color-text: var(--app-color-text);
  --color-background: var(--app-color-background);
}
```

**使用主题变量**

在组件中使用主题色：

```vue
<template>
  <!-- 使用 Tailwind CSS 类名 -->
  <view class="bg-background text-primary">
    主题色文本和背景
  </view>

  <!-- 使用 CSS 变量 -->
  <view :style="{ color: 'var(--app-color-primary)' }">
    使用 CSS 变量
  </view>
</template>
```

### 配置

在应用根组件中使用 `wd-config-provider` 配置全局主题：

```vue
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useSettingStore } from '@/store/modules/setting';

const settingStore = useSettingStore();
const { theme, themeVars, themeColor } = storeToRefs(settingStore);

// 计算 CSS 变量
const cssVars = computed(() => ({
  '--app-color-primary': themeColor.value,
}));
</script>

<template>
  <wd-config-provider
    :theme="theme"
    :theme-vars="themeVars"
    :custom-class="theme"
    :style="cssVars"
    class="box-border min-h-[calc(100vh-var(--window-top))] bg-background"
  >
    <!-- 你的应用内容 -->
    <KuRootView />
  </wd-config-provider>
</template>
```

**属性说明：**

- `theme` - 主题模式（`light` | `dark`）
- `theme-vars` - wot-design-uni 的主题变量配置
- `custom-class` - 自定义类名，用于切换暗黑模式
- `style` - 动态 CSS 变量

### 主题切换组件

项目封装了 `switch-dark` 组件，提供一键切换明暗模式：

```vue
<template>
  <wd-cell :title="`🌓 ${$t('example.darkMode')}`">
    <switch-dark />
  </wd-cell>
</template>
```

### 系统主题跟随

项目支持跟随系统主题自动切换：

```vue
<script setup lang="ts">
import { onBeforeMount, onUnmounted } from 'vue';
import { useSettingStore } from '@/store/modules/setting';

const settingStore = useSettingStore();
let themeChangeHandler: UniApp.OnThemeChangeCallback | null = null;

onBeforeMount(() => {
  settingStore.initTheme();

  // 监听系统主题变化
  if (typeof uni !== 'undefined' && uni.onThemeChange) {
    themeChangeHandler = (res) => {
      if (followSystem.value) {
        settingStore.setThemeMode(res.theme as 'light' | 'dark', true);
      }
    };
    uni.onThemeChange(themeChangeHandler);
  }
});

onUnmounted(() => {
  if (typeof uni !== 'undefined' && uni.offThemeChange && themeChangeHandler) {
    uni.offThemeChange(themeChangeHandler);
  }
});
</script>
```

## 小程序适配

### weapp-tailwindcss

项目使用 `weapp-tailwindcss` 实现小程序的 Tailwind CSS 支持。

**主要功能**

- ✅ 自动转换 Tailwind CSS 类名为小程序兼容格式
- ✅ 支持任意值语法（如 `w-[200px]`）
- ✅ 支持响应式设计
- ✅ 自动合并类名，避免样式冲突
- ✅ 内置 rem 转 rpx 功能

**配置说明**

项目已完成配置，位于 `build/plugins/index.ts`：

```typescript
import { UnifiedViteWeappTailwindcssPlugin } from 'weapp-tailwindcss/vite';

UnifiedViteWeappTailwindcssPlugin({
  rem2rpx: true,
  cssEntries: [
    path.join(process.cwd(), 'src/styles/global.css'),
  ],
});
```

安装后会自动执行 patch：

```json
{
  "scripts": {
    "postinstall": "weapp-tw patch"
  }
}
```

### rem 转 rpx

#### 为什么需要 rem 转 rpx？

Tailwind CSS 默认使用 `rem` 作为长度单位，例如：

```css
.m-4 {
  margin: 1rem;
}
.h-4 {
  height: 1rem;
}
```

`rem` 在 H5 环境下自适应良好，但在小程序环境中，我们通常使用 `rpx` 这个单位来实现自适应布局，因此需要将 `rem` 转换为 `rpx`。

#### 转换配置

设置 `rem2rpx: true` 相当于传入以下配置：

配置对象说明：

- `rootValue: 32` - 32 意味着 1rem = 16px = 32rpx
- `propList: ['*']` - 默认所有属性都转化
- `transformUnit: 'rpx'` - 转化的单位

::: tip 为什么 rootValue 默认值是 32？

这是因为开发微信小程序时，设计师通常使用 iPhone 6 作为视觉稿标准，此时 `1px = 2rpx`。

而默认情况下 `1rem = 16px`，所以 `1rem = 16px = 32rpx`。

详见 [WXSS 尺寸单位](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxss.html) 文档。
:::

#### 转换效果

启用 rem2rpx 后，Tailwind CSS 类名会自动转换：

```vue
<template>
  <!-- 源代码 -->
  <view class="m-4 p-4 text-base">
    内容
  </view>

  <!-- 编译后的样式 -->
  <!-- .m-4 { margin: 32rpx; } -->
  <!-- .p-4 { padding: 32rpx; } -->
  <!-- .text-base { font-size: 32rpx; } -->
</template>
```

#### 自定义配置

如果需要自定义转换规则，可以传入配置对象：

```typescript
UnifiedViteWeappTailwindcssPlugin({
  rem2rpx: {
    rootValue: 32, // 根据设计稿调整
    propList: ['*'], // 指定要转换的 CSS 属性
    transformUnit: 'rpx', // 转换目标单位：rpx 或 px
  },
  cssEntries: [
    path.join(process.cwd(), 'src/styles/global.css'),
  ],
});
```

更多配置选项请参考 [postcss-rem-to-responsive-pixel](https://github.com/hemengke1997/postcss-rem-to-responsive-pixel) 文档。

### 兼容性处理

**禁止编译 dist 目录**

在 `global.css` 中排除产物目录：

```css
@source not "dist";
```

这确保只处理源代码，不处理编译产物，避免重复编译。

## 安全区域适配

### 自定义实用类

项目提供了安全区域适配的实用类：

```css
@utility pt-safe {
  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);
}

@utility pb-safe {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
```

### 使用方法

在需要适配安全区域的地方使用：

```vue
<template>
  <!-- 顶部安全区域 -->
  <view class="pt-safe">
    <view class="p-4">
      顶部内容
    </view>
  </view>

  <!-- 底部安全区域 -->
  <view class="pb-safe">
    <view class="p-4">
      底部内容
    </view>
  </view>
</template>
```

## wot-design-uni 组件库

项目使用 `wot-design-uni` 作为 UI 组件库，提供丰富的移动端组件。

### 核心特性

- **纯 Vue3** - 基于 Vue3 + TypeScript 开发
- **多端支持** - 支持 H5、小程序、App 等多端
- **主题定制** - 支持深色模式和主题变量定制
- **按需引入** - 自动按需引入，减小包体积
- **TypeScript** - 完整的类型定义

### 常用组件

**按钮组件**

```vue
<template>
  <view class="flex gap-2">
    <!-- 基础按钮 -->
    <wd-button>默认</wd-button>

    <!-- 带类型的按钮 -->
    <wd-button type="primary">
      主要
    </wd-button>
    <wd-button type="success">
      成功
    </wd-button>
    <wd-button type="warning">
      警告
    </wd-button>
    <wd-button type="error">
      危险
    </wd-button>

    <!-- 不同大小 -->
    <wd-button size="large">
      大按钮
    </wd-button>
    <wd-button size="small">
      小按钮
    </wd-button>

    <!-- 按钮状态 -->
    <wd-button plain>
      朴素按钮
    </wd-button>
    <wd-button disabled>
      禁用按钮
    </wd-button>
  </view>
</template>
```

**单元格组件**

```vue
<template>
  <wd-cell-group border>
    <wd-cell title="单元格" value="内容" />
    <wd-cell title="带图标" is-link @click="handleClick" />
    <wd-cell title="禁用状态" value="禁用" disabled />
  </wd-cell-group>
</template>
```

**表单组件**

```vue
<template>
  <wd-form>
    <!-- 输入框 -->
    <wd-input
      v-model="username"
      label="用户名"
      placeholder="请输入用户名"
    />

    <!-- 选择器 -->
    <wd-picker
      v-model="value"
      label="选择"
      :columns="columns"
    />

    <!-- 开关 -->
    <wd-cell title="开关">
      <wd-switch v-model="checked" />
    </wd-cell>
  </wd-form>
</template>
```

**加载状态**

```vue
<template>
  <view class="flex gap-4">
    <!-- 加载动画 -->
    <wd-loading />
    <wd-loading type="circular" />

    <!-- 自定义大小 -->
    <wd-loading :size="30" />

    <!-- 自定义颜色 -->
    <wd-loading color="#00C853" />
  </view>
</template>
```

### 自定义样式

可以通过 `class` 和 `custom-class` 属性自定义组件样式：

```vue
<template>
  <!-- 使用 Tailwind CSS 类名 -->
  <wd-button class="w-full rounded-lg">
    全宽按钮
  </wd-button>

  <!-- 使用 custom-class -->
  <wd-cell
    title="标题"
    custom-class="text-primary"
  />
</template>
```

## 最佳实践

### 1. 使用语义化类名

优先使用项目定义的主题变量：

```vue
<template>
  <!-- ✅ 推荐：使用主题变量 -->
  <view class="bg-background text-primary">
    内容
  </view>

  <!-- ❌ 不推荐：硬编码颜色 -->
  <view class="bg-[#f1f2f5] text-[#009688]">
    内容
  </view>
</template>
```

### 2. 提取通用样式

```vue
<script setup lang="ts">
import { computed } from 'vue';

const cardClass = computed(() => [
  'rounded-xl',
  'border border-solid',
  'p-4',
  'bg-white dark:bg-gray-800',
  'shadow-sm',
]);
</script>

<template>
  <!-- ✅ 推荐：提取为组件 -->
  <PrimaryButton @click="handleClick">
    提交
  </PrimaryButton>

  <!-- 或使用组合类名 -->
  <view :class="cardClass">
    卡片内容
  </view>
</template>
```

### 3. 响应式设计优先

```vue
<template>
  <!-- ✅ 移动端优先，逐步增强 -->
  <view
    class="
      text-sm
      md:text-base
      lg:text-lg
    "
  >
    响应式文本
  </view>

  <!-- ❌ 避免桌面端优先 -->
  <view
    class="
      text-lg
      sm:text-sm
      md:text-base
    "
  >
    错误的响应式
  </view>
</template>
```

### 4. 使用 Tailwind 的设计令牌

```vue
<template>
  <!-- ✅ 使用 Tailwind 的间距系统 -->
  <view
    class="
      p-4
      md:p-6
      lg:p-8
    "
  >
    内容
  </view>

  <!-- ❌ 避免自定义数值 -->
  <view :style="{ padding: '17px' }">
    内容
  </view>
</template>
```

### 5. 暗黑模式适配

```vue
<template>
  <!-- ✅ 为暗黑模式提供适配 -->
  <view
    class="
      bg-white text-black
      dark:bg-gray-800 dark:text-white
    "
  >
    内容
  </view>

  <!-- ❌ 忘记暗黑模式 -->
  <view class="bg-white text-black">
    内容
  </view>
</template>
```

### 6. 组合而非重复

```vue
<template>
  <!-- ✅ 使用组件库的组件 -->
  <wd-button type="primary" size="small">
    小按钮
  </wd-button>

  <!-- ❌ 重复定义样式 -->
  <button class="rounded bg-blue-500 px-3 py-1.5 text-sm text-white">
    小按钮
  </button>
</template>
```

### 7. 安全区域适配

```vue
<template>
  <!-- ✅ 使用安全区域类名 -->
  <view class="pt-safe">
    <view class="p-4">
      顶部内容
    </view>
  </view>

  <!-- ❌ 固定间距 -->
  <view class="pt-10">
    <view class="p-4">
      顶部内容
    </view>
  </view>
</template>
```

## 常见问题

### 1. 如何自定义 Tailwind 配置？

在 `tailwind.config.ts` 中可以扩展配置，但 Tailwind v4 推荐使用 CSS 变量：

```css
/* src/styles/global.css */
@theme inline {
  --color-brand: #ff6b6b;
  --font-heading: 'Poppins', sans-serif;
}
```

### 2. Tailwind CSS 类名不生效？

**原因**：类名可能没有被正确扫描或存在语法错误。

**解决方案**：

- 确保类名是完整的字符串，不要使用动态拼接
- 检查类名拼写是否正确
- 确保开发服务器正常运行

```vue
<template>
  <!-- ✅ 正确：完整的类名 -->
  <view class="text-primary">
    内容
  </view>

  <!-- ❌ 错误：动态拼接（可能不生效） -->
  <view :class="dynamicClass">
    内容
  </view>
  <!-- dynamicClass = 'text-' + color -->
</template>
```

### 3. 暗黑模式不生效？

确保在根元素上正确切换 `dark` 类，并且使用了 `dark:` 前缀：

```vue
<template>
  <!-- 确保使用 dark: 前缀 -->
  <view
    class="
      bg-white
      dark:bg-gray-800
    "
  >
    内容
  </view>
</template>
```

### 4. 小程序中样式异常？

**解决方案**：

- 运行 `pnpm postinstall` 确保 patch 生效
- 避免使用小程序不支持的 CSS 特性
- 检查 `weapp-tailwindcss` 配置

### 5. 如何覆盖组件库样式？

wot-design-uni 组件可以通过 Tailwind 类名覆盖：

```vue
<template>
  <!-- 使用 class 属性 -->
  <wd-button class="w-full">
    全宽按钮
  </wd-button>

  <!-- 使用 custom-class 属性 -->
  <wd-cell
    title="标题"
    custom-class="text-primary"
  />
</template>
```

### 6. 移动端适配注意事项？

- 使用 `rpx` 单位（rem 会自动转换）
- 注意安全区域：`pt-safe`、`pb-safe`
- 触摸优化：确保点击区域足够大
- 性能优化：避免过度嵌套

```vue
<template>
  <!-- 移动端全屏页面 -->
  <view class="min-h-screen pb-safe">
    <view class="h-[calc(100vh-4rem)]">
      <!-- 内容 -->
    </view>
  </view>
</template>
```

### 7. 如何添加自定义实用类？

使用 `@utility` 指令：

```css
@utility custom-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
```

然后在组件中使用：

```vue
<template>
  <view class="custom-flex">
    内容
  </view>
</template>
```

## 相关链接

- [Tailwind CSS 官方文档](https://tailwindcss.com/)
- [wot-design-uni 文档](https://wot-ui.cn/)
- [weapp-tailwindcss 文档](https://weapp-tw.icebreaker.top/)
