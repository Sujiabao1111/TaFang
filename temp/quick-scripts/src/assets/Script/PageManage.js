"use strict";
cc._RF.push(module, '296f6yWIL1Jz6Aadk6WdMQj', 'PageManage');
// Script/PageManage.ts

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
var faceTs_1 = require("./common/faceTs");
var NameTs_1 = require("./common/NameTs");
var pageTs_1 = require("./common/pageTs");
var util_1 = require("./util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PageManage = /** @class */ (function (_super) {
    __extends(PageManage, _super);
    function PageManage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //打开的窗口中是否有重复的，如果有则不打开
        _this.pageOpenArr = new Map();
        //打开的预制体
        _this.pageOpen = new Map();
        //打开的数量
        _this.openNum = 0;
        /**需要打开页面的数组 */
        _this.pageArr = [];
        /**现在打开的是哪个 */
        _this.nowPage = null;
        return _this;
    }
    PageManage_1 = PageManage;
    PageManage.prototype.onLoad = function () {
        if (PageManage_1.singleton) {
            return;
        }
        else {
            PageManage_1.singleton = this;
        }
    };
    /**
     * 检查是否在停止页面上
     */
    PageManage.prototype.checkStopGame = function (pageName) {
        var checkAdult = function (name) {
            return name == pageName;
        };
        return pageTs_1.default.stopGamePage.some(checkAdult);
    };
    /**
     * 检查是否能二级弹窗
     */
    PageManage.prototype.checkTwoPopGame = function (pageName) {
        var checkAdult = function (name) {
            return name == pageName;
        };
        return pageTs_1.default.twoPopPage.some(checkAdult);
    };
    /**
     * 检查是否能最高弹窗
     */
    PageManage.prototype.checkTopPopGame = function (pageName) {
        var checkAdult = function (name) {
            return name == pageName;
        };
        return pageTs_1.default.topPopPage.some(checkAdult);
    };
    /**
     * 打开哪个页面
     * @param name 哪个
     * @param data 数据
     */
    PageManage.prototype.showPage = function (name, data) {
        var _this = this;
        if (data === void 0) { data = null; }
        if (this.pageOpenArr.has(name))
            return;
        var successFn = function (Prefab) {
            //如果有则不打开
            if (_this.pageOpenArr.has(name))
                return;
            _this.pageOpen.set(Prefab.name, Prefab);
            var PrefabTs = Prefab.getComponent(Prefab.name);
            Prefab.setParent(_this.parent);
            // this.pageOpen.set(Prefab.name,Prefab);
            if (PrefabTs) {
                PrefabTs.init && PrefabTs.init(data);
                if (PrefabTs.isAni)
                    _this.showAni(Prefab);
            }
            if (_this.checkStopGame(name)) {
                _this.openNum++;
            }
            // if(util.levelState != gameState.stop 
            //     && name != pageTs.pageName.GameAdLoading
            //     && name != pageTs.pageName.GameStart
            //     && name != pageTs.pageName.GameEnd){
            //     util.levelState = gameState.stop;
            //     cc.game.emit(NameTs.Game_Stop);
            // }
            if (util_1.default.levelState != faceTs_1.gameState.stop && name != pageTs_1.default.pageName.GameAdLoading
                && name != pageTs_1.default.pageName.GameStart
                && name != pageTs_1.default.pageName.GameEnd && _this.openNum > 0) {
                util_1.default.levelState = faceTs_1.gameState.stop;
                cc.game.emit(NameTs_1.default.Game_Stop);
            }
            _this.pageOpenArr.set(name, name);
            return PrefabTs;
        };
        if (name != pageTs_1.default.pageName.GameAdLoading && !this.checkTwoPopGame(name)) {
            if (this.checkTopPopGame(this.nowPage) && (name !== pageTs_1.default.pageName.GameWallet)) {
                this.pageArr.push({ name: name, data: data });
                return;
            }
            if (this.nowPage !== name) {
                var item = null;
                if (this.pageArr.length > 0) {
                    item = this.pageArr[0];
                    this.closePage(item.name, false);
                }
                this.pageArr.unshift({ name: name, data: data });
                this.nowPage = null;
                if (item) {
                    this.pageArr.push(item);
                }
            }
            if (this.nowPage !== null) {
                return;
            }
            if (this.nowPage == null) {
                this.nowPage = name;
            }
        }
        if (this.pageOpen.has(name)) {
            console.log(this.pageOpen.get(name), 'this.pageOpen.get(name)');
            var Prefab = cc.instantiate(this.pageOpen.get(name));
            successFn(Prefab);
        }
        else {
            cc.resources.load(pageTs_1.default.pageUrl[name], cc.Prefab, function (err, res) {
                var Prefab = cc.instantiate(res);
                successFn(Prefab);
            });
        }
    };
    /**删除数组指定的页面名字 */
    PageManage.prototype.delectPageArr = function (name) {
        console.log(this.pageArr.length, '删除前');
        for (var i = 0; i < this.pageArr.length; i++) {
            if (this.pageArr[i].name == name) {
                this.pageArr.splice(i, 1);
                console.log("删除掉");
                break;
            }
        }
        console.log(this.pageArr.length, '删除后');
    };
    /**
     * 预加载
     * @param name 哪个页面
     */
    PageManage.prototype.preloadPage = function (name) {
        cc.resources.preload(pageTs_1.default.pageUrl[name], cc.Prefab);
    };
    /**
     * 关闭哪个页面
     * @param name 哪个
     * @param ani 是否有动画
    */
    PageManage.prototype.closePage = function (name, ani) {
        if (ani === void 0) { ani = true; }
        var deleteName = name.replace(name[0], name[0].toUpperCase());
        this.pageOpenArr.delete(deleteName);
        var str = name.replace(name[0], name[0].toLowerCase());
        var node = this.pageOpen.get(str);
        if (name != pageTs_1.default.pageName.GameAdLoading && !this.checkTwoPopGame(name)) {
            this.delectPageArr(deleteName);
            this.nowPage = null;
        }
        else {
            ani = false;
        }
        if (ani) {
            this.closeAni(node);
        }
        else {
            this.destroyPage(node);
        }
        if (this.checkStopGame(deleteName)) {
            this.openNum--;
            if (this.openNum < 0) {
                this.openNum = 0;
            }
        }
        console.log(this.openNum, 'this.openNum');
        if (util_1.default.levelState == faceTs_1.gameState.stop && !util_1.default.isStop
            && deleteName != pageTs_1.default.pageName.GameAdLoading
            && deleteName != pageTs_1.default.pageName.GameStart
            && deleteName != pageTs_1.default.pageName.GameEnd
            && this.openNum == 0) {
            util_1.default.levelState = faceTs_1.gameState.start;
            cc.game.emit(NameTs_1.default.Game_Resume);
        }
    };
    /**
     * 展现下一个页面
     */
    PageManage.prototype.showNextPage = function () {
        console.log(this.pageArr.length, 'this.pageArr');
        if (this.pageArr.length > 0 && this.pageArr[0]) {
            var item = this.pageArr[0];
            this.showPage(item.name, item.data);
            this.pageArr.splice(0, 1);
        }
    };
    /**
     * 查找当前打开的页面
     * @param name 页面名字
     */
    PageManage.prototype.findPage = function (name) {
        var str = name.replace(name[0], name[0].toLowerCase());
        var node = this.pageOpen.get(str);
        if (node && node.name != "") {
            return this.pageOpen.get(str);
        }
        return null;
    };
    /**开场动画
     * @param node 节点
    */
    PageManage.prototype.showAni = function (node) {
        if (node.name == "gameWalletRecord") {
            return;
        }
        var bg = node.getChildByName("bg");
        var conetnt = node.getChildByName("content");
        if (bg) {
            bg.opacity = 0;
            cc.tween(bg).to(.1, { opacity: 150 }).start();
        }
        if (conetnt) {
            conetnt.scale = 0;
            cc.tween(conetnt).to(.2, { scale: 1 }).start();
        }
    };
    /**
     * 关闭动画
     * @param node 节点
     */
    PageManage.prototype.closeAni = function (node) {
        var _this = this;
        if (node) {
            if (node.name == "gameWalletRecord" || node.name == "gameKingPao" || node.name == "gameKingPaoProgress") {
                this.destroyPage(node);
                return;
            }
            if (node.name != "") {
                var bg = node.getChildByName("bg");
                var conetnt = node.getChildByName("content");
                if (bg)
                    cc.tween(bg).to(.2, { opacity: 0 }).start();
                if (conetnt)
                    cc.tween(conetnt).to(.1, { scale: 0 }).start();
                this.scheduleOnce(function () {
                    _this.destroyPage(node);
                }, .2);
            }
            else {
                this.destroyPage(node);
            }
        }
    };
    /**
     * 销毁页面
     */
    PageManage.prototype.destroyPage = function (node, isShow) {
        if (isShow === void 0) { isShow = true; }
        if (node) {
            node.destroy && node.destroy();
            node.removeFromParent && node.removeFromParent();
            cc.assetManager.releaseAsset(this.pageOpen.get(node.name));
            if (isShow)
                this.showNextPage();
        }
    };
    var PageManage_1;
    PageManage.singleton = null;
    PageManage = PageManage_1 = __decorate([
        ccclass
    ], PageManage);
    return PageManage;
}(cc.Component));
exports.default = PageManage;

cc._RF.pop();