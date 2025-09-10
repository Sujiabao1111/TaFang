
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Language/LanguageData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fd46bdyFpBG7KqHCqeWZKHo', 'LanguageData');
// Script/Language/LanguageData.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSceneRenderers = exports.t = exports.init = exports.setLanguage = exports.getLanguage = exports.Language = exports.ready = exports._language = void 0;
var Telegram = window["Telegram"];
exports._language = 'zh';
exports.ready = false;
var Language;
(function (Language) {
    /** 自动 */
    Language[Language["auto"] = 0] = "auto";
    /** 英语 */
    Language[Language["en"] = 1] = "en";
    /** 中文 */
    Language[Language["zh"] = 2] = "zh";
    /** 繁体中文 */
    Language[Language["zhHant"] = 3] = "zhHant";
    /** 俄语 */
    Language[Language["ru"] = 4] = "ru";
    /** 印度尼西亚语 */
    Language[Language["id"] = 5] = "id";
    /** 泰语 */
    Language[Language["th"] = 6] = "th";
    /** 阿拉伯语 */
    Language[Language["ar"] = 7] = "ar";
})(Language = exports.Language || (exports.Language = {}));
function getLanguage() {
    switch (exports._language) {
        case 'zh':
            return Language.zh;
        case 'zh-hans':
            return Language.zh;
        case 'zh-hant':
            return Language.zhHant;
        case 'ru':
            return Language.ru;
        case 'id':
            return Language.id;
        case 'th':
            return Language.th;
        case 'ar':
            return Language.ar;
        case 'en':
            return Language.en;
        default:
            return Language.en;
    }
}
exports.getLanguage = getLanguage;
function setLanguage(language) {
    switch (Number(language)) {
        case Language.auto:
            var user = Telegram.WebApp.initDataUnsafe.user;
            switch (user === null || user === void 0 ? void 0 : user.language_code) {
                case 'zh-hans':
                    init('zh');
                    break;
                case 'zh-hant':
                    init('zhHant');
                    break;
                case 'ru':
                    init('ru');
                    break;
                case 'id':
                    init('id');
                    break;
                case 'th':
                    init('th');
                    break;
                case 'ar':
                    init('ar');
                    break;
                case 'en':
                    init('en');
                    break;
                default:
                    init('en');
                    break;
            }
            break;
        case Language.zh:
            init('zh');
            break;
        case Language.zhHant:
            init('zhHant');
            break;
        case Language.ru:
            init('ru');
            break;
        case Language.id:
            init('id');
            break;
        case Language.th:
            init('th');
            break;
        case Language.ar:
            init('ar');
            break;
        case Language.en:
            init('en');
            break;
        default:
            init('en');
            break;
    }
    updateSceneRenderers();
}
exports.setLanguage = setLanguage;
/**
 * 初始化
 * @param language
 */
function init(language) {
    if (!language) {
        var win_1 = window;
        win_1._languageData.language;
        if (win_1 === null || win_1 === void 0 ? void 0 : win_1._prelanguage) {
            language = win_1._prelanguage;
            console.log("language: " + language);
        }
        else {
            language = 'zh';
        }
    }
    exports.ready = true;
    exports._language = language;
    console.log("language init: " + exports._language);
}
exports.init = init;
/**
 * 翻译数据
 * @param key
 */
function t(key) {
    var params = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        params[_i - 1] = arguments[_i];
    }
    var win = window;
    if (!win.languages) {
        return key;
    }
    var searcher = key.split('.');
    var data = win.languages[exports._language];
    for (var i = 0; i < searcher.length; i++) {
        data = data[searcher[i]];
        if (!data) {
            return '';
        }
    }
    var result = data || '';
    // 处理动态参数替换
    if (params.length > 0) {
        // 支持两种占位符格式：{0} 和 ${0}
        result = result.replace(/\$\{(\d+)\}/g, function (match, p1, p2) {
            var index = p1 ? parseInt(p1) : parseInt(p2);
            return index >= 0 && index < params.length ? params[index] : match;
        });
    }
    return result;
}
exports.t = t;
function updateSceneRenderers() {
    var rootNodes = cc.director.getScene().children;
    // walk all nodes with localize label and update
    var allLocalizedLabels = [];
    for (var i = 0; i < rootNodes.length; ++i) {
        var labels = rootNodes[i].getComponentsInChildren('LocalizedLabel');
        Array.prototype.push.apply(allLocalizedLabels, labels);
    }
    for (var i = 0; i < allLocalizedLabels.length; ++i) {
        var label = allLocalizedLabels[i];
        if (!label.node.active)
            continue;
        label.updateLabel();
    }
    // walk all nodes with localize sprite and update
    var allLocalizedSprites = [];
    for (var i = 0; i < rootNodes.length; ++i) {
        var sprites = rootNodes[i].getComponentsInChildren('LocalizedSprite');
        Array.prototype.push.apply(allLocalizedSprites, sprites);
    }
    for (var i = 0; i < allLocalizedSprites.length; ++i) {
        var sprite = allLocalizedSprites[i];
        if (!sprite.node.active)
            continue;
        sprite.updateSprite();
    }
}
exports.updateSceneRenderers = updateSceneRenderers;
// 供插件查询当前语言使用
var win = window;
win._languageData = {
    get language() {
        return exports._language;
    },
    init: function (lang) {
        init(lang);
    },
    updateSceneRenderers: function () {
        updateSceneRenderers();
    },
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMYW5ndWFnZVxcTGFuZ3VhZ2VEYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQTtBQUV4QixRQUFBLFNBQVMsR0FBRyxJQUFJLENBQUM7QUFFakIsUUFBQSxLQUFLLEdBQVksS0FBSyxDQUFDO0FBRWxDLElBQVksUUFrQlg7QUFsQkQsV0FBWSxRQUFRO0lBQ2hCLFNBQVM7SUFDVCx1Q0FBSSxDQUFBO0lBQ0osU0FBUztJQUNULG1DQUFFLENBQUE7SUFDRixTQUFTO0lBQ1QsbUNBQUUsQ0FBQTtJQUNGLFdBQVc7SUFDWCwyQ0FBTSxDQUFBO0lBQ04sU0FBUztJQUNULG1DQUFFLENBQUE7SUFDRixhQUFhO0lBQ2IsbUNBQUUsQ0FBQTtJQUNGLFNBQVM7SUFDVCxtQ0FBRSxDQUFBO0lBQ0YsV0FBVztJQUNYLG1DQUFFLENBQUE7QUFFTixDQUFDLEVBbEJXLFFBQVEsR0FBUixnQkFBUSxLQUFSLGdCQUFRLFFBa0JuQjtBQUVELFNBQWdCLFdBQVc7SUFDdkIsUUFBUSxpQkFBUyxFQUFFO1FBQ2YsS0FBSyxJQUFJO1lBQ0wsT0FBTyxRQUFRLENBQUMsRUFBRSxDQUFDO1FBQ3ZCLEtBQUssU0FBUztZQUNWLE9BQU8sUUFBUSxDQUFDLEVBQUUsQ0FBQztRQUN2QixLQUFLLFNBQVM7WUFDVixPQUFPLFFBQVEsQ0FBQyxNQUFNLENBQUM7UUFDM0IsS0FBSyxJQUFJO1lBQ0wsT0FBTyxRQUFRLENBQUMsRUFBRSxDQUFDO1FBQ3ZCLEtBQUssSUFBSTtZQUNMLE9BQU8sUUFBUSxDQUFDLEVBQUUsQ0FBQztRQUN2QixLQUFLLElBQUk7WUFDTCxPQUFPLFFBQVEsQ0FBQyxFQUFFLENBQUM7UUFDdkIsS0FBSyxJQUFJO1lBQ0wsT0FBTyxRQUFRLENBQUMsRUFBRSxDQUFDO1FBQ3ZCLEtBQUssSUFBSTtZQUNMLE9BQU8sUUFBUSxD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LENBQUMsR0FBRyxtQkFBbUIsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUU7UUFDakQsSUFBSSxNQUFNLEdBQUcsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTTtZQUFFLFNBQVM7UUFDbEMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO0tBQ3pCO0FBQ0wsQ0FBQztBQXhCRCxvREF3QkM7QUFFRCxjQUFjO0FBQ2QsSUFBTSxHQUFHLEdBQUcsTUFBYSxDQUFDO0FBQzFCLEdBQUcsQ0FBQyxhQUFhLEdBQUc7SUFDaEIsSUFBSSxRQUFRO1FBQ1IsT0FBTyxpQkFBUyxDQUFDO0lBQ3JCLENBQUM7SUFDRCxJQUFJLEVBQUosVUFBSyxJQUFZO1FBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2YsQ0FBQztJQUNELG9CQUFvQjtRQUNoQixvQkFBb0IsRUFBRSxDQUFDO0lBQzNCLENBQUM7Q0FDSixDQUFDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgVGVsZWdyYW0gPSB3aW5kb3dbXCJUZWxlZ3JhbVwiXVxyXG5cclxuZXhwb3J0IGxldCBfbGFuZ3VhZ2UgPSAnemgnO1xyXG5cclxuZXhwb3J0IGxldCByZWFkeTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuZXhwb3J0IGVudW0gTGFuZ3VhZ2Uge1xyXG4gICAgLyoqIOiHquWKqCAqL1xyXG4gICAgYXV0byxcclxuICAgIC8qKiDoi7Hor60gKi9cclxuICAgIGVuLFxyXG4gICAgLyoqIOS4reaWhyAqL1xyXG4gICAgemgsXHJcbiAgICAvKiog57mB5L2T5Lit5paHICovXHJcbiAgICB6aEhhbnQsXHJcbiAgICAvKiog5L+E6K+tICovXHJcbiAgICBydSxcclxuICAgIC8qKiDljbDluqblsLzopb/kupror60gKi9cclxuICAgIGlkLFxyXG4gICAgLyoqIOazsOivrSAqL1xyXG4gICAgdGgsXHJcbiAgICAvKiog6Zi/5ouJ5Lyv6K+tICovXHJcbiAgICBhcixcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRMYW5ndWFnZSgpIHtcclxuICAgIHN3aXRjaCAoX2xhbmd1YWdlKSB7XHJcbiAgICAgICAgY2FzZSAnemgnOlxyXG4gICAgICAgICAgICByZXR1cm4gTGFuZ3VhZ2Uuemg7XHJcbiAgICAgICAgY2FzZSAnemgtaGFucyc6XHJcbiAgICAgICAgICAgIHJldHVybiBMYW5ndWFnZS56aDtcclxuICAgICAgICBjYXNlICd6aC1oYW50JzpcclxuICAgICAgICAgICAgcmV0dXJuIExhbmd1YWdlLnpoSGFudDtcclxuICAgICAgICBjYXNlICdydSc6XHJcbiAgICAgICAgICAgIHJldHVybiBMYW5ndWFnZS5ydTtcclxuICAgICAgICBjYXNlICdpZCc6XHJcbiAgICAgICAgICAgIHJldHVybiBMYW5ndWFnZS5pZDtcclxuICAgICAgICBjYXNlICd0aCc6XHJcbiAgICAgICAgICAgIHJldHVybiBMYW5ndWFnZS50aDtcclxuICAgICAgICBjYXNlICdhcic6XHJcbiAgICAgICAgICAgIHJldHVybiBMYW5ndWFnZS5hcjtcclxuICAgICAgICBjYXNlICdlbic6XHJcbiAgICAgICAgICAgIHJldHVybiBMYW5ndWFnZS5lbjtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gTGFuZ3VhZ2UuZW47XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRMYW5ndWFnZShsYW5ndWFnZTogTGFuZ3VhZ2UpIHtcclxuXHJcbiAgICBzd2l0Y2ggKE51bWJlcihsYW5ndWFnZSkpIHtcclxuICAgICAgICBjYXNlIExhbmd1YWdlLmF1dG86XHJcbiAgICAgICAgICAgIGNvbnN0IHVzZXIgPSBUZWxlZ3JhbS5XZWJBcHAuaW5pdERhdGFVbnNhZmUudXNlcjtcclxuICAgICAgICAgICAgc3dpdGNoICh1c2VyPy5sYW5ndWFnZV9jb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICd6aC1oYW5zJzpcclxuICAgICAgICAgICAgICAgICAgICBpbml0KCd6aCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnemgtaGFudCc6XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdCgnemhIYW50Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdydSc6XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdCgncnUnKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2lkJzpcclxuICAgICAgICAgICAgICAgICAgICBpbml0KCdpZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAndGgnOlxyXG4gICAgICAgICAgICAgICAgICAgIGluaXQoJ3RoJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdhcic6XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdCgnYXInKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2VuJzpcclxuICAgICAgICAgICAgICAgICAgICBpbml0KCdlbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpbml0KCdlbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgTGFuZ3VhZ2Uuemg6XHJcbiAgICAgICAgICAgIGluaXQoJ3poJyk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgTGFuZ3VhZ2UuemhIYW50OlxyXG4gICAgICAgICAgICBpbml0KCd6aEhhbnQnKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBMYW5ndWFnZS5ydTpcclxuICAgICAgICAgICAgaW5pdCgncnUnKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBMYW5ndWFnZS5pZDpcclxuICAgICAgICAgICAgaW5pdCgnaWQnKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBMYW5ndWFnZS50aDpcclxuICAgICAgICAgICAgaW5pdCgndGgnKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBMYW5ndWFnZS5hcjpcclxuICAgICAgICAgICAgaW5pdCgnYXInKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBMYW5ndWFnZS5lbjpcclxuICAgICAgICAgICAgaW5pdCgnZW4nKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgaW5pdCgnZW4nKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgICB1cGRhdGVTY2VuZVJlbmRlcmVycygpO1xyXG59XHJcblxyXG4vKipcclxuICog5Yid5aeL5YyWXHJcbiAqIEBwYXJhbSBsYW5ndWFnZSBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0KGxhbmd1YWdlPzogc3RyaW5nKSB7XHJcbiAgICBpZiAoIWxhbmd1YWdlKSB7XHJcbiAgICAgICAgY29uc3Qgd2luID0gd2luZG93IGFzIGFueTtcclxuICAgICAgICB3aW4uX2xhbmd1YWdlRGF0YS5sYW5ndWFnZVxyXG4gICAgICAgIGlmICh3aW4/Ll9wcmVsYW5ndWFnZSkge1xyXG4gICAgICAgICAgICBsYW5ndWFnZSA9IHdpbi5fcHJlbGFuZ3VhZ2U7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBsYW5ndWFnZTogJHtsYW5ndWFnZX1gKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBsYW5ndWFnZSA9ICd6aCc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIHJlYWR5ID0gdHJ1ZTtcclxuICAgIF9sYW5ndWFnZSA9IGxhbmd1YWdlO1xyXG4gICAgY29uc29sZS5sb2coYGxhbmd1YWdlIGluaXQ6ICR7X2xhbmd1YWdlfWApO1xyXG59XHJcblxyXG4vKipcclxuICog57+76K+R5pWw5o2uXHJcbiAqIEBwYXJhbSBrZXkgXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdChrZXk6IHN0cmluZywgLi4ucGFyYW1zOiBhbnlbXSkge1xyXG4gICAgY29uc3Qgd2luOiBhbnkgPSB3aW5kb3c7XHJcblxyXG4gICAgaWYgKCF3aW4ubGFuZ3VhZ2VzKSB7XHJcbiAgICAgICAgcmV0dXJuIGtleTtcclxuICAgIH1cclxuICAgIGNvbnN0IHNlYXJjaGVyID0ga2V5LnNwbGl0KCcuJyk7XHJcblxyXG4gICAgbGV0IGRhdGEgPSB3aW4ubGFuZ3VhZ2VzW19sYW5ndWFnZV07XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlYXJjaGVyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgZGF0YSA9IGRhdGFbc2VhcmNoZXJbaV1dO1xyXG4gICAgICAgIGlmICghZGF0YSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxldCByZXN1bHQgPSBkYXRhIHx8ICcnO1xyXG5cclxuICAgIC8vIOWkhOeQhuWKqOaAgeWPguaVsOabv+aNolxyXG4gICAgaWYgKHBhcmFtcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgLy8g5pSv5oyB5Lik56eN5Y2g5L2N56ym5qC85byP77yaezB9IOWSjCAkezB9XHJcbiAgICAgICAgcmVzdWx0ID0gcmVzdWx0LnJlcGxhY2UoL1xcJFxceyhcXGQrKVxcfS9nLCAobWF0Y2gsIHAxLCBwMikgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IHAxID8gcGFyc2VJbnQocDEpIDogcGFyc2VJbnQocDIpO1xyXG4gICAgICAgICAgICByZXR1cm4gaW5kZXggPj0gMCAmJiBpbmRleCA8IHBhcmFtcy5sZW5ndGggPyBwYXJhbXNbaW5kZXhdIDogbWF0Y2g7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZVNjZW5lUmVuZGVyZXJzKCkgeyAvLyB2ZXJ5IGNvc3RseSBpdGVyYXRpb25zXHJcbiAgICBjb25zdCByb290Tm9kZXMgPSBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpIS5jaGlsZHJlbjtcclxuICAgIC8vIHdhbGsgYWxsIG5vZGVzIHdpdGggbG9jYWxpemUgbGFiZWwgYW5kIHVwZGF0ZVxyXG4gICAgY29uc3QgYWxsTG9jYWxpemVkTGFiZWxzOiBhbnlbXSA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb290Tm9kZXMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICBsZXQgbGFiZWxzID0gcm9vdE5vZGVzW2ldLmdldENvbXBvbmVudHNJbkNoaWxkcmVuKCdMb2NhbGl6ZWRMYWJlbCcpO1xyXG4gICAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KGFsbExvY2FsaXplZExhYmVscywgbGFiZWxzKTtcclxuICAgIH1cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsTG9jYWxpemVkTGFiZWxzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgbGV0IGxhYmVsID0gYWxsTG9jYWxpemVkTGFiZWxzW2ldO1xyXG4gICAgICAgIGlmICghbGFiZWwubm9kZS5hY3RpdmUpIGNvbnRpbnVlO1xyXG4gICAgICAgIGxhYmVsLnVwZGF0ZUxhYmVsKCk7XHJcbiAgICB9XHJcbiAgICAvLyB3YWxrIGFsbCBub2RlcyB3aXRoIGxvY2FsaXplIHNwcml0ZSBhbmQgdXBkYXRlXHJcbiAgICBjb25zdCBhbGxMb2NhbGl6ZWRTcHJpdGVzOiBhbnlbXSA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb290Tm9kZXMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICBsZXQgc3ByaXRlcyA9IHJvb3ROb2Rlc1tpXS5nZXRDb21wb25lbnRzSW5DaGlsZHJlbignTG9jYWxpemVkU3ByaXRlJyk7XHJcbiAgICAgICAgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkoYWxsTG9jYWxpemVkU3ByaXRlcywgc3ByaXRlcyk7XHJcbiAgICB9XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbExvY2FsaXplZFNwcml0ZXMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICBsZXQgc3ByaXRlID0gYWxsTG9jYWxpemVkU3ByaXRlc1tpXTtcclxuICAgICAgICBpZiAoIXNwcml0ZS5ub2RlLmFjdGl2ZSkgY29udGludWU7XHJcbiAgICAgICAgc3ByaXRlLnVwZGF0ZVNwcml0ZSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyDkvpvmj5Lku7bmn6Xor6LlvZPliY3or63oqIDkvb/nlKhcclxuY29uc3Qgd2luID0gd2luZG93IGFzIGFueTtcclxud2luLl9sYW5ndWFnZURhdGEgPSB7XHJcbiAgICBnZXQgbGFuZ3VhZ2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9sYW5ndWFnZTtcclxuICAgIH0sXHJcbiAgICBpbml0KGxhbmc6IHN0cmluZykge1xyXG4gICAgICAgIGluaXQobGFuZyk7XHJcbiAgICB9LFxyXG4gICAgdXBkYXRlU2NlbmVSZW5kZXJlcnMoKSB7XHJcbiAgICAgICAgdXBkYXRlU2NlbmVSZW5kZXJlcnMoKTtcclxuICAgIH0sXHJcbn07XHJcbiJdfQ==