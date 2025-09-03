
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
var tool_1 = require("../../util/tool");
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
        var placeData = tool_1.default.GetArrData("no", this.initData.id, util_1.default.userData.pool);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxnYW1lXFxwbGFjZVxccGxhY2VJdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDhDQUF5QztBQUN6Qyx3Q0FBbUM7QUFDbkMsd0NBQW1DO0FBRTdCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXVDLDZCQUFZO0lBQW5EO1FBQUEscUVBNEdDO1FBekdXLFFBQUUsR0FBYSxJQUFJLENBQUM7UUFHcEIsbUJBQWEsR0FBb0IsRUFBRSxDQUFDO1FBR3BDLFVBQUksR0FBVyxJQUFJLENBQUM7UUFHcEIsY0FBUSxHQUFXLElBQUksQ0FBQztRQUd4QixlQUFTLEdBQStCLElBQUksQ0FBQztRQUtyRCxJQUFJO1FBQ0ksV0FBSyxHQUFVLENBQUMsQ0FBQzs7UUFzRnpCLGlCQUFpQjtJQUNyQixDQUFDO0lBckZHLDBCQUFNLEdBQU47UUFBQSxpQkFxQ0M7UUFuQ0csSUFBSTtRQUNKLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGdCQUFNLENBQUMsc0JBQXNCLEVBQUMsVUFBQyxHQUFHO1lBQ3pDLElBQUcsR0FBRyxDQUFDLEVBQUUsSUFBSSxLQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBQztnQkFDMUIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2FBQy9CO1FBRUwsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFDO1FBRVIsSUFBSTtRQUNKLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGdCQUFNLENBQUMsdUJBQXVCLEVBQUMsVUFBQyxHQUFHO1lBRTFDLElBQUcsR0FBRyxDQUFDLEVBQUUsSUFBSSxLQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBQztnQkFDMUIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsS0FBSyxD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QyxJQUFJLEVBQUMsQ0FBQzt5Q0FDaEI7SUFHNUI7UUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUMsV0FBVyxFQUFDLEtBQUssRUFBQyxDQUFDO29EQUNSO0lBRzVDO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUMsV0FBVyxFQUFDLEdBQUcsRUFBQyxDQUFDOzJDQUNiO0lBRzVCO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUMsV0FBVyxFQUFDLE9BQU8sRUFBQyxDQUFDOytDQUNiO0lBR2hDO1FBREMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUM7Z0RBQ2U7SUFmcEMsU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQTRHN0I7SUFBRCxnQkFBQztDQTVHRCxBQTRHQyxDQTVHc0MsRUFBRSxDQUFDLFNBQVMsR0E0R2xEO2tCQTVHb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFzc2lzdEN0ciB9IGZyb20gXCIuLi8uLi9Bc3Npc3QvQXNzaXN0Q3RyXCI7XG5pbXBvcnQgTmFtZVRzIGZyb20gXCIuLi8uLi9jb21tb24vTmFtZVRzXCI7XG5pbXBvcnQgdG9vbCBmcm9tIFwiLi4vLi4vdXRpbC90b29sXCI7XG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vLi4vdXRpbC91dGlsXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgcGxhY2VJdGVtIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5TcHJpdGUsZGlzcGxheU5hbWU6XCLog4zmma9cIn0pXG4gICAgcHJpdmF0ZSBiZzpjYy5TcHJpdGUgPSBudWxsO1xuICAgIFxuICAgIEBwcm9wZXJ0eSh7dHlwZTpbY2MuU3ByaXRlRnJhbWVdLGRpc3BsYXlOYW1lOlwi6IOM5pmv5Zu+XCJ9KVxuICAgIHByaXZhdGUgYmdTcHJpdGVGcmFtZTpjYy5TcHJpdGVGcmFtZVtdID0gW107XG5cbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuTm9kZSxkaXNwbGF5TmFtZTpcIumUgVwifSlcbiAgICBwcml2YXRlIGxvY2s6Y2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuTm9kZSxkaXNwbGF5TmFtZTpcIuebuOWQjOetiee6p+eahFwifSlcbiAgICBwcml2YXRlIHNhbWVOb2RlOmNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheSlcbiAgICBwcml2YXRlIHR1cnJldEJveDpkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXkgPSBudWxsO1xuXG4gICAgLy/liJ3lp4vljJbmlbDmja5cbiAgICBwcml2YXRlIGluaXREYXRhOmFueTtcblxuICAgIC8v54q25oCBXG4gICAgcHJpdmF0ZSBzdGF0ZTpudW1iZXIgPSAwO1xuICAgXG4gICAgb25Mb2FkICgpIHtcblxuICAgICAgICAvL+aLv+i1t1xuICAgICAgICBjYy5nYW1lLm9uKE5hbWVUcy5HYW1lX1NhbWVfUGxhY2VfUGlja1VwLChyZXMpPT57XG4gICAgICAgICAgICBpZihyZXMuaWQgPT0gdGhpcy5pbml0RGF0YS5pZCl7XG4gICAgICAgICAgICAgICAgdGhpcy5zYW1lTm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sdGhpcyk7XG5cbiAgICAgICAgLy/mlL7kuItcbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9TYW1lX1BsYWNlX1B1dERvd24sKHJlcyk9PntcblxuICAgICAgICAgICAgaWYocmVzLmlkID09IHRoaXMuaW5pdERhdGEuaWQpe1xuICAgICAgICAgICAgICAgIHRoaXMuc2FtZU5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSx0aGlzKTtcblxuICAgICAgICBjYy5nYW1lLm9uKE5hbWVUcy5HYW1lX1VubG9ja19QbGFjZSwocmVzKT0+e1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZih0aGlzLmluaXREYXRhLmlkPT1yZXMpe1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSAxO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LHRoaXMpO1xuICAgICAgICBcbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuU2hvd19FbXB0eV9Cb3gsICgpPT57XG4gICAgICAgICAgICBpZih0aGlzLmluaXREYXRhLmlkID09IHV0aWwudXNlckRhdGEuZW1wdHlCb3hObyl7XG4gICAgICAgICAgICAgICAgdGhpcy50dXJyZXRCb3gubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMudHVycmV0Qm94LnBsYXlBbmltYXRpb24oXCJkcm9wYm94XCIsIDApO1xuICAgICAgICAgICAgfSAgICAgICAgICAgIFxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLnR1cnJldEJveC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHN0YXJ0ICgpIHtcblxuICAgIH1cblxuICAgIC8qKuWIneWni+WMliAqL1xuICAgIGluaXQoZGF0YSl7XG4gICAgICAgIHRoaXMuaW5pdERhdGEgPSBkYXRhO1xuICAgICAgICBsZXQgcGxhY2VEYXRhID0gdG9vbC5HZXRBcnJEYXRhKFwibm9cIix0aGlzLmluaXREYXRhLmlkLHV0aWwudXNlckRhdGEucG9vbCk7XG5cdFx0Ly9jb25zb2xlLmxvZyhcIiBwbGFjZURhdGEgOiAgIFwiICsgcGxhY2VEYXRhKVxuICAgICAgICB0aGlzLnN0YXRlID0gcGxhY2VEYXRhLnN0YXRlO1xuICAgICAgICAvLyB0aGlzLnNldFN0YXRlKCk7XG4gICAgfVxuXG4gICAgLyoq54q25oCB5L+u5pS56IOM5pmvICovXG4gICAgc2V0U3RhdGUoKXtcbiAgICAgICAgaWYodGhpcy5iZyl7XG4gICAgICAgICAgICB0aGlzLmJnLnNwcml0ZUZyYW1lID0gdGhpcy5iZ1Nwcml0ZUZyYW1lW3RoaXMuc3RhdGU9PTE/MDoxXTtcbiAgICAgICAgfSAgICAgICAgXG5cbiAgICAgICAgaWYodGhpcy5sb2NrKXtcbiAgICAgICAgICAgIHRoaXMubG9jay5hY3RpdmUgPSB0aGlzLnN0YXRlPT0wO1xuICAgICAgICB9ICAgICAgICBcbiAgICB9XG4gICAgXG4gICAgLyoqXG4gICAgICog54K55Ye7XG4gICAgICovXG4gICAgY2xpY2tCdG4oKXtcbiAgICAgICAgLy8gaWYodGhpcy5zdGF0ZT09MCl7XG4gICAgICAgIC8vICAgICBBc3Npc3RDdHIuc2hvd1RvYXN0VGlwKFwi5Zyw5Z2X5b6F6Kej6ZSBIVwiKTtcbiAgICAgICAgLy8gICAgIHJldHVybjtcbiAgICAgICAgLy8gfVxuICAgICAgICBpZih0aGlzLnR1cnJldEJveC5ub2RlLmFjdGl2ZSl7ICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLnR1cnJldEJveC5wbGF5QW5pbWF0aW9uKFwiZHJvcGJveF9vcGVuXCIsIDEpO1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PnsgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkNsaWNrX0VtcHR5X0JveCwgdGhpcy5pbml0RGF0YS5pZCk7XG4gICAgICAgICAgICB9LCAwLjUpICAgIFxuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+eyAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHV0aWwudXNlckRhdGEuZW1wdHlCb3hObyA9IC0xO1xuICAgICAgICAgICAgICAgIHRoaXMudHVycmV0Qm94Lm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9LCAxKSAgICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=