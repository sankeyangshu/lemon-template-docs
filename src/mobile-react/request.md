# 网络请求

本项目内置了基于 Axios 的请求封装，结合 **TanStack Query** 进行数据状态管理，提供了一套完整的数据请求解决方案。当然您可以使用任何您喜欢的第三方请求库来获取数据。

## 技术选型

本项目采用以下技术栈处理网络请求和数据管理：

- **Axios** - 基于 Promise 的 HTTP 客户端，用于底层请求处理
- **TanStack Query** - 强大的异步状态管理库，处理数据获取、缓存、同步和更新

这种组合提供了：

- 🚀 **类型安全** - 完整的 TypeScript 支持
- 🔄 **自动缓存** - 智能的数据缓存和失效机制
- ⚡ **性能优化** - 请求去重、后台更新、窗口聚焦刷新
- 🛡️ **错误处理** - 统一的错误处理和重试机制
- 🎯 **开发体验** - 内置 DevTools 可视化调试

## axios封装

### 项目结构

```
src/lib/request/
├── index.ts      # HttpClient 和请求方法封装
├── error.ts      # 错误处理和自定义错误类
└── status.ts     # HTTP 状态码常量定义
```

### 核心功能

#### 1. HttpClient 类

位于 `src/lib/request/index.ts`，提供了基于 Axios 的增强型 HTTP 客户端。

**主要特性：**

- ✨ **灵活的拦截器配置** - 支持自定义请求/响应拦截器
- 🔐 **自动 Token 管理** - 从 Zustand Store 自动获取并添加 Token
- 🎯 **类型安全** - 完整的 TypeScript 类型支持
- 🛠️ **实例管理** - 支持创建多个独立的 HTTP 客户端实例
- 📦 **统一响应格式** - 规范化的响应数据结构

**基础配置：**

```typescript
// 默认配置
const defaultConfig = {
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
};

// 创建默认实例
export const http = new HttpClient({
  baseURL: import.meta.env.VITE_SERVICE_BASE_URL,
});
```

**自定义实例：**

```typescript
import HttpClient from '@/lib/request';

// 创建自定义实例
const customHttp = new HttpClient(
  {
    baseURL: 'https://api.example.com',
    timeout: 10000,
  },
  {
    // 自定义请求拦截器
    requestInterceptor: (config) => {
      // 添加自定义逻辑
      config.headers['X-Custom-Header'] = 'value';
      return config;
    },
    // 自定义响应拦截器
    responseInterceptor: (response) => {
      // 添加自定义处理
      return response.data;
    },
  }
);
```

#### 2. 错误处理机制

位于 `src/lib/request/error.ts`，提供了完整的错误处理方案。

**自定义错误类：**

```typescript
// HttpError 类包含丰富的错误信息
export class HttpError extends Error {
  public readonly code: number; // 错误状态码
  public readonly data?: unknown; // 错误数据
  public readonly timestamp: string; // 错误时间戳
  public readonly url?: string; // 请求 URL
  public readonly method?: string; // 请求方法

  // 转换为日志数据
  toLogData(): ErrorLogData {
    // ...
  }
}
```

**错误处理函数：**

```typescript
// 统一错误处理
export function handleError(error: AxiosError<ErrorResponse>): never {
  // 处理取消的请求
  if (Axios.isCancel(error)) {
    // ...
  }

  // 处理网络错误
  if (!error.response) {
    // ...
  }

  // 处理 HTTP 状态码错误
  // ...
}

// 显示错误消息
export function showError(error: HttpError, showMessage: boolean = true) {
  if (showMessage) {
    Toast.fail(error.message);
  }
  console.error('[HTTP Error]', error.toLogData());
}

// 显示成功消息
export function showSuccess(message: string, showMessage: boolean = true) {
  if (showMessage) {
    Toast.success(message);
  }
}
```

#### 3. HTTP 状态码

位于 `src/lib/request/status.ts`，定义了常用的 HTTP 状态码常量。

```typescript
export const ApiStatus = {
  success: 200, // 成功
  error: 400, // 错误
  unauthorized: 401, // 未授权
  forbidden: 403, // 禁止访问
  notFound: 404, // 未找到
  methodNotAllowed: 405, // 方法不允许
  requestTimeout: 408, // 请求超时
  internalServerError: 500, // 服务器错误
  notImplemented: 501, // 未实现
  badGateway: 502, // 网关错误
  serviceUnavailable: 503, // 服务不可用
  gatewayTimeout: 504, // 网关超时
  httpVersionNotSupported: 505, // HTTP版本不支持
} as const;
```

### 请求方法

HttpClient 提供了常用的 HTTP 请求方法：

```typescript
// GET 请求
http.get<ResponseType>(url, config);

// POST 请求
http.post<ResponseType>(url, data, config);

// PUT 请求
http.put<ResponseType>(url, data, config);

// DELETE 请求
http.delete<ResponseType>(url, config);

// PATCH 请求
http.patch<ResponseType>(url, data, config);
```

### API 接口定义

推荐的 API 接口定义方式：

```typescript
// src/api/system/index.ts
import { http } from '@/lib/request';

// 定义请求参数类型
export interface LoginParams {
  username: string;
  password: string;
}

// 定义响应数据类型
export interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

// 定义 API 接口
const api = {
  login: '/auth/login', // 用户登录接口
};

/**
 * 用户登录
 * @param data 登录请求参数
 * @returns 登录结果
 */
export async function postLoginAPI(data: LoginParams) {
  return http.post<LoginResponse>(api.login, data);
};
```

## TanStack Query

TanStack Query（原 React Query）是一个强大的异步状态管理库，用于在 React 应用中获取、缓存、同步和更新服务端状态。

### 核心特性

- 🔄 **自动缓存管理** - 智能的缓存策略和失效机制
- ⚡ **后台自动更新** - 窗口聚焦、网络重连时自动刷新数据
- 🎯 **请求去重** - 相同请求自动合并，避免重复请求
- 📊 **分页和无限滚动** - 内置对分页和无限滚动的支持
- 🛠️ **开发者工具** - 强大的 DevTools 可视化调试
- 💪 **TypeScript 支持** - 完整的类型推导和类型安全

### 配置

项目已完成 TanStack Query 的基础配置，位于 `src/App.tsx`：

```tsx
// 如果你需要更多配置，请参考此处示例

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// 创建 QueryClient 实例
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 数据保持新鲜的时间: 5分钟
      gcTime: 1000 * 60 * 10, // 缓存保留时间: 10分钟
      retry: 3, // 失败重试次数
      refetchOnWindowFocus: true, // 窗口聚焦时重新获取数据
      refetchOnReconnect: true, // 网络重连时重新获取数据
    },
    mutations: {
      retry: 1, // 变更失败重试次数
      onError: (error) => {
        console.error('Mutation error:', error);
      },
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* 你的应用内容 */}
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
```

### useQuery - 数据查询

`useQuery` 用于获取数据，自动处理加载状态、错误处理和缓存。

**基础用法：**

```tsx
import { useQuery } from '@tanstack/react-query';
import { systemApi } from '@/api/system';

function UserProfile() {
  const {
    data, // 响应数据
    error, // 错误信息
    isLoading, // 加载状态
    isError, // 是否错误
    isSuccess, // 是否成功
    refetch, // 手动刷新
  } = useQuery({
    queryKey: ['user', 'info'], // 查询键（用于缓存和识别）
    queryFn: () => systemApi.getUserInfo(), // 查询函数
  });

  if (isLoading) {
    return <div>加载中...</div>;
  }

  if (isError) {
    return (
      <div>
        错误:
        {error.message}
      </div>
    );
  }

  return (
    <div>
      <h1>
        欢迎,
        {data.user.username}
        !
      </h1>
      <button onClick={() => refetch()}>刷新</button>
    </div>
  );
}
```

**高级配置：**

```tsx
const { data } = useQuery({
  queryKey: ['todos', filter],
  queryFn: () => fetchTodos(filter),
  staleTime: 1000 * 60 * 5, // 5分钟内数据保持新鲜
  gcTime: 1000 * 60 * 10, // 10分钟后清除缓存
  retry: 3, // 失败重试3次
  retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  enabled: !!userId, // 条件性执行
  refetchOnMount: true, // 组件挂载时刷新
  refetchOnWindowFocus: false, // 禁用窗口聚焦刷新
  refetchInterval: 1000 * 60, // 每分钟自动刷新
  select: data => data.items, // 数据转换
  onSuccess: (data) => {
    console.log('数据获取成功', data);
  },
  onError: (error) => {
    console.error('数据获取失败', error);
  },
});
```

**依赖查询：**

```tsx
// 先获取用户信息
const { data: user } = useQuery({
  queryKey: ['user'],
  queryFn: fetchUser,
});

// 再根据用户 ID 获取订单
const { data: orders } = useQuery({
  queryKey: ['orders', user?.id],
  queryFn: () => fetchOrders(user!.id),
  enabled: !!user?.id, // 只有在 user.id 存在时才执行
});
```

### useMutation - 数据变更

`useMutation` 用于执行创建、更新、删除等数据变更操作。

**基础用法：**

```tsx
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { systemApi } from '@/api/system';

function LoginForm() {
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: systemApi.login,
    onSuccess: (data) => {
      // 登录成功后的处理
      console.log('登录成功', data);

      // 使相关查询失效，触发重新获取
      queryClient.invalidateQueries({ queryKey: ['user'] });

      // 或直接设置缓存数据
      queryClient.setQueryData(['user', 'info'], data.user);
    },
    onError: (error) => {
      console.error('登录失败', error);
    },
  });

  const handleSubmit = (values: LoginParams) => {
    loginMutation.mutate(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* 表单内容 */}
      <button
        type="submit"
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? '登录中...' : '登录'}
      </button>
      {loginMutation.isError && (
        <div>
          错误:
          {loginMutation.error.message}
        </div>
      )}
    </form>
  );
}
```

**乐观更新：**

```typescript
const updateTodoMutation = useMutation({
  mutationFn: updateTodo,
  // 在请求发送前乐观更新 UI
  onMutate: async (newTodo) => {
    // 取消相关的查询，避免覆盖乐观更新
    await queryClient.cancelQueries({ queryKey: ['todos'] });

    // 保存之前的数据以便回滚
    const previousTodos = queryClient.getQueryData(['todos']);

    // 乐观更新
    queryClient.setQueryData(['todos'], old =>
      old.map(todo => todo.id === newTodo.id ? newTodo : todo));

    // 返回上下文对象
    return { previousTodos };
  },
  // 如果请求失败，使用 onMutate 返回的上下文回滚
  onError: (err, newTodo, context) => {
    console.error('更新失败:', err);
    queryClient.setQueryData(['todos'], context.previousTodos);
  },
  // 请求完成后（成功或失败）刷新数据
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ['todos'] });
  },
});
```

**mutateAsync 使用：**

```tsx
// mutate: 触发变更但不返回 Promise
loginMutation.mutate(data);

// mutateAsync: 返回 Promise，可以使用 async/await
try {
  const result = await loginMutation.mutateAsync(data);
  console.log('登录成功', result);
  navigate('/dashboard');
}
catch (error) {
  console.error('登录失败', error);
}
```

### useQueries - 并行查询

当需要同时获取多个不相关的数据时，使用 `useQueries`：

```tsx
import { useQueries } from '@tanstack/react-query';

function Dashboard() {
  const results = useQueries({
    queries: [
      {
        queryKey: ['user'],
        queryFn: fetchUser,
      },
      {
        queryKey: ['todos'],
        queryFn: fetchTodos,
      },
      {
        queryKey: ['posts'],
        queryFn: fetchPosts,
      },
    ],
  });

  // results 是一个数组，包含每个查询的结果
  const [userQuery, todosQuery, postsQuery] = results;

  if (results.some(result => result.isLoading)) {
    return <div>加载中...</div>;
  }

  return (
    <div>
      <UserInfo user={userQuery.data} />
      <TodoList todos={todosQuery.data} />
      <PostList posts={postsQuery.data} />
    </div>
  );
}
```

### 缓存管理

TanStack Query 提供了强大的缓存管理能力：

```tsx
import { useQueryClient } from '@tanstack/react-query';

function CacheManager() {
  const queryClient = useQueryClient();

  // 使查询失效，触发重新获取
  const invalidateUser = () => {
    queryClient.invalidateQueries({ queryKey: ['user'] });
  };

  // 手动设置缓存数据
  const updateUserCache = (newData) => {
    queryClient.setQueryData(['user', 'info'], newData);
  };

  // 获取缓存数据
  const getUserCache = () => {
    const data = queryClient.getQueryData(['user', 'info']);
    console.log('缓存数据:', data);
  };

  // 清除所有缓存
  const clearAllCache = () => {
    queryClient.clear();
  };

  // 移除特定查询的缓存
  const removeUserCache = () => {
    queryClient.removeQueries({ queryKey: ['user'] });
  };

  // 预取数据
  const prefetchUser = async () => {
    await queryClient.prefetchQuery({
      queryKey: ['user', 'info'],
      queryFn: fetchUser,
    });
  };

  return (
    <div>
      <button onClick={invalidateUser}>使用户数据失效</button>
      <button onClick={getUserCache}>获取缓存数据</button>
      <button onClick={prefetchUser}>预取用户数据</button>
    </div>
  );
}
```

### 分页查询

TanStack Query 对分页有很好的支持：

```tsx
function TodoList() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isPreviousData } = useQuery({
    queryKey: ['todos', page],
    queryFn: () => fetchTodos({ page, limit: 10 }),
    keepPreviousData: true, // 保留上一页数据，避免闪烁
  });

  return (
    <div>
      {isLoading
        ? (
            <div>加载中...</div>
          )
        : (
            <>
              <ul>
                {data.items.map(todo => (
                  <li key={todo.id}>{todo.title}</li>
                ))}
              </ul>

              <div>
                <button
                  onClick={() => setPage(old => Math.max(old - 1, 1))}
                  disabled={page === 1}
                >
                  上一页
                </button>

                <span>
                  第
                  {page}
                  {' '}
                  页
                </span>

                <button
                  onClick={() => setPage(old => old + 1)}
                  disabled={isPreviousData || !data.hasMore}
                >
                  下一页
                </button>
              </div>
            </>
          )}
    </div>
  );
}
```

### 无限滚动

使用 `useInfiniteQuery` 实现无限滚动：

```tsx
import { useInfiniteQuery } from '@tanstack/react-query';

function InfiniteList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['todos', 'infinite'],
    queryFn: ({ pageParam = 1 }) => fetchTodos({ page: pageParam }),
    getNextPageParam: (lastPage, pages) => {
      // 返回下一页的参数，如果没有更多数据返回 undefined
      return lastPage.hasMore ? pages.length + 1 : undefined;
    },
  });

  if (isLoading) {
    return <div>加载中...</div>;
  }

  return (
    <div>
      {data.pages.map((page, i) => (
        <div key={i}>
          {page.items.map(todo => (
            <div key={todo.id}>{todo.title}</div>
          ))}
        </div>
      ))}

      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage
          ? '加载中...'
          : hasNextPage
            ? '加载更多'
            : '没有更多了'}
      </button>
    </div>
  );
}
```

### 开发者工具

项目已集成 TanStack Query DevTools，在开发环境下自动显示：

```tsx
import { TanStackDevtools } from '@tanstack/react-devtools';
import { TanStackQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
  return (
    <>
      <RouterProvider router={router} />

      {/* 开发环境下显示 DevTools */}
      {import.meta.env.MODE === 'development' && (
        <TanStackDevtools
          config={{ position: 'bottom-right' }}
          plugins={[
            {
              name: 'TanStack Query',
              render: <TanStackQueryDevtools />,
              defaultOpen: false,
            },
          ]}
        />
      )}
    </>
  );
}
```

DevTools 提供：

- 📊 查询状态可视化
- 🔍 实时查看缓存数据
- ⚡ 手动触发重新获取
- 🎯 查看查询依赖关系

## 最佳实践

### 1. 查询键设计

```tsx
// ❌ 不好的做法 - 字符串形式
useQuery({ queryKey: 'todos', queryFn: fetchTodos });

// ✅ 好的做法 - 数组形式，支持层级和参数
useQuery({
  queryKey: ['todos'], // 所有待办事项
  queryFn: fetchTodos
});

useQuery({
  queryKey: ['todos', { status: 'active' }], // 筛选条件
  queryFn: () => fetchTodos({ status: 'active' })
});

useQuery({
  queryKey: ['todos', todoId], // 单个待办事项
  queryFn: () => fetchTodo(todoId)
});

// 推荐的查询键结构
// ['entity', 'list']           - 实体列表
// ['entity', 'list', filters]  - 带筛选的列表
// ['entity', 'detail', id]     - 单个实体详情
// ['entity', id, 'relation']   - 实体的关联数据
```

### 2. 类型安全的 API 定义

```tsx
// src/api/types.ts
// src/api/todo.ts
import type { ResponseData } from '@/lib/request';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export interface CreateTodoInput {
  title: string;
}

export interface UpdateTodoInput {
  title?: string;
  completed?: boolean;
}

const api = {
  list: '/todos/list',
  get: '/todos/get',
  create: '/todos/create',
  update: '/todos/update',
  delete: '/todos/delete',
};

export async function getListAPI() {
  return http.get<Todo>(api.list);
};

export async function getByIdAPI(id: string) {
  return http.get<Todo>(`${api.get}/${id}`);
};

export async function createTodoAPI(data: CreateTodoInput) {
  return http.post<Todo>(api.create, data);
};

export async function updateTodoAPI(id: string, data: CreateTodoInput) {
  return http.put<Todo>(`${api.update}/${id}`, data);
};

export async function deleteTodoAPI(id: string) {
  return http.delete<void>(`${api.delete}/${id}`);
};
```

### 3. 自定义 Hook 封装

```tsx
import type { CreateTodoInput, UpdateTodoInput } from '@/api/types';
// src/hooks/useTodos.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { todoApi } from '@/api/todo';

// 查询待办事项列表
export function useTodos(filters?: { status?: string }) {
  return useQuery({
    queryKey: ['todos', filters],
    queryFn: () => todoApi.list(filters),
  });
}

// 查询单个待办事项
export function useTodo(id: string) {
  return useQuery({
    queryKey: ['todos', id],
    queryFn: () => todoApi.getById(id),
    enabled: !!id,
  });
}

// 创建待办事项
export function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: todoApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
}

// 更新待办事项
export function useUpdateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTodoInput }) =>
      todoApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      queryClient.invalidateQueries({ queryKey: ['todos', id] });
    },
  });
}

// 删除待办事项
export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: todoApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
}

// 使用示例
function TodoList() {
  const { data: todos, isLoading } = useTodos();
  const createTodo = useCreateTodo();
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();

  // ...
}
```

### 4. 错误处理

```tsx
// 全局错误处理
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: (error) => {
        if (isHttpError(error)) {
          console.error('[Query Error]', error.toLogData());
        }
      },
    },
    mutations: {
      onError: (error) => {
        if (isHttpError(error)) {
          showError(error);
        }
      },
    },
  },
});

// 组件级错误处理
function TodoList() {
  const { data, error, isError } = useQuery({
    queryKey: ['todos'],
    queryFn: todoApi.list,
    retry: (failureCount, error) => {
      // 401 不重试
      if (isHttpError(error) && error.code === 401) {
        return false;
      }
      return failureCount < 3;
    },
  });

  if (isError) {
    return (
      <div>
        <h3>加载失败</h3>
        <p>{error.message}</p>
        <button onClick={() => refetch()}>重试</button>
      </div>
    );
  }

  // ...
}
```

### 5. 性能优化

```tsx
// 1. 使用 select 选项减少重新渲染
const { data: todoTitles } = useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
  select: data => data.map(todo => todo.title),
  // 只有 titles 变化时才重新渲染
});

// 2. 使用 keepPreviousData 避免加载闪烁
const { data, isPreviousData } = useQuery({
  queryKey: ['todos', page],
  queryFn: () => fetchTodos(page),
  keepPreviousData: true,
});

// 3. 预取下一页数据
const queryClient = useQueryClient();
function prefetchNextPage() {
  queryClient.prefetchQuery({
    queryKey: ['todos', page + 1],
    queryFn: () => fetchTodos(page + 1),
  });
}

// 4. 使用 initialData 避免加载状态
const { data } = useQuery({
  queryKey: ['todos', id],
  queryFn: () => fetchTodo(id),
  initialData: () => {
    // 从列表缓存中获取初始数据
    return queryClient
      .getQueryData(['todos'])
      ?.find(todo => todo.id === id);
  },
});

// 5. 合理设置 staleTime 和 gcTime
const { data } = useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
  staleTime: 1000 * 60 * 5, // 5分钟内认为数据是新鲜的
  gcTime: 1000 * 60 * 10, // 10分钟后清除缓存
});
```

## 常见问题

### 1. 如何取消请求？

```tsx
// Axios 支持取消请求
import axios from 'axios';

const { data } = useQuery({
  queryKey: ['todos'],
  queryFn: ({ signal }) => {
    // TanStack Query 会自动传入 AbortSignal
    return http.get('/todos', { signal });
  },
});
```

### 2. 如何处理请求依赖？

```tsx
// 使用 enabled 选项
const { data: user } = useQuery({
  queryKey: ['user'],
  queryFn: fetchUser,
});

const { data: posts } = useQuery({
  queryKey: ['posts', user?.id],
  queryFn: () => fetchUserPosts(user!.id),
  enabled: !!user?.id, // 只有 user.id 存在时才执行
});
```

### 3. 如何实现轮询？

```tsx
const { data } = useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
  refetchInterval: 1000 * 10, // 每10秒刷新一次
  refetchIntervalInBackground: true, // 后台也刷新
});
```

### 4. 如何处理多个同时发生的变更？

```tsx
// 使用 mutations 的 scope 选项
const mutation = useMutation({
  mutationFn: updateTodo,
  scope: {
    id: 'todo-updates', // 相同 scope 的变更会串行执行
  },
});
```

### 5. 如何在 Mutation 成功后立即更新缓存？

```tsx
const updateTodoMutation = useMutation({
  mutationFn: updateTodo,
  onSuccess: (updatedTodo) => {
    // 方法1: 直接更新缓存
    queryClient.setQueryData(['todos', updatedTodo.id], updatedTodo);

    // 方法2: 更新列表缓存
    queryClient.setQueryData(['todos'], old =>
      old.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo));

    // 方法3: 使查询失效，触发重新获取
    queryClient.invalidateQueries({ queryKey: ['todos'] });
  },
});
```

## 其他请求方案

虽然本项目推荐使用 Axios + TanStack Query，但你也可以根据需求选择其他方案：

### Fetch API

现代浏览器原生支持：

```tsx
const { data } = useQuery({
  queryKey: ['todos'],
  queryFn: async () => {
    const response = await fetch('/api/todos');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  },
});
```

### SWR

另一个流行的数据获取库：

```tsx
import useSWR from 'swr';

function TodoList() {
  const { data, error, mutate } = useSWR('/api/todos', fetcher);

  if (error)
    return <div>加载失败</div>;
  if (!data)
    return <div>加载中...</div>;

  return <div>{/* 渲染数据 */}</div>;
}
```

## 相关链接

- [TanStack Query 官方文档](https://tanstack.com/query/latest/docs/framework/react/overview)
- [Axios 官方文档](https://axios-http.com/)
