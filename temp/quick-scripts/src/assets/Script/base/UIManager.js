"use strict";
cc._RF.push(module, '62ce68SE99Ft5ELK1L5mgzY', 'UIManager');
// Script/base/UIManager.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.UIManager = void 0;
var Singleton_1 = require("./Singleton");
var UIManager = /** @class */ (function (_super) {
    __extends(UIManager, _super);
    function UIManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
       * 播放spine动画
       * @param {*} sp_Skeleton 动画文件
       * @param {*} animName 动作名称
       * @param {*} loop 是否循环
       * @param {*} callback 播放完毕回调
       */
        _this.playSpine = function (sp_Skeleton, animName, loop, callback) {
            // sp_Skeleton.premultipliedAlpha=false;//这样设置在cocos creator中才能有半透明效果
            if (callback === void 0) { callback = null; }
            // let spine = this.node.getComponent(sp.Skeleton);
            var track = sp_Skeleton.setAnimation(0, animName, loop);
            if (track) {
                // 注册动画的结束回调
                sp_Skeleton.setCompleteListener(function (trackEntry, loopCount) {
                    var name = trackEntry.animation ? trackEntry.animation.name : '';
                    if (name === animName && callback) {
                        callback(); // 动画结束后执行自己的逻辑
                    }
                });
            }
        };
        return _this;
    }
    Object.defineProperty(UIManager, "ins", {
        get: function () {
            return _super.getInstance.call(this);
        },
        enumerable: false,
        configurable: true
    });
    return UIManager;
}(Singleton_1.default));
exports.UIManager = UIManager;

cc._RF.pop();