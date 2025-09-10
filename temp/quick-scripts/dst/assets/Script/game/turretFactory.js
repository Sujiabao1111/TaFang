
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/game/turretFactory.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4bc01mgmWNBz6E9IVW9NNyu', 'turretFactory');
// Script/game/turretFactory.ts

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
var faceTs_1 = require("../common/faceTs");
var NameTs_1 = require("../common/NameTs");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var Tools_1 = require("../util/Tools");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var turretFactiory = /** @class */ (function (_super) {
    __extends(turretFactiory, _super);
    function turretFactiory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    turretFactiory.prototype.start = function () {
    };
    turretFactiory.prototype.onLoad = function () {
        var _this = this;
        //获取存放地址
        if (this.initData.no) {
            this.node.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
            this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
            this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
            this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchEnd, this);
            //拿起
            cc.game.on(NameTs_1.default.Game_Turret_PickUp, function (res) {
                if (res.level !== _this.initData.level) {
                    _this.node.opacity = 150;
                }
            }, this);
            //放下
            cc.game.on(NameTs_1.default.Game_Turret_PutDown, function (res) {
                if (res.level !== _this.initData.level) {
                    _this.node.opacity = 255;
                }
            }, this);
        }
        // this.node.on(cc.Node.EventType.TOUCH_CANCEL,this.touchEnd,this);
        // this.touchArr = new Map();
        //监听该目标怪兽死亡后重设子弹目标
        cc.game.on(NameTs_1.default.Game_Monster_Killed, function (data) {
            //如果没有目标就退出
            if (_this.bullet.targetId == null) {
                _this.attackData = null;
                return;
            }
            if (data.id == _this.bullet.targetId) {
                _this.bullet.targetId = null;
                _this.attackData = null;
                _this.stopAttack();
            }
        }, this);
        //监听游戏暂停
        cc.game.on(NameTs_1.default.Game_Stop, function () {
            _this.stopAttack();
        }, this);
        //监听游戏继续
        cc.game.on(NameTs_1.default.Game_Resume, function () {
            _this.resumeAttack();
        }, this);
    };
    /**
     * 触碰开始
     * @param event
     */
    turretFactiory.prototype.touchStart = function (event) {
        this.touchId = event.getID();
        if (util_1.default.touchId && util_1.default.touchId !== this.touchId) {
            return;
        }
        util_1.default.touchId = this.touchId;
        this.PickUp();
        this.isTouch = true;
        this.node.zIndex = 99;
        this.bullet.targetId = null;
        this.attackData = null;
        this.stopAttack();
        this.pao.angle = 0;
        this.initPos = this.node.getPosition();
    };
    /**
     * 触碰移动
     * @param event
     */
    turretFactiory.prototype.touchMove = function (event) {
        if (util_1.default.touchId !== this.touchId) {
            return;
        }
        var movePos = event.getDelta();
        this.node.x += movePos.x;
        this.node.y += movePos.y;
    };
    /**
     * 触碰结束
     * @param event
     */
    turretFactiory.prototype.touchEnd = function (event) {
        var _this = this;
        if (util_1.default.touchId !== this.touchId) {
            return;
        }
        this.isTouch = false;
        this.PutDown();
        util_1.default.touchId = null;
        this.carshPlace(function () {
            _this.node.setPosition(_this.initPos);
            _this.node.zIndex = 0;
            // cc.tween(this.node).to(.2,{x:this.initPos.x,y:this.initPos.y}).call(()=>{
            // }).start();
        });
    };
    /**
     * 检查里面在哪个里面
     * @param call 回调
     */
    turretFactiory.prototype.carshPlace = function (call) {
        var _this = this;
        var pos = this.node.getPosition();
        util_1.default.checkTouchPool(pos, function (num) {
            if (num && num !== _this.initData.no) {
                if (num == 100) {
                    if (util_1.default.userData.noviceGuide == 2) {
                        call();
                    }
                    else {
                        _this.recycleFn();
                    }
                }
                else {
                    if (util_1.default.userData.noviceGuide == 2 && num > 2) {
                        call();
                    }
                    else {
                        _this.GetType(num, call);
                    }
                }
            }
            else {
                call();
            }
        });
    };
    /**
     * 判断是交换还是升级
     * @param no 第几个
     * @param call 回调
     */
    turretFactiory.prototype.GetType = function (no, call) {
        var _this = this;
        if (call === void 0) { call = function () { }; }
        if (!this.initData.no || !no) {
            call();
            return;
        }
        //获取炮台位置的位置
        var otherData = util_1.default.GetPoolData(no);
        var otherPlaceData = util_1.default.GetPlaceData(no);
        var otherPos = cc.Vec2.clone(otherPlaceData.pos);
        if (otherData.level == -1) {
            console.log("找个空位坐下");
            if (!util_1.default.checkNoExist(no)) {
                call();
                console.log("未解锁");
                return;
            }
            util_1.default.savePool(this.initData.no);
            this.node.setPosition(otherPos);
            util_1.default.savePool(no, this.initData.level);
            //删除以前的
            cc.game.emit(NameTs_1.default.Game_Turret_Killed, { no: this.initData.no });
            this.createLevelBg(no, this.initData.level);
            util_1.default.GlobalMap.delete("turret_" + this.initData.no);
            this.initData.no = no;
            //更新现在的
            util_1.default.GlobalMap.set("turret_" + no, this.node);
            this.node.zIndex = 0;
        }
        else {
            console.log("拖拽合成成功");
            var otherNode_1 = util_1.default.GlobalMap.get("turret_" + no);
            //升级
            if (otherData.level == this.initData.level) {
                if (!util_1.default.checkUpdateLevel(this.initData.level + 1)) {
                    console.error("等级超过最大等级了!");
                    call();
                    return;
                }
                // 合成奖励
                var coin = util_1.default.GetBehaviorRewardVo(5);
                if (util_1.default.userData.noviceGuide == 2 || (util_1.default.userData.noviceGuide == 3 && util_1.default.checkTestB(NameTs_1.default.new_hand_test))) {
                    var CoinParent = cc.director.getScene().getChildByName('Canvas');
                    cc.game.emit(NameTs_1.default.Game_Effect_coin, { node: this.node, value: coin, num: 5, parent: CoinParent });
                }
                else {
                    cc.game.emit(NameTs_1.default.Game_Effect_coin, { node: this.node, value: coin, num: 5 });
                }
                util_1.default.addTermCoin(coin);
                util_1.default.userData.compoundTimes += 1;
                util_1.default.userData.localCompoundTime += 1;
                cc.game.emit(NameTs_1.default.Game_Task_updata);
                util_1.default.userData.synthesis_times += 1;
                util_1.default.userData.synthesis_All += 1;
                util_1.default.savePool(this.initData.no, null);
                var pos = cc.Vec2.clone(otherPos);
                this.node.setPosition(pos);
                otherNode_1.zIndex = this.node.zIndex = 99;
                cc.game.emit(NameTs_1.default.Game_Turret_Killed, { no: no });
                cc.game.emit(NameTs_1.default.Game_Turret_Killed, { no: this.initData.no });
                cc.tween(otherNode_1).by(.1, { x: 50 }).by(.1, { x: -50 }).call(function () {
                    otherNode_1.zIndex = 0;
                    cc.game.emit(NameTs_1.default.Game_Turret_Killed, { node: otherNode_1, no: null });
                }).start();
                //删除以前的
                util_1.default.GlobalMap.delete("turret_" + this.initData.no);
                //更新现在的
                util_1.default.GlobalMap.set("turret_" + no, this.node);
                this.upLevel(no);
                cc.tween(this.node).by(.1, { x: -50 }).by(.1, { x: 50 }).call(function () {
                    _this.node.zIndex = 0;
                }).start();
                //预加载解锁炮塔信息流
                // if(!util.adPreObj[AdPosition.UnlcokTurretView]&&util.chekPoolHaveTwo()){
                //     util.preloadAd(AdPosition.UnlcokTurretView,true);
                // }
            }
            else { //交换
                console.log("拖拽交换位置成功");
                var selfNo = this.initData.no;
                var selfPlaceData = util_1.default.GetPlaceData(selfNo);
                var selfPos = cc.Vec2.clone(selfPlaceData.pos);
                //交换位置
                otherNode_1.setPosition(selfPos.x, selfPos.y);
                this.node.setPosition(otherPos.x, otherPos.y);
                //保存数据
                util_1.default.savePool(selfNo, otherData.level);
                util_1.default.savePool(no, this.initData.level);
                //修改位置no
                otherNode_1.getComponent("turret").initData.no = selfNo;
                this.initData.no = no;
                //删除以前的
                util_1.default.GlobalMap.set("turret_" + selfNo, otherNode_1);
                //更新现在的
                util_1.default.GlobalMap.set("turret_" + no, this.node);
                this.node.zIndex = otherNode_1.zIndex = 0;
                //删除以前的
                cc.game.emit(NameTs_1.default.Game_Turret_Killed, { no: this.initData.no });
                this.createLevelBg(no, otherData.level);
                cc.game.emit(NameTs_1.default.Game_Turret_Killed, { no: selfNo });
                otherNode_1.getComponent("turret").createLevelBg(selfNo, this.initData.level);
            }
        }
    };
    /**设置名字 */
    turretFactiory.prototype.setName = function () { };
    /**设置数据 */
    turretFactiory.prototype.setData = function (data) {
        this.init(data);
    };
    turretFactiory.prototype.init = function (data) { };
    ;
    /**
     * 升级
     */
    turretFactiory.prototype.upLevel = function (no) { };
    /**监听是否有怪 */
    turretFactiory.prototype.update = function (dt) {
        if (util_1.default.levelState !== faceTs_1.gameState.start)
            return;
        //如果有就退出
        if (this.isTouch)
            return;
        var pos = this.node.getPosition();
        if (this.attackData) {
            this.setPao();
            if (this.attackData && this.attackData.isClose) {
                if (util_1.default.checkMonsterClose({ pos: pos, id: this.attackData.id, distanceNum: this.initData.no ? 250 : 375 }))
                    return;
            }
            else {
                var newData = util_1.default.getCloseMonster(pos, this.initData.no ? 250 : 375);
                if (this.attackData && newData.id == this.attackData.id) {
                    return;
                }
                else {
                    // this.attackFn();
                }
            }
        }
        this.attackData = util_1.default.getCloseMonster(pos, this.initData.no ? 250 : 375);
        if (!this.attackData)
            return;
        this.bullet.targetId = this.attackData.id;
        this.attackFn();
    };
    /**设置目标 */
    turretFactiory.prototype.setTarget = function () {
    };
    /**
     * 攻击
     */
    turretFactiory.prototype.attackFn = function () { };
    /**
     * 回收
     */
    turretFactiory.prototype.recycleFn = function () {
        util_1.default.savePool(this.initData.no, null);
        util_1.default.GlobalMap.delete("turret_" + this.initData.no);
        cc.game.emit(NameTs_1.default.Game_Turret_Killed, { node: this.node, no: this.initData.no });
        TrackMgr_1.default.AppClick({
            app_page_title: "首页",
            app_ck_module: "回收炮塔",
            app_exposure_type: "banner",
        });
    };
    /**
     * 拿起
     */
    turretFactiory.prototype.PickUp = function () {
        //相同等级的炮台数据
        // this.sameLevelTurret = util.getPoolSameLevelTurret(this.initData.level)
        this.sameLevelTurret = util_1.default.getPoolSameLevelTurret(this.initData.level);
        if (this.sameLevelTurret) {
            for (var i = 0; i < this.sameLevelTurret.length; i++) {
                cc.game.emit(NameTs_1.default.Game_Same_Place_PickUp, { id: this.sameLevelTurret[i].no });
            }
        }
        cc.game.emit(NameTs_1.default.Game_Turret_PickUp, { id: this.initData.no, level: this.initData.level, host: this.initData.no });
    };
    /**
     * 放下
     */
    turretFactiory.prototype.PutDown = function () {
        // this.sameLevelTurret.forEach((item:any)=>{
        // });
        if (this.sameLevelTurret) {
            for (var i = 0; i < this.sameLevelTurret.length; i++) {
                cc.game.emit(NameTs_1.default.Game_Same_Place_PutDown, { id: this.sameLevelTurret[i].no });
            }
        }
        cc.game.emit(NameTs_1.default.Game_Turret_PutDown, { id: this.initData.no, level: this.initData.level });
        this.sameLevelTurret = null;
    };
    /**两点角度 */
    turretFactiory.prototype.GetAngle = function () {
        var monsetrName = util_1.default.userData.customs.big + "-" + util_1.default.userData.customs.small + "_Monster_" + this.bullet.targetId;
        var targetNode = util_1.default.MonsterMap.get(monsetrName);
        if (!targetNode) {
            this.bullet.targetId = null;
            this.attackData = null;
            return 0;
        }
        var targetPos = cc.Vec2.clone(targetNode.getPosition());
        targetPos = targetNode.parent.convertToWorldSpaceAR(targetPos);
        targetPos = this.node.parent.convertToNodeSpaceAR(targetPos);
        var angle = Tools_1.Tools.GetPosAngle(this.bullet.initPos, targetPos);
        return angle;
    };
    /**设置炮塔角度 */
    turretFactiory.prototype.setPao = function () { };
    ;
    /**停止攻击 */
    turretFactiory.prototype.stopAttack = function () { };
    /**恢复攻击 */
    turretFactiory.prototype.resumeAttack = function () { };
    /**
     * 加载图片
     */
    turretFactiory.prototype.loadSpine = function (spine, name) {
        var mouthName = this.turretData.mouthName;
        cc.resources.load("spine/turret/" + this.turretData.DynamicResources + "/" + name + "/" + (name == "mouth" ? mouthName : this.turretData.spineName), sp.SkeletonData, function (error, sp) {
            spine.skeletonData = sp;
            spine.setAnimation(0, "animation", false);
        });
    };
    /**
     * 创建等级背景板
     */
    turretFactiory.prototype.createLevelBg = function (no, level) {
        cc.game.emit(NameTs_1.default.Game_LevelBg_Creator, { node: this.node, no: no });
        cc.game.emit(NameTs_1.default.Game_LevelLabel_Creator, { node: this.node, no: no, level: this.initData.level });
    };
    turretFactiory = __decorate([
        ccclass
    ], turretFactiory);
    return turretFactiory;
}(cc.Component));
exports.default = turretFactiory;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxnYW1lXFx0dXJyZXRGYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDJDQUFnRjtBQUNoRiwyQ0FBc0M7QUFDdEMsaURBQTRDO0FBQzVDLHVDQUFzQztBQUN0QyxxQ0FBZ0M7QUFHMUIsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBNEMsa0NBQVk7SUFBeEQ7O0lBbWNBLENBQUM7SUF0YUcsOEJBQUssR0FBTDtJQUVBLENBQUM7SUFFRCwrQkFBTSxHQUFOO1FBQUEsaUJBNkRDO1FBNURHLFFBQVE7UUFDUixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ25FLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ2pFLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQy9ELElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBR2xFLElBQUk7WUFDSixFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBTSxDQUFD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QUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLElBQUEsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBRXRHLENBQUM7SUFsY2dCLGNBQWM7UUFEbEMsT0FBTztPQUNhLGNBQWMsQ0FtY2xDO0lBQUQscUJBQUM7Q0FuY0QsQUFtY0MsQ0FuYzJDLEVBQUUsQ0FBQyxTQUFTLEdBbWN2RDtrQkFuY29CLGNBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZFBvc2l0aW9uIH0gZnJvbSBcIi4uL2NvbW1vbi9BZFBvc2l0aW9uXCI7XG5pbXBvcnQgeyBidWxsZXRJbmZvLCBnYW1lU3RhdGUsIHRoaW5nVHlwZSwgdHVycmV0SW5mbyB9IGZyb20gXCIuLi9jb21tb24vZmFjZVRzXCI7XG5pbXBvcnQgTmFtZVRzIGZyb20gXCIuLi9jb21tb24vTmFtZVRzXCI7XG5pbXBvcnQgVHJhY2tNZ3IgZnJvbSBcIi4uL1RyYWNrTWdyL1RyYWNrTWdyXCI7XG5pbXBvcnQgeyBUb29scyB9IGZyb20gXCIuLi91dGlsL1Rvb2xzXCI7XG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vdXRpbC91dGlsXCI7XG5pbXBvcnQgdHVycmV0IGZyb20gXCIuL3R1cnJldC90dXJyZXRcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHR1cnJldEZhY3Rpb3J5IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuXG5cbiAgICBpbml0RGF0YTsvL+WIneWni+WMluaVsOaNrlxuXG4gICAgdHVycmV0RGF0YTogdHVycmV0SW5mbzsgLy/ngq7lj7DnmoTmlbDmja5cblxuICAgIHByaXZhdGUgaW5pdFBvczogY2MuVmVjMjsvL+WHuueUn+WcqOWTqumHjFxuXG4gICAgLy/mlLvlh7vnm67moIdcbiAgICBhdHRhY2tEYXRhOiBhbnk7XG5cbiAgICAvL+WtkOW8ueWxnuaAp1xuXG4gICAgYnVsbGV0OiBidWxsZXRJbmZvO1xuXG4gICAgLy/mmK/lkKblnKjmi7/nnYBcbiAgICBpc1RvdWNoOiBib29sZWFuO1xuXG4gICAgLy/ngq7lpLRcbiAgICBwYW86IGNjLk5vZGU7XG5cbiAgICAvL+WtmOWCqOW9k+WJjeebuOWQjOetiee6p+eahOeCruWhlFxuICAgIHNhbWVMZXZlbFR1cnJldDogYW55W107XG5cbiAgICAvL3RvdWNoaWRcbiAgICB0b3VjaElkOiBudW1iZXI7XG5cbiAgICBzdGFydCgpIHtcblxuICAgIH1cblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgLy/ojrflj5blrZjmlL7lnLDlnYBcbiAgICAgICAgaWYgKHRoaXMuaW5pdERhdGEubm8pIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy50b3VjaFN0YXJ0LCB0aGlzKTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLCB0aGlzLnRvdWNoTW92ZSwgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLnRvdWNoRW5kLCB0aGlzKTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwsIHRoaXMudG91Y2hFbmQsIHRoaXMpO1xuXG5cbiAgICAgICAgICAgIC8v5ou/6LW3XG4gICAgICAgICAgICBjYy5nYW1lLm9uKE5hbWVUcy5HYW1lX1R1cnJldF9QaWNrVXAsIChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzLmxldmVsICE9PSB0aGlzLmluaXREYXRhLmxldmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gMTUwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgICAgICAvL+aUvuS4i1xuICAgICAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9UdXJyZXRfUHV0RG93biwgKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXMubGV2ZWwgIT09IHRoaXMuaW5pdERhdGEubGV2ZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSAyNTU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICB9XG4gICAgICAgIC8vIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwsdGhpcy50b3VjaEVuZCx0aGlzKTtcblxuICAgICAgICAvLyB0aGlzLnRvdWNoQXJyID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIC8v55uR5ZCs6K+l55uu5qCH5oCq5YW95q275Lqh5ZCO6YeN6K6+5a2Q5by555uu5qCHXG4gICAgICAgIGNjLmdhbWUub24oTmFtZVRzLkdhbWVfTW9uc3Rlcl9LaWxsZWQsIChkYXRhKSA9PiB7XG4gICAgICAgICAgICAvL+WmguaenOayoeacieebruagh+WwsemAgOWHulxuICAgICAgICAgICAgaWYgKHRoaXMuYnVsbGV0LnRhcmdldElkID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmF0dGFja0RhdGEgPSBudWxsO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGRhdGEuaWQgPT0gdGhpcy5idWxsZXQudGFyZ2V0SWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1bGxldC50YXJnZXRJZCA9IG51bGw7XG4gICAgICAgICAgICAgICAgdGhpcy5hdHRhY2tEYXRhID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3BBdHRhY2soKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LCB0aGlzKTtcblxuXG5cbiAgICAgICAgLy/nm5HlkKzmuLjmiI/mmoLlgZxcbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9TdG9wLCAoKSA9PiB7XG5cbiAgICAgICAgICAgIHRoaXMuc3RvcEF0dGFjaygpO1xuXG4gICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgIC8v55uR5ZCs5ri45oiP57un57utXG4gICAgICAgIGNjLmdhbWUub24oTmFtZVRzLkdhbWVfUmVzdW1lLCAoKSA9PiB7XG5cbiAgICAgICAgICAgIHRoaXMucmVzdW1lQXR0YWNrKCk7XG5cbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDop6bnorDlvIDlp4tcbiAgICAgKiBAcGFyYW0gZXZlbnQgXG4gICAgICovXG4gICAgcHJpdmF0ZSB0b3VjaFN0YXJ0KGV2ZW50KSB7XG4gICAgICAgIHRoaXMudG91Y2hJZCA9IGV2ZW50LmdldElEKCk7XG4gICAgICAgIGlmICh1dGlsLnRvdWNoSWQgJiYgdXRpbC50b3VjaElkICE9PSB0aGlzLnRvdWNoSWQpIHsgcmV0dXJuIH1cbiAgICAgICAgdXRpbC50b3VjaElkID0gdGhpcy50b3VjaElkO1xuICAgICAgICB0aGlzLlBpY2tVcCgpO1xuICAgICAgICB0aGlzLmlzVG91Y2ggPSB0cnVlO1xuICAgICAgICB0aGlzLm5vZGUuekluZGV4ID0gOTk7XG4gICAgICAgIHRoaXMuYnVsbGV0LnRhcmdldElkID0gbnVsbDtcbiAgICAgICAgdGhpcy5hdHRhY2tEYXRhID0gbnVsbDtcbiAgICAgICAgdGhpcy5zdG9wQXR0YWNrKCk7XG4gICAgICAgIHRoaXMucGFvLmFuZ2xlID0gMDtcbiAgICAgICAgdGhpcy5pbml0UG9zID0gdGhpcy5ub2RlLmdldFBvc2l0aW9uKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6Kem56Kw56e75YqoXG4gICAgICogQHBhcmFtIGV2ZW50IFxuICAgICAqL1xuICAgIHByaXZhdGUgdG91Y2hNb3ZlKGV2ZW50KSB7XG4gICAgICAgIGlmICh1dGlsLnRvdWNoSWQgIT09IHRoaXMudG91Y2hJZCkgeyByZXR1cm4gfVxuICAgICAgICBsZXQgbW92ZVBvczogY2MuVmVjMiA9IGV2ZW50LmdldERlbHRhKCk7XG4gICAgICAgIHRoaXMubm9kZS54ICs9IG1vdmVQb3MueDtcbiAgICAgICAgdGhpcy5ub2RlLnkgKz0gbW92ZVBvcy55O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOinpueisOe7k+adn1xuICAgICAqIEBwYXJhbSBldmVudCBcbiAgICAgKi9cbiAgICBwcml2YXRlIHRvdWNoRW5kKGV2ZW50KSB7XG4gICAgICAgIGlmICh1dGlsLnRvdWNoSWQgIT09IHRoaXMudG91Y2hJZCkgeyByZXR1cm4gfVxuICAgICAgICB0aGlzLmlzVG91Y2ggPSBmYWxzZTtcbiAgICAgICAgdGhpcy5QdXREb3duKCk7XG4gICAgICAgIHV0aWwudG91Y2hJZCA9IG51bGw7XG4gICAgICAgIHRoaXMuY2Fyc2hQbGFjZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24odGhpcy5pbml0UG9zKTtcbiAgICAgICAgICAgIHRoaXMubm9kZS56SW5kZXggPSAwO1xuICAgICAgICAgICAgLy8gY2MudHdlZW4odGhpcy5ub2RlKS50byguMix7eDp0aGlzLmluaXRQb3MueCx5OnRoaXMuaW5pdFBvcy55fSkuY2FsbCgoKT0+e1xuXG4gICAgICAgICAgICAvLyB9KS5zdGFydCgpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOajgOafpemHjOmdouWcqOWTquS4qumHjOmdolxuICAgICAqIEBwYXJhbSBjYWxsIOWbnuiwg1xuICAgICAqL1xuXG4gICAgY2Fyc2hQbGFjZShjYWxsOiBGdW5jdGlvbikge1xuXG4gICAgICAgIGxldCBwb3M6IGNjLlZlYzIgPSB0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKTtcblxuICAgICAgICB1dGlsLmNoZWNrVG91Y2hQb29sKHBvcywgKG51bSkgPT4ge1xuICAgICAgICAgICAgaWYgKG51bSAmJiBudW0gIT09IHRoaXMuaW5pdERhdGEubm8pIHtcbiAgICAgICAgICAgICAgICBpZiAobnVtID09IDEwMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodXRpbC51c2VyRGF0YS5ub3ZpY2VHdWlkZSA9PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsKCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlY3ljbGVGbigpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHV0aWwudXNlckRhdGEubm92aWNlR3VpZGUgPT0gMiAmJiBudW0gPiAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsKCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkdldFR5cGUobnVtLCBjYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2FsbCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Yik5pat5piv5Lqk5o2i6L+Y5piv5Y2H57qnXG4gICAgICogQHBhcmFtIG5vIOesrOWHoOS4qlxuICAgICAqIEBwYXJhbSBjYWxsIOWbnuiwg1xuICAgICAqL1xuICAgIEdldFR5cGUobm86IG51bWJlciwgY2FsbDogRnVuY3Rpb24gPSAoKSA9PiB7IH0pIHtcbiAgICAgICAgaWYgKCF0aGlzLmluaXREYXRhLm5vIHx8ICFubykge1xuICAgICAgICAgICAgY2FsbCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8v6I635Y+W54Ku5Y+w5L2N572u55qE5L2N572uXG4gICAgICAgIGxldCBvdGhlckRhdGEgPSB1dGlsLkdldFBvb2xEYXRhKG5vKTtcbiAgICAgICAgbGV0IG90aGVyUGxhY2VEYXRhID0gdXRpbC5HZXRQbGFjZURhdGEobm8pO1xuICAgICAgICBsZXQgb3RoZXJQb3M6IGNjLlZlYzIgPSBjYy5WZWMyLmNsb25lKG90aGVyUGxhY2VEYXRhLnBvcyk7XG4gICAgICAgIGlmIChvdGhlckRhdGEubGV2ZWwgPT0gLTEpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5om+5Liq56m65L2N5Z2Q5LiLXCIpO1xuICAgICAgICAgICAgaWYgKCF1dGlsLmNoZWNrTm9FeGlzdChubykpIHtcbiAgICAgICAgICAgICAgICBjYWxsKCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmnKrop6PplIFcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdXRpbC5zYXZlUG9vbCh0aGlzLmluaXREYXRhLm5vKTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbihvdGhlclBvcyk7XG4gICAgICAgICAgICB1dGlsLnNhdmVQb29sKG5vLCB0aGlzLmluaXREYXRhLmxldmVsKTtcbiAgICAgICAgICAgIC8v5Yig6Zmk5Lul5YmN55qEXG4gICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfVHVycmV0X0tpbGxlZCwgeyBubzogdGhpcy5pbml0RGF0YS5ubyB9KTtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTGV2ZWxCZyhubywgdGhpcy5pbml0RGF0YS5sZXZlbCk7XG4gICAgICAgICAgICB1dGlsLkdsb2JhbE1hcC5kZWxldGUoXCJ0dXJyZXRfXCIgKyB0aGlzLmluaXREYXRhLm5vKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdERhdGEubm8gPSBubztcbiAgICAgICAgICAgIC8v5pu05paw546w5Zyo55qEXG4gICAgICAgICAgICB1dGlsLkdsb2JhbE1hcC5zZXQoXCJ0dXJyZXRfXCIgKyBubywgdGhpcy5ub2RlKTtcbiAgICAgICAgICAgIHRoaXMubm9kZS56SW5kZXggPSAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCLmi5bmi73lkIjmiJDmiJDlip9cIik7XG4gICAgICAgICAgICBsZXQgb3RoZXJOb2RlOiBjYy5Ob2RlID0gdXRpbC5HbG9iYWxNYXAuZ2V0KFwidHVycmV0X1wiICsgbm8pO1xuICAgICAgICAgICAgLy/ljYfnuqdcbiAgICAgICAgICAgIGlmIChvdGhlckRhdGEubGV2ZWwgPT0gdGhpcy5pbml0RGF0YS5sZXZlbCkge1xuICAgICAgICAgICAgICAgIGlmICghdXRpbC5jaGVja1VwZGF0ZUxldmVsKHRoaXMuaW5pdERhdGEubGV2ZWwgKyAxKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwi562J57qn6LaF6L+H5pyA5aSn562J57qn5LqGIVwiKTtcbiAgICAgICAgICAgICAgICAgICAgY2FsbCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8g5ZCI5oiQ5aWW5YqxXG4gICAgICAgICAgICAgICAgbGV0IGNvaW46IG51bWJlciA9IHV0aWwuR2V0QmVoYXZpb3JSZXdhcmRWbyg1KTtcbiAgICAgICAgICAgICAgICBpZiAodXRpbC51c2VyRGF0YS5ub3ZpY2VHdWlkZSA9PSAyIHx8ICh1dGlsLnVzZXJEYXRhLm5vdmljZUd1aWRlID09IDMgJiYgdXRpbC5jaGVja1Rlc3RCKE5hbWVUcy5uZXdfaGFuZF90ZXN0KSkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IENvaW5QYXJlbnQ6IGNjLk5vZGUgPSBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpLmdldENoaWxkQnlOYW1lKCdDYW52YXMnKTtcbiAgICAgICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX0VmZmVjdF9jb2luLCB7IG5vZGU6IHRoaXMubm9kZSwgdmFsdWU6IGNvaW4sIG51bTogNSwgcGFyZW50OiBDb2luUGFyZW50IH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9FZmZlY3RfY29pbiwgeyBub2RlOiB0aGlzLm5vZGUsIHZhbHVlOiBjb2luLCBudW06IDUgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdXRpbC5hZGRUZXJtQ29pbihjb2luKTtcbiAgICAgICAgICAgICAgICB1dGlsLnVzZXJEYXRhLmNvbXBvdW5kVGltZXMgKz0gMTtcbiAgICAgICAgICAgICAgICB1dGlsLnVzZXJEYXRhLmxvY2FsQ29tcG91bmRUaW1lICs9IDE7XG4gICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX1Rhc2tfdXBkYXRhKTtcbiAgICAgICAgICAgICAgICB1dGlsLnVzZXJEYXRhLnN5bnRoZXNpc190aW1lcyArPSAxO1xuICAgICAgICAgICAgICAgIHV0aWwudXNlckRhdGEuc3ludGhlc2lzX0FsbCArPSAxO1xuICAgICAgICAgICAgICAgIHV0aWwuc2F2ZVBvb2wodGhpcy5pbml0RGF0YS5ubywgbnVsbCk7XG4gICAgICAgICAgICAgICAgbGV0IHBvczogY2MuVmVjMiA9IGNjLlZlYzIuY2xvbmUob3RoZXJQb3MpO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbihwb3MpO1xuICAgICAgICAgICAgICAgIG90aGVyTm9kZS56SW5kZXggPSB0aGlzLm5vZGUuekluZGV4ID0gOTk7XG4gICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX1R1cnJldF9LaWxsZWQsIHsgbm8gfSk7XG4gICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX1R1cnJldF9LaWxsZWQsIHsgbm86IHRoaXMuaW5pdERhdGEubm8gfSk7XG4gICAgICAgICAgICAgICAgY2MudHdlZW4ob3RoZXJOb2RlKS5ieSguMSwgeyB4OiA1MCB9KS5ieSguMSwgeyB4OiAtNTAgfSkuY2FsbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG90aGVyTm9kZS56SW5kZXggPSAwO1xuICAgICAgICAgICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfVHVycmV0X0tpbGxlZCwgeyBub2RlOiBvdGhlck5vZGUsIG5vOiBudWxsIH0pO1xuICAgICAgICAgICAgICAgIH0pLnN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgLy/liKDpmaTku6XliY3nmoRcbiAgICAgICAgICAgICAgICB1dGlsLkdsb2JhbE1hcC5kZWxldGUoXCJ0dXJyZXRfXCIgKyB0aGlzLmluaXREYXRhLm5vKTtcbiAgICAgICAgICAgICAgICAvL+abtOaWsOeOsOWcqOeahFxuICAgICAgICAgICAgICAgIHV0aWwuR2xvYmFsTWFwLnNldChcInR1cnJldF9cIiArIG5vLCB0aGlzLm5vZGUpO1xuICAgICAgICAgICAgICAgIHRoaXMudXBMZXZlbChubyk7XG4gICAgICAgICAgICAgICAgY2MudHdlZW4odGhpcy5ub2RlKS5ieSguMSwgeyB4OiAtNTAgfSkuYnkoLjEsIHsgeDogNTAgfSkuY2FsbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS56SW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIH0pLnN0YXJ0KCk7XG5cbiAgICAgICAgICAgICAgICAvL+mihOWKoOi9veino+mUgeeCruWhlOS/oeaBr+a1gVxuICAgICAgICAgICAgICAgIC8vIGlmKCF1dGlsLmFkUHJlT2JqW0FkUG9zaXRpb24uVW5sY29rVHVycmV0Vmlld10mJnV0aWwuY2hla1Bvb2xIYXZlVHdvKCkpe1xuICAgICAgICAgICAgICAgIC8vICAgICB1dGlsLnByZWxvYWRBZChBZFBvc2l0aW9uLlVubGNva1R1cnJldFZpZXcsdHJ1ZSk7XG4gICAgICAgICAgICAgICAgLy8gfVxuXG4gICAgICAgICAgICB9IGVsc2UgeyAvL+S6pOaNolxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5ouW5ou95Lqk5o2i5L2N572u5oiQ5YqfXCIpO1xuICAgICAgICAgICAgICAgIGxldCBzZWxmTm86IG51bWJlciA9IHRoaXMuaW5pdERhdGEubm87XG4gICAgICAgICAgICAgICAgbGV0IHNlbGZQbGFjZURhdGEgPSB1dGlsLkdldFBsYWNlRGF0YShzZWxmTm8pO1xuICAgICAgICAgICAgICAgIGxldCBzZWxmUG9zOiBjYy5WZWMyID0gY2MuVmVjMi5jbG9uZShzZWxmUGxhY2VEYXRhLnBvcyk7XG4gICAgICAgICAgICAgICAgLy/kuqTmjaLkvY3nva5cbiAgICAgICAgICAgICAgICBvdGhlck5vZGUuc2V0UG9zaXRpb24oc2VsZlBvcy54LCBzZWxmUG9zLnkpO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbihvdGhlclBvcy54LCBvdGhlclBvcy55KTtcbiAgICAgICAgICAgICAgICAvL+S/neWtmOaVsOaNrlxuICAgICAgICAgICAgICAgIHV0aWwuc2F2ZVBvb2woc2VsZk5vLCBvdGhlckRhdGEubGV2ZWwpO1xuICAgICAgICAgICAgICAgIHV0aWwuc2F2ZVBvb2wobm8sIHRoaXMuaW5pdERhdGEubGV2ZWwpO1xuXG4gICAgICAgICAgICAgICAgLy/kv67mlLnkvY3nva5ub1xuICAgICAgICAgICAgICAgIG90aGVyTm9kZS5nZXRDb21wb25lbnQoXCJ0dXJyZXRcIikuaW5pdERhdGEubm8gPSBzZWxmTm87XG4gICAgICAgICAgICAgICAgdGhpcy5pbml0RGF0YS5ubyA9IG5vO1xuICAgICAgICAgICAgICAgIC8v5Yig6Zmk5Lul5YmN55qEXG4gICAgICAgICAgICAgICAgdXRpbC5HbG9iYWxNYXAuc2V0KFwidHVycmV0X1wiICsgc2VsZk5vLCBvdGhlck5vZGUpO1xuICAgICAgICAgICAgICAgIC8v5pu05paw546w5Zyo55qEXG4gICAgICAgICAgICAgICAgdXRpbC5HbG9iYWxNYXAuc2V0KFwidHVycmV0X1wiICsgbm8sIHRoaXMubm9kZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnpJbmRleCA9IG90aGVyTm9kZS56SW5kZXggPSAwO1xuXG4gICAgICAgICAgICAgICAgLy/liKDpmaTku6XliY3nmoRcbiAgICAgICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfVHVycmV0X0tpbGxlZCwgeyBubzogdGhpcy5pbml0RGF0YS5ubyB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUxldmVsQmcobm8sIG90aGVyRGF0YS5sZXZlbCk7XG4gICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX1R1cnJldF9LaWxsZWQsIHsgbm86IHNlbGZObyB9KTtcbiAgICAgICAgICAgICAgICBvdGhlck5vZGUuZ2V0Q29tcG9uZW50KFwidHVycmV0XCIpLmNyZWF0ZUxldmVsQmcoc2VsZk5vLCB0aGlzLmluaXREYXRhLmxldmVsKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKirorr7nva7lkI3lrZcgKi9cbiAgICBzZXROYW1lKCkgeyB9XG5cbiAgICAvKirorr7nva7mlbDmja4gKi9cbiAgICBzZXREYXRhKGRhdGEpIHtcbiAgICAgICAgdGhpcy5pbml0KGRhdGEpO1xuICAgIH1cbiAgICBpbml0KGRhdGEpIHsgfTtcblxuICAgIC8qKlxuICAgICAqIOWNh+e6p1xuICAgICAqL1xuICAgIHVwTGV2ZWwobm8pIHsgfVxuXG4gICAgLyoq55uR5ZCs5piv5ZCm5pyJ5oCqICovXG4gICAgdXBkYXRlKGR0KSB7XG4gICAgICAgIGlmICh1dGlsLmxldmVsU3RhdGUgIT09IGdhbWVTdGF0ZS5zdGFydCkgcmV0dXJuXG4gICAgICAgIC8v5aaC5p6c5pyJ5bCx6YCA5Ye6XG4gICAgICAgIGlmICh0aGlzLmlzVG91Y2gpIHJldHVybjtcbiAgICAgICAgbGV0IHBvczogY2MuVmVjMiA9IHRoaXMubm9kZS5nZXRQb3NpdGlvbigpO1xuICAgICAgICBpZiAodGhpcy5hdHRhY2tEYXRhKSB7XG4gICAgICAgICAgICB0aGlzLnNldFBhbygpO1xuICAgICAgICAgICAgaWYgKHRoaXMuYXR0YWNrRGF0YSAmJiB0aGlzLmF0dGFja0RhdGEuaXNDbG9zZSkge1xuICAgICAgICAgICAgICAgIGlmICh1dGlsLmNoZWNrTW9uc3RlckNsb3NlKHsgcG9zLCBpZDogdGhpcy5hdHRhY2tEYXRhLmlkLCBkaXN0YW5jZU51bTogdGhpcy5pbml0RGF0YS5ubyA/IDI1MCA6IDM3NSB9KSkgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgbmV3RGF0YSA9IHV0aWwuZ2V0Q2xvc2VNb25zdGVyKHBvcywgdGhpcy5pbml0RGF0YS5ubyA/IDI1MCA6IDM3NSk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYXR0YWNrRGF0YSAmJiBuZXdEYXRhLmlkID09IHRoaXMuYXR0YWNrRGF0YS5pZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5hdHRhY2tGbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmF0dGFja0RhdGEgPSB1dGlsLmdldENsb3NlTW9uc3Rlcihwb3MsIHRoaXMuaW5pdERhdGEubm8gPyAyNTAgOiAzNzUpO1xuXG4gICAgICAgIGlmICghdGhpcy5hdHRhY2tEYXRhKSByZXR1cm47XG4gICAgICAgIHRoaXMuYnVsbGV0LnRhcmdldElkID0gdGhpcy5hdHRhY2tEYXRhLmlkO1xuICAgICAgICB0aGlzLmF0dGFja0ZuKCk7XG5cbiAgICB9XG5cbiAgICAvKirorr7nva7nm67moIcgKi9cbiAgICBzZXRUYXJnZXQoKSB7XG5cblxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5pS75Ye7XG4gICAgICovXG4gICAgYXR0YWNrRm4oKSB7IH1cblxuICAgIC8qKlxuICAgICAqIOWbnuaUtlxuICAgICAqL1xuICAgIHJlY3ljbGVGbigpIHtcblxuICAgICAgICB1dGlsLnNhdmVQb29sKHRoaXMuaW5pdERhdGEubm8sIG51bGwpO1xuICAgICAgICB1dGlsLkdsb2JhbE1hcC5kZWxldGUoXCJ0dXJyZXRfXCIgKyB0aGlzLmluaXREYXRhLm5vKTtcbiAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX1R1cnJldF9LaWxsZWQsIHsgbm9kZTogdGhpcy5ub2RlLCBubzogdGhpcy5pbml0RGF0YS5ubyB9KTtcbiAgICAgICAgVHJhY2tNZ3IuQXBwQ2xpY2soe1xuICAgICAgICAgICAgYXBwX3BhZ2VfdGl0bGU6IFwi6aaW6aG1XCIsXG4gICAgICAgICAgICBhcHBfY2tfbW9kdWxlOiBcIuWbnuaUtueCruWhlFwiLFxuICAgICAgICAgICAgYXBwX2V4cG9zdXJlX3R5cGU6IFwiYmFubmVyXCIsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaLv+i1t1xuICAgICAqL1xuXG4gICAgUGlja1VwKCkge1xuXG4gICAgICAgIC8v55u45ZCM562J57qn55qE54Ku5Y+w5pWw5o2uXG4gICAgICAgIC8vIHRoaXMuc2FtZUxldmVsVHVycmV0ID0gdXRpbC5nZXRQb29sU2FtZUxldmVsVHVycmV0KHRoaXMuaW5pdERhdGEubGV2ZWwpXG4gICAgICAgIHRoaXMuc2FtZUxldmVsVHVycmV0ID0gdXRpbC5nZXRQb29sU2FtZUxldmVsVHVycmV0KHRoaXMuaW5pdERhdGEubGV2ZWwpXG4gICAgICAgIGlmICh0aGlzLnNhbWVMZXZlbFR1cnJldCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNhbWVMZXZlbFR1cnJldC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9TYW1lX1BsYWNlX1BpY2tVcCwgeyBpZDogdGhpcy5zYW1lTGV2ZWxUdXJyZXRbaV0ubm8gfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfVHVycmV0X1BpY2tVcCwgeyBpZDogdGhpcy5pbml0RGF0YS5ubywgbGV2ZWw6IHRoaXMuaW5pdERhdGEubGV2ZWwsIGhvc3Q6IHRoaXMuaW5pdERhdGEubm8gfSk7XG5cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaUvuS4i1xuICAgICAqL1xuXG4gICAgUHV0RG93bigpIHtcblxuICAgICAgICAvLyB0aGlzLnNhbWVMZXZlbFR1cnJldC5mb3JFYWNoKChpdGVtOmFueSk9PntcblxuXG4gICAgICAgIC8vIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLnNhbWVMZXZlbFR1cnJldCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNhbWVMZXZlbFR1cnJldC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9TYW1lX1BsYWNlX1B1dERvd24sIHsgaWQ6IHRoaXMuc2FtZUxldmVsVHVycmV0W2ldLm5vIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX1R1cnJldF9QdXREb3duLCB7IGlkOiB0aGlzLmluaXREYXRhLm5vLCBsZXZlbDogdGhpcy5pbml0RGF0YS5sZXZlbCB9KTtcblxuICAgICAgICB0aGlzLnNhbWVMZXZlbFR1cnJldCA9IG51bGw7XG5cbiAgICB9XG5cbiAgICAvKirkuKTngrnop5LluqYgKi9cbiAgICBHZXRBbmdsZSgpOiBudW1iZXIge1xuXG4gICAgICAgIGxldCBtb25zZXRyTmFtZSA9IHV0aWwudXNlckRhdGEuY3VzdG9tcy5iaWcgKyBcIi1cIiArIHV0aWwudXNlckRhdGEuY3VzdG9tcy5zbWFsbCArIFwiX01vbnN0ZXJfXCIgKyB0aGlzLmJ1bGxldC50YXJnZXRJZDtcbiAgICAgICAgbGV0IHRhcmdldE5vZGU6IGNjLk5vZGUgPSB1dGlsLk1vbnN0ZXJNYXAuZ2V0KG1vbnNldHJOYW1lKTtcblxuICAgICAgICBpZiAoIXRhcmdldE5vZGUpIHtcbiAgICAgICAgICAgIHRoaXMuYnVsbGV0LnRhcmdldElkID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuYXR0YWNrRGF0YSA9IG51bGw7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgbGV0IHRhcmdldFBvczogY2MuVmVjMiA9IGNjLlZlYzIuY2xvbmUodGFyZ2V0Tm9kZS5nZXRQb3NpdGlvbigpKTtcblxuICAgICAgICB0YXJnZXRQb3MgPSB0YXJnZXROb2RlLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIodGFyZ2V0UG9zKTtcbiAgICAgICAgdGFyZ2V0UG9zID0gdGhpcy5ub2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0YXJnZXRQb3MpO1xuXG4gICAgICAgIGxldCBhbmdsZTogbnVtYmVyID0gVG9vbHMuR2V0UG9zQW5nbGUodGhpcy5idWxsZXQuaW5pdFBvcywgdGFyZ2V0UG9zKTtcblxuXG5cbiAgICAgICAgcmV0dXJuIGFuZ2xlO1xuICAgIH1cblxuICAgIC8qKuiuvue9rueCruWhlOinkuW6piAqL1xuICAgIHNldFBhbygpIHsgfTtcblxuICAgIC8qKuWBnOatouaUu+WHuyAqL1xuICAgIHN0b3BBdHRhY2soKSB7IH1cbiAgICAvKirmgaLlpI3mlLvlh7sgKi9cbiAgICByZXN1bWVBdHRhY2soKSB7IH1cblxuICAgIC8qKlxuICAgICAqIOWKoOi9veWbvueJh1xuICAgICAqL1xuICAgIGxvYWRTcGluZShzcGluZTogc3AuU2tlbGV0b24sIG5hbWU6IHN0cmluZykge1xuICAgICAgICBsZXQgbW91dGhOYW1lOiBzdHJpbmcgPSB0aGlzLnR1cnJldERhdGEubW91dGhOYW1lO1xuICAgICAgICBjYy5yZXNvdXJjZXMubG9hZChcInNwaW5lL3R1cnJldC9cIiArIHRoaXMudHVycmV0RGF0YS5EeW5hbWljUmVzb3VyY2VzICsgXCIvXCIgKyBuYW1lICsgXCIvXCIgKyAobmFtZSA9PSBcIm1vdXRoXCIgPyBtb3V0aE5hbWUgOiB0aGlzLnR1cnJldERhdGEuc3BpbmVOYW1lKSwgc3AuU2tlbGV0b25EYXRhLCAoZXJyb3IsIHNwOiBzcC5Ta2VsZXRvbkRhdGEpID0+IHtcbiAgICAgICAgICAgIHNwaW5lLnNrZWxldG9uRGF0YSA9IHNwO1xuICAgICAgICAgICAgc3BpbmUuc2V0QW5pbWF0aW9uKDAsIFwiYW5pbWF0aW9uXCIsIGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Yib5bu6562J57qn6IOM5pmv5p2/XG4gICAgICovXG4gICAgY3JlYXRlTGV2ZWxCZyhubzogbnVtYmVyLCBsZXZlbDogbnVtYmVyKSB7XG4gICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9MZXZlbEJnX0NyZWF0b3IsIHsgbm9kZTogdGhpcy5ub2RlLCBubyB9KTtcbiAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX0xldmVsTGFiZWxfQ3JlYXRvciwgeyBub2RlOiB0aGlzLm5vZGUsIG5vLCBsZXZlbDogdGhpcy5pbml0RGF0YS5sZXZlbCB9KTtcblxuICAgIH1cbn1cbiJdfQ==