"use strict";
cc._RF.push(module, '4bc01mgmWNBz6E9IVW9NNyu', 'turretFactory');
// Script/game/turretFactory.ts

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
var faceTs_1 = require("../common/faceTs");
var NameTs_1 = require("../common/NameTs");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var tool_1 = require("../util/tool");
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
            var otherNode_1 = util_1.default.GlobalMap.get("turret_" + no);
            //升级
            if (otherData.level == this.initData.level) {
                if (!util_1.default.checkUpdateLevel(this.initData.level + 1)) {
                    console.error("等级超过最大等级了!");
                    call();
                    return;
                }
                //合成奖励
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
        var angle = tool_1.default.GetPosAngle(this.bullet.initPos, targetPos);
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