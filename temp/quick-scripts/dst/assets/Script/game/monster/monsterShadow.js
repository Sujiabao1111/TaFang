
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/game/monster/monsterShadow.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9ea440ynzRC/5ZBqC+sbsf4', 'monsterShadow');
// Script/game/monster/monsterShadow.ts

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
var monsterShadow = /** @class */ (function (_super) {
    __extends(monsterShadow, _super);
    function monsterShadow() {
        // LIFE-CYCLE CALLBACKS:
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**目标 */
        _this.targetNode = null;
        return _this;
        // update (dt) {}
    }
    monsterShadow.prototype.onLoad = function () {
    };
    monsterShadow.prototype.init = function (data) {
        var _this = this;
        this.initData = data;
        this.monsetrName = util_1.default.userData.customs.big + "-" + util_1.default.userData.customs.small + "_Monster_" + this.initData.id;
        this.targetNode = util_1.default.MonsterMap.get(this.monsetrName);
        if (this.targetNode) {
            this.node.setPosition(this.targetNode.getPosition());
        }
        else {
            this.destroySelf();
        }
        cc.game.on(NameTs_1.default.Game_Monster_Shadow_Linster + this.monsetrName, function (data) {
            _this.destroySelf();
        }, this);
    };
    monsterShadow.prototype.update = function () {
        // console.log(this.initData.id,'this.initData.node')
        if (!this.targetNode) {
            this.destroySelf();
            this.targetNode = null;
            return;
        }
        // console.log(this.targetNode.x,'this.targetNode')
        var pos = this.targetNode.getPosition();
        this.node.x = pos.x;
        this.node.y = pos.y;
    };
    monsterShadow.prototype.start = function () {
    };
    /**回收自己 */
    monsterShadow.prototype.destroySelf = function () {
        //回收自己
        cc.game.off(NameTs_1.default.Game_Monster_Shadow_Linster + this.monsetrName, this.destroySelf);
        cc.game.emit(NameTs_1.default.Game_Monster_Hp_Killed, this.node);
    };
    monsterShadow = __decorate([
        ccclass
    ], monsterShadow);
    return monsterShadow;
}(cc.Component));
exports.default = monsterShadow;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxnYW1lXFxtb25zdGVyXFxtb25zdGVyU2hhZG93LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhDQUF5QztBQUN6Qyx3Q0FBbUM7QUFFN0IsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBMkMsaUNBQVk7SUFBdkQ7UUFFSSx3QkFBd0I7UUFGNUIscUVBMERDO1FBcERHLFFBQVE7UUFDQSxnQkFBVSxHQUFXLElBQUksQ0FBQzs7UUFrRGxDLGlCQUFpQjtJQUNyQixDQUFDO0lBN0NHLDhCQUFNLEdBQU47SUFFQSxDQUFDO0lBRUQsNEJBQUksR0FBSixVQUFLLElBQUk7UUFBVCxpQkFZQztRQVhHLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxXQUFXLEdBQUcsY0FBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFDLEdBQUcsR0FBQyxjQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUMsV0FBVyxHQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO1FBQzFHLElBQUksQ0FBQyxVQUFVLEdBQUcsY0FBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3hELElBQUcsSUFBSSxDQUFDLFVBQVUsRUFBQztZQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztTQUN4RDthQUFJO1lBQ0QsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3RCO1FBQ0QsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsZ0JBQU0sQ0FBQywyQkFBMkIsR0FBQyxJQUFJLENBQUMsV0FBVyxFQUFDLFVBQUMsSUFBSTtZQUNoRSxLQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkIsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFDO0lBQ1osQ0FBQztJQUVELDhCQUFNLEdBQU47UUFFSSxxREFBcUQ7UUFFckQsSUFBRyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUM7WUFDaEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLE9BQU87U0FDVjtRQUNELG1EQUFtRDtRQUNuRCxJQUFJLEdBQUcsR0FBVyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2hELElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUV4QixDQUFDO0lBRUQsNkJBQUssR0FBTDtJQUVBLENBQUM7SUFFRCxVQUFVO0lBQ1YsbUNBQVcsR0FBWDtRQUNJLE1BQU07UUFDTixFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBTSxDQUFDLDJCQUEyQixHQUFDLElBQUksQ0FBQyxXQUFXLEVBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2xGLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFNLENBQUMsc0JBQXNCLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFELENBQUM7SUF4RGdCLGFBQWE7UUFEakMsT0FBTztPQUNhLGFBQWEsQ0EwRGpDO0lBQUQsb0JBQUM7Q0ExREQsQUEwREMsQ0ExRDBDLEVBQUUsQ0FBQyxTQUFTLEdBMER0RDtrQkExRG9CLGFBQWEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTmFtZVRzIGZyb20gXCIuLi8uLi9jb21tb24vTmFtZVRzXCI7XG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vLi4vdXRpbC91dGlsXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgbW9uc3RlclNoYWRvdyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIC8qKuaVsOaNriAqL1xuICAgIHByaXZhdGUgaW5pdERhdGE6YW55O1xuICAgIC8qKuebruaghyAqL1xuICAgIHByaXZhdGUgdGFyZ2V0Tm9kZTpjYy5Ob2RlID0gbnVsbDtcbiAgICBcbiAgICAvKirmgKrlhb3lkI3lrZcqL1xuICAgIHByaXZhdGUgbW9uc2V0ck5hbWU6c3RyaW5nO1xuIFxuXG4gICAgb25Mb2FkKCl7XG4gICAgICAgIFxuICAgIH1cblxuICAgIGluaXQoZGF0YSl7XG4gICAgICAgIHRoaXMuaW5pdERhdGEgPSBkYXRhO1xuICAgICAgICB0aGlzLm1vbnNldHJOYW1lID0gdXRpbC51c2VyRGF0YS5jdXN0b21zLmJpZytcIi1cIit1dGlsLnVzZXJEYXRhLmN1c3RvbXMuc21hbGwrXCJfTW9uc3Rlcl9cIit0aGlzLmluaXREYXRhLmlkO1xuICAgICAgICB0aGlzLnRhcmdldE5vZGUgPSB1dGlsLk1vbnN0ZXJNYXAuZ2V0KHRoaXMubW9uc2V0ck5hbWUpO1xuICAgICAgICBpZih0aGlzLnRhcmdldE5vZGUpe1xuICAgICAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKHRoaXMudGFyZ2V0Tm9kZS5nZXRQb3NpdGlvbigpKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lTZWxmKCk7XG4gICAgICAgIH1cbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9Nb25zdGVyX1NoYWRvd19MaW5zdGVyK3RoaXMubW9uc2V0ck5hbWUsKGRhdGEpPT57XG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lTZWxmKCk7XG4gICAgICAgIH0sdGhpcyk7XG4gICAgfVxuXG4gICAgdXBkYXRlKCl7XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5pbml0RGF0YS5pZCwndGhpcy5pbml0RGF0YS5ub2RlJylcblxuICAgICAgICBpZighdGhpcy50YXJnZXROb2RlKXtcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveVNlbGYoKTtcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0Tm9kZSA9IG51bGw7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMudGFyZ2V0Tm9kZS54LCd0aGlzLnRhcmdldE5vZGUnKVxuICAgICAgICBsZXQgcG9zOmNjLlZlYzIgPSB0aGlzLnRhcmdldE5vZGUuZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgdGhpcy5ub2RlLnggPSBwb3MueDtcbiAgICAgICAgdGhpcy5ub2RlLnkgPSBwb3MueTtcblxuICAgIH1cblxuICAgIHN0YXJ0ICgpIHtcblxuICAgIH1cblxuICAgIC8qKuWbnuaUtuiHquW3sSAqL1xuICAgIGRlc3Ryb3lTZWxmKCl7XG4gICAgICAgIC8v5Zue5pS26Ieq5bexXG4gICAgICAgIGNjLmdhbWUub2ZmKE5hbWVUcy5HYW1lX01vbnN0ZXJfU2hhZG93X0xpbnN0ZXIrdGhpcy5tb25zZXRyTmFtZSx0aGlzLmRlc3Ryb3lTZWxmKTtcbiAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX01vbnN0ZXJfSHBfS2lsbGVkLHRoaXMubm9kZSk7XG4gICAgfVxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=