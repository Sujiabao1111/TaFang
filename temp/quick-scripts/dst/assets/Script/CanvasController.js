
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
var baseTs_1 = require("./base/baseTs");
var jsonSingleton_1 = require("./base/jsonSingleton");
var NameTs_1 = require("./common/NameTs");
var LanguageData_1 = require("./Language/LanguageData");
var PageManage_1 = require("./PageManage");
var soundController_1 = require("./soundController");
var Tools_1 = require("./util/Tools");
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
        _this.PropBox = null;
        _this.TipBox = null;
        _this.loadPage = null;
        _this.noLine = null;
        _this.mapdata = null;
        _this.jinqule = false;
        return _this;
        // update (dt) {}
    }
    CanvasController.prototype.onLoad = function () {
        // cc.macro.CLEANUP_IMAGE_CACHE = false;
        // cc.dynamicAtlasManager.enabled = true;
        // cc.dynamicAtlasManager.showDebug(true);
        var _this = this;
        // 设置语言
        var languageType = Tools_1.Tools.getStorage("LanguageType");
        var index = languageType == undefined || languageType == null ? 1 : languageType;
        LanguageData_1.setLanguage(Number(index));
        // 关掉load页面
        cc.game.on(NameTs_1.default.Close_LoadPage, function (res) {
            _this.loadPage.active = false;
        }, this);
        // XMSDK.initialize();
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
    };
    CanvasController.prototype.start = function () {
        // this.scheduleOnce(() => {
        //     if (!this.jinqule && this.noLine) {
        //         this.noLine.active = true;
        //     }
        // }, 30);
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
        //初始化弹窗
        PageManage_1.default.singleton = new PageManage_1.default();
        PageManage_1.default.singleton.parent = this.PopBox;
        if (soundController_1.default || !soundController_1.default.singleton) {
            soundController_1.default.singleton = new soundController_1.default();
        }
    };
    /**
     * 拉去用户数据
     * @param call 回调
     */
    CanvasController.prototype.initUser = function (call) {
    };
    CanvasController.prototype.initUserData = function (call) {
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
        property({ type: cc.Node, displayName: "道具位置" })
    ], CanvasController.prototype, "PropBox", void 0);
    __decorate([
        property({ type: cc.Node, displayName: "提示框位置" })
    ], CanvasController.prototype, "TipBox", void 0);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxDYW52YXNDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHdDQUFtQztBQUNuQyxzREFBaUQ7QUFDakQsMENBQXFDO0FBQ3JDLHdEQUFzRDtBQUN0RCwyQ0FBc0M7QUFDdEMscURBQWdEO0FBQ2hELHNDQUFxQztBQUNyQyxvQ0FBK0I7QUFHekIsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBOEMsb0NBQU07SUFBcEQ7UUFBQSxxRUF5TEM7UUFyTFcsYUFBTyxHQUFZLElBQUksQ0FBQztRQUd4QixXQUFLLEdBQVksSUFBSSxDQUFDO1FBR3RCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFHMUIsWUFBTSxHQUFZLElBQUksQ0FBQztRQUd2QixhQUFPLEdBQVksSUFBSSxDQUFDO1FBR3hCLFlBQU0sR0FBWSxJQUFJLENBQUM7UUFHdkIsY0FBUSxHQUFZLElBQUksQ0FBQztRQUd6QixZQUFNLEdBQVksSUFBSSxDQUFDO1FBR3ZCLGFBQU8sR0FBaUIsSUFBSSxDQUFDO1FBRzdCLGFBQU8sR0FBWSxLQUFLLENBQUM7O1FBeUpqQyxpQkFBaUI7SUFDckIsQ0FBQztJQXhKRyxpQ0FBTSxHQUFOO1FBRUksd0NBQXdDO1FBQ3hDLHlDQUF5QztRQUN6QywwQ0FBMEM7UUFKOUMsaUJBd0VDO1FBbEVHLE9BQU87UUFDUCxJQUFJLFlBQVksR0FBRyxhQUFLLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3BELElBQUksS0FBSyxHQUFHLFlBQVksSUFBSSxTQUFTLElBQUksWUFBWSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUM7UUFDakYsMEJBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztR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SUFBSSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsQ0FBQztxREFDakI7SUFHaEM7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLENBQUM7b0RBQ25CO0lBRy9CO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxDQUFDO3NEQUNmO0lBR2pDO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxDQUFDO29EQUNsQjtJQUcvQjtRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsU0FBUyxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsQ0FBQztxREFDakI7SUE1QnBCLGdCQUFnQjtRQURwQyxPQUFPO09BQ2EsZ0JBQWdCLENBeUxwQztJQUFELHVCQUFDO0NBekxELEFBeUxDLENBekw2QyxnQkFBTSxHQXlMbkQ7a0JBekxvQixnQkFBZ0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCBiYXNlVHMgZnJvbSBcIi4vYmFzZS9iYXNlVHNcIjtcbmltcG9ydCBqc29uU2luZ2xldG9uIGZyb20gXCIuL2Jhc2UvanNvblNpbmdsZXRvblwiO1xuaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi9jb21tb24vTmFtZVRzXCI7XG5pbXBvcnQgeyBzZXRMYW5ndWFnZSB9IGZyb20gXCIuL0xhbmd1YWdlL0xhbmd1YWdlRGF0YVwiO1xuaW1wb3J0IFBhZ2VNYW5hZ2UgZnJvbSBcIi4vUGFnZU1hbmFnZVwiO1xuaW1wb3J0IHNvdW5kQ29udHJvbGxlciBmcm9tIFwiLi9zb3VuZENvbnRyb2xsZXJcIjtcbmltcG9ydCB7IFRvb2xzIH0gZnJvbSBcIi4vdXRpbC9Ub29sc1wiO1xuaW1wb3J0IHV0aWwgZnJvbSBcIi4vdXRpbC91dGlsXCI7XG5cblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbnZhc0NvbnRyb2xsZXIgZXh0ZW5kcyBiYXNlVHMge1xuXG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5Ob2RlLCBkaXNwbGF5TmFtZTogXCLln7rnoYDkvY3nva5cIiB9KVxuICAgIHByaXZhdGUgQmFzZUJveDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5Ob2RlLCBkaXNwbGF5TmFtZTogXCJVaeS9jee9rlwiIH0pXG4gICAgcHJpdmF0ZSBVaUJveDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5Ob2RlLCBkaXNwbGF5TmFtZTogXCLnibnmlYjkvY3nva5cIiB9KVxuICAgIHByaXZhdGUgRWZmZWN0Qm94OiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLk5vZGUsIGRpc3BsYXlOYW1lOiBcIuW8ueeql+S9jee9rlwiIH0pXG4gICAgcHJpdmF0ZSBQb3BCb3g6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTm9kZSwgZGlzcGxheU5hbWU6IFwi6YGT5YW35L2N572uXCIgfSlcbiAgICBwcml2YXRlIFByb3BCb3g6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTm9kZSwgZGlzcGxheU5hbWU6IFwi5o+Q56S65qGG5L2N572uXCIgfSlcbiAgICBwcml2YXRlIFRpcEJveDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5Ob2RlLCBkaXNwbGF5TmFtZTogXCLliqDovb3pobVcIiB9KVxuICAgIHByaXZhdGUgbG9hZFBhZ2U6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTm9kZSwgZGlzcGxheU5hbWU6IFwi572R57uc5aSx6LSlXCIgfSlcbiAgICBwcml2YXRlIG5vTGluZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5Kc29uQXNzZXQsIGRpc3BsYXlOYW1lOiBcIuWFs+WNoeaVsOaNrlwiIH0pXG4gICAgcHJpdmF0ZSBtYXBkYXRhOiBjYy5Kc29uQXNzZXQgPSBudWxsO1xuXG5cbiAgICBwcml2YXRlIGppbnF1bGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIG9uTG9hZCgpIHtcblxuICAgICAgICAvLyBjYy5tYWNyby5DTEVBTlVQX0lNQUdFX0NBQ0hFID0gZmFsc2U7XG4gICAgICAgIC8vIGNjLmR5bmFtaWNBdGxhc01hbmFnZXIuZW5hYmxlZCA9IHRydWU7XG4gICAgICAgIC8vIGNjLmR5bmFtaWNBdGxhc01hbmFnZXIuc2hvd0RlYnVnKHRydWUpO1xuXG4gICAgICAgIC8vIOiuvue9ruivreiogFxuICAgICAgICBsZXQgbGFuZ3VhZ2VUeXBlID0gVG9vbHMuZ2V0U3RvcmFnZShcIkxhbmd1YWdlVHlwZVwiKTtcbiAgICAgICAgbGV0IGluZGV4ID0gbGFuZ3VhZ2VUeXBlID09IHVuZGVmaW5lZCB8fCBsYW5ndWFnZVR5cGUgPT0gbnVsbCA/IDEgOiBsYW5ndWFnZVR5cGU7XG4gICAgICAgIHNldExhbmd1YWdlKE51bWJlcihpbmRleCkpO1xuXG5cbiAgICAgICAgLy8g5YWz5o6JbG9hZOmhtemdolxuICAgICAgICBjYy5nYW1lLm9uKE5hbWVUcy5DbG9zZV9Mb2FkUGFnZSwgcmVzID0+IHtcbiAgICAgICAgICAgIHRoaXMubG9hZFBhZ2UuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgIC8vIFhNU0RLLmluaXRpYWxpemUoKTtcbiAgICAgICAgdXRpbC5pbmlkYXRhKClcbiAgICAgICAgdGhpcy5sb2FkaW5nSnNvbigpO1xuICAgICAgICBqc29uU2luZ2xldG9uLnNpbmdsZXRvbi5qc29uRGF0YVtOYW1lVHMuZ2tEYXRhXSA9IHRoaXMubWFwZGF0YS5qc29uO1xuICAgICAgICB0aGlzLmdldEFsbExvY2FsU3RvcmFnZSgpO1xuXG4gICAgICAgIHV0aWwudXNlckRhdGEub2ZmbGluZUluY29tZSA9IHtcbiAgICAgICAgICAgIHJld2FyZDogMCxcbiAgICAgICAgICAgIG11bHRpcGxlUmV3YXJkOiAwXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZGRzID0gW11cbiAgICAgICAgZGRzLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICB1dGlsLnVzZXJEYXRhLnByb3BbZWxlbWVudC5wcm9wSWQgLSAxXS5udW0gPSBlbGVtZW50LnByb3BOdW07XG4gICAgICAgIH0pO1xuICAgICAgICAvLyB1dGlsLnVzZXJEYXRhLnByb3AgPSByZXM7XG5cbiAgICAgICAgLy/ov5vluqbmlbDmja5cbiAgICAgICAgbGV0IHByb3BkYXRhID0gW3sgXCJ0eXBlXCI6IFwiMVwiLCBcIm5hbWVcIjogXCLlhrDlhrtcIiwgXCJleHBsYWluXCI6IFwi5Yaw5Ya75oCq54mpXFxuMTBzXCIsIFwidGltZVwiOiBcIjEwXCIsIFwibGV2ZWxcIjogXCIxXCIgfSwgeyBcInR5cGVcIjogXCIyXCIsIFwibmFtZVwiOiBcIueUteWHu1wiLCBcImV4cGxhaW5cIjogXCLmgKrnianmjqXlj5fpop3lpJbkvKTlrrMrMjBcIiwgXCJ0aW1lXCI6IFwiM1wiLCBcImxldmVsXCI6IFwiMVwiIH0sIHsgXCJ0eXBlXCI6IFwiM1wiLCBcIm5hbWVcIjogXCLmiqTnvalcIiwgXCJleHBsYWluXCI6IFwi5L+d5oqk5rC05pm25aGUXFxuMzBzXCIsIFwidGltZVwiOiBcIjMwXCIsIFwibGV2ZWxcIjogXCIyNVwiIH0sIHsgXCJ0eXBlXCI6IFwiNFwiLCBcIm5hbWVcIjogXCLmuIXlsY9cIiwgXCJleHBsYWluXCI6IFwi5raI54Gt5omA5pyJ5oCq5YW9XCIsIFwidGltZVwiOiBcIjBcIiwgXCJsZXZlbFwiOiBcIjQ1XCIgfSwgeyBcInR5cGVcIjogXCI1XCIsIFwibmFtZVwiOiBcIuiHquWKqOWQiOaIkFwiLCBcImV4cGxhaW5cIjogXCLngq7loZToh6rliqjlkIjmiJBcXG4zMHNcIiwgXCJ0aW1lXCI6IFwiMzBcIiwgXCJsZXZlbFwiOiBcIjVcIiB9LCB7IFwidHlwZVwiOiBcIjZcIiwgXCJuYW1lXCI6IFwi5aKe6IO9XCIsIFwiZXhwbGFpblwiOiBcIueCruWhlOaUu+WHu+WKm1gyXFxuMjBzXCIsIFwidGltZVwiOiBcIjIwXCIsIFwibGV2ZWxcIjogXCIxXCIgfV07XG5cbiAgICAgICAgbGV0IGFiX3Rlc3QgPSBbeyBcImxvY2tfdHVycmV0X3Rlc3RcIjogeyBcIkFcIjogXCJ0cnVlXCIsIFwiQlwiOiBcInRydWVcIiB9IH0sIHsgXCJoZWF2ZW5fY29pbl90ZXN0XCI6IHsgXCJBXCI6IFwidHJ1ZVwiLCBcIkJcIjogXCJ0cnVlXCIgfSB9LCB7IFwibmV3X2hhbmRfdGVzdFwiOiB7IFwiQVwiOiBcInRydWVcIiwgXCJCXCI6IFwidHJ1ZVwiIH0gfV1cblxuICAgICAgICBpZiAocHJvcGRhdGEpIHtcbiAgICAgICAgICAgIHV0aWwucHJvcENvbmZpZyA9IHByb3BkYXRhO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIumBk+WFt+ivpue7huivtOaYjlwiLHV0aWwucHJvcENvbmZpZyk7XG4gICAgICAgIH1cblxuICAgICAgICB1dGlsLm9ubGluZV90aW1lID0gMTAgKiA2MDtcbiAgICAgICAgaWYgKGFiX3Rlc3QpIHtcbiAgICAgICAgICAgIGxldCB0ZXN0ID0gYWJfdGVzdDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGVzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBrZXk6IHN0cmluZyA9IE9iamVjdC5rZXlzKHRlc3RbaV0pWzBdO1xuICAgICAgICAgICAgICAgIHV0aWwuQUJfVGVzdFtrZXldID0gdGVzdFtpXVtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgICAgICAvL+WIneWni+WMluS4gOS6m+aVsOaNrlxuICAgICAgICB1dGlsLnVzZXJEYXRhLmFpcmJvcm5lQ291bnQgPSAxNTtcblxuICAgICAgICBpZiAodXRpbC51c2VyRGF0YS5ub3ZpY2VHdWlkZSA9PSAxICYmIHV0aWwudXNlckRhdGEubmV3VXNlciA9PSB0cnVlKSB7XG4gICAgICAgICAgICB1dGlsLnVzZXJEYXRhLnByb2R1Y3QgPSA0MDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1dGlsLnVzZXJEYXRhLnR1cnJldExldmVsID4gMSkge1xuICAgICAgICAgICAgdXRpbC51c2VyRGF0YS5ub3ZpY2VHdWlkZSA9IC0xO1xuICAgICAgICAgICAgdXRpbC5zZXRTdG9yYWdlKHV0aWwubG9jYWxEaWFyeS5ub3ZpY2VHdWlkZSwgLTEpO1xuICAgICAgICB9XG5cbiAgICAgICAgdXRpbC5iZWhhdmlvclJld2FyZFZvTGlzdCA9IFt7IFwidHlwZVwiOiAxLCBcInJld2FyZFwiOiA1MCB9LCB7IFwidHlwZVwiOiAyLCBcInJld2FyZFwiOiA0IH0sIHsgXCJ0eXBlXCI6IDQsIFwicmV3YXJkXCI6IDc1IH0sIHsgXCJ0eXBlXCI6IDUsIFwicmV3YXJkXCI6IDUwIH1dO1xuXG4gICAgICAgIHV0aWwubWFwQ29uZmlnID0gdXRpbC5nZXRNYXBkYXRhKHV0aWwudXNlckRhdGEuY3VzdG9tcy5iaWcpO1xuXG4gICAgICAgIHV0aWwucHJvcENvbmZpZyA9IG51bGxcbiAgICAgICAgdGhpcy5qaW5xdWxlID0gdHJ1ZTtcbiAgICB9XG5cblxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIC8vIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgLy8gICAgIGlmICghdGhpcy5qaW5xdWxlICYmIHRoaXMubm9MaW5lKSB7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5ub0xpbmUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfSwgMzApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPluacrOWcsOaVsOaNrlxuICAgICAqL1xuICAgIGdldEFsbExvY2FsU3RvcmFnZSgpIHtcbiAgICAgICAgZm9yIChsZXQga2V5IGluIHV0aWwubG9jYWxEaWFyeSkge1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gdXRpbC5nZXRTdG9yYWdlKGtleSk7XG4gICAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB1dGlsLnVzZXJEYXRhW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWKoOi9vWpzb25cbiAgICAgKi9cbiAgICBsb2FkaW5nSnNvbigpIHtcbiAgICAgICAganNvblNpbmdsZXRvbi5zaW5nbGV0b24ubG9hZEpzb24odXRpbC5qc29uQXJyLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxvYWRpbmdQYWdlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWKoOi9veWcuuaZr+mhtemdolxuICAgICAqL1xuICAgIGxvYWRpbmdQYWdlKCkge1xuICAgICAgICB0aGlzLmxvYWRBbnkoXCJwcmVmYWIvdmlldy9nYW1lXCIsIGNjLlByZWZhYiwgKHByZWZhYikgPT4ge1xuICAgICAgICAgICAgbGV0IGl0ZW06IGNjLk5vZGUgPSBjYy5pbnN0YW50aWF0ZShwcmVmYWIpO1xuICAgICAgICAgICAgaXRlbS5zZXRQYXJlbnQodGhpcy5CYXNlQm94KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5sb2FkQW55KFwicHJlZmFiL3ZpZXcvdWlcIiwgY2MuUHJlZmFiLCAocHJlZmFiKSA9PiB7XG4gICAgICAgICAgICBsZXQgaXRlbTogY2MuTm9kZSA9IGNjLmluc3RhbnRpYXRlKHByZWZhYik7XG4gICAgICAgICAgICBpdGVtLnNldFBhcmVudCh0aGlzLlVpQm94KTtcbiAgICAgICAgfSk7XG5cblxuXG4gICAgICAgIC8v5Yid5aeL5YyW5by556qXXG4gICAgICAgIFBhZ2VNYW5hZ2Uuc2luZ2xldG9uID0gbmV3IFBhZ2VNYW5hZ2UoKTtcbiAgICAgICAgUGFnZU1hbmFnZS5zaW5nbGV0b24ucGFyZW50ID0gdGhpcy5Qb3BCb3g7XG5cbiAgICAgICAgaWYgKHNvdW5kQ29udHJvbGxlciB8fCAhc291bmRDb250cm9sbGVyLnNpbmdsZXRvbikge1xuICAgICAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbiA9IG5ldyBzb3VuZENvbnRyb2xsZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICog5ouJ5Y6755So5oi35pWw5o2uXG4gICAgICogQHBhcmFtIGNhbGwg5Zue6LCDXG4gICAgICovXG4gICAgaW5pdFVzZXIoY2FsbDogRnVuY3Rpb24pIHtcblxuICAgIH1cblxuICAgIGluaXRVc2VyRGF0YShjYWxsOiBGdW5jdGlvbikge1xuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiDph43mlrDliqDovb3lnLrmma9cbiAgICAgKi9cbiAgICBBZ2FpblNjZW5lKCkge1xuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJnYW1lXCIpO1xuICAgIH1cblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=