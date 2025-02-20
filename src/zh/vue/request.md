# 请求

本文介绍了项目中 API 请求的封装逻辑，包括请求工具的配置、常用方法的封装、状态码处理以及具体的接口调用示例。

## 项目结构概览

### 文件说明

- **`CheckStatus.ts`**：定义了 HTTP 状态码的处理逻辑，针对不同状态码提供对应的提示或操作。
- **`index.ts`**：封装了常用的 HTTP 请求方法（`GET`、`POST`、`PATCH`、`DELETE`），统一通过 `http` 对象调用。
- **`request.ts`**：配置了 `axios` 实例，包含请求拦截器、响应拦截器以及错误处理逻辑。
- **`user.ts`**：示例接口文件，定义了具体的 API 调用方法及相关数据类型。

## 核心功能

### 1. Axios 实例配置

文件：`request.ts`

- **基础配置**：

  - `baseURL`：通过环境变量 `VITE_APP_BASE_API` 配置基础接口地址。
  - `timeout`：设置超时时间为 5000ms。

- **请求拦截器**：

  - 在请求头中自动添加用户的 `token`（如果存在）。
  - 提供全局的请求错误提示。

- **响应拦截器**：
  - 判断 HTTP 状态码是否为 `200`，并根据返回的 `code` 判断接口是否成功。
  - 对接口返回的错误状态码调用 `checkStatus` 方法统一处理。

### 2. HTTP 状态码处理

文件：`CheckStatus.ts`

- **功能**：

  - 根据 HTTP 状态码（如 `400`、`401`、`500` 等）提供对应的错误提示。
  - 对 `401` 状态码进行特殊处理，自动触发用户登出操作。

- **使用的工具**：
  - `vant` 的 `showFailToast` 方法，用于显示错误提示。
  - `i18n` 国际化工具，支持多语言错误信息。

### 3. 常用 HTTP 请求方法封装

文件：`index.ts`

- 提供了以下常用的请求方法：

  - **`get`**：封装 `GET` 请求。
  - **`post`**：封装 `POST` 请求。
  - **`patch`**：封装 `PATCH` 请求。
  - **`remove`**：封装 `DELETE` 请求。

- **方法签名**：

  ```typescript
  const get = <T>(
    url: string,
    params?: string | object,
    config?: AxiosRequestConfig
  ): Promise<CustomSuccessData<T>>;
  ```

- **返回值**：

  - 返回一个 `Promise`，其中包含泛型 `T`，表示接口返回的数据类型。

- **使用方式**：
  所有方法通过统一的 `http` 对象调用，例如：
  ```typescript
  http.get('/example', { id: 1 });
  http.post('/login', { username: 'admin', password: '123456' });
  ```

### 4. API 接口示例

文件：`user.ts`

- **接口定义**：

  - `api` 对象统一定义接口路径。
  - 提供具体的接口调用方法，如 `getExampleAPI` 和 `postLoginAPI`。

- **示例接口**：

  - **获取示例数据**：

    ```typescript
    export function getExampleAPI() {
      return http.get<{ content: string; date: number }>('/example');
    }
    ```

    **说明**：

    - 返回的数据类型为 `{ content: string; date: number }`。
    - 调用方式：
      ```typescript
      getExampleAPI().then((res) => {
        console.log(res.data.content);
      });
      ```

  - **用户登录**：
    ```typescript
    export function postLoginAPI(data: loginDataType) {
      return http.post<userInfoRepType>('/auth/login', data);
    }
    ```
    **说明**：
    - 参数类型为：
      ```typescript
      type loginDataType = {
        username: string;
        password: string;
      };
      ```
    - 返回的数据类型为：
      ```typescript
      interface userInfoRepType {
        user: userInfoType;
        token: string;
      }
      ```
    - 调用方式：
      ```typescript
      postLoginAPI({ username: 'admin', password: '123456' }).then((res) => {
        console.log(res.data.token);
      });
      ```

## 使用说明

### 1. 引入和使用

在需要调用 API 的地方，直接引入对应的接口方法。例如：

```typescript
import { getExampleAPI, postLoginAPI } from '@/api/user';

getExampleAPI().then((res) => {
  console.log('示例数据：', res.data);
});

postLoginAPI({ username: 'admin', password: '123456' }).then((res) => {
  console.log('登录成功，token：', res.data.token);
});
```

### 2. 状态码提示

所有接口的错误状态码都会被 `checkStatus` 方法捕获并提示。例如：

- **401 未授权**：
  - 提示用户未登录，并自动触发登出逻辑。
- **500 服务器错误**：
  - 提示服务器出现问题。

## 注意事项

1. **Token 的自动添加**：

   - 在请求拦截器中，会自动从 `Pinia` 的 `userStore` 中获取 `token`，并添加到请求头中。如果项目中未使用 `Pinia`，需要修改相关逻辑。

2. **国际化支持**：

   - 错误提示信息通过 `i18n` 实现国际化，需确保 `i18n` 配置完成。

3. **接口返回格式**：

   - 接口返回的 `code` 为 `0` 时表示成功，否则会触发错误提示。

4. **超时时间**：
   - 默认超时时间为 5000ms，可根据需求在 `request.ts` 中修改。

## 相关链接

- [Axios 官方文档](https://axios-http.com/)
