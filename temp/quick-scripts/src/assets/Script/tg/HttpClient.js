"use strict";
cc._RF.push(module, 'acb490slPxGpbvr4CIXW7tD', 'HttpClient');
// Script/tg/HttpClient.ts

"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildTelegramParams = void 0;
var LanguageData_1 = require("../Language/LanguageData");
/**
 * HTTP 客户端工具类，封装常见请求操作
 * @class
 * @example
 * const client = new HttpClient({ baseUrl: 'https://api.example.com' });
 * client.get<User>('/users/123');
 */
var HttpClient = /** @class */ (function () {
    /**
     * 构造函数
     *
     * @param config 配置对象，用于初始化实例
     * @param config.baseUrl 可选，基础URL，默认为空字符串
     * @param config.headers 可选，HTTP请求头，默认为空对象
     * @param config.timeout 可选，请求超时时间，单位为毫秒，默认为10000毫秒
     */
    function HttpClient(config) {
        if (config === void 0) { config = {}; }
        // 在类属性中增加请求映射表
        this.pendingRequests = new Map(); //Promise<ApiMsg>
        this.pendingQueue = new Map();
        this.baseUrl = config.baseUrl || '';
        this.defaultHeaders = __assign({ 'Content-Type': 'application/json' }, config.headers);
        this.defaultTimeout = config.timeout || 10000;
    }
    /**
     * 设置认证令牌
     *
     * @param token 认证令牌字符串
     */
    HttpClient.prototype.setAuthToken = function (token) {
        this.authToken = token;
    };
    /**
     * 判断是否为 ErrorResponse
     */
    HttpClient.prototype.isErrorResponse = function (response) {
        return typeof response === 'object' &&
            response !== null &&
            'status' in response &&
            response.status >= 400;
    };
    /**
     * 发送 GET 请求
     *
     * @param endpoint 请求的 URL 路径
     * @param config 请求的配置选项（可选）
     * @returns 返回请求结果，类型为泛型 T
     */
    HttpClient.prototype.get = function (endpoint, config) {
        return __awaiter(this, void 0, Promise, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request('GET', endpoint, undefined, config)];
                    case 1:
                        result = _a.sent();
                        if (this.isErrorResponse(result)) {
                            console.error(endpoint, 'API Error:', result);
                            return [2 /*return*/, result];
                        }
                        else {
                            // 正常处理数据
                            return [2 /*return*/, result];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 发送 POST 请求
     *
     * @param endpoint 请求的 API 端点
     * @param data 请求携带的数据，可选参数
     * @param config 请求配置，可选参数
     * @returns 返回请求结果的 Promise 对象
     */
    HttpClient.prototype.post = function (endpoint, data, config) {
        return __awaiter(this, void 0, Promise, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request('POST', endpoint, data, config)];
                    case 1:
                        result = _a.sent();
                        // if (this.isErrorResponse(result)) {
                        //   console.error(endpoint, 'API Error:', result);
                        //   return result;
                        // } else {
                        //   // 正常处理数据
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * 异步发送 PUT 请求。
     *
     * @param endpoint 请求的端点。
     * @param data 可选参数，请求携带的数据。
     * @param config 可选参数，请求的配置项。
     * @returns 返回一个 Promise，解析为请求结果的类型 T。
     */
    HttpClient.prototype.put = function (endpoint, data, config) {
        return __awaiter(this, void 0, Promise, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request('PUT', endpoint, data, config)];
                    case 1:
                        result = _a.sent();
                        // if (this.isErrorResponse(result)) {
                        //   console.error(endpoint, 'API Error:', result);
                        //   return result;
                        // } else {
                        //   // 正常处理数据
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * 删除指定资源的异步方法。
     *
     * @param endpoint 目标资源的路径。
     * @param config 可选的请求配置。
     * @returns 返回一个Promise，解析为删除操作的结果。
     */
    HttpClient.prototype.delete = function (endpoint, config) {
        return __awaiter(this, void 0, Promise, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request('DELETE', endpoint, undefined, config)];
                    case 1:
                        result = _a.sent();
                        // if (this.isErrorResponse(result)) {
                        //   console.error(endpoint, 'API Error:', result);
                        //   return result;
                        // } else {
                        //   // 正常处理数据
                        return [2 /*return*/, result];
                }
            });
        });
    };
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
    HttpClient.prototype.request = function (method, endpoint, data, config) {
        return __awaiter(this, void 0, Promise, function () {
            var requestKey, controller, timeout, timeoutId, headers, url, body, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestKey = method + "-" + endpoint + "-" + JSON.stringify(data);
                        // 检查重复请求
                        if (this.pendingRequests.has(requestKey)) {
                            switch (config === null || config === void 0 ? void 0 : config.repeatMode) {
                                case 'queue':
                                    // 等待现有请求完成
                                    // return this.pendingRequests.get(requestKey)!;
                                    break;
                                default:
                                    // case 'reject':
                                    return [2 /*return*/, { status: 409, message: 'null' }];
                            }
                        }
                        else {
                            this.pendingRequests.set(requestKey, requestKey);
                        }
                        controller = new AbortController();
                        timeout = (config === null || config === void 0 ? void 0 : config.timeout) || this.defaultTimeout;
                        timeoutId = setTimeout(function () {
                            controller.abort(); // 中止请求
                            throw new Error("Request timed out after " + timeout + "ms"); // 抛出超时错误，进入 catch 分支
                            // return {
                            //   status: 408,
                            //   message: '**Request timed out'
                            // } as ErrorResponse;
                        }, timeout);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, 5, 6]);
                        return [4 /*yield*/, this.prepareHeaders(config)];
                    case 2:
                        headers = _a.sent();
                        url = "" + this.baseUrl + endpoint;
                        body = data ? JSON.stringify(data) : null;
                        console.log(endpoint, 'body', body);
                        return [4 /*yield*/, fetch(url, {
                                method: method,
                                headers: headers,
                                body: body,
                                signal: controller.signal,
                            })];
                    case 3:
                        response = _a.sent();
                        clearTimeout(timeoutId); // 清除超时定时器
                        return [2 /*return*/, this.handleResponse(response)]; // 处理响应
                    case 4:
                        error_1 = _a.sent();
                        clearTimeout(timeoutId); // 清除超时定时器
                        return [2 /*return*/, this.handleError(error_1)]; // 处理错误
                    case 5:
                        // 请求完成后移除记录
                        this.pendingRequests.delete(requestKey);
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 异步准备HTTP请求头
     *
     * @param config 可选的HTTP请求配置
     * @returns 返回一个Promise，解析为HeadersInit对象
     */
    HttpClient.prototype.prepareHeaders = function (config) {
        return __awaiter(this, void 0, Promise, function () {
            var headers, key, key;
            return __generator(this, function (_a) {
                headers = {};
                // 添加默认 headers
                if (this.defaultHeaders) {
                    for (key in this.defaultHeaders) {
                        if (this.defaultHeaders.hasOwnProperty(key)) {
                            headers[key] = this.defaultHeaders[key];
                        }
                    }
                }
                // 添加 config 中的 headers
                if (config === null || config === void 0 ? void 0 : config.headers) {
                    for (key in config.headers) {
                        if (config.headers.hasOwnProperty(key)) {
                            headers[key] = config.headers[key];
                        }
                    }
                }
                // 添加 Authorization 头
                if ((config === null || config === void 0 ? void 0 : config.auth) && this.authToken) {
                    console.log('Adding Authorization header:', "Bearer " + this.authToken);
                    headers['Authorization'] = "Bearer " + this.authToken;
                }
                console.log('Final request headers:', headers);
                return [2 /*return*/, headers];
            });
        });
    };
    /**
     * 处理HTTP响应
     *
     * @param response HTTP响应对象
     * @returns 解析后的响应数据
     * @throws 如果响应状态码不是2xx，则抛出包含错误信息的ErrorResponse对象
     */
    HttpClient.prototype.handleResponse = function (response) {
        return __awaiter(this, void 0, Promise, function () {
            var errorData, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!response.ok) return [3 /*break*/, 2];
                        return [4 /*yield*/, response.json().catch(function () { return null; })];
                    case 1:
                        errorData = _a.sent();
                        if (errorData && errorData.message) {
                            console.warn('Error API response:', errorData);
                            return [2 /*return*/, {
                                    status: response.status,
                                    message: "" + errorData.message,
                                    response: errorData,
                                }];
                        }
                        else {
                            console.warn('Error API unknown response:', response);
                            return [2 /*return*/, {
                                    status: response.status,
                                    message: "" + LanguageData_1.t('tips.unknownError'),
                                    response: null,
                                }];
                        }
                        _a.label = 2;
                    case 2: return [4 /*yield*/, response.json()];
                    case 3:
                        data = _a.sent();
                        return [2 /*return*/, {
                                status: response.status,
                                message: 'Success',
                                response: data,
                            }];
                }
            });
        });
    };
    /**
     * 处理错误的方法
     *
     * @param error 错误对象
     * @returns 异常数据或错误信息对象，包括错误状态码和消息。
     */
    HttpClient.prototype.handleError = function (error) {
        // 如果错误是DOMException且错误名称是'AbortError'
        var result;
        if (error instanceof DOMException && error.name === 'AbortError') {
            // 返回408错误响应，消息为'Request timed out'
            result = {
                status: 408,
                message: 'Request timed out'
            };
        }
        // 如果错误是Error且消息以'Request timed out'开头
        else if (error instanceof Error && error.message.startsWith('Request timed out')) {
            // 返回408错误响应，消息为原消息前加'**'
            result = {
                status: 408,
                message: '' + error.message
            };
        }
        else {
            // 返回500错误响应，如果错误是Error，则消息为原消息，否则为'Unknown error occurred'
            result = {
                status: 500,
                message: error instanceof Error ? '' + error.message : 'Unknown error occurred'
            };
        }
        console.error('error:', error);
        console.error('Error during request:', result);
        return result;
    };
    return HttpClient;
}());
exports.default = HttpClient;
/**
 * 将对象转换为 Telegram Web App 要求的 URL 编码字符串
 * @param params 参数对象
 * @param fieldOrder 字段顺序数组（确保与 Telegram 要求一致）
 * @param serializers 自定义字段序列化器
 * @returns URL 编码字符串
 */
function buildTelegramParams(params, fieldOrder, serializers) {
    var pairs = [];
    for (var _i = 0, fieldOrder_1 = fieldOrder; _i < fieldOrder_1.length; _i++) {
        var key = fieldOrder_1[_i];
        if (!(key in params))
            continue;
        var value = params[key];
        // 优先使用自定义序列化
        if (serializers === null || serializers === void 0 ? void 0 : serializers[key]) {
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
        pairs.push(encodeURIComponent(key) + "=" + value);
    }
    return pairs.join("&");
}
exports.buildTelegramParams = buildTelegramParams;

cc._RF.pop();