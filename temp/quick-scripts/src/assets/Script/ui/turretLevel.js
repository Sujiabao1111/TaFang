"use strict";
cc._RF.push(module, '3d18eUK0idBp4wmpcVl2vZo', 'turretLevel');
// Script/ui/turretLevel.ts

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
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var turretLevel = /** @class */ (function (_super) {
    __extends(turretLevel, _super);
    function turretLevel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.levelLabel = null;
        _this.rbmLabel = null;
        _this.lightNode = null;
        // @property({type:sp.Skeleton,displayName:"炮"})
        // paoBody: sp.Skeleton = null;
        _this.rmbProgress = null;
        _this.level = null;
        _this.data = [
        // {
        //     amount:0.1,
        //     level:10,
        // },
        // {
        //     amount:0.3,
        //     level:20,
        // },
        ];
        //当前进行
        _this.nowNo = 0;
        return _this;
    }
    turretLevel.prototype.onLoad = function () {
        cc.tween(this.rbmLabel.node.getParent()).repeatForever(cc.tween().to(.3, { angle: 10 }).to(.2, { angle: 0 })).start();
        cc.tween(this.lightNode).by(1, { angle: -360 }).repeatForever().start();
    };
    turretLevel.prototype.update = function () {
    };
    /**
     * 更新炮塔
     */
    turretLevel.prototype.setLevel = function () {
        //炮塔属性
        if (this.data.length == 0) {
            this.node.active = false;
            return;
        }
        this.turretData = util_1.default.GetTurretData(this.data[this.nowNo].level);
        //this.rbmLabel.string = this.data[this.nowNo].amount+"元";
        this.levelLabel.string = "Lv" + this.data[this.nowNo].level;
        this.rmbProgress.progress = util_1.default.userData.turretLevel / this.data[this.nowNo].level;
        // this.loadSpine(this.paoBody,"pao");
        this.setState();
    };
    /**
     * 设置状态
     */
    turretLevel.prototype.setState = function () {
        console.log(this.rmbProgress.progress >= 1, 'this.rmbProgress.progress>=1');
        this.lightNode.active = this.rmbProgress.progress >= 1;
        this.lightNode.stopAllActions();
        if (this.lightNode.active) {
            cc.tween(this.lightNode).by(1, { angle: -360 }).repeatForever().start();
        }
    };
    /**
     * 加载图片
     */
    turretLevel.prototype.loadSpine = function (spine, name) {
        cc.resources.load("spine/turret/" + this.turretData.DynamicResources + "/" + name + "/" + this.turretData.spineName, sp.SkeletonData, function (error, sp) {
            spine.skeletonData = sp;
        });
    };
    __decorate([
        property({ displayName: "等级", type: cc.Label })
    ], turretLevel.prototype, "levelLabel", void 0);
    __decorate([
        property({ displayName: "renminb", type: cc.Label })
    ], turretLevel.prototype, "rbmLabel", void 0);
    __decorate([
        property({ displayName: "光", type: cc.Node })
    ], turretLevel.prototype, "lightNode", void 0);
    __decorate([
        property({ type: cc.ProgressBar, displayName: "进度" })
    ], turretLevel.prototype, "rmbProgress", void 0);
    turretLevel = __decorate([
        ccclass
    ], turretLevel);
    return turretLevel;
}(baseTs_1.default));
exports.default = turretLevel;

cc._RF.pop();