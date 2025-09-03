
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/effect/effect.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxlZmZlY3RcXGVmZmVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBb0M7QUFDcEMsMkNBQXlEO0FBQ3pELDJDQUFzQztBQUN0Qyx1Q0FBa0M7QUFDbEMsc0RBQWlEO0FBQ2pELHFDQUFnQztBQUNoQyxxQ0FBZ0M7QUFFMUIsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBb0MsMEJBQU07SUFBMUM7O0lBb05BLENBQUM7SUFyTUcsdUJBQU0sR0FBTjtRQUFBLGlCQXdDQztRQXRDRyxJQUFJLENBQUMsT0FBTyxDQUFDLG9CQUFvQixFQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUMsVUFBQyxHQUFHO1lBRTVDLEtBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxjQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFbEMsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsT0FBTyxDQUFDLG1CQUFtQixFQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUMsVUFBQyxHQUFHO1lBRTNDLEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxjQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFakMsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsT0FBTyxDQUFDLHNCQUFzQixFQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUMsVUFBQyxHQUFHO1lBRTlDLEtBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxjQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFcEMsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBTSxDQUFDLGdCQUFnQixFQUFDLFVBQUMsR0FBRztZQUNuQyxJQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBQztnQkFDWix5QkFBZSxDQUFDLFNB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QyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUNwRSxDQUFDO1lBQ0wsSUFBSSxJQUFJLEdBQVcsT0FBSyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUUsT0FBSyxJQUFJLENBQUMsQ0FBQztZQUN2RSxRQUFRO1lBQ1IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN0QixJQUFJLElBQUksR0FBVyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBQyxjQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBQyxHQUFHLENBQUMsR0FBQyxHQUFHLENBQUMsR0FBQyxjQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsQ0FBQztZQUMzRixJQUFJLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFDLGNBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxHQUFDLEdBQUcsQ0FBQyxHQUFDLGNBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzFGLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ2YsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUMsRUFBQyxLQUFLLEVBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFDLEdBQUcsRUFBQyxJQUFJLEVBQUMsT0FBSyxlQUFlLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFDLEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUM1RyxLQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN0QixJQUFHLENBQUMsSUFBRSxHQUFHLEdBQUMsQ0FBQyxFQUFDO29CQUNSLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFNLENBQUMsd0JBQXdCLEVBQUMsbUJBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDcEU7WUFDTCxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7O1FBYmYsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxHQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUU7b0JBQWYsQ0FBQztTQWVSO0lBRUwsQ0FBQztJQUdEOzs7T0FHRztJQUNILDJCQUFVLEdBQVYsVUFBVyxJQUFZO1FBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUEvTWdCLE1BQU07UUFEMUIsT0FBTztPQUNhLE1BQU0sQ0FvTjFCO0lBQUQsYUFBQztDQXBORCxBQW9OQyxDQXBObUMsZ0JBQU0sR0FvTnpDO2tCQXBOb0IsTUFBTSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBiYXNlVHMgZnJvbSBcIi4uL2Jhc2UvYmFzZVRzXCI7XG5pbXBvcnQgeyBnYW1lU3RhdGUsIHVwZGF0ZVR5cGUgfSBmcm9tIFwiLi4vY29tbW9uL2ZhY2VUc1wiO1xuaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi4vY29tbW9uL05hbWVUc1wiO1xuaW1wb3J0IHBvb2wgZnJvbSBcIi4uL2NvbW1vbi9wb29sXCI7XG5pbXBvcnQgc291bmRDb250cm9sbGVyIGZyb20gXCIuLi9zb3VuZENvbnRyb2xsZXJcIjtcbmltcG9ydCB0b29sIGZyb20gXCIuLi91dGlsL3Rvb2xcIjtcbmltcG9ydCB1dGlsIGZyb20gXCIuLi91dGlsL3V0aWxcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBlZmZlY3QgZXh0ZW5kcyBiYXNlVHMge1xuXG4gICAgcHJpdmF0ZSBjb2luUG9vbDpwb29sOyAvL+mHkeW4geaxoOWhmFxuICAgIFxuICAgIHByaXZhdGUgbnVtUG9vbDpwb29sOyAvL+aVsOWtl+axoOWhmFxuXG4gICAgcHJpdmF0ZSB0dXJyZXRQb29sOnBvb2w7IC8v54Ku5aGU5rGg5aGYXG5cblxuICAgIHByaXZhdGUgY29pblBhcmVudFBvczpjYy5WZWMyOy8v6aOe5Y675ZOq6YeMXG5cbiAgICBwcml2YXRlIHR1cnJldFBhcmVudFBvczpjYy5WZWMyOy8v6aOe5Y675ZOq6YeMXG4gICAgXG4gICAgcHJpdmF0ZSBjb2luUGFyZW50UG9zMjpjYy5WZWMyOy8v6aOe5Y675ZOq6YeMXG5cbiAgICBvbkxvYWQoKXtcblxuICAgICAgICB0aGlzLmxvYWRBbnkoXCJwcmVmYWIvZWZmZWN0L2NvaW5cIixjYy5QcmVmYWIsKHJlcyk9PntcblxuICAgICAgICAgICAgdGhpcy5jb2luUG9vbCA9IG5ldyBwb29sKHJlcyk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5sb2FkQW55KFwicHJlZmFiL2VmZmVjdC9udW1cIixjYy5QcmVmYWIsKHJlcyk9PntcblxuICAgICAgICAgICAgdGhpcy5udW1Qb29sID0gbmV3IHBvb2wocmVzKTtcblxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmxvYWRBbnkoXCJwcmVmYWIvZWZmZWN0L3R1cnJldFwiLGNjLlByZWZhYiwocmVzKT0+e1xuXG4gICAgICAgICAgICB0aGlzLnR1cnJldFBvb2wgPSBuZXcgcG9vbChyZXMpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNjLmdhbWUub24oTmFtZVRzLkdhbWVfRWZmZWN0X2NvaW4sKHJlcyk9PntcbiAgICAgICAgICAgIGlmKCFyZXMubm9NdXNpYyl7XG4gICAgICAgICAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5wbGF5TXVzaWMoTmFtZVRzLm11c2ljX2dvbGRBZGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jcmVhdG9yQ29pbihyZXMpO1xuICAgICAgICAgICAgXG4gICAgICAgIH0sdGhpcyk7XG5cbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9FZmZlY3RfdHVycmV0LChyZXMpPT57XG5cbiAgICAgICAgICAgIHRoaXMuY3JlYXRvclR1cnJldChyZXMpO1xuXG4gICAgICAgIH0sdGhpcyk7XG5cbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9TYXZpbmdQb3N0X0FkZENvaW4sKCk9PntcbiAgICAgICAgICAgIGlmKCF1dGlsLnNhdmluZ1BvdExvY2spcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy5jcmVhdG9yQ29pbjIoKTtcblxuICAgICAgICB9LHRoaXMpO1xuICAgICAgICBcbiAgICB9XG5cbiAgICBzdGFydCAoKSB7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDph5HluIHnibnmlYhcbiAgICAgKiBAcGFyYW0gbm9kZSDoioLngrlcbiAgICAgKiBAcGFyYW0gbnVtIOWkmuWwkeS4qlxuICAgICAqIEBwYXJhbSB2YWx1ZSDpnIDopoHlop7liqDlpJrlsJHlgLxcbiAgICAgKi9cbiAgICBjcmVhdG9yQ29pbihkYXRhOntub2RlOmNjLk5vZGUsbnVtOm51bWJlcix2YWx1ZTpudW1iZXIscGFyZW50PzpjYy5Ob2RlfSl7XG4gICAgICAgIGlmKCF0aGlzLmNvaW5QYXJlbnRQb3Mpe1xuICAgICAgICAgICAgbGV0IGNvaW5Ob2RlOmNjLk5vZGUgPSB1dGlsLkdsb2JhbE1hcC5nZXQoXCJjb2luXCIpO1xuICAgICAgICAgICAgdGhpcy5jb2luUGFyZW50UG9zID0gY29pbk5vZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjb2luTm9kZS5nZXRQb3NpdGlvbigpKTtcbiAgICAgICAgICAgIHRoaXMuY29pblBhcmVudFBvcyA9IHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0aGlzLmNvaW5QYXJlbnRQb3MpO1xuICAgICAgICB9ICAgICAgICAgICAgICAgICBcbiAgICAgICAgaWYoZGF0YSAmJiAoIWRhdGEubm9kZSB8fCAhZGF0YS5ub2RlLnBhcmVudCkpe1xuICAgICAgICAgICAgZGF0YS5ub2RlID0gY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5nZXRDaGlsZEJ5TmFtZSgnQ2FudmFzJyk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHBvczpjYy5WZWMyID0gZGF0YS5ub2RlLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoZGF0YS5ub2RlLmdldFBvc2l0aW9uKCkpO1xuICAgICAgICBwb3MgPSB0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIocG9zKTtcblxuICAgICAgICBsZXQgbGVuOm51bWJlciA9ICBkYXRhLm51bXx8MTtcbiAgICAgICAgLy8gbGV0IGNlbnRlclBvczpjYy5WZWMyID0gY2MuVmVjMi5jbG9uZShwb3MuYWRkKHRoaXMuY29pblBhcmVudFBvcykuZGl2KDIpKTtcbiAgICAgICAgbGV0IGRlbGF5VGltZTpudW1iZXIgPSAuMDUrKC4zL2xlbik7XG4gICAgICAgIGxldCBhY3Rpb25UaW1lOm51bWJlciA9IC41KyguMi9sZW4pO1xuICAgICAgICBmb3IobGV0IGkgPSAwO2k8bGVuO2krKyl7XG4gICAgICAgICAgICBsZXQgaXRlbTpjYy5Ob2RlID0gdGhpcy5jb2luUG9vbC5jcmVhdGVFbmVteShkYXRhLnBhcmVudHx8dGhpcy5ub2RlKTtcbiAgICAgICAgICAgIGl0ZW0uc2V0UG9zaXRpb24ocG9zKTtcbiAgICAgICAgICAgIC8vIGxldCBwb3MxOmNjLlZlYzIgPSBjYy52MigpO1xuICAgICAgICAgICAgLy8gcG9zMS54ID0gY2VudGVyUG9zLnggKyBNYXRoLmNvcyhNYXRoLlBJKnRvb2wuR2V0UmFuZG9tKDAsMzYwKS8xODApKnRvb2wuR2V0UmFuZG9tKDMwMCwzNTApO1xuICAgICAgICAgICAgLy8gcG9zMS55ID0gY2VudGVyUG9zLnkgKyBNYXRoLnNpbihNYXRoLlBJKnRvb2wuR2V0UmFuZG9tKDAsMzYwKS8xODApKnRvb2wuR2V0UmFuZG9tKDUwLDEwMCk7XG4gICAgICAgICAgICBpdGVtLnNjYWxlID0gMDtcbiAgICAgICAgICAgIGNjLnR3ZWVuKGl0ZW0pLmRlbGF5KGkqZGVsYXlUaW1lKS50byguMSx7c2NhbGU6MX0pLlxuICAgICAgICAgICAgdG8oYWN0aW9uVGltZSx7eDp0aGlzLmNvaW5QYXJlbnRQb3MueCx5OnRoaXMuY29pblBhcmVudFBvcy55fSlcbiAgICAgICAgICAgIC8vIGJlemllclRvKC43LHBvcyxwb3MxLHRoaXMuY29pblBhcmVudFBvcylcbiAgICAgICAgICAgIC50byguMSx7c2NhbGU6MS4yNX0pLmNhbGwoKCk9PntcbiAgICAgICAgICAgICAgICB0aGlzLmtpbGxlZENvaW4oaXRlbSk7XG4gICAgICAgICAgICAgICAgaWYoaT09bGVuLTEpe1xuICAgICAgICAgICAgICAgICAgICB1dGlsLmFkZENvaW4oZGF0YS52YWx1ZSk7ICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVOdW0oZGF0YS52YWx1ZSx0aGlzLmNvaW5QYXJlbnRQb3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLnN0YXJ0KCk7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWkjeWItuS4gOS7vemHkeW4geeJueaViFxuICAgICAqIEBwYXJhbSBub2RlIOiKgueCuVxuICAgICAqIEBwYXJhbSBudW0g5aSa5bCR5LiqXG4gICAgICovXG4gICAgIGNyZWF0b3JDb2luMigpe1xuXG4gICAgICAgIGxldCBkYXRhID0ge1xuICAgICAgICAgICAgbm9kZTpudWxsLFxuICAgICAgICAgICAgbnVtOjUsXG4gICAgICAgICAgICBwYXJlbnQ6bnVsbCxcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCF0aGlzLmNvaW5QYXJlbnRQb3MyKXtcbiAgICAgICAgICAgIGxldCBjb2luTm9kZTpjYy5Ob2RlID0gdXRpbC5HbG9iYWxNYXAuZ2V0KFwic2F2aW5nUG90XCIpO1xuICAgICAgICAgICAgdGhpcy5jb2luUGFyZW50UG9zMiA9IGNvaW5Ob2RlLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY29pbk5vZGUuZ2V0UG9zaXRpb24oKSk7XG4gICAgICAgICAgICB0aGlzLmNvaW5QYXJlbnRQb3MyID0gdGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHRoaXMuY29pblBhcmVudFBvczIpO1xuICAgICAgICB9ICAgICAgIFxuICAgICAgICBpZihkYXRhICYmICghZGF0YS5ub2RlIHx8ICFkYXRhLm5vZGUucGFyZW50KSl7XG4gICAgICAgICAgICBkYXRhLm5vZGUgPSBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpLmdldENoaWxkQnlOYW1lKCdDYW52YXMnKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcG9zOmNjLlZlYzIgPSBkYXRhLm5vZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihkYXRhLm5vZGUuZ2V0UG9zaXRpb24oKSk7XG4gICAgICAgIHBvcyA9IHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihwb3MpO1xuXG4gICAgICAgIGxldCBsZW46bnVtYmVyID0gIGRhdGEubnVtfHwxO1xuICAgICAgICBsZXQgZGVsYXlUaW1lOm51bWJlciA9IC4wNSsoLjMvbGVuKTtcbiAgICAgICAgbGV0IGFjdGlvblRpbWU6bnVtYmVyID0gLjUrKC4yL2xlbik7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7aTxsZW47aSsrKXtcbiAgICAgICAgICAgIGxldCBpdGVtOmNjLk5vZGUgPSB0aGlzLmNvaW5Qb29sLmNyZWF0ZUVuZW15KGRhdGEucGFyZW50fHx0aGlzLm5vZGUpO1xuICAgICAgICAgICAgaXRlbS5zZXRQb3NpdGlvbihwb3MpO1xuICAgICAgICAgICAgaXRlbS5zY2FsZSA9IDA7XG4gICAgICAgICAgICBjYy50d2VlbihpdGVtKS5kZWxheShpKmRlbGF5VGltZSkudG8oLjEse3NjYWxlOjF9KS5cbiAgICAgICAgICAgIHRvKGFjdGlvblRpbWUse3g6dGhpcy5jb2luUGFyZW50UG9zMi54LHk6dGhpcy5jb2luUGFyZW50UG9zMi55fSlcbiAgICAgICAgICAgIC50byguMSx7c2NhbGU6MS4yNX0pLmNhbGwoKCk9PntcbiAgICAgICAgICAgICAgICB0aGlzLmtpbGxlZENvaW4oaXRlbSk7XG4gICAgICAgICAgICB9KS5zdGFydCgpO1xuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSByZXMg5pWw5o2uXG4gICAgICovXG4gICAgY3JlYXRlTnVtKG51bTpudW1iZXIscG9zOmNjLlZlYzIscGFyZW50PzpjYy5Ob2RlKXtcbiAgICAgICAgaWYodGhpcy5udW1Qb29sKXtcbiAgICAgICAgICAgIGxldCBpdGVtOmNjLk5vZGUgPSB0aGlzLm51bVBvb2wuY3JlYXRlRW5lbXkocGFyZW50fHx0aGlzLm5vZGUpO1xuICAgICAgICAgICAgaXRlbS5zZXRQb3NpdGlvbihwb3MueCsxMDAscG9zLnktNjApO1xuICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5lbmFibGVkID0gbnVtPj0xMDA7XG4gICAgICAgICAgICBpdGVtLmNoaWxkcmVuWzFdJiYoaXRlbS5jaGlsZHJlblsxXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiK1wiKyBudW0pO1xuICAgICAgICAgICAgaXRlbS5vcGFjaXR5ID0gMDtcbiAgICAgICAgICAgIGNjLnR3ZWVuKGl0ZW0pLnRvKC4xLHtvcGFjaXR5OjI1NX0pLmJ5KC4zLHt5OjMwfSkudG8oLjEse29wYWNpdHk6MH0pLmNhbGwoKCk9PntcbiAgICAgICAgICAgICAgICB0aGlzLm51bVBvb2wub25FbmVteUtpbGxlZChpdGVtKTtcbiAgICAgICAgICAgIH0pLnN0YXJ0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gcmVzIOaVsOaNrlxuICAgICAqL1xuICAgIGNyZWF0b3JUdXJyZXQoZGF0YTp7bm9kZTpjYy5Ob2RlLG51bTpudW1iZXIscGFyZW50PzpjYy5Ob2RlfSl7XG4gICAgICAgIGlmKCF0aGlzLnR1cnJldFBhcmVudFBvcyl7XG4gICAgICAgICAgICBsZXQgdHVycmV0Tm9kZTpjYy5Ob2RlID0gdXRpbC5HbG9iYWxNYXAuZ2V0KFwidHVycmV0QnV5XCIpO1xuICAgICAgICAgICAgdGhpcy50dXJyZXRQYXJlbnRQb3MgPSB0dXJyZXROb2RlLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIodHVycmV0Tm9kZS5nZXRQb3NpdGlvbigpKTtcbiAgICAgICAgICAgIHRoaXMudHVycmV0UGFyZW50UG9zID0gdGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHRoaXMudHVycmV0UGFyZW50UG9zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGRhdGEgJiYgKCFkYXRhLm5vZGUgfHwgIWRhdGEubm9kZS5wYXJlbnQpKXtcbiAgICAgICAgICAgIGRhdGEubm9kZSA9IGNjLmRpcmVjdG9yLmdldFNjZW5lKCkuZ2V0Q2hpbGRCeU5hbWUoJ0NhbnZhcycpO1xuICAgICAgICB9IFxuXG4gICAgICAgIGxldCBwb3M6Y2MuVmVjMiA9IGRhdGEubm9kZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKGRhdGEubm9kZS5nZXRQb3NpdGlvbigpKTtcbiAgICAgICAgcG9zID0gdGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHBvcyk7XG4gICAgICAgIGxldCBsZW46bnVtYmVyID0gIGRhdGEubnVtfHwxO1xuICAgICAgICBsZXQgY2VudGVyUG9zOmNjLlZlYzIgPSBjYy5WZWMyLmNsb25lKHBvcy5hZGQodGhpcy50dXJyZXRQYXJlbnRQb3MpLmRpdigyKSk7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7aTxsZW47aSsrKXtcbiAgICAgICAgICAgIGxldCBpdGVtOmNjLk5vZGUgPSB0aGlzLnR1cnJldFBvb2wuY3JlYXRlRW5lbXkoZGF0YS5wYXJlbnR8fHRoaXMubm9kZSk7XG4gICAgICAgICAgICAvLyBpdGVtLlxuICAgICAgICAgICAgaXRlbS5zZXRQb3NpdGlvbihwb3MpO1xuICAgICAgICAgICAgbGV0IHBvczE6Y2MuVmVjMiA9IGNjLnYyKCk7XG4gICAgICAgICAgICBwb3MxLnggPSBjZW50ZXJQb3MueCArIE1hdGguY29zKE1hdGguUEkqdG9vbC5HZXRSYW5kb20oMCwzNjApLzE4MCkqdG9vbC5HZXRSYW5kb20oMzAwLDM1MCk7XG4gICAgICAgICAgICBwb3MxLnkgPSBjZW50ZXJQb3MueSArIE1hdGguc2luKE1hdGguUEkqdG9vbC5HZXRSYW5kb20oMCwzNjApLzE4MCkqdG9vbC5HZXRSYW5kb20oNTAsMTAwKTtcbiAgICAgICAgICAgIGl0ZW0uc2NhbGUgPSAwO1xuICAgICAgICAgICAgY2MudHdlZW4oaXRlbSkuZGVsYXkoaSouMSkudG8oLjEse3NjYWxlOi40fSkuYmV6aWVyVG8oLjUscG9zLHBvczEsdGhpcy50dXJyZXRQYXJlbnRQb3MpLnRvKC4xLHtzY2FsZTouNDV9KS5jYWxsKCgpPT57XG4gICAgICAgICAgICAgICAgdGhpcy5raWxsZWRDb2luKGl0ZW0pO1xuICAgICAgICAgICAgICAgIGlmKGk9PWxlbi0xKXtcbiAgICAgICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX1ZpZXdfVXNlckRhdGFVcGRhdGEsdXBkYXRlVHlwZS5wcm9kdWN0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5zdGFydCgpO1xuICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgIH1cbiAgICBcblxuICAgIC8qKlxuICAgICAqIOWIoOmZpFxuICAgICAqIEBwYXJhbSBub2RlIOiKgueCuVxuICAgICAqL1xuICAgIGtpbGxlZENvaW4obm9kZTpjYy5Ob2RlKXtcbiAgICAgICAgdGhpcy5jb2luUG9vbC5vbkVuZW15S2lsbGVkKG5vZGUpO1xuICAgIH1cblxuICAgIFxuXG5cbn1cbiJdfQ==