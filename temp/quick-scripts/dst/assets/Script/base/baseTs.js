
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
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
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
        console.log("打开页面", name);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxiYXNlXFxiYXNlVHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNENBQXVDO0FBRWpDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQW9DLDBCQUFZO0lBQWhEO1FBQUEscUVBcUZDO1FBakZHLFdBQUssR0FBWSxJQUFJLENBQUM7O0lBaUYxQixDQUFDO0lBL0VHOzs7OztPQUtHO0lBQ0gsd0JBQU8sR0FBUCxVQUFRLEdBQVcsRUFBRSxJQUFTLEVBQUUsSUFBYyxFQUFFLElBQWU7UUFDM0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDLENBQUE7UUFDL0IsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxVQUFDLEdBQUcsRUFBRSxHQUFHO1lBQ2xDLElBQUksR0FBRyxFQUFFO2dCQUNMLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUN4QixJQUFJLElBQUksRUFBRTtvQkFDTixJQUFJLEVBQUUsQ0FBQztpQkFDVjtnQkFDRCxPQUFPO2FBQ1Y7WUFDRCxJQUFJLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLENBQUMsQ0FBQyxDQUFBO0lBRU4sQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsMEJBQVMsR0FBVCxVQUFVLEtBQWEsRUFBRSxJQUFZLEVBQUUsSUFBYyxFQUFFLElBQWU7UUFDbEUsSUFBSSxJQUFJLElBQUksQ0FBQyxFQUFFO1lBQ1gsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMseUJBQXVCLEtBQU8sRUFBRSxFQUFFLENBQUMsV0FBVyxFQUFFLFVBQUMsR0FBRyxFQUFFLEdBQUc7Z0JBQ3ZFLElBQUksR0FBRyxFQUFFO29CQUNMLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUN4QixJQUFJLElBQUksSUFBSSxFQUFFLENBQUM7b0JBQ2YsT0FBTztpQkFDVjtnQkFDRCxJQUFJLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3RCLENBQUMsQ0FBQyxDQUFBO1NBQ0w7YUFDSSxJQUFJLElBQUksSUFBSSxDQUFDLEVBQUU7WUFDaEIsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsNEJBQTBCLEtBQU8sRUFBRSxFQUFFLENBQUMsV0FBVyxFQUFFLFVBQUMsR0FBRyxFQUFFLEdBQUc7Z0JBQzFFLElBQUksR0FBRyxFQUFFO29CQUNMLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUN4QixJQUFJLElBQUksSUFBSSxFQUFFLENBQUM7b0JBQ2YsT0FBTztpQkFDVjtnQkFDRCxJQUFJLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3RCLENBQUMsQ0FBQyxDQUFBO1NBQ0w7YUFDSSxJQUFJLElBQUksSUFBSSxDQUFDLEVBQUU7WUFDaEIsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMseUJBQXVCLEtBQU8sRUFBRSxFQUFFLENBQUMsV0FBVyxFQUFFLFVBQUMsR0FBRyxFQUFFLEdBQUc7Z0JBQ3ZFLElBQUksR0FBRyxFQUFFO29CQUNMLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUN4QixJQUFJLElBQUksSUFBSSxFQUFFLENBQUM7b0JBQ2YsT0FBTztpQkFDVjtnQkFDRCxJQUFJLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3RCLENBQUMsQ0FBQyxDQUFBO1NBQ0w7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gseUJBQVEsR0FBUixVQUFTLElBQVksRUFBRSxJQUFXO1FBQVgscUJBQUEsRUFBQSxXQUFXO1FBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRTFCLG9CQUFVLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsMEJBQVMsR0FBVDtRQUNJLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNYLG9CQUFVLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2xEO0lBQ0wsQ0FBQztJQS9FRDtRQURDLFFBQVEsQ0FBQyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsQ0FBQzt5Q0FDZDtJQUpMLE1BQU07UUFEMUIsT0FBTztPQUNhLE1BQU0sQ0FxRjFCO0lBQUQsYUFBQztDQXJGRCxBQXFGQyxDQXJGbUMsRUFBRSxDQUFDLFNBQVMsR0FxRi9DO2tCQXJGb0IsTUFBTSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYWdlTWFuYWdlIGZyb20gXCIuLi9QYWdlTWFuYWdlXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBiYXNlVHMgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG5cbiAgICBAcHJvcGVydHkoeyBkaXNwbGF5TmFtZTogXCLmmK/lkKblvIDlkK/liqjnlLtcIiB9KVxuICAgIGlzQW5pOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKlxuICAgICAqIOWKoOi9vemihOWItuS9k1xuICAgICAqIEBwYXJhbSB1cmwg5Zyw5Z2AXG4gICAgICogQHBhcmFtIHR5cGUg57G75Z6LXG4gICAgICogQHBhcmFtIGNhbGwg5Zue6LCDXG4gICAgICovXG4gICAgbG9hZEFueSh1cmw6IHN0cmluZywgdHlwZTogYW55LCBjYWxsOiBGdW5jdGlvbiwgZmFpbD86IEZ1bmN0aW9uKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwibG9hZEFueSA6IFwiICsgdXJsKVxuICAgICAgICBjYy5yZXNvdXJjZXMubG9hZCh1cmwsIHR5cGUsIChlcnIsIHJlcykgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIGNjLmVycm9yKFwi5Yqg6L296LWE5rqQ5aSx6LSlXCIsIGVycik7XG4gICAgICAgICAgICAgICAgaWYgKGZhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgZmFpbCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYWxsICYmIGNhbGwocmVzKTtcbiAgICAgICAgfSlcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWKoOi9veWbvueJh1xuICAgICAqIEBwYXJhbSB1cmwg5Zyw5Z2AXG4gICAgICogQHBhcmFtIHR5cGUgMS7ngq7loZQgIDIu5oCq5YW9ICAzLueCruWhlOW6leW6p1xuICAgICAqIEBwYXJhbSBjYWxsIOWbnuiwg1xuICAgICAqL1xuICAgIGxvYWRJbWFnZShsZXZlbDogbnVtYmVyLCB0eXBlOiBudW1iZXIsIGNhbGw6IEZ1bmN0aW9uLCBmYWlsPzogRnVuY3Rpb24pIHtcbiAgICAgICAgaWYgKHR5cGUgPT0gMSkge1xuICAgICAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoYHRleHR1cmUvdHVycmV0L2JvZHlfJHtsZXZlbH1gLCBjYy5TcHJpdGVGcmFtZSwgKGVyciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjYy5lcnJvcihcIuWKoOi9vei1hOa6kOWksei0pVwiLCBlcnIpO1xuICAgICAgICAgICAgICAgICAgICBmYWlsICYmIGZhaWwoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYWxsICYmIGNhbGwocmVzKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSAyKSB7XG4gICAgICAgICAgICBjYy5yZXNvdXJjZXMubG9hZChgdGV4dHVyZS9tb25zdGVyL21vbnN0ZXIke2xldmVsfWAsIGNjLlNwcml0ZUZyYW1lLCAoZXJyLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNjLmVycm9yKFwi5Yqg6L296LWE5rqQ5aSx6LSlXCIsIGVycik7XG4gICAgICAgICAgICAgICAgICAgIGZhaWwgJiYgZmFpbCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhbGwgJiYgY2FsbChyZXMpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlID09IDMpIHtcbiAgICAgICAgICAgIGNjLnJlc291cmNlcy5sb2FkKGB0ZXh0dXJlL3R1cnJldC9mb290XyR7bGV2ZWx9YCwgY2MuU3ByaXRlRnJhbWUsIChlcnIsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY2MuZXJyb3IoXCLliqDovb3otYTmupDlpLHotKVcIiwgZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgZmFpbCAmJiBmYWlsKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2FsbCAmJiBjYWxsKHJlcyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5omT5byA5ZOq5LiqXG4gICAgICogQHBhcmFtIG5hbWUg5ZOq5LiqXG4gICAgICovXG4gICAgc2hvd1BhZ2UobmFtZTogc3RyaW5nLCBkYXRhID0gbnVsbCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIuaJk+W8gOmhtemdolwiLCBuYW1lKTtcbiAgICAgICAgXG4gICAgICAgIFBhZ2VNYW5hZ2Uuc2luZ2xldG9uLnNob3dQYWdlKG5hbWUsIGRhdGEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWFs+mXrVxuICAgICAqL1xuICAgIGNsb3NlUGFnZSgpIHtcbiAgICAgICAgaWYgKHRoaXMubm9kZSkge1xuICAgICAgICAgICAgUGFnZU1hbmFnZS5zaW5nbGV0b24uY2xvc2VQYWdlKHRoaXMubm9kZS5uYW1lKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19