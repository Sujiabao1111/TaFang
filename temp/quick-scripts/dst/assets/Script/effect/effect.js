
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
var baseTs_1 = require("../base/baseTs");
var faceTs_1 = require("../common/faceTs");
var NameTs_1 = require("../common/NameTs");
var pool_1 = require("../common/pool");
var soundController_1 = require("../soundController");
var Tools_1 = require("../util/Tools");
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
            // pos1.x = centerPos.x + Math.cos(Math.PI*Tools.GetRandom(0,360)/180)*Tools.GetRandom(300,350);
            // pos1.y = centerPos.y + Math.sin(Math.PI*Tools.GetRandom(0,360)/180)*Tools.GetRandom(50,100);
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
            pos1.x = centerPos.x + Math.cos(Math.PI * Tools_1.Tools.GetRandom(0, 360) / 180) * Tools_1.Tools.GetRandom(300, 350);
            pos1.y = centerPos.y + Math.sin(Math.PI * Tools_1.Tools.GetRandom(0, 360) / 180) * Tools_1.Tools.GetRandom(50, 100);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxlZmZlY3RcXGVmZmVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBb0M7QUFDcEMsMkNBQXlEO0FBQ3pELDJDQUFzQztBQUN0Qyx1Q0FBa0M7QUFDbEMsc0RBQWlEO0FBQ2pELHVDQUFzQztBQUN0QyxxQ0FBZ0M7QUFFMUIsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBb0MsMEJBQU07SUFBMUM7O0lBbU5BLENBQUM7SUFwTUcsdUJBQU0sR0FBTjtRQUFBLGlCQXVDQztRQXJDRyxJQUFJLENBQUMsT0FBTyxDQUFDLG9CQUFvQixFQUFFLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBQyxHQUFHO1lBRTlDLEtBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxjQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFbEMsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsT0FBTyxDQUFDLG1CQUFtQixFQUFFLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBQyxHQUFHO1lBRTdDLEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxjQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFakMsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsT0FBTyxDQUFDLHNCQUFzQixFQUFFLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBQyxHQUFHO1lBRWhELEtBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxjQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFcEMsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBTSxDQUFDLGdCQUFnQixFQUFFLFVBQUMsR0FBRztZQUNwQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRTtnQkFDZCx5QkFBZSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsZ0JBQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUM3RDtZQUNELEtBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRVQsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsZ0JBQU0sQ0FBQyxrQkFBa0IsRUFBRSxVQUFDLEdBQUc7WUFFdEMsS0FBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUU1QixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFVCxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBTSxDQUFDLHVCQUF1QixFQUFFO1lBQ3ZDLElBQUksQ0FBQyxjQUFJLENBQUMsYUFBYTtnQkFBRSxPQUFPO1lBQ2hDLEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUV4QixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFFYixDQUFDO0lBRUQsc0JBQUssR0FBTDtJQUVBLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILDRCQUFXLEdBQVgsVUFBWSxJQUFxRTtRQUFqRixpQkFtQ0M7UUFsQ0csSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDckIsSUFBSSxRQUFRLEdBQVksY0FBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkQsSUFBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1lBQ25GLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDM0U7UUFDRCxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDM0MsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUMvRDtRQUNELElBQUksR0FBRyxHQUFZLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUNuRixHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUUxQyxJQUFJLEdBQUcsR0FBVyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUNoQyw2RUFBNkU7UUFDN0UsSUFBSSxTQUFTLEdBQVcsR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ3pDLElBQUksVUFBVSxHQUFXLEVBQUUsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQztnQ0FDaEMsQ0FBQztZQUNOLElBQUksSUFBSSxHQUFZLE9BQUssUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLE9BQUssSUFBSSxDQUFDLENBQUM7WUFDeEUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN0Qiw4QkFBOEI7WUFDOUIsZ0dBQWdHO1lBQ2hHLCtGQUErRjtZQUMvRixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztZQUNmLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDO2dCQUNwRCxFQUFFLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQUssYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBSyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQ3BFLDJDQUEyQztpQkFDMUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDMUIsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdEIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsRUFBRTtvQkFDZCxjQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDekIsS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztpQkFDbEQ7WUFDTCxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7O1FBaEJuQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRTtvQkFBbkIsQ0FBQztTQWtCVDtJQUNMLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsNkJBQVksR0FBWjtRQUFBLGlCQWlDQztRQS9CRyxJQUFJLElBQUksR0FBRztZQUNQLElBQUksRUFBRSxJQUFJO1lBQ1YsR0FBRyxFQUFFLENBQUM7WUFDTixNQUFNLEVBQUUsSUFBSTtTQUNmLENBQUE7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUN0QixJQUFJLFFBQVEsR0FBWSxjQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN4RCxJQUFJLENBQUMsY0FBYyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7WUFDcEYsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztTQUM3RTtRQUNELElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUMzQyxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQy9EO1FBQ0QsSUFBSSxHQUFHLEdBQVksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQ25GLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTFDLElBQUksR0FBRyxHQUFXLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ2hDLElBQUksU0FBUyxHQUFXLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUN6QyxJQUFJLFVBQVUsR0FBVyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUM7Z0NBQ2hDLENBQUM7WUFDTixJQUFJLElBQUksR0FBWSxPQUFLLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxPQUFLLElBQUksQ0FBQyxDQUFDO1lBQ3hFLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDZixFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQztnQkFDcEQsRUFBRSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFLLGNBQWMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE9BQUssY0FBYyxDQUFDLENBQUMsRUFBRSxDQUFDO2lCQUNyRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUMxQixLQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzFCLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDOzs7UUFSbkIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUU7b0JBQW5CLENBQUM7U0FVVDtJQUNMLENBQUM7SUFHRDs7O09BR0c7SUFDSCwwQkFBUyxHQUFULFVBQVUsR0FBVyxFQUFFLEdBQVksRUFBRSxNQUFnQjtRQUFyRCxpQkFXQztRQVZHLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNkLElBQUksTUFBSSxHQUFZLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEUsTUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQzFDLE1BQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDO1lBQ2xELE1BQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUNqRixNQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztZQUNqQixFQUFFLENBQUMsS0FBSyxDQUFDLE1BQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDbEYsS0FBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsTUFBSSxDQUFDLENBQUM7WUFDckMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDZDtJQUNMLENBQUM7SUFFRDs7O09BR0c7SUFDSCw4QkFBYSxHQUFiLFVBQWMsSUFBc0Q7UUFBcEUsaUJBZ0NDO1FBL0JHLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3ZCLElBQUksVUFBVSxHQUFZLGNBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzFELElBQUksQ0FBQyxlQUFlLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztZQUN6RixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1NBQy9FO1FBRUQsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQzNDLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDL0Q7UUFFRCxJQUFJLEdBQUcsR0FBWSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDbkYsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUMsSUFBSSxHQUFHLEdBQVcsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDaEMsSUFBSSxTQUFTLEdBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQ3BFLENBQUM7WUFDTixJQUFJLElBQUksR0FBWSxPQUFLLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxPQUFLLElBQUksQ0FBQyxDQUFDO1lBQzFFLFFBQVE7WUFDUixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3RCLElBQUksSUFBSSxHQUFZLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLGFBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLGFBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3JHLElBQUksQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsYUFBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsYUFBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDcEcsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDZixFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxPQUFLLGVBQWUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ3pILEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUU7b0JBQ2QsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQU0sQ0FBQyx3QkFBd0IsRUFBRSxtQkFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUNyRTtZQUNMLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDOzs7UUFiZixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRTtvQkFBbkIsQ0FBQztTQWVUO0lBRUwsQ0FBQztJQUdEOzs7T0FHRztJQUNILDJCQUFVLEdBQVYsVUFBVyxJQUFhO1FBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUE5TWdCLE1BQU07UUFEMUIsT0FBTztPQUNhLE1BQU0sQ0FtTjFCO0lBQUQsYUFBQztDQW5ORCxBQW1OQyxDQW5ObUMsZ0JBQU0sR0FtTnpDO2tCQW5Ob0IsTUFBTSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBiYXNlVHMgZnJvbSBcIi4uL2Jhc2UvYmFzZVRzXCI7XG5pbXBvcnQgeyBnYW1lU3RhdGUsIHVwZGF0ZVR5cGUgfSBmcm9tIFwiLi4vY29tbW9uL2ZhY2VUc1wiO1xuaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi4vY29tbW9uL05hbWVUc1wiO1xuaW1wb3J0IHBvb2wgZnJvbSBcIi4uL2NvbW1vbi9wb29sXCI7XG5pbXBvcnQgc291bmRDb250cm9sbGVyIGZyb20gXCIuLi9zb3VuZENvbnRyb2xsZXJcIjtcbmltcG9ydCB7IFRvb2xzIH0gZnJvbSBcIi4uL3V0aWwvVG9vbHNcIjtcbmltcG9ydCB1dGlsIGZyb20gXCIuLi91dGlsL3V0aWxcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGVmZmVjdCBleHRlbmRzIGJhc2VUcyB7XG5cbiAgICBwcml2YXRlIGNvaW5Qb29sOiBwb29sOyAvL+mHkeW4geaxoOWhmFxuXG4gICAgcHJpdmF0ZSBudW1Qb29sOiBwb29sOyAvL+aVsOWtl+axoOWhmFxuXG4gICAgcHJpdmF0ZSB0dXJyZXRQb29sOiBwb29sOyAvL+eCruWhlOaxoOWhmFxuXG5cbiAgICBwcml2YXRlIGNvaW5QYXJlbnRQb3M6IGNjLlZlYzI7Ly/po57ljrvlk6rph4xcblxuICAgIHByaXZhdGUgdHVycmV0UGFyZW50UG9zOiBjYy5WZWMyOy8v6aOe5Y675ZOq6YeMXG5cbiAgICBwcml2YXRlIGNvaW5QYXJlbnRQb3MyOiBjYy5WZWMyOy8v6aOe5Y675ZOq6YeMXG5cbiAgICBvbkxvYWQoKSB7XG5cbiAgICAgICAgdGhpcy5sb2FkQW55KFwicHJlZmFiL2VmZmVjdC9jb2luXCIsIGNjLlByZWZhYiwgKHJlcykgPT4ge1xuXG4gICAgICAgICAgICB0aGlzLmNvaW5Qb29sID0gbmV3IHBvb2wocmVzKTtcblxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmxvYWRBbnkoXCJwcmVmYWIvZWZmZWN0L251bVwiLCBjYy5QcmVmYWIsIChyZXMpID0+IHtcblxuICAgICAgICAgICAgdGhpcy5udW1Qb29sID0gbmV3IHBvb2wocmVzKTtcblxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmxvYWRBbnkoXCJwcmVmYWIvZWZmZWN0L3R1cnJldFwiLCBjYy5QcmVmYWIsIChyZXMpID0+IHtcblxuICAgICAgICAgICAgdGhpcy50dXJyZXRQb29sID0gbmV3IHBvb2wocmVzKTtcblxuICAgICAgICB9KTtcblxuICAgICAgICBjYy5nYW1lLm9uKE5hbWVUcy5HYW1lX0VmZmVjdF9jb2luLCAocmVzKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXJlcy5ub011c2ljKSB7XG4gICAgICAgICAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5wbGF5TXVzaWMoTmFtZVRzLm11c2ljX2dvbGRBZGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jcmVhdG9yQ29pbihyZXMpO1xuICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICBjYy5nYW1lLm9uKE5hbWVUcy5HYW1lX0VmZmVjdF90dXJyZXQsIChyZXMpID0+IHtcblxuICAgICAgICAgICAgdGhpcy5jcmVhdG9yVHVycmV0KHJlcyk7XG5cbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9TYXZpbmdQb3N0X0FkZENvaW4sICgpID0+IHtcbiAgICAgICAgICAgIGlmICghdXRpbC5zYXZpbmdQb3RMb2NrKSByZXR1cm47XG4gICAgICAgICAgICB0aGlzLmNyZWF0b3JDb2luMigpO1xuXG4gICAgICAgIH0sIHRoaXMpO1xuXG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDph5HluIHnibnmlYhcbiAgICAgKiBAcGFyYW0gbm9kZSDoioLngrlcbiAgICAgKiBAcGFyYW0gbnVtIOWkmuWwkeS4qlxuICAgICAqIEBwYXJhbSB2YWx1ZSDpnIDopoHlop7liqDlpJrlsJHlgLxcbiAgICAgKi9cbiAgICBjcmVhdG9yQ29pbihkYXRhOiB7IG5vZGU6IGNjLk5vZGUsIG51bTogbnVtYmVyLCB2YWx1ZTogbnVtYmVyLCBwYXJlbnQ/OiBjYy5Ob2RlIH0pIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvaW5QYXJlbnRQb3MpIHtcbiAgICAgICAgICAgIGxldCBjb2luTm9kZTogY2MuTm9kZSA9IHV0aWwuR2xvYmFsTWFwLmdldChcImNvaW5cIik7XG4gICAgICAgICAgICB0aGlzLmNvaW5QYXJlbnRQb3MgPSBjb2luTm9kZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKGNvaW5Ob2RlLmdldFBvc2l0aW9uKCkpO1xuICAgICAgICAgICAgdGhpcy5jb2luUGFyZW50UG9zID0gdGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHRoaXMuY29pblBhcmVudFBvcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEgJiYgKCFkYXRhLm5vZGUgfHwgIWRhdGEubm9kZS5wYXJlbnQpKSB7XG4gICAgICAgICAgICBkYXRhLm5vZGUgPSBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpLmdldENoaWxkQnlOYW1lKCdDYW52YXMnKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcG9zOiBjYy5WZWMyID0gZGF0YS5ub2RlLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoZGF0YS5ub2RlLmdldFBvc2l0aW9uKCkpO1xuICAgICAgICBwb3MgPSB0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIocG9zKTtcblxuICAgICAgICBsZXQgbGVuOiBudW1iZXIgPSBkYXRhLm51bSB8fCAxO1xuICAgICAgICAvLyBsZXQgY2VudGVyUG9zOmNjLlZlYzIgPSBjYy5WZWMyLmNsb25lKHBvcy5hZGQodGhpcy5jb2luUGFyZW50UG9zKS5kaXYoMikpO1xuICAgICAgICBsZXQgZGVsYXlUaW1lOiBudW1iZXIgPSAuMDUgKyAoLjMgLyBsZW4pO1xuICAgICAgICBsZXQgYWN0aW9uVGltZTogbnVtYmVyID0gLjUgKyAoLjIgLyBsZW4pO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgaXRlbTogY2MuTm9kZSA9IHRoaXMuY29pblBvb2wuY3JlYXRlRW5lbXkoZGF0YS5wYXJlbnQgfHwgdGhpcy5ub2RlKTtcbiAgICAgICAgICAgIGl0ZW0uc2V0UG9zaXRpb24ocG9zKTtcbiAgICAgICAgICAgIC8vIGxldCBwb3MxOmNjLlZlYzIgPSBjYy52MigpO1xuICAgICAgICAgICAgLy8gcG9zMS54ID0gY2VudGVyUG9zLnggKyBNYXRoLmNvcyhNYXRoLlBJKlRvb2xzLkdldFJhbmRvbSgwLDM2MCkvMTgwKSpUb29scy5HZXRSYW5kb20oMzAwLDM1MCk7XG4gICAgICAgICAgICAvLyBwb3MxLnkgPSBjZW50ZXJQb3MueSArIE1hdGguc2luKE1hdGguUEkqVG9vbHMuR2V0UmFuZG9tKDAsMzYwKS8xODApKlRvb2xzLkdldFJhbmRvbSg1MCwxMDApO1xuICAgICAgICAgICAgaXRlbS5zY2FsZSA9IDA7XG4gICAgICAgICAgICBjYy50d2VlbihpdGVtKS5kZWxheShpICogZGVsYXlUaW1lKS50byguMSwgeyBzY2FsZTogMSB9KS5cbiAgICAgICAgICAgICAgICB0byhhY3Rpb25UaW1lLCB7IHg6IHRoaXMuY29pblBhcmVudFBvcy54LCB5OiB0aGlzLmNvaW5QYXJlbnRQb3MueSB9KVxuICAgICAgICAgICAgICAgIC8vIGJlemllclRvKC43LHBvcyxwb3MxLHRoaXMuY29pblBhcmVudFBvcylcbiAgICAgICAgICAgICAgICAudG8oLjEsIHsgc2NhbGU6IDEuMjUgfSkuY2FsbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMua2lsbGVkQ29pbihpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT0gbGVuIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbC5hZGRDb2luKGRhdGEudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVOdW0oZGF0YS52YWx1ZSwgdGhpcy5jb2luUGFyZW50UG9zKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLnN0YXJ0KCk7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWkjeWItuS4gOS7vemHkeW4geeJueaViFxuICAgICAqIEBwYXJhbSBub2RlIOiKgueCuVxuICAgICAqIEBwYXJhbSBudW0g5aSa5bCR5LiqXG4gICAgICovXG4gICAgY3JlYXRvckNvaW4yKCkge1xuXG4gICAgICAgIGxldCBkYXRhID0ge1xuICAgICAgICAgICAgbm9kZTogbnVsbCxcbiAgICAgICAgICAgIG51bTogNSxcbiAgICAgICAgICAgIHBhcmVudDogbnVsbCxcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5jb2luUGFyZW50UG9zMikge1xuICAgICAgICAgICAgbGV0IGNvaW5Ob2RlOiBjYy5Ob2RlID0gdXRpbC5HbG9iYWxNYXAuZ2V0KFwic2F2aW5nUG90XCIpO1xuICAgICAgICAgICAgdGhpcy5jb2luUGFyZW50UG9zMiA9IGNvaW5Ob2RlLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY29pbk5vZGUuZ2V0UG9zaXRpb24oKSk7XG4gICAgICAgICAgICB0aGlzLmNvaW5QYXJlbnRQb3MyID0gdGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHRoaXMuY29pblBhcmVudFBvczIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhICYmICghZGF0YS5ub2RlIHx8ICFkYXRhLm5vZGUucGFyZW50KSkge1xuICAgICAgICAgICAgZGF0YS5ub2RlID0gY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5nZXRDaGlsZEJ5TmFtZSgnQ2FudmFzJyk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHBvczogY2MuVmVjMiA9IGRhdGEubm9kZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKGRhdGEubm9kZS5nZXRQb3NpdGlvbigpKTtcbiAgICAgICAgcG9zID0gdGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHBvcyk7XG5cbiAgICAgICAgbGV0IGxlbjogbnVtYmVyID0gZGF0YS5udW0gfHwgMTtcbiAgICAgICAgbGV0IGRlbGF5VGltZTogbnVtYmVyID0gLjA1ICsgKC4zIC8gbGVuKTtcbiAgICAgICAgbGV0IGFjdGlvblRpbWU6IG51bWJlciA9IC41ICsgKC4yIC8gbGVuKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgbGV0IGl0ZW06IGNjLk5vZGUgPSB0aGlzLmNvaW5Qb29sLmNyZWF0ZUVuZW15KGRhdGEucGFyZW50IHx8IHRoaXMubm9kZSk7XG4gICAgICAgICAgICBpdGVtLnNldFBvc2l0aW9uKHBvcyk7XG4gICAgICAgICAgICBpdGVtLnNjYWxlID0gMDtcbiAgICAgICAgICAgIGNjLnR3ZWVuKGl0ZW0pLmRlbGF5KGkgKiBkZWxheVRpbWUpLnRvKC4xLCB7IHNjYWxlOiAxIH0pLlxuICAgICAgICAgICAgICAgIHRvKGFjdGlvblRpbWUsIHsgeDogdGhpcy5jb2luUGFyZW50UG9zMi54LCB5OiB0aGlzLmNvaW5QYXJlbnRQb3MyLnkgfSlcbiAgICAgICAgICAgICAgICAudG8oLjEsIHsgc2NhbGU6IDEuMjUgfSkuY2FsbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMua2lsbGVkQ29pbihpdGVtKTtcbiAgICAgICAgICAgICAgICB9KS5zdGFydCgpO1xuXG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSByZXMg5pWw5o2uXG4gICAgICovXG4gICAgY3JlYXRlTnVtKG51bTogbnVtYmVyLCBwb3M6IGNjLlZlYzIsIHBhcmVudD86IGNjLk5vZGUpIHtcbiAgICAgICAgaWYgKHRoaXMubnVtUG9vbCkge1xuICAgICAgICAgICAgbGV0IGl0ZW06IGNjLk5vZGUgPSB0aGlzLm51bVBvb2wuY3JlYXRlRW5lbXkocGFyZW50IHx8IHRoaXMubm9kZSk7XG4gICAgICAgICAgICBpdGVtLnNldFBvc2l0aW9uKHBvcy54ICsgMTAwLCBwb3MueSAtIDYwKTtcbiAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuZW5hYmxlZCA9IG51bSA+PSAxMDA7XG4gICAgICAgICAgICBpdGVtLmNoaWxkcmVuWzFdICYmIChpdGVtLmNoaWxkcmVuWzFdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCIrXCIgKyBudW0pO1xuICAgICAgICAgICAgaXRlbS5vcGFjaXR5ID0gMDtcbiAgICAgICAgICAgIGNjLnR3ZWVuKGl0ZW0pLnRvKC4xLCB7IG9wYWNpdHk6IDI1NSB9KS5ieSguMywgeyB5OiAzMCB9KS50byguMSwgeyBvcGFjaXR5OiAwIH0pLmNhbGwoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubnVtUG9vbC5vbkVuZW15S2lsbGVkKGl0ZW0pO1xuICAgICAgICAgICAgfSkuc3RhcnQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSByZXMg5pWw5o2uXG4gICAgICovXG4gICAgY3JlYXRvclR1cnJldChkYXRhOiB7IG5vZGU6IGNjLk5vZGUsIG51bTogbnVtYmVyLCBwYXJlbnQ/OiBjYy5Ob2RlIH0pIHtcbiAgICAgICAgaWYgKCF0aGlzLnR1cnJldFBhcmVudFBvcykge1xuICAgICAgICAgICAgbGV0IHR1cnJldE5vZGU6IGNjLk5vZGUgPSB1dGlsLkdsb2JhbE1hcC5nZXQoXCJ0dXJyZXRCdXlcIik7XG4gICAgICAgICAgICB0aGlzLnR1cnJldFBhcmVudFBvcyA9IHR1cnJldE5vZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUih0dXJyZXROb2RlLmdldFBvc2l0aW9uKCkpO1xuICAgICAgICAgICAgdGhpcy50dXJyZXRQYXJlbnRQb3MgPSB0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIodGhpcy50dXJyZXRQYXJlbnRQb3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRhdGEgJiYgKCFkYXRhLm5vZGUgfHwgIWRhdGEubm9kZS5wYXJlbnQpKSB7XG4gICAgICAgICAgICBkYXRhLm5vZGUgPSBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpLmdldENoaWxkQnlOYW1lKCdDYW52YXMnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwb3M6IGNjLlZlYzIgPSBkYXRhLm5vZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihkYXRhLm5vZGUuZ2V0UG9zaXRpb24oKSk7XG4gICAgICAgIHBvcyA9IHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihwb3MpO1xuICAgICAgICBsZXQgbGVuOiBudW1iZXIgPSBkYXRhLm51bSB8fCAxO1xuICAgICAgICBsZXQgY2VudGVyUG9zOiBjYy5WZWMyID0gY2MuVmVjMi5jbG9uZShwb3MuYWRkKHRoaXMudHVycmV0UGFyZW50UG9zKS5kaXYoMikpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgaXRlbTogY2MuTm9kZSA9IHRoaXMudHVycmV0UG9vbC5jcmVhdGVFbmVteShkYXRhLnBhcmVudCB8fCB0aGlzLm5vZGUpO1xuICAgICAgICAgICAgLy8gaXRlbS5cbiAgICAgICAgICAgIGl0ZW0uc2V0UG9zaXRpb24ocG9zKTtcbiAgICAgICAgICAgIGxldCBwb3MxOiBjYy5WZWMyID0gY2MudjIoKTtcbiAgICAgICAgICAgIHBvczEueCA9IGNlbnRlclBvcy54ICsgTWF0aC5jb3MoTWF0aC5QSSAqIFRvb2xzLkdldFJhbmRvbSgwLCAzNjApIC8gMTgwKSAqIFRvb2xzLkdldFJhbmRvbSgzMDAsIDM1MCk7XG4gICAgICAgICAgICBwb3MxLnkgPSBjZW50ZXJQb3MueSArIE1hdGguc2luKE1hdGguUEkgKiBUb29scy5HZXRSYW5kb20oMCwgMzYwKSAvIDE4MCkgKiBUb29scy5HZXRSYW5kb20oNTAsIDEwMCk7XG4gICAgICAgICAgICBpdGVtLnNjYWxlID0gMDtcbiAgICAgICAgICAgIGNjLnR3ZWVuKGl0ZW0pLmRlbGF5KGkgKiAuMSkudG8oLjEsIHsgc2NhbGU6IC40IH0pLmJlemllclRvKC41LCBwb3MsIHBvczEsIHRoaXMudHVycmV0UGFyZW50UG9zKS50byguMSwgeyBzY2FsZTogLjQ1IH0pLmNhbGwoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMua2lsbGVkQ29pbihpdGVtKTtcbiAgICAgICAgICAgICAgICBpZiAoaSA9PSBsZW4gLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9WaWV3X1VzZXJEYXRhVXBkYXRhLCB1cGRhdGVUeXBlLnByb2R1Y3QpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLnN0YXJ0KCk7XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiDliKDpmaRcbiAgICAgKiBAcGFyYW0gbm9kZSDoioLngrlcbiAgICAgKi9cbiAgICBraWxsZWRDb2luKG5vZGU6IGNjLk5vZGUpIHtcbiAgICAgICAgdGhpcy5jb2luUG9vbC5vbkVuZW15S2lsbGVkKG5vZGUpO1xuICAgIH1cblxuXG5cblxufVxuIl19