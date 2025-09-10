import { t } from "../Language/LanguageData";

declare global {
  /**
   * HTTP 接口消息
   * @param status 状态码
   * @param message 信息
   * @param data 数据，可选
   */
  interface ApiMsg<T = any> {
    /** 状态码 */
    status: number;
    /** 信息 */
    message: string;
    /** 响应数据 */
    response?: T;
  }

  interface IResponseData {
    data: any;
    success: boolean;
  }
}

/**
 * HTTP请求方法类型
 */
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

/**
 * HTTP请求配置接口
 * @param headers 请求头对象，可选
 * @param timeout 请求超时时间，单位为毫秒，可选
 * @param auth 是否需要认证，默认为 false
 */
interface RequestConfig {
  headers?: Record<string, string>;
  timeout?: number;
  auth?: boolean;
  /** 重复请求处理模式 'reject': 直接拒绝 | 'queue': 进入队列等待 */
  repeatMode?: 'reject' | 'queue';
}

/**
 * HTTP 客户端工具类，封装常见请求操作
 * @class
 * @example
 * const client = new HttpClient({ baseUrl: 'https://api.example.com' });
 * client.get<User>('/users/123');
 */
export default class HttpClient {
  /** 
   * 基础 API 地址，会自动拼接到所有请求路径前 
   */
  private baseUrl: string;
  /** 
   * 默认请求头配置，会被具体请求的 headers 覆盖 
   */
  private defaultHeaders: HeadersInit;
  /** 
   * 请求超时时间（毫秒），默认 10 秒 
   */
  private defaultTimeout: number;
  /** 
   * 认证令牌，用于请求头中携带的授权信息 
   */
  private authToken?: string;

  /**
   * 构造函数
   *
   * @param config 配置对象，用于初始化实例
   * @param config.baseUrl 可选，基础URL，默认为空字符串
   * @param config.headers 可选，HTTP请求头，默认为空对象
   * @param config.timeout 可选，请求超时时间，单位为毫秒，默认为10000毫秒
   */
  constructor(config: {
    baseUrl?: string;
    headers?: HeadersInit;
    timeout?: number;
  } = {}) {
    this.baseUrl = config.baseUrl || '';
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...config.headers,
    };
    this.defaultTimeout = config.timeout || 10000;
  }

  /**
   * 设置认证令牌
   *
   * @param token 认证令牌字符串
   */
  setAuthToken(token: string) {
    this.authToken = token;
  }

  /**
   * 判断是否为 ErrorResponse
   */
  isErrorResponse<T>(response: ApiMsg): boolean {
    return typeof response === 'object' &&
      response !== null &&
      'status' in response &&
      response.status >= 400
  }

  /**
   * 发送 GET 请求
   *
   * @param endpoint 请求的 URL 路径
   * @param config 请求的配置选项（可选）
   * @returns 返回请求结果，类型为泛型 T
   */
  async get<T>(endpoint: string, config?: RequestConfig): Promise<ApiMsg<T>> {
    const result = await this.request<T>('GET', endpoint, undefined, config);
    if (this.isErrorResponse(result)) {
      console.error(endpoint, 'API Error:', result);
      return result;
    } else {
      // 正常处理数据
      return result;
    }
  }

  /**
   * 发送 POST 请求
   *
   * @param endpoint 请求的 API 端点
   * @param data 请求携带的数据，可选参数
   * @param config 请求配置，可选参数
   * @returns 返回请求结果的 Promise 对象
   */
  async post<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<ApiMsg<T>> {
    const result = await this.request<T>('POST', endpoint, data, config);
    // if (this.isErrorResponse(result)) {
    //   console.error(endpoint, 'API Error:', result);
    //   return result;
    // } else {
    //   // 正常处理数据
    return result;
    // }
  }

  /**
   * 异步发送 PUT 请求。
   *
   * @param endpoint 请求的端点。
   * @param data 可选参数，请求携带的数据。
   * @param config 可选参数，请求的配置项。
   * @returns 返回一个 Promise，解析为请求结果的类型 T。
   */
  async put<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<ApiMsg<T>> {
    const result = await this.request<T>('PUT', endpoint, data, config);
    // if (this.isErrorResponse(result)) {
    //   console.error(endpoint, 'API Error:', result);
    //   return result;
    // } else {
    //   // 正常处理数据
    return result;
    // }
  }

  /**
   * 删除指定资源的异步方法。
   *
   * @param endpoint 目标资源的路径。
   * @param config 可选的请求配置。
   * @returns 返回一个Promise，解析为删除操作的结果。
   */
  async delete<T>(endpoint: string, config?: RequestConfig): Promise<ApiMsg<T>> {
    const result = await this.request<T>('DELETE', endpoint, undefined, config);
    // if (this.isErrorResponse(result)) {
    //   console.error(endpoint, 'API Error:', result);
    //   return result;
    // } else {
    //   // 正常处理数据
    return result;
    // }
  }

  // 在类属性中增加请求映射表
  private pendingRequests: Map<string, any> = new Map();//Promise<ApiMsg>
  private pendingQueue: Map<string, []> = new Map();

  /**
   * 发起HTTP请求
   *
   * @param method 请求方法（GET, POST, PUT, DELETE等）
   * @param endpoint 请求的URL路径
   * @param data 请求体数据，可选
   * @param config 请求配置，可选
   * @returns 返回请求结果
   * @throws 如果请求失败，将返回异常
   */
  private async request<T>(
    method: HttpMethod,
    endpoint: string,
    data?: any,
    config?: RequestConfig
  ): Promise<ApiMsg> {
    // 生成唯一请求标识（根据实际需求调整）
    const requestKey = `${method}-${endpoint}-${JSON.stringify(data)}`;

    // 检查重复请求
    if (this.pendingRequests.has(requestKey)) {
      switch (config?.repeatMode) {
        case 'queue':
          // 等待现有请求完成
          // return this.pendingRequests.get(requestKey)!;
          break;
        default:
          // case 'reject':
          return { status: 409, message: 'null' };
      }
    }
    else {
      this.pendingRequests.set(requestKey, requestKey);
    }


    // 创建新的请求 Promise
    const controller = new AbortController(); // 创建中止控制器
    const timeout = config?.timeout || this.defaultTimeout; // 获取请求超时时间，默认为defaultTimeout

    const timeoutId = setTimeout(() => {
      controller.abort(); // 中止请求
      throw new Error(`Request timed out after ${timeout}ms`); // 抛出超时错误，进入 catch 分支
      // return {
      //   status: 408,
      //   message: '**Request timed out'
      // } as ErrorResponse;
    }, timeout);

    try {
      const headers = await this.prepareHeaders(config); // 准备请求头
      const url = `${this.baseUrl}${endpoint}`; // 构建完整的URL路径
      const body = data ? JSON.stringify(data) : null;
      console.log(endpoint, 'body', body);

      const response: Response = await fetch(url, { // 发起fetch请求
        method, // 请求方法
        headers, // 请求头
        body, // 请求体
        signal: controller.signal, // 中止信号
      });

      clearTimeout(timeoutId); // 清除超时定时器
      return this.handleResponse<T>(response); // 处理响应
    } catch (error) {
      clearTimeout(timeoutId); // 清除超时定时器
      return this.handleError(error); // 处理错误
    } finally {
      // 请求完成后移除记录
      this.pendingRequests.delete(requestKey);
    }
  }


  /**
   * 异步准备HTTP请求头
   *
   * @param config 可选的HTTP请求配置
   * @returns 返回一个Promise，解析为HeadersInit对象
   */
  private async prepareHeaders(config?: RequestConfig): Promise<Record<string, string>> {
    const headers: Record<string, string> = {};

    // 添加默认 headers
    if (this.defaultHeaders) {
      for (const key in this.defaultHeaders) {
        if (this.defaultHeaders.hasOwnProperty(key)) {
          headers[key] = this.defaultHeaders[key];
        }
      }
    }

    // 添加 config 中的 headers
    if (config?.headers) {
      for (const key in config.headers) {
        if (config.headers.hasOwnProperty(key)) {
          headers[key] = config.headers[key];
        }
      }
    }

    // 添加 Authorization 头
    if (config?.auth && this.authToken) {
      console.log('Adding Authorization header:', `Bearer ${this.authToken}`);
      headers['Authorization'] = `Bearer ${this.authToken}`;
    }

    console.log('Final request headers:', headers);
    return headers;
  }

  /**
   * 处理HTTP响应
   *
   * @param response HTTP响应对象
   * @returns 解析后的响应数据
   * @throws 如果响应状态码不是2xx，则抛出包含错误信息的ErrorResponse对象
   */
  private async handleResponse<T>(response: Response): Promise<ApiMsg<T | any>> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      if (errorData && errorData.message) {
        console.warn('Error API response:', errorData);
        return {
          status: response.status,
          message: `${errorData.message}`,
          response: errorData,
        } as ApiMsg;
      }
      else {
        console.warn('Error API unknown response:', response);
        return {
          status: response.status,
          message: `${t('tips.unknownError')}`,
          response: null,
        } as ApiMsg;

      }
    }

    const data: T = await response.json();
    return {
      status: response.status,
      message: 'Success',
      response: data,
    } as ApiMsg<T>;
  }

  /**
   * 处理错误的方法
   *
   * @param error 错误对象
   * @returns 异常数据或错误信息对象，包括错误状态码和消息。
   */
  private handleError<T>(error: unknown): ApiMsg | T {
    // 如果错误是DOMException且错误名称是'AbortError'
    let result: ApiMsg | T;
    if (error instanceof DOMException && error.name === 'AbortError') {
      // 返回408错误响应，消息为'Request timed out'
      result = {
        status: 408,
        message: 'Request timed out'
      } as ApiMsg;
    }
    // 如果错误是Error且消息以'Request timed out'开头
    else if (error instanceof Error && error.message.startsWith('Request timed out')) {
      // 返回408错误响应，消息为原消息前加'**'
      result = {
        status: 408,
        message: '' + error.message
      } as ApiMsg;
    }
    else {
      // 返回500错误响应，如果错误是Error，则消息为原消息，否则为'Unknown error occurred'
      result = {
        status: 500,
        message: error instanceof Error ? '' + error.message : 'Unknown error occurred'
      } as ApiMsg;
    }

    console.error('error:', error);
    console.error('Error during request:', result);
    return result;
  }
}

/**
 * 将对象转换为 Telegram Web App 要求的 URL 编码字符串
 * @param params 参数对象
 * @param fieldOrder 字段顺序数组（确保与 Telegram 要求一致）
 * @param serializers 自定义字段序列化器
 * @returns URL 编码字符串
 */
export function buildTelegramParams(
  params: Record<string, any>,
  fieldOrder: string[],
  serializers?: Record<string, (value: any) => string>
): string {
  const pairs: string[] = [];

  for (const key of fieldOrder) {
    if (!(key in params)) continue;

    let value = params[key];
    // 优先使用自定义序列化
    if (serializers?.[key]) {
      value = serializers[key](value);
    }
    // 自动处理对象类型
    else if (typeof value === 'object') {
      value = encodeURIComponent(JSON.stringify(value));
    }
    // 基本类型直接编码
    else {
      value = encodeURIComponent(value.toString());
    }

    pairs.push(`${encodeURIComponent(key)}=${value}`);
  }

  return pairs.join("&");
}
