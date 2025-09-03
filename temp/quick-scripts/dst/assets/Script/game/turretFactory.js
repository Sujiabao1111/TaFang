
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxnYW1lXFx0dXJyZXRGYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDJDQUFnRjtBQUNoRiwyQ0FBc0M7QUFDdEMsaURBQTRDO0FBQzVDLHFDQUFnQztBQUNoQyxxQ0FBZ0M7QUFHMUIsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBNEMsa0NBQVk7SUFBeEQ7O0lBbWNBLENBQUM7SUF0YUcsOEJBQUssR0FBTDtJQUVBLENBQUM7SUFFRCwrQkFBTSxHQUFOO1FBQUEsaUJBNkRDO1FBNURHLFFBQVE7UUFDUixJQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFDO1lBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBQyxJQUFJLENBQUMsVUFBVSxFQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pFLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBQyxJQUFJLENBQUMsU0FBUyxFQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9ELElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBQyxJQUFJLENBQUMsUUFBUSxFQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdELElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBQyxJQUFJLENBQUMsUUFBUSxFQUFDLElBQUksQ0FBQyxDQUFDO1lBR2hFLElBQUk7WUFDSixFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBTSxDQUFD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SyxFQUFDLENBQUMsQ0FBQztJQUUvRixDQUFDO0lBbGNnQixjQUFjO1FBRGxDLE9BQU87T0FDYSxjQUFjLENBbWNsQztJQUFELHFCQUFDO0NBbmNELEFBbWNDLENBbmMyQyxFQUFFLENBQUMsU0FBUyxHQW1jdkQ7a0JBbmNvQixjQUFjIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWRQb3NpdGlvbiB9IGZyb20gXCIuLi9jb21tb24vQWRQb3NpdGlvblwiO1xuaW1wb3J0IHsgYnVsbGV0SW5mbywgZ2FtZVN0YXRlLCB0aGluZ1R5cGUsIHR1cnJldEluZm8gfSBmcm9tIFwiLi4vY29tbW9uL2ZhY2VUc1wiO1xuaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi4vY29tbW9uL05hbWVUc1wiO1xuaW1wb3J0IFRyYWNrTWdyIGZyb20gXCIuLi9UcmFja01nci9UcmFja01nclwiO1xuaW1wb3J0IHRvb2wgZnJvbSBcIi4uL3V0aWwvdG9vbFwiO1xuaW1wb3J0IHV0aWwgZnJvbSBcIi4uL3V0aWwvdXRpbFwiO1xuaW1wb3J0IHR1cnJldCBmcm9tIFwiLi90dXJyZXQvdHVycmV0XCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgdHVycmV0RmFjdGlvcnkgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gXG5cbiAgICBpbml0RGF0YTsvL+WIneWni+WMluaVsOaNrlxuXG4gICAgdHVycmV0RGF0YTp0dXJyZXRJbmZvOyAvL+eCruWPsOeahOaVsOaNrlxuXG4gICAgcHJpdmF0ZSBpbml0UG9zOmNjLlZlYzI7Ly/lh7rnlJ/lnKjlk6rph4xcblxuICAgIC8v5pS75Ye755uu5qCHXG4gICAgYXR0YWNrRGF0YTphbnk7XG5cbiAgICAvL+WtkOW8ueWxnuaAp1xuXG4gICAgYnVsbGV0OmJ1bGxldEluZm87XG5cbiAgICAvL+aYr+WQpuWcqOaLv+edgFxuICAgIGlzVG91Y2g6Ym9vbGVhbjtcblxuICAgIC8v54Ku5aS0XG4gICAgcGFvOmNjLk5vZGU7XG5cbiAgICAvL+WtmOWCqOW9k+WJjeebuOWQjOetiee6p+eahOeCruWhlFxuICAgIHNhbWVMZXZlbFR1cnJldDphbnlbXTtcblxuICAgIC8vdG91Y2hpZFxuICAgIHRvdWNoSWQ6bnVtYmVyO1xuXG4gICAgc3RhcnQgKCkge1xuXG4gICAgfVxuXG4gICAgb25Mb2FkKCl7XG4gICAgICAgIC8v6I635Y+W5a2Y5pS+5Zyw5Z2AXG4gICAgICAgIGlmKHRoaXMuaW5pdERhdGEubm8pe1xuICAgICAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULHRoaXMudG91Y2hTdGFydCx0aGlzKTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLHRoaXMudG91Y2hNb3ZlLHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCx0aGlzLnRvdWNoRW5kLHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0NBTkNFTCx0aGlzLnRvdWNoRW5kLHRoaXMpO1xuXG5cbiAgICAgICAgICAgIC8v5ou/6LW3XG4gICAgICAgICAgICBjYy5nYW1lLm9uKE5hbWVUcy5HYW1lX1R1cnJldF9QaWNrVXAsKHJlcyk9PntcbiAgICAgICAgICAgICAgICBpZihyZXMubGV2ZWwgIT09IHRoaXMuaW5pdERhdGEubGV2ZWwpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUub3BhY2l0eSA9IDE1MDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LHRoaXMpO1xuXG4gICAgICAgICAgICAvL+aUvuS4i1xuICAgICAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9UdXJyZXRfUHV0RG93biwocmVzKT0+e1xuICAgICAgICAgICAgICAgIGlmKHJlcy5sZXZlbCAhPT0gdGhpcy5pbml0RGF0YS5sZXZlbCl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gMjU1O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSx0aGlzKTtcblxuICAgICAgICB9XG4gICAgICAgIC8vIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwsdGhpcy50b3VjaEVuZCx0aGlzKTtcbiAgICAgICAgXG4gICAgICAgIC8vIHRoaXMudG91Y2hBcnIgPSBuZXcgTWFwKCk7XG5cbiAgICAgICAgLy/nm5HlkKzor6Xnm67moIfmgKrlhb3mrbvkuqHlkI7ph43orr7lrZDlvLnnm67moIdcbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9Nb25zdGVyX0tpbGxlZCwoZGF0YSk9PntcbiAgICAgICAgICAgIC8v5aaC5p6c5rKh5pyJ55uu5qCH5bCx6YCA5Ye6XG4gICAgICAgICAgICBpZih0aGlzLmJ1bGxldC50YXJnZXRJZD09bnVsbCl7XG4gICAgICAgICAgICAgICAgdGhpcy5hdHRhY2tEYXRhID0gbnVsbDtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGRhdGEuaWQ9PXRoaXMuYnVsbGV0LnRhcmdldElkKXtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1bGxldC50YXJnZXRJZCA9IG51bGw7XG4gICAgICAgICAgICAgICAgdGhpcy5hdHRhY2tEYXRhID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3BBdHRhY2soKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LHRoaXMpO1xuXG4gICAgICAgIFxuXG4gICAgICAgIC8v55uR5ZCs5ri45oiP5pqC5YGcXG4gICAgICAgIGNjLmdhbWUub24oTmFtZVRzLkdhbWVfU3RvcCwoKT0+e1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLnN0b3BBdHRhY2soKTtcblxuICAgICAgICB9LHRoaXMpO1xuXG4gICAgICAgIC8v55uR5ZCs5ri45oiP57un57utXG4gICAgICAgIGNjLmdhbWUub24oTmFtZVRzLkdhbWVfUmVzdW1lLCgpPT57XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMucmVzdW1lQXR0YWNrKCk7XG5cbiAgICAgICAgfSx0aGlzKTtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6Kem56Kw5byA5aeLXG4gICAgICogQHBhcmFtIGV2ZW50IFxuICAgICAqL1xuICAgIHByaXZhdGUgdG91Y2hTdGFydChldmVudCl7XG4gICAgICAgIHRoaXMudG91Y2hJZCA9IGV2ZW50LmdldElEKCk7XG4gICAgICAgIGlmKHV0aWwudG91Y2hJZCYmdXRpbC50b3VjaElkICE9PSB0aGlzLnRvdWNoSWQpe3JldHVybn1cbiAgICAgICAgdXRpbC50b3VjaElkID0gdGhpcy50b3VjaElkO1xuICAgICAgICB0aGlzLlBpY2tVcCgpO1xuICAgICAgICB0aGlzLmlzVG91Y2ggPSB0cnVlO1xuICAgICAgICB0aGlzLm5vZGUuekluZGV4ID0gOTk7XG4gICAgICAgIHRoaXMuYnVsbGV0LnRhcmdldElkID0gbnVsbDtcbiAgICAgICAgdGhpcy5hdHRhY2tEYXRhID0gbnVsbDtcbiAgICAgICAgdGhpcy5zdG9wQXR0YWNrKCk7XG4gICAgICAgIHRoaXMucGFvLmFuZ2xlID0gMDtcbiAgICAgICAgdGhpcy5pbml0UG9zID0gdGhpcy5ub2RlLmdldFBvc2l0aW9uKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6Kem56Kw56e75YqoXG4gICAgICogQHBhcmFtIGV2ZW50IFxuICAgICAqL1xuICAgIHByaXZhdGUgdG91Y2hNb3ZlKGV2ZW50KXtcbiAgICAgICAgaWYodXRpbC50b3VjaElkICE9PSB0aGlzLnRvdWNoSWQpe3JldHVybn1cbiAgICAgICAgbGV0IG1vdmVQb3M6Y2MuVmVjMiA9IGV2ZW50LmdldERlbHRhKCk7XG4gICAgICAgIHRoaXMubm9kZS54ICs9bW92ZVBvcy54O1xuICAgICAgICB0aGlzLm5vZGUueSArPW1vdmVQb3MueTsgXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6Kem56Kw57uT5p2fXG4gICAgICogQHBhcmFtIGV2ZW50IFxuICAgICAqL1xuICAgIHByaXZhdGUgdG91Y2hFbmQoZXZlbnQpe1xuICAgICAgICBpZih1dGlsLnRvdWNoSWQgIT09IHRoaXMudG91Y2hJZCl7cmV0dXJufVxuICAgICAgICB0aGlzLmlzVG91Y2ggPSBmYWxzZTtcbiAgICAgICAgdGhpcy5QdXREb3duKCk7XG4gICAgICAgIHV0aWwudG91Y2hJZCA9IG51bGw7XG4gICAgICAgIHRoaXMuY2Fyc2hQbGFjZSgoKT0+e1xuICAgICAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKHRoaXMuaW5pdFBvcyk7XG4gICAgICAgICAgICB0aGlzLm5vZGUuekluZGV4ID0gMDtcbiAgICAgICAgICAgIC8vIGNjLnR3ZWVuKHRoaXMubm9kZSkudG8oLjIse3g6dGhpcy5pbml0UG9zLngseTp0aGlzLmluaXRQb3MueX0pLmNhbGwoKCk9PntcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIH0pLnN0YXJ0KCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5qOA5p+l6YeM6Z2i5Zyo5ZOq5Liq6YeM6Z2iXG4gICAgICogQHBhcmFtIGNhbGwg5Zue6LCDXG4gICAgICovXG5cbiAgICBjYXJzaFBsYWNlKGNhbGw6RnVuY3Rpb24pe1xuXG4gICAgICAgIGxldCBwb3M6Y2MuVmVjMiA9IHRoaXMubm9kZS5nZXRQb3NpdGlvbigpO1xuXG4gICAgICAgIHV0aWwuY2hlY2tUb3VjaFBvb2wocG9zLChudW0pPT57XG4gICAgICAgICAgICBpZihudW0mJm51bSE9PXRoaXMuaW5pdERhdGEubm8pe1xuICAgICAgICAgICAgICAgIGlmKG51bT09MTAwKXtcbiAgICAgICAgICAgICAgICAgICAgaWYodXRpbC51c2VyRGF0YS5ub3ZpY2VHdWlkZT09Mil7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsKCk7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWN5Y2xlRm4oKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBpZih1dGlsLnVzZXJEYXRhLm5vdmljZUd1aWRlPT0yJiZudW0+Mil7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsKCk7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5HZXRUeXBlKG51bSxjYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGNhbGwoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWIpOaWreaYr+S6pOaNoui/mOaYr+WNh+e6p1xuICAgICAqIEBwYXJhbSBubyDnrKzlh6DkuKpcbiAgICAgKiBAcGFyYW0gY2FsbCDlm57osINcbiAgICAgKi9cbiAgICBHZXRUeXBlKG5vOm51bWJlcixjYWxsOkZ1bmN0aW9uPSgpPT57fSl7XG4gICAgICAgIGlmKCF0aGlzLmluaXREYXRhLm5vfHwhbm8pe1xuICAgICAgICAgICAgY2FsbCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8v6I635Y+W54Ku5Y+w5L2N572u55qE5L2N572uXG4gICAgICAgIGxldCBvdGhlckRhdGEgPSB1dGlsLkdldFBvb2xEYXRhKG5vKTtcbiAgICAgICAgbGV0IG90aGVyUGxhY2VEYXRhID0gdXRpbC5HZXRQbGFjZURhdGEobm8pO1xuICAgICAgICBsZXQgb3RoZXJQb3M6Y2MuVmVjMiA9IGNjLlZlYzIuY2xvbmUob3RoZXJQbGFjZURhdGEucG9zKTtcbiAgICAgICAgaWYob3RoZXJEYXRhLmxldmVsPT0tMSl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaJvuS4quepuuS9jeWdkOS4i1wiKTtcbiAgICAgICAgICAgIGlmKCF1dGlsLmNoZWNrTm9FeGlzdChubykpe1xuICAgICAgICAgICAgICAgIGNhbGwoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuacquino+mUgVwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB1dGlsLnNhdmVQb29sKHRoaXMuaW5pdERhdGEubm8pO1xuICAgICAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKG90aGVyUG9zKTtcbiAgICAgICAgICAgIHV0aWwuc2F2ZVBvb2wobm8sdGhpcy5pbml0RGF0YS5sZXZlbCk7XG4gICAgICAgICAgICAvL+WIoOmZpOS7peWJjeeahFxuICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX1R1cnJldF9LaWxsZWQse25vOnRoaXMuaW5pdERhdGEubm99KTtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTGV2ZWxCZyhubyx0aGlzLmluaXREYXRhLmxldmVsKTtcbiAgICAgICAgICAgIHV0aWwuR2xvYmFsTWFwLmRlbGV0ZShcInR1cnJldF9cIit0aGlzLmluaXREYXRhLm5vKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdERhdGEubm8gPSBubztcbiAgICAgICAgICAgIC8v5pu05paw546w5Zyo55qEXG4gICAgICAgICAgICB1dGlsLkdsb2JhbE1hcC5zZXQoXCJ0dXJyZXRfXCIrbm8sdGhpcy5ub2RlKTtcbiAgICAgICAgICAgIHRoaXMubm9kZS56SW5kZXggPSAwO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IG90aGVyTm9kZTpjYy5Ob2RlID0gdXRpbC5HbG9iYWxNYXAuZ2V0KFwidHVycmV0X1wiK25vKTtcbiAgICAgICAgICAgIC8v5Y2H57qnXG4gICAgICAgICAgICBpZihvdGhlckRhdGEubGV2ZWw9PXRoaXMuaW5pdERhdGEubGV2ZWwpe1xuXG4gICAgICAgICAgICAgICAgaWYoIXV0aWwuY2hlY2tVcGRhdGVMZXZlbCh0aGlzLmluaXREYXRhLmxldmVsKzEpKXtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIuetiee6p+i2hei/h+acgOWkp+etiee6p+S6hiFcIik7XG4gICAgICAgICAgICAgICAgICAgIGNhbGwoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL+WQiOaIkOWlluWKsVxuICAgICAgICAgICAgICAgIGxldCBjb2luOm51bWJlciA9IHV0aWwuR2V0QmVoYXZpb3JSZXdhcmRWbyg1KTtcblxuICAgICAgICAgICAgICAgIGlmKHV0aWwudXNlckRhdGEubm92aWNlR3VpZGUgPT0gMnx8KHV0aWwudXNlckRhdGEubm92aWNlR3VpZGUgPT0gMyYmdXRpbC5jaGVja1Rlc3RCKE5hbWVUcy5uZXdfaGFuZF90ZXN0KSkpe1xuICAgICAgICAgICAgICAgICAgIGxldCBDb2luUGFyZW50OmNjLk5vZGUgPSBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpLmdldENoaWxkQnlOYW1lKCdDYW52YXMnKTtcbiAgICAgICAgICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfRWZmZWN0X2NvaW4se25vZGU6dGhpcy5ub2RlLHZhbHVlOmNvaW4sbnVtOjUscGFyZW50OkNvaW5QYXJlbnR9KTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX0VmZmVjdF9jb2luLHtub2RlOnRoaXMubm9kZSx2YWx1ZTpjb2luLG51bTo1fSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHV0aWwuYWRkVGVybUNvaW4oY29pbik7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdXRpbC51c2VyRGF0YS5jb21wb3VuZFRpbWVzKz0xO1xuICAgICAgICAgICAgICAgIHV0aWwudXNlckRhdGEubG9jYWxDb21wb3VuZFRpbWUrPTE7XG4gICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX1Rhc2tfdXBkYXRhKTtcbiAgICAgICAgICAgICAgICB1dGlsLnVzZXJEYXRhLnN5bnRoZXNpc190aW1lcys9MTtcbiAgICAgICAgICAgICAgICB1dGlsLnVzZXJEYXRhLnN5bnRoZXNpc19BbGwrPTE7XG4gICAgICAgICAgICAgICAgdXRpbC5zYXZlUG9vbCh0aGlzLmluaXREYXRhLm5vLG51bGwpO1xuICAgICAgICAgICAgICAgIGxldCBwb3M6Y2MuVmVjMiA9IGNjLlZlYzIuY2xvbmUob3RoZXJQb3MpO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbihwb3MpO1xuICAgICAgICAgICAgICAgIG90aGVyTm9kZS56SW5kZXggPSB0aGlzLm5vZGUuekluZGV4ID0gOTk7XG4gICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX1R1cnJldF9LaWxsZWQse25vfSk7XG4gICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX1R1cnJldF9LaWxsZWQse25vOnRoaXMuaW5pdERhdGEubm99KTtcbiAgICAgICAgICAgICAgICBjYy50d2VlbihvdGhlck5vZGUpLmJ5KC4xLHt4OjUwfSkuYnkoLjEse3g6LTUwfSkuY2FsbCgoKT0+e1xuICAgICAgICAgICAgICAgICAgICBvdGhlck5vZGUuekluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX1R1cnJldF9LaWxsZWQse25vZGU6b3RoZXJOb2RlLG5vOm51bGx9KTtcbiAgICAgICAgICAgICAgICB9KS5zdGFydCgpO1xuICAgICAgICAgICAgICAgIC8v5Yig6Zmk5Lul5YmN55qEXG4gICAgICAgICAgICAgICAgdXRpbC5HbG9iYWxNYXAuZGVsZXRlKFwidHVycmV0X1wiK3RoaXMuaW5pdERhdGEubm8pO1xuICAgICAgICAgICAgICAgIC8v5pu05paw546w5Zyo55qEXG4gICAgICAgICAgICAgICAgdXRpbC5HbG9iYWxNYXAuc2V0KFwidHVycmV0X1wiK25vLHRoaXMubm9kZSk7XG4gICAgICAgICAgICAgICAgdGhpcy51cExldmVsKG5vKTtcbiAgICAgICAgICAgICAgICBjYy50d2Vlbih0aGlzLm5vZGUpLmJ5KC4xLHt4Oi01MH0pLmJ5KC4xLHt4OjUwfSkuY2FsbCgoKT0+e1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuekluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICB9KS5zdGFydCgpO1xuXG4gICAgICAgICAgICAgICAgLy/pooTliqDovb3op6PplIHngq7loZTkv6Hmga/mtYFcbiAgICAgICAgICAgICAgICAvLyBpZighdXRpbC5hZFByZU9ialtBZFBvc2l0aW9uLlVubGNva1R1cnJldFZpZXddJiZ1dGlsLmNoZWtQb29sSGF2ZVR3bygpKXtcbiAgICAgICAgICAgICAgICAvLyAgICAgdXRpbC5wcmVsb2FkQWQoQWRQb3NpdGlvbi5Vbmxjb2tUdXJyZXRWaWV3LHRydWUpO1xuICAgICAgICAgICAgICAgIC8vIH1cblxuICAgICAgICAgICAgfWVsc2V7IC8v5Lqk5o2iXG4gICAgICAgICAgICAgICAgbGV0IHNlbGZObzpudW1iZXIgPSB0aGlzLmluaXREYXRhLm5vO1xuICAgICAgICAgICAgICAgIGxldCBzZWxmUGxhY2VEYXRhID0gdXRpbC5HZXRQbGFjZURhdGEoc2VsZk5vKTtcbiAgICAgICAgICAgICAgICBsZXQgc2VsZlBvczpjYy5WZWMyID0gY2MuVmVjMi5jbG9uZShzZWxmUGxhY2VEYXRhLnBvcyk7XG4gICAgICAgICAgICAgICAgLy/kuqTmjaLkvY3nva5cbiAgICAgICAgICAgICAgICBvdGhlck5vZGUuc2V0UG9zaXRpb24oc2VsZlBvcy54LHNlbGZQb3MueSk7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKG90aGVyUG9zLngsb3RoZXJQb3MueSk7XG4gICAgICAgICAgICAgICAgLy/kv53lrZjmlbDmja5cbiAgICAgICAgICAgICAgICB1dGlsLnNhdmVQb29sKHNlbGZObyxvdGhlckRhdGEubGV2ZWwpO1xuICAgICAgICAgICAgICAgIHV0aWwuc2F2ZVBvb2wobm8sdGhpcy5pbml0RGF0YS5sZXZlbCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy/kv67mlLnkvY3nva5ub1xuICAgICAgICAgICAgICAgIG90aGVyTm9kZS5nZXRDb21wb25lbnQoXCJ0dXJyZXRcIikuaW5pdERhdGEubm8gPSBzZWxmTm87XG4gICAgICAgICAgICAgICAgdGhpcy5pbml0RGF0YS5ubyA9IG5vO1xuICAgICAgICAgICAgICAgIC8v5Yig6Zmk5Lul5YmN55qEXG4gICAgICAgICAgICAgICAgdXRpbC5HbG9iYWxNYXAuc2V0KFwidHVycmV0X1wiK3NlbGZObyxvdGhlck5vZGUpO1xuICAgICAgICAgICAgICAgIC8v5pu05paw546w5Zyo55qEXG4gICAgICAgICAgICAgICAgdXRpbC5HbG9iYWxNYXAuc2V0KFwidHVycmV0X1wiK25vLHRoaXMubm9kZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnpJbmRleCA9IG90aGVyTm9kZS56SW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8v5Yig6Zmk5Lul5YmN55qEXG4gICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX1R1cnJldF9LaWxsZWQse25vOnRoaXMuaW5pdERhdGEubm99KTtcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUxldmVsQmcobm8sb3RoZXJEYXRhLmxldmVsKTtcbiAgICAgICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfVHVycmV0X0tpbGxlZCx7bm86c2VsZk5vfSk7XG4gICAgICAgICAgICAgICAgb3RoZXJOb2RlLmdldENvbXBvbmVudChcInR1cnJldFwiKS5jcmVhdGVMZXZlbEJnKHNlbGZObyx0aGlzLmluaXREYXRhLmxldmVsKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKirorr7nva7lkI3lrZcgKi9cbiAgICBzZXROYW1lKCkge31cblxuICAgIC8qKuiuvue9ruaVsOaNriAqL1xuICAgIHNldERhdGEoZGF0YSl7XG4gICAgICAgIHRoaXMuaW5pdChkYXRhKTtcbiAgICB9XG4gICAgaW5pdChkYXRhKXt9O1xuXG4gICAgLyoqXG4gICAgICog5Y2H57qnXG4gICAgICovXG4gICAgdXBMZXZlbChubyl7fVxuXG4gICAgLyoq55uR5ZCs5piv5ZCm5pyJ5oCqICovXG4gICAgdXBkYXRlKGR0KXtcbiAgICAgICAgaWYodXRpbC5sZXZlbFN0YXRlICE9PSBnYW1lU3RhdGUuc3RhcnQpcmV0dXJuXG4gICAgICAgIC8v5aaC5p6c5pyJ5bCx6YCA5Ye6XG4gICAgICAgIGlmKHRoaXMuaXNUb3VjaClyZXR1cm47XG4gICAgICAgIGxldCBwb3M6Y2MuVmVjMiA9IHRoaXMubm9kZS5nZXRQb3NpdGlvbigpO1xuICAgICAgICBpZih0aGlzLmF0dGFja0RhdGEpe1xuICAgICAgICAgICAgdGhpcy5zZXRQYW8oKTtcbiAgICAgICAgICAgIGlmKHRoaXMuYXR0YWNrRGF0YSYmdGhpcy5hdHRhY2tEYXRhLmlzQ2xvc2Upe1xuICAgICAgICAgICAgICAgIGlmKHV0aWwuY2hlY2tNb25zdGVyQ2xvc2Uoe3BvcyxpZDp0aGlzLmF0dGFja0RhdGEuaWQsZGlzdGFuY2VOdW06dGhpcy5pbml0RGF0YS5ubz8yNTA6Mzc1fSkpcmV0dXJuO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgbGV0IG5ld0RhdGEgPSB1dGlsLmdldENsb3NlTW9uc3Rlcihwb3MsdGhpcy5pbml0RGF0YS5ubz8yNTA6Mzc1KTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmF0dGFja0RhdGEmJm5ld0RhdGEuaWQgPT0gdGhpcy5hdHRhY2tEYXRhLmlkKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmF0dGFja0ZuKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuYXR0YWNrRGF0YSA9IHV0aWwuZ2V0Q2xvc2VNb25zdGVyKHBvcyx0aGlzLmluaXREYXRhLm5vPzI1MDozNzUpO1xuXG4gICAgICAgIGlmKCF0aGlzLmF0dGFja0RhdGEpcmV0dXJuO1xuICAgICAgICB0aGlzLmJ1bGxldC50YXJnZXRJZCA9IHRoaXMuYXR0YWNrRGF0YS5pZDtcbiAgICAgICAgdGhpcy5hdHRhY2tGbigpO1xuXG4gICAgfVxuXG4gICAgLyoq6K6+572u55uu5qCHICovXG4gICAgc2V0VGFyZ2V0KCl7XG5cbiAgICAgICAgXG5cbiAgICB9XG4gICAgXG4gICAgLyoqXG4gICAgICog5pS75Ye7XG4gICAgICovXG4gICAgYXR0YWNrRm4oKXt9XG5cbiAgICAvKipcbiAgICAgKiDlm57mlLZcbiAgICAgKi9cbiAgICByZWN5Y2xlRm4oKXtcblxuICAgICAgICB1dGlsLnNhdmVQb29sKHRoaXMuaW5pdERhdGEubm8sbnVsbCk7XG4gICAgICAgIHV0aWwuR2xvYmFsTWFwLmRlbGV0ZShcInR1cnJldF9cIit0aGlzLmluaXREYXRhLm5vKTtcbiAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX1R1cnJldF9LaWxsZWQse25vZGU6dGhpcy5ub2RlLG5vOnRoaXMuaW5pdERhdGEubm99KTtcbiAgICAgICAgVHJhY2tNZ3IuQXBwQ2xpY2soe1xuICAgICAgICAgICAgYXBwX3BhZ2VfdGl0bGU6IFwi6aaW6aG1XCIsXG4gICAgICAgICAgICBhcHBfY2tfbW9kdWxlOiBcIuWbnuaUtueCruWhlFwiLFxuICAgICAgICAgICAgYXBwX2V4cG9zdXJlX3R5cGU6IFwiYmFubmVyXCIsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaLv+i1t1xuICAgICAqL1xuXG4gICAgUGlja1VwKCl7XG5cbiAgICAgICAgLy/nm7jlkIznrYnnuqfnmoTngq7lj7DmlbDmja5cbiAgICAgICAgLy8gdGhpcy5zYW1lTGV2ZWxUdXJyZXQgPSB1dGlsLmdldFBvb2xTYW1lTGV2ZWxUdXJyZXQodGhpcy5pbml0RGF0YS5sZXZlbClcbiAgICAgICAgdGhpcy5zYW1lTGV2ZWxUdXJyZXQgPSB1dGlsLmdldFBvb2xTYW1lTGV2ZWxUdXJyZXQodGhpcy5pbml0RGF0YS5sZXZlbClcbiAgICAgICAgaWYodGhpcy5zYW1lTGV2ZWxUdXJyZXQpe1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDtpPHRoaXMuc2FtZUxldmVsVHVycmV0Lmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9TYW1lX1BsYWNlX1BpY2tVcCx7aWQ6dGhpcy5zYW1lTGV2ZWxUdXJyZXRbaV0ubm99KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9UdXJyZXRfUGlja1VwLHtpZDp0aGlzLmluaXREYXRhLm5vLGxldmVsOnRoaXMuaW5pdERhdGEubGV2ZWwsaG9zdDp0aGlzLmluaXREYXRhLm5vfSk7XG5cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaUvuS4i1xuICAgICAqL1xuXG4gICAgUHV0RG93bigpe1xuXG4gICAgICAgIC8vIHRoaXMuc2FtZUxldmVsVHVycmV0LmZvckVhY2goKGl0ZW06YW55KT0+e1xuXG5cbiAgICAgICAgLy8gfSk7XG5cbiAgICAgICAgaWYodGhpcy5zYW1lTGV2ZWxUdXJyZXQpe1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDtpPHRoaXMuc2FtZUxldmVsVHVycmV0Lmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9TYW1lX1BsYWNlX1B1dERvd24se2lkOnRoaXMuc2FtZUxldmVsVHVycmV0W2ldLm5vfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9UdXJyZXRfUHV0RG93bix7aWQ6dGhpcy5pbml0RGF0YS5ubyxsZXZlbDp0aGlzLmluaXREYXRhLmxldmVsfSk7XG5cbiAgICAgICAgdGhpcy5zYW1lTGV2ZWxUdXJyZXQgPSBudWxsO1xuXG4gICAgfVxuICAgIC8qKuS4pOeCueinkuW6piAqL1xuICAgIEdldEFuZ2xlKCk6bnVtYmVye1xuXG4gICAgICAgIGxldCBtb25zZXRyTmFtZSA9IHV0aWwudXNlckRhdGEuY3VzdG9tcy5iaWcrXCItXCIrdXRpbC51c2VyRGF0YS5jdXN0b21zLnNtYWxsK1wiX01vbnN0ZXJfXCIrdGhpcy5idWxsZXQudGFyZ2V0SWQ7XG4gICAgICAgIGxldCB0YXJnZXROb2RlOmNjLk5vZGU9IHV0aWwuTW9uc3Rlck1hcC5nZXQobW9uc2V0ck5hbWUpO1xuXG4gICAgICAgIGlmKCF0YXJnZXROb2RlKXtcbiAgICAgICAgICAgIHRoaXMuYnVsbGV0LnRhcmdldElkID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuYXR0YWNrRGF0YSA9IG51bGw7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgbGV0IHRhcmdldFBvczpjYy5WZWMyID0gY2MuVmVjMi5jbG9uZSh0YXJnZXROb2RlLmdldFBvc2l0aW9uKCkpO1xuXG4gICAgICAgIHRhcmdldFBvcyA9IHRhcmdldE5vZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUih0YXJnZXRQb3MpO1xuICAgICAgICB0YXJnZXRQb3MgPSB0aGlzLm5vZGUucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHRhcmdldFBvcyk7XG5cbiAgICAgICAgbGV0IGFuZ2xlOm51bWJlciA9IHRvb2wuR2V0UG9zQW5nbGUodGhpcy5idWxsZXQuaW5pdFBvcyx0YXJnZXRQb3MpO1xuXG4gICAgICAgIFxuICAgICAgIFxuICAgICAgICByZXR1cm4gYW5nbGU7XG4gICAgfVxuXG4gICAgLyoq6K6+572u54Ku5aGU6KeS5bqmICovXG4gICAgc2V0UGFvKCl7fTtcblxuICAgIC8qKuWBnOatouaUu+WHuyAqL1xuICAgIHN0b3BBdHRhY2soKXt9XG4gICAgLyoq5oGi5aSN5pS75Ye7ICovXG4gICAgcmVzdW1lQXR0YWNrKCl7fVxuXG4gICAgLyoqXG4gICAgICog5Yqg6L295Zu+54mHXG4gICAgICovXG4gICAgbG9hZFNwaW5lKHNwaW5lOnNwLlNrZWxldG9uLG5hbWU6c3RyaW5nKXtcbiAgICAgICAgbGV0IG1vdXRoTmFtZTpzdHJpbmcgPSB0aGlzLnR1cnJldERhdGEubW91dGhOYW1lO1xuICAgICAgICBjYy5yZXNvdXJjZXMubG9hZChcInNwaW5lL3R1cnJldC9cIit0aGlzLnR1cnJldERhdGEuRHluYW1pY1Jlc291cmNlcytcIi9cIituYW1lK1wiL1wiKyhuYW1lPT1cIm1vdXRoXCI/bW91dGhOYW1lOnRoaXMudHVycmV0RGF0YS5zcGluZU5hbWUpLHNwLlNrZWxldG9uRGF0YSwgKGVycm9yLCBzcDpzcC5Ta2VsZXRvbkRhdGEpID0+IHtcbiAgICAgICAgICAgIHNwaW5lLnNrZWxldG9uRGF0YSA9IHNwO1xuICAgICAgICAgICAgc3BpbmUuc2V0QW5pbWF0aW9uKDAsXCJhbmltYXRpb25cIixmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWIm+W7uuetiee6p+iDjOaZr+adv1xuICAgICAqL1xuICAgIGNyZWF0ZUxldmVsQmcobm86bnVtYmVyLGxldmVsOm51bWJlcil7XG4gICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9MZXZlbEJnX0NyZWF0b3Ise25vZGU6dGhpcy5ub2RlLG5vfSk7XG4gICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9MZXZlbExhYmVsX0NyZWF0b3Ise25vZGU6dGhpcy5ub2RlLG5vLGxldmVsOnRoaXMuaW5pdERhdGEubGV2ZWx9KTtcblxuICAgIH1cbn1cbiJdfQ==