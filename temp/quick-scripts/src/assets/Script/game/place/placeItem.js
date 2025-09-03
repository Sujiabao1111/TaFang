"use strict";
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