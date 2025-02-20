# Internationalization

The template has built-in multi-language support. You can add language files in the `src/locales/modules` directory, and the template will automatically load and apply them.

Here's how to use it in `vue` components:

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

How to use it in non-vue components? For example, in ts files, use it like this:

```ts
import { i18n } from 'locales';

console.log(i18n.global.t('message.hello'));
```

## Related Links

- [Vue I18n Official Documentation](https://vue-i18n.intlify.dev/)
