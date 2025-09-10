"use strict";
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