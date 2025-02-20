# Request

This article introduces the encapsulation logic of API requests in the project, including request tool configuration, common method encapsulation, status code handling, and specific interface calling examples.

## Project Structure Overview

### File Description

- **`CheckStatus.ts`**: Defines HTTP status code handling logic, providing corresponding prompts or operations for different status codes.
- **`index.ts`**: Encapsulates common HTTP request methods (`GET`, `POST`, `PATCH`, `DELETE`), all called through the `http` object.
- **`request.ts`**: Configures the Axios instance, including request interceptors, response interceptors, and error handling logic.
- **`user.ts`**: Example interface file, defines specific API calling methods and related data types.

## Core Features

### 1. Axios Instance Configuration

File: `request.ts`

- **Basic Configuration**:

  - `baseURL`: Configure base API address through environment variable `VITE_APP_BASE_API`.
  - `timeout`: Set timeout to 5000ms.

- **Request Interceptor**:

  - Automatically adds user's `token` in request header (if exists).
  - Provides global request error prompts.

- **Response Interceptor**:
  - Checks if HTTP status code is `200`, and determines if interface is successful based on returned `code`.
  - Calls `checkStatus` method to uniformly handle interface returned error status codes.

### 2. HTTP Status Code Handling

File: `CheckStatus.ts`

- **Features**:

  - Provides corresponding error prompts based on HTTP status codes (like `400`, `401`, `500`, etc.).
  - Special handling for `401` status code, automatically triggers user logout.

- **Error Prompt Tools**:
  - Uses `react-vant`'s `Toast` method to display error prompts.
  - `i18n` internationalization tool, supports multilingual error messages.

### 3. Common HTTP Request Method Encapsulation

File: `index.ts`

- Provides the following common request methods:

  - **`get`**: Encapsulates `GET` requests.
  - **`post`**: Encapsulates `POST` requests.
  - **`patch`**: Encapsulates `PATCH` requests.
  - **`remove`**: Encapsulates `DELETE` requests.

- **Method Signature**:

  ```typescript
  const get = <T>(
    url: string,
    params?: string | object,
    config?: AxiosRequestConfig
  ): Promise<CustomSuccessData<T>>;
  ```

- **Return Value**:

  - Returns a `Promise` containing generic type `T`, representing the interface return data type.

- **Usage**:
  All methods are called through the unified `http` object, for example:
  ```typescript
  http.get('/example', { id: 1 });
  http.post('/login', { username: 'admin', password: '123456' });
  ```

### 4. API Interface Example

File: `user.ts`

- **Interface Definition**:

  - `api` object uniformly defines interface paths.
  - Provides specific interface calling methods, like `getExampleAPI` and `postLoginAPI`.

- **Example Interface**:

  - **Get Example Data**:

    ```typescript
    export function getExampleAPI() {
      return http.get<{ content: string; date: number }>('/example');
    }
    ```

    **Description**:

    - Return data type is `{ content: string; date: number }`.
    - Usage:
      ```typescript
      getExampleAPI().then((res) => {
        console.log(res.data.content);
      });
      ```

  - **User Login**:
    ```typescript
    export function postLoginAPI(data: loginDataType) {
      return http.post<userInfoRepType>('/auth/login', data);
    }
    ```
    **Description**:
    - Parameter type is:
      ```typescript
      type loginDataType = {
        username: string;
        password: string;
      };
      ```
    - Return data type is:
      ```typescript
      interface userInfoRepType {
        user: userInfoType;
        token: string;
      }
      ```
    - Usage:
      ```typescript
      postLoginAPI({ username: 'admin', password: '123456' }).then((res) => {
        console.log('Login successful, token:', res.data.token);
      });
      ```

## Usage Instructions

### 1. Import and Use

In places where you need to call APIs, directly import the corresponding interface methods. For example:

```typescript
import { getExampleAPI, postLoginAPI } from '@/api/user';

getExampleAPI().then((res) => {
  console.log('Example data:', res.data);
});

postLoginAPI({ username: 'admin', password: '123456' }).then((res) => {
  console.log('Login successful, token:', res.data.token);
});
```

### 2. Status Code Prompts

All interface error status codes will be caught and prompted by the `checkStatus` method. For example:

- **401 Unauthorized**:
  - Prompts user not logged in, and automatically triggers logout logic.
- **500 Server Error**:
  - Prompts server issue.

## Notes

1. **Token Auto-Addition**:

   - In request interceptor, it automatically gets `token` from `zustand`'s `useUserStore` and adds it to request header. If project doesn't use `token`, related logic needs to be modified.

2. **Internationalization Support**:

   - Error prompt messages implement internationalization through `i18n`, ensure `i18n` configuration is complete.

3. **Interface Return Format**:

   - Interface return `code` of `0` indicates success, otherwise will trigger error prompt.

4. **Timeout**:
   - Default timeout is 5000ms, can be modified in `request.ts` according to needs.

## Related Links

- [Axios Official Documentation](https://axios-http.com/)
