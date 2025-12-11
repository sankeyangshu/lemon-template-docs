# 路由

路由是组织现代 React 应用的关键骨架。本项目使用 **TanStack Router** 作为路由解决方案，这是一个现代化、类型安全的客户端路由库，专为构建可扩展的 React 应用程序而设计。

## 核心特性

- 🚀 **类型安全**: 100% TypeScript 支持，提供完整的类型推断
- 📁 **基于文件的路由**: 直观的文件系统映射路由结构
- 🔄 **自动代码分割**: 自动优化应用性能
- 🔗 **智能导航**: 多种导航方式支持
- 🛡️ **数据加载**: 内置数据加载和缓存机制
- 🎯 **搜索参数**: 完整的搜索参数 API 支持
- 📊 **开发工具**: 内置开发者工具可视化路由状态

## 基于文件的路由

`lemon-mobile-react` 使用基于文件的路由系统，由 `@tanstack/react-router` 插件实现。

在本项目中，插件相关配置已完成。您只需在 `src/pages` 文件夹中添加 `.tsx` 文件，插件会根据文件名自动生成对应的路由结构。

**以下是一个简单的示例：**

```
src/pages/
├── __root.tsx          # 根路由
├── index.tsx           # 首页
├── about.tsx           # 关于页
├── posts.tsx           # 帖子页
└── posts/
    ├── index.tsx       # 帖子页
    └── $postId.tsx     # 帖子详情页
```

这将生成以下路由：

- `/` -> 渲染 `index.tsx` 组件
- `/about` -> 渲染 `about.tsx` 组件
- `/posts` -> 渲染 `posts.tsx` 组件
- `/posts (exact)` -> 渲染 `posts/index.tsx` 组件
- `/posts/$postId` -> 渲染 `posts/$postId.tsx` 组件

### 根路由配置

根路由是应用的基础结构，位于 `src/pages/__root.tsx`：

```tsx
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      {/* 页面内容区域 */}
      <Outlet />

      {/* 开发工具 */}
      {import.meta.env.MODE === 'development' && (
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'TanStack Router',
              render: <TanStackRouterDevtoolsPanel />,
              defaultOpen: false,
            },
          ]}
        />
      )}
    </>
  );
}
```

### 创建页面组件

在 `src/pages` 目录下创建 `.tsx` 文件即可自动生成路由：

```tsx
// src/pages/home.tsx
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/about')({
  component: AboutComponent,
});

function AboutComponent() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">欢迎来到主页</h1>
      <p>这是 lemon-mobile-react 的主页内容。</p>
    </div>
  );
}
```

### 动态路由

使用 `$` 前缀创建动态路由参数：

```tsx
// src/routes/posts/$postId.tsx
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/posts/$postId')({
  component: PostComponent,
});

function PostComponent() {
  const { postId } = Route.useParams();

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">文章详情</h2>
      <p>
        文章ID:
        {postId}
      </p>
    </div>
  );
}
```

### 预加载数据

```tsx
// src/pages/posts/$postId.tsx
import { createFileRoute } from '@tanstack/react-router';

// 模拟 API 函数
async function fetchPost(postId: string) {
  // 实际项目中这里调用 API
  return { id: postId, title: `文章 ${postId}`, content: '文章内容...' };
}

export const Route = createFileRoute('/posts/$postId')({
  loader: async ({ params }) => {
    const post = await fetchPost(params.postId);
    if (!post) {
      throw new Error('文章未找到');
    }
    return post;
  },
  component: PostDetail,
});

function PostDetail() {
  const post = Route.useLoaderData();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}
```

### 错误处理

```tsx
// src/components/ErrorBoundary.tsx
export default function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded">
      <h2 className="text-lg font-bold text-red-800">出错了！</h2>
      <p className="text-red-600">{error.message}</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        重新加载
      </button>
    </div>
  );
}
```

```tsx
// src/pages/posts/$postId.tsx
import { createFileRoute } from '@tanstack/react-router';
import ErrorBoundary from '../../components/ErrorBoundary';

export const Route = createFileRoute('/posts/$postId')({
  errorComponent: ErrorBoundary,
  loader: async ({ params }) => {
    // ... 数据加载逻辑
  },
  component: PostDetail,
});
```

### 路由守卫

```tsx
// src/pages/dashboard.tsx
import { createFileRoute, redirect } from '@tanstack/react-router';

// 模拟认证检查
function isAuthenticated() {
  // 实际项目中检查 token 等
  return localStorage.getItem('authToken') !== null;
}

export const Route = createFileRoute('/dashboard')({
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({
        to: '/login',
        search: { redirect: window.location.pathname }
      });
    }
  },
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">控制面板</h1>
      <p>欢迎回来！</p>
    </div>
  );
}
```

### Vite 配置

```typescript
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
// vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
      routesDirectory: './src/pages',
    }),
    react(),
  ],
});
```

### 路由树生成

项目使用自动路由树生成，在 `src/routeTree.gen.ts` 中：

```tsx
import { createRouter, RouterProvider } from '@tanstack/react-router';
// src/main.tsx
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

// 导入生成的路由树
import { routeTree } from './routeTree.gen';

// 创建路由器实例
const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
});

// 注册路由器实例以获取类型安全
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// 渲染应用
const rootElement = document.getElementById('app')!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
```

::: tip
通常，您只需创建业务页面即可，如果您希望深入了解并进行高级配置，请访问 [官网](https://tanstack.com/router/latest/docs/framework/react/overview)。
:::

## 常见问题

### 1. 如何创建页面组件？

在 `src/pages` 文件夹下创建 `.tsx` 文件即可。文件路径会自动映射为路由路径。

### 2. 如何避免页面组件生成路由？

如果需要在页面内创建专用组件，可以放在 `src/pages/**/-components/` 目录下，`TanStack Router` 会自动将使用 `-` 前缀命名的文件和文件夹从路由生成中排除。

### 3. 如何调试路由问题？

- 使用 `TanStackRouterDevtools` 组件可视化路由状态
- 检查 `src/routeTree.gen.ts` 生成的路由树
- 查看浏览器开发者工具中的路由相关日志

## 相关链接

- [TanStack Router 官方文档](https://tanstack.com/router/latest/docs/framework/react/overview)
