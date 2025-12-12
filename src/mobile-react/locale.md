# 国际化

本项目内置了完善的国际化（i18n）解决方案，基于 **i18next** 和 **react-i18next** 实现，支持多语言切换、自动检测用户语言、类型安全等功能。

## 技术方案

本项目采用以下技术实现国际化功能：

- **i18next** - 强大的国际化框架，支持多种语言和命名空间
- **react-i18next** - i18next 的 React 集成库，提供 Hook 和组件支持
- **i18next-browser-languagedetector** - 浏览器语言检测插件，自动识别用户语言偏好

这种组合提供了：

- 🌍 **多语言支持** - 轻松添加和管理多种语言
- 🔄 **动态切换** - 运行时无缝切换语言
- 🎯 **类型安全** - 完整的 TypeScript 类型支持
- 📦 **自动检测** - 自动识别浏览器/系统语言
- 💾 **持久化** - 语言偏好自动保存到 LocalStorage
- ⚡ **按需加载** - 支持语言包懒加载（可选）

## 项目结构

```
src/locales/
├── modules/
│   ├── en-us.ts       # 英文语言包
│   └── zh-cn.ts       # 中文语言包
├── index.ts           # i18n 初始化和配置
└── locale.ts          # 语言资源注册
```

## 语言包定义

### 语言资源注册

位于 `src/locales/locale.ts`，注册所有语言包：

```typescript
import enUS from './modules/en-us';
import zhCN from './modules/zh-cn';

const resources: Record<App.I18n.LangType, { translation: App.I18n.I18nScheme }> = {
  'en-US': { translation: enUS },
  'zh-CN': { translation: zhCN },
};

export default resources;
```

### 语言包结构

每个语言包遵循统一的类型定义 `App.I18n.I18nScheme`，确保所有语言包结构一致：

```typescript
// src/locales/modules/zh-cn.ts
const local: App.I18n.I18nScheme = {
  // API 相关翻译
  api: {
    errMsg400: '请求失败！请您稍后重试',
    errMsg401: '登录失效！请您重新登录',
    errMsg403: '当前账号无权限访问！',
    // ...
  },
  // 系统相关翻译
  system: {
    title: 'Lemon 模版',
    loading: '加载中...',
    confirm: '确认',
    cancel: '取消',
    // ...
  },
  // 路由相关翻译
  router: {
    home: '首页',
    example: '示例',
    mine: '我的',
    // ...
  },
  // 页面相关翻译
  home: {
    info: '基于 React 生态系统的移动 Web 应用模板',
    // ...
  },
  // 登录相关翻译
  login: {
    username: '用户名',
    password: '密码',
    login: '登录',
    // ...
  },
};

export default local;
```

### 类型定义

项目使用 TypeScript 确保类型安全，语言包类型定义位于 `src/types/app.d.ts`：

```typescript
declare namespace App {
  namespace I18n {
    type LangType = 'zh-CN' | 'en-US';

    interface I18nScheme {
      api: {
        errMsg400: string;
        errMsg401: string;
        // ...
      };
      system: {
        title: string;
        loading: string;
        // ...
      };
      router: {
        home: string;
        example: string;
        // ...
      };
      // ...
    }
  }
}
```

## i18n 配置

### 初始化配置

位于 `src/locales/index.ts`：

```typescript
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { localStg } from '@/lib/storage';
import localeResources from './locale';

/**
 * 默认使用的语言
 */
export const defaultLanguage = localStg.getItem('language') || 'zh-CN';

/**
 * Setup plugin i18n
 * @descCN 设置国际化
 */
export async function setupI18n() {
  // 初始化时设置HTML lang属性，否则系统语言和设定不同时会弹出浏览器的翻译提示
  document.documentElement.lang = defaultLanguage;

  // 创建i18n实例
  await i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: localeResources,
      lng: defaultLanguage,
      fallbackLng: 'zh-CN',
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ['localStorage', 'navigator', 'htmlTag'], // 检测顺序
        caches: ['localStorage'], // 缓存到 localStorage
        lookupLocalStorage: localStg.getItemKey('language'), // LocalStorage 键名
      },
    });
}

export { i18n };
```

**配置说明：**

- `resources` - 语言资源配置
- `lng` - 默认语言
- `fallbackLng` - 回退语言（当翻译缺失时使用）
- `interpolation.escapeValue: false` - React 已经处理 XSS，无需转义
- `detection` - 语言检测配置
  - `order` - 检测顺序：优先从 localStorage 读取，然后浏览器语言，最后 HTML lang 属性
  - `caches` - 缓存位置
  - `lookupLocalStorage` - LocalStorage 键名

### 应用入口

在 `src/main.tsx` 中初始化：

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { setupI18n } from './locales';

async function bootstrap() {
  // 初始化国际化
  await setupI18n();

  // 其他初始化...

  const container = document.getElementById('root');
  if (!container)
    return;

  const root = createRoot(container);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

void bootstrap();
```

## 使用方式

### 在 React 组件中使用

使用 `useTranslation` Hook：

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();

  return (
    <div>
      {/* 基础用法 */}
      <h1>{t('system.title')}</h1>

      {/* 嵌套路径 */}
      <p>{t('home.info.title')}</p>
    </div>
  );
}
```

### 在工具函数中使用

直接使用 `i18n` 实例：

```typescript
import { i18n } from '@/locales';

// 错误处理
function getErrorMessage(status: number) {
  const errorMap: Record<number, string> = {
    400: 'api.errMsg400',
    401: 'api.errMsg401',
    403: 'api.errMsg403',
    // ...
  };

  return i18n.t(errorMap[status] || 'api.errMsgDefault');
}

// Toast 提示
function showToast(message: string) {
  Toast.success(i18n.t(message));
}
```

### 动态翻译

```tsx
import { useTranslation } from 'react-i18next';

function DynamicTranslation() {
  const { t } = useTranslation();

  // 动态键名
  const status = 'success';
  const message = t(`status.${status}`);

  // 变量插值
  const userName = 'John';
  const greeting = t('greeting', { name: userName });

  // 复数处理
  const count = 5;
  const itemsText = t('items', { count });

  return (
    <div>
      <p>{message}</p>
      <p>{greeting}</p>
      <p>{itemsText}</p>
    </div>
  );
}
```

## 语言切换

### 使用 LangProvider

项目封装了 `LangProvider` 组件，提供语言切换功能：

```tsx
import { useState } from 'react';
import { useLanguage } from '@/components/common/lang-provider';
import Picker from '@/components/custom/picker';

function LanguageSwitcher() {
  const { locale, localeOptions, setLocale } = useLanguage();
  const [showLangPicker, setShowLangPicker] = useState(false);

  return (
    <>
      {/* 当前语言显示 */}
      <div onClick={() => setShowLangPicker(true)}>
        当前语言:
        {localeOptions.find(item => item.value === locale)?.text}
      </div>

      {/* 语言选择器 */}
      <Picker
        visible={showLangPicker}
        columns={localeOptions}
        onConfirm={(lang) => {
          if (!Array.isArray(lang)) {
            setLocale(lang.value as App.I18n.LangType);
          }
        }}
        onClose={() => setShowLangPicker(false)}
      />
    </>
  );
}
```

### LangProvider API

```typescript
interface LanguageContext {
  locale: App.I18n.LangType; // 当前语言
  localeOptions: LocaleOption[]; // 可选语言列表
  setLocale: (lang: App.I18n.LangType) => void; // 切换语言
}

interface LocaleOption {
  value: App.I18n.LangType; // 语言代码
  text: string; // 语言显示名称
}
```

### 手动切换语言

```tsx
import { i18n } from '@/locales';

// 切换到英文
i18n.changeLanguage('en-US');

// 切换到中文
i18n.changeLanguage('zh-CN');

// 获取当前语言
const currentLang = i18n.language;
```

## 添加新语言

### 1. 创建语言包文件

在 `src/locales/modules` 目录下创建新的语言包文件，例如 `ja-jp.ts`（日语）：

```typescript
// src/locales/modules/ja-jp.ts
const local: App.I18n.I18nScheme = {
  api: {
    errMsg400: 'リクエストに失敗しました',
    errMsg401: 'ログインに失敗しました',
    // ...
  },
  system: {
    title: 'Lemonテンプレート',
    loading: '読み込み中...',
    // ...
  },
  // ...其他翻译
};

export default local;
```

### 2. 更新类型定义

在 `src/types/app.d.ts` 中添加新语言类型：

```typescript
declare namespace App {
  namespace I18n {
    type LangType = 'zh-CN' | 'en-US' | 'ja-JP'; // 添加 'ja-JP'

    // ...
  }
}
```

### 3. 注册语言包

在 `src/locales/locale.ts` 中注册新语言：

```typescript
import enUS from './modules/en-us';
import jaJP from './modules/ja-jp'; // 导入新语言包
import zhCN from './modules/zh-cn';

const resources: Record<App.I18n.LangType, { translation: App.I18n.I18nScheme }> = {
  'en-US': { translation: enUS },
  'zh-CN': { translation: zhCN },
  'ja-JP': { translation: jaJP }, // 注册新语言
};

export default resources;
```

### 4. 更新语言选项

在 `src/components/common/lang-provider.tsx` 中添加新语言选项：

```typescript
const localeOptions: LocaleOption[] = [
  { value: 'zh-CN', text: '简体中文' },
  { value: 'en-US', text: 'English' },
  { value: 'ja-JP', text: '日本語' }, // 添加新选项
];
```

## 最佳实践

### 1. 统一翻译键命名

```json
// ✅ 好的做法 - 使用清晰的层级结构
{
  "api": {
    "errMsg400": "请求失败"
  },
  "system": {
    "loading": "加载中"
  }
}
```

```json
// ❌ 避免 - 扁平化结构
{
  "apiErrMsg400": "请求失败",
  "systemLoading": "加载中"
}
```

### 2. 保持所有语言包结构一致

```typescript
// ✅ 所有语言包必须有相同的键

// zh-cn.ts
const zhCN = {
  system: {
    title: 'Lemon 模版',
    loading: '加载中...',
  },
};

// en-us.ts
const enUS = {
  system: {
    title: 'Lemon Template',
    loading: 'Loading...',
  },
};
```

### 3. 使用类型安全

```typescript
// ✅ 利用 TypeScript 类型检查
const { t } = useTranslation();
const title = t('system.title'); // 类型安全

// ❌ 避免硬编码字符串
const title = 'Lemon Template'; // 无法国际化
```

### 4. 组件中优先使用 useTranslation

```tsx
// ✅ 在组件中使用 Hook
function Component() {
  const { t } = useTranslation();
  return <div>{t('system.title')}</div>;
}

// ❌ 避免直接使用 i18n 实例（组件中）
function Component() {
  return <div>{i18n.t('system.title')}</div>; // 不会响应语言变化
}
```

### 5. 提取常用翻译

```tsx
// ✅ 提取到常量
const COMMON_MESSAGES = {
  confirm: 'system.confirm',
  cancel: 'system.cancel',
  loading: 'system.loading',
} as const;

function Component() {
  const { t } = useTranslation();
  return (
    <button>{t(COMMON_MESSAGES.confirm)}</button>
  );
}
```

### 6. 翻译文本保持简洁

```json
// ✅ 简洁明了
{
  "login": {
    "title": "登录",
    "submit": "登录"
  }
}
```

```json
// ❌ 避免冗长
{
  "login": {
    "title": "请在下方输入您的用户名和密码进行登录操作",
    "submit": "点击此按钮提交登录表单"
  }
}
```

## 常见问题

### 1. 翻译不生效？

检查以下几点：

- 翻译键是否正确
- 语言包是否正确注册
- 是否正确初始化 i18n

```tsx
// 检查翻译键
const { t } = useTranslation();
console.log(t('system.title')); // 输出翻译结果

// 检查当前语言
console.log(i18n.language); // 输出当前语言代码
```

### 2. 切换语言后部分内容未更新？

确保使用 `useTranslation` Hook 而不是直接使用 `i18n.t()`：

```tsx
// ✅ 正确 - 会响应语言变化
function Component() {
  const { t } = useTranslation();
  return <div>{t('system.title')}</div>;
}

// ❌ 错误 - 不会响应语言变化
function Component() {
  const title = i18n.t('system.title');
  return <div>{title}</div>;
}
```

### 3. 如何在非组件中使用翻译？

直接使用 `i18n` 实例：

```typescript
import { i18n } from '@/locales';

// 工具函数中
export function formatError(code: number) {
  return i18n.t(`api.errMsg${code}`);
}

// 类中
class ApiService {
  handleError(code: number) {
    return i18n.t(`api.errMsg${code}`);
  }
}
```

### 4. 如何处理复数和性别？

i18next 支持复数和上下文：

```json
// 语言包中定义
{
  "items": "{{count}} item",
  "items_other": "{{count}} items",
  "greeting_male": "Hello Mr. {{name}}",
  "greeting_female": "Hello Ms. {{name}}"
}
```

```tsx
// 使用
t('items', { count: 1 }); // "1 item"
t('items', { count: 5 }); // "5 items"
t('greeting', { context: 'male', name: 'John' }); // "Hello Mr. John"
t('greeting', { context: 'female', name: 'Jane' }); // "Hello Ms. Jane"
```

### 5. 如何实现语言包懒加载？

修改 i18n 配置支持异步加载：

```typescript
import i18n from 'i18next';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    // 其他配置...
  });
```

### 6. 浏览器显示翻译提示？

在初始化时设置 HTML `lang` 属性：

```typescript
export async function setupI18n() {
  // 设置HTML lang属性，避免浏览器翻译提示
  document.documentElement.lang = defaultLanguage;

  // 初始化 i18n...
}
```

## 相关链接

- [i18next 官方文档](https://www.i18next.com/)
- [react-i18next 官方文档](https://react.i18next.com/)
- [i18next-browser-languagedetector](https://github.com/i18next/i18next-browser-languageDetector)
