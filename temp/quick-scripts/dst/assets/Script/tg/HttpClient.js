
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/tg/HttpClient.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFx0Z1xcSHR0cENsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlEQUE2QztBQTJDN0M7Ozs7OztHQU1HO0FBQ0g7SUFrQkU7Ozs7Ozs7T0FPRztJQUNILG9CQUFZLE1BSU47UUFKTSx1QkFBQSxFQUFBLFdBSU47UUFzR04sZUFBZTtRQUNQLG9CQUFlLEdBQXFCLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQSxpQkFBaUI7UUFDL0QsaUJBQVksR0FBb0IsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQXZHaEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztRQUNwQyxJQUFJLENBQUMsY0FBYyxjQUNqQixjQUFjLEVBQUUsa0JBQWtCLElBQy9CLE1BQU0sQ0FBQyxPQUFPLENBQ2xCLENBQUM7UUFDRixJQUFJLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQyxPQUFPLElBQUksS0FBSyxDQUFDO0lBQ2hELENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsaUNBQVksR0FBWixVQUFhLEtBQWE7UUFDeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDekIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsb0NBQWUsR0FBZixVQUFtQixRQUFnQjtRQUNqQyxPQUFPLE9BQU8sUUFBUSxLQUFLLFFBQVE7WUFDakMsUUFBUSxLQUFLLElBQUk7WUFDakIsUUFBUSxJQUFJLFFBQVE7WUFDcEIsUUFBUSxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUE7SUFDMUIsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNHLHdCQUFHLEdBQVQsVUFBYSxRQUFnQixFQUFFLE1BQXNCO3VDQUFHLE9BQU87Ozs7NEJBQzlDLHFCQUFNLElBQUksQ0FBQyxPQUFPLENBQUksS0FBSyxFQUFFLFFBQVEsRUFBRSxT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Q0FBQztTQUNqQztRQUNELFdBQVc7YUFDTixJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUNsQyxLQUFLLEdBQUcsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQ25EO1FBQ0QsV0FBVzthQUNOO1lBQ0gsS0FBSyxHQUFHLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1NBQzlDO1FBRUQsS0FBSyxDQUFDLElBQUksQ0FBSSxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsU0FBSSxLQUFPLENBQUMsQ0FBQztLQUNuRDtJQUVELE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN6QixDQUFDO0FBNUJELGtEQTRCQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHQgfSBmcm9tIFwiLi4vTGFuZ3VhZ2UvTGFuZ3VhZ2VEYXRhXCI7XHJcblxyXG5kZWNsYXJlIGdsb2JhbCB7XHJcbiAgLyoqXHJcbiAgICogSFRUUCDmjqXlj6Pmtojmga9cclxuICAgKiBAcGFyYW0gc3RhdHVzIOeKtuaAgeeggVxyXG4gICAqIEBwYXJhbSBtZXNzYWdlIOS/oeaBr1xyXG4gICAqIEBwYXJhbSBkYXRhIOaVsOaNru+8jOWPr+mAiVxyXG4gICAqL1xyXG4gIGludGVyZmFjZSBBcGlNc2c8VCA9IGFueT4ge1xyXG4gICAgLyoqIOeKtuaAgeeggSAqL1xyXG4gICAgc3RhdHVzOiBudW1iZXI7XHJcbiAgICAvKiog5L+h5oGvICovXHJcbiAgICBtZXNzYWdlOiBzdHJpbmc7XHJcbiAgICAvKiog5ZON5bqU5pWw5o2uICovXHJcbiAgICByZXNwb25zZT86IFQ7XHJcbiAgfVxyXG5cclxuICBpbnRlcmZhY2UgSVJlc3BvbnNlRGF0YSB7XHJcbiAgICBkYXRhOiBhbnk7XHJcbiAgICBzdWNjZXNzOiBib29sZWFuO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEhUVFDor7fmsYLmlrnms5XnsbvlnotcclxuICovXHJcbnR5cGUgSHR0cE1ldGhvZCA9ICdHRVQnIHwgJ1BPU1QnIHwgJ1BVVCcgfCAnREVMRVRFJyB8ICdQQVRDSCc7XHJcblxyXG4vKipcclxuICogSFRUUOivt+axgumFjee9ruaOpeWPo1xyXG4gKiBAcGFyYW0gaGVhZGVycyDor7fmsYLlpLTlr7nosaHvvIzlj6/pgIlcclxuICogQHBhcmFtIHRpbWVvdXQg6K+35rGC6LaF5pe25pe26Ze077yM5Y2V5L2N5Li65q+r56eS77yM5Y+v6YCJXHJcbiAqIEBwYXJhbSBhdXRoIOaYr+WQpumcgOimgeiupOivge+8jOm7mOiupOS4uiBmYWxzZVxyXG4gKi9cclxuaW50ZXJmYWNlIFJlcXVlc3RDb25maWcge1xyXG4gIGhlYWRlcnM/OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+O1xyXG4gIHRpbWVvdXQ/OiBudW1iZXI7XHJcbiAgYXV0aD86IGJvb2xlYW47XHJcbiAgLyoqIOmHjeWkjeivt+axguWkhOeQhuaooeW8jyAncmVqZWN0Jzog55u05o6l5ouS57udIHwgJ3F1ZXVlJzog6L+b5YWl6Zif5YiX562J5b6FICovXHJcbiAgcmVwZWF0TW9kZT86ICdyZWplY3QnIHwgJ3F1ZXVlJztcclxufVxyXG5cclxuLyoqXHJcbiAqIEhUVFAg5a6i5oi356uv5bel5YW357G777yM5bCB6KOF5bi46KeB6K+35rGC5pON5L2cXHJcbiAqIEBjbGFzc1xyXG4gKiBAZXhhbXBsZVxyXG4gKiBjb25zdCBjbGllbnQgPSBuZXcgSHR0cENsaWVudCh7IGJhc2VVcmw6ICdodHRwczovL2FwaS5leGFtcGxlLmNvbScgfSk7XHJcbiAqIGNsaWVudC5nZXQ8VXNlcj4oJy91c2Vycy8xMjMnKTtcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEh0dHBDbGllbnQge1xyXG4gIC8qKiBcclxuICAgKiDln7rnoYAgQVBJIOWcsOWdgO+8jOS8muiHquWKqOaLvOaOpeWIsOaJgOacieivt+axgui3r+W+hOWJjSBcclxuICAgKi9cclxuICBwcml2YXRlIGJhc2VVcmw6IHN0cmluZztcclxuICAvKiogXHJcbiAgICog6buY6K6k6K+35rGC5aS06YWN572u77yM5Lya6KKr5YW35L2T6K+35rGC55qEIGhlYWRlcnMg6KaG55uWIFxyXG4gICAqL1xyXG4gIHByaXZhdGUgZGVmYXVsdEhlYWRlcnM6IEhlYWRlcnNJbml0O1xyXG4gIC8qKiBcclxuICAgKiDor7fmsYLotoXml7bml7bpl7TvvIjmr6vnp5LvvInvvIzpu5jorqQgMTAg56eSIFxyXG4gICAqL1xyXG4gIHByaXZhdGUgZGVmYXVsdFRpbWVvdXQ6IG51bWJlcjtcclxuICAvKiogXHJcbiAgICog6K6k6K+B5Luk54mM77yM55So5LqO6K+35rGC5aS05Lit5pC65bim55qE5o6I5p2D5L+h5oGvIFxyXG4gICAqL1xyXG4gIHByaXZhdGUgYXV0aFRva2VuPzogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiDmnoTpgKDlh73mlbBcclxuICAgKlxyXG4gICAqIEBwYXJhbSBjb25maWcg6YWN572u5a+56LGh77yM55So5LqO5Yid5aeL5YyW5a6e5L6LXHJcbiAgICogQHBhcmFtIGNvbmZpZy5iYXNlVXJsIOWPr+mAie+8jOWfuuehgFVSTO+8jOm7mOiupOS4uuepuuWtl+espuS4slxyXG4gICAqIEBwYXJhbSBjb25maWcuaGVhZGVycyDlj6/pgInvvIxIVFRQ6K+35rGC5aS077yM6buY6K6k5Li656m65a+56LGhXHJcbiAgICogQHBhcmFtIGNvbmZpZy50aW1lb3V0IOWPr+mAie+8jOivt+axgui2heaXtuaXtumXtO+8jOWNleS9jeS4uuavq+enku+8jOm7mOiupOS4ujEwMDAw5q+r56eSXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoY29uZmlnOiB7XHJcbiAgICBiYXNlVXJsPzogc3RyaW5nO1xyXG4gICAgaGVhZGVycz86IEhlYWRlcnNJbml0O1xyXG4gICAgdGltZW91dD86IG51bWJlcjtcclxuICB9ID0ge30pIHtcclxuICAgIHRoaXMuYmFzZVVybCA9IGNvbmZpZy5iYXNlVXJsIHx8ICcnO1xyXG4gICAgdGhpcy5kZWZhdWx0SGVhZGVycyA9IHtcclxuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgLi4uY29uZmlnLmhlYWRlcnMsXHJcbiAgICB9O1xyXG4gICAgdGhpcy5kZWZhdWx0VGltZW91dCA9IGNvbmZpZy50aW1lb3V0IHx8IDEwMDAwO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6K6+572u6K6k6K+B5Luk54mMXHJcbiAgICpcclxuICAgKiBAcGFyYW0gdG9rZW4g6K6k6K+B5Luk54mM5a2X56ym5LiyXHJcbiAgICovXHJcbiAgc2V0QXV0aFRva2VuKHRva2VuOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuYXV0aFRva2VuID0gdG9rZW47XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDliKTmlq3mmK/lkKbkuLogRXJyb3JSZXNwb25zZVxyXG4gICAqL1xyXG4gIGlzRXJyb3JSZXNwb25zZTxUPihyZXNwb25zZTogQXBpTXNnKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdHlwZW9mIHJlc3BvbnNlID09PSAnb2JqZWN0JyAmJlxyXG4gICAgICByZXNwb25zZSAhPT0gbnVsbCAmJlxyXG4gICAgICAnc3RhdHVzJyBpbiByZXNwb25zZSAmJlxyXG4gICAgICByZXNwb25zZS5zdGF0dXMgPj0gNDAwXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDlj5HpgIEgR0VUIOivt+axglxyXG4gICAqXHJcbiAgICogQHBhcmFtIGVuZHBvaW50IOivt+axgueahCBVUkwg6Lev5b6EXHJcbiAgICogQHBhcmFtIGNvbmZpZyDor7fmsYLnmoTphY3nva7pgInpobnvvIjlj6/pgInvvIlcclxuICAgKiBAcmV0dXJucyDov5Tlm57or7fmsYLnu5PmnpzvvIznsbvlnovkuLrms5vlnosgVFxyXG4gICAqL1xyXG4gIGFzeW5jIGdldDxUPihlbmRwb2ludDogc3RyaW5nLCBjb25maWc/OiBSZXF1ZXN0Q29uZmlnKTogUHJvbWlzZTxBcGlNc2c8VD4+IHtcclxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMucmVxdWVzdDxUPignR0VUJywgZW5kcG9pbnQsIHVuZGVmaW5lZCwgY29uZmlnKTtcclxuICAgIGlmICh0aGlzLmlzRXJyb3JSZXNwb25zZShyZXN1bHQpKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoZW5kcG9pbnQsICdBUEkgRXJyb3I6JywgcmVzdWx0KTtcclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIOato+W4uOWkhOeQhuaVsOaNrlxyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5Y+R6YCBIFBPU1Qg6K+35rGCXHJcbiAgICpcclxuICAgKiBAcGFyYW0gZW5kcG9pbnQg6K+35rGC55qEIEFQSSDnq6/ngrlcclxuICAgKiBAcGFyYW0gZGF0YSDor7fmsYLmkLrluKbnmoTmlbDmja7vvIzlj6/pgInlj4LmlbBcclxuICAgKiBAcGFyYW0gY29uZmlnIOivt+axgumFjee9ru+8jOWPr+mAieWPguaVsFxyXG4gICAqIEByZXR1cm5zIOi/lOWbnuivt+axgue7k+aenOeahCBQcm9taXNlIOWvueixoVxyXG4gICAqL1xyXG4gIGFzeW5jIHBvc3Q8VD4oZW5kcG9pbnQ6IHN0cmluZywgZGF0YT86IGFueSwgY29uZmlnPzogUmVxdWVzdENvbmZpZyk6IFByb21pc2U8QXBpTXNnPFQ+PiB7XHJcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLnJlcXVlc3Q8VD4oJ1BPU1QnLCBlbmRwb2ludCwgZGF0YSwgY29uZmlnKTtcclxuICAgIC8vIGlmICh0aGlzLmlzRXJyb3JSZXNwb25zZShyZXN1bHQpKSB7XHJcbiAgICAvLyAgIGNvbnNvbGUuZXJyb3IoZW5kcG9pbnQsICdBUEkgRXJyb3I6JywgcmVzdWx0KTtcclxuICAgIC8vICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIC8vIH0gZWxzZSB7XHJcbiAgICAvLyAgIC8vIOato+W4uOWkhOeQhuaVsOaNrlxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIC8vIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOW8guatpeWPkemAgSBQVVQg6K+35rGC44CCXHJcbiAgICpcclxuICAgKiBAcGFyYW0gZW5kcG9pbnQg6K+35rGC55qE56uv54K544CCXHJcbiAgICogQHBhcmFtIGRhdGEg5Y+v6YCJ5Y+C5pWw77yM6K+35rGC5pC65bim55qE5pWw5o2u44CCXHJcbiAgICogQHBhcmFtIGNvbmZpZyDlj6/pgInlj4LmlbDvvIzor7fmsYLnmoTphY3nva7pobnjgIJcclxuICAgKiBAcmV0dXJucyDov5Tlm57kuIDkuKogUHJvbWlzZe+8jOino+aekOS4uuivt+axgue7k+aenOeahOexu+WeiyBU44CCXHJcbiAgICovXHJcbiAgYXN5bmMgcHV0PFQ+KGVuZHBvaW50OiBzdHJpbmcsIGRhdGE/OiBhbnksIGNvbmZpZz86IFJlcXVlc3RDb25maWcpOiBQcm9taXNlPEFwaU1zZzxUPj4ge1xyXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5yZXF1ZXN0PFQ+KCdQVVQnLCBlbmRwb2ludCwgZGF0YSwgY29uZmlnKTtcclxuICAgIC8vIGlmICh0aGlzLmlzRXJyb3JSZXNwb25zZShyZXN1bHQpKSB7XHJcbiAgICAvLyAgIGNvbnNvbGUuZXJyb3IoZW5kcG9pbnQsICdBUEkgRXJyb3I6JywgcmVzdWx0KTtcclxuICAgIC8vICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIC8vIH0gZWxzZSB7XHJcbiAgICAvLyAgIC8vIOato+W4uOWkhOeQhuaVsOaNrlxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIC8vIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOWIoOmZpOaMh+Wumui1hOa6kOeahOW8guatpeaWueazleOAglxyXG4gICAqXHJcbiAgICogQHBhcmFtIGVuZHBvaW50IOebruagh+i1hOa6kOeahOi3r+W+hOOAglxyXG4gICAqIEBwYXJhbSBjb25maWcg5Y+v6YCJ55qE6K+35rGC6YWN572u44CCXHJcbiAgICogQHJldHVybnMg6L+U5Zue5LiA5LiqUHJvbWlzZe+8jOino+aekOS4uuWIoOmZpOaTjeS9nOeahOe7k+aenOOAglxyXG4gICAqL1xyXG4gIGFzeW5jIGRlbGV0ZTxUPihlbmRwb2ludDogc3RyaW5nLCBjb25maWc/OiBSZXF1ZXN0Q29uZmlnKTogUHJvbWlzZTxBcGlNc2c8VD4+IHtcclxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMucmVxdWVzdDxUPignREVMRVRFJywgZW5kcG9pbnQsIHVuZGVmaW5lZCwgY29uZmlnKTtcclxuICAgIC8vIGlmICh0aGlzLmlzRXJyb3JSZXNwb25zZShyZXN1bHQpKSB7XHJcbiAgICAvLyAgIGNvbnNvbGUuZXJyb3IoZW5kcG9pbnQsICdBUEkgRXJyb3I6JywgcmVzdWx0KTtcclxuICAgIC8vICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIC8vIH0gZWxzZSB7XHJcbiAgICAvLyAgIC8vIOato+W4uOWkhOeQhuaVsOaNrlxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIC8vIH1cclxuICB9XHJcblxyXG4gIC8vIOWcqOexu+WxnuaAp+S4reWinuWKoOivt+axguaYoOWwhOihqFxyXG4gIHByaXZhdGUgcGVuZGluZ1JlcXVlc3RzOiBNYXA8c3RyaW5nLCBhbnk+ID0gbmV3IE1hcCgpOy8vUHJvbWlzZTxBcGlNc2c+XHJcbiAgcHJpdmF0ZSBwZW5kaW5nUXVldWU6IE1hcDxzdHJpbmcsIFtdPiA9IG5ldyBNYXAoKTtcclxuXHJcbiAgLyoqXHJcbiAgICog5Y+R6LW3SFRUUOivt+axglxyXG4gICAqXHJcbiAgICogQHBhcmFtIG1ldGhvZCDor7fmsYLmlrnms5XvvIhHRVQsIFBPU1QsIFBVVCwgREVMRVRF562J77yJXHJcbiAgICogQHBhcmFtIGVuZHBvaW50IOivt+axgueahFVSTOi3r+W+hFxyXG4gICAqIEBwYXJhbSBkYXRhIOivt+axguS9k+aVsOaNru+8jOWPr+mAiVxyXG4gICAqIEBwYXJhbSBjb25maWcg6K+35rGC6YWN572u77yM5Y+v6YCJXHJcbiAgICogQHJldHVybnMg6L+U5Zue6K+35rGC57uT5p6cXHJcbiAgICogQHRocm93cyDlpoLmnpzor7fmsYLlpLHotKXvvIzlsIbov5Tlm57lvILluLhcclxuICAgKi9cclxuICBwcml2YXRlIGFzeW5jIHJlcXVlc3Q8VD4oXHJcbiAgICBtZXRob2Q6IEh0dHBNZXRob2QsXHJcbiAgICBlbmRwb2ludDogc3RyaW5nLFxyXG4gICAgZGF0YT86IGFueSxcclxuICAgIGNvbmZpZz86IFJlcXVlc3RDb25maWdcclxuICApOiBQcm9taXNlPEFwaU1zZz4ge1xyXG4gICAgLy8g55Sf5oiQ5ZSv5LiA6K+35rGC5qCH6K+G77yI5qC55o2u5a6e6ZmF6ZyA5rGC6LCD5pW077yJXHJcbiAgICBjb25zdCByZXF1ZXN0S2V5ID0gYCR7bWV0aG9kfS0ke2VuZHBvaW50fS0ke0pTT04uc3RyaW5naWZ5KGRhdGEpfWA7XHJcblxyXG4gICAgLy8g5qOA5p+l6YeN5aSN6K+35rGCXHJcbiAgICBpZiAodGhpcy5wZW5kaW5nUmVxdWVzdHMuaGFzKHJlcXVlc3RLZXkpKSB7XHJcbiAgICAgIHN3aXRjaCAoY29uZmlnPy5yZXBlYXRNb2RlKSB7XHJcbiAgICAgICAgY2FzZSAncXVldWUnOlxyXG4gICAgICAgICAgLy8g562J5b6F546w5pyJ6K+35rGC5a6M5oiQXHJcbiAgICAgICAgICAvLyByZXR1cm4gdGhpcy5wZW5kaW5nUmVxdWVzdHMuZ2V0KHJlcXVlc3RLZXkpITtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAvLyBjYXNlICdyZWplY3QnOlxyXG4gICAgICAgICAgcmV0dXJuIHsgc3RhdHVzOiA0MDksIG1lc3NhZ2U6ICdudWxsJyB9O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgdGhpcy5wZW5kaW5nUmVxdWVzdHMuc2V0KHJlcXVlc3RLZXksIHJlcXVlc3RLZXkpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyDliJvlu7rmlrDnmoTor7fmsYIgUHJvbWlzZVxyXG4gICAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTsgLy8g5Yib5bu65Lit5q2i5o6n5Yi25ZmoXHJcbiAgICBjb25zdCB0aW1lb3V0ID0gY29uZmlnPy50aW1lb3V0IHx8IHRoaXMuZGVmYXVsdFRpbWVvdXQ7IC8vIOiOt+WPluivt+axgui2heaXtuaXtumXtO+8jOm7mOiupOS4umRlZmF1bHRUaW1lb3V0XHJcblxyXG4gICAgY29uc3QgdGltZW91dElkID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGNvbnRyb2xsZXIuYWJvcnQoKTsgLy8g5Lit5q2i6K+35rGCXHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgUmVxdWVzdCB0aW1lZCBvdXQgYWZ0ZXIgJHt0aW1lb3V0fW1zYCk7IC8vIOaKm+WHuui2heaXtumUmeivr++8jOi/m+WFpSBjYXRjaCDliIbmlK9cclxuICAgICAgLy8gcmV0dXJuIHtcclxuICAgICAgLy8gICBzdGF0dXM6IDQwOCxcclxuICAgICAgLy8gICBtZXNzYWdlOiAnKipSZXF1ZXN0IHRpbWVkIG91dCdcclxuICAgICAgLy8gfSBhcyBFcnJvclJlc3BvbnNlO1xyXG4gICAgfSwgdGltZW91dCk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgaGVhZGVycyA9IGF3YWl0IHRoaXMucHJlcGFyZUhlYWRlcnMoY29uZmlnKTsgLy8g5YeG5aSH6K+35rGC5aS0XHJcbiAgICAgIGNvbnN0IHVybCA9IGAke3RoaXMuYmFzZVVybH0ke2VuZHBvaW50fWA7IC8vIOaehOW7uuWujOaVtOeahFVSTOi3r+W+hFxyXG4gICAgICBjb25zdCBib2R5ID0gZGF0YSA/IEpTT04uc3RyaW5naWZ5KGRhdGEpIDogbnVsbDtcclxuICAgICAgY29uc29sZS5sb2coZW5kcG9pbnQsICdib2R5JywgYm9keSk7XHJcblxyXG4gICAgICBjb25zdCByZXNwb25zZTogUmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIHsgLy8g5Y+R6LW3ZmV0Y2jor7fmsYJcclxuICAgICAgICBtZXRob2QsIC8vIOivt+axguaWueazlVxyXG4gICAgICAgIGhlYWRlcnMsIC8vIOivt+axguWktFxyXG4gICAgICAgIGJvZHksIC8vIOivt+axguS9k1xyXG4gICAgICAgIHNpZ25hbDogY29udHJvbGxlci5zaWduYWwsIC8vIOS4reatouS/oeWPt1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SWQpOyAvLyDmuIXpmaTotoXml7blrprml7blmahcclxuICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVzcG9uc2U8VD4ocmVzcG9uc2UpOyAvLyDlpITnkIblk43lupRcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SWQpOyAvLyDmuIXpmaTotoXml7blrprml7blmahcclxuICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlRXJyb3IoZXJyb3IpOyAvLyDlpITnkIbplJnor69cclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIC8vIOivt+axguWujOaIkOWQjuenu+mZpOiusOW9lVxyXG4gICAgICB0aGlzLnBlbmRpbmdSZXF1ZXN0cy5kZWxldGUocmVxdWVzdEtleSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICog5byC5q2l5YeG5aSHSFRUUOivt+axguWktFxyXG4gICAqXHJcbiAgICogQHBhcmFtIGNvbmZpZyDlj6/pgInnmoRIVFRQ6K+35rGC6YWN572uXHJcbiAgICogQHJldHVybnMg6L+U5Zue5LiA5LiqUHJvbWlzZe+8jOino+aekOS4ukhlYWRlcnNJbml05a+56LGhXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhc3luYyBwcmVwYXJlSGVhZGVycyhjb25maWc/OiBSZXF1ZXN0Q29uZmlnKTogUHJvbWlzZTxSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+PiB7XHJcbiAgICBjb25zdCBoZWFkZXJzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge307XHJcblxyXG4gICAgLy8g5re75Yqg6buY6K6kIGhlYWRlcnNcclxuICAgIGlmICh0aGlzLmRlZmF1bHRIZWFkZXJzKSB7XHJcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuZGVmYXVsdEhlYWRlcnMpIHtcclxuICAgICAgICBpZiAodGhpcy5kZWZhdWx0SGVhZGVycy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICBoZWFkZXJzW2tleV0gPSB0aGlzLmRlZmF1bHRIZWFkZXJzW2tleV07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5re75YqgIGNvbmZpZyDkuK3nmoQgaGVhZGVyc1xyXG4gICAgaWYgKGNvbmZpZz8uaGVhZGVycykge1xyXG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBjb25maWcuaGVhZGVycykge1xyXG4gICAgICAgIGlmIChjb25maWcuaGVhZGVycy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICBoZWFkZXJzW2tleV0gPSBjb25maWcuaGVhZGVyc1trZXldO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOa3u+WKoCBBdXRob3JpemF0aW9uIOWktFxyXG4gICAgaWYgKGNvbmZpZz8uYXV0aCAmJiB0aGlzLmF1dGhUb2tlbikge1xyXG4gICAgICBjb25zb2xlLmxvZygnQWRkaW5nIEF1dGhvcml6YXRpb24gaGVhZGVyOicsIGBCZWFyZXIgJHt0aGlzLmF1dGhUb2tlbn1gKTtcclxuICAgICAgaGVhZGVyc1snQXV0aG9yaXphdGlvbiddID0gYEJlYXJlciAke3RoaXMuYXV0aFRva2VufWA7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc29sZS5sb2coJ0ZpbmFsIHJlcXVlc3QgaGVhZGVyczonLCBoZWFkZXJzKTtcclxuICAgIHJldHVybiBoZWFkZXJzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5aSE55CGSFRUUOWTjeW6lFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHJlc3BvbnNlIEhUVFDlk43lupTlr7nosaFcclxuICAgKiBAcmV0dXJucyDop6PmnpDlkI7nmoTlk43lupTmlbDmja5cclxuICAgKiBAdGhyb3dzIOWmguaenOWTjeW6lOeKtuaAgeeggeS4jeaYrzJ4eO+8jOWImeaKm+WHuuWMheWQq+mUmeivr+S/oeaBr+eahEVycm9yUmVzcG9uc2Xlr7nosaFcclxuICAgKi9cclxuICBwcml2YXRlIGFzeW5jIGhhbmRsZVJlc3BvbnNlPFQ+KHJlc3BvbnNlOiBSZXNwb25zZSk6IFByb21pc2U8QXBpTXNnPFQgfCBhbnk+PiB7XHJcbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XHJcbiAgICAgIGNvbnN0IGVycm9yRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKS5jYXRjaCgoKSA9PiBudWxsKTtcclxuICAgICAgaWYgKGVycm9yRGF0YSAmJiBlcnJvckRhdGEubWVzc2FnZSkge1xyXG4gICAgICAgIGNvbnNvbGUud2FybignRXJyb3IgQVBJIHJlc3BvbnNlOicsIGVycm9yRGF0YSk7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxyXG4gICAgICAgICAgbWVzc2FnZTogYCR7ZXJyb3JEYXRhLm1lc3NhZ2V9YCxcclxuICAgICAgICAgIHJlc3BvbnNlOiBlcnJvckRhdGEsXHJcbiAgICAgICAgfSBhcyBBcGlNc2c7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS53YXJuKCdFcnJvciBBUEkgdW5rbm93biByZXNwb25zZTonLCByZXNwb25zZSk7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxyXG4gICAgICAgICAgbWVzc2FnZTogYCR7dCgndGlwcy51bmtub3duRXJyb3InKX1gLFxyXG4gICAgICAgICAgcmVzcG9uc2U6IG51bGwsXHJcbiAgICAgICAgfSBhcyBBcGlNc2c7XHJcblxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZGF0YTogVCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxyXG4gICAgICBtZXNzYWdlOiAnU3VjY2VzcycsXHJcbiAgICAgIHJlc3BvbnNlOiBkYXRhLFxyXG4gICAgfSBhcyBBcGlNc2c8VD47XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDlpITnkIbplJnor6/nmoTmlrnms5VcclxuICAgKlxyXG4gICAqIEBwYXJhbSBlcnJvciDplJnor6/lr7nosaFcclxuICAgKiBAcmV0dXJucyDlvILluLjmlbDmja7miJbplJnor6/kv6Hmga/lr7nosaHvvIzljIXmi6zplJnor6/nirbmgIHnoIHlkozmtojmga/jgIJcclxuICAgKi9cclxuICBwcml2YXRlIGhhbmRsZUVycm9yPFQ+KGVycm9yOiB1bmtub3duKTogQXBpTXNnIHwgVCB7XHJcbiAgICAvLyDlpoLmnpzplJnor6/mmK9ET01FeGNlcHRpb27kuJTplJnor6/lkI3np7DmmK8nQWJvcnRFcnJvcidcclxuICAgIGxldCByZXN1bHQ6IEFwaU1zZyB8IFQ7XHJcbiAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBET01FeGNlcHRpb24gJiYgZXJyb3IubmFtZSA9PT0gJ0Fib3J0RXJyb3InKSB7XHJcbiAgICAgIC8vIOi/lOWbnjQwOOmUmeivr+WTjeW6lO+8jOa2iOaBr+S4uidSZXF1ZXN0IHRpbWVkIG91dCdcclxuICAgICAgcmVzdWx0ID0ge1xyXG4gICAgICAgIHN0YXR1czogNDA4LFxyXG4gICAgICAgIG1lc3NhZ2U6ICdSZXF1ZXN0IHRpbWVkIG91dCdcclxuICAgICAgfSBhcyBBcGlNc2c7XHJcbiAgICB9XHJcbiAgICAvLyDlpoLmnpzplJnor6/mmK9FcnJvcuS4lOa2iOaBr+S7pSdSZXF1ZXN0IHRpbWVkIG91dCflvIDlpLRcclxuICAgIGVsc2UgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgJiYgZXJyb3IubWVzc2FnZS5zdGFydHNXaXRoKCdSZXF1ZXN0IHRpbWVkIG91dCcpKSB7XHJcbiAgICAgIC8vIOi/lOWbnjQwOOmUmeivr+WTjeW6lO+8jOa2iOaBr+S4uuWOn+a2iOaBr+WJjeWKoCcqKidcclxuICAgICAgcmVzdWx0ID0ge1xyXG4gICAgICAgIHN0YXR1czogNDA4LFxyXG4gICAgICAgIG1lc3NhZ2U6ICcnICsgZXJyb3IubWVzc2FnZVxyXG4gICAgICB9IGFzIEFwaU1zZztcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAvLyDov5Tlm541MDDplJnor6/lk43lupTvvIzlpoLmnpzplJnor6/mmK9FcnJvcu+8jOWImea2iOaBr+S4uuWOn+a2iOaBr++8jOWQpuWImeS4uidVbmtub3duIGVycm9yIG9jY3VycmVkJ1xyXG4gICAgICByZXN1bHQgPSB7XHJcbiAgICAgICAgc3RhdHVzOiA1MDAsXHJcbiAgICAgICAgbWVzc2FnZTogZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/ICcnICsgZXJyb3IubWVzc2FnZSA6ICdVbmtub3duIGVycm9yIG9jY3VycmVkJ1xyXG4gICAgICB9IGFzIEFwaU1zZztcclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLmVycm9yKCdlcnJvcjonLCBlcnJvcik7XHJcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvciBkdXJpbmcgcmVxdWVzdDonLCByZXN1bHQpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDlsIblr7nosaHovazmjaLkuLogVGVsZWdyYW0gV2ViIEFwcCDopoHmsYLnmoQgVVJMIOe8lueggeWtl+espuS4slxyXG4gKiBAcGFyYW0gcGFyYW1zIOWPguaVsOWvueixoVxyXG4gKiBAcGFyYW0gZmllbGRPcmRlciDlrZfmrrXpobrluo/mlbDnu4TvvIjnoa7kv53kuI4gVGVsZWdyYW0g6KaB5rGC5LiA6Ie077yJXHJcbiAqIEBwYXJhbSBzZXJpYWxpemVycyDoh6rlrprkuYnlrZfmrrXluo/liJfljJblmahcclxuICogQHJldHVybnMgVVJMIOe8lueggeWtl+espuS4slxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkVGVsZWdyYW1QYXJhbXMoXHJcbiAgcGFyYW1zOiBSZWNvcmQ8c3RyaW5nLCBhbnk+LFxyXG4gIGZpZWxkT3JkZXI6IHN0cmluZ1tdLFxyXG4gIHNlcmlhbGl6ZXJzPzogUmVjb3JkPHN0cmluZywgKHZhbHVlOiBhbnkpID0+IHN0cmluZz5cclxuKTogc3RyaW5nIHtcclxuICBjb25zdCBwYWlyczogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgZm9yIChjb25zdCBrZXkgb2YgZmllbGRPcmRlcikge1xyXG4gICAgaWYgKCEoa2V5IGluIHBhcmFtcykpIGNvbnRpbnVlO1xyXG5cclxuICAgIGxldCB2YWx1ZSA9IHBhcmFtc1trZXldO1xyXG4gICAgLy8g5LyY5YWI5L2/55So6Ieq5a6a5LmJ5bqP5YiX5YyWXHJcbiAgICBpZiAoc2VyaWFsaXplcnM/LltrZXldKSB7XHJcbiAgICAgIHZhbHVlID0gc2VyaWFsaXplcnNba2V5XSh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICAvLyDoh6rliqjlpITnkIblr7nosaHnsbvlnotcclxuICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgdmFsdWUgPSBlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkodmFsdWUpKTtcclxuICAgIH1cclxuICAgIC8vIOWfuuacrOexu+Wei+ebtOaOpee8lueggVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHZhbHVlID0gZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlLnRvU3RyaW5nKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHBhaXJzLnB1c2goYCR7ZW5jb2RlVVJJQ29tcG9uZW50KGtleSl9PSR7dmFsdWV9YCk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gcGFpcnMuam9pbihcIiZcIik7XHJcbn1cclxuIl19