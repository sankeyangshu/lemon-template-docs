# 状态

模版已经内置了 `Pinia` + `pinia-plugin-persistedstate`(数据持久化插件)，并提供一个简单的示例。

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
    // 如果需要持久化就写 true, 不需要持久化就写 false（或者去掉这个配置项）
    persist: true,
  }
);
```

## 相关链接

- [Pinia 官方文档](https://pinia.vuejs.org/zh/)
