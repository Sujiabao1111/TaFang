"use strict";
cc._RF.push(module, '4b2c3R79eFEno47g5GOQeyG', 'PlatformFactory');
// Script/server/xmsdk_cocos/Adapter/PlatformFactory.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PreviewPlatform_1 = require("./PreviewPlatform");
var InnerWebPlatform_1 = require("./InnerWebPlatform");
var AndroidNativePlatform_1 = require("./AndroidNativePlatform");
var PlatformFactory = /** @class */ (function () {
    function PlatformFactory() {
    }
    Object.defineProperty(PlatformFactory, "Ins", {
        get: function () {
            if (PlatformFactory._ins == null) {
                if (true && !window["_dsbridge"]) {
                    console.log('cocos直接点击那个预览按钮，在浏览器打开');
                    //cocos直接点击那个预览按钮，在浏览器打开
                    PlatformFactory._ins = new PreviewPlatform_1.default();
                }
                else if (cc.sys.isBrowser) {
                    console.log('app内嵌网页');
                    //浏览器
                    PlatformFactory._ins = new InnerWebPlatform_1.default();
                }
                else if (cc.sys.os == cc.sys.OS_ANDROID) {
                    console.log('安卓原生');
                    //安卓原生
                    PlatformFactory._ins = new AndroidNativePlatform_1.default();
                }
            }
            return PlatformFactory._ins;
        },
        enumerable: false,
        configurable: true
    });
    // 单例模式
    PlatformFactory._ins = null;
    return PlatformFactory;
}());
exports.default = PlatformFactory;

cc._RF.pop();