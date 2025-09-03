"use strict";
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