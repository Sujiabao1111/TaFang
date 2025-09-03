
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/game/monster/monsterHp.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '26ca1g5fM5OCL/7uTQtgq1+', 'monsterHp');
// Script/game/monster/monsterHp.ts

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
var monsterHp = /** @class */ (function (_super) {
    __extends(monsterHp, _super);
    function monsterHp() {
        // LIFE-CYCLE CALLBACKS:
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hp = null;
        /**目标 */
        _this.targetNode = null;
        /**运动中 */
        _this.isRuning = false;
        return _this;
        // update (dt) {}
    }
    /**
     * 设置血条
     * @param num 血条
     */
    monsterHp.prototype.setHp = function (num) {
        this.hp.progress = num;
    };
    monsterHp.prototype.onLoad = function () {
    };
    monsterHp.prototype.init = function (data) {
        var _this = this;
        this.targetNode = null;
        this.node.opacity = 0;
        this.hp.progress = 1;
        this.setHp(1);
        this.isRuning = true;
        this.initData = data;
        this.monsetrName = util_1.default.userData.customs.big + "-" + util_1.default.userData.customs.small + "_Monster_" + this.initData.id;
        this.targetNode = util_1.default.MonsterMap.get(this.monsetrName);
        if (!this.targetNode) {
            this.isRuning = false;
            this.destroySelf();
        }
        this.cc_game = cc.game.on(NameTs_1.default.Game_Monster_Hp_Linster + this.monsetrName, function (data) {
            _this.checkSelf(data);
        }, this);
        this.scheduleOnce(function () {
            _this.node.opacity = 255;
        }, .5);
    };
    /**判断是否自己 */
    monsterHp.prototype.checkSelf = function (data) {
        if (data == 0) {
            this.isRuning = false;
            this.destroySelf();
            return;
        }
        this.setHp(data);
    };
    monsterHp.prototype.update = function () {
        // console.log(this.initData.id,'this.initData.node')
        if (!this.isRuning)
            return;
        if (!this.targetNode || (this.targetNode && !this.targetNode.getPosition)) {
            this.isRuning = false;
            this.destroySelf();
            return;
        }
        // console.log(this.targetNode.x,'this.targetNode')
        // if(this.targetNode&&this.targetNode.getPosition){
        // let pos:cc.Vec2 = this.targetNode.getPosition();
        this.node.x = this.targetNode.x || 0;
        this.node.y = (this.targetNode.y || 0) + 60;
        // }
    };
    monsterHp.prototype.start = function () {
    };
    /**回收自己 */
    monsterHp.prototype.destroySelf = function () {
        //回收自己
        this.node.opacity = 0;
        cc.game.off(NameTs_1.default.Game_Monster_Hp_Linster + this.monsetrName, this.cc_game, this);
        this.cc_game = null;
        cc.game.emit(NameTs_1.default.Game_Monster_Hp_Killed, this.node);
    };
    __decorate([
        property({ type: cc.ProgressBar, displayName: "血条" })
    ], monsterHp.prototype, "hp", void 0);
    monsterHp = __decorate([
        ccclass
    ], monsterHp);
    return monsterHp;
}(cc.Component));
exports.default = monsterHp;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxnYW1lXFxtb25zdGVyXFxtb25zdGVySHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBQXlDO0FBQ3pDLHdDQUFtQztBQUU3QixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF1Qyw2QkFBWTtJQUFuRDtRQUVJLHdCQUF3QjtRQUY1QixxRUFrR0M7UUE3RkcsUUFBRSxHQUFtQixJQUFJLENBQUM7UUFNMUIsUUFBUTtRQUNBLGdCQUFVLEdBQVcsSUFBSSxDQUFDO1FBS2xDLFNBQVM7UUFDRCxjQUFRLEdBQVcsS0FBSyxDQUFDOztRQStFakMsaUJBQWlCO0lBQ3JCLENBQUM7SUE1RUc7OztPQUdHO0lBQ0gseUJBQUssR0FBTCxVQUFNLEdBQVU7UUFDWixJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7SUFDM0IsQ0FBQztJQUdELDBCQUFNLEdBQU47SUFHQSxDQUFDO0lBRUQsd0JBQUksR0FBSixVQUFLLElBQUk7UUFBVCxpQkFtQkM7UUFsQkcsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztRQUNyQixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2QsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLFdBQVcsR0FBRyxjQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUMsR0FBRyxHQUFDLGNBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxD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Q29udGVudCI6WyJpbXBvcnQgTmFtZVRzIGZyb20gXCIuLi8uLi9jb21tb24vTmFtZVRzXCI7XG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vLi4vdXRpbC91dGlsXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgbW9uc3RlckhwIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLlByb2dyZXNzQmFyLGRpc3BsYXlOYW1lOlwi6KGA5p2hXCJ9KVxuICAgIGhwOiBjYy5Qcm9ncmVzc0JhciA9IG51bGw7XG5cbiAgICAvLyBvbkxvYWQgKCkge31cblxuICAgIC8qKuaVsOaNriAqL1xuICAgIHByaXZhdGUgaW5pdERhdGE6YW55O1xuICAgIC8qKuebruaghyAqL1xuICAgIHByaXZhdGUgdGFyZ2V0Tm9kZTpjYy5Ob2RlID0gbnVsbDtcbiAgICBcbiAgICAvKirmgKrlhb3lkI3lrZcqL1xuICAgIHByaXZhdGUgbW9uc2V0ck5hbWU6c3RyaW5nO1xuXG4gICAgLyoq6L+Q5Yqo5LitICovXG4gICAgcHJpdmF0ZSBpc1J1bmluZzpib29sZWFuID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIGNjX2dhbWU6YW55O1xuXG4gICAgLyoqXG4gICAgICog6K6+572u6KGA5p2hXG4gICAgICogQHBhcmFtIG51bSDooYDmnaFcbiAgICAgKi9cbiAgICBzZXRIcChudW06bnVtYmVyKXtcbiAgICAgICAgdGhpcy5ocC5wcm9ncmVzcyA9IG51bTtcbiAgICB9XG5cblxuICAgIG9uTG9hZCgpe1xuICAgICAgICBcblxuICAgIH1cblxuICAgIGluaXQoZGF0YSl7XG4gICAgICAgIHRoaXMudGFyZ2V0Tm9kZSA9IG51bGw7XG4gICAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gMDtcbiAgICAgICAgdGhpcy5ocC5wcm9ncmVzcyA9IDE7XG4gICAgICAgIHRoaXMuc2V0SHAoMSk7XG4gICAgICAgIHRoaXMuaXNSdW5pbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmluaXREYXRhID0gZGF0YTtcbiAgICAgICAgdGhpcy5tb25zZXRyTmFtZSA9IHV0aWwudXNlckRhdGEuY3VzdG9tcy5iaWcrXCItXCIrdXRpbC51c2VyRGF0YS5jdXN0b21zLnNtYWxsK1wiX01vbnN0ZXJfXCIrdGhpcy5pbml0RGF0YS5pZDtcbiAgICAgICAgdGhpcy50YXJnZXROb2RlID0gdXRpbC5Nb25zdGVyTWFwLmdldCh0aGlzLm1vbnNldHJOYW1lKTtcbiAgICAgICAgaWYoIXRoaXMudGFyZ2V0Tm9kZSl7XG4gICAgICAgICAgICB0aGlzLmlzUnVuaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lTZWxmKCk7XG4gICAgICAgIH0gXG4gICAgICAgIHRoaXMuY2NfZ2FtZSA9IGNjLmdhbWUub24oTmFtZVRzLkdhbWVfTW9uc3Rlcl9IcF9MaW5zdGVyK3RoaXMubW9uc2V0ck5hbWUsKGRhdGEpPT57XG4gICAgICAgICAgICB0aGlzLmNoZWNrU2VsZihkYXRhKTtcbiAgICAgICAgfSx0aGlzKTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcbiAgICAgICAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gMjU1O1xuICAgICAgICB9LC41KTtcbiAgICB9XG4gICAgLyoq5Yik5pat5piv5ZCm6Ieq5bexICovXG4gICAgcHJpdmF0ZSBjaGVja1NlbGYoZGF0YSl7XG4gICAgICAgIGlmKGRhdGE9PTApe1xuICAgICAgICAgICAgdGhpcy5pc1J1bmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5kZXN0cm95U2VsZigpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0SHAoZGF0YSk7XG4gICAgfVxuICAgIFxuXG4gICAgdXBkYXRlKCl7XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5pbml0RGF0YS5pZCwndGhpcy5pbml0RGF0YS5ub2RlJylcbiAgICAgICAgaWYoIXRoaXMuaXNSdW5pbmcpcmV0dXJuO1xuICAgICAgICBpZighdGhpcy50YXJnZXROb2RlfHwodGhpcy50YXJnZXROb2RlJiYhdGhpcy50YXJnZXROb2RlLmdldFBvc2l0aW9uKSl7XG4gICAgICAgICAgICB0aGlzLmlzUnVuaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lTZWxmKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMudGFyZ2V0Tm9kZS54LCd0aGlzLnRhcmdldE5vZGUnKVxuICAgICAgICAvLyBpZih0aGlzLnRhcmdldE5vZGUmJnRoaXMudGFyZ2V0Tm9kZS5nZXRQb3NpdGlvbil7XG4gICAgICAgICAgICAvLyBsZXQgcG9zOmNjLlZlYzIgPSB0aGlzLnRhcmdldE5vZGUuZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgICAgIHRoaXMubm9kZS54ID0gdGhpcy50YXJnZXROb2RlLnh8fDA7XG4gICAgICAgICAgICB0aGlzLm5vZGUueSA9ICh0aGlzLnRhcmdldE5vZGUueXx8MCkrNjA7XG4gICAgICAgIC8vIH1cblxuICAgIH1cblxuICAgIHN0YXJ0ICgpIHtcblxuICAgIH1cblxuICAgIC8qKuWbnuaUtuiHquW3sSAqL1xuICAgIGRlc3Ryb3lTZWxmKCl7XG4gICAgICAgIC8v5Zue5pS26Ieq5bexXG4gICAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gMDtcbiAgICAgICAgY2MuZ2FtZS5vZmYoTmFtZVRzLkdhbWVfTW9uc3Rlcl9IcF9MaW5zdGVyK3RoaXMubW9uc2V0ck5hbWUsdGhpcy5jY19nYW1lLHRoaXMpO1xuICAgICAgICB0aGlzLmNjX2dhbWUgPSBudWxsO1xuICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfTW9uc3Rlcl9IcF9LaWxsZWQsdGhpcy5ub2RlKTtcbiAgICB9XG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cbiJdfQ==