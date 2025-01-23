# 多语言

本项目内置了多语言支持，基于 `i18next` 和 `react-i18next` 实现。你可以在 `src/locales/modules` 目录下添加多语言文件，项目会自动加载并应用。

## 配置说明

### 默认语言

默认语言配置为 `zh-CN`，可以在 `index.ts` 文件中通过 `defaultLanguage` 修改：

```typescript
// 默认使用的语言
const defaultLanguage = 'zh-CN';
```

### 语言资源

多语言资源文件位于 `src/locales/modules` 目录下，使用 JSON 格式定义语言内容。例如：

- **英文语言文件**：`en-US.json`

  ```json
  {
    "message": {
      "hello": "Hello"
    }
  }
  ```

- **中文语言文件**：`zh-CN.json`
  ```json
  {
    "message": {
      "hello": "你好"
    }
  }
  ```

这些资源会在 `index.ts` 文件中通过 `resources` 对象注册：

```typescript
const resources = {
  'en-US': { translation: enUsTrans },
  'zh-CN': { translation: zhCnTrans },
};
```

## 使用方式

### 在 React 组件中使用

在 React 组件中，可以通过 `useTranslation` Hook 使用多语言功能。例如：

```tsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const App = () => {
  const { t } = useTranslation();

  return <h1>{t('message.hello')}</h1>;
};

export default App;
```

### 在非组件文件中使用

在非组件文件（如工具函数或服务文件）中，可以直接使用 `i18n` 实例调用多语言方法。例如：

```typescript
import { i18n } from '@/locales';

console.log(i18n.t('message.hello'));
```

## 相关链接

- [i18next 官方文档](https://www.i18next.com/)
- [react-i18next 官方文档](https://react.i18next.com/)
