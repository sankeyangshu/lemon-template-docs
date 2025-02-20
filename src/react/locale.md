# Internationalization

This project has built-in multi-language support based on `i18next` and `react-i18next`. You can add language files in the `src/locales/modules` directory, and the project will automatically load and apply them.

## Configuration Description

### Default Language

The default language is set to `zh-CN`, which can be modified through `defaultLanguage` in the `index.ts` file:

```typescript
// Default language to use
const defaultLanguage = 'zh-CN';
```

### Language Resources

Multi-language resource files are located in the `src/locales/modules` directory, using JSON format to define language content. For example:

- **English language file**: `en-US.json`

  ```json
  {
    "message": {
      "hello": "Hello"
    }
  }
  ```

- **Chinese language file**: `zh-CN.json`
  ```json
  {
    "message": {
      "hello": "你好"
    }
  }
  ```

These resources are registered through the `resources` object in the `index.ts` file:

```typescript
const resources = {
  'en-US': { translation: enUsTrans },
  'zh-CN': { translation: zhCnTrans },
};
```

## Usage

### Using in React Components

In React components, you can use multi-language functionality through the `useTranslation` Hook. For example:

```tsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const App = () => {
  const { t } = useTranslation();

  return <h1>{t('message.hello')}</h1>;
};

export default App;
```

### Using in Non-Component Files

In non-component files (such as utility functions or service files), you can directly call multi-language methods using the `i18n` instance. For example:

```typescript
import { i18n } from '@/locales';

console.log(i18n.t('message.hello'));
```

## Related Links

- [i18next Official Documentation](https://www.i18next.com/)
- [react-i18next Official Documentation](https://react.i18next.com/)
