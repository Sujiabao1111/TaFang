"use strict";
cc._RF.push(module, '1c417QJ5ZJKWpocjk+K8cdD', 'CanvasController');
// Script/CanvasController.ts

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
var baseTs_1 = require("./base/baseTs");
var jsonSingleton_1 = require("./base/jsonSingleton");
var faceTs_1 = require("./common/faceTs");
var NameTs_1 = require("./common/NameTs");
var ModelTip_1 = require("./model/ModelTip");
var PageManage_1 = require("./PageManage");
var UrlConst_1 = require("./server/UrlConst");
var XMSDK_1 = require("./server/xmsdk_cocos/XMSDK");
var soundController_1 = require("./soundController");
var util_1 = require("./util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var CanvasController = /** @class */ (function (_super) {
    __extends(CanvasController, _super);
    function CanvasController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.BaseBox = null;
        _this.UiBox = null;
        _this.EffectBox = null;
        _this.PopBox = null;
        _this.modelTip = null;
        _this.PropBox = null;
        _this.loadPage = null;
        _this.noLine = null;
        _this.mapdata = null;
        _this.jinqule = false;
        return _this;
        // update (dt) {}
    }
    //更-多-源-码-联-系-Q:30-387-459-55
    CanvasController.prototype.onLoad = function () {
        // cc.macro.CLEANUP_IMAGE_CACHE = false;
        // cc.dynamicAtlasManager.enabled = true;
        // cc.dynamicAtlasManager.showDebug(true);
        var _this = this;
        cc.director.on(NameTs_1.default.Show_Toast, function (res) {
            if (_this.modelTip) {
                var modelTipTs = _this.modelTip.getComponent(ModelTip_1.default);
                modelTipTs.showMessage(res);
            }
        }, this);
        cc.game.on(NameTs_1.default.Close_LoadPage, function (res) {
            _this.loadPage.active = false;
        }, this);
        XMSDK_1.default.initialize();
        util_1.default.inidata();
        this.loadingJson();
        jsonSingleton_1.default.singleton.jsonData[NameTs_1.default.gkData] = this.mapdata.json;
        this.getAllLocalStorage();
        util_1.default.userData.offlineIncome = {
            reward: 0,
            multipleReward: 0
        };
        var dds = [];
        dds.forEach(function (element) {
            util_1.default.userData.prop[element.propId - 1].num = element.propNum;
        });
        // util.userData.prop = res;
        console.log(dds, '用户背包');
        //进度数据
        var propdata = [{ "type": "1", "name": "冰冻", "explain": "冰冻怪物\n10s", "time": "10", "level": "1" }, { "type": "2", "name": "电击", "explain": "怪物接受额外伤害+20", "time": "3", "level": "1" }, { "type": "3", "name": "护罩", "explain": "保护水晶塔\n30s", "time": "30", "level": "25" }, { "type": "4", "name": "清屏", "explain": "消灭所有怪兽", "time": "0", "level": "45" }, { "type": "5", "name": "自动合成", "explain": "炮塔自动合成\n30s", "time": "30", "level": "5" }, { "type": "6", "name": "增能", "explain": "炮塔攻击力X2\n20s", "time": "20", "level": "1" }];
        var ab_test = [{ "lock_turret_test": { "A": "true", "B": "true" } }, { "heaven_coin_test": { "A": "true", "B": "true" } }, { "new_hand_test": { "A": "true", "B": "true" } }];
        if (propdata) {
            util_1.default.propConfig = propdata;
            //console.log("道具详细说明",util.propConfig);
        }
        util_1.default.online_time = 10 * 60;
        if (ab_test) {
            var test = ab_test;
            for (var i = 0; i < test.length; i++) {
                var key = Object.keys(test[i])[0];
                util_1.default.AB_Test[key] = test[i][key];
            }
        }
        //初始化一些数据
        util_1.default.userData.airborneCount = 15;
        if (util_1.default.userData.noviceGuide == 1 && util_1.default.userData.newUser == true) {
            util_1.default.userData.product = 40;
        }
        if (util_1.default.userData.turretLevel > 1) {
            util_1.default.userData.noviceGuide = -1;
            util_1.default.setStorage(util_1.default.localDiary.noviceGuide, -1);
        }
        util_1.default.behaviorRewardVoList = [{ "type": 1, "reward": 50 }, { "type": 2, "reward": 4 }, { "type": 4, "reward": 75 }, { "type": 5, "reward": 50 }];
        util_1.default.mapConfig = util_1.default.getMapdata(util_1.default.userData.customs.big);
        util_1.default.propConfig = null;
        this.jinqule = true;
        util_1.default.iphoneXTop = XMSDK_1.default.getLiuHaiHeight();
    };
    /**
     * 获取本地数据
     */
    CanvasController.prototype.getAllLocalStorage = function () {
        for (var key in util_1.default.localDiary) {
            var value = util_1.default.getStorage(key);
            if (value) {
                util_1.default.userData[key] = value;
            }
        }
    };
    CanvasController.prototype.start = function () {
        var _this = this;
        XMSDK_1.default.finishCocosLaunch();
        this.scheduleOnce(function () {
            if (!_this.jinqule && _this.noLine) {
                _this.noLine.active = true;
            }
        }, 30);
    };
    /**
     * 加载json
     */
    CanvasController.prototype.loadingJson = function () {
        var _this = this;
        jsonSingleton_1.default.singleton.loadJson(util_1.default.jsonArr, function () {
            _this.loadingPage();
        });
    };
    /**
     * 加载场景页面
     */
    CanvasController.prototype.loadingPage = function () {
        var _this = this;
        this.loadAny("prefab/view/game", cc.Prefab, function (prefab) {
            var item = cc.instantiate(prefab);
            item.setParent(_this.BaseBox);
        });
        this.loadAny("prefab/view/ui", cc.Prefab, function (prefab) {
            var item = cc.instantiate(prefab);
            item.setParent(_this.UiBox);
        });
        // this.loadAny("prefab/view/propContent", cc.Prefab, (prefab) => {
        //     let item: cc.Node = cc.instantiate(prefab);
        //     item.setParent(this.PropBox);
        // });
        //初始化弹窗
        PageManage_1.default.singleton = new PageManage_1.default();
        PageManage_1.default.singleton.parent = this.PopBox;
        if (soundController_1.default || !soundController_1.default.singleton) {
            soundController_1.default.singleton = new soundController_1.default();
        }
        if (!cc.sys.isNative) {
            soundController_1.default.isPlayMusic = true;
            soundController_1.default.singleton.playBGM();
        }
    };
    /**
     * 拉去用户数据
     * @param call 回调
     */
    CanvasController.prototype.initUser = function (call) {
        var _this = this;
        XMSDK_1.default.post({
            url: UrlConst_1.UrlConst.gameInfoIndex,
            onSuccess: function (res) {
                var data = res.data;
                var goldPoint = data.goldPoint;
                _this.initUserData(call);
            },
            onFail: function (err) {
            }
        });
    };
    CanvasController.prototype.initUserData = function (call) {
        XMSDK_1.default.getdataStr({
            url: UrlConst_1.UrlConst.gameLevelIndex,
            onSuccess: function (res) {
                console.log("请求成功gameLevelIndex", res);
                if (res.code === 0 && res.data) {
                    var data = res.data;
                    var userGameMapSnapShotVO = data.userGameMapSnapShotVO;
                    if (data.leftTime !== 0) {
                        util_1.default.doubleEarn.use = faceTs_1.propState.start;
                        util_1.default.doubleEarn.time = Number(data.leftTime);
                    }
                    //util.userData.customs.big = data.level + 1;
                    util_1.default.userData.newUser = userGameMapSnapShotVO.newUser;
                    util_1.default.userData.turretLevel = userGameMapSnapShotVO.userBatteryDTO.highestLevel;
                    if (userGameMapSnapShotVO.userMapDetail == null) {
                        util_1.default.initPool();
                    }
                    else {
                        util_1.default.userData.pool = userGameMapSnapShotVO.userMapDetail;
                        util_1.default.repairPool();
                    }
                    /* util.userData.product = userGameMapSnapShotVO.userBatteryDTO.num;
 
                     if (util.userData.noviceGuide == 1 && util.userData.newUser == true) {
                         util.userData.product = 40;
                     }*/
                    if (util_1.default.userData.turretLevel > 1) {
                        util_1.default.userData.noviceGuide = -1;
                        util_1.default.setStorage(util_1.default.localDiary.noviceGuide, -1);
                    }
                    util_1.default.behaviorRewardVoList = data.behaviorRewardVoList;
                    util_1.default.mapConfig = data.mapConfig;
                    // util.userData.customs.small = util.mapConfig.length-1;
                    // util.gameLevelPassRewardVoList.push({
                    //     rewardType: 2,
                    //     rewardValue: tool.GetArrData("type", 4, data.behaviorRewardVoList).reward
                    // });
                    // util.gameLevelPassRewardVoList = tool.GetArrData("type", 4, data.behaviorRewardVoList).reward;
                    util_1.default.userData.version = userGameMapSnapShotVO.version;
                    console.log(util_1.default.userData, ' userData');
                    call && call();
                }
                else {
                }
            },
            onFail: function (err) {
            }
        });
    };
    /**
     * 重新加载场景
     */
    CanvasController.prototype.AgainScene = function () {
        cc.director.loadScene("game");
    };
    __decorate([
        property({ type: cc.Node, displayName: "基础位置" })
    ], CanvasController.prototype, "BaseBox", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "Ui位置" })
    ], CanvasController.prototype, "UiBox", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "特效位置" })
    ], CanvasController.prototype, "EffectBox", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "弹窗位置" })
    ], CanvasController.prototype, "PopBox", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "toast弹窗" })
    ], CanvasController.prototype, "modelTip", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "道具位置" })
    ], CanvasController.prototype, "PropBox", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "加载页" })
    ], CanvasController.prototype, "loadPage", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "网络失败" })
    ], CanvasController.prototype, "noLine", void 0);
    __decorate([
        property({ type: cc.JsonAsset, displayName: "关卡数据" })
    ], CanvasController.prototype, "mapdata", void 0);
    CanvasController = __decorate([
        ccclass
    ], CanvasController);
    return CanvasController;
}(baseTs_1.default));
exports.default = CanvasController;

cc._RF.pop();