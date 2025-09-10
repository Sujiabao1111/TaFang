"use strict";
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