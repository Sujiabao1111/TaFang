
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/game/place/placeItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '53df5Bs7pNKr4+omDBoIIDn', 'placeItem');
// Script/game/place/placeItem.ts

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
var Tools_1 = require("../../util/Tools");
var util_1 = require("../../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var placeItem = /** @class */ (function (_super) {
    __extends(placeItem, _super);
    function placeItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bg = null;
        _this.bgSpriteFrame = [];
        _this.lock = null;
        _this.sameNode = null;
        _this.turretBox = null;
        //状态
        _this.state = 0;
        return _this;
        // update (dt) {}
    }
    placeItem.prototype.onLoad = function () {
        var _this = this;
        //拿起
        cc.game.on(NameTs_1.default.Game_Same_Place_PickUp, function (res) {
            if (res.id == _this.initData.id) {
                _this.sameNode.active = true;
            }
        }, this);
        //放下
        cc.game.on(NameTs_1.default.Game_Same_Place_PutDown, function (res) {
            if (res.id == _this.initData.id) {
                _this.sameNode.active = false;
            }
        }, this);
        cc.game.on(NameTs_1.default.Game_Unlock_Place, function (res) {
            if (_this.initData.id == res) {
                _this.state = 1;
                _this.setState();
            }
        }, this);
        cc.game.on(NameTs_1.default.Show_Empty_Box, function () {
            if (_this.initData.id == util_1.default.userData.emptyBoxNo) {
                _this.turretBox.node.active = true;
                _this.turretBox.playAnimation("dropbox", 0);
            }
            else {
                _this.turretBox.node.active = false;
            }
        });
    };
    placeItem.prototype.start = function () {
    };
    /**初始化 */
    placeItem.prototype.init = function (data) {
        this.initData = data;
        var placeData = Tools_1.Tools.GetArrData("no", this.initData.id, util_1.default.userData.pool);
        //console.log(" placeData :   " + placeData)
        this.state = placeData.state;
        // this.setState();
    };
    /**状态修改背景 */
    placeItem.prototype.setState = function () {
        if (this.bg) {
            this.bg.spriteFrame = this.bgSpriteFrame[this.state == 1 ? 0 : 1];
        }
        if (this.lock) {
            this.lock.active = this.state == 0;
        }
    };
    /**
     * 点击
     */
    placeItem.prototype.clickBtn = function () {
        var _this = this;
        // if(this.state==0){
        //     AssistCtr.showToastTip("地块待解锁!");
        //     return;
        // }
        if (this.turretBox.node.active) {
            this.turretBox.playAnimation("dropbox_open", 1);
            this.scheduleOnce(function () {
                cc.game.emit(NameTs_1.default.Click_Empty_Box, _this.initData.id);
            }, 0.5);
            this.scheduleOnce(function () {
                util_1.default.userData.emptyBoxNo = -1;
                _this.turretBox.node.active = false;
            }, 1);
        }
    };
    __decorate([
        property({ type: cc.Sprite, displayName: "背景" })
    ], placeItem.prototype, "bg", void 0);
    __decorate([
        property({ type: [cc.SpriteFrame], displayName: "背景图" })
    ], placeItem.prototype, "bgSpriteFrame", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "锁" })
    ], placeItem.prototype, "lock", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "相同等级的" })
    ], placeItem.prototype, "sameNode", void 0);
    __decorate([
        property(dragonBones.ArmatureDisplay)
    ], placeItem.prototype, "turretBox", void 0);
    placeItem = __decorate([
        ccclass
    ], placeItem);
    return placeItem;
}(cc.Component));
exports.default = placeItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxnYW1lXFxwbGFjZVxccGxhY2VJdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDhDQUF5QztBQUN6QywwQ0FBeUM7QUFDekMsd0NBQW1DO0FBRTdCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXVDLDZCQUFZO0lBQW5EO1FBQUEscUVBNEdDO1FBekdXLFFBQUUsR0FBYyxJQUFJLENBQUM7UUFHckIsbUJBQWEsR0FBcUIsRUFBRSxDQUFDO1FBR3JDLFVBQUksR0FBWSxJQUFJLENBQUM7UUFHckIsY0FBUSxHQUFZLElBQUksQ0FBQztRQUd6QixlQUFTLEdBQWdDLElBQUksQ0FBQztRQUt0RCxJQUFJO1FBQ0ksV0FBSyxHQUFXLENBQUMsQ0FBQzs7UUFzRjFCLGlCQUFpQjtJQUNyQixDQUFDO0lBckZHLDBCQUFNLEdBQU47UUFBQSxpQkFxQ0M7UUFuQ0csSUFBSTtRQUNKLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGdCQUFNLENBQUMsc0JBQXNCLEVBQUUsVUFBQyxHQUFHO1lBQzFDLElBQUksR0FBRyxDQUFDLEVBQUUsSUFBSSxLQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRTtnQkFDNUIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2FBQy9CO1FBRUwsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRVQsSUFBSTtRQUNKLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGdCQUFNLENBQUMsdUJBQXVCLEVBQUUsVUFBQyxHQUFHO1lBRTNDLElBQUksR0FBRyxDQUFDLEVBQUUsSUFBSSxLQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRTtnQkFDNUIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsS0FBSyxD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RSxJQUFJLEVBQUUsQ0FBQzt5Q0FDcEI7SUFHN0I7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxDQUFDO29EQUNaO0lBRzdDO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLEdBQUcsRUFBRSxDQUFDOzJDQUNqQjtJQUc3QjtRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsQ0FBQzsrQ0FDakI7SUFHakM7UUFEQyxRQUFRLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQztnREFDZ0I7SUFmckMsU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQTRHN0I7SUFBRCxnQkFBQztDQTVHRCxBQTRHQyxDQTVHc0MsRUFBRSxDQUFDLFNBQVMsR0E0R2xEO2tCQTVHb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFzc2lzdEN0ciB9IGZyb20gXCIuLi8uLi9Bc3Npc3QvQXNzaXN0Q3RyXCI7XG5pbXBvcnQgTmFtZVRzIGZyb20gXCIuLi8uLi9jb21tb24vTmFtZVRzXCI7XG5pbXBvcnQgeyBUb29scyB9IGZyb20gXCIuLi8uLi91dGlsL1Rvb2xzXCI7XG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vLi4vdXRpbC91dGlsXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBwbGFjZUl0ZW0gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuU3ByaXRlLCBkaXNwbGF5TmFtZTogXCLog4zmma9cIiB9KVxuICAgIHByaXZhdGUgYmc6IGNjLlNwcml0ZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBbY2MuU3ByaXRlRnJhbWVdLCBkaXNwbGF5TmFtZTogXCLog4zmma/lm75cIiB9KVxuICAgIHByaXZhdGUgYmdTcHJpdGVGcmFtZTogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTm9kZSwgZGlzcGxheU5hbWU6IFwi6ZSBXCIgfSlcbiAgICBwcml2YXRlIGxvY2s6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTm9kZSwgZGlzcGxheU5hbWU6IFwi55u45ZCM562J57qn55qEXCIgfSlcbiAgICBwcml2YXRlIHNhbWVOb2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXkpXG4gICAgcHJpdmF0ZSB0dXJyZXRCb3g6IGRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheSA9IG51bGw7XG5cbiAgICAvL+WIneWni+WMluaVsOaNrlxuICAgIHByaXZhdGUgaW5pdERhdGE6IGFueTtcblxuICAgIC8v54q25oCBXG4gICAgcHJpdmF0ZSBzdGF0ZTogbnVtYmVyID0gMDtcblxuICAgIG9uTG9hZCgpIHtcblxuICAgICAgICAvL+aLv+i1t1xuICAgICAgICBjYy5nYW1lLm9uKE5hbWVUcy5HYW1lX1NhbWVfUGxhY2VfUGlja1VwLCAocmVzKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzLmlkID09IHRoaXMuaW5pdERhdGEuaWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNhbWVOb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgLy/mlL7kuItcbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9TYW1lX1BsYWNlX1B1dERvd24sIChyZXMpID0+IHtcblxuICAgICAgICAgICAgaWYgKHJlcy5pZCA9PSB0aGlzLmluaXREYXRhLmlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zYW1lTm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICBjYy5nYW1lLm9uKE5hbWVUcy5HYW1lX1VubG9ja19QbGFjZSwgKHJlcykgPT4ge1xuXG4gICAgICAgICAgICBpZiAodGhpcy5pbml0RGF0YS5pZCA9PSByZXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gMTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuU2hvd19FbXB0eV9Cb3gsICgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmluaXREYXRhLmlkID09IHV0aWwudXNlckRhdGEuZW1wdHlCb3hObykge1xuICAgICAgICAgICAgICAgIHRoaXMudHVycmV0Qm94Lm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnR1cnJldEJveC5wbGF5QW5pbWF0aW9uKFwiZHJvcGJveFwiLCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMudHVycmV0Qm94Lm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9XG5cbiAgICAvKirliJ3lp4vljJYgKi9cbiAgICBpbml0KGRhdGEpIHtcbiAgICAgICAgdGhpcy5pbml0RGF0YSA9IGRhdGE7XG4gICAgICAgIGxldCBwbGFjZURhdGEgPSBUb29scy5HZXRBcnJEYXRhKFwibm9cIiwgdGhpcy5pbml0RGF0YS5pZCwgdXRpbC51c2VyRGF0YS5wb29sKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIiBwbGFjZURhdGEgOiAgIFwiICsgcGxhY2VEYXRhKVxuICAgICAgICB0aGlzLnN0YXRlID0gcGxhY2VEYXRhLnN0YXRlO1xuICAgICAgICAvLyB0aGlzLnNldFN0YXRlKCk7XG4gICAgfVxuXG4gICAgLyoq54q25oCB5L+u5pS56IOM5pmvICovXG4gICAgc2V0U3RhdGUoKSB7XG4gICAgICAgIGlmICh0aGlzLmJnKSB7XG4gICAgICAgICAgICB0aGlzLmJnLnNwcml0ZUZyYW1lID0gdGhpcy5iZ1Nwcml0ZUZyYW1lW3RoaXMuc3RhdGUgPT0gMSA/IDAgOiAxXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmxvY2spIHtcbiAgICAgICAgICAgIHRoaXMubG9jay5hY3RpdmUgPSB0aGlzLnN0YXRlID09IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDngrnlh7tcbiAgICAgKi9cbiAgICBjbGlja0J0bigpIHtcbiAgICAgICAgLy8gaWYodGhpcy5zdGF0ZT09MCl7XG4gICAgICAgIC8vICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKFwi5Zyw5Z2X5b6F6Kej6ZSBIVwiKTtcbiAgICAgICAgLy8gICAgIHJldHVybjtcbiAgICAgICAgLy8gfVxuICAgICAgICBpZiAodGhpcy50dXJyZXRCb3gubm9kZS5hY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMudHVycmV0Qm94LnBsYXlBbmltYXRpb24oXCJkcm9wYm94X29wZW5cIiwgMSk7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5DbGlja19FbXB0eV9Cb3gsIHRoaXMuaW5pdERhdGEuaWQpO1xuICAgICAgICAgICAgfSwgMC41KVxuXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdXRpbC51c2VyRGF0YS5lbXB0eUJveE5vID0gLTE7XG4gICAgICAgICAgICAgICAgdGhpcy50dXJyZXRCb3gubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sIDEpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19