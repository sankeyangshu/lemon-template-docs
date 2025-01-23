# 路由

本文档详细说明了项目中路由的设计与实现，包括路由文件结构、核心功能、路由守卫、工具函数以及类型定义等内容。

## 路由文件结构

项目中的路由文件分布如下：

- **`index.tsx`**：核心路由配置文件，定义了所有的路由规则。
- **`authGuard.tsx`**：路由守卫文件，用于处理权限校验。
- **`index.ts`**：工具函数文件，包含路由相关的辅助函数。
- **`lazyLoad.tsx`**：封装的懒加载实现，用于优化路由加载性能。
- **`routeType.ts`**：路由类型定义文件，用于约束路由的结构和元信息。

## 核心路由配置

核心路由配置位于 `index.tsx`，通过 `constantRoutes` 定义了项目的所有公共路由。

### 公共路由

公共路由分为以下几类：

1. **重定向路由**：

   - `path: '/'`：默认重定向到 `/home`。

2. **主要页面路由**：

   - `/login`：登录页面。
   - `/register`：注册页面。
   - `/forgetPassword`：忘记密码页面。
   - `/home`：首页，带有 TabBar。
   - `/example`：示例页面，带有 TabBar。
   - `/mine`：我的页面，带有 TabBar，隐藏顶部导航栏。
   - `/theme`：主题设置页面。

3. **示例功能路由**：
   - `/mock`：Mock 数据演示页面。
   - `/echarts`：Echarts 图表演示页面。
   - `/icon`：图标示例页面。
   - `/keepAlive`：支持 KeepAlive 缓存的页面。

每个路由可以通过 `meta` 字段定义额外的信息，例如标题、图标、是否显示在 TabBar 中等。

路由示例：

```tsx
{
  path: '/home',
  element: lazyLoad(lazy(() => import('@/views/Home'))),
  meta: {
    title: '首页',
    key: 'Home',
    icon: 'HomeO',
    iconType: 'react-vant',
    tabBar: true,
    i18n: 'home',
  },
}
```

## 路由守卫

路由守卫文件 `authGuard.tsx` 实现了权限校验逻辑，确保用户访问受限页面时的安全性。

### 核心逻辑

1. **白名单**：定义了无需权限即可访问的路由，例如登录、注册、忘记密码页面。

   ```tsx
   const whiteList = ['/login', '/register', '/forgetPassword'];
   ```

2. **权限校验**：

   - 如果用户已登录但尝试访问登录页面，则重定向到首页。
   - 如果用户未登录且访问非白名单页面，则重定向到登录页面。

3. **动态设置页面标题**：根据路由的 `meta.title` 动态设置页面标题。

示例代码：

```tsx
if (hasToken) {
  if (pathname === LOGIN_URL) {
    return <Navigate to="/" />;
  }
} else {
  if (!whiteList.includes(pathname)) {
    return <Navigate to="/login" replace />;
  }
}
```

## 工具函数

工具函数位于 `index.ts` 文件中，提供了以下功能：

### 过滤 TabBar 路由

`filterTabBar` 函数用于过滤出需要显示在 TabBar 上的路由。

```tsx
export const filterTabBar = (routers: RouteObjectType[]) => {
  const tabBarRouter: RouteObjectType[] = [];
  const deep = (routerList: RouteObjectType[]) => {
    routerList.forEach((item) => {
      if (item.meta?.tabBar) {
        tabBarRouter.push(item);
      }
      if (item.children && item.children.length) {
        deep(item.children);
      }
    });
  };
  deep(routers);
  return tabBarRouter;
};
```

### 路由查询

`searchRoute` 函数用于根据路径查询对应的路由对象。

```tsx
export const searchRoute = (path: string, routes: RouteObjectType[] = []): RouteObjectType => {
  let result: RouteObjectType = {};
  for (const item of routes) {
    if (item.path === path) return item;
    if (item.children) {
      const res = searchRoute(path, item.children);
      if (Object.keys(res).length) result = res;
    }
  }
  return result;
};
```

### 过滤 KeepAlive 路由

`filterKeepAlive` 函数用于过滤出需要缓存的路由。

```tsx
export const filterKeepAlive = (routers: RouteObjectType[]) => {
  const cacheRouter: string[] = [];
  const deep = (routerList: RouteObjectType[]) => {
    routerList.forEach((item) => {
      if (item.meta?.keepAlive && item.path) {
        cacheRouter.push(item.path as string);
      }
      if (item.children && item.children.length) {
        deep(item.children);
      }
    });
  };
  deep(routers);
  return cacheRouter;
};
```

## 懒加载实现

懒加载功能由 `lazyLoad.tsx` 实现，使用 `React.Suspense` 包裹动态加载的组件，并提供加载中的占位符。

示例代码：

```tsx
const lazyLoad = (Component: LazyExoticComponent<any>): ReactNode => {
  return (
    <Suspense fallback={<Loading type="ball" className="h-full flex-center" />}>
      <Component />
    </Suspense>
  );
};
```

调用示例：

```tsx
element: lazyLoad(lazy(() => import('@/views/Home')));
```

## 路由类型定义

路由类型定义位于 `routeType.ts` 文件中，主要定义了路由对象的结构和元信息。

### `MetaType` 路由元信息

`MetaType` 定义了路由的元信息字段，例如标题、图标、是否缓存等：

```tsx
export interface MetaType {
  title: string; // 路由标题
  icon?: string; // 菜单图标
  iconType?: string; // 图标类型
  tabBar?: boolean; // 是否显示在底部导航栏
  hiddenNavBar?: boolean; // 是否隐藏顶部导航栏
  key?: string; // 路由唯一标识
  keepAlive?: boolean; // 是否缓存
  i18n?: string; // 国际化 key
}
```

### `RouteObjectType` 路由对象

`RouteObjectType` 定义了路由的完整结构，包括路径、组件、子路由等：

```tsx
export interface RouteObjectType {
  path?: string; // 路由路径
  element?: React.ReactNode; // 路由组件
  children?: RouteObjectType[]; // 子路由
  meta?: MetaType; // 路由元信息
  keepAlive?: boolean; // 是否缓存
  isLink?: string; // 是否为外部链接
}
```

## 总结

本项目的路由设计具有以下特点：

1. **模块化**：路由配置、守卫、工具函数、类型定义分离，便于维护。
2. **动态化**：通过 `meta` 字段实现动态标题、图标等配置。
3. **性能优化**：支持懒加载和路由缓存（KeepAlive）。
4. **安全性**：通过路由守卫实现权限控制。
5. **类型约束**：通过 TypeScript 类型定义，确保路由配置的规范性。

## 相关链接

- [React Router 官方文档](https://reactrouter.com/home)
