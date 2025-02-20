# 路由

本文档介绍了项目中路由的配置、守卫逻辑以及相关工具函数的使用，帮助开发者快速理解和使用路由功能。

## 路由结构概览

项目的路由分为以下几部分：

1. **异步路由（`asyncRoutes`）**：动态加载的路由，包含主要的页面和功能模块。
2. **公共路由（`constantRoutes`）**：固定的基础路由，如 404 页面。
3. **未匹配路由（`notFoundRouter`）**：处理未匹配的路由，重定向到 404 页面。

## 异步路由

异步路由定义了项目的主要页面和功能模块，以下是主要路由的说明：

```ts
/**
 * 异步路由
 * path ==> 路由路径
 * name ==> 路由名称
 * component ==> 路由组件
 * redirect ==> 路由重定向
 * children ==> 子路由
 * meta ==> 路由元信息
 * meta.title ==> 路由标题
 * meta.icon ==> icon
 * meta.iconType ==> icon 来源类型 'vant'| 'iconify' | 'svg'
 * meta.tabBar ==> 是否显示在tabBar中
 * meta.hiddenNavBar ==> 是否隐藏导航栏
 * meta.keepAlive ==> 设为true 缓存页面
 * meta.i18n ==> 国际化配置文件中的key
 */
const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Root',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/Home/index.vue'),
        meta: { title: '首页', icon: 'home-o', iconType: 'vant', tabBar: true, i18n: 'home' },
      },
    ],
  },
];
```

## 路由守卫

路由守卫逻辑位于 `guards.ts` 文件中，主要功能包括：

1. **进度条控制**：

   - 使用 `NProgress` 显示页面加载进度条。
   - 配置：隐藏加载动画的 Spinner。

2. **白名单**：

   - 定义无需登录即可访问的页面路径：`/login`、`/register`、`/forgotPassword`。

3. **登录状态判断**：

   - 如果用户已登录：
     - 访问登录页时，重定向到主页。
     - 动态加载用户权限路由。
   - 如果用户未登录：
     - 访问白名单页面时，直接进入。
     - 访问其他页面时，重定向到登录页，并附带 `redirect` 参数。

4. **标题设置**：
   - 根据路由的 `meta.title` 动态设置页面标题。

## 工具函数

工具函数位于 `util.ts` 文件中，提供了以下功能：

### 1. 过滤需要显示 `tabBar` 的路由

函数：`filterTabBar`

- **参数**：异步路由表（`RouteRecordRaw[]`）
- **返回值**：需要显示 `tabBar` 的路由数组
- **逻辑**：
  - 遍历路由表，筛选 `meta.tabBar` 为 `true` 的路由。

### 2. 过滤需要缓存的路由

函数：`filterKeepAlive`

- **参数**：异步路由表（`RouteRecordRaw[]`）
- **返回值**：需要缓存的路由名称数组
- **逻辑**：
  - 遍历路由表，筛选 `meta.keepAlive` 为 `true` 的路由，并返回其 `name`。

## 相关链接

- [Vue Router 官方文档](https://router.vuejs.org/)
