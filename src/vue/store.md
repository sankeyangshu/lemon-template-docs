# State

The template has built-in `Pinia` + `pinia-plugin-persistedstate` (data persistence plugin), and provides a simple example.

```ts
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCountStore = defineStore(
  'count',
  () => {
    const count = ref(0);
    const increment = () => {
      count.value++;
    };
    const decrement = () => {
      count.value--;
    };
    const reset = () => {
      count.value = 0;
    };
    return {
      count,
      decrement,
      increment,
      reset,
    };
  },
  {
    // Write true if persistence is needed, write false (or remove this configuration item) if persistence is not needed
    persist: true,
  }
);
```

## Related Links

- [Pinia Official Documentation](https://pinia.vuejs.org/)
