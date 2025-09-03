"use strict";
cc._RF.push(module, '03789rt/k5F0ZbskjGoFs3m', 'effect');
// Script/effect/effect.ts

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
var faceTs_1 = require("../common/faceTs");
var NameTs_1 = require("../common/NameTs");
var pool_1 = require("../common/pool");
var soundController_1 = require("../soundController");
var tool_1 = require("../util/tool");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var effect = /** @class */ (function (_super) {
    __extends(effect, _super);
    function effect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    effect.prototype.onLoad = function () {
        var _this = this;
        this.loadAny("prefab/effect/coin", cc.Prefab, function (res) {
            _this.coinPool = new pool_1.default(res);
        });
        this.loadAny("prefab/effect/num", cc.Prefab, function (res) {
            _this.numPool = new pool_1.default(res);
        });
        this.loadAny("prefab/effect/turret", cc.Prefab, function (res) {
            _this.turretPool = new pool_1.default(res);
        });
        cc.game.on(NameTs_1.default.Game_Effect_coin, function (res) {
            if (!res.noMusic) {
                soundController_1.default.singleton.playMusic(NameTs_1.default.music_goldAdd);
            }
            _this.creatorCoin(res);
        }, this);
        cc.game.on(NameTs_1.default.Game_Effect_turret, function (res) {
            _this.creatorTurret(res);
        }, this);
        cc.game.on(NameTs_1.default.Game_SavingPost_AddCoin, function () {
            if (!util_1.default.savingPotLock)
                return;
            _this.creatorCoin2();
        }, this);
    };
    effect.prototype.start = function () {
    };
    /**
     * 金币特效
     * @param node 节点
     * @param num 多少个
     * @param value 需要增加多少值
     */
    effect.prototype.creatorCoin = function (data) {
        var _this = this;
        if (!this.coinParentPos) {
            var coinNode = util_1.default.GlobalMap.get("coin");
            this.coinParentPos = coinNode.parent.convertToWorldSpaceAR(coinNode.getPosition());
            this.coinParentPos = this.node.convertToNodeSpaceAR(this.coinParentPos);
        }
        if (data && (!data.node || !data.node.parent)) {
            data.node = cc.director.getScene().getChildByName('Canvas');
        }
        var pos = data.node.parent.convertToWorldSpaceAR(data.node.getPosition());
        pos = this.node.convertToNodeSpaceAR(pos);
        var len = data.num || 1;
        // let centerPos:cc.Vec2 = cc.Vec2.clone(pos.add(this.coinParentPos).div(2));
        var delayTime = .05 + (.3 / len);
        var actionTime = .5 + (.2 / len);
        var _loop_1 = function (i) {
            var item = this_1.coinPool.createEnemy(data.parent || this_1.node);
            item.setPosition(pos);
            // let pos1:cc.Vec2 = cc.v2();
            // pos1.x = centerPos.x + Math.cos(Math.PI*tool.GetRandom(0,360)/180)*tool.GetRandom(300,350);
            // pos1.y = centerPos.y + Math.sin(Math.PI*tool.GetRandom(0,360)/180)*tool.GetRandom(50,100);
            item.scale = 0;
            cc.tween(item).delay(i * delayTime).to(.1, { scale: 1 }).
                to(actionTime, { x: this_1.coinParentPos.x, y: this_1.coinParentPos.y })
                // bezierTo(.7,pos,pos1,this.coinParentPos)
                .to(.1, { scale: 1.25 }).call(function () {
                _this.killedCoin(item);
                if (i == len - 1) {
                    util_1.default.addCoin(data.value);
                    _this.createNum(data.value, _this.coinParentPos);
                }
            }).start();
        };
        var this_1 = this;
        for (var i = 0; i < len; i++) {
            _loop_1(i);
        }
    };
    /**
     * 复制一份金币特效
     * @param node 节点
     * @param num 多少个
     */
    effect.prototype.creatorCoin2 = function () {
        var _this = this;
        var data = {
            node: null,
            num: 5,
            parent: null,
        };
        if (!this.coinParentPos2) {
            var coinNode = util_1.default.GlobalMap.get("savingPot");
            this.coinParentPos2 = coinNode.parent.convertToWorldSpaceAR(coinNode.getPosition());
            this.coinParentPos2 = this.node.convertToNodeSpaceAR(this.coinParentPos2);
        }
        if (data && (!data.node || !data.node.parent)) {
            data.node = cc.director.getScene().getChildByName('Canvas');
        }
        var pos = data.node.parent.convertToWorldSpaceAR(data.node.getPosition());
        pos = this.node.convertToNodeSpaceAR(pos);
        var len = data.num || 1;
        var delayTime = .05 + (.3 / len);
        var actionTime = .5 + (.2 / len);
        var _loop_2 = function (i) {
            var item = this_2.coinPool.createEnemy(data.parent || this_2.node);
            item.setPosition(pos);
            item.scale = 0;
            cc.tween(item).delay(i * delayTime).to(.1, { scale: 1 }).
                to(actionTime, { x: this_2.coinParentPos2.x, y: this_2.coinParentPos2.y })
                .to(.1, { scale: 1.25 }).call(function () {
                _this.killedCoin(item);
            }).start();
        };
        var this_2 = this;
        for (var i = 0; i < len; i++) {
            _loop_2(i);
        }
    };
    /**
     *
     * @param res 数据
     */
    effect.prototype.createNum = function (num, pos, parent) {
        var _this = this;
        if (this.numPool) {
            var item_1 = this.numPool.createEnemy(parent || this.node);
            item_1.setPosition(pos.x + 100, pos.y - 60);
            item_1.getComponent(cc.Sprite).enabled = num >= 100;
            item_1.children[1] && (item_1.children[1].getComponent(cc.Label).string = "+" + num);
            item_1.opacity = 0;
            cc.tween(item_1).to(.1, { opacity: 255 }).by(.3, { y: 30 }).to(.1, { opacity: 0 }).call(function () {
                _this.numPool.onEnemyKilled(item_1);
            }).start();
        }
    };
    /**
     *
     * @param res 数据
     */
    effect.prototype.creatorTurret = function (data) {
        var _this = this;
        if (!this.turretParentPos) {
            var turretNode = util_1.default.GlobalMap.get("turretBuy");
            this.turretParentPos = turretNode.parent.convertToWorldSpaceAR(turretNode.getPosition());
            this.turretParentPos = this.node.convertToNodeSpaceAR(this.turretParentPos);
        }
        if (data && (!data.node || !data.node.parent)) {
            data.node = cc.director.getScene().getChildByName('Canvas');
        }
        var pos = data.node.parent.convertToWorldSpaceAR(data.node.getPosition());
        pos = this.node.convertToNodeSpaceAR(pos);
        var len = data.num || 1;
        var centerPos = cc.Vec2.clone(pos.add(this.turretParentPos).div(2));
        var _loop_3 = function (i) {
            var item = this_3.turretPool.createEnemy(data.parent || this_3.node);
            // item.
            item.setPosition(pos);
            var pos1 = cc.v2();
            pos1.x = centerPos.x + Math.cos(Math.PI * tool_1.default.GetRandom(0, 360) / 180) * tool_1.default.GetRandom(300, 350);
            pos1.y = centerPos.y + Math.sin(Math.PI * tool_1.default.GetRandom(0, 360) / 180) * tool_1.default.GetRandom(50, 100);
            item.scale = 0;
            cc.tween(item).delay(i * .1).to(.1, { scale: .4 }).bezierTo(.5, pos, pos1, this_3.turretParentPos).to(.1, { scale: .45 }).call(function () {
                _this.killedCoin(item);
                if (i == len - 1) {
                    cc.game.emit(NameTs_1.default.Game_View_UserDataUpdata, faceTs_1.updateType.product);
                }
            }).start();
        };
        var this_3 = this;
        for (var i = 0; i < len; i++) {
            _loop_3(i);
        }
    };
    /**
     * 删除
     * @param node 节点
     */
    effect.prototype.killedCoin = function (node) {
        this.coinPool.onEnemyKilled(node);
    };
    effect = __decorate([
        ccclass
    ], effect);
    return effect;
}(baseTs_1.default));
exports.default = effect;

cc._RF.pop();