"use strict";
cc._RF.push(module, '5d80b4pn+dOpIQekAZc889l', 'BulletBoom');
// Script/game/turret/BulletBoom.ts

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
var NameTs_1 = require("../../common/NameTs");
var util_1 = require("../../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BulletBoom = /** @class */ (function (_super) {
    __extends(BulletBoom, _super);
    function BulletBoom() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.spine = null;
        return _this;
    }
    BulletBoom.prototype.start = function () {
    };
    /**初始化 */
    BulletBoom.prototype.init = function (data) {
        var _this = this;
        this.bulletData = util_1.default.GetBulletData(data.type);
        var monsetrName = util_1.default.userData.customs.big + "-" + util_1.default.userData.customs.small + "_Monster_" + data.id;
        var targetNode = util_1.default.MonsterMap.get(monsetrName);
        if (!targetNode) {
            this.destroyBoom();
            return;
        }
        this.node.setPosition(targetNode.getPosition());
        this.loadSpine(data.type);
        this.node.y += Number(this.bulletData.boomY);
        // this.scheduleOnce(()=>{
        //     this.destroyBoom();
        // },5);
        this.spine.setCompleteListener(function () {
            _this.destroyBoom();
        });
    };
    /**
     * 加载龙骨
     * @param type 类型
     */
    BulletBoom.prototype.loadSpine = function (type) {
        var _this = this;
        var name = this.bulletData.boom;
        cc.resources.load("spine/turret/" + type + "/boom/" + name, sp.SkeletonData, function (error, sp) {
            if (error) {
                return;
            }
            _this.spine.skeletonData = sp;
            _this.spine.setAnimation(0, "animation", false);
        });
    };
    /**回收自己 */
    BulletBoom.prototype.destroyBoom = function () {
        //回收自己
        cc.game.emit(NameTs_1.default.Game_Bullet_Boom_Killed, this.node);
    };
    __decorate([
        property({ type: sp.Skeleton, displayName: "爆炸" })
    ], BulletBoom.prototype, "spine", void 0);
    BulletBoom = __decorate([
        ccclass
    ], BulletBoom);
    return BulletBoom;
}(cc.Component));
exports.default = BulletBoom;

cc._RF.pop();