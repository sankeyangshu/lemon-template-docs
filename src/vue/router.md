# Router

This document introduces the configuration of routes in the project, guard logic, and the use of related utility functions to help developers quickly understand and use routing functionality.

## Router Structure Overview

The project's routes are divided into the following parts:

1. **Async Routes (`asyncRoutes`)**: Dynamically loaded routes, containing main pages and functional modules.
2. **Constant Routes (`constantRoutes`)**: Fixed basic routes, such as 404 page.
3. **Not Found Route (`notFoundRouter`)**: Handles unmatched routes, redirects to 404 page.

## Async Routes

Async routes define the project's main pages and functional modules. Here's the main route explanation:

```ts
/**
 * Async routes
 * path ==> route path
 * name ==> route name
 * component ==> route component
 * redirect ==> route redirect
 * children ==> child routes
 * meta ==> route meta information
 * meta.title ==> route title
 * meta.icon ==> icon
 * meta.iconType ==> icon source type 'vant'| 'iconify' | 'svg'
 * meta.tabBar ==> whether to show in tabBar
 * meta.hiddenNavBar ==> whether to hide navigation bar
 * meta.keepAlive ==> set to true to cache page
 * meta.i18n ==> key in internationalization configuration file
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
        component: () => import('views/Home/index.vue'),
        meta: { title: 'Home', icon: 'home-o', iconType: 'vant', tabBar: true, i18n: 'home' },
      },
    ],
  },
];
```

## Route Guards

Route guard logic is located in the `guards.ts` file, with main functionality including:

1. **Progress Bar Control**:

   - Uses `NProgress` to display page loading progress bar.
   - Configuration: Hides loading animation Spinner.

2. **Whitelist**:

   - Defines page paths that can be accessed without login: `/login`, `/register`, `/forgotPassword`.

3. **Login State Check**:

   - If user is logged in:
     - When accessing login page, redirects to home page.
     - Dynamically loads user permission routes.
   - If user is not logged in:
     - When accessing whitelist pages, directly enters.
     - When accessing other pages, redirects to login page with `redirect` parameter.

4. **Title Setting**:
   - Dynamically sets page title based on route's `meta.title`.

## Utility Functions

Utility functions are located in the `util.ts` file, providing the following functionality:

### 1. Filter Routes That Need to Show `tabBar`

Function: `filterTabBar`

- **Parameters**: Async route table (`RouteRecordRaw[]`)
- **Return Value**: Array of routes that need to show `tabBar`
- **Logic**:
  - Traverses route table, filters routes with `meta.tabBar` set to `true`.

### 2. Filter Routes That Need to be Cached

Function: `filterKeepAlive`

- **Parameters**: Async route table (`RouteRecordRaw[]`)
- **Return Value**: Array of route names that need to be cached
- **Logic**:
  - Traverses route table, filters routes with `meta.keepAlive` set to `true`, and returns their `name`.

## Related Links

- [Vue Router Official Documentation](https://router.vuejs.org/)
