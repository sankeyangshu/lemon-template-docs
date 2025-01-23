# 状态

本项目使用了 `zustand` 作为状态管理工具，并结合了 `zustand/middleware` 提供的持久化存储功能。以下是一个计数器管理的示例，涵盖了状态定义、操作方法以及持久化存储的配置。

## 示例代码

以下是计数器管理的 `zustand` 配置，用于管理计数状态及其操作。

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * 计数器store类型
 */
export interface CountStoreType {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export const useCountStore = create<CountStoreType>()(
  persist(
    (set) => ({
      count: 0, // 计数器初始值

      increment: () => set((state) => ({ count: state.count + 1 })), // 增加计数
      decrement: () => set((state) => ({ count: state.count - 1 })), // 减少计数
      reset: () => set({ count: 0 }), // 重置计数
    }),
    {
      // 进行持久化存储
      name: 'countStorage', // 本地存储的名称
    }
  )
);
```

## 说明

### 状态字段

- **`count`**：当前计数值，默认为 `0`。

### 方法

- **`increment`**：增加计数值，当前值加 `1`。
- **`decrement`**：减少计数值，当前值减 `1`。
- **`reset`**：重置计数值为 `0`。

### 持久化存储

通过 `zustand/middleware` 的 `persist` 方法实现状态持久化：

- **存储名称**：`countStorage`
- **存储方式**：默认使用 `localStorage`，可根据需求自定义存储方式。

## 使用方式

### 引入状态管理

在需要使用计数器状态的组件中，直接通过 `useCountStore` 获取状态和方法。例如：

```typescript
import React from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useCountStore } from '@/store/count';

const Counter = () => {
   const { count, increment, decrement, reset } = useCountStore(useShallow((state) => ({
    count: state.count,
    increment: state.increment,
    decrement: state.decrement,
    reset: state.reset,
   })));

  return (
    <div>
      <h1>当前计数：{count}</h1>
      <button onClick={increment}>增加</button>
      <button onClick={decrement}>减少</button>
      <button onClick={reset}>重置</button>
    </div>
  );
};

export default Counter;
```

## 注意事项

1. **持久化存储的配置**：

   - 持久化存储默认使用 `localStorage`，如果需要使用其他存储方式（如 `sessionStorage`），可以在 `persist` 的配置中指定 `storage`：
     ```typescript
     persist(
       (set) => ({
         // 状态定义
       }),
       {
         name: 'countStorage',
         storage: sessionStorage, // 使用 sessionStorage
       }
     );
     ```

2. **状态管理的分离**：
   - 根据功能模块拆分状态管理文件，例如将计数器管理放在 `count.ts`，其他模块（如用户信息、设置等）可以单独创建对应的 `store` 文件。

## 相关链接

- [Zustand 官方文档](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [Zustand 持久化中间件](https://docs.pmnd.rs/zustand/integrations/persisting-store-data)
