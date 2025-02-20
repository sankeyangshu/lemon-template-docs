# 多语言

模版内置了多语言支持，你可以在 `src/locales/modules` 目录下添加多语言文件，模版会自动加载并应用。

`vue` 组件 里面使用方式如下：

```vue
<template>
  <h1>{{ $t('message.hello') }}</h1>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

console.log(t('message.hello'));
</script>
```

非vue组件 里面怎么使用呢？比如 ts 文件，使用方式如下：

```ts
import { i18n } from '@/locales';

console.log(i18n.global.t('message.hello'));
```

## 相关链接

- [Vue I18n 官方文档](https://vue-i18n.intlify.dev/)
