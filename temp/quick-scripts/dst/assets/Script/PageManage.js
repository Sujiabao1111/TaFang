
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxQYWdlTWFuYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDBDQUFzRDtBQUN0RCwwQ0FBcUM7QUFDckMsMENBQXFDO0FBRXJDLG9DQUErQjtBQUN6QixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF3Qyw4QkFBWTtJQUFwRDtRQUFBLHFFQTRUQztRQXpURyxzQkFBc0I7UUFDdEIsaUJBQVcsR0FBdUIsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUU1QyxRQUFRO1FBQ1IsY0FBUSxHQUFtQixJQUFJLEdBQUcsRUFBRSxDQUFDO1FBUXJDLE9BQU87UUFDUCxhQUFPLEdBQVUsQ0FBQyxDQUFDO1FBRW5CLGVBQWU7UUFDUCxhQUFPLEdBQTRCLEVBQUUsQ0FBQztRQUM5QyxjQUFjO1FBQ04sYUFBTyxHQUFVLElBQUksQ0FBQzs7SUF1U2xDLENBQUM7bUJBNVRvQixVQUFVO0lBd0IzQiwyQkFBTSxHQUFOO1FBRUksSUFBRyxZQUFVLENBQUMsU0FBUyxFQUFDO1lBQ3BCLE9BQU87U0FDVjthQUFJO1lBQ0QsWUFBVSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7U0FDL0I7SUFFTCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxrQ0FBYSxHQUFiLFVBQWMsUUFBZTtRQUV6QixJQUFJLFVBQVUsR0FBRyxVQUFDLElBQUk7WUFDbEIsT0FBTyxJQUFJLElBQUksUUFBUSxDQUFDO1FBQzVCLENBQUMsQ0FBQTtRQUVELE9BQU8sZ0JBQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBRS9DLENBQUM7SUFFRDs7T0FFRztJQUNGLG9DQUFlLEdBQWYsVUFBZ0IsUUFBZTtRQUU1QixJQUFJLFVBQVUsR0FBRyxVQUFDLElBQUk7WUFDbEIsT0FBTyxJQUFJLElBQUksUUFB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QUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDM0QsSUFBRyxNQUFNO2dCQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUNqQztJQUNMLENBQUM7O0lBL1NhLG9CQUFTLEdBQWMsSUFBSSxDQUFDO0lBWnpCLFVBQVU7UUFEOUIsT0FBTztPQUNhLFVBQVUsQ0E0VDlCO0lBQUQsaUJBQUM7Q0E1VEQsQUE0VEMsQ0E1VHVDLEVBQUUsQ0FBQyxTQUFTLEdBNFRuRDtrQkE1VG9CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnYW1lU3RhdGUsIHByb3BUeXBlIH0gZnJvbSBcIi4vY29tbW9uL2ZhY2VUc1wiO1xuaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi9jb21tb24vTmFtZVRzXCI7XG5pbXBvcnQgcGFnZVRzIGZyb20gXCIuL2NvbW1vbi9wYWdlVHNcIjtcbmltcG9ydCB0b29sIGZyb20gXCIuL3V0aWwvdG9vbFwiO1xuaW1wb3J0IHV0aWwgZnJvbSBcIi4vdXRpbC91dGlsXCI7XG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhZ2VNYW5hZ2UgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgXG4gICAgLy/miZPlvIDnmoTnqpflj6PkuK3mmK/lkKbmnInph43lpI3nmoTvvIzlpoLmnpzmnInliJnkuI3miZPlvIBcbiAgICBwYWdlT3BlbkFycjpNYXA8c3RyaW5nLHN0cmluZz4gID0gbmV3IE1hcCgpO1xuXG4gICAgLy/miZPlvIDnmoTpooTliLbkvZNcbiAgICBwYWdlT3BlbjpNYXA8c3RyaW5nLGFueT4gPSBuZXcgTWFwKCk7XG5cbiAgICAvL+eItuexu1xuICAgIHBhcmVudDpjYy5Ob2RlO1xuXG4gICAgcHVibGljIHN0YXRpYyBzaW5nbGV0b246UGFnZU1hbmFnZSA9IG51bGw7XG5cblxuICAgIC8v5omT5byA55qE5pWw6YePXG4gICAgb3Blbk51bTpudW1iZXIgPSAwO1xuXG4gICAgLyoq6ZyA6KaB5omT5byA6aG16Z2i55qE5pWw57uEICovXG4gICAgcHJpdmF0ZSBwYWdlQXJyOntuYW1lOnN0cmluZyxkYXRhOmFueX1bXSA9IFtdO1xuICAgIC8qKueOsOWcqOaJk+W8gOeahOaYr+WTquS4qiAqL1xuICAgIHByaXZhdGUgbm93UGFnZTpzdHJpbmcgPSBudWxsO1xuICAgIFxuXG4gICAgb25Mb2FkKCl7XG5cbiAgICAgICAgaWYoUGFnZU1hbmFnZS5zaW5nbGV0b24pe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIFBhZ2VNYW5hZ2Uuc2luZ2xldG9uID0gdGhpcztcbiAgICAgICAgfVxuXG4gICAgfSAgICBcblxuICAgIC8qKlxuICAgICAqIOajgOafpeaYr+WQpuWcqOWBnOatoumhtemdouS4ilxuICAgICAqL1xuICAgIGNoZWNrU3RvcEdhbWUocGFnZU5hbWU6c3RyaW5nKXtcblxuICAgICAgICBsZXQgY2hlY2tBZHVsdCA9IChuYW1lKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gbmFtZSA9PSBwYWdlTmFtZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwYWdlVHMuc3RvcEdhbWVQYWdlLnNvbWUoY2hlY2tBZHVsdClcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOajgOafpeaYr+WQpuiDveS6jOe6p+W8ueeql1xuICAgICAqL1xuICAgICBjaGVja1R3b1BvcEdhbWUocGFnZU5hbWU6c3RyaW5nKXtcblxuICAgICAgICBsZXQgY2hlY2tBZHVsdCA9IChuYW1lKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gbmFtZSA9PSBwYWdlTmFtZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwYWdlVHMudHdvUG9wUGFnZS5zb21lKGNoZWNrQWR1bHQpXG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmo4Dmn6XmmK/lkKbog73mnIDpq5jlvLnnqpdcbiAgICAgKi9cbiAgICAgY2hlY2tUb3BQb3BHYW1lKHBhZ2VOYW1lOnN0cmluZyl7XG5cbiAgICAgICAgbGV0IGNoZWNrQWR1bHQgPSAobmFtZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG5hbWUgPT0gcGFnZU5hbWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcGFnZVRzLnRvcFBvcFBhZ2Uuc29tZShjaGVja0FkdWx0KVxuXG4gICAgfVxuICAgIFxuXG4gICAgLyoqXG4gICAgICog5omT5byA5ZOq5Liq6aG16Z2iXG4gICAgICogQHBhcmFtIG5hbWUg5ZOq5LiqXG4gICAgICogQHBhcmFtIGRhdGEg5pWw5o2uXG4gICAgICovXG4gICAgc2hvd1BhZ2UobmFtZTpzdHJpbmcsZGF0YTphbnk9bnVsbCl7XG4gICAgICAgIGlmKHRoaXMucGFnZU9wZW5BcnIuaGFzKG5hbWUpKXJldHVybjtcblxuICAgICAgICBsZXQgc3VjY2Vzc0ZuOkZ1bmN0aW9uID0gKFByZWZhYjpjYy5Ob2RlKT0+eyAgICAgICAgICAgIFxuICAgICAgICAgICAgLy/lpoLmnpzmnInliJnkuI3miZPlvIBcbiAgICAgICAgICAgIGlmKHRoaXMucGFnZU9wZW5BcnIuaGFzKG5hbWUpKXJldHVybjtcblxuICAgICAgICAgICAgdGhpcy5wYWdlT3Blbi5zZXQoUHJlZmFiLm5hbWUsUHJlZmFiKTtcblxuICAgICAgICAgICAgbGV0IFByZWZhYlRzID0gUHJlZmFiLmdldENvbXBvbmVudChQcmVmYWIubmFtZSk7XG4gICAgICAgICAgICBQcmVmYWIuc2V0UGFyZW50KHRoaXMucGFyZW50KTtcbiAgICAgICAgICAgIC8vIHRoaXMucGFnZU9wZW4uc2V0KFByZWZhYi5uYW1lLFByZWZhYik7XG4gICAgICAgICAgICBpZihQcmVmYWJUcyl7XG4gICAgICAgICAgICAgICAgUHJlZmFiVHMuaW5pdCYmUHJlZmFiVHMuaW5pdChkYXRhKTtcbiAgICAgICAgICAgICAgICBpZihQcmVmYWJUcy5pc0FuaSl0aGlzLnNob3dBbmkoUHJlZmFiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRoaXMuY2hlY2tTdG9wR2FtZShuYW1lKSl7XG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuTnVtKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBpZih1dGlsLmxldmVsU3RhdGUgIT0gZ2FtZVN0YXRlLnN0b3AgXG4gICAgICAgICAgICAvLyAgICAgJiYgbmFtZSAhPSBwYWdlVHMucGFnZU5hbWUuR2FtZUFkTG9hZGluZ1xuICAgICAgICAgICAgLy8gICAgICYmIG5hbWUgIT0gcGFnZVRzLnBhZ2VOYW1lLkdhbWVTdGFydFxuICAgICAgICAgICAgLy8gICAgICYmIG5hbWUgIT0gcGFnZVRzLnBhZ2VOYW1lLkdhbWVFbmQpe1xuICAgICAgICAgICAgLy8gICAgIHV0aWwubGV2ZWxTdGF0ZSA9IGdhbWVTdGF0ZS5zdG9wO1xuICAgICAgICAgICAgLy8gICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9TdG9wKTtcbiAgICAgICAgICAgIC8vIH1cblxuICAgICAgICAgICAgaWYodXRpbC5sZXZlbFN0YXRlICE9IGdhbWVTdGF0ZS5zdG9wJiYgbmFtZSAhPSBwYWdlVHMucGFnZU5hbWUuR2FtZUFkTG9hZGluZ1xuICAgICAgICAgICAgICAgICAgICAmJiBuYW1lICE9IHBhZ2VUcy5wYWdlTmFtZS5HYW1lU3RhcnRcbiAgICAgICAgICAgICAgICAgICAgJiYgbmFtZSAhPSBwYWdlVHMucGFnZU5hbWUuR2FtZUVuZCYmdGhpcy5vcGVuTnVtPjApe1xuICAgICAgICAgICAgICAgIHV0aWwubGV2ZWxTdGF0ZSA9IGdhbWVTdGF0ZS5zdG9wO1xuICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9TdG9wKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5wYWdlT3BlbkFyci5zZXQobmFtZSxuYW1lKTtcbiAgICAgICAgICAgIHJldHVybiBQcmVmYWJUcztcbiAgICAgICAgfVxuICAgICAgICBcblxuICAgICAgICBpZihuYW1lICE9IHBhZ2VUcy5wYWdlTmFtZS5HYW1lQWRMb2FkaW5nJiYhdGhpcy5jaGVja1R3b1BvcEdhbWUobmFtZSkpe1xuXG4gICAgICAgICAgICBpZih0aGlzLmNoZWNrVG9wUG9wR2FtZSh0aGlzLm5vd1BhZ2UpJiYobmFtZSAhPT0gcGFnZVRzLnBhZ2VOYW1lLkdhbWVXYWxsZXQpKXtcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2VBcnIucHVzaCh7bmFtZSxkYXRhfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZih0aGlzLm5vd1BhZ2UhPT1uYW1lKXtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IG51bGw7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5wYWdlQXJyLmxlbmd0aD4wKXtcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9IHRoaXMucGFnZUFyclswXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZVBhZ2UoaXRlbS5uYW1lLGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlQXJyLnVuc2hpZnQoe25hbWUsZGF0YX0pO1xuICAgICAgICAgICAgICAgIHRoaXMubm93UGFnZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgaWYoaXRlbSl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFnZUFyci5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRoaXMubm93UGFnZSE9PW51bGwpe1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRoaXMubm93UGFnZT09bnVsbCl7XG4gICAgICAgICAgICAgICAgdGhpcy5ub3dQYWdlID0gbmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcblxuICAgICAgICBcblxuICAgICAgICBpZih0aGlzLnBhZ2VPcGVuLmhhcyhuYW1lKSl7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMucGFnZU9wZW4uZ2V0KG5hbWUpLCd0aGlzLnBhZ2VPcGVuLmdldChuYW1lKScpXG5cbiAgICAgICAgICAgIGxldCBQcmVmYWI6Y2MuTm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGFnZU9wZW4uZ2V0KG5hbWUpKTsgICAgICAgICAgICBcblxuICAgICAgICAgICAgc3VjY2Vzc0ZuKFByZWZhYik7XG5cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBjYy5yZXNvdXJjZXMubG9hZChwYWdlVHMucGFnZVVybFtuYW1lXSxjYy5QcmVmYWIsKGVycixyZXMpPT57XG5cbiAgICAgICAgICAgICAgICBsZXQgUHJlZmFiID0gY2MuaW5zdGFudGlhdGUocmVzKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgIFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3NGbihQcmVmYWIpO1xuICAgIFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKuWIoOmZpOaVsOe7hOaMh+WumueahOmhtemdouWQjeWtlyAqL1xuICAgIGRlbGVjdFBhZ2VBcnIobmFtZTpzdHJpbmcpe1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnBhZ2VBcnIubGVuZ3RoLCfliKDpmaTliY0nKTtcbiAgICAgICAgZm9yKGxldCBpID0gMDtpPHRoaXMucGFnZUFyci5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgIGlmKHRoaXMucGFnZUFycltpXS5uYW1lID09IG5hbWUpe1xuICAgICAgICAgICAgICAgIHRoaXMucGFnZUFyci5zcGxpY2UoaSwxKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWIoOmZpOaOiVwiKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucGFnZUFyci5sZW5ndGgsJ+WIoOmZpOWQjicpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6aKE5Yqg6L29XG4gICAgICogQHBhcmFtIG5hbWUg5ZOq5Liq6aG16Z2iXG4gICAgICovXG4gICAgcHJlbG9hZFBhZ2UobmFtZTpzdHJpbmcpe1xuICAgICAgICBjYy5yZXNvdXJjZXMucHJlbG9hZChwYWdlVHMucGFnZVVybFtuYW1lXSxjYy5QcmVmYWIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWFs+mXreWTquS4qumhtemdolxuICAgICAqIEBwYXJhbSBuYW1lIOWTquS4qlxuICAgICAqIEBwYXJhbSBhbmkg5piv5ZCm5pyJ5Yqo55S7XG4gICAgKi9cbiAgICBjbG9zZVBhZ2UobmFtZTpzdHJpbmcsYW5pOmJvb2xlYW4gPSB0cnVlKXsgICAgICAgICAgICBcbiAgICAgICAgbGV0IGRlbGV0ZU5hbWUgPSBuYW1lLnJlcGxhY2UobmFtZVswXSxuYW1lWzBdLnRvVXBwZXJDYXNlKCkpO1xuICAgICAgICB0aGlzLnBhZ2VPcGVuQXJyLmRlbGV0ZShkZWxldGVOYW1lKTtcblxuICAgICAgICBsZXQgc3RyOnN0cmluZyA9IG5hbWUucmVwbGFjZShuYW1lWzBdLG5hbWVbMF0udG9Mb3dlckNhc2UoKSk7XG4gICAgICAgIGxldCBub2RlID0gdGhpcy5wYWdlT3Blbi5nZXQoc3RyKTtcbiAgICAgICAgXG4gICAgICAgIGlmKG5hbWUgIT0gcGFnZVRzLnBhZ2VOYW1lLkdhbWVBZExvYWRpbmcmJiF0aGlzLmNoZWNrVHdvUG9wR2FtZShuYW1lKSl7XG4gICAgICAgICAgICB0aGlzLmRlbGVjdFBhZ2VBcnIoZGVsZXRlTmFtZSk7XG4gICAgICAgICAgICB0aGlzLm5vd1BhZ2UgPSBudWxsO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGFuaSA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoYW5pKXtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VBbmkobm9kZSlcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lQYWdlKG5vZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGhpcy5jaGVja1N0b3BHYW1lKGRlbGV0ZU5hbWUpKXtcbiAgICAgICAgICAgIHRoaXMub3Blbk51bS0tO1xuICAgICAgICAgICAgaWYodGhpcy5vcGVuTnVtIDwgMCl7XG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuTnVtID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm9wZW5OdW0sJ3RoaXMub3Blbk51bScpXG4gICAgICAgIGlmKHV0aWwubGV2ZWxTdGF0ZT09Z2FtZVN0YXRlLnN0b3AmJiF1dGlsLmlzU3RvcCBcbiAgICAgICAgICAgICYmIGRlbGV0ZU5hbWUgIT0gcGFnZVRzLnBhZ2VOYW1lLkdhbWVBZExvYWRpbmcgXG4gICAgICAgICAgICAmJiBkZWxldGVOYW1lICE9IHBhZ2VUcy5wYWdlTmFtZS5HYW1lU3RhcnRcbiAgICAgICAgICAgICYmIGRlbGV0ZU5hbWUgIT0gcGFnZVRzLnBhZ2VOYW1lLkdhbWVFbmRcbiAgICAgICAgICAgICYmIHRoaXMub3Blbk51bSA9PSAwKVxuICAgICAgICB7XG4gICAgICAgICAgICB1dGlsLmxldmVsU3RhdGUgPSBnYW1lU3RhdGUuc3RhcnQ7XG4gICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfUmVzdW1lKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlsZXnjrDkuIvkuIDkuKrpobXpnaJcbiAgICAgKi9cbiAgICBzaG93TmV4dFBhZ2UoKXtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5wYWdlQXJyLmxlbmd0aCwndGhpcy5wYWdlQXJyJylcbiAgICAgICAgaWYodGhpcy5wYWdlQXJyLmxlbmd0aD4wJiZ0aGlzLnBhZ2VBcnJbMF0pe1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnBhZ2VBcnJbMF07XG4gICAgICAgICAgICB0aGlzLnNob3dQYWdlKGl0ZW0ubmFtZSxpdGVtLmRhdGEpO1xuICAgICAgICAgICAgdGhpcy5wYWdlQXJyLnNwbGljZSgwLDEpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmn6Xmib7lvZPliY3miZPlvIDnmoTpobXpnaJcbiAgICAgKiBAcGFyYW0gbmFtZSDpobXpnaLlkI3lrZdcbiAgICAgKi9cbiAgICAgZmluZFBhZ2UobmFtZTpzdHJpbmcpe1xuICAgICAgICBsZXQgc3RyOnN0cmluZyA9IG5hbWUucmVwbGFjZShuYW1lWzBdLG5hbWVbMF0udG9Mb3dlckNhc2UoKSk7XG4gICAgICAgIGxldCBub2RlID0gdGhpcy5wYWdlT3Blbi5nZXQoc3RyKTsgICAgICAgIFxuICAgICAgICBpZihub2RlICYmIG5vZGUubmFtZSAhPSBcIlwiKXsgICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBhZ2VPcGVuLmdldChzdHIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBcbiAgICAvKirlvIDlnLrliqjnlLsgXG4gICAgICogQHBhcmFtIG5vZGUg6IqC54K5XG4gICAgKi9cbiAgICBzaG93QW5pKG5vZGU6Y2MuTm9kZSl7XG4gICAgICAgIGlmKG5vZGUubmFtZSA9PSBgZ2FtZVdhbGxldFJlY29yZGApe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBiZzpjYy5Ob2RlID0gbm9kZS5nZXRDaGlsZEJ5TmFtZShcImJnXCIpO1xuICAgICAgICBsZXQgY29uZXRudDpjYy5Ob2RlID0gbm9kZS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIik7XG4gICAgICAgIFxuICAgICAgICBpZihiZyl7XG4gICAgICAgICAgICBiZy5vcGFjaXR5ID0gMDtcbiAgICAgICAgICAgIGNjLnR3ZWVuKGJnKS50byguMSx7b3BhY2l0eToxNTB9KS5zdGFydCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmKGNvbmV0bnQpe1xuICAgICAgICAgICAgY29uZXRudC5zY2FsZSA9IDA7XG4gICAgICAgICAgICBjYy50d2Vlbihjb25ldG50KS50byguMix7c2NhbGU6MX0pLnN0YXJ0KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICog5YWz6Zet5Yqo55S7XG4gICAgICogQHBhcmFtIG5vZGUg6IqC54K5XG4gICAgICovXG4gICAgY2xvc2VBbmkobm9kZTpjYy5Ob2RlKXtcblxuICAgICAgICBpZihub2RlKXtcbiAgICAgICAgICAgIGlmKG5vZGUubmFtZSA9PSBgZ2FtZVdhbGxldFJlY29yZGB8fG5vZGUubmFtZSA9PSBgZ2FtZUtpbmdQYW9gfHxub2RlLm5hbWUgPT0gYGdhbWVLaW5nUGFvUHJvZ3Jlc3NgKXtcbiAgICAgICAgICAgICAgICB0aGlzLmRlc3Ryb3lQYWdlKG5vZGUpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYobm9kZS5uYW1lICE9IFwiXCIpe1xuICAgICAgICAgICAgICAgIGxldCBiZzpjYy5Ob2RlID0gbm9kZS5nZXRDaGlsZEJ5TmFtZShcImJnXCIpO1xuICAgICAgICAgICAgICAgIGxldCBjb25ldG50OmNjLk5vZGUgPSBub2RlLmdldENoaWxkQnlOYW1lKFwiY29udGVudFwiKTtcbiAgICAgICAgICAgICAgICBpZihiZyljYy50d2VlbihiZykudG8oLjIse29wYWNpdHk6MH0pLnN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgaWYoY29uZXRudCljYy50d2Vlbihjb25ldG50KS50byguMSx7c2NhbGU6MH0pLnN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXN0cm95UGFnZShub2RlKTtcbiAgICAgICAgICAgICAgICB9LC4yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5kZXN0cm95UGFnZShub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOmUgOavgemhtemdolxuICAgICAqL1xuICAgIGRlc3Ryb3lQYWdlKG5vZGU6Y2MuTm9kZSxpc1Nob3c6Ym9vbGVhbiA9IHRydWUpe1xuICAgICAgICBpZihub2RlKXtcbiAgICAgICAgICAgIG5vZGUuZGVzdHJveSYmbm9kZS5kZXN0cm95KCk7XG4gICAgICAgICAgICBub2RlLnJlbW92ZUZyb21QYXJlbnQmJm5vZGUucmVtb3ZlRnJvbVBhcmVudCgpO1xuICAgICAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLnJlbGVhc2VBc3NldCh0aGlzLnBhZ2VPcGVuLmdldChub2RlLm5hbWUpKTtcbiAgICAgICAgICAgIGlmKGlzU2hvdyl0aGlzLnNob3dOZXh0UGFnZSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19