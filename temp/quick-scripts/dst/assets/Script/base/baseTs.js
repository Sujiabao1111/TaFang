
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/base/baseTs.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '92d40Ltj3FHZ56u5+12nAKT', 'baseTs');
// Script/base/baseTs.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var PageManage_1 = require("../PageManage");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var baseTs = /** @class */ (function (_super) {
    __extends(baseTs, _super);
    function baseTs() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isAni = true;
        return _this;
        // update (dt) {}
    }
    /**
     * 加载预制体
     * @param url 地址
     * @param type 类型
     * @param call 回调
     */
    baseTs.prototype.loadAny = function (url, type, call, fail) {
        console.log("loadAny : " + url);
        cc.resources.load(url, type, function (err, res) {
            if (err) {
                cc.error("加载资源失败", err);
                if (fail) {
                    fail();
                }
                return;
            }
            call && call(res);
        });
    };
    /**
     * 加载图片
     * @param url 地址
     * @param type 1.炮塔  2.怪兽  3.炮塔底座
     * @param call 回调
     */
    baseTs.prototype.loadImage = function (level, type, call, fail) {
        if (type == 1) {
            cc.resources.load("texture/turret/body_" + level, cc.SpriteFrame, function (err, res) {
                if (err) {
                    cc.error("加载资源失败", err);
                    fail && fail();
                    return;
                }
                call && call(res);
            });
        }
        else if (type == 2) {
            cc.resources.load("texture/monster/monster" + level, cc.SpriteFrame, function (err, res) {
                if (err) {
                    cc.error("加载资源失败", err);
                    fail && fail();
                    return;
                }
                call && call(res);
            });
        }
        else if (type == 3) {
            cc.resources.load("texture/turret/foot_" + level, cc.SpriteFrame, function (err, res) {
                if (err) {
                    cc.error("加载资源失败", err);
                    fail && fail();
                    return;
                }
                call && call(res);
            });
        }
    };
    /**
     * 打开哪个
     * @param name 哪个
     */
    baseTs.prototype.showPage = function (name, data) {
        if (data === void 0) { data = null; }
        PageManage_1.default.singleton.showPage(name, data);
    };
    /**
     * 关闭
     */
    baseTs.prototype.closePage = function () {
        if (this.node) {
            PageManage_1.default.singleton.closePage(this.node.name);
        }
    };
    __decorate([
        property({ displayName: "是否开启动画" })
    ], baseTs.prototype, "isAni", void 0);
    baseTs = __decorate([
        ccclass
    ], baseTs);
    return baseTs;
}(cc.Component));
exports.default = baseTs;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxiYXNlXFxiYXNlVHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNENBQXVDO0FBRWpDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQW9DLDBCQUFZO0lBQWhEO1FBQUEscUVBc0ZDO1FBbEZHLFdBQUssR0FBVyxJQUFJLENBQUM7O1FBaUZyQixpQkFBaUI7SUFDckIsQ0FBQztJQWhGRzs7Ozs7T0FLRztJQUNILHdCQUFPLEdBQVAsVUFBUSxHQUFVLEVBQUMsSUFBUSxFQUFDLElBQWEsRUFBRSxJQUFjO1FBQzNELE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxHQUFFLEdBQUcsQ0FBRSxDQUFBO1FBQ3pCLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBQyxJQUFJLEVBQUMsVUFBQyxHQUFHLEVBQUMsR0FBRztZQUMvQixJQUFHLEdBQUcsRUFBQztnQkFDSCxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBQyxHQUFHLENBQUMsQ0FBQztnQkFDdkIsSUFBRyxJQUFJLEVBQUM7b0JBQ0osSUFBSSxFQUFFLENBQUM7aUJBQ1Y7Z0JBQ0QsT0FBTzthQUNWO1lBQ0QsSUFBSSxJQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQTtJQUVOLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILDBCQUFTLEdBQVQsVUFBVSxLQUFZLEVBQUUsSUFBVyxFQUFFLElBQWEsRUFBRSxJQUFjO1FBQzlELElBQUcsSUFBSSxJQUFJLENBQUMsRUFBQztZQUNULEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLHlCQUF1QixLQUFPLEVBQUUsRUFBRSxDQUFDLFdBQVcsRUFBRSxVQUFDLEdBQUcsRUFBQyxHQUFHO2dCQUN0RSxJQUFHLEdBQUcsRUFBQztvQkFDSCxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBQyxHQUFHLENBQUMsQ0FBQztvQkFDdkIsSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDO29CQUNmLE9BQU87aUJBQ1Y7Z0JBQ0QsSUFBSSxJQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNwQixDQUFDLENBQUMsQ0FBQTtTQUNMO2FBQ0ksSUFBRyxJQUFJLElBQUksQ0FBQyxFQUFDO1lBQ2QsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsNEJBQTBCLEtBQU8sRUFBRSxFQUFFLENBQUMsV0FBVyxFQUFFLFVBQUMsR0FBRyxFQUFDLEdBQUc7Z0JBQ3pFLElBQUcsR0FBRyxFQUFDO29CQUNILEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUN2QixJQUFJLElBQUksSUFBSSxFQUFFLENBQUM7b0JBQ2YsT0FBTztpQkFDVjtnQkFDRCxJQUFJLElBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3BCLENBQUMsQ0FBQyxDQUFBO1NBQ0w7YUFDSSxJQUFHLElBQUksSUFBSSxDQUFDLEVBQUM7WUFDZCxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyx5QkFBdUIsS0FBTyxFQUFFLEVBQUUsQ0FBQyxXQUFXLEVBQUUsVUFBQyxHQUFHLEVBQUMsR0FBRztnQkFDdEUsSUFBRyxHQUFHLEVBQUM7b0JBQ0gsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3ZCLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQztvQkFDZixPQUFPO2lCQUNWO2dCQUNELElBQUksSUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDcEIsQ0FBQyxDQUFDLENBQUE7U0FDTDtJQUNMLENBQUM7SUFFRDs7O09BR0c7SUFDSCx5QkFBUSxHQUFSLFVBQVMsSUFBVyxFQUFFLElBQVc7UUFBWCxxQkFBQSxFQUFBLFdBQVc7UUFDN0Isb0JBQVUsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQ7O09BRUc7SUFDSCwwQkFBUyxHQUFUO1FBQ0ksSUFBRyxJQUFJLENBQUMsSUFBSSxFQUFDO1lBQ1Qsb0JBQVUsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbEQ7SUFFTCxDQUFDO0lBOUVEO1FBREMsUUFBUSxDQUFDLEVBQUMsV0FBVyxFQUFDLFFBQVEsRUFBQyxDQUFDO3lDQUNaO0lBSkosTUFBTTtRQUQxQixPQUFPO09BQ2EsTUFBTSxDQXNGMUI7SUFBRCxhQUFDO0NBdEZELEFBc0ZDLENBdEZtQyxFQUFFLENBQUMsU0FBUyxHQXNGL0M7a0JBdEZvQixNQUFNIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBhZ2VNYW5hZ2UgZnJvbSBcIi4uL1BhZ2VNYW5hZ2VcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBiYXNlVHMgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG5cbiAgICBAcHJvcGVydHkoe2Rpc3BsYXlOYW1lOlwi5piv5ZCm5byA5ZCv5Yqo55S7XCJ9KVxuICAgIGlzQW5pOmJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqXG4gICAgICog5Yqg6L296aKE5Yi25L2TXG4gICAgICogQHBhcmFtIHVybCDlnLDlnYBcbiAgICAgKiBAcGFyYW0gdHlwZSDnsbvlnotcbiAgICAgKiBAcGFyYW0gY2FsbCDlm57osINcbiAgICAgKi9cbiAgICBsb2FkQW55KHVybDpzdHJpbmcsdHlwZTphbnksY2FsbDpGdW5jdGlvbiwgZmFpbD86RnVuY3Rpb24pe1xuXHRcdGNvbnNvbGUubG9nKFwibG9hZEFueSA6IFwiICt1cmwgKVxuICAgICAgICBjYy5yZXNvdXJjZXMubG9hZCh1cmwsdHlwZSwoZXJyLHJlcyk9PntcbiAgICAgICAgICAgIGlmKGVycil7XG4gICAgICAgICAgICAgICAgY2MuZXJyb3IoXCLliqDovb3otYTmupDlpLHotKVcIixlcnIpO1xuICAgICAgICAgICAgICAgIGlmKGZhaWwpe1xuICAgICAgICAgICAgICAgICAgICBmYWlsKCk7IFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYWxsJiZjYWxsKHJlcyk7XG4gICAgICAgIH0pXG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliqDovb3lm77niYdcbiAgICAgKiBAcGFyYW0gdXJsIOWcsOWdgFxuICAgICAqIEBwYXJhbSB0eXBlIDEu54Ku5aGUICAyLuaAquWFvSAgMy7ngq7loZTlupXluqdcbiAgICAgKiBAcGFyYW0gY2FsbCDlm57osINcbiAgICAgKi9cbiAgICBsb2FkSW1hZ2UobGV2ZWw6bnVtYmVyLCB0eXBlOm51bWJlciwgY2FsbDpGdW5jdGlvbiwgZmFpbD86RnVuY3Rpb24pe1xuICAgICAgICBpZih0eXBlID09IDEpe1xuICAgICAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoYHRleHR1cmUvdHVycmV0L2JvZHlfJHtsZXZlbH1gLCBjYy5TcHJpdGVGcmFtZSwgKGVycixyZXMpPT57XG4gICAgICAgICAgICAgICAgaWYoZXJyKXtcbiAgICAgICAgICAgICAgICAgICAgY2MuZXJyb3IoXCLliqDovb3otYTmupDlpLHotKVcIixlcnIpO1xuICAgICAgICAgICAgICAgICAgICBmYWlsICYmIGZhaWwoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYWxsJiZjYWxsKHJlcyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYodHlwZSA9PSAyKXtcbiAgICAgICAgICAgIGNjLnJlc291cmNlcy5sb2FkKGB0ZXh0dXJlL21vbnN0ZXIvbW9uc3RlciR7bGV2ZWx9YCwgY2MuU3ByaXRlRnJhbWUsIChlcnIscmVzKT0+e1xuICAgICAgICAgICAgICAgIGlmKGVycil7XG4gICAgICAgICAgICAgICAgICAgIGNjLmVycm9yKFwi5Yqg6L296LWE5rqQ5aSx6LSlXCIsZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgZmFpbCAmJiBmYWlsKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2FsbCYmY2FsbChyZXMpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHR5cGUgPT0gMyl7XG4gICAgICAgICAgICBjYy5yZXNvdXJjZXMubG9hZChgdGV4dHVyZS90dXJyZXQvZm9vdF8ke2xldmVsfWAsIGNjLlNwcml0ZUZyYW1lLCAoZXJyLHJlcyk9PntcbiAgICAgICAgICAgICAgICBpZihlcnIpe1xuICAgICAgICAgICAgICAgICAgICBjYy5lcnJvcihcIuWKoOi9vei1hOa6kOWksei0pVwiLGVycik7XG4gICAgICAgICAgICAgICAgICAgIGZhaWwgJiYgZmFpbCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhbGwmJmNhbGwocmVzKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmiZPlvIDlk6rkuKpcbiAgICAgKiBAcGFyYW0gbmFtZSDlk6rkuKpcbiAgICAgKi9cbiAgICBzaG93UGFnZShuYW1lOnN0cmluZywgZGF0YSA9IG51bGwpe1xuICAgICAgICBQYWdlTWFuYWdlLnNpbmdsZXRvbi5zaG93UGFnZShuYW1lLCBkYXRhKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlhbPpl61cbiAgICAgKi9cbiAgICBjbG9zZVBhZ2UoKXtcbiAgICAgICAgaWYodGhpcy5ub2RlKXtcbiAgICAgICAgICAgIFBhZ2VNYW5hZ2Uuc2luZ2xldG9uLmNsb3NlUGFnZSh0aGlzLm5vZGUubmFtZSk7XG4gICAgICAgIH0gICAgICAgIFxuXG4gICAgfVxuXG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19