
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/ui/turretBuy.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '796adA9zfhNt7qa0rj7i0GM', 'turretBuy');
// Script/ui/turretBuy.ts

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
var NameTs_1 = require("../common/NameTs");
var pageTs_1 = require("../common/pageTs");
var soundController_1 = require("../soundController");
var Tools_1 = require("../util/Tools");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var turretBuy = /** @class */ (function (_super) {
    __extends(turretBuy, _super);
    function turretBuy() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.touchNode = null; //用于拖动位置的
        _this.buyBtnNode = null; //购买按钮
        _this.levelLabel = null;
        _this.videoNum = null;
        _this.paoBody = null;
        //接触时间
        _this.touchTime = 0;
        //是否在接触
        _this.isTouch = false;
        _this.level = null;
        _this.turretNum = 0;
        return _this;
    }
    Object.defineProperty(turretBuy.prototype, "_userData", {
        get: function () {
            return util_1.default.userData;
        },
        enumerable: false,
        configurable: true
    });
    turretBuy.prototype.onLoad = function () {
        var _this = this;
        this.setVideoNum();
        var initPos = this.node.getPosition();
        this.node.on(cc.Node.EventType.TOUCH_START, function () {
            _this.touchTime = 0;
            _this.isTouch = true;
            cc.tween(_this.buyBtnNode).to(.1, { scale: 1.1 }).start();
            cc.tween(_this.node).to(.1, { scale: 1.1 }).start();
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            if (_this._userData.noviceGuide == 1 || _this._userData.product == 0)
                return;
            var movePos = event.getDelta();
            _this.node.x += movePos.x;
            _this.node.y += movePos.y;
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            soundController_1.default.singleton.clickAudio();
            if (util_1.default.checkTestB(NameTs_1.default.new_hand_test)) {
                if (_this._userData.noviceGuide == 2) {
                    cc.game.emit(NameTs_1.default.Game_Turret_Creator);
                    cc.game.emit(NameTs_1.default.Game_Novice_Open, 3);
                    return;
                }
            }
            else if (_this._userData.noviceGuide == 1) {
                cc.game.emit(NameTs_1.default.Game_Turret_Creator);
                cc.game.emit(NameTs_1.default.Game_Novice_Open, 2);
                return;
            }
            if (_this._userData.product == 5 && Math.random() < 0.5 && _this._userData.airborneCount > 0) {
                _this.showPage(pageTs_1.default.pageName.GameGetOtherTurret, _this.level);
                return;
            }
            else {
                // console.log("不出现天降炮塔!")
            }
            if (_this._userData.product == 1) {
                _this.setVideoNum();
            }
            if (_this._userData.product == 0 && _this._userData.GetTurretNum > 0) {
                _this.showPage(pageTs_1.default.pageName.GameGetVideoTurret, { num: _this.turretNum });
                return;
            }
            if (_this.touchTime < 0.3) {
                cc.game.emit(NameTs_1.default.Game_Turret_Creator, { level: _this.level });
            }
            else {
                var poolBox = _this.touchNode;
                var pos = _this.node.getParent().convertToWorldSpaceAR(_this.node.getPosition());
                pos = poolBox.convertToNodeSpaceAR(pos);
                util_1.default.checkTouchPool(pos, function (num) {
                    if (num !== 100 && num && util_1.default.checkNoExist(num)) {
                        cc.game.emit(NameTs_1.default.Game_Turret_Creator, { level: _this.level, location: num });
                    }
                });
            }
            soundController_1.default.singleton.clickAudio();
            _this.node.setPosition(initPos);
            cc.tween(_this.buyBtnNode).to(.1, { scale: 1 }).start();
            cc.tween(_this.node).to(.1, { scale: 1 }).start();
        }, this);
        cc.game.on(NameTs_1.default.Game_Buy_update, function () {
            _this.setLevel();
        }, this);
        this.setLevel();
    };
    turretBuy.prototype.start = function () {
    };
    /**
     * 更新炮塔
     */
    turretBuy.prototype.setLevel = function () {
        this.level = util_1.default.getBuyRandomLevel();
        this.levelLabel.string = String(this.level);
        //炮塔属性
        this.turretData = util_1.default.GetTurretData(this.level);
        // this.loadSprite("body",res=>{
        //     this.paoBody.spriteFrame = res;
        // });
        // this.loadSprite("foot",res=>{
        //     this.paoFoot.spriteFrame = res;
        // });
        this.loadSpine(this.paoBody, "pao");
    };
    turretBuy.prototype.update = function (dt) {
        if (this.isTouch) {
            this.touchTime += dt;
        }
    };
    /**
     * 设置视频炮塔数量
     */
    turretBuy.prototype.setVideoNum = function () {
        this.turretNum = Tools_1.Tools.GetRandom(8, 12);
        this.videoNum.string = "+" + this.turretNum;
    };
    /**
     * 加载图片
     */
    turretBuy.prototype.loadSpine = function (spine, name) {
        var _this = this;
        cc.resources.load("spine/turret/" + this.turretData.DynamicResources + "/" + name + "/" + this.turretData.spineName, sp.SkeletonData, function (error, sp) {
            spine.skeletonData = sp;
            _this.paoBody.node.y = Number(_this.turretData.buyY);
        });
    };
    __decorate([
        property(cc.Node)
    ], turretBuy.prototype, "touchNode", void 0);
    __decorate([
        property(cc.Node)
    ], turretBuy.prototype, "buyBtnNode", void 0);
    __decorate([
        property({ displayName: "等级", type: cc.Label })
    ], turretBuy.prototype, "levelLabel", void 0);
    __decorate([
        property({ displayName: "视频炮塔", type: cc.Label })
    ], turretBuy.prototype, "videoNum", void 0);
    __decorate([
        property({ type: sp.Skeleton, displayName: "炮" })
    ], turretBuy.prototype, "paoBody", void 0);
    turretBuy = __decorate([
        ccclass
    ], turretBuy);
    return turretBuy;
}(baseTs_1.default));
exports.default = turretBuy;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFx1aVxcdHVycmV0QnV5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFvQztBQUVwQywyQ0FBc0M7QUFDdEMsMkNBQXNDO0FBR3RDLHNEQUFpRDtBQUVqRCx1Q0FBc0M7QUFDdEMscUNBQWdDO0FBRTFCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXVDLDZCQUFNO0lBQTdDO1FBQUEscUVBc0tDO1FBbktHLGVBQVMsR0FBWSxJQUFJLENBQUMsQ0FBQyxTQUFTO1FBR3BDLGdCQUFVLEdBQVksSUFBSSxDQUFDLENBQUMsTUFBTTtRQUdsQyxnQkFBVSxHQUFhLElBQUksQ0FBQztRQUk1QixjQUFRLEdBQWEsSUFBSSxDQUFDO1FBRzFCLGFBQU8sR0FBZ0IsSUFBSSxDQUFDO1FBRTVCLE1BQU07UUFDRSxlQUFTLEdBQVcsQ0FBQyxDQUFDO1FBQzlCLE9BQU87UUFDQyxhQUFPLEdBQVksS0FBSyxDQUFDO1FBRXpCLFdBQUssR0FBVyxJQUFJLENBQUM7UUFJckIsZUFBUyxHQUFXLENBQUMsQ0FBQzs7SUEySWxDLENBQUM7SUF2SUcsc0JBQVcsZ0NBQVM7YUFBcEI7WUFDSSxPQUFPLGNBQUksQ0FBQyxRQUFRLENBQUM7UUFDekIsQ0FBQzs7O09BQUE7SUFFRCwwQkFBTSxHQUFOO1FBQUEsaUJBMEVDO1FBeEVHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUVuQixJQUFJLE9BQU8sR0FBWSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQy9DLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRTtZQUN4QyxLQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztZQUNuQixLQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUNwQixFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDekQsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3ZELENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUVULElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxVQUFDLEtBQUs7WUFDN0MsSUFBSSxLQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsSUFBSSxDQUFDLElBQUksS0FBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLElBQUksQ0FBQztnQkFBRSxPQUFPO1lBQzNFLElBQUksT0FBTyxHQUFZLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN4QyxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLEtBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFFN0IsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRVQsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLFVBQUMsS0FBSztZQUM1Qyx5QkFBZSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUV2QyxJQUFJLGNBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQU0sQ0FBQyxhQUFhLENBQUMsRUFBRTtnQkFDdkMsSUFBSSxLQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsSUFBSSxDQUFDLEVBQUU7b0JBQ2pDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQztvQkFDekMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQU0sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDekMsT0FBTztpQkFDVjthQUNKO2lCQUFNLElBQUksS0FBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLElBQUksQ0FBQyxFQUFFO2dCQUN4QyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUM7Z0JBQ3pDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFNLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pDLE9BQU87YUFDVjtZQUNELElBQUksS0FBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLElBQUksS0FBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEdBQUcsQ0FBQyxFQUFFO2dCQUN4RixLQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFNLENBQUMsUUFBUSxDQUFDLGtCQUFrQixFQUFFLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDOUQsT0FBTzthQUNWO2lCQUFNO2dCQUNILDBCQUEwQjthQUM3QjtZQUVELElBQUksS0FBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLElBQUksQ0FBQyxFQUFFO2dCQUM3QixLQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDdEI7WUFFRCxJQUFJLEtBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksR0FBRyxDQUFDLEVBQUU7Z0JBQ2hFLEtBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQU0sQ0FBQyxRQUFRLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxHQUFHLEVBQUUsS0FBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7Z0JBQzNFLE9BQU87YUFDVjtZQUNELElBQUksS0FBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLEVBQUU7Z0JBQ3RCLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFNLENBQUMsbUJBQW1CLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7YUFDbkU7aUJBQU07Z0JBQ0gsSUFBSSxPQUFPLEdBQVksS0FBSSxDQUFDLFNBQVMsQ0FBQztnQkFDdEMsSUFBSSxHQUFHLEdBQVksS0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7Z0JBQ3hGLEdBQUcsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3hDLGNBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLFVBQUMsR0FBRztvQkFDekIsSUFBSSxHQUFHLEtBQUssR0FBRyxJQUFJLEdBQUcsSUFBSSxjQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUFFO3dCQUM5QyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBTSxDQUFDLG1CQUFtQixFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7cUJBQ2xGO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2FBRU47WUFDRCx5QkFBZSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUN2QyxLQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMvQixFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDdkQsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRXJELENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUVULEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGdCQUFNLENBQUMsZUFBZSxFQUFFO1lBQy9CLEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNwQixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFVCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVELHlCQUFLLEdBQUw7SUFFQSxDQUFDO0lBR0Q7O09BRUc7SUFDSCw0QkFBUSxHQUFSO1FBRUksSUFBSSxDQUFDLEtBQUssR0FBRyxjQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN0QyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTVDLE1BQU07UUFDTixJQUFJLENBQUMsVUFBVSxHQUFHLGNBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRWpELGdDQUFnQztRQUNoQyxzQ0FBc0M7UUFDdEMsTUFBTTtRQUNOLGdDQUFnQztRQUNoQyxzQ0FBc0M7UUFDdEMsTUFBTTtRQUdOLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUV4QyxDQUFDO0lBRUQsMEJBQU0sR0FBTixVQUFPLEVBQUU7UUFFTCxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZCxJQUFJLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQztTQUN4QjtJQUVMLENBQUM7SUFFRDs7T0FFRztJQUNILCtCQUFXLEdBQVg7UUFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLGFBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ2hELENBQUM7SUFHRDs7T0FFRztJQUNILDZCQUFTLEdBQVQsVUFBVSxLQUFrQixFQUFFLElBQVk7UUFBMUMsaUJBTUM7UUFMRyxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsR0FBRyxHQUFHLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQUMsS0FBSyxFQUFFLEVBQW1CO1lBQzdKLEtBQUssQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1lBQ3hCLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2RCxDQUFDLENBQUMsQ0FBQztJQUVQLENBQUM7SUFsS0Q7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztnREFDUTtJQUcxQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2lEQUNTO0lBRzNCO1FBREMsUUFBUSxDQUFDLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO2lEQUNwQjtJQUk1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQzsrQ0FDeEI7SUFHMUI7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsR0FBRyxFQUFFLENBQUM7OENBQ3RCO0lBaEJYLFNBQVM7UUFEN0IsT0FBTztPQUNhLFNBQVMsQ0FzSzdCO0lBQUQsZ0JBQUM7Q0F0S0QsQUFzS0MsQ0F0S3NDLGdCQUFNLEdBc0s1QztrQkF0S29CLFNBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYmFzZVRzIGZyb20gXCIuLi9iYXNlL2Jhc2VUc1wiO1xuaW1wb3J0IHsgQWRQb3NpdGlvbiB9IGZyb20gXCIuLi9jb21tb24vQWRQb3NpdGlvblwiO1xuaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi4vY29tbW9uL05hbWVUc1wiO1xuaW1wb3J0IHBhZ2VUcyBmcm9tIFwiLi4vY29tbW9uL3BhZ2VUc1wiO1xuaW1wb3J0IFVzZXJEYXRhIGZyb20gXCIuLi9kYXRhL3VzZXJEYXRhXCI7XG5pbXBvcnQgQWRDb250cm9sbGVyIGZyb20gXCIuLi9zZXJ2ZXIveG1zZGtfY29jb3MvQUQvQWRDb250cm9sbGVyXCI7XG5pbXBvcnQgc291bmRDb250cm9sbGVyIGZyb20gXCIuLi9zb3VuZENvbnRyb2xsZXJcIjtcbmltcG9ydCBUcmFja01nciBmcm9tIFwiLi4vVHJhY2tNZ3IvVHJhY2tNZ3JcIjtcbmltcG9ydCB7IFRvb2xzIH0gZnJvbSBcIi4uL3V0aWwvVG9vbHNcIjtcbmltcG9ydCB1dGlsIGZyb20gXCIuLi91dGlsL3V0aWxcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHR1cnJldEJ1eSBleHRlbmRzIGJhc2VUcyB7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICB0b3VjaE5vZGU6IGNjLk5vZGUgPSBudWxsOyAvL+eUqOS6juaLluWKqOS9jee9rueahFxuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgYnV5QnRuTm9kZTogY2MuTm9kZSA9IG51bGw7IC8v6LSt5Lmw5oyJ6ZKuXG5cbiAgICBAcHJvcGVydHkoeyBkaXNwbGF5TmFtZTogXCLnrYnnuqdcIiwgdHlwZTogY2MuTGFiZWwgfSlcbiAgICBsZXZlbExhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG5cblxuICAgIEBwcm9wZXJ0eSh7IGRpc3BsYXlOYW1lOiBcIuinhumikeeCruWhlFwiLCB0eXBlOiBjYy5MYWJlbCB9KVxuICAgIHZpZGVvTnVtOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBzcC5Ta2VsZXRvbiwgZGlzcGxheU5hbWU6IFwi54KuXCIgfSlcbiAgICBwYW9Cb2R5OiBzcC5Ta2VsZXRvbiA9IG51bGw7XG5cbiAgICAvL+aOpeinpuaXtumXtFxuICAgIHByaXZhdGUgdG91Y2hUaW1lOiBudW1iZXIgPSAwO1xuICAgIC8v5piv5ZCm5Zyo5o6l6KemXG4gICAgcHJpdmF0ZSBpc1RvdWNoOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIGxldmVsOiBudW1iZXIgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSB0dXJyZXREYXRhOiBhbnk7XG5cbiAgICBwcml2YXRlIHR1cnJldE51bTogbnVtYmVyID0gMDtcblxuXG5cbiAgICBwdWJsaWMgZ2V0IF91c2VyRGF0YSgpOiBVc2VyRGF0YSB7XG4gICAgICAgIHJldHVybiB1dGlsLnVzZXJEYXRhO1xuICAgIH1cblxuICAgIG9uTG9hZCgpIHtcblxuICAgICAgICB0aGlzLnNldFZpZGVvTnVtKCk7XG5cbiAgICAgICAgbGV0IGluaXRQb3M6IGNjLlZlYzIgPSB0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnRvdWNoVGltZSA9IDA7XG4gICAgICAgICAgICB0aGlzLmlzVG91Y2ggPSB0cnVlO1xuICAgICAgICAgICAgY2MudHdlZW4odGhpcy5idXlCdG5Ob2RlKS50byguMSwgeyBzY2FsZTogMS4xIH0pLnN0YXJ0KCk7XG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLm5vZGUpLnRvKC4xLCB7IHNjYWxlOiAxLjEgfSkuc3RhcnQoKTtcbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3VzZXJEYXRhLm5vdmljZUd1aWRlID09IDEgfHwgdGhpcy5fdXNlckRhdGEucHJvZHVjdCA9PSAwKSByZXR1cm47XG4gICAgICAgICAgICBsZXQgbW92ZVBvczogY2MuVmVjMiA9IGV2ZW50LmdldERlbHRhKCk7XG4gICAgICAgICAgICB0aGlzLm5vZGUueCArPSBtb3ZlUG9zLng7XG4gICAgICAgICAgICB0aGlzLm5vZGUueSArPSBtb3ZlUG9zLnk7XG5cbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcblxuICAgICAgICAgICAgaWYgKHV0aWwuY2hlY2tUZXN0QihOYW1lVHMubmV3X2hhbmRfdGVzdCkpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdXNlckRhdGEubm92aWNlR3VpZGUgPT0gMikge1xuICAgICAgICAgICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfVHVycmV0X0NyZWF0b3IpO1xuICAgICAgICAgICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfTm92aWNlX09wZW4sIDMpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl91c2VyRGF0YS5ub3ZpY2VHdWlkZSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX1R1cnJldF9DcmVhdG9yKTtcbiAgICAgICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfTm92aWNlX09wZW4sIDIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLl91c2VyRGF0YS5wcm9kdWN0ID09IDUgJiYgTWF0aC5yYW5kb20oKSA8IDAuNSAmJiB0aGlzLl91c2VyRGF0YS5haXJib3JuZUNvdW50ID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1BhZ2UocGFnZVRzLnBhZ2VOYW1lLkdhbWVHZXRPdGhlclR1cnJldCwgdGhpcy5sZXZlbCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuS4jeWHuueOsOWkqemZjeeCruWhlCFcIilcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuX3VzZXJEYXRhLnByb2R1Y3QgPT0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0VmlkZW9OdW0oKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuX3VzZXJEYXRhLnByb2R1Y3QgPT0gMCAmJiB0aGlzLl91c2VyRGF0YS5HZXRUdXJyZXROdW0gPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UGFnZShwYWdlVHMucGFnZU5hbWUuR2FtZUdldFZpZGVvVHVycmV0LCB7IG51bTogdGhpcy50dXJyZXROdW0gfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMudG91Y2hUaW1lIDwgMC4zKSB7XG4gICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX1R1cnJldF9DcmVhdG9yLCB7IGxldmVsOiB0aGlzLmxldmVsIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgcG9vbEJveDogY2MuTm9kZSA9IHRoaXMudG91Y2hOb2RlO1xuICAgICAgICAgICAgICAgIGxldCBwb3M6IGNjLlZlYzIgPSB0aGlzLm5vZGUuZ2V0UGFyZW50KCkuY29udmVydFRvV29ybGRTcGFjZUFSKHRoaXMubm9kZS5nZXRQb3NpdGlvbigpKTtcbiAgICAgICAgICAgICAgICBwb3MgPSBwb29sQm94LmNvbnZlcnRUb05vZGVTcGFjZUFSKHBvcyk7XG4gICAgICAgICAgICAgICAgdXRpbC5jaGVja1RvdWNoUG9vbChwb3MsIChudW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG51bSAhPT0gMTAwICYmIG51bSAmJiB1dGlsLmNoZWNrTm9FeGlzdChudW0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfVHVycmV0X0NyZWF0b3IsIHsgbGV2ZWw6IHRoaXMubGV2ZWwsIGxvY2F0aW9uOiBudW0gfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24oaW5pdFBvcyk7XG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLmJ1eUJ0bk5vZGUpLnRvKC4xLCB7IHNjYWxlOiAxIH0pLnN0YXJ0KCk7XG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLm5vZGUpLnRvKC4xLCB7IHNjYWxlOiAxIH0pLnN0YXJ0KCk7XG5cbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9CdXlfdXBkYXRlLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldExldmVsKCk7XG4gICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgIHRoaXMuc2V0TGV2ZWwoKTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICog5pu05paw54Ku5aGUXG4gICAgICovXG4gICAgc2V0TGV2ZWwoKSB7XG5cbiAgICAgICAgdGhpcy5sZXZlbCA9IHV0aWwuZ2V0QnV5UmFuZG9tTGV2ZWwoKTtcbiAgICAgICAgdGhpcy5sZXZlbExhYmVsLnN0cmluZyA9IFN0cmluZyh0aGlzLmxldmVsKTtcblxuICAgICAgICAvL+eCruWhlOWxnuaAp1xuICAgICAgICB0aGlzLnR1cnJldERhdGEgPSB1dGlsLkdldFR1cnJldERhdGEodGhpcy5sZXZlbCk7XG5cbiAgICAgICAgLy8gdGhpcy5sb2FkU3ByaXRlKFwiYm9keVwiLHJlcz0+e1xuICAgICAgICAvLyAgICAgdGhpcy5wYW9Cb2R5LnNwcml0ZUZyYW1lID0gcmVzO1xuICAgICAgICAvLyB9KTtcbiAgICAgICAgLy8gdGhpcy5sb2FkU3ByaXRlKFwiZm9vdFwiLHJlcz0+e1xuICAgICAgICAvLyAgICAgdGhpcy5wYW9Gb290LnNwcml0ZUZyYW1lID0gcmVzO1xuICAgICAgICAvLyB9KTtcblxuXG4gICAgICAgIHRoaXMubG9hZFNwaW5lKHRoaXMucGFvQm9keSwgXCJwYW9cIik7XG5cbiAgICB9XG5cbiAgICB1cGRhdGUoZHQpIHtcblxuICAgICAgICBpZiAodGhpcy5pc1RvdWNoKSB7XG4gICAgICAgICAgICB0aGlzLnRvdWNoVGltZSArPSBkdDtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6K6+572u6KeG6aKR54Ku5aGU5pWw6YePXG4gICAgICovXG4gICAgc2V0VmlkZW9OdW0oKSB7XG4gICAgICAgIHRoaXMudHVycmV0TnVtID0gVG9vbHMuR2V0UmFuZG9tKDgsIDEyKTtcbiAgICAgICAgdGhpcy52aWRlb051bS5zdHJpbmcgPSBcIitcIiArIHRoaXMudHVycmV0TnVtO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICog5Yqg6L295Zu+54mHXG4gICAgICovXG4gICAgbG9hZFNwaW5lKHNwaW5lOiBzcC5Ta2VsZXRvbiwgbmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGNjLnJlc291cmNlcy5sb2FkKFwic3BpbmUvdHVycmV0L1wiICsgdGhpcy50dXJyZXREYXRhLkR5bmFtaWNSZXNvdXJjZXMgKyBcIi9cIiArIG5hbWUgKyBcIi9cIiArIHRoaXMudHVycmV0RGF0YS5zcGluZU5hbWUsIHNwLlNrZWxldG9uRGF0YSwgKGVycm9yLCBzcDogc3AuU2tlbGV0b25EYXRhKSA9PiB7XG4gICAgICAgICAgICBzcGluZS5za2VsZXRvbkRhdGEgPSBzcDtcbiAgICAgICAgICAgIHRoaXMucGFvQm9keS5ub2RlLnkgPSBOdW1iZXIodGhpcy50dXJyZXREYXRhLmJ1eVkpO1xuICAgICAgICB9KTtcblxuICAgIH1cbn1cbiJdfQ==