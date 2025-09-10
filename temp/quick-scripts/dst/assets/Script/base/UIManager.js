
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/base/UIManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxiYXNlXFxVSU1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHlDQUFvQztBQUlwQztJQUErQiw2QkFBUztJQUF4QztRQUFBLHFFQXFDQztRQXhCRzs7Ozs7O1NBTUM7UUFDTSxlQUFTLEdBQUcsVUFBQyxXQUFXLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxRQUFlO1lBQzVELHFFQUFxRTtZQUR4Qix5QkFBQSxFQUFBLGVBQWU7WUFHNUQsbURBQW1EO1lBQ25ELElBQUksS0FBSyxHQUFHLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN4RCxJQUFJLEtBQUssRUFBRTtnQkFDUCxZQUFZO2dCQUNaLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxVQUFDLFVBQVUsRUFBRSxTQUFTO29CQUNsRCxJQUFJLElBQUksR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO29CQUNqRSxJQUFJLElBQUksS0FBSyxRQUFRLElBQUksUUFBUSxFQUFFO3dCQUMvQixRQUFRLEVBQUUsQ0FBQyxDQUFDLGVBQWU7cUJBQzlCO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2FBQ047UUFDTCxDQUFDLENBQUM7O0lBR04sQ0FBQztJQXBDRyxzQkFBVyxnQkFBRzthQUFkO1lBQ0ksT0FBTyxPQUFNLFdBQVcsV0FBYSxDQUFDO1FBQzFDLENBQUM7OztPQUFBO0lBa0NMLGdCQUFDO0FBQUQsQ0FyQ0EsQUFxQ0MsQ0FyQzhCLG1CQUFTLEdBcUN2QztBQXJDWSw4QkFBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMb2FkaW5nIGZyb20gXCIuLi9jb21tb24vY3VzdG9uL0xvYWRpbmdcIjtcbmltcG9ydCBTaW5nbGV0b24gZnJvbSBcIi4vU2luZ2xldG9uXCI7XG5cblxuXG5leHBvcnQgY2xhc3MgVUlNYW5hZ2VyIGV4dGVuZHMgU2luZ2xldG9uIHtcbiAgICBzdGF0aWMgZ2V0IGlucygpIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLmdldEluc3RhbmNlPFVJTWFuYWdlcj4oKTtcbiAgICB9XG5cblxuXG5cblxuXG5cblxuXG4gICAgLyoqXG4gICAqIOaSreaUvnNwaW5l5Yqo55S7XG4gICAqIEBwYXJhbSB7Kn0gc3BfU2tlbGV0b24g5Yqo55S75paH5Lu2XG4gICAqIEBwYXJhbSB7Kn0gYW5pbU5hbWUg5Yqo5L2c5ZCN56ewXG4gICAqIEBwYXJhbSB7Kn0gbG9vcCDmmK/lkKblvqrnjq9cbiAgICogQHBhcmFtIHsqfSBjYWxsYmFjayDmkq3mlL7lrozmr5Xlm57osINcbiAgICovXG4gICAgcHVibGljIHBsYXlTcGluZSA9IChzcF9Ta2VsZXRvbiwgYW5pbU5hbWUsIGxvb3AsIGNhbGxiYWNrID0gbnVsbCkgPT4ge1xuICAgICAgICAvLyBzcF9Ta2VsZXRvbi5wcmVtdWx0aXBsaWVkQWxwaGE9ZmFsc2U7Ly/ov5nmoLforr7nva7lnKhjb2NvcyBjcmVhdG9y5Lit5omN6IO95pyJ5Y2K6YCP5piO5pWI5p6cXG5cbiAgICAgICAgLy8gbGV0IHNwaW5lID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XG4gICAgICAgIGxldCB0cmFjayA9IHNwX1NrZWxldG9uLnNldEFuaW1hdGlvbigwLCBhbmltTmFtZSwgbG9vcCk7XG4gICAgICAgIGlmICh0cmFjaykge1xuICAgICAgICAgICAgLy8g5rOo5YaM5Yqo55S755qE57uT5p2f5Zue6LCDXG4gICAgICAgICAgICBzcF9Ta2VsZXRvbi5zZXRDb21wbGV0ZUxpc3RlbmVyKCh0cmFja0VudHJ5LCBsb29wQ291bnQpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgbmFtZSA9IHRyYWNrRW50cnkuYW5pbWF0aW9uID8gdHJhY2tFbnRyeS5hbmltYXRpb24ubmFtZSA6ICcnO1xuICAgICAgICAgICAgICAgIGlmIChuYW1lID09PSBhbmltTmFtZSAmJiBjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpOyAvLyDliqjnlLvnu5PmnZ/lkI7miafooYzoh6rlt7HnmoTpgLvovpFcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG5cblxufSJdfQ==