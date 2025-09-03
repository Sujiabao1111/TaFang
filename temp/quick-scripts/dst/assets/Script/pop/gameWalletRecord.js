
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/pop/gameWalletRecord.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a0963AQdVxLZ5lKurpTCebI', 'gameWalletRecord');
// Script/pop/gameWalletRecord.ts

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
var baseTs_1 = require("../base/baseTs");
var WalletRecord_1 = require("../model/WalletRecord");
var UrlConst_1 = require("../server/UrlConst");
var XMSDK_1 = require("../server/xmsdk_cocos/XMSDK");
var soundController_1 = require("../soundController");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gameWalletRecord = /** @class */ (function (_super) {
    __extends(gameWalletRecord, _super);
    function gameWalletRecord() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.haveRecordNode = null;
        _this.noRecordNode = null;
        _this.walletRecordPre = null;
        _this.recordContent = null;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    gameWalletRecord.prototype.onEnable = function () {
        var _this = this;
        XMSDK_1.default.post({
            url: UrlConst_1.UrlConst.wallet_record,
            onSuccess: function (res) {
                if (!_this.isValid) {
                    return;
                }
                if (res.code === 0) {
                    var recordData = res.data.list;
                    var recordChild = _this.recordContent.children;
                    var addNum = 0; //需要添加的recordItem
                    if (recordChild.length < recordData.length) {
                        addNum = recordData.length - recordChild.length;
                    }
                    for (var i = 0; i < addNum; i++) {
                        var recordItem = cc.instantiate(_this.walletRecordPre);
                        recordItem.parent = _this.recordContent;
                        recordItem.active = true;
                    }
                    if (recordData.length > 0) {
                        _this.noRecordNode.active = false;
                        _this.haveRecordNode.active = true;
                        for (var i = 0; i < recordData.length; i++) {
                            if (recordChild[i]) {
                                recordChild[i].getComponent(WalletRecord_1.default).updateData(recordData[i]);
                            }
                        }
                    }
                    else {
                        _this.noRecordNode.active = true;
                        _this.haveRecordNode.active = false;
                    }
                }
                else {
                }
            },
            onFail: function (err) {
            }
        });
    };
    gameWalletRecord.prototype.clickClose = function () {
        soundController_1.default.singleton.clickAudio();
        this.closePage();
    };
    __decorate([
        property(cc.Node)
    ], gameWalletRecord.prototype, "haveRecordNode", void 0);
    __decorate([
        property(cc.Node)
    ], gameWalletRecord.prototype, "noRecordNode", void 0);
    __decorate([
        property(cc.Prefab)
    ], gameWalletRecord.prototype, "walletRecordPre", void 0);
    __decorate([
        property(cc.Node)
    ], gameWalletRecord.prototype, "recordContent", void 0);
    gameWalletRecord = __decorate([
        ccclass
    ], gameWalletRecord);
    return gameWalletRecord;
}(baseTs_1.default));
exports.default = gameWalletRecord;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVXYWxsZXRSZWNvcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUNBQW9DO0FBQ3BDLHNEQUFpRDtBQUNqRCwrQ0FBOEM7QUFDOUMscURBQWdEO0FBQ2hELHNEQUFpRDtBQUUzQyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQVU1QztJQUE4QyxvQ0FBTTtJQUFwRDtRQUFBLHFFQWtFQztRQS9ERyxvQkFBYyxHQUFZLElBQUksQ0FBQztRQUcvQixrQkFBWSxHQUFZLElBQUksQ0FBQztRQUc3QixxQkFBZSxHQUFjLElBQUksQ0FBQztRQUdsQyxtQkFBYSxHQUFZLElBQUksQ0FBQzs7SUFzRGxDLENBQUM7SUFwREcsd0JBQXdCO0lBRXhCLG1DQUFRLEdBQVI7UUFBQSxpQkE0Q0M7UUEzQ0csZUFBSyxDQUFDLElBQUksQ0FBQztZQUNQLEdBQUcsRUFBRSxtQkFBUSxDQUFDLGFBQWE7WUFDM0IsU0FBUyxFQUFFLFVBQUEsR0FBRztnQkFDVixJQUFHLENBQUMsS0FBSSxDQUFDLE9BQU8sRUFBQztvQkFDYixPQUFPO2lCQUNWO2dCQUVELElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxDQUFDLEVBQUU7b0JBQ2hCLElBQUksVUFBVSxHQUE0QixHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFDeEQsSUFBSSxXQUFXLEdBQUcsS0FBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7b0JBQzlDLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFTLGlCQUFpQjtvQkFDekMsSUFBSSxXQUFXLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUU7d0JBQ3hDLE1BQU0sR0FBRyxVQUFVLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUM7cUJBQ25EO29CQUNELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7d0JBQzdCLElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsS0FBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO3dCQUN0RCxVQUFVLENBQUMsTUFBTSxHQUFHLEtBQUksQ0FBQyxhQUFhLENBQUM7d0JBQ3ZDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO3FCQUM1QjtvQkFFRCxJQUFJLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO3dCQUN2QixLQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7d0JBQ2pDLEtBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQzt3QkFFbEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7NEJBQ3hDLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dDQUNoQixXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLHNCQUFZLENBQUMsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7NkJBQ3ZFO3lCQUNKO3FCQUNKO3lCQUNJO3dCQUNELEtBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQzt3QkFDaEMsS0FBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO3FCQUN0QztpQkFDSjtxQkFDSTtpQkFFSjtZQUNMLENBQUM7WUFDRCxNQUFNLEVBQUUsVUFBQSxHQUFHO1lBRVgsQ0FBQztTQUNKLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCxxQ0FBVSxHQUFWO1FBQ0kseUJBQWUsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDdkMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUE5REQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs0REFDYTtJQUcvQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzBEQUNXO0lBRzdCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7NkRBQ2M7SUFHbEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsyREFDWTtJQVpiLGdCQUFnQjtRQURwQyxPQUFPO09BQ2EsZ0JBQWdCLENBa0VwQztJQUFELHVCQUFDO0NBbEVELEFBa0VDLENBbEU2QyxnQkFBTSxHQWtFbkQ7a0JBbEVvQixnQkFBZ0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYmFzZVRzIGZyb20gXCIuLi9iYXNlL2Jhc2VUc1wiO1xuaW1wb3J0IFdhbGxldFJlY29yZCBmcm9tIFwiLi4vbW9kZWwvV2FsbGV0UmVjb3JkXCI7XG5pbXBvcnQgeyBVcmxDb25zdCB9IGZyb20gXCIuLi9zZXJ2ZXIvVXJsQ29uc3RcIjtcbmltcG9ydCBYTVNESyBmcm9tIFwiLi4vc2VydmVyL3htc2RrX2NvY29zL1hNU0RLXCI7XG5pbXBvcnQgc291bmRDb250cm9sbGVyIGZyb20gXCIuLi9zb3VuZENvbnRyb2xsZXJcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuZXhwb3J0IGludGVyZmFjZSB3YWxsZXRSZWNvcmREYXRhIHtcbiAgICBhbW91bnQ6IHN0cmluZ1x0ICAgIC8v546w6YeR77yI5YWD77yJXG4gICAgY3JlYXRlVGltZTogbnVtYmVyXHQvL+aPkOeOsOaXtumXtFxuICAgIHJlbWFyazogc3RyaW5nXHQgICAgLy/lpIfms6hcbiAgICBzdGF0ZTogbnVtYmVyICAgICAgIC8v54q25oCBOiAwLeWuoeaguOS4rSAyLeWuoeaguOS4jemAmui/hyAzLeW3sui9rOi0plxufVxuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZ2FtZVdhbGxldFJlY29yZCBleHRlbmRzIGJhc2VUcyB7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBoYXZlUmVjb3JkTm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBub1JlY29yZE5vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcbiAgICB3YWxsZXRSZWNvcmRQcmU6IGNjLlByZWZhYiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICByZWNvcmRDb250ZW50OiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gICAgb25FbmFibGUoKSB7XG4gICAgICAgIFhNU0RLLnBvc3Qoe1xuICAgICAgICAgICAgdXJsOiBVcmxDb25zdC53YWxsZXRfcmVjb3JkLFxuICAgICAgICAgICAgb25TdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgICAgICAgIGlmKCF0aGlzLmlzVmFsaWQpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZWNvcmREYXRhOiBBcnJheTx3YWxsZXRSZWNvcmREYXRhPiA9IHJlcy5kYXRhLmxpc3Q7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZWNvcmRDaGlsZCA9IHRoaXMucmVjb3JkQ29udGVudC5jaGlsZHJlbjtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFkZE51bSA9IDA7ICAgICAgICAgLy/pnIDopoHmt7vliqDnmoRyZWNvcmRJdGVtXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZWNvcmRDaGlsZC5sZW5ndGggPCByZWNvcmREYXRhLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWRkTnVtID0gcmVjb3JkRGF0YS5sZW5ndGggLSByZWNvcmRDaGlsZC5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhZGROdW07IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlY29yZEl0ZW0gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLndhbGxldFJlY29yZFByZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWNvcmRJdGVtLnBhcmVudCA9IHRoaXMucmVjb3JkQ29udGVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlY29yZEl0ZW0uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZWNvcmREYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9SZWNvcmROb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXZlUmVjb3JkTm9kZS5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlY29yZERhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVjb3JkQ2hpbGRbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjb3JkQ2hpbGRbaV0uZ2V0Q29tcG9uZW50KFdhbGxldFJlY29yZCkudXBkYXRlRGF0YShyZWNvcmREYXRhW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vUmVjb3JkTm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXZlUmVjb3JkTm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkZhaWw6IGVyciA9PiB7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjbGlja0Nsb3NlKCkge1xuICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcbiAgICAgICAgdGhpcy5jbG9zZVBhZ2UoKTtcbiAgICB9XG59XG4iXX0=