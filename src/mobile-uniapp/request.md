# 网络请求

本项目内置了基于 `@uni-helper/uni-network` 的请求封装，结合自定义 Hook（`useRequest`、`useUpload`）进行数据状态管理，提供了一套完整的数据请求解决方案。当然您也可以使用任何您喜欢的第三方请求库来获取数据。

## 技术选型

本项目采用以下技术栈处理网络请求和数据管理：

- **@uni-helper/uni-network** - 基于 `uni.request` 的跨平台 HTTP 客户端，支持小程序、H5、App
- **useRequest Hook** - 轻量级异步请求状态管理，处理加载、错误、数据状态
- **useUpload Hook** - 文件上传专用 Hook，支持图片和文件上传

这种组合提供了：

- 🚀 **类型安全** - 完整的 TypeScript 支持
- 🔄 **统一封装** - 跨平台 API 统一，无需关心平台差异
- ⚡ **性能优化** - 请求竞态处理、自动 Token 管理
- 🛡️ **错误处理** - 统一的错误处理和消息提示机制
- 📦 **易于扩展** - 支持自定义拦截器和多实例管理

## uni-network 封装

### 项目结构

```
src/utils/request/
├── index.ts      # HttpClient 和请求方法封装
├── error.ts      # 错误处理和自定义错误类
└── status.ts     # HTTP 状态码常量定义
```

### 核心功能

#### 1. HttpClient 类

位于 `src/utils/request/index.ts`，提供了基于 `uni-network` 的增强型 HTTP 客户端。

**主要特性：**

- ✨ **灵活的拦截器配置** - 支持自定义请求/响应拦截器
- 🔐 **自动 Token 管理** - 从 Pinia Store 自动获取并添加 Token
- 🎯 **类型安全** - 完整的 TypeScript 类型支持
- 🛠️ **实例管理** - 支持创建多个独立的 HTTP 客户端实例
- 📦 **统一响应格式** - 规范化的响应数据结构
- 🌐 **跨平台支持** - 自动适配小程序、H5、App 端

**基础配置：**

```typescript
// 基础配置
const defaultConfig: UnConfig = {
  timeout: 5000, // 超时时间 单位是ms，这里设置了5s的超时时间
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
};
```

**响应数据结构：**

```typescript
// 响应数据基础结构
export interface BaseResponse {
  code: number;
  message?: string;
}

// 去除与BaseResponse冲突的字段
type OmitBaseResponse<T> = Omit<T, keyof BaseResponse>;

// 响应数据类型定义 - 避免属性冲突，确保BaseResponse优先级
export type ResponseData<T = any> = BaseResponse & OmitBaseResponse<T>;
```

**创建默认实例：**

```typescript
// 默认导出实例 - 可直接使用
export const http = new HttpClient({
  baseUrl: import.meta.env.VITE_SERVICE_BASE_URL,
});
```

**自定义实例：**

```typescript
import HttpClient from '@/utils/request';

// 创建自定义实例
const customHttp = new HttpClient(
  {
    baseUrl: 'https://api.example.com',
    timeout: 10000,
  },
  {
    // 自定义请求拦截器
    requestInterceptor: (config) => {
      // 添加自定义逻辑
      config.headers = { ...config.headers, 'X-Custom-Header': 'value' };
      return config;
    },
    // 自定义响应拦截器
    responseInterceptor: (response) => {
      // 添加自定义处理
      return response.data;
    },
  }
);
```

#### 2. 请求拦截器

请求拦截器用于在请求发送前进行统一处理：

```typescript
// 默认请求拦截器
function defaultInterceptor(config: UnConfig<UnData, UnData>): UnConfig<UnData, UnData> {
  /* 在这里写请求拦截器的默认业务逻辑 */
  // 添加token
  const token = useUserStore().token;
  if (token) {
    config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
  }

  return config;
}

// 默认请求错误拦截器
function defaultErrorInterceptor(error: UnError): Promise<any> {
  /* 在这里写请求错误拦截器的默认业务逻辑 */
  // 处理请求前的错误
  showError(this.createHttpError(i18n.global.t('api.requestConfigError'), ApiStatus.error));

  return Promise.reject(error);
}

// 优先使用自定义拦截器，否则使用默认拦截器
this.requestInterceptorId = this.instance.interceptors.request.use(
  customInterceptor || defaultInterceptor,
  customErrorInterceptor || defaultErrorInterceptor
);
```

**功能说明：**

- 自动从 Pinia Store 获取 Token
- 将 Token 添加到请求头 `Authorization: Bearer {token}`
- 处理请求配置错误

#### 3. 响应拦截器

响应拦截器用于在响应返回后进行统一处理：

```typescript
// 默认响应拦截器
function defaultInterceptor(response: UnResponse<UnData, UnData>) {
  /* 在这里写响应拦截器的默认业务逻辑 */
  // 处理不同的响应码
  const data = response.data as ResponseData;
  const { code, message } = data;

  switch (code) {
    case ApiStatus.success:
      return data;
    // case 401:
    //   // 未授权处理
    //   break;
    // case 403:
    //   // 权限不足处理
    //   break;
    default:{
      // 其他错误处理
      const error = this.createHttpError(message ?? i18n.global.t('api.errMsgDefault'), code);
      showError(error);
      throw error;
    }
  }
}

// 默认响应错误拦截器
function defaultErrorInterceptor(error: UnError<ErrorResponse>) {
  return Promise.reject(handleError(error));
}

// 优先使用自定义拦截器,否则使用默认拦截器
this.responseInterceptorId = this.instance.interceptors.response.use(
  customInterceptor || defaultInterceptor,
  customErrorInterceptor || defaultErrorInterceptor
);
```

**功能说明：**

- 根据业务状态码 `code` 判断请求是否成功
- `code === 200` 时返回数据
- 其他状态码统一错误处理和消息提示
- 可扩展 401、403 等特殊状态码处理逻辑

#### 4. 错误处理机制

位于 `src/utils/request/error.ts`，提供了完整的错误处理方案。

**自定义错误类：**

```typescript
/**
 * 自定义 HttpError 类
 */
export class HttpError extends Error {
  public readonly code: number;
  public readonly data?: unknown;
  public readonly timestamp: string;
  public readonly url?: string;
  public readonly method?: string;

  /**
   * 创建 HTTP 错误实例
   * @param message 消息
   * @param code 状态码
   * @param options 配置项
   */
  constructor(
    message: string,
    code: number,
    options?: {
      data?: unknown;
      url?: string;
      method?: string;
    },
  ) {
    super(message);
    this.name = 'HTTP Error';
    this.code = code;
    this.data = options?.data;
    this.timestamp = new Date().toISOString();
    this.url = options?.url;
    this.method = options?.method;
  }

  /**
   * 转换为错误日志数据
   */
  public toLogData(): ErrorLogData {
    return {
      code: this.code,
      message: this.message,
      data: this.data,
      timestamp: this.timestamp,
      url: this.url,
      method: this.method,
      stack: this.stack,
    };
  }
}
```

`HttpError` 类包含丰富的错误信息：

- `code` - 错误状态码
- `message` - 错误消息
- `data` - 错误附加数据
- `timestamp` - 错误时间戳
- `url` - 请求 URL
- `method` - 请求方法
- `toLogData()` - 转换为日志数据

**错误处理函数：**

```typescript
export function handleError(error: UnError<ErrorResponse>): HttpError {
  // 处理取消的请求
  if (un.isCancel(error)) {
    console.warn('Request cancelled:', error.message);
    throw new HttpError(i18n.global.t('api.requestCancelled'), ApiStatus.error);
  }

  const statusCode = error.response?.status;
  const errorMessage = error.response?.data?.message ?? error.message;
  const requestConfig = error.config;

  // 处理网络错误
  if (!error.response) {
    throw new HttpError(i18n.global.t('api.networkError'), ApiStatus.error, {
      url: requestConfig?.url,
      method: requestConfig?.method?.toUpperCase(),
    });
  }

  // 处理 HTTP 状态码错误
  const message = statusCode !== undefined ? getErrorMessage(statusCode) : errorMessage || i18n.global.t('api.errMsgDefault');

  throw new HttpError(message, statusCode ?? ApiStatus.error, {
    data: error.response.data,
    url: requestConfig?.url,
    method: requestConfig?.method?.toUpperCase(),
  });
}
```

**错误消息显示：**

```typescript
/**
 * 显示错误消息
 * @param error 错误对象
 * @param showMessage 是否显示错误消息
 */
export function showError(error: HttpError, showMessage: boolean = true) {
  if (showMessage) {
    // 添加错误消息显示
    uni.showToast({
      icon: 'none',
      title: error.message,
    });
  }
  // 记录错误日志
  console.error('[HTTP Error]', error.toLogData());
}

/**
 * 显示成功消息
 * @param message 成功消息
 * @param showMessage 是否显示消息
 */
export function showSuccess(message: string, showMessage: boolean = true) {
  if (showMessage) {
    // 添加成功消息显示
    uni.showToast({
      icon: 'success',
      title: message,
    });
  }
}
```

#### 5. HTTP 状态码

位于 `src/utils/request/status.ts`，定义了常用的 HTTP 状态码常量：

```typescript
/**
 * 接口状态码
 */
export const ApiStatus = {
  success: 200, // 成功
  error: 400, // 错误
  unauthorized: 401, // 未授权
  forbidden: 403, // 禁止访问
  notFound: 404, // 未找到
  methodNotAllowed: 405, // 方法不允许
  requestTimeout: 408, // 请求超时
  internalServerError: 500, // 服务器错误
  notImplemented: 501, // 未实现
  badGateway: 502, // 网关错误
  serviceUnavailable: 503, // 服务不可用
  gatewayTimeout: 504, // 网关超时
  httpVersionNotSupported: 505, // HTTP版本不支持
} as const;
```

### 请求方法

HttpClient 提供了常用的 HTTP 请求方法：

```typescript
class HttpClient {
  // GET 请求
  async get<T>(url: string, config?: UnConfig): Promise<ResponseData<T>> {
    return this.request<T>('GET', url, config);
  }

  // POST 请求
  async post<T>(url: string, data?: UnData, config?: UnConfig): Promise<ResponseData<T>> {
    return this.request<T>('POST', url, { ...config, data });
  }

  // PUT 请求
  async put<T>(url: string, data?: UnData, config?: UnConfig): Promise<ResponseData<T>> {
    return this.request<T>('PUT', url, { ...config, data });
  }

  // DELETE 请求
  async deleteRequest<T>(url: string, config?: UnConfig): Promise<ResponseData<T>> {
    return this.request<T>('DELETE', url, config);
  }

  // PATCH 请求
  async patch<T>(url: string, data?: UnData, config?: UnConfig): Promise<ResponseData<T>> {
    return this.request<T>('PATCH', url, { ...config, data });
  }
}
```

### API 接口定义

推荐的 API 接口定义方式：

```typescript
import { http } from '@/utils/request';

/**
 * 登录请求参数类型
 */
export interface LoginData {
  username: string;
  password: string;
}

/**
 * 登录返回参数类型
 */
export interface LoginResponse {
  user: UserInfo;
  token: string;
}

/**
 * 用户信息类型
 */
export interface UserInfo {
  id: number;
  username: string;
  phone: string;
  nickname: string;
  avatar: string;
  sign?: string;
}

// api接口
const api = {
  example: '/example', // 示例接口
  login: '/auth/login', // 用户登录接口
};

/**
 * 获取示例数据
 * @returns 示例数据
 */
export function getExampleAPI() {
  return http.get<{ content: string; date: number }>(api.example);
}

/**
 * 用户登录
 * @param data 登录请求参数
 * @returns 登录结果
 */
export function postLoginAPI(data: LoginData) {
  return http.post<LoginResponse>(api.login, data);
}
```

**类型说明：**

- 定义请求参数类型（如 `LoginData`）
- 定义响应数据类型（如 `LoginResponse`）
- 统一 API 接口路径管理
- 使用泛型 `<T>` 指定响应数据类型

## useRequest Hook

`useRequest` 是一个轻量级的异步请求状态管理 Hook，用于处理加载状态、错误处理和数据管理。

### 核心特性

- 🔄 **自动状态管理** - 自动管理 loading、error、data 状态
- ⚡ **竞态处理** - 自动处理请求竞态问题，忽略过期请求
- 🎯 **生命周期钩子** - 支持 beforeRequest、onSuccess、onError、onFinally
- 💪 **TypeScript 支持** - 完整的类型推导
- 🛠️ **数据格式化** - 支持自定义数据格式化函数

### 类型定义

```typescript
/** API 函数类型 */
type ApiFun = (params?: any) => Promise<any>;

/** API 返回类型 */
type ApiReturn<F extends ApiFun> = Awaited<ReturnType<F>>;

/** API 参数类型 */
type ApiParams<F extends ApiFun> = Parameters<F>[0];

/** API 错误类型 */
type ApiError = {
  message: string;
  code?: string | number;
  response?: Response;
  data?: unknown;
} | Error;

/** 请求选项配置 */
interface UseRequestOption<F extends ApiFun, D = ApiReturn<F>, P = ApiParams<F>> {
  /** 初始化数据 */
  initialData?: D;
  /** 默认参数 */
  defaultParams?: P;
  /** 是否立即执行 */
  immediate?: boolean;
  /** 数据格式化 */
  formatter?: (data: ApiReturn<F>) => D;
  /** 请求前回调 */
  beforeRequest?: (params?: P) => boolean | void;
  /** 请求成功回调 */
  onSuccess?: (data: ApiReturn<F>, formattedData: D) => void;
  /** 请求错误回调 */
  onError?: (error: ApiError) => void;
  /** 请求完成回调 */
  onFinally?: () => void;
}

/** 请求返回类型 */
interface UseRequestReturn<D, P> {
  data: Ref<D>;
  loading: Ref<boolean>;
  error: Ref<ApiError | null>;
  run: (params?: P) => Promise<void>;
}
```

### 基础用法

在登录页面中使用：

```vue
<!-- src/pages/auth/login.vue -->
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

**使用说明：**

1. 从 `useRequest` 获取 `run`、`loading`、`error` 状态
2. 调用 `run(params)` 执行请求
3. `loading.value` 自动管理加载状态
4. `error.value` 自动管理错误状态
5. 请求成功后自动清空错误状态

### 高级配置

```typescript
import { getExampleAPI } from '@/api/user';
import { useRequest } from '@/hooks/use-request';

// 1. 带初始数据
const { data, loading, run } = useRequest(getExampleAPI, {
  initialData: { content: '', date: 0 },
});

// 2. 立即执行
const { data, loading } = useRequest(getExampleAPI, {
  immediate: true,
  defaultParams: { id: 1 },
});

// 3. 数据格式化
const { data } = useRequest(getExampleAPI, {
  formatter: (rawData) => {
    return {
      ...rawData,
      dateFormatted: new Date(rawData.date).toLocaleDateString(),
    };
  },
});

// 4. 生命周期钩子
const { run } = useRequest(getExampleAPI, {
  beforeRequest: (params) => {
    // 请求前验证
    if (!params?.id) {
      uni.showToast({ title: '参数错误', icon: 'none' });
      return false; // 返回 false 可以阻止请求
    }
    return true;
  },
  onSuccess: (data, formattedData) => {
    console.log('请求成功', formattedData);
    uni.showToast({ title: '获取成功', icon: 'success' });
  },
  onError: (error) => {
    console.error('请求失败', error);
    uni.showToast({ title: error.message, icon: 'none' });
  },
  onFinally: () => {
    console.log('请求完成');
  },
});
```

### 竞态处理

`useRequest` 内置了请求竞态处理机制：

```typescript
// src/hooks/use-request.ts
async function run(params?: P) {
  const requestId = ++currentRequestId.value;

  // 重置错误状态
  error.value = null;
  // 设置加载状态
  loading.value = true;

  // 执行请求前钩子
  const isContinueRequest = beforeRequest?.(params) ?? true;
  if (!isContinueRequest) {
    loading.value = false;
    return;
  }

  try {
    // 请求函数
    const result = await requestFun(params);

    // 检查是否是最新的请求
    if (requestId !== currentRequestId.value) {
      // 忽略过期的请求,避免竞态问题
    }
    // ... 后续处理
  }
  catch (err) {
    // 错误处理
  }
}
```

**工作原理：**

1. 每次请求分配唯一 `requestId`
2. 请求完成时检查 `requestId` 是否为最新
3. 如果不是最新请求，忽略结果，避免覆盖新数据

## useUpload Hook

`useUpload` 是专门用于文件上传的 Hook，支持图片和文件上传。

### 核心特性

- 📁 **多文件上传** - 支持批量文件上传
- 🎯 **文件验证** - 大小、格式、扩展名验证
- 📊 **上传进度** - 实时上传进度反馈
- 🛡️ **错误处理** - 完整的错误处理和提示
- 🎨 **类型支持** - 支持图片和文件两种类型
- ⚡ **取消上传** - 支持中断上传任务

### 类型定义

```typescript
type Media = 'image' | 'file';
type Image = 'png' | 'jpg' | 'jpeg' | 'webp' | '*';
type File = 'doc' | 'docx' | 'ppt' | 'zip' | 'xls' | 'xlsx' | 'txt' | Image;

/**
 * 上传结果数据类型
 * 根据实际业务需要调整此类型
 */
export interface UploadResultData {
  /** 文件URL */
  url: string;
  /** 文件名 */
  name?: string;
  /** 文件大小 */
  size?: number;
  /** 其他自定义字段 */
  [key: string]: any;
}

/** 文件信息 */
interface FileInfo {
  /** 临时文件路径 */
  tempFilePath: string;
  /** 文件大小 */
  size: number;
  /** 文件名称 */
  name?: string;
  /** 文件类型 */
  type?: string;
}

/** 上传选项 */
interface UseUploadOptions<T extends Media> {
  /** 上传接口地址 */
  url?: string;
  /** 额外的表单数据 */
  formData?: Record<string, any>;
  /** 最大文件大小，单位字节 */
  maxSize?: number;
  /** 允许的文件类型 */
  accept?: T extends 'image' ? Image[] : File[];
  /** 最多选择文件数量 */
  count?: number;
  /** 文件类型 */
  fileType?: T;
  /** 文件扩展名过滤 */
  extension?: string[];
  /** 请求成功回调 */
  onSuccess?: (data: any) => void;
  /** 请求错误回调 */
  onError?: (err: HttpError) => void;
  /** 进度回调 */
  onProgress?: (progress: number) => void;
  /** 完成回调 */
  onComplete?: () => void;
}
```

### 基础用法

**上传图片：**

```vue
<script lang="ts" setup>
import { useUpload } from '@/hooks/use-upload';

const { loading, data, progress, run } = useUpload({
  fileType: 'image',
  maxSize: 5 * 1024 * 1024, // 5MB
  accept: ['jpg', 'png', 'jpeg'],
  count: 9,
  onSuccess: (result) => {
    console.log('上传成功', result);
    uni.showToast({ title: '上传成功', icon: 'success' });
  },
  onError: (err) => {
    console.error('上传失败', err);
  },
});

function uploadImage() {
  run();
}
</script>

<template>
  <view>
    <wd-button @click="uploadImage">
      选择图片上传
    </wd-button>
    <view v-if="loading">
      上传中... {{ progress }}%
    </view>
    <view v-if="data">
      <image
        v-for="item in data"
        :key="item.url"
        :src="item.url"
        mode="aspectFill"
      />
    </view>
  </view>
</template>
```

**上传文件：**

```vue
<script lang="ts" setup>
import { useUpload } from '@/hooks/use-upload';

const { loading, data, progress, run } = useUpload({
  fileType: 'file',
  maxSize: 10 * 1024 * 1024, // 10MB
  extension: ['doc', 'docx', 'pdf'],
  count: 5,
  onProgress: (progress) => {
    console.log('上传进度:', progress);
  },
});

function uploadFile() {
  run();
}
</script>
```

### 文件验证

`useUpload` 内置文件验证逻辑：

```typescript
// 文件验证函数
function validateFile(file: FileInfo) {
  // 文件大小验证
  if (file.size > maxSize) {
    const errorMsg = i18n.global.t('upload.fileSizeExceeded', {
      size: (maxSize / 1024 / 1024).toFixed(2),
    });
    uni.showToast({
      title: errorMsg,
      icon: 'none',
    });
    throw new HttpError(errorMsg, ApiStatus.error);
  }

  // 文件格式验证
  if (accept.length > 0 && !accept.includes('*')) {
    const ext = file.name?.split('.').pop()?.toLowerCase()
      || file.tempFilePath.split('.').pop()?.toLowerCase();

    const isValid = accept.some(type =>
      type === '*' || type.toLowerCase() === ext);

    if (!isValid) {
      const errorMsg = i18n.global.t('upload.fileFormatNotSupported', {
        formats: accept.join(', '),
      });
      uni.showToast({ title: errorMsg, icon: 'none' });
      throw new HttpError(errorMsg, ApiStatus.error);
    }
  }
}
```

**验证项：**

- **文件大小验证**: 超过 `maxSize` 时提示错误
- **文件格式验证**: 检查文件扩展名是否在 `accept` 列表中

### 批量上传

支持批量上传多个文件：

```typescript
/**
 * 批量上传
 */
async function uploadFiles(files: FileInfo[]): Promise<UploadResultData[]> {
  const uploadResults: UploadResultData[] = [];
  const errors: HttpError[] = [];

  for (let i = 0; i < files.length; i++) {
    try {
      const result = await uploadSingleFile(files[i]);
      // result 已经是解析后的业务数据
      uploadResults.push(result);

      // 更新整体进度
      const overallProgress = Math.round(((i + 1) / files.length) * 100);
      progress.value = overallProgress;
      onProgress?.(overallProgress);
    }
    catch (err) {
      const error = err instanceof HttpError
        ? err
        : new HttpError(
            err instanceof Error ? err.message : i18n.global.t('upload.uploadFailed'),
            ApiStatus.error,
          );
      errors.push(error);
      console.error(`文件 ${i + 1} 上传失败:`, error.toLogData());
    }
  }

  // 如果有错误，抛出第一个错误
  if (errors.length > 0 && uploadResults.length === 0) {
    throw errors[0];
  }

  // 如果部分失败，在控制台警告
  if (errors.length > 0) {
    console.warn(`${errors.length}/${files.length} 个文件上传失败`);
  }

  // 返回业务数据数组
  return uploadResults;
}
```

### 上传控制

```typescript
/**
 * 重置
 */
function reset() {
  loading.value = false;
  error.value = null;
  data.value = null;
  progress.value = 0;
  if (uploadTask.value) {
    uploadTask.value.abort();
    uploadTask.value = null;
  }
}

/**
 * 取消
 */
function abort() {
  if (uploadTask.value) {
    uploadTask.value.abort();
    uploadTask.value = null;
    loading.value = false;
  }
}
```

**使用示例：**

```vue
<script lang="ts" setup>
import { useUpload } from '@/hooks/use-upload';

const { loading, progress, run, abort, reset } = useUpload({
  fileType: 'image',
});

// 开始上传
function startUpload() {
  run();
}

// 取消上传
function cancelUpload() {
  abort();
}

// 重置状态
function resetUpload() {
  reset();
}
</script>
```

## 最佳实践

### 1. API 文件组织

按模块组织 API 接口：

```
src/api/
├── user.ts       # 用户相关接口
├── product.ts    # 商品相关接口
├── order.ts      # 订单相关接口
└── types.ts      # 公共类型定义
```

### 2. 类型安全的 API 定义

```typescript
import type { ResponseData } from '@/utils/request';
import { http } from '@/utils/request';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

export interface ProductListParams {
  page: number;
  limit: number;
  category?: string;
}

export interface ProductListResponse {
  list: Product[];
  total: number;
}

const api = {
  list: '/product/list',
  detail: '/product/detail',
  create: '/product/create',
  update: '/product/update',
  delete: '/product/delete',
};

/**
 * 获取商品列表
 */
export function getProductListAPI(params: ProductListParams) {
  return http.get<ProductListResponse>(api.list, { params });
}

/**
 * 获取商品详情
 */
export function getProductDetailAPI(id: number) {
  return http.get<Product>(`${api.detail}/${id}`);
}

/**
 * 创建商品
 */
export function createProductAPI(data: Omit<Product, 'id'>) {
  return http.post<Product>(api.create, data);
}

/**
 * 更新商品
 */
export function updateProductAPI(id: number, data: Partial<Product>) {
  return http.put<Product>(`${api.update}/${id}`, data);
}

/**
 * 删除商品
 */
export function deleteProductAPI(id: number) {
  return http.delete<void>(`${api.delete}/${id}`);
}
```

### 3. 在页面中使用 useRequest

```vue
<script lang="ts" setup>
import { ref } from 'vue';
import { getProductListAPI } from '@/api/product';
import { useRequest } from '@/hooks/use-request';

const page = ref(1);

const { data, loading, error, run } = useRequest(getProductListAPI, {
  immediate: true,
  defaultParams: {
    page: page.value,
    limit: 10,
  },
  onSuccess: (result) => {
    console.log('获取商品列表成功', result);
  },
});

function retry() {
  run({ page: page.value, limit: 10 });
}

function loadMore() {
  page.value++;
  run({ page: page.value, limit: 10 });
}
</script>

<template>
  <view class="p-4">
    <wd-loading v-if="loading" />
    <view v-else-if="error" class="text-red">
      {{ error.message }}
      <wd-button @click="retry">
        重试
      </wd-button>
    </view>
    <view v-else-if="data">
      <view v-for="item in data.list" :key="item.id">
        {{ item.name }} - ¥{{ item.price }}
      </view>
    </view>
  </view>
</template>
```

### 4. 自定义拦截器

```typescript
import HttpClient from '@/utils/request';

// 创建需要特殊处理的 HTTP 实例
const uploadHttp = new HttpClient(
  {
    baseUrl: import.meta.env.VITE_UPLOAD_BASE_URL,
    timeout: 30000, // 上传超时时间设置为 30s
  },
  {
    requestInterceptor: (config) => {
      // 上传请求需要使用 multipart/form-data
      config.headers = {
        ...config.headers,
        'Content-Type': 'multipart/form-data',
      };
      return config;
    },
    responseInterceptor: (response) => {
      // 自定义响应处理
      const data = response.data;
      if (data.code === 200) {
        return data;
      }
      throw new Error(data.message || '上传失败');
    },
  }
);

export { uploadHttp };
```

### 5. 错误处理

```typescript
import { postLoginAPI } from '@/api/user';
import { useRequest } from '@/hooks/use-request';
import { isHttpError } from '@/utils/request/error';

const { run, error } = useRequest(postLoginAPI, {
  onError: (err) => {
    // 统一错误处理
    if (isHttpError(err)) {
      console.error('[Login Error]', err.toLogData());

      // 根据错误码处理
      switch (err.code) {
        case 401:
          uni.showToast({ title: '用户名或密码错误', icon: 'none' });
          break;
        case 403:
          uni.showToast({ title: '账号已被禁用', icon: 'none' });
          break;
        default:
          uni.showToast({ title: err.message, icon: 'none' });
      }
    }
    else {
      uni.showToast({ title: '未知错误', icon: 'none' });
    }
  },
});
```

## 环境变量配置

**.env.development**

```bash
# 开发环境 API 地址
VITE_SERVICE_BASE_URL = http://localhost:3000/api
```

**.env.production**

```bash
# 生产环境 API 地址
VITE_SERVICE_BASE_URL = https://api.example.com
```

**使用方式：**

```typescript
// 在代码中访问环境变量
const baseUrl = import.meta.env.VITE_SERVICE_BASE_URL;
```

## 常见问题

### 1. 如何处理 Token 过期？

在响应拦截器中处理 401 错误：

```typescript
function defaultInterceptor(response: UnResponse<UnData, UnData>) {
  const data = response.data as ResponseData;
  const { code, message } = data;

  switch (code) {
    case ApiStatus.success:
      return data;
    case 401: {
      // Token 过期处理
      const userStore = useUserStore();
      userStore.logout();

      uni.showToast({
        title: '登录已过期，请重新登录',
        icon: 'none',
      });

      setTimeout(() => {
        uni.navigateTo({ url: '/pages/auth/login' });
      }, 1500);

      throw new HttpError(message ?? '未授权', code);
    }
    default: {
      const error = this.createHttpError(message ?? i18n.global.t('api.errMsgDefault'), code);
      showError(error);
      throw error;
    }
  }
}
```

### 2. 如何实现请求重试？

```typescript
async function requestWithRetry<T>(
  requestFn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: any;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await requestFn();
    }
    catch (error) {
      lastError = error;
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError;
}

// 使用示例
const { run } = useRequest(async () => {
  return requestWithRetry(() => getExampleAPI());
});
```

### 3. 如何处理文件下载？

```typescript
async function downloadFile(url: string, filename: string) {
  uni.showLoading({ title: '下载中...' });

  try {
    const res = await uni.downloadFile({
      url,
      success: (res) => {
        if (res.statusCode === 200) {
          // 保存文件
          uni.saveFile({
            tempFilePath: res.tempFilePath,
            success: (saveRes) => {
              uni.showToast({
                title: '下载成功',
                icon: 'success',
              });
            },
          });
        }
      },
    });
  }
  catch (error) {
    uni.showToast({
      title: '下载失败',
      icon: 'none',
    });
  }
  finally {
    uni.hideLoading();
  }
}
```

### 4. 如何实现请求队列？

```typescript
class RequestQueue {
  private queue: Array<() => Promise<any>> = [];
  private running = 0;
  private maxConcurrent = 3;

  async add<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await fn();
          resolve(result);
        }
        catch (error) {
          reject(error);
        }
      });
      this.run();
    });
  }

  private async run() {
    if (this.running >= this.maxConcurrent || this.queue.length === 0) {
      return;
    }

    this.running++;
    const fn = this.queue.shift()!;
    await fn();
    this.running--;
    this.run();
  }
}

// 使用示例
const queue = new RequestQueue();

async function fetchMultiple() {
  const results = await Promise.all([
    queue.add(() => http.get('/api/data1')),
    queue.add(() => http.get('/api/data2')),
    queue.add(() => http.get('/api/data3')),
  ]);
  return results;
}
```

### 5. 小程序和 H5 的上传差异？

**小程序端：**

```typescript
// 小程序使用 uni.uploadFile
uni.uploadFile({
  url: 'https://api.example.com/upload',
  filePath: tempFilePath,
  name: 'file',
  formData: {
    user: 'test',
  },
  success: (res) => {
    console.log('上传成功', res);
  },
});
```

**H5 端：**

```typescript
// H5 可以使用 FormData
const formData = new FormData();
formData.append('file', file);
formData.append('user', 'test');

await http.post('/upload', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
```

**统一方案：**

本项目的 `useUpload` Hook 已经统一处理了平台差异，直接使用即可：

```typescript
const { run } = useUpload({
  fileType: 'image',
  url: '/upload',
  formData: { user: 'test' },
});

run(); // 自动适配平台
```

## 相关链接

- [@uni-helper/uni-network 文档](https://uni-helper.js.org/uni-network)
- [UniApp 网络请求 API](https://uniapp.dcloud.net.cn/api/request/request)
- [UniApp 文件上传 API](https://uniapp.dcloud.net.cn/api/request/network-file)
