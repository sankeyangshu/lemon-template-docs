# State

This project uses `zustand` as the state management tool, combined with the persistence storage functionality provided by `zustand/middleware`. Below is an example of counter management, covering state definition, operation methods, and persistence storage configuration.

## Example Code

Here's the `zustand` configuration for counter management, used to manage count state and its operations.

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Counter store type
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
      count: 0, // Initial counter value

      increment: () => set((state) => ({ count: state.count + 1 })), // Increase count
      decrement: () => set((state) => ({ count: state.count - 1 })), // Decrease count
      reset: () => set({ count: 0 }), // Reset count
    }),
    {
      // Persistence storage
      name: 'countStorage', // Local storage name
    }
  )
);
```

## Description

### State Fields

- **`count`**: Current count value, defaults to `0`.

### Methods

- **`increment`**: Increase count value, adds `1` to current value.
- **`decrement`**: Decrease count value, subtracts `1` from current value.
- **`reset`**: Reset count value to `0`.

### Persistence Storage

Implements state persistence through the `persist` method from `zustand/middleware`:

- **Storage Name**: `countStorage`
- **Storage Method**: Uses `localStorage` by default, can be customized according to needs.

## Usage

### Import State Management

In components where you need to use counter state, directly get state and methods through `useCountStore`. For example:

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
      <h1>Current Count: {count}</h1>
      <button onClick={increment}>Increase</button>
      <button onClick={decrement}>Decrease</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default Counter;
```

## Notes

1. **Persistence Storage Configuration**:

   - Persistence storage uses `localStorage` by default. If you need to use other storage methods (like `sessionStorage`), you can specify `storage` in the `persist` configuration:
     ```typescript
     persist(
       (set) => ({
         // State definition
       }),
       {
         name: 'countStorage',
         storage: sessionStorage, // Use sessionStorage
       }
     );
     ```

2. **State Management Separation**:
   - Split state management files according to functional modules, for example, put counter management in `count.ts`, other modules (like user information, settings, etc.) can create corresponding `store` files separately.

## Related Links

- [Zustand Official Documentation](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [Zustand Persistence Middleware](https://docs.pmnd.rs/zustand/integrations/persisting-store-data)
