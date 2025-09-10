const Telegram = window["Telegram"]

export let _language = 'zh';

export let ready: boolean = false;

export enum Language {
    /** 自动 */
    auto,
    /** 英语 */
    en,
    /** 中文 */
    zh,
    /** 繁体中文 */
    zhHant,
    /** 俄语 */
    ru,
    /** 印度尼西亚语 */
    id,
    /** 泰语 */
    th,
    /** 阿拉伯语 */
    ar,

}

export function getLanguage() {
    switch (_language) {
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

export function setLanguage(language: Language) {

    switch (Number(language)) {
        case Language.auto:
            const user = Telegram.WebApp.initDataUnsafe.user;
            switch (user?.language_code) {
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

/**
 * 初始化
 * @param language 
 */
export function init(language?: string) {
    if (!language) {
        const win = window as any;
        win._languageData.language
        if (win?._prelanguage) {
            language = win._prelanguage;
            console.log(`language: ${language}`);

        }
        else {
            language = 'zh';
        }

    }
    ready = true;
    _language = language;
    console.log(`language init: ${_language}`);
}

/**
 * 翻译数据
 * @param key 
 */
export function t(key: string, ...params: any[]) {
    const win: any = window;

    if (!win.languages) {
        return key;
    }
    const searcher = key.split('.');

    let data = win.languages[_language];
    for (let i = 0; i < searcher.length; i++) {
        data = data[searcher[i]];
        if (!data) {
            return '';
        }
    }

    let result = data || '';

    // 处理动态参数替换
    if (params.length > 0) {
        // 支持两种占位符格式：{0} 和 ${0}
        result = result.replace(/\$\{(\d+)\}/g, (match, p1, p2) => {
            const index = p1 ? parseInt(p1) : parseInt(p2);
            return index >= 0 && index < params.length ? params[index] : match;
        });
    }

    return result;
}

export function updateSceneRenderers() { // very costly iterations
    const rootNodes = cc.director.getScene()!.children;
    // walk all nodes with localize label and update
    const allLocalizedLabels: any[] = [];
    for (let i = 0; i < rootNodes.length; ++i) {
        let labels = rootNodes[i].getComponentsInChildren('LocalizedLabel');
        Array.prototype.push.apply(allLocalizedLabels, labels);
    }
    for (let i = 0; i < allLocalizedLabels.length; ++i) {
        let label = allLocalizedLabels[i];
        if (!label.node.active) continue;
        label.updateLabel();
    }
    // walk all nodes with localize sprite and update
    const allLocalizedSprites: any[] = [];
    for (let i = 0; i < rootNodes.length; ++i) {
        let sprites = rootNodes[i].getComponentsInChildren('LocalizedSprite');
        Array.prototype.push.apply(allLocalizedSprites, sprites);
    }
    for (let i = 0; i < allLocalizedSprites.length; ++i) {
        let sprite = allLocalizedSprites[i];
        if (!sprite.node.active) continue;
        sprite.updateSprite();
    }
}

// 供插件查询当前语言使用
const win = window as any;
win._languageData = {
    get language() {
        return _language;
    },
    init(lang: string) {
        init(lang);
    },
    updateSceneRenderers() {
        updateSceneRenderers();
    },
};
