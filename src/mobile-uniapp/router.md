# 路由

路由是组织现代 UniApp 应用的关键骨架。本项目使用 **uni-mini-router** 配合 **@uni-helper** 生态工具链作为路由解决方案，实现了类型安全、基于文件系统的路由管理，为小程序和 H5 应用提供统一的路由体验。

## 核心特性

- 📁 **基于文件的路由**: 直观的文件系统自动映射路由结构
- 🎯 **类型安全**: 完整的 TypeScript 支持和类型推断
- 🎨 **布局系统**: 灵活的页面布局配置
- 🔄 **路由守卫**: 支持前置和后置导航守卫
- 📱 **跨平台支持**: 统一的路由 API 适配小程序和 H5
- 🛡️ **导航管理**: 完善的页面导航和 TabBar 控制
- ⚡ **零配置**: 自动生成路由配置和类型定义

## 技术方案

本项目路由系统基于以下工具链：

| 工具                                    | 作用                                     |
| --------------------------------------- | ---------------------------------------- |
| **uni-mini-router**                     | 轻量级路由库，提供类似 Vue Router 的 API |
| **@uni-helper/vite-plugin-uni-pages**   | 基于文件系统自动生成路由配置             |
| **@uni-helper/vite-plugin-uni-layouts** | 页面布局系统，支持嵌套布局               |
| **@uni-ku/root**                        | 根组件配置，实现页面包装和逻辑复用       |

## 基于文件的路由

`lemon-mobile-uniapp` 使用基于文件的路由系统。您只需在 `src/pages` 文件夹中添加 `.vue` 文件，插件会根据文件名自动生成对应的路由结构。

### 路由映射规则

以下是一个简单的示例：

```
src/pages/
├── home/
│   └── index.vue          # 首页
├── example/
│   └── index.vue          # 示例
├── mine/
│   ├── index.vue          # 我的
│   └── settings.vue       # 设置
└── auth/
    └── login.vue          # 登录
```

这将生成以下路由：

- `/pages/home/index` -> 渲染首页组件
- `/pages/example/index` -> 渲染示例页组件
- `/pages/mine/index` -> 渲染我的页面组件
- `/pages/mine/settings` -> 渲染设置页组件
- `/pages/auth/login` -> 渲染登录页组件

## 路由配置

### Vite 插件配置

路由相关插件在 `build/plugins/index.ts` 中配置：

```typescript
// https://uni-helper.js.org/vite-plugin-uni-pages
UniPages({
  exclude: ['**/components/**/*.*'],
  dts: 'src/types/uni-pages.d.ts',
});
// https://uni-helper.js.org/vite-plugin-uni-layouts
UniLayouts();
```

**插件说明：**

- **UniPages**: 自动扫描 `src/pages` 目录生成 `pages.json`，并生成类型定义文件
- **UniLayouts**: 支持页面布局系统，通过 `definePage` 的 `layout` 属性指定布局
- **UniRoot**: 支持页面级根组件配置，用于页面逻辑复用

### 全局路由配置

在 `pages.config.ts` 中配置全局路由选项：

```typescript
import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages';

export default defineUniPages({
  globalStyle: {
    navigationStyle: 'default',
    navigationBarTitleText: 'Lemon-Mobile-UniApp',
    navigationBarBackgroundColor: '@navBgColor',
    navigationBarTextStyle: '@navTxtStyle',
    backgroundColor: '@bgColor',
    backgroundTextStyle: '@bgTxtStyle',
    backgroundColorTop: '@bgColorTop',
    backgroundColorBottom: '@bgColorBottom',
    h5: {
      navigationStyle: 'custom',
    },
  },
  tabBar: {
    color: '@tabColor',
    selectedColor: '@tabSelectedColor',
    backgroundColor: '@tabBgColor',
    borderStyle: '@tabBorderStyle',
    height: '50px',
    custom: true,
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页',
      },
      {
        pagePath: 'pages/example/index',
        text: '示例',
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的',
      },
    ],
  },
});
```

**配置项说明：**

- **globalStyle**: 全局页面样式配置，包括导航栏、背景色等
- **tabBar**: TabBar 配置，本项目使用自定义 TabBar（`custom: true`）
- **@变量**: 主题变量，会从 `theme.json` 中读取对应值

### 路由实例创建

在 `src/router/index.ts` 中创建路由实例：

```typescript
import type { App } from 'vue';
import { createRouter } from 'uni-mini-router';
import { pages, subPackages } from 'virtual:uni-pages';
import { createRouterGuard } from './guards';

/**
 * 生成路由表
 */
function generateRoutes() {
  const routes = pages.map((page) => {
    const newPath = `/${page.path}`;
    return { ...page, path: newPath };
  });

  if (subPackages && subPackages.length > 0) {
    subPackages.forEach((subPackage) => {
      const subRoutes = subPackage.pages.map((page: any) => {
        const newPath = `/${subPackage.root}/${page.path}`;
        return { ...page, path: newPath };
      });
      routes.push(...subRoutes);
    });
  }

  return routes;
}

/**
 * 创建一个可以被 Vue 应用程序使用的路由实例
 */
const router = createRouter({
  routes: generateRoutes(), // 路由表信息
});

/**
 * 配置路由器
 * @param app vue实例
 */
export function setupRouter(app: App<Element>) {
  app.use(router);
  createRouterGuard(router);
}

export { router };
```

**核心逻辑：**

1. 从 `virtual:uni-pages` 导入自动生成的页面和分包信息
2. `generateRoutes` 函数处理主包和分包路由，添加 `/` 前缀
3. 使用 `createRouter` 创建路由实例
4. `setupRouter` 函数注册路由并设置路由守卫

## 页面定义

### 创建页面

在页面组件中使用 `definePage` 宏定义页面配置：

```vue
<!-- src/pages/auth/login.vue -->
<script lang="ts" setup>
import type { FormInstance } from 'wot-design-uni/components/wd-form/types';
import { reactive, ref } from 'vue';
import { useToast } from 'wot-design-uni';
import { useRequest } from '@/hooks/use-request';
import { useUserStore } from '@/store/modules/user';

defineOptions({
  name: 'Login',
});

definePage({
  name: 'login',
  style: {
    navigationBarTitleText: '登录',
  },
});
</script>
```

**配置说明：**

- **name**: 页面唯一标识符，用于路由导航
- **layout**: 指定页面布局（可选）
- **style**: 页面样式配置，如导航栏标题、样式等

### 使用布局

本项目提供两种布局：

#### 1. Default 布局（默认布局）

最简单的布局，仅渲染页面内容：

```vue
<!-- src/layouts/default.vue -->
<script lang="ts" setup>
defineOptions({
  addGlobalClass: true,
  virtualHost: true,
  styleIsolation: 'shared',
});
</script>

<template>
  <slot />
</template>
```

**使用方式：**

```vue
<script lang="ts" setup>
definePage({
  name: 'login',
  layout: 'default', // 或不指定，默认就是 default
  style: {
    navigationBarTitleText: '登录',
  },
});
</script>
```

#### 2. Tabbar 布局

带底部 TabBar 的布局，适用于首页、示例页、我的页等：

```vue
<!-- src/layouts/tabbar.vue -->
<script lang="ts" setup>
import { useRoute, useRouter } from 'uni-mini-router';
import { nextTick, onMounted } from 'vue';
import { useTabbar } from '@/hooks/use-tabbar';

defineOptions({
  addGlobalClass: true,
  virtualHost: true,
  styleIsolation: 'shared',
});

const router = useRouter();
const route = useRoute();

const { tabbarList, activeTabbar, getTabbarItemValue, setTabbarItemActive } = useTabbar();

onMounted(() => {
  nextTick(() => {
    if (route.name && route.name !== activeTabbar.value.name) {
      setTabbarItemActive(route.name);
    }
  });
});

function onChangeTabbar({ value }: { value: string }) {
  setTabbarItemActive(value);
  router.pushTab({ name: value });
}
</script>

<template>
  <!-- 内容区域 -->
  <slot />

  <!-- 底部导航栏 -->
  <wd-tabbar
    :model-value="activeTabbar.name"
    fixed
    :bordered="false"
    safe-area-inset-bottom
    placeholder
    @change="onChangeTabbar"
  >
    <wd-tabbar-item
      v-for="item in tabbarList" :key="item.name"
      :name="item.name"
      :title="item.title"
      :value="getTabbarItemValue(item.name)"
      :icon="item.icon"
    />
  </wd-tabbar>
</template>
```

**使用方式：**

```vue
<!-- src/pages/example/index.vue -->
<script lang="ts" setup>
definePage({
  name: 'example',
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '示例',
  },
});
</script>
```

::: tip 自定义 TabBar
本项目使用 `wot-design-uni` 的 `wd-tabbar` 组件实现自定义 TabBar，支持国际化和主题切换。
:::

## 路由导航

### 使用 uni.navigateTo

标准页面跳转，保留当前页面，支持返回：

```typescript
// 基本跳转
uni.navigateTo({
  url: '/pages/auth/login'
});

// 带参数跳转
uni.navigateTo({
  url: '/pages/mine/settings?theme=dark'
});
```

### 使用 uni.redirectTo

关闭当前页面，跳转到新页面（不可返回）：

```typescript
uni.redirectTo({
  url: '/pages/home/index'
});
```

### 使用 uni.reLaunch

关闭所有页面，打开新页面：

```typescript
uni.reLaunch({
  url: '/pages/home/index'
});
```

### 使用 uni.switchTab

跳转到 TabBar 页面：

```typescript
uni.switchTab({
  url: '/pages/home/index'
});
```

### 使用 uni-mini-router

推荐使用 `uni-mini-router` 提供的 API，支持命名路由：

```vue
<script lang="ts" setup>
import { useRouter } from 'uni-mini-router';

const router = useRouter();

// 命名路由跳转
function goToSettings() {
  router.push({ name: 'settings' });
}

// TabBar 跳转
function goToHome() {
  router.pushTab({ name: 'home' });
}

// 返回上一页
function goBack() {
  router.back();
}

// 关闭所有页面并跳转
function relaunch() {
  router.reLaunch({ name: 'home' });
}
</script>
```

::: warning 命名路由
使用命名路由前，需要在 `definePage` 中定义 `name` 属性，且确保 `name` 在整个应用中唯一。
:::

## 路由守卫

路由守卫在 `src/router/guards.ts` 中配置：

```typescript
import type { Router } from 'uni-mini-router';

/**
 * 创建路由守卫
 * @param router 路由实例
 */
export function createRouterGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    // 这里可以做登录检查、权限检查等

    console.log('beforeEach 前置守卫:', { to, from });

    next();
  });

  router.afterEach((to, from) => {
    // 这里可以做埋点、统计等

    console.log('afterEach 后置守卫:', { to, from });
  });
}
```

### 前置守卫（beforeEach）

在路由跳转前执行，可用于：

- **权限验证**: 检查用户是否有权访问目标页面
- **登录校验**: 未登录用户重定向到登录页
- **页面埋点**: 记录页面访问统计

```typescript
import type { Router } from 'uni-mini-router';
import { useUserStore } from '@/store/modules/user';

export function createRouterGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    const userStore = useUserStore();

    // 需要登录的页面
    const authPages = ['settings'];

    if (authPages.includes(to.name) && !userStore.isLogin) {
      // 未登录，跳转到登录页
      uni.navigateTo({
        url: '/pages/auth/login'
      });
      return;
    }

    next();
  });
}
```

### 后置守卫（afterEach）

在路由跳转后执行，可用于：

- **页面标题更新**: 动态设置导航栏标题
- **页面统计**: 发送页面访问数据
- **用户行为追踪**: 记录用户访问路径

```typescript
router.afterEach((to, from) => {
  // 页面访问统计
  console.log(`从 ${from.name} 跳转到 ${to.name}`);

  // 发送埋点数据
  // analytics.track('page_view', { page: to.name });
});
```

::: warning 守卫执行顺序

1. 调用 `router.beforeEach` 前置守卫
2. 执行页面跳转
3. 调用 `router.afterEach` 后置守卫
   :::

## 路由信息获取

### 使用 useRoute

在组件中获取当前路由信息：

```vue
<script lang="ts" setup>
import { useRoute } from 'uni-mini-router';

const route = useRoute();

// 获取路由名称
console.log(route.name); // 'home'

// 获取路由路径
console.log(route.path); // '/pages/home/index'

// 获取路由参数（query）
console.log(route.query); // { id: '123' }
</script>
```

### 使用 useRouter

在组件中获取路由实例：

```vue
<script lang="ts" setup>
import { useRouter } from 'uni-mini-router';

const router = useRouter();

// 获取当前路由
const currentRoute = router.currentRoute;

// 编程式导航
router.push({ name: 'example' });
router.back();
router.reLaunch({ name: 'home' });
</script>
```

## TabBar 管理

本项目提供 `useTabbar` Hook 管理 TabBar 状态：

```typescript
// src/hooks/use-tabbar.ts
import { computed, ref } from 'vue';
import { i18n } from '@/locale';

export interface TabbarItem {
  name: string;
  value?: number;
  active: boolean;
  title: string;
  icon: string;
}

const tabbarItems = ref<TabbarItem[]>([
  {
    icon: 'home',
    title: '首页',
    name: 'home',
    active: true,
  },
  {
    icon: 'a-controlplatform',
    title: '示例',
    name: 'example',
    active: false,
  },
  {
    icon: 'user',
    title: '我的',
    name: 'mine',
    active: false,
  },
]);

export function useTabbar() {
  /**
   * tabbar列表
   */
  const tabbarList = computed(() => {
    return tabbarItems.value.map(item => ({
      ...item,
      title: i18n.global.t(`route.${item.name}`),
    }));
  });

  /**
   * 当前激活的tabbar
   */
  const activeTabbar = computed(() => {
    const activeItem = tabbarItems.value.find(item => item.active);
    return activeItem || tabbarItems.value[0];
  });

  /**
   * 获取tabbar item.value
   * @param name 唯一标识符
   * @returns tabbar item 的 value 值
   */
  const getTabbarItemValue = (name: string) => {
    const tabbarItem = tabbarItems.value.find(item => item.name === name);
    return tabbarItem && tabbarItem.value ? tabbarItem.value : null;
  };

  /**
   * 设置tabbar item
   * @param name 唯一标识符
   * @param value 值
   */
  const setTabbarItem = (name: string, value: number) => {
    const tabbarItem = tabbarItems.value.find(item => item.name === name);
    if (tabbarItem) {
      tabbarItem.value = value;
    }
  };

  /**
   * 设置tabbar item 激活状态
   * @param name 唯一标识符
   */
  const setTabbarItemActive = (name: string) => {
    tabbarItems.value.forEach((item) => {
      if (item.name === name) {
        item.active = true;
      }
      else {
        item.active = false;
      }
    });
  };

  return {
    tabbarList,
    activeTabbar,
    getTabbarItemValue,
    setTabbarItem,
    setTabbarItemActive,
  };
}
```

**使用示例：**

```vue
<script lang="ts" setup>
import { useTabbar } from '@/hooks/use-tabbar';

const { setTabbarItem, setTabbarItemActive } = useTabbar();

// 设置 TabBar 徽标
function setMineTabBadge() {
  setTabbarItem('mine', 5); // 在"我的"Tab上显示数字 5
}

// 切换 TabBar 激活状态
function switchToExample() {
  setTabbarItemActive('example');
}
</script>
```

::: tip 国际化支持
TabBar 标题会自动从国际化配置中读取，key 格式为 `route.{name}`。
:::

## 类型安全

项目自动生成路由类型定义文件 `src/types/uni-pages.d.ts`，提供完整的类型支持：

```typescript
// 自动生成的类型定义
declare module 'virtual:uni-pages' {
  export interface PageMeta {
    path: string;
    name?: string;
    layout?: string;
    style?: Record<string, any>;
  }

  export const pages: PageMeta[];
  export const subPackages: any[];
}
```

在使用路由时可以获得完整的类型提示和检查：

```vue
<script lang="ts" setup>
import { useRouter } from 'uni-mini-router';

const router = useRouter();

// 类型安全的路由跳转
router.push({ name: 'home' }); // ✅ 正确
router.push({ name: 'unknown' }); // ❌ TypeScript 会提示错误
</script>
```

## 最佳实践

### 1. 使用命名路由

推荐使用命名路由而非路径字符串，提高可维护性：

```typescript
// ✅ 推荐：使用命名路由
router.push({ name: 'settings' });

// ❌ 不推荐：使用路径字符串
uni.navigateTo({
  url: '/pages/mine/settings'
});
```

### 2. 页面命名规范

- 页面 `name` 使用小驼峰命名：`myPage`
- 目录和文件名使用短横线命名：`my-page/index.vue`
- 确保 `name` 在整个应用中唯一

### 3. 合理使用布局

- TabBar 页面使用 `tabbar` 布局
- 普通页面使用 `default` 布局或不指定
- 避免在非 TabBar 页面使用 `tabbar` 布局

### 4. 路由参数传递

**简单参数：**

```typescript
// 传递参数
router.push({
  name: 'detail',
  query: { id: '123' }
});

// 接收参数
const route = useRoute();
const id = route.query.id; // '123'
```

**复杂参数：**

对于复杂对象，建议通过状态管理传递：

```typescript
// 方案 1：使用 Pinia Store
const dataStore = useDataStore();
dataStore.setCurrentItem(complexData);
router.push({ name: 'detail' });

// 方案 2：使用 EventChannel（uni-app 推荐）
const eventChannel = uni.navigateTo({
  url: '/pages/detail/index',
  success: (res) => {
    res.eventChannel.emit('acceptDataFromOpenerPage', { data: complexData });
  }
});
```

### 5. 权限控制

在路由守卫中统一处理权限验证：

```typescript
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();

  // 白名单（无需登录即可访问的页面）
  const whiteList = ['home', 'login', 'register'];

  if (!whiteList.includes(to.name) && !userStore.isLogin) {
    // 需要登录但未登录，跳转到登录页
    uni.showToast({
      title: '请先登录',
      icon: 'none'
    });

    uni.navigateTo({
      url: '/pages/auth/login'
    });
    return;
  }

  next();
});
```

## 常见问题

### 1. 如何创建页面？

在 `src/pages` 目录下创建 `.vue` 文件，文件路径会自动映射为路由路径。记得在页面组件中使用 `definePage` 定义页面配置。

### 2. 如何避免组件生成路由？

将组件放在 `src/components` 目录下，或在插件配置中添加 `exclude` 规则：

```typescript
UniPages({
  exclude: ['**/components/**/*.*', '**/-components/**/*.*'],
  dts: 'src/types/uni-pages.d.ts',
});
```

### 3. TabBar 跳转和普通跳转有什么区别？

- **TabBar 页面**：必须使用 `uni.switchTab` 或 `router.pushTab`
- **普通页面**：使用 `uni.navigateTo`、`router.push` 等
- 混用会导致跳转失败

### 4. 如何在页面间传递复杂数据？

- **简单数据**：通过 URL query 参数传递
- **复杂对象**：使用 Pinia Store 或 uni-app 的 EventChannel
- **临时数据**：可以使用全局事件总线 `uni.$emit` / `uni.$on`

### 5. 如何获取上一个页面的实例？

```typescript
// 获取当前页面栈
const pages = getCurrentPages();

// 获取上一个页面实例
const prevPage = pages[pages.length - 2];

// 调用上一个页面的方法
prevPage.$vm.refreshData();
```

### 6. 为什么路由跳转没有反应？

检查以下几点：

1. 路径是否正确（不要遗漏 `/pages/` 前缀）
2. TabBar 页面是否使用了 `switchTab`
3. 页面栈是否已满（最多 10 层）
4. 路由守卫是否阻止了跳转

## 相关链接

- [uni-mini-router 官方文档](https://moonofweisheng.github.io/uni-mini-router/)
- [vite-plugin-uni-pages 文档](https://uni-helper.js.org/vite-plugin-uni-pages)
- [vite-plugin-uni-layouts 文档](https://uni-helper.js.org/vite-plugin-uni-layouts)
- [UniApp 路由](https://uniapp.dcloud.net.cn/api/router)
