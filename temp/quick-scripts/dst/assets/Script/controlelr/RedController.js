
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/controlelr/RedController.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '904e8v5QD1O7LVBI0m8VoF3', 'RedController');
// Script/controlelr/RedController.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UrlConst_1 = require("../server/UrlConst");
var XMSDK_1 = require("../server/xmsdk_cocos/XMSDK");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var util_1 = require("../util/util");
var RedController = /** @class */ (function () {
    function RedController() {
        this.signRed = null;
        this.onPrizeData = null;
        this.wheelRed = null;
        this.wheelCount = 0; //转盘剩余次数
    }
    //检查任务红点
    RedController.prototype.checkTaskRed = function (call) {
        var okNum = 0;
        util_1.default.getdataStr({
            url: UrlConst_1.UrlConst.task_day_main,
            success: function (res) {
                if (res.list) {
                    var list = res.list;
                    for (var i = 0; i < list.length; i++) {
                        if (list[i].buttonType == 3) {
                            okNum++;
                        }
                    }
                    util_1.default.getdataStr({
                        url: UrlConst_1.UrlConst.achievement_main,
                        success: function (res) {
                            if (res && res.list) {
                                var list_1 = res.list;
                                for (var i = 0; i < list_1.length; i++) {
                                    if (list_1[i].buttonType == 3) {
                                        okNum++;
                                    }
                                }
                                call && call(okNum);
                            }
                        }
                    });
                }
            }
        });
    };
    //初始化签到处红点信息
    RedController.prototype.initSignRedData = function (redNode) {
        var _this = this;
        this.signRed = redNode;
        XMSDK_1.default.getdataStr({
            url: UrlConst_1.UrlConst.sign_main,
            onSuccess: function (res) {
                if (res.code === 0 && res.data) {
                    if (res && res.data) {
                        util_1.default.isOkSign = res.data.todayChecked;
                    }
                }
            },
            onFail: function (err) {
            }
        });
        XMSDK_1.default.getdataStr({
            url: UrlConst_1.UrlConst.onPrizeGetRewardMain,
            onSuccess: function (res) {
                if (res.code === 0 && res.data) {
                    _this.onPrizeData = res.data;
                }
                else {
                    XMSDK_1.default.toast(res.message || '网络出错~', 2.5, 1);
                }
            },
            onFail: function (res) {
            }
        });
    };
    //检查首页签到红点
    RedController.prototype.checkMainSignRed = function () {
        var self = this;
        if (self.signRed && self.onPrizeData) {
            var allRedData = self.onPrizeData.onPrizeRedData;
            var isHaveGet = false; //是否有可领取的红包
            var curTime = util_1.default.onlineTimeNum;
            var redData = null;
            for (var i = 0; i < allRedData.length; i++) {
                redData = allRedData[i];
                if (redData.state == 0 && redData.waitTime <= curTime) {
                    isHaveGet = true;
                }
            }
            if (!util_1.default.isOkSign || isHaveGet) {
                if (!self.signRed.active) {
                    self.signRed.active = true;
                    TrackMgr_1.default.little_red_dots({
                        activity_state: "小红点展示",
                        activity_position: "签到",
                    });
                    if (redData) {
                        TrackMgr_1.default.Online_rewards({
                            activity_state: "在线奖励达成",
                            reward_state: redData.waitTime / 60 + "\u5206\u949F",
                        });
                    }
                }
            }
            else if (self.signRed.active) {
                self.signRed.active = false;
            }
        }
    };
    RedController.prototype.initGoldWheelData = function (wheelRed) {
        var _this = this;
        this.wheelRed = wheelRed;
        XMSDK_1.default.getdataStr({
            url: UrlConst_1.UrlConst.goldWheel_index,
            onSuccess: function (res) {
                if (res.code === 0) {
                    _this.wheelCount = res.data.times;
                    if (_this.wheelCount > 0) {
                        _this.checkMainGoldWheelRed(true);
                    }
                }
                else {
                }
            },
            onFail: function (err) {
            }
        });
    };
    RedController.prototype.checkMainGoldWheelRed = function (state) {
        if (this.wheelRed) {
            if (state != null) {
                this.wheelRed.active = state;
            }
            else {
                if (util_1.default.userData.product <= 5) {
                    if (this.wheelCount > 0) {
                        if (!this.wheelRed.active) {
                            this.wheelRed.active = true;
                            TrackMgr_1.default.little_red_dots({
                                activity_state: "小红点展示",
                                activity_position: "大转盘",
                            });
                        }
                    }
                }
                else if (this.wheelRed.active) {
                    this.wheelRed.active = false;
                }
            }
        }
    };
    return RedController;
}());
exports.default = new RedController();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxjb250cm9sZWxyXFxSZWRDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsK0NBQThDO0FBQzlDLHFEQUFnRDtBQUNoRCxpREFBNEM7QUFDNUMscUNBQWdDO0FBTWhDO0lBQUE7UUFpQ0ksWUFBTyxHQUFZLElBQUksQ0FBQztRQUN4QixnQkFBVyxHQUFHLElBQUksQ0FBQztRQTBFbkIsYUFBUSxHQUFZLElBQUksQ0FBQztRQUN6QixlQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUTtJQThDNUIsQ0FBQztJQTFKRyxRQUFRO0lBQ1Isb0NBQVksR0FBWixVQUFhLElBQUk7UUFDYixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDZCxjQUFJLENBQUMsVUFBVSxDQUFDO1lBQ1osR0FBRyxFQUFFLG1CQUFRLENBQUMsYUFBYTtZQUMzQixPQUFPLEVBQUUsVUFBQyxHQUFHO2dCQUNULElBQUksR0FBRyxDQUFDLElBQUksRUFBRTtvQkFDVixJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO29CQUNwQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTt3QkFDbEMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxJQUFJLENBQUMsRUFBRTs0QkFDekIsS0FBSyxFQUFFLENBQUM7eUJBQ1g7cUJBQ0o7b0JBQ0QsY0FBSSxDQUFDLFVBQVUsQ0FBQzt3QkFDWixHQUFHLEVBQUUsbUJBQVEsQ0FBQyxnQkFBZ0I7d0JBQzlCLE9BQU8sRUFBRSxVQUFDLEdBQUc7NEJBQ1QsSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksRUFBRTtnQ0FDakIsSUFBSSxNQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztnQ0FDcEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVB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Qzt3QkFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFOzRCQUN2QixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7NEJBQzVCLGtCQUFRLENBQUMsZUFBZSxDQUFDO2dDQUNyQixjQUFjLEVBQUUsT0FBTztnQ0FDdkIsaUJBQWlCLEVBQUUsS0FBSzs2QkFDM0IsQ0FBQyxDQUFBO3lCQUNMO3FCQUNKO2lCQUNKO3FCQUNJLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7b0JBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztpQkFDaEM7YUFDSjtTQUNKO0lBQ0wsQ0FBQztJQUNMLG9CQUFDO0FBQUQsQ0EzSkEsQUEySkMsSUFBQTtBQUVELGtCQUFlLElBQUksYUFBYSxFQUFFLENBQUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBvblByaXplUmVkSXRlbURhdGEgfSBmcm9tIFwiLi4vb25Qcml6ZUdldC9PblByaXplR2V0XCI7XG5pbXBvcnQgeyBVcmxDb25zdCB9IGZyb20gXCIuLi9zZXJ2ZXIvVXJsQ29uc3RcIjtcbmltcG9ydCBYTVNESyBmcm9tIFwiLi4vc2VydmVyL3htc2RrX2NvY29zL1hNU0RLXCI7XG5pbXBvcnQgVHJhY2tNZ3IgZnJvbSBcIi4uL1RyYWNrTWdyL1RyYWNrTWdyXCI7XG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vdXRpbC91dGlsXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2Ugb25Qcml6ZURhdGEge1xuICAgIG9uUHJpemVSZWREYXRhOiBBcnJheTxvblByaXplUmVkSXRlbURhdGE+ICAgICAgICAgICAvL+WFqOmDqOe6ouWMheWFqOmDqOS/oeaBr1xufVxuXG5jbGFzcyBSZWRDb250cm9sbGVyIHtcbiAgICAvL+ajgOafpeS7u+WKoee6oueCuVxuICAgIGNoZWNrVGFza1JlZChjYWxsKSB7XG4gICAgICAgIGxldCBva051bSA9IDA7XG4gICAgICAgIHV0aWwuZ2V0ZGF0YVN0cih7XG4gICAgICAgICAgICB1cmw6IFVybENvbnN0LnRhc2tfZGF5X21haW4sXG4gICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlcy5saXN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBsaXN0ID0gcmVzLmxpc3Q7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxpc3RbaV0uYnV0dG9uVHlwZSA9PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2tOdW0rKztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB1dGlsLmdldGRhdGFTdHIoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBVcmxDb25zdC5hY2hpZXZlbWVudF9tYWluLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMgJiYgcmVzLmxpc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxpc3QgPSByZXMubGlzdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGlzdFtpXS5idXR0b25UeXBlID09IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBva051bSsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGwgJiYgY2FsbChva051bSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2lnblJlZDogY2MuTm9kZSA9IG51bGw7XG4gICAgb25Qcml6ZURhdGEgPSBudWxsO1xuICAgIC8v5Yid5aeL5YyW562+5Yiw5aSE57qi54K55L+h5oGvXG4gICAgaW5pdFNpZ25SZWREYXRhKHJlZE5vZGU6IGNjLk5vZGUpIHtcbiAgICAgICAgdGhpcy5zaWduUmVkID0gcmVkTm9kZTtcblxuICAgICAgICBYTVNESy5nZXRkYXRhU3RyKHtcbiAgICAgICAgICAgIHVybDogVXJsQ29uc3Quc2lnbl9tYWluLFxuICAgICAgICAgICAgb25TdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PT0gMCAmJiByZXMuZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzICYmIHJlcy5kYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlsLmlzT2tTaWduID0gcmVzLmRhdGEudG9kYXlDaGVja2VkO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uRmFpbDogZXJyID0+IHtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIClcblxuICAgICAgICBYTVNESy5nZXRkYXRhU3RyKHtcbiAgICAgICAgICAgIHVybDogVXJsQ29uc3Qub25Qcml6ZUdldFJld2FyZE1haW4sXG4gICAgICAgICAgICBvblN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09PSAwICYmIHJlcy5kYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25Qcml6ZURhdGEgPSByZXMuZGF0YTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBYTVNESy50b2FzdChyZXMubWVzc2FnZSB8fCAn572R57uc5Ye66ZSZficsIDIuNSwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uRmFpbDogcmVzID0+IHtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8v5qOA5p+l6aaW6aG1562+5Yiw57qi54K5XG4gICAgY2hlY2tNYWluU2lnblJlZCgpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBpZiAoc2VsZi5zaWduUmVkICYmIHNlbGYub25Qcml6ZURhdGEpIHtcbiAgICAgICAgICAgIGxldCBhbGxSZWREYXRhID0gc2VsZi5vblByaXplRGF0YS5vblByaXplUmVkRGF0YTtcbiAgICAgICAgICAgIGxldCBpc0hhdmVHZXQgPSBmYWxzZTsgIC8v5piv5ZCm5pyJ5Y+v6aKG5Y+W55qE57qi5YyFXG4gICAgICAgICAgICBsZXQgY3VyVGltZSA9IHV0aWwub25saW5lVGltZU51bTtcbiAgICAgICAgICAgIGxldCByZWREYXRhOiBvblByaXplUmVkSXRlbURhdGEgPSBudWxsO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbGxSZWREYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcmVkRGF0YSA9IGFsbFJlZERhdGFbaV07XG4gICAgICAgICAgICAgICAgaWYgKHJlZERhdGEuc3RhdGUgPT0gMCAmJiByZWREYXRhLndhaXRUaW1lIDw9IGN1clRpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaXNIYXZlR2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdXRpbC5pc09rU2lnbiB8fCBpc0hhdmVHZXQpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXNlbGYuc2lnblJlZC5hY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zaWduUmVkLmFjdGl2ZSA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgVHJhY2tNZ3IubGl0dGxlX3JlZF9kb3RzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2aXR5X3N0YXRlOiBcIuWwj+e6oueCueWxleekulwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZpdHlfcG9zaXRpb246IFwi562+5YiwXCIsXG4gICAgICAgICAgICAgICAgICAgIH0pXG5cblxuICAgICAgICAgICAgICAgICAgICBpZiAocmVkRGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgVHJhY2tNZ3IuT25saW5lX3Jld2FyZHMoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2aXR5X3N0YXRlOiBcIuWcqOe6v+WlluWKsei+vuaIkFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJld2FyZF9zdGF0ZTogYCR7cmVkRGF0YS53YWl0VGltZSAvIDYwfeWIhumSn2AsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoc2VsZi5zaWduUmVkLmFjdGl2ZSkge1xuICAgICAgICAgICAgICAgIHNlbGYuc2lnblJlZC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHdoZWVsUmVkOiBjYy5Ob2RlID0gbnVsbDtcbiAgICB3aGVlbENvdW50ID0gMDsgLy/ovaznm5jliankvZnmrKHmlbBcbiAgICBpbml0R29sZFdoZWVsRGF0YSh3aGVlbFJlZDogY2MuTm9kZSkge1xuICAgICAgICB0aGlzLndoZWVsUmVkID0gd2hlZWxSZWQ7XG4gICAgICAgIFhNU0RLLmdldGRhdGFTdHIoe1xuICAgICAgICAgICAgdXJsOiBVcmxDb25zdC5nb2xkV2hlZWxfaW5kZXgsXG4gICAgICAgICAgICBvblN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2hlZWxDb3VudCA9IHJlcy5kYXRhLnRpbWVzO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMud2hlZWxDb3VudCA+IDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja01haW5Hb2xkV2hlZWxSZWQodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkZhaWw6IGVyciA9PiB7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjaGVja01haW5Hb2xkV2hlZWxSZWQoc3RhdGU/OiBib29sZWFuKSB7ICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMud2hlZWxSZWQpIHtcbiAgICAgICAgICAgIGlmIChzdGF0ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53aGVlbFJlZC5hY3RpdmUgPSBzdGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh1dGlsLnVzZXJEYXRhLnByb2R1Y3QgPD0gNSkge1xuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLndoZWVsQ291bnQgPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy53aGVlbFJlZC5hY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndoZWVsUmVkLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVHJhY2tNZ3IubGl0dGxlX3JlZF9kb3RzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZpdHlfc3RhdGU6IFwi5bCP57qi54K55bGV56S6XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2aXR5X3Bvc2l0aW9uOiBcIuWkp+i9rOebmFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy53aGVlbFJlZC5hY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53aGVlbFJlZC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBSZWRDb250cm9sbGVyKCk7Il19