"use strict";
cc._RF.push(module, 'e4a3fIE3ohGmJ5Wlx2huxTQ', 'TrackMgr');
// Script/TrackMgr/TrackMgr.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var XMSDK_1 = require("../server/xmsdk_cocos/XMSDK");
var TrackMgr = /** @class */ (function () {
    function TrackMgr() {
    }
    /**
     *
     * @param obj App元素点击
     */
    TrackMgr.AppClick = function (obj) {
        XMSDK_1.default.track({
            eventName: "AppClick",
            props: obj
        });
    };
    /**
     *
     * @param obj APP浏览页面（曝光）
     */
    TrackMgr.AppViewScreen = function (obj) {
        XMSDK_1.default.track({
            eventName: "AppViewScreen",
            props: obj
        });
    };
    /**
     *
     * @param obj 弹窗展示
     */
    TrackMgr.AppBuyProductDialog_hcdg = function (obj) {
        XMSDK_1.default.track({
            eventName: "AppBuyProductDialog_hcdg",
            props: obj
        });
    };
    /**
     *
     * @param obj 弹窗点击
     */
    TrackMgr.AppDialogClick_hcdg = function (obj) {
        XMSDK_1.default.track({
            eventName: "AppDialogClick_hcdg",
            props: obj
        });
    };
    /**
     *
     * @param obj 申请提现
     */
    TrackMgr.apply_for_withdrawal = function (obj) {
        XMSDK_1.default.track({
            eventName: "apply_for_withdrawal",
            props: obj
        });
    };
    /**
     *
     * @param obj 新人流程
     */
    TrackMgr.rookie_process = function (obj) {
        XMSDK_1.default.track({
            eventName: "rookie_process",
            props: obj
        });
    };
    /**
     *
     * @param obj 新人流程2
     */
    TrackMgr.rookie_process_2 = function (obj) {
        XMSDK_1.default.track({
            eventName: "rookie_process_2",
            props: obj
        });
    };
    /**
     *
     * @param obj 双倍收益
     */
    TrackMgr.double_revenue = function (obj) {
        XMSDK_1.default.track({
            eventName: "double_revenue",
            props: obj
        });
    };
    /**
     *
     * @param obj 道具使用事件
     */
    TrackMgr.tool_used = function (obj) {
        XMSDK_1.default.track({
            eventName: "tool_used",
            props: obj
        });
    };
    /**
     *
     * @param obj 空降宝箱
     */
    TrackMgr.airborne_treasure = function (obj) {
        XMSDK_1.default.track({
            eventName: "airborne_treasure",
            props: obj
        });
    };
    /**
     *
     * @param obj 空降金币
     */
    TrackMgr.airborne_gold = function (obj) {
        XMSDK_1.default.track({
            eventName: "airborne_gold",
            props: obj
        });
    };
    /**
     *
     * @param obj 点击任务
     */
    TrackMgr.MissionPriceClick = function (obj) {
        XMSDK_1.default.track({
            eventName: "MissionPriceClick",
            props: obj
        });
    };
    /**
     *
     * @param obj 签到奖励事件
     */
    TrackMgr.Signin_new = function (obj) {
        XMSDK_1.default.track({
            eventName: "Signin_new",
            props: obj
        });
    };
    /**
     *
     * @param obj 通关结束
     */
    TrackMgr.AppGamedate = function (obj) {
        XMSDK_1.default.track({
            eventName: "AppGamedate_hcdg1",
            props: obj
        });
    };
    /**
     *
     * @param obj 炮塔解锁事件
     */
    TrackMgr.turret_unlock = function (obj) {
        XMSDK_1.default.track({
            eventName: "turret_unlock",
            props: obj
        });
    };
    /**
     *
     * @param obj 关卡开启
     */
    TrackMgr.level_open = function (obj) {
        XMSDK_1.default.track({
            eventName: "level_open",
            props: obj
        });
    };
    /**
     *
     * @param obj 任务完成
     */
    TrackMgr.finish_task = function (obj) {
        XMSDK_1.default.track({
            eventName: "finish_task",
            props: obj
        });
    };
    /**
     *
     * @param obj 新人任务
     */
    TrackMgr.newcomer_mission = function (obj) {
        XMSDK_1.default.track({
            eventName: "newcomer_missio_hcdg",
            props: obj
        });
    };
    /**
     *
     * @param obj 炮王分红
     */
    TrackMgr.artillery_bonus = function (obj) {
        XMSDK_1.default.track({
            eventName: "artillery_bonus_hcdg",
            props: obj
        });
    };
    /**
     *
     * @param obj 空地宝箱
     */
    TrackMgr.empty_treasure = function (obj) {
        XMSDK_1.default.track({
            eventName: "empty_treasure_hcdg",
            props: obj
        });
    };
    /*
     * @param obj 任务栏点击
     */
    TrackMgr.taskbar_click = function (obj) {
        XMSDK_1.default.track({
            eventName: "taskbar_click_hcdg",
            props: obj
        });
    };
    /*
        * @param obj 任务栏点击
        */
    TrackMgr.luckybag_task = function (obj) {
        XMSDK_1.default.track({
            eventName: "luckybag_task",
            props: obj
        });
    };
    /*
    * 抽手机埋点
    */
    TrackMgr.lotto_phone_click = function (obj) {
        XMSDK_1.default.track({
            eventName: "lotto_phone_click",
            props: obj
        });
    };
    TrackMgr.lotto_chance = function (obj) {
        XMSDK_1.default.track({
            eventName: "lotto_chance",
            props: obj
        });
    };
    /**
     *
     * @param obj 提现活动
     */
    TrackMgr.activity_getMoney = function (obj) {
        XMSDK_1.default.track({
            eventName: "activity_getMoney",
            props: obj
        });
    };
    TrackMgr.LuckDraw = function (obj) {
        XMSDK_1.default.track({
            eventName: "LuckDraw",
            props: obj
        });
    };
    TrackMgr.lotto_dial = function (obj) {
        XMSDK_1.default.track({
            eventName: "lotto_dial",
            props: obj
        });
    };
    TrackMgr.lotto_phone_show = function (obj) {
        XMSDK_1.default.track({
            eventName: "lotto_phone_show",
            props: obj
        });
    };
    TrackMgr.LuckDrawProductDialog = function (obj) {
        XMSDK_1.default.track({
            eventName: "LuckDrawProductDialog",
            props: obj
        });
    };
    TrackMgr.LuckDrawDialogClick = function (obj) {
        XMSDK_1.default.track({
            eventName: "LuckDrawDialogClick",
            props: obj
        });
    };
    TrackMgr.lotto_sign_chip = function (obj) {
        XMSDK_1.default.track({
            eventName: "lotto_sign_chip",
            props: obj
        });
    };
    TrackMgr.big_turntable = function (obj) {
        XMSDK_1.default.track({
            eventName: "big_turntable",
            props: obj
        });
    };
    TrackMgr.Online_rewards = function (obj) {
        XMSDK_1.default.track({
            eventName: "Online_rewards",
            props: obj
        });
    };
    TrackMgr.welfare_red_envelope = function (obj) {
        XMSDK_1.default.track({
            eventName: "welfare_red_envelope",
            props: obj
        });
    };
    TrackMgr.little_red_dots = function (obj) {
        XMSDK_1.default.track({
            eventName: "little_red_dots",
            props: obj
        });
    };
    return TrackMgr;
}());
exports.default = TrackMgr;

cc._RF.pop();