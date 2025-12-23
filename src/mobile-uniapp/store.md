# 状态管理

本项目采用 **Pinia** + **pinia-plugin-persistedstate** 的状态管理方案，提供了轻量、灵活、类型安全的状态管理解决方案。

## 技术方案

本项目采用以下技术实现状态管理功能：

- **Pinia** - Vue 官方推荐的状态管理库，是 Vuex 的继任者
- **pinia-plugin-persistedstate** - Pinia 持久化插件，自动同步状态到本地存储
- **storeToRefs** - Pinia 工具函数，保持响应性地解构 store

这种组合提供了：

- 🪶 **轻量简单** - API 简洁，学习成本低，比 Vuex 更易用
- 🔧 **灵活扩展** - 支持插件扩展，满足各种需求
- 🎯 **类型安全** - 完整的 TypeScript 支持，自动类型推导
- 💾 **状态持久化** - 内置持久化插件，自动同步到 `uni.storage`
- ⚡ **性能优化** - 无需 mutations，直接修改 state
- 🛠️ **开发体验** - 支持 Vue DevTools，支持组合式 API

## Pinia

Pinia 是 Vue 的官方状态管理库，专为 Vue 3 和 Composition API 设计。

### 核心特性

- **极简 API** - 只需要 `defineStore` 函数即可创建 store
- **无需 Mutations** - 直接修改 state，无需定义 mutations
- **TypeScript 友好** - 完整的类型推导和类型安全
- **模块化设计** - 每个 store 都是独立的，易于维护
- **支持 Composition API** - 可以使用 setup 语法糖
- **插件系统** - 支持扩展功能，如持久化、DevTools 等
- **跨平台支持** - 完美适配 UniApp，支持小程序、H5、App

### 配置

在 `src/store/index.ts` 中配置 Pinia：

```typescript
import type { App } from 'vue';
import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate'; // 引入持久化插件

/**
 * 创建pinia实例
 */
const store = createPinia();

// 使用数据持久化插件
store.use(
  createPersistedState({
    storage: {
      getItem: uni.getStorageSync,
      setItem: uni.setStorageSync,
    },
  }),
);

/**
 * 配置pinia
 * @param app vue实例
 */
export function setupStore(app: App<Element>) {
  app.use(store);
}

export { store };
```

**配置说明：**

- `createPinia()` - 创建 Pinia 实例
- `createPersistedState()` - 持久化插件，使用 `uni.getStorageSync` 和 `uni.setStorageSync` 适配 UniApp
- `setupStore()` - 在应用启动时安装 Pinia

### 创建 Store

在 `src/store/modules` 目录下创建 store 文件：

#### 方式一：Setup Store（推荐）

使用 Composition API 风格创建 store：

```typescript
import type { LoginData, UserInfo } from '@/api/user';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { postLoginAPI } from '@/api/user';

export const useUserStore = defineStore(
  'userStore',
  () => {
    /**
     * 登录token
     */
    const token = ref<string>('');

    /**
     * 用户信息
     */
    const userInfo = ref<UserInfo | null>(null);

    /**
     * 是否登录
     */
    const isLogin = computed(() => !!token.value);

    /**
     * 设置token
     * @param value token
     */
    const setToken = (value: string) => {
      token.value = value;
    };

    /**
     * 设置用户信息
     * @param value 用户信息
     */
    const setUserInfo = (value: UserInfo) => {
      userInfo.value = value;
    };

    /**
     * 登录
     * @param loginForm 登录表单
     */
    const login = async (loginForm: LoginData) => {
      const { username, password } = loginForm;

      return new Promise<void>((resolve, reject) => {
        postLoginAPI({ username: username.trim(), password })
          .then(({ user, token }) => {
            setToken(token); // 保存用户token
            setUserInfo(user); // 保存用户信息
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    };

    /**
     * 退出登录
     */
    const logout = () => {
      token.value = ''; // 清除用户token
      userInfo.value = null; // 清除用户信息
    };

    return {
      token,
      userInfo,
      isLogin,
      setToken,
      setUserInfo,
      login,
      logout,
    };
  },
  {
    persist: true, // 进行持久化存储
  },
);
```

**代码说明：**

- `defineStore` - 定义 store 的核心函数
- 第一个参数 `'userStore'` - store 的唯一 ID
- 第二个参数 - setup 函数，返回 state、getters、actions
- `ref` - 定义响应式状态
- `computed` - 定义计算属性（相当于 getters）
- 普通函数 - 定义 actions
- `persist: true` - 开启持久化

#### 方式二：Options Store

使用 Options API 风格创建 store：

```typescript
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  // State
  state: () => ({
    count: 0,
    name: 'Counter',
  }),

  // Getters（计算属性）
  getters: {
    doubleCount: state => state.count * 2,
    fullName: state => `Store: ${state.name}`,
  },

  // Actions（方法）
  actions: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    },
    async fetchData() {
      // 异步操作
      const data = await fetch('/api/data');
      this.count = data.count;
    },
  },

  // 持久化配置
  persist: true,
});
```

::: tip 推荐使用 Setup Store
Setup Store 更灵活，更符合 Vue 3 的 Composition API 风格，并且有更好的类型推导。
:::

### 基础使用

在组件中使用 store：

```vue
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { useMessage } from 'wot-design-uni';
import { useUserStore } from '@/store/modules/user';

defineOptions({
  name: 'Mine',
});

definePage({
  name: 'mine',
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '我的',
    navigationStyle: 'custom',
  },
});

const userStore = useUserStore();
const { isLogin, userInfo } = storeToRefs(userStore);

const { t } = useI18n();

function onClickLogin() {
  uni.navigateTo({
    url: '/pages/auth/login',
  });
}

function onClickOpenDocs() {
  uni.setClipboardData({
    data: 'https://lemon-template-docs.vercel.app/mobile-uniapp/',
    success: () => {
      uni.showToast({
        title: t('mine.linkCopied'),
        icon: 'none',
      });
    },
  });
}

const message = useMessage();

function onClickLogout() {
  message
    .confirm({
      msg: t('mine.logoutTips'),
      title: t('settings.tips'),
    })
    .then(() => {
      userStore.logout();
    })
    .catch(() => {
    });
}
</script>
```

**使用说明：**

1. 使用 `useUserStore()` 获取 store 实例
2. 使用 `storeToRefs()` 解构响应式状态（保持响应性）
3. 直接调用 store 的 actions（如 `userStore.logout()`）

::: warning storeToRefs 的重要性
直接解构 store 会失去响应性：

```typescript
// ❌ 错误 - 失去响应性
const { isLogin, userInfo } = userStore;

// ✅ 正确 - 保持响应性
const { isLogin, userInfo } = storeToRefs(userStore);

// ✅ 也可以单独访问
const isLogin = computed(() => userStore.isLogin);
```

:::

### 在模板中使用

```vue
<template>
  <view class="size-full text-text">
    <wd-img
      width="100%"
      mode="widthFix"
      src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
    />

    <view
      class="
        relative mx-4 -mt-10 mb-2.5 flex items-center rounded-lg bg-white p-4
        dark:bg-[#1C1C1E]
      "
    >
      <wd-img
        :width="50"
        :height="50"
        round
        :src="isLogin ? userInfo?.avatar : 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'"
      />
      <view v-if="!isLogin" class="ml-2.5 flex-1">
        <view class="ml-2.5 flex-1 text-xl" @click="onClickLogin">
          {{ $t('login.login') }}
        </view>
      </view>
      <view v-else class="ml-2.5 flex-1">
        <view class="mb-0.5 text-xl">
          {{ userInfo?.nickname }}
        </view>
        <view class="truncate text-sm">
          {{ userInfo?.sign }}
        </view>
      </view>
    </view>

    <view class="box-border px-4">
      <wd-cell-group border>
        <wd-cell :title="$t('route.themeSetting')" is-link to="/pages/mine/settings">
          <template #icon>
            <view class="mr-2.5 i-mdi-palette text-xl" />
          </template>
        </wd-cell>
        <wd-cell :title="$t('mine.projectDocs')" is-link @click="onClickOpenDocs">
          <template #icon>
            <view class="mr-2.5 i-mdi-book-open-variant text-xl" />
          </template>
        </wd-cell>
        <wd-cell v-if="isLogin" :title="$t('mine.logout')" is-link @click="onClickLogout">
          <template #icon>
            <view class="mr-2.5 i-mdi-logout text-xl" />
          </template>
        </wd-cell>
      </wd-cell-group>
    </view>
  </view>
</template>
```

### 异步 Actions

Store 支持异步操作：

```typescript
// 登录函数
async function login(loginForm: LoginData) {
  const { username, password } = loginForm;

  return new Promise<void>((resolve, reject) => {
    postLoginAPI({ username: username.trim(), password })
      .then(({ user, token }) => {
        setToken(token); // 保存用户token
        setUserInfo(user); // 保存用户信息
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}
```

**使用异步 Action：**

```vue
<script lang="ts" setup>
import type { FormInstance } from 'wot-design-uni/components/wd-form/types';
import { reactive, ref } from 'vue';
import { useToast } from 'wot-design-uni';
import { useRequest } from '@/hooks/use-request';
import { useUserStore } from '@/store/modules/user';

defineOptions({
  name: 'Login',
});

definePage({
  name: 'login',
  style: {
    navigationBarTitleText: '登录',
  },
});

const userStore = useUserStore();

// 表单数据
const loginForm = reactive({
  username: 'admin', // 用户名
  password: '123456', // 密码
});

// 表单实例
const loginFormRef = ref<FormInstance>();

const { run, loading, error } = useRequest(userStore.login);

const toast = useToast();

// 提交表单
function onSubmit() {
  loginFormRef.value!.validate().then(async ({ valid }) => {
    if (valid) {
      await run(loginForm);

      if (error.value) {
        toast.error(error.value.message);
        return;
      }

      // 登录成功,跳转
      uni.navigateBack();
    }
  });
}
</script>
```

### 在组件外使用

Pinia store 可以在 Vue 组件外使用（需要在 Pinia 安装后）：

```typescript
// 在请求拦截器中使用
import { useUserStore } from '@/store/modules/user';

function defaultInterceptor(config: UnConfig<UnData, UnData>): UnConfig<UnData, UnData> {
  // 添加token
  const token = useUserStore().token;
  if (token) {
    config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
  }

  return config;
}
```

在请求拦截器中使用 Store 中的 token：

```typescript
// 默认请求拦截器
function defaultInterceptor(config: UnConfig<UnData, UnData>): UnConfig<UnData, UnData> {
  // 添加token
  const token = useUserStore().token;
  if (token) {
    config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
  }

  return config;
}
```

## 持久化配置

### 全局持久化配置

在 `src/store/index.ts` 中配置全局持久化：

```typescript
// 使用数据持久化插件
store.use(
  createPersistedState({
    storage: {
      getItem: uni.getStorageSync,
      setItem: uni.setStorageSync,
    },
  }),
);
```

### Store 级别持久化

为单个 store 开启持久化：

```typescript
export const useUserStore = defineStore(
  'userStore',
  () => {
    // state、getters、actions
    return {
      // ...
    };
  },
  {
    persist: true, // 简单开启持久化
  }
);
```

### 自定义持久化配置

```typescript
export const useUserStore = defineStore(
  'userStore',
  () => {
    const token = ref<string>('');
    const userInfo = ref<UserInfo | null>(null);
    const tempData = ref<any>(null); // 临时数据，不需要持久化

    return {
      token,
      userInfo,
      tempData,
    };
  },
  {
    persist: {
      // 自定义存储键名
      key: 'user-storage',
      // 指定需要持久化的状态
      paths: ['token', 'userInfo'],
      // 不持久化 tempData
    },
  }
);
```

## 最佳实践

### 1. Store 拆分原则

```
// ✅ 好的做法 - 按功能模块拆分
src/store/
├── index.ts             # Pinia 配置
└── modules/
    ├── user.ts          # 用户认证相关
    ├── setting.ts       # 应用设置相关
    ├── cart.ts          # 购物车相关
    └── product.ts       # 商品相关

// ❌ 避免 - 所有状态放在一个 store
src/store/
└── index.ts             # 所有状态都在这里
```

### 2. 类型定义

```typescript
// ✅ 好的做法 - 完整的类型定义
import type { LoginData, UserInfo } from '@/api/user';

export const useUserStore = defineStore('user', () => {
  const token = ref<string>('');
  const userInfo = ref<UserInfo | null>(null);

  const login = async (loginForm: LoginData): Promise<void> => {
    // ...
  };

  return {
    token,
    userInfo,
    login,
  };
});

// ❌ 避免 - 缺少类型定义
export const useUserStore = defineStore('user', () => {
  const token = ref('');
  const userInfo = ref(null);

  const login = async (loginForm: any) => {
    // ...
  };

  return {
    token,
    userInfo,
    login,
  };
});
```

### 3. 使用 storeToRefs 解构

```vue
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/modules/user';

const userStore = useUserStore();

// ✅ 好的做法 - 使用 storeToRefs 保持响应性
const { isLogin, userInfo } = storeToRefs(userStore);
// Actions 直接解构即可
const { login, logout } = userStore;

// ❌ 避免 - 直接解构会失去响应性
const { isLogin, userInfo } = userStore;
</script>
```

### 4. Computed 属性的使用

```typescript
// ✅ 好的做法 - 使用 computed 定义派生状态
export const useUserStore = defineStore('user', () => {
  const token = ref<string>('');

  const isLogin = computed(() => !!token.value);

  return {
    token,
    isLogin,
  };
});

// ❌ 避免 - 使用 ref 存储派生状态（容易不同步）
export const useUserStore = defineStore('user', () => {
  const token = ref<string>('');
  const isLogin = ref(false);

  const setToken = (value: string) => {
    token.value = value;
    isLogin.value = !!value; // 需要手动同步
  };

  return {
    token,
    isLogin,
    setToken,
  };
});
```

### 5. 合理使用持久化

```typescript
// ✅ 好的做法 - 只持久化必要的数据
export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref<string>('');
    const userInfo = ref<UserInfo | null>(null);
    const tempData = ref<any>(null); // 临时数据

    return {
      token,
      userInfo,
      tempData,
    };
  },
  {
    persist: {
      paths: ['token', 'userInfo'], // 只持久化 token 和 userInfo
    },
  }
);

// ❌ 避免 - 持久化所有数据（可能包含敏感或临时数据）
export const useUserStore = defineStore(
  'user',
  () => {
    // ...
  },
  {
    persist: true, // 所有数据都会被持久化
  }
);
```

### 6. 异步错误处理

```typescript
// ✅ 好的做法 - 完善的错误处理
export const useUserStore = defineStore('user', () => {
  const login = async (loginForm: LoginData) => {
    try {
      const { token, user } = await postLoginAPI(loginForm);
      setToken(token);
      setUserInfo(user);
    }
    catch (error) {
      console.error('登录失败', error);
      throw error; // 重新抛出，让调用方处理
    }
  };

  return {
    login,
  };
});

// ❌ 避免 - 吞掉错误
export const useUserStore = defineStore('user', () => {
  const login = async (loginForm: LoginData) => {
    const { token, user } = await postLoginAPI(loginForm);
    setToken(token);
    setUserInfo(user);
  };

  return {
    login,
  };
});
```

### 7. 使用组合式函数

```vue
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useSettingStore } from '@/store/modules/setting';

const settingStore = useSettingStore();
const { themeColor } = storeToRefs(settingStore);

// ✅ 好的做法 - 使用 computed 包装双向绑定
const followSystem = computed({
  get: () => settingStore.followSystem,
  set: (value: boolean) => settingStore.setFollowSystem(value),
});
</script>

<template>
  <wd-switch v-model="followSystem" />
</template>
```

## 常见问题

### 1. 如何重置 Store？

```typescript
export const useUserStore = defineStore('user', () => {
  const token = ref<string>('');
  const userInfo = ref<UserInfo | null>(null);

  // 定义重置函数
  const $reset = () => {
    token.value = '';
    userInfo.value = null;
  };

  return {
    token,
    userInfo,
    $reset,
  };
});

// 使用
const userStore = useUserStore();
userStore.$reset();
```

::: tip
Options Store 自带 `$reset()` 方法，Setup Store 需要手动实现。
:::

### 2. 如何在 Store 之间共享状态？

```typescript
// 方式1：在一个 store 中引用另一个 store
export const useCartStore = defineStore('cart', () => {
  const checkout = () => {
    const userStore = useUserStore();
    if (!userStore.isLogin) {
      console.log('请先登录');
    }
    // 执行结算逻辑
  };

  return {
    checkout,
  };
});

// 方式2：在组件中组合多个 stores
const userStore = useUserStore();
const cartStore = useCartStore();
const settingStore = useSettingStore();
```

### 3. 如何监听状态变化？

```vue
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { watch } from 'vue';
import { useUserStore } from '@/store/modules/user';

const userStore = useUserStore();
const { token } = storeToRefs(userStore);

// 方式1：使用 watch
watch(token, (newToken, oldToken) => {
  console.log('Token 变化:', oldToken, '->', newToken);
});

// 方式2：使用 $subscribe（监听整个 store）
userStore.$subscribe((mutation, state) => {
  console.log('Store 变化:', mutation);
  console.log('新状态:', state);
});
</script>
```

### 4. 小程序和 H5 的存储差异？

本项目已经统一处理了平台差异：

```typescript
// 使用数据持久化插件
store.use(
  createPersistedState({
    storage: {
      getItem: uni.getStorageSync,
      setItem: uni.setStorageSync,
    },
  }),
);
```

**说明：**

- **小程序**: 使用 `uni.getStorageSync` 和 `uni.setStorageSync`
- **H5**: `uni.getStorageSync` 会自动映射到 `localStorage`
- 无需关心平台差异，统一使用 `uni.storage` API

### 5. 如何在路由守卫中使用 Store？

```typescript
import type { Router } from 'uni-mini-router';
import { useUserStore } from '@/store/modules/user';

export function createRouterGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    const userStore = useUserStore();

    // 需要登录的页面
    const authPages = ['settings', 'orders'];

    if (authPages.includes(to.name) && !userStore.isLogin) {
      // 未登录，跳转到登录页
      uni.navigateTo({
        url: '/pages/auth/login',
      });
      return;
    }

    next();
  });
}
```

### 6. 性能优化技巧？

```vue
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/modules/user';

const userStore = useUserStore();

// ✅ 只订阅需要的状态
const { isLogin } = storeToRefs(userStore);

// ❌ 避免订阅整个 store
const state = storeToRefs(userStore);
</script>

<template>
  <!-- ✅ 只在必要时渲染 -->
  <view v-if="isLogin">
    已登录
  </view>

  <!-- ❌ 避免不必要的计算 -->
  <view v-if="userStore.token && userStore.token.length > 0">
    已登录
  </view>
</template>
```

## 与 Vuex 的对比

| 特性            | Pinia                       | Vuex               |
| --------------- | --------------------------- | ------------------ |
| API 设计        | 更简洁，无需 mutations      | 需要定义 mutations |
| TypeScript      | 完美支持，自动类型推导      | 需要手动定义类型   |
| 模块化          | 天然模块化，每个 store 独立 | 需要配置 modules   |
| DevTools        | 支持 Vue DevTools           | 支持 Vue DevTools  |
| Composition API | 原生支持                    | 需要额外封装       |
| 体积            | 更小（约 1KB）              | 较大（约 2KB）     |
| 学习曲线        | 更平缓                      | 较陡               |

## 相关链接

- [Pinia 官方文档](https://pinia.vuejs.org/)
- [UniApp 数据缓存](https://uniapp.dcloud.net.cn/api/storage/storage)
