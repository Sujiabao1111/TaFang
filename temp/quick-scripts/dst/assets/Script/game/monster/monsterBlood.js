
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/game/monster/monsterBlood.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1f820/J3cpCCKVB7ilFYspS', 'monsterBlood');
// Script/game/monster/monsterBlood.ts

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
var NameTs_1 = require("../../common/NameTs");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var monsterBlood = /** @class */ (function (_super) {
    __extends(monsterBlood, _super);
    function monsterBlood() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // LIFE-CYCLE CALLBACKS:
        _this.ArmatureDisplay = null;
        return _this;
        // update (dt) {}
    }
    monsterBlood.prototype.onLoad = function () {
    };
    monsterBlood.prototype.init = function (data) {
        var _this = this;
        var tempColor = new cc.Color();
        tempColor.fromHEX(data.color);
        this.node.setPosition(data.pos);
        this.ArmatureDisplay.node.color = tempColor;
        this.ArmatureDisplay.playAnimation("monsterblood", 1);
        this.scheduleOnce(function () {
            _this.destroySelf();
        }, 1);
    };
    monsterBlood.prototype.start = function () {
    };
    /**回收自己 */
    monsterBlood.prototype.destroySelf = function () {
        //回收自己
        cc.game.emit(NameTs_1.default.Game_Monster_Blood_Killed, this.node);
    };
    __decorate([
        property({ displayName: "龙骨", type: dragonBones.ArmatureDisplay })
    ], monsterBlood.prototype, "ArmatureDisplay", void 0);
    monsterBlood = __decorate([
        ccclass
    ], monsterBlood);
    return monsterBlood;
}(cc.Component));
exports.default = monsterBlood;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxnYW1lXFxtb25zdGVyXFxtb25zdGVyQmxvb2QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBQXlDO0FBRW5DLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQTBDLGdDQUFZO0lBQXREO1FBQUEscUVBc0NDO1FBcENHLHdCQUF3QjtRQUVoQixxQkFBZSxHQUErQixJQUFJLENBQUM7O1FBaUMzRCxpQkFBaUI7SUFDckIsQ0FBQztJQS9CRyw2QkFBTSxHQUFOO0lBRUEsQ0FBQztJQUVELDJCQUFJLEdBQUosVUFBSyxJQUFJO1FBQVQsaUJBY0M7UUFiRyxJQUFJLFNBQVMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUMvQixTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUU5QixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFaEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztRQUU1QyxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxjQUFjLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFFckQsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUNkLEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN2QixDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFFVCxDQUFDO0lBR0QsNEJBQUssR0FBTDtJQUVBLENBQUM7SUFFRCxVQUFVO0lBQ1Ysa0NBQVcsR0FBWDtRQUNJLE1BQU07UUFDTixFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBTSxDQUFDLHlCQUF5QixFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBaENEO1FBREMsUUFBUSxDQUFDLEVBQUMsV0FBVyxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsV0FBVyxDQUFDLGVBQWUsRUFBQyxDQUFDO3lEQUNIO0lBSjFDLFlBQVk7UUFEaEMsT0FBTztPQUNhLFlBQVksQ0FzQ2hDO0lBQUQsbUJBQUM7Q0F0Q0QsQUFzQ0MsQ0F0Q3lDLEVBQUUsQ0FBQyxTQUFTLEdBc0NyRDtrQkF0Q29CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTmFtZVRzIGZyb20gXCIuLi8uLi9jb21tb24vTmFtZVRzXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIG1vbnN0ZXJCbG9vZCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcbiAgICBAcHJvcGVydHkoe2Rpc3BsYXlOYW1lOlwi6b6Z6aqoXCIsdHlwZTpkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXl9KVxyXG4gICAgcHJpdmF0ZSBBcm1hdHVyZURpc3BsYXk6ZHJhZ29uQm9uZXMuQXJtYXR1cmVEaXNwbGF5ID0gbnVsbDtcclxuXHJcblxyXG4gICAgb25Mb2FkKCl7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgaW5pdChkYXRhKXtcclxuICAgICAgICBsZXQgdGVtcENvbG9yID0gbmV3IGNjLkNvbG9yKCk7XHJcbiAgICAgICAgdGVtcENvbG9yLmZyb21IRVgoZGF0YS5jb2xvcik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKGRhdGEucG9zKTtcclxuXHJcbiAgICAgICAgdGhpcy5Bcm1hdHVyZURpc3BsYXkubm9kZS5jb2xvciA9IHRlbXBDb2xvcjtcclxuXHJcbiAgICAgICAgdGhpcy5Bcm1hdHVyZURpc3BsYXkucGxheUFuaW1hdGlvbihcIm1vbnN0ZXJibG9vZFwiLDEpO1xyXG4gICAgICAgXHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgdGhpcy5kZXN0cm95U2VsZigpO1xyXG4gICAgICAgIH0sMSk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICBcclxuICAgIHN0YXJ0ICgpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoq5Zue5pS26Ieq5bexICovXHJcbiAgICBkZXN0cm95U2VsZigpe1xyXG4gICAgICAgIC8v5Zue5pS26Ieq5bexXHJcbiAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX01vbnN0ZXJfQmxvb2RfS2lsbGVkLHRoaXMubm9kZSk7XHJcbiAgICB9XHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxyXG59XHJcbiJdfQ==