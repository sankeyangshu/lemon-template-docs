# 状态管理

本项目采用 **Zustand** + **@reactuses/core** 的状态管理方案，提供了轻量、灵活、类型安全的状态管理解决方案。

## 技术方案

本项目采用以下技术实现状态管理功能：

- **Zustand** - 轻量级的 React 状态管理库，基于 Hooks，简单易用
- **zustand/middleware** - Zustand 中间件，提供持久化、Immer 等功能
- **@reactuses/core** - 强大的 React Hooks 工具集，提供丰富的状态管理工具

这种组合提供了：

- 🪶 **轻量简单** - Zustand 体积小，API 简洁，学习成本低
- 🔧 **灵活扩展** - 支持中间件扩展，满足各种需求
- 🎯 **类型安全** - 完整的 TypeScript 支持
- 💾 **状态持久化** - 内置持久化中间件，自动同步到 LocalStorage
- ⚡ **性能优化** - 精准的订阅机制，避免不必要的重渲染
- 🛠️ **开发体验** - 无需 Provider 包裹，随用随取

## Zustand

Zustand 是一个轻量级的 React 状态管理库，使用简单，性能出色。

### 核心特性

- **极简 API** - 只需要一个 create 函数即可创建 store
- **无需 Provider** - 不需要在组件树顶层包裹 Provider
- **TypeScript 友好** - 完整的类型推导
- **性能优异** - 基于 subscription 的精准更新
- **中间件支持** - 内置多种中间件（持久化、Immer、DevTools 等）
- **React 外使用** - 可以在 React 组件外部使用

### 创建 Store

在 `src/store` 目录下创建 store 文件：

```typescript
// src/store/counter.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * 计数器 Store 类型定义
 */
export interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

/**
 * 计数器 Store
 */
export const useCounterStore = create<CounterState>()(
  persist(
    set => ({
      // 状态
      count: 0,

      // Actions
      increment: () => set(state => ({ count: state.count + 1 })),
      decrement: () => set(state => ({ count: state.count - 1 })),
      reset: () => set({ count: 0 }),
    }),
    {
      name: 'counter-storage', // LocalStorage 键名
    }
  )
);
```

**代码说明：**

- `create` - 创建 store 的核心函数
- `persist` - 持久化中间件，自动同步状态到 LocalStorage
- `set` - 更新状态的函数
- `name` - 持久化存储的键名

### 基础使用

在组件中使用 store：

```tsx
import { useCounterStore } from '@/store/counter';

function Counter() {
  // 方式1：直接获取整个 store
  const store = useCounterStore();

  return (
    <div>
      <h2>
        计数:
        {store.count}
      </h2>
      <button onClick={store.increment}>+1</button>
      <button onClick={store.decrement}>-1</button>
      <button onClick={store.reset}>重置</button>
    </div>
  );
}
```

### 选择性订阅

使用选择器避免不必要的重渲染：

```tsx
import { useCounterStore } from '@/store/counter';

function Counter() {
  // 方式2：选择特定状态（推荐）
  const count = useCounterStore(state => state.count);
  const increment = useCounterStore(state => state.increment);

  return (
    <div>
      <h2>
        计数:
        {count}
      </h2>
      <button onClick={increment}>+1</button>
    </div>
  );
}
```

### useShallow 防止重渲染

使用 `useShallow` 优化多个状态的选择：

```tsx
import { useShallow } from 'zustand/react/shallow';
import { useCounterStore } from '@/store/counter';

function Counter() {
  // 方式3：使用 useShallow（多个状态时推荐）
  const { count, increment, decrement, reset } = useCounterStore(
    useShallow(state => ({
      count: state.count,
      increment: state.increment,
      decrement: state.decrement,
      reset: state.reset,
    }))
  );

  return (
    <div>
      <h2>
        计数:
        {count}
      </h2>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
      <button onClick={reset}>重置</button>
    </div>
  );
}
```

**useShallow 的作用：**

- 浅比较选择的状态对象
- 避免因对象引用变化导致的不必要重渲染
- 多个状态选择时必备

### 异步 Actions

Store 支持异步操作：

```typescript
// src/store/user.ts
import type { LoginParams, UserInfo } from '@/api/system/user';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { postLoginAPI } from '@/api/system/user';

export interface UserState {
  token: string;
  userInfo: UserInfo | null;
  setToken: (token: string) => void;
  setUserInfo: (userInfo: UserInfo) => void;
  login: (params: LoginParams) => Promise<void>;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    set => ({
      token: '',
      userInfo: null,

      setToken: (token: string) => set({ token }),

      setUserInfo: (userInfo: UserInfo) => set({ userInfo }),

      // 异步登录
      login: async (params: LoginParams) => {
        const { username, password } = params;
        const { token, user } = await postLoginAPI({
          username: username.trim(),
          password,
        });

        set({ token, userInfo: user });
      },

      // 退出登录
      logout: () => set({ token: '', userInfo: null }),
    }),
    {
      name: 'LEMON-REACT_userStorage',
    }
  )
);
```

**使用异步 Action：**

```tsx
import { useUserStore } from '@/store/user';

function LoginForm() {
  const login = useUserStore(state => state.login);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: LoginParams) => {
    try {
      setLoading(true);
      await login(values);
      console.log('登录成功');
    }
    catch (error) {
      console.error('登录失败', error);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* 表单内容 */}
      <button type="submit" disabled={loading}>
        {loading ? '登录中...' : '登录'}
      </button>
    </form>
  );
}
```

### 在组件外使用

Zustand store 可以在 React 组件外使用：

```typescript
// 直接调用 store
import { useUserStore } from '@/store/user';

// 获取状态
const token = useUserStore.getState().token;

// 调用 action
useUserStore.getState().logout();

// 订阅变化
const unsubscribe = useUserStore.subscribe(
  state => state.token,
  (token) => {
    console.log('Token 变化:', token);
  }
);

// 取消订阅
unsubscribe();
```

### 持久化配置

#### 自定义存储

```typescript
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    set => ({
      // 状态定义
    }),
    {
      name: 'app-storage',
      // 使用 sessionStorage
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
```

#### 部分持久化

只持久化部分状态：

```typescript
export const useStore = create(
  persist(
    set => ({
      token: '',
      tempData: null,
      // ...
    }),
    {
      name: 'app-storage',
      // 只持久化 token
      partialize: state => ({ token: state.token }),
    }
  )
);
```

#### 版本迁移

处理 store 结构变化：

```typescript
export const useStore = create(
  persist(
    set => ({
      count: 0,
      // ...
    }),
    {
      name: 'counter-storage',
      version: 1,
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          // 从 v0 迁移到 v1
          persistedState.count = 0;
        }
        return persistedState;
      },
    }
  )
);
```

## @reactuses/core

@reactuses/core 是一个强大的 React Hooks 工具集，提供了丰富的状态管理和副作用处理工具。

### 核心特性

- **丰富的 Hooks** - 提供 100+ 实用的 React Hooks
- **类型安全** - 完整的 TypeScript 支持
- **树摇优化** - 按需引入，减小打包体积
- **SSR 友好** - 支持服务端渲染
- **文档完善** - 详细的文档和示例

### 常用 Hooks

#### useToggle - 布尔值切换

```tsx
import { useToggle } from '@reactuses/core';

function ToggleDemo() {
  const [on, toggle] = useToggle(false);

  return (
    <div>
      <div>
        状态:
        {on ? 'ON' : 'OFF'}
      </div>
      <button onClick={() => toggle()}>切换</button>
      <button onClick={() => toggle(true)}>设为 ON</button>
      <button onClick={() => toggle(false)}>设为 OFF</button>
    </div>
  );
}
```

#### useBoolean - 布尔状态管理

```tsx
import { useBoolean } from '@reactuses/core';

function BooleanDemo() {
  const [value, { setTrue, setFalse, toggle }] = useBoolean(false);

  return (
    <div>
      <div>
        值:
        {String(value)}
      </div>
      <button onClick={setTrue}>设为 true</button>
      <button onClick={setFalse}>设为 false</button>
      <button onClick={toggle}>切换</button>
    </div>
  );
}
```

#### useLocalStorage - 本地存储

```tsx
import { useLocalStorage } from '@reactuses/core';

function StorageDemo() {
  const [name, setName] = useLocalStorage('user-name', 'Guest');

  return (
    <div>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="输入名字"
      />
      <p>
        存储的名字:
        {name}
      </p>
    </div>
  );
}
```

#### useDebounce - 防抖

```tsx
import { useDebounce } from '@reactuses/core';
import { useState } from 'react';

function SearchDemo() {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, 500);

  // debouncedValue 会在输入停止 500ms 后更新

  return (
    <div>
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="输入搜索内容"
      />
      <p>
        防抖后的值:
        {debouncedValue}
      </p>
    </div>
  );
}
```

#### useThrottle - 节流

```tsx
import { useThrottle } from '@reactuses/core';
import { useState } from 'react';

function ThrottleDemo() {
  const [value, setValue] = useState('');
  const throttledValue = useThrottle(value, 1000);

  // throttledValue 每秒最多更新一次

  return (
    <div>
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="输入内容"
      />
      <p>
        节流后的值:
        {throttledValue}
      </p>
    </div>
  );
}
```

#### useCounter - 计数器

```tsx
import { useCounter } from '@reactuses/core';

function CounterDemo() {
  const [count, { inc, dec, set, reset }] = useCounter(0);

  return (
    <div>
      <div>
        计数:
        {count}
      </div>
      <button onClick={() => inc()}>+1</button>
      <button onClick={() => inc(5)}>+5</button>
      <button onClick={() => dec()}>-1</button>
      <button onClick={() => set(10)}>设为 10</button>
      <button onClick={reset}>重置</button>
    </div>
  );
}
```

#### useInterval - 定时器

```tsx
import { useInterval } from '@reactuses/core';
import { useState } from 'react';

function IntervalDemo() {
  const [count, setCount] = useState(0);

  useInterval(() => {
    setCount(count + 1);
  }, 1000); // 每秒执行一次

  return (
    <div>
      计数:
      {count}
    </div>
  );
}
```

#### useMount / useUnmount - 生命周期

```tsx
import { useMount, useUnmount } from '@reactuses/core';

function LifecycleDemo() {
  useMount(() => {
    console.log('组件挂载');
  });

  useUnmount(() => {
    console.log('组件卸载');
  });

  return <div>查看控制台</div>;
}
```

### 更多 Hooks

@reactuses/core 提供了 100+ Hooks，涵盖：

- **状态管理** - useToggle、useBoolean、useCounter、useList、useMap 等
- **副作用** - useDebounce、useThrottle、useInterval、useTimeout 等
- **浏览器** - useLocalStorage、useSessionStorage、useCookie、useClipboard 等
- **元素** - useClickAway、useHover、useFocus、useScroll 等
- **传感器** - useMouse、useKeyboard、useNetwork、useGeolocation 等

完整列表请访问：[React Use 文档](https://www.reactuse.com/)

## 实战示例

### 用户认证管理

```tsx
// src/store/auth.ts
import type { LoginParams, UserInfo } from '@/api/auth';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getUserInfoAPI, loginAPI } from '@/api/auth';

export interface AuthState {
  token: string;
  userInfo: UserInfo | null;
  isLoading: boolean;
  setToken: (token: string) => void;
  setUserInfo: (userInfo: UserInfo) => void;
  login: (params: LoginParams) => Promise<void>;
  logout: () => void;
  refreshUserInfo: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: '',
      userInfo: null,
      isLoading: false,

      setToken: token => set({ token }),

      setUserInfo: userInfo => set({ userInfo }),

      login: async (params) => {
        set({ isLoading: true });
        try {
          const { token, user } = await loginAPI(params);
          set({ token, userInfo: user });
        }
        finally {
          set({ isLoading: false });
        }
      },

      logout: () => {
        set({ token: '', userInfo: null });
      },

      refreshUserInfo: async () => {
        const { token } = get();
        if (!token)
          return;

        try {
          const userInfo = await getUserInfoAPI();
          set({ userInfo });
        }
        catch (error) {
          console.error('刷新用户信息失败', error);
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: state => ({
        token: state.token,
        userInfo: state.userInfo,
      }),
    }
  )
);
```

### 购物车管理

```tsx
// src/store/cart.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find(i => i.id === item.id);

          if (existingItem) {
            // 如果已存在，增加数量
            return {
              items: state.items.map(i =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }

          // 不存在则添加新商品
          return {
            items: [...state.items, { ...item, quantity: 1 }],
          };
        });
      },

      removeItem: (id) => {
        set(state => ({
          items: state.items.filter(item => item.id !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        set(state => ({
          items: state.items.map(item =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      getTotalItems: () => {
        return get().items.reduce(
          (total, item) => total + item.quantity,
          0
        );
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
```

### 结合 @reactuses/core

```tsx
import { useBoolean, useDebounce } from '@reactuses/core';
import { useSearchStore } from '@/store/search';

function SearchComponent() {
  const [isSearching, { setTrue, setFalse }] = useBoolean(false);
  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebounce(keyword, 300);

  const performSearch = useSearchStore(state => state.search);

  useEffect(() => {
    if (!debouncedKeyword)
      return;

    setTrue();
    performSearch(debouncedKeyword)
      .finally(() => setFalse());
  }, [debouncedKeyword]);

  return (
    <div>
      <input
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        placeholder="搜索..."
      />
      {isSearching && <span>搜索中...</span>}
    </div>
  );
}
```

## 最佳实践

### 1. Store 拆分原则

```
// ✅ 好的做法 - 按功能模块拆分
src/store/
├── auth.ts      # 认证相关
├── cart.ts      # 购物车相关
├── theme.ts     # 主题相关
└── user.ts      # 用户信息相关

// ❌ 避免 - 所有状态放在一个 store
src/store/
└── index.ts     # 所有状态都在这里
```

### 2. 类型定义

```typescript
// ✅ 好的做法 - 完整的类型定义
export interface UserState {
  token: string;
  userInfo: UserInfo | null;
  setToken: (token: string) => void;
  login: (params: LoginParams) => Promise<void>;
}

export const useUserStore = create<UserState>()(set => ({
  // ...
}));

// ❌ 避免 - 缺少类型定义
export const useUserStore = create(set => ({
  token: '',
  // ...
}));
```

### 3. 使用 useShallow 优化

```tsx
// ✅ 好的做法 - 多个状态时使用 useShallow
const { count, increment } = useCounterStore(
  useShallow(state => ({
    count: state.count,
    increment: state.increment,
  }))
);

// ❌ 避免 - 直接解构（每次都会重新渲染）
const { count, increment } = useCounterStore();
```

### 4. Action 中使用 get 访问最新状态

```typescript
// ✅ 好的做法 - 使用 get 获取最新状态
create<State>()((set, get) => ({
  count: 0,
  increment: () => {
    const currentCount = get().count;
    set({ count: currentCount + 1 });
  },
}));

// ❌ 避免 - 闭包可能导致状态不是最新的
create<State>()(set => ({
  count: 0,
  increment: () => {
    set(state => ({ count: state.count + 1 })); // 这样也可以
  },
}));
```

### 5. 合理使用持久化

```typescript
// ✅ 好的做法 - 只持久化必要的数据
persist(
  set => ({
    token: '',
    tempData: null,
    // ...
  }),
  {
    name: 'auth-storage',
    partialize: state => ({
      token: state.token,
      // 不持久化 tempData
    }),
  }
);

// ❌ 避免 - 持久化所有数据（可能包含敏感或临时数据）
persist(
  set => ({
    // 所有数据都会被持久化
  }),
  {
    name: 'app-storage',
  }
);
```

### 6. 异步错误处理

```typescript
// ✅ 好的做法 - 完善的错误处理
create(set => ({
  login: async (params) => {
    set({ isLoading: true, error: null });
    try {
      const data = await loginAPI(params);
      set({ token: data.token, userInfo: data.user });
    }
    catch (error) {
      set({ error: error.message });
      throw error; // 重新抛出，让调用方处理
    }
    finally {
      set({ isLoading: false });
    }
  },
}));
```

```typescript
// ❌ 避免 - 吞掉错误
create(set => ({
  login: async (params) => {
    const data = await loginAPI(params);
    set({ token: data.token });
  },
}));
```

## 常见问题

### 1. 如何重置 Store？

```typescript
// 定义初始状态
const initialState = {
  count: 0,
  name: '',
};

export const useStore = create<State>()(
  set => ({
    ...initialState,
    reset: () => set(initialState),
  })
);

// 使用
const reset = useStore(state => state.reset);
reset();
```

### 2. 如何在 Store 之间共享状态？

```typescript
// 方式1：在一个 store 中引用另一个 store
export const useCartStore = create<CartState>()((set, get) => ({
  // ...
  checkout: () => {
    const token = useAuthStore.getState().token;
    if (!token) {
      console.log('请先登录');
    }
    // 执行结算逻辑
  },
}));

// 方式2：组合 stores
export function useCombinedStore() {
  const auth = useAuthStore();
  const cart = useCartStore();

  return {
    ...auth,
    ...cart,
  };
}
```

### 3. 如何订阅特定状态变化？

```typescript
// 在组件中订阅
useEffect(() => {
  const unsubscribe = useUserStore.subscribe(
    state => state.token,
    (token, prevToken) => {
      console.log('Token 变化:', prevToken, '->', token);
    }
  );

  return unsubscribe;
}, []);
```

### 4. 持久化数据迁移？

```typescript
export const useStore = create(
  persist(
    set => ({
      count: 0,
    }),
    {
      name: 'app-storage',
      version: 2,
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          // v0 -> v1: 添加新字段
          persistedState.newField = 'default';
        }
        if (version === 1) {
          // v1 -> v2: 重命名字段
          persistedState.count = persistedState.counter;
          delete persistedState.counter;
        }
        return persistedState;
      },
    }
  )
);
```

### 5. 如何测试 Zustand Store？

```typescript
import { act, renderHook } from '@testing-library/react';
import { useCounterStore } from './counter';

describe('Counter Store', () => {
  beforeEach(() => {
    // 重置 store
    useCounterStore.setState({ count: 0 });
  });

  it('应该增加计数', () => {
    const { result } = renderHook(() => useCounterStore());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  it('应该减少计数', () => {
    const { result } = renderHook(() => useCounterStore());

    act(() => {
      result.current.increment();
      result.current.decrement();
    });

    expect(result.current.count).toBe(0);
  });
});
```

### 6. 性能优化技巧？

```tsx
// ✅ 使用选择器只订阅需要的状态
const count = useCounterStore(state => state.count);

// ✅ 使用 useShallow 比较对象
const { count, increment } = useCounterStore(
  useShallow(state => ({
    count: state.count,
    increment: state.increment,
  }))
);

// ✅ 使用 React.memo 包裹组件
const Counter = memo(() => {
  const count = useCounterStore(state => state.count);
  return <div>{count}</div>;
});

// ❌ 避免在 render 中创建新对象
const value = useCounterStore(state => ({
  count: state.count, // 每次都是新对象
}));
```

## 相关链接

- [Zustand 官方文档](https://zustand.docs.pmnd.rs/getting-started/introduction)
- [@reactuses/core 官方文档](https://www.reactuse.com/)
