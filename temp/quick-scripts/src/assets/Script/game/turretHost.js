"use strict";
cc._RF.push(module, '4d959K8TulDcb2FXDuEbPKg', 'turretHost');
// Script/game/turretHost.ts

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
var baseTs_1 = require("../base/baseTs");
var NameTs_1 = require("../common/NameTs");
var pageTs_1 = require("../common/pageTs");
var util_1 = require("../util/util");
var turret_1 = require("./turret/turret");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var turretHost = /** @class */ (function (_super) {
    __extends(turretHost, _super);
    function turretHost() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.turretPre = null;
        /**炮塔js */
        _this.turretJs = null;
        return _this;
    }
    turretHost.prototype.onLoad = function () {
        var _this = this;
        this.initTurret(util_1.default.userData.turretLevel);
        cc.game.on(NameTs_1.default.Game_Pop_Open, function (res) {
            if (res == pageTs_1.default.pageName.GameUpgrade) {
                _this.updateTurrert();
            }
        }, this);
    };
    /**
     * 还原用户炮塔
     * @param level 等级
     */
    turretHost.prototype.initTurret = function (level) {
        var item = cc.instantiate(this.turretPre);
        item.getComponent(item.name).init({ level: level });
        item.setParent(this.node);
        item.setPosition(10, 320);
        this.turretJs = item.getComponent(turret_1.default);
        // this.createTurret({level:38,location:1,isFree:true});
    };
    /**
     * 更新炮塔
     */
    turretHost.prototype.updateTurrert = function () {
        this.turretJs.upLevel();
    };
    __decorate([
        property({ displayName: "炮塔", type: cc.Prefab })
    ], turretHost.prototype, "turretPre", void 0);
    turretHost = __decorate([
        ccclass
    ], turretHost);
    return turretHost;
}(baseTs_1.default));
exports.default = turretHost;

cc._RF.pop();