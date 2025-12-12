# 样式

本项目采用 **Tailwind CSS v4** + **DaisyUI** 的样式解决方案，提供了灵活、高效、现代化的样式开发体验。

## 技术方案

本项目采用以下技术实现样式功能：

- **Tailwind CSS v4** - 极致高效的原子化 CSS 引擎，提供按需加载和即时编译
- **DaisyUI** - 基于 Tailwind CSS 的组件类库，提供语义化的组件样式
- **PostCSS** - CSS 处理工具，支持嵌套、变量等高级特性
- **主题系统** - 支持明暗模式、系统主题跟随、自定义主题色

这种组合提供了：

- ⚡ **极致性能** - Tailwind v4 的即时编译引擎，极速构建
- 🎨 **灵活定制** - 完整的设计系统，支持深度定制
- 🌓 **主题切换** - 内置明暗模式，支持系统主题跟随
- 📦 **开箱即用** - DaisyUI 提供丰富的组件样式
- 🔧 **类型安全** - 完整的 TypeScript 支持
- 📱 **响应式** - 移动端优先的响应式设计

## Tailwind CSS

Tailwind CSS 是一个功能类优先的 CSS 框架，通过组合原子化的工具类来构建用户界面。

### 核心特性

- **原子化类名** - 每个类名只做一件事，高度可复用
- **即时编译** - v4 引擎提供极速的构建体验
- **响应式设计** - 移动端优先，支持所有断点
- **状态变体** - hover、focus、active 等状态轻松处理
- **暗黑模式** - 内置暗黑模式支持
- **自定义设计系统** - 完全可定制的设计令牌

### 基础用法

```tsx
function Card() {
  return (
    <div className="box-border w-full rounded-xl bg-white px-5 py-3 text-lg shadow-md">
      <div className="flex items-center justify-center leading-9">
        Lemon-Mobile-React
      </div>
      <div className="mb-1.5 mt-3 text-center text-sm font-bold leading-6">
        欢迎使用模板！
      </div>
    </div>
  );
}
```

在上面的代码中，使用了 Tailwind CSS 的原子化类名：

- **布局** - `flex`、`items-center`、`justify-center`
- **尺寸** - `w-full`、`px-5`、`py-3`
- **边距** - `mt-3`、`mb-1.5`
- **盒模型** - `box-border`
- **圆角** - `rounded-xl`
- **背景色** - `bg-white`
- **文字** - `text-lg`、`text-sm`、`font-bold`、`text-center`
- **行高** - `leading-9`、`leading-6`
- **阴影** - `shadow-md`

### 响应式设计

Tailwind 采用移动端优先的响应式设计：

```tsx
function ResponsiveCard() {
  return (
    <div className="w-full md:w-1/2 lg:w-1/3">
      <div className="text-sm md:text-base lg:text-lg">
        响应式文本大小
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* 网格布局 */}
      </div>
    </div>
  );
}
```

**断点说明：**

- `sm` - 640px
- `md` - 768px
- `lg` - 1024px
- `xl` - 1280px
- `2xl` - 1536px

### 状态变体

```tsx
function InteractiveButton() {
  return (
    <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50">
      点击我
    </button>
  );
}
```

**常用状态：**

- `hover:` - 鼠标悬停
- `focus:` - 获得焦点
- `active:` - 激活状态
- `disabled:` - 禁用状态
- `group-hover:` - 父元素悬停
- `peer-focus:` - 兄弟元素聚焦

### 暗黑模式

Tailwind 内置暗黑模式支持，使用 `dark:` 前缀：

```tsx
function ThemedCard() {
  return (
    <div className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
      <h2 className="text-xl font-bold">标题</h2>
      <p className="text-gray-600 dark:text-gray-300">内容文本</p>
      <button className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
        按钮
      </button>
    </div>
  );
}
```

### 自定义样式

项目支持自定义 Tailwind 配置，可以在 CSS 文件中使用 `@theme` 指令：

```css
/* src/styles/global.css */
@import 'tailwindcss';

@theme {
  /* 自定义颜色 */
  --color-primary: #3b82f6;
  --color-secondary: #8b5cf6;

  /* 自定义字体 */
  --font-sans: 'Inter', system-ui, sans-serif;

  /* 自定义间距 */
  --spacing-page: 1rem;
}
```

## DaisyUI

DaisyUI 是一个基于 Tailwind CSS 的组件类库，提供了语义化的组件样式。

### 核心特性

- **纯 CSS** - 无 JavaScript 依赖，更轻量
- **语义化** - 使用语义化的类名，代码更易读
- **可定制** - 完全基于 Tailwind，可深度定制
- **主题系统** - 内置多种主题，支持自定义
- **响应式** - 所有组件都是响应式的
- **暗黑模式** - 完整的暗黑模式支持

### 按钮组件

```tsx
function ButtonExamples() {
  return (
    <div className="flex gap-2">
      {/* 基础按钮 */}
      <button className="btn">默认</button>

      {/* 带颜色的按钮 */}
      <button className="btn btn-primary">主要</button>
      <button className="btn btn-secondary">次要</button>
      <button className="btn btn-accent">强调</button>

      {/* 不同大小 */}
      <button className="btn btn-lg">大按钮</button>
      <button className="btn btn-sm">小按钮</button>
      <button className="btn btn-xs">超小</button>

      {/* 按钮状态 */}
      <button className="btn btn-outline">轮廓</button>
      <button className="btn btn-ghost">幽灵</button>
      <button className="btn btn-link">链接</button>
      <button className="btn" disabled>禁用</button>
    </div>
  );
}
```

### 卡片组件

```tsx
function CardExamples() {
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img src="/image.jpg" alt="示例图片" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">卡片标题</h2>
        <p>这是卡片的内容描述文本。</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">操作</button>
        </div>
      </div>
    </div>
  );
}
```

### 表单组件

```tsx
function FormExamples() {
  return (
    <div className="space-y-4">
      {/* 输入框 */}
      <input
        type="text"
        placeholder="请输入内容"
        className="input input-bordered w-full"
      />

      {/* 带标签的输入框 */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">用户名</span>
        </label>
        <input
          type="text"
          placeholder="请输入用户名"
          className="input input-bordered"
        />
      </div>

      {/* 文本域 */}
      <textarea
        className="textarea textarea-bordered"
        placeholder="请输入多行文本"
      />

      {/* 选择框 */}
      <select className="select select-bordered w-full">
        <option disabled selected>选择一个选项</option>
        <option>选项 1</option>
        <option>选项 2</option>
      </select>

      {/* 复选框 */}
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">记住我</span>
          <input type="checkbox" className="checkbox" />
        </label>
      </div>
    </div>
  );
}
```

### 加载状态

```tsx
function LoadingExamples() {
  return (
    <div className="flex gap-4">
      {/* 加载动画 */}
      <span className="loading loading-spinner loading-xs" />
      <span className="loading loading-spinner loading-sm" />
      <span className="loading loading-spinner loading-md" />
      <span className="loading loading-spinner loading-lg" />

      {/* 不同样式 */}
      <span className="loading loading-dots loading-lg" />
      <span className="loading loading-ring loading-lg" />
      <span className="loading loading-ball loading-lg" />
    </div>
  );
}
```

### 主题色

DaisyUI 提供了语义化的颜色系统：

```tsx
function ColorExamples() {
  return (
    <div className="space-y-2">
      {/* 背景色 */}
      <div className="bg-primary p-4 text-primary-content">主色</div>
      <div className="bg-secondary p-4 text-secondary-content">次要色</div>
      <div className="bg-accent p-4 text-accent-content">强调色</div>
      <div className="bg-neutral p-4 text-neutral-content">中性色</div>

      {/* 状态色 */}
      <div className="bg-info p-4 text-info-content">信息</div>
      <div className="bg-success p-4 text-success-content">成功</div>
      <div className="bg-warning p-4 text-warning-content">警告</div>
      <div className="bg-error p-4 text-error-content">错误</div>

      {/* 基础色 */}
      <div className="bg-base-100 p-4">基础背景 100</div>
      <div className="bg-base-200 p-4">基础背景 200</div>
      <div className="bg-base-300 p-4">基础背景 300</div>
    </div>
  );
}
```

## 主题系统

项目内置了完善的主题系统，支持明暗模式切换和系统主题跟随。

### ThemeProvider

主题功能由 `ThemeProvider` 组件提供，位于 `src/components/common/theme-provider.tsx`。

**核心功能：**

- 🌓 支持 `light`、`dark`、`system` 三种模式
- 📦 主题偏好自动持久化到 LocalStorage
- 🔄 实时响应系统主题变化
- ⚡ 性能优化的主题切换

### 配置

在应用根组件中使用 `ThemeProvider`：

```tsx
// src/App.tsx
import { ThemeProvider } from '@/components/common/theme-provider';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="themeMode">
      {/* 你的应用内容 */}
    </ThemeProvider>
  );
}
```

**属性说明：**

- `defaultTheme` - 默认主题模式（`light` | `dark` | `system`）
- `storageKey` - LocalStorage 存储键名
- `children` - 子组件

### 使用主题

使用 `useTheme` Hook 获取和设置主题：

```tsx
import { useTheme } from '@/components/common/theme-provider';

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex gap-2">
      <button
        onClick={() => setTheme('light')}
        className={`btn ${theme === 'light' ? 'btn-primary' : 'btn-ghost'}`}
      >
        浅色
      </button>

      <button
        onClick={() => setTheme('dark')}
        className={`btn ${theme === 'dark' ? 'btn-primary' : 'btn-ghost'}`}
      >
        深色
      </button>

      <button
        onClick={() => setTheme('system')}
        className={`btn ${theme === 'system' ? 'btn-primary' : 'btn-ghost'}`}
      >
        跟随系统
      </button>
    </div>
  );
}
```

### 主题切换组件

项目封装了 `SwitchDark` 组件，提供一键切换明暗模式：

```tsx
import SwitchDark from '@/components/custom/switch-dark';

function Header() {
  return (
    <header className="flex items-center justify-between p-4">
      <h1>应用标题</h1>
      <SwitchDark />
    </header>
  );
}
```

### 系统主题跟随

当主题设置为 `system` 时，应用会自动跟随系统主题：

```tsx
// ThemeProvider 内部实现
useEffect(() => {
  if (theme === 'system') {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const systemTheme = mediaQuery.matches ? 'dark' : 'light';
    applyTheme(systemTheme);

    // 监听系统主题变化
    const handleChange = (e: MediaQueryListEvent) => {
      applyTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }

  applyTheme(theme);
}, [theme]);
```

### 自定义主题色

项目支持通过 ColorProvider 自定义主题色，详见源码：[color-provider.tsx](https://github.com/sankeyangshu/lemon-mobile-react/blob/main/src/components/common/color-provider.tsx)

## 自定义组件

项目基于 DaisyUI 和 Tailwind CSS，封装了一系列移动端组件，参考了 Vant 的设计。

### 组件目录

```
src/components/custom/
├── cell/              # 单元格组件
├── nav-bar/           # 导航栏组件
├── picker/            # 选择器组件
├── tabbar/            # 标签栏组件
└── toast/             # 轻提示组件
```

### Cell 单元格

```tsx
import { Cell, CellGroup } from '@/components/custom/cell';

function SettingsList() {
  return (
    <CellGroup title="设置">
      <Cell title="账号设置" isLink onClick={() => console.log('点击')} />
      <Cell title="通知" value="开启" isLink />
      <Cell title="版本号" value="1.0.0" />
    </CellGroup>
  );
}
```

### NavBar 导航栏

```tsx
import NavBar from '@/components/custom/nav-bar';
import SvgIcon from '@/components/custom/svg-icon';

function PageWithNav() {
  const router = useRouter();

  return (
    <>
      <NavBar
        title="页面标题"
        leftArrow={<SvgIcon icon="mdi:chevron-left" className="text-2xl" />}
        onClickLeft={() => router.history.back()}
      />
      {/* 页面内容 */}
    </>
  );
}
```

### Toast 轻提示

```tsx
import Toast from '@/components/custom/toast';

function ToastExample() {
  return (
    <div className="space-y-2">
      <button onClick={() => Toast.success('操作成功')}>
        成功提示
      </button>
      <button onClick={() => Toast.fail('操作失败')}>
        失败提示
      </button>
      <button onClick={() => Toast.loading('加载中...')}>
        加载提示
      </button>
    </div>
  );
}
```

## 最佳实践

### 1. 使用语义化类名

```tsx
function Example() {
  return (
    <>
      {/* ✅ 好的做法 - 使用 DaisyUI 语义化类名 */}
      <button className="btn btn-primary">提交</button>

      {/* ❌ 避免 - 重复定义相同样式 */}
      <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
        提交
      </button>
    </>
  );
}
```

### 2. 提取通用样式

```tsx
// ✅ 好的做法 - 提取为组件
function PrimaryButton({ children, ...props }: ButtonProps) {
  return (
    <button className="btn btn-primary" {...props}>
      {children}
    </button>
  );
}

// 使用
<PrimaryButton onClick={handleClick}>提交</PrimaryButton>;
```

### 3. 响应式设计优先

```tsx
function Example() {
  return (
    <>
      {/* ✅ 移动端优先，逐步增强 */}
      <div className="text-sm md:text-base lg:text-lg">
        响应式文本
      </div>

      {/* ❌ 避免桌面端优先 */}
      <div className="text-lg md:text-base sm:text-sm">
        错误的响应式
      </div>
    </>
  );
}
```

### 4. 使用 Tailwind 的设计令牌

```tsx
function Example() {
  return (
    <>
      {/* ✅ 使用 Tailwind 的间距系统 */}
      <div className="p-4 md:p-6 lg:p-8">内容</div>

      {/* ❌ 避免自定义数值 */}
      <div style={{ padding: '17px' }}>内容</div>
    </>
  );
}
```

### 5. 暗黑模式适配

```tsx
function Example() {
  return (
    <>
      {/* ✅ 为暗黑模式提供适配 */}
      <div className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
        内容
      </div>

      {/* ❌ 忘记暗黑模式 */}
      <div className="bg-white text-gray-900">
        内容
        {' '}
        {/* 暗黑模式下可能不可见 */}
      </div>
    </>
  );
}
```

### 6. 组合而非重复

```tsx
function Example() {
  return (
    <>
      {/* ✅ 组合现有类名 */}
      <button className="btn btn-primary btn-sm">
        小按钮
      </button>

      {/* ❌ 重复定义样式 */}
      <button className="rounded bg-blue-500 px-3 py-1.5 text-sm text-white">
        小按钮
      </button>
    </>
  );
}
```

### 7. 使用 group 和 peer 修饰符

```tsx
function Example() {
  return (
    <>
      {/* ✅ 使用 group 实现父子联动 */}
      <div className="group">
        <img className="group-hover:scale-110 transition" alt="" />
        <div className="group-hover:text-blue-500">标题</div>
      </div>

      {/* ✅ 使用 peer 实现兄弟联动 */}
      <div>
        <input type="checkbox" className="peer" />
        <label className="peer-checked:text-blue-500">选项</label>
      </div>
    </>
  );
}
```

## 常见问题

### 1. 如何自定义 Tailwind 配置？

在 `tailwind.config.ts` 中可以扩展配置，但 Tailwind v4 推荐使用 CSS 变量：

```css
/* src/styles/global.css */
@theme {
  --color-brand: #ff6b6b;
  --font-heading: 'Poppins', sans-serif;
}
```

### 2. 如何使用自定义字体？

在 CSS 文件中定义字体：

```css
@import 'tailwindcss';

@font-face {
  font-family: 'CustomFont';
  src: url('/fonts/custom-font.woff2') format('woff2');
}

@theme {
  --font-sans: 'CustomFont', system-ui, sans-serif;
}
```

### 3. 暗黑模式不生效？

确保 `ThemeProvider` 正确配置，并且使用了 `dark:` 前缀：

```tsx
// 检查 ThemeProvider
function Root() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}

// 使用 dark: 前缀
function Content() {
  return (
    <div className="bg-white dark:bg-gray-800">内容</div>
  );
}
```

### 4. 如何覆盖 DaisyUI 组件样式？

DaisyUI 组件可以通过 Tailwind 类名覆盖：

```tsx
function Example() {
  return (
    <>
      {/* 覆盖按钮样式 */}
      <button className="btn btn-primary !rounded-full">
        圆形按钮
      </button>

      {/* 使用 ! 前缀强制覆盖 */}
      <button className="btn !bg-red-500">
        自定义颜色
      </button>
    </>
  );
}
```

### 5. 如何组织大量的 Tailwind 类名？

使用 `clsx` 或 `cn` 工具函数：

```tsx
import { cn } from '@/lib/utils';

function Button({ variant, size, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'btn',
        {
          'btn-primary': variant === 'primary',
          'btn-secondary': variant === 'secondary',
          'btn-sm': size === 'small',
          'btn-lg': size === 'large',
        },
        className
      )}
      {...props}
    />
  );
}
```

### 6. 移动端适配注意事项？

- 使用 `viewport` 单位：`h-screen`、`min-h-screen`
- 注意安全区域：`safe-area-inset-*`
- 触摸优化：`touch-action-*`
- 性能优化：使用 `will-change-*`

```tsx
// 移动端全屏页面
<div className="min-h-screen pb-safe">
  <main className="h-[calc(100vh-4rem)]">
    {/* 内容 */}
  </main>
</div>;
```

## 相关链接

- [Tailwind CSS 官方文档](https://tailwindcss.com/)
- [DaisyUI 官方文档](https://daisyui.com/)
