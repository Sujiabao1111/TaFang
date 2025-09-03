"use strict";
cc._RF.push(module, '9745aWTyl5EqaFFx9uR9EGh', 'turretRecycle');
// Script/ui/turretRecycle.ts

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
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var turretRecycle = /** @class */ (function (_super) {
    __extends(turretRecycle, _super);
    function turretRecycle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.levelLabel = null;
        _this.paoBody = null;
        //是否在接触
        _this.isTouch = false;
        _this.level = null;
        return _this;
    }
    turretRecycle.prototype.onLoad = function () {
        var _this = this;
        //拿起
        cc.game.on(NameTs_1.default.Game_Turret_PickUp, function (res) {
            _this.isTouch = true;
            _this.targetNode = util_1.default.GlobalMap.get("turret_" + res.host);
            if (_this.level !== res.level) {
                _this.level = res.level;
                _this.setLevel();
            }
        }, this);
        //放下
        cc.game.on(NameTs_1.default.Game_Turret_PutDown, function (res) {
            _this.isTouch = false;
            _this.targetNode = null;
            _this.node.setPosition(cc.winSize.width, 0);
        }, this);
    };
    turretRecycle.prototype.update = function () {
        if (this.isTouch && this.targetNode) {
            this.node.setPosition(this.targetNode.getPosition());
        }
    };
    /**
     * 更新炮塔
     */
    turretRecycle.prototype.setLevel = function () {
        //炮塔属性
        this.turretData = util_1.default.GetTurretData(this.level);
        this.levelLabel.string = String(this.level);
        this.loadSpine(this.paoBody, "pao");
    };
    /**
     * 加载图片
     */
    turretRecycle.prototype.loadSpine = function (spine, name) {
        cc.resources.load("spine/turret/" + this.turretData.DynamicResources + "/" + name + "/" + this.turretData.spineName, sp.SkeletonData, function (error, sp) {
            spine.skeletonData = sp;
        });
    };
    __decorate([
        property({ displayName: "等级", type: cc.Label })
    ], turretRecycle.prototype, "levelLabel", void 0);
    __decorate([
        property({ type: sp.Skeleton, displayName: "炮" })
    ], turretRecycle.prototype, "paoBody", void 0);
    turretRecycle = __decorate([
        ccclass
    ], turretRecycle);
    return turretRecycle;
}(baseTs_1.default));
exports.default = turretRecycle;

cc._RF.pop();