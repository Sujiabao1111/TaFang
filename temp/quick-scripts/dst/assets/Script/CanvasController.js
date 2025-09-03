
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/CanvasController.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxDYW52YXNDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLHdDQUFtQztBQUNuQyxzREFBaUQ7QUFFakQsMENBQTRDO0FBQzVDLDBDQUFxQztBQUNyQyw2Q0FBd0M7QUFDeEMsMkNBQXNDO0FBQ3RDLDhDQUE2QztBQUc3QyxvREFBK0M7QUFDL0MscURBQWdEO0FBRWhELG9DQUErQjtBQUd6QixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUE4QyxvQ0FBTTtJQUFwRDtRQUFBLHFFQTBUQztRQXRURyxhQUFPLEdBQVksSUFBSSxDQUFDO1FBR3hCLFdBQUssR0FBWSxJQUFJLENBQUM7UUFHdEIsZUFBUyxHQUFZLElBQUksQ0FBQztRQUcxQixZQUFNLEdBQVksSUFBSSxDQUFDO1FBR3ZCLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFHekIsYUFBTyxHQUFZLElBQUksQ0FBQztRQUd4QixjQUFRLEdBQVksSUFBSSxDQUFDO1FBR3pCLFlBQU0sR0FBWSxJQUFJLENBQUM7UUFHekIsYUFBTyxHQUFpQixJQUFJLENBQUM7UUFHbkIsYUFBTyxHQUFXLEtBQUssQ0FBQzs7UUEwUmhDLGlCQUFpQjtJQUNyQixDQUFDO0lBMVJELDZCQUE2QjtJQUN6QixpQ0FBTSxHQUFOO1FBRUksd0NBQXdDO1FBQ3hDLHlDQUF5QztRQUN6QywwQ0FBMEM7UUFKOUMsaUJBbUdDO1FBN0ZHLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLGdCQUFNLENBQUMsVUFBVSxFQUFFLFVBQUEsR0FBRztZQUNqQyxJQUFJLEtBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2YsSUFBSSxVQUFVLEdBQWEsS0FBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsa0JBQVEsQ0FBQyxDQUFDO2dCQUNoRSxVQUFV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b290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBidG4gZnJvbSBcIi4uL3ByZWZhYi90b29sL3NjcmlwdC9idG5cIjtcbmltcG9ydCB7IEFzc2lzdEN0ciB9IGZyb20gXCIuL0Fzc2lzdC9Bc3Npc3RDdHJcIjtcbmltcG9ydCBiYXNlVHMgZnJvbSBcIi4vYmFzZS9iYXNlVHNcIjtcbmltcG9ydCBqc29uU2luZ2xldG9uIGZyb20gXCIuL2Jhc2UvanNvblNpbmdsZXRvblwiO1xuaW1wb3J0IHsgQWRQb3NpdGlvbiB9IGZyb20gXCIuL2NvbW1vbi9BZFBvc2l0aW9uXCI7XG5pbXBvcnQgeyBwcm9wU3RhdGUgfSBmcm9tIFwiLi9jb21tb24vZmFjZVRzXCI7XG5pbXBvcnQgTmFtZVRzIGZyb20gXCIuL2NvbW1vbi9OYW1lVHNcIjtcbmltcG9ydCBNb2RlbFRpcCBmcm9tIFwiLi9tb2RlbC9Nb2RlbFRpcFwiO1xuaW1wb3J0IFBhZ2VNYW5hZ2UgZnJvbSBcIi4vUGFnZU1hbmFnZVwiO1xuaW1wb3J0IHsgVXJsQ29uc3QgfSBmcm9tIFwiLi9zZXJ2ZXIvVXJsQ29uc3RcIjtcbmltcG9ydCBBZENvbnRyb2xsZXIgZnJvbSBcIi4vc2VydmVyL3htc2RrX2NvY29zL0FEL0FkQ29udHJvbGxlclwiO1xuaW1wb3J0IHsgQXBwSW5mbyB9IGZyb20gXCIuL3NlcnZlci94bXNka19jb2Nvcy9Db25maWcvQXBwSW5mb1wiO1xuaW1wb3J0IFhNU0RLIGZyb20gXCIuL3NlcnZlci94bXNka19jb2Nvcy9YTVNES1wiO1xuaW1wb3J0IHNvdW5kQ29udHJvbGxlciBmcm9tIFwiLi9zb3VuZENvbnRyb2xsZXJcIjtcbmltcG9ydCB0b29sIGZyb20gXCIuL3V0aWwvdG9vbFwiO1xuaW1wb3J0IHV0aWwgZnJvbSBcIi4vdXRpbC91dGlsXCI7XG5cblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbnZhc0NvbnRyb2xsZXIgZXh0ZW5kcyBiYXNlVHMge1xuXG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5Ob2RlLCBkaXNwbGF5TmFtZTogXCLln7rnoYDkvY3nva5cIiB9KVxuICAgIEJhc2VCb3g6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTm9kZSwgZGlzcGxheU5hbWU6IFwiVWnkvY3nva5cIiB9KVxuICAgIFVpQm94OiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLk5vZGUsIGRpc3BsYXlOYW1lOiBcIueJueaViOS9jee9rlwiIH0pXG4gICAgRWZmZWN0Qm94OiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLk5vZGUsIGRpc3BsYXlOYW1lOiBcIuW8ueeql+S9jee9rlwiIH0pXG4gICAgUG9wQm94OiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLk5vZGUsIGRpc3BsYXlOYW1lOiBcInRvYXN05by556qXXCIgfSlcbiAgICBtb2RlbFRpcDogY2MuTm9kZSA9IG51bGw7XG4gICAgXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTm9kZSwgZGlzcGxheU5hbWU6IFwi6YGT5YW35L2N572uXCIgfSlcbiAgICBQcm9wQm94OiBjYy5Ob2RlID0gbnVsbDtcbiAgICBcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5Ob2RlLCBkaXNwbGF5TmFtZTogXCLliqDovb3pobVcIiB9KVxuICAgIGxvYWRQYWdlOiBjYy5Ob2RlID0gbnVsbDtcbiAgICBcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5Ob2RlLCBkaXNwbGF5TmFtZTogXCLnvZHnu5zlpLHotKVcIiB9KVxuICAgIG5vTGluZTogY2MuTm9kZSA9IG51bGw7XG5cblx0IEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkpzb25Bc3NldCwgZGlzcGxheU5hbWU6IFwi5YWz5Y2h5pWw5o2uXCIgfSlcblx0IG1hcGRhdGE6IGNjLkpzb25Bc3NldCA9IG51bGw7XG5cdFxuXG4gICAgcHJpdmF0ZSBqaW5xdWxlOmJvb2xlYW4gPSBmYWxzZTtcbi8v5pu0LeWkmi3mupAt56CBLeiBlC3ns7stUTozMC0zODctNDU5LTU1XG4gICAgb25Mb2FkKCkge1xuXG4gICAgICAgIC8vIGNjLm1hY3JvLkNMRUFOVVBfSU1BR0VfQ0FDSEUgPSBmYWxzZTtcbiAgICAgICAgLy8gY2MuZHluYW1pY0F0bGFzTWFuYWdlci5lbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgLy8gY2MuZHluYW1pY0F0bGFzTWFuYWdlci5zaG93RGVidWcodHJ1ZSk7XG5cbiAgICAgICAgY2MuZGlyZWN0b3Iub24oTmFtZVRzLlNob3dfVG9hc3QsIHJlcyA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5tb2RlbFRpcCkge1xuICAgICAgICAgICAgICAgIGxldCBtb2RlbFRpcFRzOiBNb2RlbFRpcCA9IHRoaXMubW9kZWxUaXAuZ2V0Q29tcG9uZW50KE1vZGVsVGlwKTtcbiAgICAgICAgICAgICAgICBtb2RlbFRpcFRzLnNob3dNZXNzYWdlKHJlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sdGhpcyk7XG5cbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuQ2xvc2VfTG9hZFBhZ2UscmVzPT57XG4gICAgICAgICAgICB0aGlzLmxvYWRQYWdlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9LHRoaXMpO1xuXG4gICAgICAgIFhNU0RLLmluaXRpYWxpemUoKTtcblx0XHR1dGlsLmluaWRhdGEoKVxuXHRcdHRoaXMubG9hZGluZ0pzb24oKTtcblx0XHRqc29uU2luZ2xldG9uLnNpbmdsZXRvbi5qc29uRGF0YVtOYW1lVHMuZ2tEYXRhXSA9IHRoaXMubWFwZGF0YS5qc29uO1xuICAgICAgICB0aGlzLmdldEFsbExvY2FsU3RvcmFnZSgpOyAgICAgICAgXG5cdFx0XG5cdFx0XG5cdFx0XG5cdFx0XG5cdFx0IHV0aWwudXNlckRhdGEub2ZmbGluZUluY29tZSA9e1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV3YXJkOjAsXG4gICAgICAgICAgICAgICAgICAgICAgICBtdWx0aXBsZVJld2FyZDowXG4gICAgICAgICAgICAgICAgICAgIH0gXG5cdFx0XG5cdFx0XG5cdFx0XG5cdFxuXHRcdFx0XHRcdGxldCBkZHMgPSBbXVxuICAgICAgICAgICAgICAgICAgICBkZHMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwudXNlckRhdGEucHJvcFtlbGVtZW50LnByb3BJZCAtIDFdLm51bSA9IGVsZW1lbnQucHJvcE51bTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIHV0aWwudXNlckRhdGEucHJvcCA9IHJlcztcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGRzLCAn55So5oi36IOM5YyFJyk7XG4gICAgICAgICAgICBcblx0XHRcblx0XHQvL+i/m+W6puaVsOaNrlxuXHRcdFx0XHRcdGxldCBwcm9wZGF0YSA9IFt7XCJ0eXBlXCI6XCIxXCIsXCJuYW1lXCI6XCLlhrDlhrtcIixcImV4cGxhaW5cIjpcIuWGsOWGu+aAqueJqVxcbjEwc1wiLFwidGltZVwiOlwiMTBcIixcImxldmVsXCI6XCIxXCJ9LHtcInR5cGVcIjpcIjJcIixcIm5hbWVcIjpcIueUteWHu1wiLFwiZXhwbGFpblwiOlwi5oCq54mp5o6l5Y+X6aKd5aSW5Lyk5a6zKzIwXCIsXCJ0aW1lXCI6XCIzXCIsXCJsZXZlbFwiOlwiMVwifSx7XCJ0eXBlXCI6XCIzXCIsXCJuYW1lXCI6XCLmiqTnvalcIixcImV4cGxhaW5cIjpcIuS/neaKpOawtOaZtuWhlFxcbjMwc1wiLFwidGltZVwiOlwiMzBcIixcImxldmVsXCI6XCIyNVwifSx7XCJ0eXBlXCI6XCI0XCIsXCJuYW1lXCI6XCLmuIXlsY9cIixcImV4cGxhaW5cIjpcIua2iOeBreaJgOacieaAquWFvVwiLFwidGltZVwiOlwiMFwiLFwibGV2ZWxcIjpcIjQ1XCJ9LHtcInR5cGVcIjpcIjVcIixcIm5hbWVcIjpcIuiHquWKqOWQiOaIkFwiLFwiZXhwbGFpblwiOlwi54Ku5aGU6Ieq5Yqo5ZCI5oiQXFxuMzBzXCIsXCJ0aW1lXCI6XCIzMFwiLFwibGV2ZWxcIjpcIjVcIn0se1widHlwZVwiOlwiNlwiLFwibmFtZVwiOlwi5aKe6IO9XCIsXCJleHBsYWluXCI6XCLngq7loZTmlLvlh7vliptYMlxcbjIwc1wiLFwidGltZVwiOlwiMjBcIixcImxldmVsXCI6XCIxXCJ9XTtcblx0XHRcdFx0XG5cdFx0XHRcdGxldCAgYWJfdGVzdD1be1wibG9ja190dXJyZXRfdGVzdFwiOntcIkFcIjpcInRydWVcIixcIkJcIjpcInRydWVcIn19LHtcImhlYXZlbl9jb2luX3Rlc3RcIjp7XCJBXCI6XCJ0cnVlXCIsXCJCXCI6XCJ0cnVlXCJ9fSx7XCJuZXdfaGFuZF90ZXN0XCI6e1wiQVwiOlwidHJ1ZVwiLFwiQlwiOlwidHJ1ZVwifX1dXG5cdFx0XHRcdFxuXHRcdFx0XHRcblx0XHRcdFx0XG4gICAgICAgICAgICAgICAgaWYocHJvcGRhdGEpe1xuICAgICAgICAgICAgICAgICAgICB1dGlsLnByb3BDb25maWcgPSBwcm9wZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIumBk+WFt+ivpue7huivtOaYjlwiLHV0aWwucHJvcENvbmZpZyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICB1dGlsLm9ubGluZV90aW1lID0gMTAgKiA2MDsgXG4gICAgICAgICAgICAgICAgaWYoYWJfdGVzdCl7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZXN0ID0gYWJfdGVzdDtcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDtpPHRlc3QubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQga2V5OnN0cmluZyA9IE9iamVjdC5rZXlzKHRlc3RbaV0pWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbC5BQl9UZXN0W2tleV0gPSB0ZXN0W2ldW2tleV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cblx0XHRcdFx0XG5cdFx0XHRcdFx0Ly/liJ3lp4vljJbkuIDkupvmlbDmja5cblx0XHRcdFx0XHR1dGlsLnVzZXJEYXRhLmFpcmJvcm5lQ291bnQgPSAxNTtcbiAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICBpZiAodXRpbC51c2VyRGF0YS5ub3ZpY2VHdWlkZSA9PSAxICYmIHV0aWwudXNlckRhdGEubmV3VXNlciA9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlsLnVzZXJEYXRhLnByb2R1Y3QgPSA0MDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICh1dGlsLnVzZXJEYXRhLnR1cnJldExldmVsID4gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbC51c2VyRGF0YS5ub3ZpY2VHdWlkZSA9IC0xO1xuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbC5zZXRTdG9yYWdlKHV0aWwubG9jYWxEaWFyeS5ub3ZpY2VHdWlkZSwgLTEpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cdFx0XHRcdFx0dXRpbC5iZWhhdmlvclJld2FyZFZvTGlzdCA9W3tcInR5cGVcIjoxLFwicmV3YXJkXCI6NTB9LHtcInR5cGVcIjoyLFwicmV3YXJkXCI6NH0se1widHlwZVwiOjQsXCJyZXdhcmRcIjo3NX0se1widHlwZVwiOjUsXCJyZXdhcmRcIjo1MH1dO1xuXHRcdFx0XHRcdFxuXG4gICAgICAgICAgICAgICAgICAgIHV0aWwubWFwQ29uZmlnID0gdXRpbC5nZXRNYXBkYXRhKHV0aWwudXNlckRhdGEuY3VzdG9tcy5iaWcpO1xuXG4gICAgICAgICAgICAgICAgIFx0XHRcblx0XHRcdFx0XHR1dGlsLnByb3BDb25maWc9bnVsbFxuXHRcdFx0XHRcdHRoaXMuamlucXVsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHV0aWwuaXBob25lWFRvcCA9IFhNU0RLLmdldExpdUhhaUhlaWdodCgpO1xuXHRcdFxuXHRcdFxuXG4gICAgICAgXG5cdFx0XG5cdFx0XG5cdFx0XG5cdFxuICAgICAgICBcbiAgICAgICAgXG4gICAgICBcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPluacrOWcsOaVsOaNrlxuICAgICAqL1xuICAgIGdldEFsbExvY2FsU3RvcmFnZSgpIHtcblxuXG4gICAgICAgIGZvciAobGV0IGtleSBpbiB1dGlsLmxvY2FsRGlhcnkpIHtcblxuICAgICAgICAgICAgbGV0IHZhbHVlID0gdXRpbC5nZXRTdG9yYWdlKGtleSk7XG4gICAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB1dGlsLnVzZXJEYXRhW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgWE1TREsuZmluaXNoQ29jb3NMYXVuY2goKTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcbiAgICAgICAgICAgIGlmKCF0aGlzLmppbnF1bGUmJnRoaXMubm9MaW5lKXtcbiAgICAgICAgICAgICAgICB0aGlzLm5vTGluZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LDMwKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliqDovb1qc29uXG4gICAgICovXG4gICAgbG9hZGluZ0pzb24oKSB7XG5cbiAgICAgICAganNvblNpbmdsZXRvbi5zaW5nbGV0b24ubG9hZEpzb24odXRpbC5qc29uQXJyLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxvYWRpbmdQYWdlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Yqg6L295Zy65pmv6aG16Z2iXG4gICAgICovXG4gICAgbG9hZGluZ1BhZ2UoKSB7XG5cbiAgICAgICAgdGhpcy5sb2FkQW55KFwicHJlZmFiL3ZpZXcvZ2FtZVwiLCBjYy5QcmVmYWIsIChwcmVmYWIpID0+IHtcblxuICAgICAgICAgICAgbGV0IGl0ZW06IGNjLk5vZGUgPSBjYy5pbnN0YW50aWF0ZShwcmVmYWIpO1xuXG4gICAgICAgICAgICBpdGVtLnNldFBhcmVudCh0aGlzLkJhc2VCb3gpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubG9hZEFueShcInByZWZhYi92aWV3L3VpXCIsIGNjLlByZWZhYiwgKHByZWZhYikgPT4ge1xuXG4gICAgICAgICAgICBsZXQgaXRlbTogY2MuTm9kZSA9IGNjLmluc3RhbnRpYXRlKHByZWZhYik7XG5cbiAgICAgICAgICAgIGl0ZW0uc2V0UGFyZW50KHRoaXMuVWlCb3gpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHRoaXMubG9hZEFueShcInByZWZhYi92aWV3L3Byb3BDb250ZW50XCIsIGNjLlByZWZhYiwgKHByZWZhYikgPT4ge1xuICAgICAgICAvLyAgICAgbGV0IGl0ZW06IGNjLk5vZGUgPSBjYy5pbnN0YW50aWF0ZShwcmVmYWIpO1xuXG4gICAgICAgIC8vICAgICBpdGVtLnNldFBhcmVudCh0aGlzLlByb3BCb3gpO1xuXG4gICAgICAgIC8vIH0pO1xuXG4gICAgICAgIC8v5Yid5aeL5YyW5by556qXXG4gICAgICAgIFBhZ2VNYW5hZ2Uuc2luZ2xldG9uID0gbmV3IFBhZ2VNYW5hZ2UoKTtcbiAgICAgICAgUGFnZU1hbmFnZS5zaW5nbGV0b24ucGFyZW50ID0gdGhpcy5Qb3BCb3g7XG5cblxuICAgICAgICBcblxuICAgICAgICBpZihzb3VuZENvbnRyb2xsZXIgfHwgIXNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24peyAgICAgICAgICAgIFxuICAgICAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbiA9IG5ldyBzb3VuZENvbnRyb2xsZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghY2Muc3lzLmlzTmF0aXZlKSB7IFxuICAgICAgICAgICAgc291bmRDb250cm9sbGVyLmlzUGxheU11c2ljID0gdHJ1ZTtcbiAgICAgICAgICAgIHNvdW5kQ29udHJvbGxlci5zaW5nbGV0b24ucGxheUJHTSgpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiDmi4nljrvnlKjmiLfmlbDmja5cbiAgICAgKiBAcGFyYW0gY2FsbCDlm57osINcbiAgICAgKi9cbiAgICBpbml0VXNlcihjYWxsOiBGdW5jdGlvbikge1xuICAgICAgICBYTVNESy5wb3N0KHtcbiAgICAgICAgICAgIHVybDogVXJsQ29uc3QuZ2FtZUluZm9JbmRleCxcbiAgICAgICAgICAgIG9uU3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhO1xuICAgICAgICAgICAgICAgIGxldCBnb2xkUG9pbnQgPSBkYXRhLmdvbGRQb2ludDtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRVc2VyRGF0YShjYWxsKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkZhaWw6IGVyciA9PiB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGluaXRVc2VyRGF0YShjYWxsOiBGdW5jdGlvbikge1xuICAgICAgICBYTVNESy5nZXRkYXRhU3RyKHtcbiAgICAgICAgICAgIHVybDogVXJsQ29uc3QuZ2FtZUxldmVsSW5kZXgsXG4gICAgICAgICAgICBvblN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLor7fmsYLmiJDlip9nYW1lTGV2ZWxJbmRleFwiLCByZXMpXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09PSAwICYmIHJlcy5kYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gcmVzLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgIGxldCB1c2VyR2FtZU1hcFNuYXBTaG90Vk8gPSBkYXRhLnVzZXJHYW1lTWFwU25hcFNob3RWTztcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZWZ0VGltZSAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbC5kb3VibGVFYXJuLnVzZSA9IHByb3BTdGF0ZS5zdGFydDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwuZG91YmxlRWFybi50aW1lID0gTnVtYmVyKGRhdGEubGVmdFRpbWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy91dGlsLnVzZXJEYXRhLmN1c3RvbXMuYmlnID0gZGF0YS5sZXZlbCArIDE7XG5cbiAgICAgICAgICAgICAgICAgICAgdXRpbC51c2VyRGF0YS5uZXdVc2VyID0gdXNlckdhbWVNYXBTbmFwU2hvdFZPLm5ld1VzZXI7XG4gICAgICAgICAgICAgICAgICAgIHV0aWwudXNlckRhdGEudHVycmV0TGV2ZWwgPSB1c2VyR2FtZU1hcFNuYXBTaG90Vk8udXNlckJhdHRlcnlEVE8uaGlnaGVzdExldmVsO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VyR2FtZU1hcFNuYXBTaG90Vk8udXNlck1hcERldGFpbCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlsLmluaXRQb29sKCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlsLnVzZXJEYXRhLnBvb2wgPSB1c2VyR2FtZU1hcFNuYXBTaG90Vk8udXNlck1hcERldGFpbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwucmVwYWlyUG9vbCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAvKiB1dGlsLnVzZXJEYXRhLnByb2R1Y3QgPSB1c2VyR2FtZU1hcFNuYXBTaG90Vk8udXNlckJhdHRlcnlEVE8ubnVtO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh1dGlsLnVzZXJEYXRhLm5vdmljZUd1aWRlID09IDEgJiYgdXRpbC51c2VyRGF0YS5uZXdVc2VyID09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwudXNlckRhdGEucHJvZHVjdCA9IDQwO1xuICAgICAgICAgICAgICAgICAgICB9Ki9cblxuICAgICAgICAgICAgICAgICAgICBpZiAodXRpbC51c2VyRGF0YS50dXJyZXRMZXZlbCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwudXNlckRhdGEubm92aWNlR3VpZGUgPSAtMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwuc2V0U3RvcmFnZSh1dGlsLmxvY2FsRGlhcnkubm92aWNlR3VpZGUsIC0xKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHV0aWwuYmVoYXZpb3JSZXdhcmRWb0xpc3QgPSBkYXRhLmJlaGF2aW9yUmV3YXJkVm9MaXN0O1xuICAgICAgICAgICAgICAgICAgICB1dGlsLm1hcENvbmZpZyA9IGRhdGEubWFwQ29uZmlnO1xuXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAvLyB1dGlsLnVzZXJEYXRhLmN1c3RvbXMuc21hbGwgPSB1dGlsLm1hcENvbmZpZy5sZW5ndGgtMTtcblxuICAgICAgICAgICAgICAgICAgICAvLyB1dGlsLmdhbWVMZXZlbFBhc3NSZXdhcmRWb0xpc3QucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICByZXdhcmRUeXBlOiAyLFxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgcmV3YXJkVmFsdWU6IHRvb2wuR2V0QXJyRGF0YShcInR5cGVcIiwgNCwgZGF0YS5iZWhhdmlvclJld2FyZFZvTGlzdCkucmV3YXJkXG4gICAgICAgICAgICAgICAgICAgIC8vIH0pO1xuICAgICAgICAgICAgICAgICAgICAvLyB1dGlsLmdhbWVMZXZlbFBhc3NSZXdhcmRWb0xpc3QgPSB0b29sLkdldEFyckRhdGEoXCJ0eXBlXCIsIDQsIGRhdGEuYmVoYXZpb3JSZXdhcmRWb0xpc3QpLnJld2FyZDtcblxuICAgICAgICAgICAgICAgICAgICB1dGlsLnVzZXJEYXRhLnZlcnNpb24gPSB1c2VyR2FtZU1hcFNuYXBTaG90Vk8udmVyc2lvbjtcblxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh1dGlsLnVzZXJEYXRhLCAnIHVzZXJEYXRhJyk7XG4gICAgICAgICAgICAgICAgICAgIGNhbGwgJiYgY2FsbCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkZhaWw6IGVyciA9PiB7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgXG4gICAgICAgIFxuXG4gICAgICAgIFxuICAgIH1cbiAgICAvKipcbiAgICAgKiDph43mlrDliqDovb3lnLrmma9cbiAgICAgKi9cbiAgICBBZ2FpblNjZW5lKCl7XG5cbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiZ2FtZVwiKTtcblxuICAgIH1cblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=