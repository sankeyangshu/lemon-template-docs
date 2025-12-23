# 国际化

本项目内置了完善的国际化（i18n）解决方案，基于 **vue-i18n** 和 **uni-app** 实现，支持多语言切换、自动检测用户语言、组件库语言包集成等功能。

## 技术方案

本项目采用以下技术实现国际化功能：

- **vue-i18n@9.x** - Vue 3 的国际化插件，使用 Composition API 模式
- **uni-app 国际化 API** - 使用 `uni.getLocale()` 和 `uni.setLocale()` 管理语言
- **wot-design-uni 语言包** - 集成组件库的国际化支持
- **uni.storage** - 持久化存储用户语言偏好

这种组合提供了：

- 🌍 **多语言支持** - 轻松添加和管理多种语言
- 🔄 **动态切换** - 运行时无缝切换语言
- 🎯 **类型安全** - 完整的 TypeScript 类型支持
- 📦 **自动检测** - 自动识别系统语言
- 💾 **持久化** - 语言偏好自动保存
- 📱 **跨端支持** - H5 和小程序全平台支持
- 🔧 **组件库集成** - 自动同步 wot-design-uni 组件语言

## 项目结构

```
src/locale/
├── modules/
│   ├── zh-CN.json      # 中文语言包
│   └── en-US.json      # 英文语言包
└── index.ts            # i18n 初始化和配置
```

## 语言包定义

### 语言包结构

语言包使用 JSON 格式，遵循统一的结构：

**src/locale/modules/zh-CN.json**

```json
{
  "api": {
    "errMsg400": "请求失败！请您稍后重试",
    "errMsg401": "登录失效！请您重新登录",
    "errMsg403": "当前账号无权限访问！",
    "errMsgDefault": "请求失败！"
  },
  "route": {
    "home": "首页",
    "example": "示例",
    "mine": "我的",
    "themeSetting": "主题设置"
  },
  "home": {
    "info": "基于 UniApp 生态系统的小程序应用模板",
    "vue": "Vue3 + Vite5",
    "typescript": "TypeScript"
  },
  "example": {
    "language": "语言",
    "darkMode": "暗黑模式",
    "basicSetting": "基础设置"
  },
  "login": {
    "username": "用户名",
    "password": "密码",
    "login": "登录"
  },
  "mine": {
    "logout": "退出登录",
    "systemVersion": "系统版本"
  }
}
```

**src/locale/modules/en-US.json**

```json
{
  "api": {
    "errMsg400": "Request failed! Please try again later",
    "errMsg401": "Login failed! Please log in again",
    "errMsg403": "The current account does not have permission to access!",
    "errMsgDefault": "Request failed!"
  },
  "route": {
    "home": "Home",
    "example": "Example",
    "mine": "Mine",
    "themeSetting": "Theme Settings"
  },
  "home": {
    "info": "Mobile Mini Program Application Template based on UniApp Ecosystem",
    "vue": "Vue3 + Vite5",
    "typescript": "TypeScript"
  },
  "example": {
    "language": "Language",
    "darkMode": "Dark Mode",
    "basicSetting": "Basic Settings"
  },
  "login": {
    "username": "Username",
    "password": "Password",
    "login": "Login"
  },
  "mine": {
    "logout": "Log Out",
    "systemVersion": "System Version"
  }
}
```

::: tip 语言包格式

- 使用嵌套的 JSON 结构组织翻译内容
- 键名使用小驼峰命名法
- 所有语言包必须保持相同的键结构
- 支持变量插值，如 `"message": "Hello {name}"`
  :::

## i18n 配置

### 初始化配置

位于 `src/locale/index.ts`：

```typescript
import type { App } from 'vue';
import { computed } from 'vue';
import { createI18n } from 'vue-i18n';
import { Locale } from 'wot-design-uni';
import enUS from 'wot-design-uni/locale/lang/en-US';
import zhCN from 'wot-design-uni/locale/lang/zh-CN';
import enUSMessage from './modules/en-US.json';
import zhCNMessage from './modules/zh-CN.json';

// 默认使用的语言
const defaultLanguage = 'zh-CN';

// wot-design-uni 组件库语言包
const wotLocales = {
  'zh-CN': zhCN,
  'en-US': enUS,
};

/**
 * 获取默认的本地语言
 */
function getDefaultLanguage() {
  const locales = Object.keys(wotLocales);

  // 优先使用已保存的语言，其次使用系统语言
  const localLanguage = uni.getStorageSync<string>('language') || uni.getLocale();

  // 存在当前语言的语言包
  if (locales.includes(localLanguage))
    return localLanguage;

  // 若未找到，则使用默认语言包
  return defaultLanguage;
}

/**
 * 加载本地语言包
 */
function loadLocaleMsg(locale: string, i18n: I18n) {
  const messages = {
    'zh-CN': zhCNMessage,
    'en-US': enUSMessage,
  };
  i18n.global.setLocaleMessage(locale, messages[locale as keyof typeof messages]);
}

/**
 * 设置语言
 */
async function setLang(lang: string, i18n: I18n) {
  // 加载应用语言包
  loadLocaleMsg(lang, i18n);

  // 设置 uni-app 框架语言
  uni.setLocale(lang);

  // 持久化存储
  uni.setStorageSync('language', lang);

  // 设置 vue-i18n 语言
  i18n.global.locale.value = lang;

  // 设置 wot-design-uni 组件语言包
  Locale.use(lang, wotLocales[lang as keyof typeof wotLocales]);
}

/**
 * 初始化国际化
 */
function initI18n() {
  const lang = getDefaultLanguage();

  const i18n = createI18n({
    // 使用 Composition API 模式
    legacy: false,
    // 全局注入 $t 函数
    globalInjection: true,
    // 使用的语言
    locale: lang,
    // 当前语言翻译缺失时显示的语言
    fallbackLocale: lang,
  });

  setLang(lang, i18n);

  return i18n;
}

const i18n = initI18n();
type I18n = typeof i18n;

// 导出语言响应式变量
export const language = computed({
  get() {
    return i18n.global.locale.value;
  },
  set(lang: string) {
    setLang(lang, i18n);
  },
});

/**
 * 配置 i18n 国际化
 */
export function setupI18n(app: App<Element>) {
  app.use(i18n);
}

export { i18n };
```

**配置说明：**

- `legacy: false` - 使用 Composition API 模式，与 Vue 3 配合更好
- `globalInjection: true` - 全局注入 `$t` 函数，可在模板中直接使用
- `locale` - 当前使用的语言
- `fallbackLocale` - 回退语言（当翻译缺失时使用）
- 集成 wot-design-uni 组件库语言包
- 使用 `uni.setLocale()` 同步 uni-app 框架语言
- 使用 `uni.setStorageSync()` 持久化语言设置

### 应用入口

在 `src/main.ts` 中初始化：

```typescript
import { createSSRApp } from 'vue';
import { setupI18n } from '@/locale';
import App from './App.vue';

export function createApp() {
  const app = createSSRApp(App);

  // 配置国际化
  setupI18n(app);

  return {
    app,
  };
}
```

## 使用方式

### 在模板中使用

使用 `$t` 函数进行翻译：

```vue
<script setup lang="ts">
import { ref } from 'vue';

const username = ref('');
</script>

<template>
  <view>
    <!-- 基础用法 -->
    <view>{{ $t('home.info') }}</view>

    <!-- 在属性中使用 -->
    <wd-button>{{ $t('login.login') }}</wd-button>

    <!-- 在组件属性中使用 -->
    <wd-input
      v-model="username"
      :label="$t('login.username')"
      :placeholder="$t('login.username')"
    />

    <!-- 嵌套路径 -->
    <view>{{ $t('api.errMsg400') }}</view>
  </view>
</template>
```

### 在 script 中使用

使用 `useI18n` Composition API：

```vue
<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

// 使用翻译
const message = t('home.info');
console.log(message);

// 显示提示
function showToast() {
  uni.showToast({
    title: t('mine.linkCopied'),
    icon: 'none',
  });
}
</script>
```

### 在工具函数中使用

直接使用 `i18n` 实例：

```typescript
import { i18n } from '@/locale';

// 错误处理
export function getErrorMessage(status: number) {
  const errorMap: Record<number, string> = {
    400: 'api.errMsg400',
    401: 'api.errMsg401',
    403: 'api.errMsg403',
  };

  return i18n.global.t(errorMap[status] || 'api.errMsgDefault');
}

// Toast 提示
export function showSuccessToast() {
  uni.showToast({
    title: i18n.global.t('system.success'),
    icon: 'success',
  });
}
```

### 动态翻译

支持变量插值和动态键名：

```vue
<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

// 变量插值
const size = 10;
const message = t('upload.fileSizeExceeded', { size });
// 输出: "文件大小不能超过 10 MB"

// 动态键名
const status = 'success';
const statusText = t(`status.${status}`);

// 复数处理
const count = 5;
const itemsText = t('items', { count });
</script>
```

## 语言切换

### 使用语言选择器

项目示例页面展示了语言切换功能：

```vue
<script lang="ts" setup>
import { language } from '@/locale';

// 语言选项
const languageColumns = [
  { label: '简体中文', value: 'zh-CN' },
  { label: 'English', value: 'en-US' },
];
</script>

<template>
  <view
    class="
      box-border w-full p-4 text-black
      dark:text-white
    "
  >
    <view class="mb-3 text-lg font-bold">
      {{ $t('example.basicSetting') }}
    </view>

    <wd-cell-group border>
      <!-- 暗黑模式切换 -->
      <wd-cell :title="`🌓 ${$t('example.darkMode')}`">
        <switch-dark />
      </wd-cell>

      <!-- 语言选择器 -->
      <wd-picker
        v-model="language"
        :label="`📚 ${$t('example.language')}`"
        align-right
        :columns="languageColumns"
      />
    </wd-cell-group>
  </view>
</template>
```

::: tip
`language` 是一个响应式变量，修改它会自动：

1. 更新应用语言
2. 同步 uni-app 框架语言
3. 更新 wot-design-uni 组件语言
4. 持久化保存到本地存储
   :::

### 手动切换语言

```typescript
import { language } from '@/locale';

// 切换到英文
language.value = 'en-US';

// 切换到中文
language.value = 'zh-CN';

// 获取当前语言
console.log(language.value);
```

### 使用 uni-app API

```typescript
// 获取当前语言
const currentLang = uni.getLocale();

// 设置语言（仅 uni-app 框架语言）
uni.setLocale('en-US');
```

::: warning 注意
推荐使用项目封装的 `language` 变量，它会同时更新应用和组件库的语言。直接使用 `uni.setLocale()` 不会同步更新 vue-i18n 和 wot-design-uni 的语言。
:::

## 添加新语言

### 1. 创建语言包文件

在 `src/locale/modules` 目录下创建新的语言包文件，例如 `ja-JP.json`（日语）：

```json
{
  "api": {
    "errMsg400": "リクエストに失敗しました",
    "errMsg401": "ログインに失敗しました",
    "errMsgDefault": "リクエストに失敗しました"
  },
  "route": {
    "home": "ホーム",
    "example": "例",
    "mine": "マイページ"
  },
  "home": {
    "info": "UniAppエコシステムに基づくミニプログラムアプリケーションテンプレート",
    "vue": "Vue3 + Vite5",
    "typescript": "TypeScript"
  }
}
```

### 2. 导入语言包

在 `src/locale/index.ts` 中导入并注册：

```typescript
import jaJPMessage from './modules/ja-JP.json';

// 更新 loadLocaleMsg 函数
function loadLocaleMsg(locale: string, i18n: I18n) {
  const messages = {
    'zh-CN': zhCNMessage,
    'en-US': enUSMessage,
    'ja-JP': jaJPMessage, // 添加新语言
  };
  i18n.global.setLocaleMessage(locale, messages[locale as keyof typeof messages]);
}
```

### 3. 添加组件库语言包

如果 wot-design-uni 支持该语言，添加到 `wotLocales`：

```typescript
import jaJP from 'wot-design-uni/locale/lang/ja-JP';

const wotLocales = {
  'zh-CN': zhCN,
  'en-US': enUS,
  'ja-JP': jaJP, // 添加组件库语言包
};
```

### 4. 更新语言选项

在语言选择器中添加新选项：

```typescript
const languageColumns = [
  { label: '简体中文', value: 'zh-CN' },
  { label: 'English', value: 'en-US' },
  { label: '日本語', value: 'ja-JP' }, // 添加新选项
];
```

## uni-app 国际化特性

### 框架组件和 API 国际化

uni-app 框架内置的组件和 API 会自动根据 `uni.setLocale()` 设置的语言显示：

```typescript
// 设置语言后，系统组件会自动使用对应语言
uni.setLocale('en-US');

// Picker 组件的"确定"、"取消"按钮会显示英文
uni.showActionSheet({
  itemList: ['选项1', '选项2'],
  // 按钮文本会自动国际化
});
```

### 自动适配系统语言

项目会自动检测并适配系统语言：

```typescript
// 获取系统语言
const systemLang = uni.getLocale();

// 获取用户保存的语言偏好
const savedLang = uni.getStorageSync('language');

// 优先使用用户保存的语言，其次使用系统语言
const lang = savedLang || systemLang;
```

## 最佳实践

### 1. 统一翻译键命名

```json
// ✅ 推荐：使用清晰的层级结构
{
  "api": {
    "errMsg400": "请求失败"
  },
  "home": {
    "title": "首页"
  }
}
```

```json
// ❌ 避免：扁平化结构
{
  "apiErrMsg400": "请求失败",
  "homeTitle": "首页"
}
```

### 2. 保持所有语言包结构一致

✅ 所有语言包必须有相同的键

**zh-CN.json:**

```json
{
  "home": {
    "title": "首页",
    "info": "欢迎"
  }
}
```

**en-US.json:**

```json
{
  "home": {
    "title": "Home",
    "info": "Welcome"
  }
}
```

### 3. 在模板中优先使用 $t

```vue
<!-- ✅ 推荐：在模板中使用 $t -->
<template>
  <view>{{ $t('home.title') }}</view>
</template>

<!-- ❌ 避免：硬编码文本 -->
<template>
  <view>首页</view>
</template>
```

### 4. 在脚本中使用 useI18n

```vue
<script setup lang="ts">
// ✅ 推荐：使用 Composition API
import { useI18n } from 'vue-i18n';

// ❌ 避免：直接使用 i18n 实例（组件中）
import { i18n } from '@/locale';

const { t } = useI18n();
const title = t('home.title');
const title = i18n.global.t('home.title'); // 可能不会响应语言变化
</script>
```

### 5. 提取常用翻译键

```typescript
// ✅ 提取到常量
export const COMMON_MESSAGES = {
  confirm: 'system.confirm',
  cancel: 'system.cancel',
  loading: 'system.loading',
} as const;

// 使用
const { t } = useI18n();
const confirmText = t(COMMON_MESSAGES.confirm);
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

### 7. 使用命名空间组织大型应用

```json
{
  "api": { /* API 相关 */ },
  "route": { /* 路由相关 */ },
  "home": { /* 首页相关 */ },
  "login": { /* 登录相关 */ },
  "mine": { /* 个人中心相关 */ },
  "settings": { /* 设置相关 */ }
}
```

## 常见问题

### 1. 翻译不生效？

**检查步骤：**

```vue
<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

// 1. 检查翻译键
console.log(t('home.title'));

// 2. 检查当前语言
console.log(locale.value);

// 3. 检查语言包是否加载
console.log(i18n.global.messages);
</script>
```

### 2. 切换语言后部分内容未更新？

**原因：** 使用了 `i18n.global.t()` 而不是 `useI18n()`

```vue
<script setup lang="ts">
// ✅ 正确 - 会响应语言变化
import { useI18n } from 'vue-i18n';

// ❌ 错误 - 不会响应语言变化
import { i18n } from '@/locale';

const { t } = useI18n();
const title = computed(() => t('home.title'));
const title = i18n.global.t('home.title');
</script>
```

### 3. wot-design-uni 组件未国际化？

**解决方案：**

确保调用了 `Locale.use()`：

```typescript
import { Locale } from 'wot-design-uni';
import zhCN from 'wot-design-uni/locale/lang/zh-CN';

// 设置组件库语言
Locale.use('zh-CN', zhCN);
```

项目已在 `setLang` 函数中自动处理。

### 4. 小程序中系统组件未国际化？

**原因：** 未使用 `uni.setLocale()` 设置框架语言

**解决方案：**

```typescript
// 设置 uni-app 框架语言
// 或使用项目封装的 language 变量（推荐）
import { language } from '@/locale';

uni.setLocale('en-US');
language.value = 'en-US';
```

### 5. 如何在非组件中使用翻译？

**解决方案：**

```typescript
import { i18n } from '@/locale';

// 工具函数中
export function formatError(code: number) {
  return i18n.global.t(`api.errMsg${code}`);
}

// 请求拦截器中
axios.interceptors.response.use(
  response => response,
  (error) => {
    const message = i18n.global.t('api.networkError');
    uni.showToast({ title: message, icon: 'none' });
    return Promise.reject(error);
  }
);
```

### 6. 如何处理复数和性别？

vue-i18n 支持复数和上下文：

```json
// 语言包中定义
{
  "items": "{count} 个项目 | {count} 个项目",
  "items_plural": "no items | one item | {count} items"
}
```

```vue
<script setup lang="ts">
const { t } = useI18n();

// 复数
t('items', 1); // "1 个项目"
t('items', 5); // "5 个项目"
</script>
```

### 7. 如何在 pages.json 中使用国际化？

uni-app 支持在 `pages.json` 中使用国际化：

```json
{
  "pages": [
    {
      "path": "pages/home/index",
      "style": {
        "navigationBarTitleText": "%home.title%"
      }
    }
  ]
}
```

然后在语言包中定义：

```json
{
  "home": {
    "title": "首页"
  }
}
```

::: warning 注意
`pages.json` 的国际化需要使用 `%key%` 格式，且需要在对应的语言包文件中定义。详见 [uni-app 国际化文档](https://uniapp.dcloud.net.cn/tutorial/i18n.html)。
:::

### 8. 语言切换后需要重启应用吗？

**不需要。** 项目实现了运行时语言切换：

- H5 端：立即生效
- 小程序端：立即生效
- App 端：部分原生组件可能需要重启

## 相关链接

- [vue-i18n 官方文档](https://vue-i18n.intlify.dev/)
- [uni-app 国际化文档](https://uniapp.dcloud.net.cn/tutorial/i18n.html)
- [wot-design-uni 国际化](https://wot-ui.cn/guide/locale.html)
