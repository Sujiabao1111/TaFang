
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/PageManage.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '296f6yWIL1Jz6Aadk6WdMQj', 'PageManage');
// Script/PageManage.ts

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
var Loading_1 = require("./common/custon/Loading");
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
        console.log("1111111111111111111111111111111111");
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
        // console.log(this.pageArr.length, '删除前');
        for (var i = 0; i < this.pageArr.length; i++) {
            if (this.pageArr[i].name == name) {
                this.pageArr.splice(i, 1);
                // console.log("删除掉")
                break;
            }
        }
        // console.log(this.pageArr.length, '删除后');
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
            if (node.name == "gameWalletRecord") {
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
    /**
   * 加载中......
   * @param 加载中......
   */
    PageManage.prototype.Loading = function (timeOut) {
        var _this = this;
        if (timeOut === void 0) { timeOut = 9999; }
        var loadingParent = cc.find("Canvas/Loading");
        if (loadingParent.childrenCount <= 0) {
            var item_1 = null;
            if (this.pageOpen.has("Loading")) {
                var item_2 = cc.instantiate(this.pageOpen.get("Loading"));
                item_2.setParent(loadingParent);
                item_2.getComponent(Loading_1.default).show(timeOut);
            }
            else {
                cc.resources.load("prefab/effect/Loading", cc.Prefab, function (err, res) {
                    item_1 = cc.instantiate(res);
                    _this.pageOpen.set(item_1.name, item_1);
                    item_1.setParent(loadingParent);
                    item_1.getComponent(Loading_1.default).show(timeOut);
                });
            }
        }
    };
    PageManage.prototype.hideLoading = function () {
        var loading = cc.find("Canvas/Loading");
        loading && loading.removeAllChildren();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxQYWdlTWFuYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLG1EQUE4QztBQUM5QywwQ0FBc0Q7QUFDdEQsMENBQXFDO0FBQ3JDLDBDQUFxQztBQUNyQyxvQ0FBK0I7QUFDekIsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBd0MsOEJBQVk7SUFBcEQ7UUFBQSxxRUFzVUM7UUFwVUcsc0JBQXNCO1FBQ3RCLGlCQUFXLEdBQXdCLElBQUksR0FBRyxFQUFFLENBQUM7UUFFN0MsUUFBUTtRQUNSLGNBQVEsR0FBcUIsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQVF2QyxPQUFPO1FBQ1AsYUFBTyxHQUFXLENBQUMsQ0FBQztRQUVwQixlQUFlO1FBQ1AsYUFBTyxHQUFrQyxFQUFFLENBQUM7UUFFcEQsY0FBYztRQUNOLGFBQU8sR0FBVyxJQUFJLENBQUM7O0lBaVRuQyxDQUFDO21CQXRVb0IsVUFBVTtJQXVCM0IsMkJBQU0sR0FBTjtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQ1Asb0NBQW9DLENBQ3ZDLENBQUM7UUFFRixJQUFJLFlBQVUsQ0FBQyxTQUFTLEVBQUU7WUFDdEIsT0FBTztTQUNWO2FBQU07WUFDSCxZQUFVLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztTQUMvQjtJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNILGtDQUFhLEdBQWIsVUFBYyxRQUFnQjtRQUMxQixJQUFJLFVBQVUsR0FBRyxVQUFDLElBQUk7WUFDbEIsT0FBTyxJQUFJLElBQUksUUFBUSxDQUFDO1FBQzVCLENBQUMsQ0FBQTtRQUNELE9BQU8sZ0JBQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBRS9DLENBQUM7SUFFRDs7T0FFRztJQUNILG9DQUFlLEdBQWYsVUFBZ0IsUUFB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QUUsQ0FBQztJQUMzQyxDQUFDOztJQXhUYSxvQkFBUyxHQUFlLElBQUksQ0FBQztJQVgxQixVQUFVO1FBRDlCLE9BQU87T0FDYSxVQUFVLENBc1U5QjtJQUFELGlCQUFDO0NBdFVELEFBc1VDLENBdFV1QyxFQUFFLENBQUMsU0FBUyxHQXNVbkQ7a0JBdFVvQixVQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgTG9hZGluZyBmcm9tIFwiLi9jb21tb24vY3VzdG9uL0xvYWRpbmdcIjtcbmltcG9ydCB7IGdhbWVTdGF0ZSwgcHJvcFR5cGUgfSBmcm9tIFwiLi9jb21tb24vZmFjZVRzXCI7XG5pbXBvcnQgTmFtZVRzIGZyb20gXCIuL2NvbW1vbi9OYW1lVHNcIjtcbmltcG9ydCBwYWdlVHMgZnJvbSBcIi4vY29tbW9uL3BhZ2VUc1wiO1xuaW1wb3J0IHV0aWwgZnJvbSBcIi4vdXRpbC91dGlsXCI7XG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFnZU1hbmFnZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICAvL+aJk+W8gOeahOeql+WPo+S4reaYr+WQpuaciemHjeWkjeeahO+8jOWmguaenOacieWImeS4jeaJk+W8gFxuICAgIHBhZ2VPcGVuQXJyOiBNYXA8c3RyaW5nLCBzdHJpbmc+ID0gbmV3IE1hcCgpO1xuXG4gICAgLy/miZPlvIDnmoTpooTliLbkvZNcbiAgICBwYWdlT3BlbjogTWFwPHN0cmluZywgYW55PiA9IG5ldyBNYXAoKTtcblxuICAgIC8v54i257G7XG4gICAgcGFyZW50OiBjYy5Ob2RlO1xuXG4gICAgcHVibGljIHN0YXRpYyBzaW5nbGV0b246IFBhZ2VNYW5hZ2UgPSBudWxsO1xuXG5cbiAgICAvL+aJk+W8gOeahOaVsOmHj1xuICAgIG9wZW5OdW06IG51bWJlciA9IDA7XG5cbiAgICAvKirpnIDopoHmiZPlvIDpobXpnaLnmoTmlbDnu4QgKi9cbiAgICBwcml2YXRlIHBhZ2VBcnI6IHsgbmFtZTogc3RyaW5nLCBkYXRhOiBhbnkgfVtdID0gW107XG5cbiAgICAvKirnjrDlnKjmiZPlvIDnmoTmmK/lk6rkuKogKi9cbiAgICBwcml2YXRlIG5vd1BhZ2U6IHN0cmluZyA9IG51bGw7XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgXCIxMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExXCJcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoUGFnZU1hbmFnZS5zaW5nbGV0b24pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIFBhZ2VNYW5hZ2Uuc2luZ2xldG9uID0gdGhpcztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOajgOafpeaYr+WQpuWcqOWBnOatoumhtemdouS4ilxuICAgICAqL1xuICAgIGNoZWNrU3RvcEdhbWUocGFnZU5hbWU6IHN0cmluZykge1xuICAgICAgICBsZXQgY2hlY2tBZHVsdCA9IChuYW1lKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gbmFtZSA9PSBwYWdlTmFtZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGFnZVRzLnN0b3BHYW1lUGFnZS5zb21lKGNoZWNrQWR1bHQpXG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmo4Dmn6XmmK/lkKbog73kuoznuqflvLnnqpdcbiAgICAgKi9cbiAgICBjaGVja1R3b1BvcEdhbWUocGFnZU5hbWU6IHN0cmluZykge1xuICAgICAgICBsZXQgY2hlY2tBZHVsdCA9IChuYW1lKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gbmFtZSA9PSBwYWdlTmFtZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGFnZVRzLnR3b1BvcFBhZ2Uuc29tZShjaGVja0FkdWx0KVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5qOA5p+l5piv5ZCm6IO95pyA6auY5by556qXXG4gICAgICovXG4gICAgY2hlY2tUb3BQb3BHYW1lKHBhZ2VOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IGNoZWNrQWR1bHQgPSAobmFtZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG5hbWUgPT0gcGFnZU5hbWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhZ2VUcy50b3BQb3BQYWdlLnNvbWUoY2hlY2tBZHVsdClcblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICog5omT5byA5ZOq5Liq6aG16Z2iXG4gICAgICogQHBhcmFtIG5hbWUg5ZOq5LiqXG4gICAgICogQHBhcmFtIGRhdGEg5pWw5o2uXG4gICAgICovXG4gICAgc2hvd1BhZ2UobmFtZTogc3RyaW5nLCBkYXRhOiBhbnkgPSBudWxsKSB7XG4gICAgICAgIGlmICh0aGlzLnBhZ2VPcGVuQXJyLmhhcyhuYW1lKSkgcmV0dXJuO1xuICAgICAgICBsZXQgc3VjY2Vzc0ZuOiBGdW5jdGlvbiA9IChQcmVmYWI6IGNjLk5vZGUpID0+IHtcbiAgICAgICAgICAgIC8v5aaC5p6c5pyJ5YiZ5LiN5omT5byAXG4gICAgICAgICAgICBpZiAodGhpcy5wYWdlT3BlbkFyci5oYXMobmFtZSkpIHJldHVybjtcblxuICAgICAgICAgICAgdGhpcy5wYWdlT3Blbi5zZXQoUHJlZmFiLm5hbWUsIFByZWZhYik7XG5cbiAgICAgICAgICAgIGxldCBQcmVmYWJUcyA9IFByZWZhYi5nZXRDb21wb25lbnQoUHJlZmFiLm5hbWUpO1xuICAgICAgICAgICAgUHJlZmFiLnNldFBhcmVudCh0aGlzLnBhcmVudCk7XG4gICAgICAgICAgICAvLyB0aGlzLnBhZ2VPcGVuLnNldChQcmVmYWIubmFtZSxQcmVmYWIpO1xuICAgICAgICAgICAgaWYgKFByZWZhYlRzKSB7XG4gICAgICAgICAgICAgICAgUHJlZmFiVHMuaW5pdCAmJiBQcmVmYWJUcy5pbml0KGRhdGEpO1xuICAgICAgICAgICAgICAgIGlmIChQcmVmYWJUcy5pc0FuaSkgdGhpcy5zaG93QW5pKFByZWZhYik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5jaGVja1N0b3BHYW1lKG5hbWUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuTnVtKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBpZih1dGlsLmxldmVsU3RhdGUgIT0gZ2FtZVN0YXRlLnN0b3AgXG4gICAgICAgICAgICAvLyAgICAgJiYgbmFtZSAhPSBwYWdlVHMucGFnZU5hbWUuR2FtZUFkTG9hZGluZ1xuICAgICAgICAgICAgLy8gICAgICYmIG5hbWUgIT0gcGFnZVRzLnBhZ2VOYW1lLkdhbWVTdGFydFxuICAgICAgICAgICAgLy8gICAgICYmIG5hbWUgIT0gcGFnZVRzLnBhZ2VOYW1lLkdhbWVFbmQpe1xuICAgICAgICAgICAgLy8gICAgIHV0aWwubGV2ZWxTdGF0ZSA9IGdhbWVTdGF0ZS5zdG9wO1xuICAgICAgICAgICAgLy8gICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9TdG9wKTtcbiAgICAgICAgICAgIC8vIH1cblxuICAgICAgICAgICAgaWYgKHV0aWwubGV2ZWxTdGF0ZSAhPSBnYW1lU3RhdGUuc3RvcCAmJiBuYW1lICE9IHBhZ2VUcy5wYWdlTmFtZS5HYW1lQWRMb2FkaW5nXG4gICAgICAgICAgICAgICAgJiYgbmFtZSAhPSBwYWdlVHMucGFnZU5hbWUuR2FtZVN0YXJ0XG4gICAgICAgICAgICAgICAgJiYgbmFtZSAhPSBwYWdlVHMucGFnZU5hbWUuR2FtZUVuZCAmJiB0aGlzLm9wZW5OdW0gPiAwKSB7XG4gICAgICAgICAgICAgICAgdXRpbC5sZXZlbFN0YXRlID0gZ2FtZVN0YXRlLnN0b3A7XG4gICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX1N0b3ApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnBhZ2VPcGVuQXJyLnNldChuYW1lLCBuYW1lKTtcbiAgICAgICAgICAgIHJldHVybiBQcmVmYWJUcztcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYgKG5hbWUgIT0gcGFnZVRzLnBhZ2VOYW1lLkdhbWVBZExvYWRpbmcgJiYgIXRoaXMuY2hlY2tUd29Qb3BHYW1lKG5hbWUpKSB7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmNoZWNrVG9wUG9wR2FtZSh0aGlzLm5vd1BhZ2UpICYmIChuYW1lICE9PSBwYWdlVHMucGFnZU5hbWUuR2FtZVdhbGxldCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2VBcnIucHVzaCh7IG5hbWUsIGRhdGEgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5ub3dQYWdlICE9PSBuYW1lKSB7XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBudWxsO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBhZ2VBcnIubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBpdGVtID0gdGhpcy5wYWdlQXJyWzBdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlUGFnZShpdGVtLm5hbWUsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlQXJyLnVuc2hpZnQoeyBuYW1lLCBkYXRhIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMubm93UGFnZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWdlQXJyLnB1c2goaXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMubm93UGFnZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLm5vd1BhZ2UgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMubm93UGFnZSA9IG5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wYWdlT3Blbi5oYXMobmFtZSkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMucGFnZU9wZW4uZ2V0KG5hbWUpLCAndGhpcy5wYWdlT3Blbi5nZXQobmFtZSknKVxuICAgICAgICAgICAgbGV0IFByZWZhYjogY2MuTm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGFnZU9wZW4uZ2V0KG5hbWUpKTtcbiAgICAgICAgICAgIHN1Y2Nlc3NGbihQcmVmYWIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQocGFnZVRzLnBhZ2VVcmxbbmFtZV0sIGNjLlByZWZhYiwgKGVyciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IFByZWZhYiA9IGNjLmluc3RhbnRpYXRlKHJlcyk7XG4gICAgICAgICAgICAgICAgc3VjY2Vzc0ZuKFByZWZhYik7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoq5Yig6Zmk5pWw57uE5oyH5a6a55qE6aG16Z2i5ZCN5a2XICovXG4gICAgZGVsZWN0UGFnZUFycihuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5wYWdlQXJyLmxlbmd0aCwgJ+WIoOmZpOWJjScpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucGFnZUFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMucGFnZUFycltpXS5uYW1lID09IG5hbWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2VBcnIuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwi5Yig6Zmk5o6JXCIpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5wYWdlQXJyLmxlbmd0aCwgJ+WIoOmZpOWQjicpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOmihOWKoOi9vVxuICAgICAqIEBwYXJhbSBuYW1lIOWTquS4qumhtemdolxuICAgICAqL1xuICAgIHByZWxvYWRQYWdlKG5hbWU6IHN0cmluZykge1xuICAgICAgICBjYy5yZXNvdXJjZXMucHJlbG9hZChwYWdlVHMucGFnZVVybFtuYW1lXSwgY2MuUHJlZmFiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlhbPpl63lk6rkuKrpobXpnaJcbiAgICAgKiBAcGFyYW0gbmFtZSDlk6rkuKpcbiAgICAgKiBAcGFyYW0gYW5pIOaYr+WQpuacieWKqOeUu1xuICAgICovXG4gICAgY2xvc2VQYWdlKG5hbWU6IHN0cmluZywgYW5pOiBib29sZWFuID0gdHJ1ZSkge1xuICAgICAgICBsZXQgZGVsZXRlTmFtZSA9IG5hbWUucmVwbGFjZShuYW1lWzBdLCBuYW1lWzBdLnRvVXBwZXJDYXNlKCkpO1xuICAgICAgICB0aGlzLnBhZ2VPcGVuQXJyLmRlbGV0ZShkZWxldGVOYW1lKTtcblxuICAgICAgICBsZXQgc3RyOiBzdHJpbmcgPSBuYW1lLnJlcGxhY2UobmFtZVswXSwgbmFtZVswXS50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgbGV0IG5vZGUgPSB0aGlzLnBhZ2VPcGVuLmdldChzdHIpO1xuXG4gICAgICAgIGlmIChuYW1lICE9IHBhZ2VUcy5wYWdlTmFtZS5HYW1lQWRMb2FkaW5nICYmICF0aGlzLmNoZWNrVHdvUG9wR2FtZShuYW1lKSkge1xuICAgICAgICAgICAgdGhpcy5kZWxlY3RQYWdlQXJyKGRlbGV0ZU5hbWUpO1xuICAgICAgICAgICAgdGhpcy5ub3dQYWdlID0gbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFuaSA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGFuaSkge1xuICAgICAgICAgICAgdGhpcy5jbG9zZUFuaShub2RlKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kZXN0cm95UGFnZShub2RlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNoZWNrU3RvcEdhbWUoZGVsZXRlTmFtZSkpIHtcbiAgICAgICAgICAgIHRoaXMub3Blbk51bS0tO1xuICAgICAgICAgICAgaWYgKHRoaXMub3Blbk51bSA8IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5OdW0gPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMub3Blbk51bSwgJ3RoaXMub3Blbk51bScpXG4gICAgICAgIGlmICh1dGlsLmxldmVsU3RhdGUgPT0gZ2FtZVN0YXRlLnN0b3AgJiYgIXV0aWwuaXNTdG9wXG4gICAgICAgICAgICAmJiBkZWxldGVOYW1lICE9IHBhZ2VUcy5wYWdlTmFtZS5HYW1lQWRMb2FkaW5nXG4gICAgICAgICAgICAmJiBkZWxldGVOYW1lICE9IHBhZ2VUcy5wYWdlTmFtZS5HYW1lU3RhcnRcbiAgICAgICAgICAgICYmIGRlbGV0ZU5hbWUgIT0gcGFnZVRzLnBhZ2VOYW1lLkdhbWVFbmRcbiAgICAgICAgICAgICYmIHRoaXMub3Blbk51bSA9PSAwKSB7XG4gICAgICAgICAgICB1dGlsLmxldmVsU3RhdGUgPSBnYW1lU3RhdGUuc3RhcnQ7XG4gICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfUmVzdW1lKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWxleeOsOS4i+S4gOS4qumhtemdolxuICAgICAqL1xuICAgIHNob3dOZXh0UGFnZSgpIHtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5wYWdlQXJyLmxlbmd0aCwgJ3RoaXMucGFnZUFycicpXG4gICAgICAgIGlmICh0aGlzLnBhZ2VBcnIubGVuZ3RoID4gMCAmJiB0aGlzLnBhZ2VBcnJbMF0pIHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5wYWdlQXJyWzBdO1xuICAgICAgICAgICAgdGhpcy5zaG93UGFnZShpdGVtLm5hbWUsIGl0ZW0uZGF0YSk7XG4gICAgICAgICAgICB0aGlzLnBhZ2VBcnIuc3BsaWNlKDAsIDEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5p+l5om+5b2T5YmN5omT5byA55qE6aG16Z2iXG4gICAgICogQHBhcmFtIG5hbWUg6aG16Z2i5ZCN5a2XXG4gICAgICovXG4gICAgZmluZFBhZ2UobmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGxldCBzdHI6IHN0cmluZyA9IG5hbWUucmVwbGFjZShuYW1lWzBdLCBuYW1lWzBdLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgICBsZXQgbm9kZSA9IHRoaXMucGFnZU9wZW4uZ2V0KHN0cik7XG4gICAgICAgIGlmIChub2RlICYmIG5vZGUubmFtZSAhPSBcIlwiKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYWdlT3Blbi5nZXQoc3RyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKirlvIDlnLrliqjnlLsgXG4gICAgICogQHBhcmFtIG5vZGUg6IqC54K5XG4gICAgKi9cbiAgICBzaG93QW5pKG5vZGU6IGNjLk5vZGUpIHtcbiAgICAgICAgaWYgKG5vZGUubmFtZSA9PSBgZ2FtZVdhbGxldFJlY29yZGApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgYmc6IGNjLk5vZGUgPSBub2RlLmdldENoaWxkQnlOYW1lKFwiYmdcIik7XG4gICAgICAgIGxldCBjb25ldG50OiBjYy5Ob2RlID0gbm9kZS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIik7XG5cbiAgICAgICAgaWYgKGJnKSB7XG4gICAgICAgICAgICBiZy5vcGFjaXR5ID0gMDtcbiAgICAgICAgICAgIGNjLnR3ZWVuKGJnKS50byguMSwgeyBvcGFjaXR5OiAxNTAgfSkuc3RhcnQoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29uZXRudCkge1xuICAgICAgICAgICAgY29uZXRudC5zY2FsZSA9IDA7XG4gICAgICAgICAgICBjYy50d2Vlbihjb25ldG50KS50byguMiwgeyBzY2FsZTogMSB9KS5zdGFydCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5YWz6Zet5Yqo55S7XG4gICAgICogQHBhcmFtIG5vZGUg6IqC54K5XG4gICAgICovXG4gICAgY2xvc2VBbmkobm9kZTogY2MuTm9kZSkge1xuICAgICAgICBpZiAobm9kZSkge1xuICAgICAgICAgICAgaWYgKG5vZGUubmFtZSA9PSBgZ2FtZVdhbGxldFJlY29yZGApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRlc3Ryb3lQYWdlKG5vZGUpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG5vZGUubmFtZSAhPSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgbGV0IGJnOiBjYy5Ob2RlID0gbm9kZS5nZXRDaGlsZEJ5TmFtZShcImJnXCIpO1xuICAgICAgICAgICAgICAgIGxldCBjb25ldG50OiBjYy5Ob2RlID0gbm9kZS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIik7XG4gICAgICAgICAgICAgICAgaWYgKGJnKSBjYy50d2VlbihiZykudG8oLjIsIHsgb3BhY2l0eTogMCB9KS5zdGFydCgpO1xuICAgICAgICAgICAgICAgIGlmIChjb25ldG50KSBjYy50d2Vlbihjb25ldG50KS50byguMSwgeyBzY2FsZTogMCB9KS5zdGFydCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXN0cm95UGFnZShub2RlKTtcbiAgICAgICAgICAgICAgICB9LCAuMik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRlc3Ryb3lQYWdlKG5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6ZSA5q+B6aG16Z2iXG4gICAgICovXG4gICAgZGVzdHJveVBhZ2Uobm9kZTogY2MuTm9kZSwgaXNTaG93OiBib29sZWFuID0gdHJ1ZSkge1xuICAgICAgICBpZiAobm9kZSkge1xuICAgICAgICAgICAgbm9kZS5kZXN0cm95ICYmIG5vZGUuZGVzdHJveSgpO1xuICAgICAgICAgICAgbm9kZS5yZW1vdmVGcm9tUGFyZW50ICYmIG5vZGUucmVtb3ZlRnJvbVBhcmVudCgpO1xuICAgICAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLnJlbGVhc2VBc3NldCh0aGlzLnBhZ2VPcGVuLmdldChub2RlLm5hbWUpKTtcbiAgICAgICAgICAgIGlmIChpc1Nob3cpIHRoaXMuc2hvd05leHRQYWdlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICog5Yqg6L295LitLi4uLi4uXG4gICAqIEBwYXJhbSDliqDovb3kuK0uLi4uLi5cbiAgICovXG4gICAgcHVibGljIExvYWRpbmcodGltZU91dDogbnVtYmVyID0gOTk5OSkge1xuICAgICAgICBsZXQgbG9hZGluZ1BhcmVudCA9IGNjLmZpbmQoXCJDYW52YXMvTG9hZGluZ1wiKTtcbiAgICAgICAgaWYgKGxvYWRpbmdQYXJlbnQuY2hpbGRyZW5Db3VudCA8PSAwKSB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IG51bGw7XG4gICAgICAgICAgICBpZiAodGhpcy5wYWdlT3Blbi5oYXMoXCJMb2FkaW5nXCIpKSB7XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW06IGNjLk5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnBhZ2VPcGVuLmdldChcIkxvYWRpbmdcIikpO1xuICAgICAgICAgICAgICAgIGl0ZW0uc2V0UGFyZW50KGxvYWRpbmdQYXJlbnQpO1xuICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KExvYWRpbmcpLnNob3codGltZU91dCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNjLnJlc291cmNlcy5sb2FkKFwicHJlZmFiL2VmZmVjdC9Mb2FkaW5nXCIsIGNjLlByZWZhYiwgKGVyciwgcmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0gPSBjYy5pbnN0YW50aWF0ZShyZXMpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2VPcGVuLnNldChpdGVtLm5hbWUsIGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnNldFBhcmVudChsb2FkaW5nUGFyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoTG9hZGluZykuc2hvdyh0aW1lT3V0KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGhpZGVMb2FkaW5nKCkge1xuICAgICAgICBsZXQgbG9hZGluZyA9IGNjLmZpbmQoXCJDYW52YXMvTG9hZGluZ1wiKTtcbiAgICAgICAgbG9hZGluZyAmJiBsb2FkaW5nLnJlbW92ZUFsbENoaWxkcmVuKCk7XG4gICAgfVxuXG5cbn1cbiJdfQ==