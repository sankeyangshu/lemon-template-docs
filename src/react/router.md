# Router

This document provides a detailed explanation of the routing design and implementation in the project, including router file structure, core functionality, route guards, utility functions, and type definitions.

## Router File Structure

The router files in the project are distributed as follows:

- **`index.tsx`**: Core router configuration file, defining all routing rules.
- **`authGuard.tsx`**: Route guard file for handling permission validation.
- **`index.ts`**: Utility functions file containing router-related helper functions.
- **`lazyLoad.tsx`**: Encapsulated lazy loading implementation for optimizing route loading performance.
- **`routeType.ts`**: Router type definition file for constraining route structure and meta information.

## Core Router Configuration

Core router configuration is located in `index.tsx`, where `constantRoutes` defines all public routes of the project.

### Public Routes

Public routes are divided into the following categories:

1. **Redirect Routes**:

   - `path: '/'`: Default redirect to `/home`.

2. **Main Page Routes**:

   - `/login`: Login page.
   - `/register`: Registration page.
   - `/forgetPassword`: Forgot password page.
   - `/home`: Home page, with TabBar.
   - `/example`: Example page, with TabBar.
   - `/mine`: My page, with TabBar, hidden top navigation bar.
   - `/theme`: Theme settings page.

3. **Example Feature Routes**:
   - `/mock`: Mock data demonstration page.
   - `/echarts`: Echarts chart demonstration page.
   - `/icon`: Icon example page.
   - `/keepAlive`: Page supporting KeepAlive caching.

Each route can define additional information through the `meta` field, such as title, icon, whether to show in TabBar, etc.

Route example:

```tsx
{
  path: '/home',
  element: lazyLoad(lazy(() => import('@/views/Home'))),
  meta: {
    title: 'Home',
    key: 'Home',
    icon: 'HomeO',
    iconType: 'react-vant',
    tabBar: true,
    i18n: 'home',
  },
}
```

## Route Guards

The route guard file `authGuard.tsx` implements permission validation logic to ensure security when users access restricted pages.

### Core Logic

1. **Whitelist**: Defines routes that can be accessed without permissions, such as login, registration, forgot password pages.

   ```tsx
   const whiteList = ['/login', '/register', '/forgetPassword'];
   ```

2. **Permission Validation**:

   - If user is logged in but tries to access the login page, redirects to home page.
   - If user is not logged in and accesses a non-whitelist page, redirects to login page.

3. **Dynamic Page Title Setting**: Dynamically sets page title based on route's `meta.title`.

Example code:

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

## Utility Functions

Utility functions are located in the `index.ts` file, providing the following functionality:

### Filter TabBar Routes

The `filterTabBar` function is used to filter out routes that need to be shown on the TabBar.

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

### Route Search

The `searchRoute` function is used to search for the corresponding route object based on the path.

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

### Filter KeepAlive Routes

The `filterKeepAlive` function is used to filter out routes that need to be cached.

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

## Lazy Loading Implementation

Lazy loading functionality is implemented by `lazyLoad.tsx`, using `React.Suspense` to wrap dynamically loaded components and providing a loading placeholder.

Example code:

```tsx
const lazyLoad = (Component: LazyExoticComponent<any>): ReactNode => {
  return (
    <Suspense fallback={<Loading type="ball" className="h-full flex-center" />}>
      <Component />
    </Suspense>
  );
};
```

Usage example:

```tsx
element: lazyLoad(lazy(() => import('@/views/Home')));
```

## Route Type Definitions

Route type definitions are located in the `routeType.ts` file, mainly defining the structure and meta information of route objects.

### `MetaType` Route Meta Information

`MetaType` defines meta information fields for routes, such as title, icon, whether to cache, etc.:

```tsx
export interface MetaType {
  title: string; // Route title
  icon?: string; // Menu icon
  iconType?: string; // Icon type
  tabBar?: boolean; // Whether to show in bottom navigation bar
  hiddenNavBar?: boolean; // Whether to hide top navigation bar
  key?: string; // Route unique identifier
  keepAlive?: boolean; // Whether to cache
  i18n?: string; // Internationalization key
}
```

### `RouteObjectType` Route Object

`RouteObjectType` defines the complete structure of a route, including path, component, child routes, etc.:

```tsx
export interface RouteObjectType {
  path?: string; // Route path
  element?: React.ReactNode; // Route component
  children?: RouteObjectType[]; // Child routes
  meta?: MetaType; // Route meta information
  keepAlive?: boolean; // Whether to cache
  isLink?: string; // Whether it's an external link
}
```

## Summary

The routing design of this project has the following characteristics:

1. **Modular**: Separation of route configuration, guards, utility functions, and type definitions for easy maintenance.
2. **Dynamic**: Dynamic configuration of titles, icons, etc., through `meta` field.
3. **Performance Optimization**: Support for lazy loading and route caching (KeepAlive).
4. **Security**: Permission control through route guards.
5. **Type Constraints**: Ensuring route configuration standardization through TypeScript type definitions.

## Related Links

- [React Router Official Documentation](https://reactrouter.com/home)
