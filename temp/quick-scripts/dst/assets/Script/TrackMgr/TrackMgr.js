
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/TrackMgr/TrackMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxUcmFja01nclxcVHJhY2tNZ3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxREFBZ0Q7QUFHaEQ7SUFBQTtJQTRVQSxDQUFDO0lBelVHOzs7T0FHRztJQUNJLGlCQUFRLEdBQWYsVUFBZ0IsR0FBc0I7UUFDbEMsZUFBSyxDQUFDLEtBQUssQ0FBQztZQUNSLFNBQVMsRUFBRSxVQUFVO1lBQ3JCLEtBQUssRUFBRSxHQUFHO1NBQ2IsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVEOzs7T0FHRztJQUNJLHNCQUFhLEdBQXBCLFVBQXFCLEdBQTJCO1FBQzVDLGVBQUssQ0FBQyxLQUFLLENBQUM7WUFDUixTQUFTLEVBQUUsZUFBZTtZQUMxQixLQUFLLEVBQUUsR0FBRztTQUNiLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFHRDs7O09BR0c7SUFDSSxpQ0FBd0IsR0FBL0IsVUFBZ0MsR0FBdUM7UUFDbkUsZUFBSyxDQUFDLEtBQUssQ0FBQztZQUNSLFNBQVMsRUFBRSwwQkFBMEI7WUFDckMsS0FBSyxFQUFFLEdBQUc7U0FDYixDQUFDLENBQUE7SUFDTixDQUFDO0lBSUQ7OztPQUdHO0lBQ0ksNEJBQW1CLEdBQTFCLFVBQTJCLEdBQWtDO1FBQ3pELGVBQUssQ0FBQyxLQUFLLENBQUM7WUFDUixTQUFTLEVBQUUscUJBQXFCO1lBQ2hDLEtBQUssRUFBRSxHQUFHO1NBQ2IsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVEOzs7T0FHRztJQUNJLDZCQUFvQixHQUEzQixVQUE0QixHQUFtQztRQUMzRCxlQUFLLENBQUMsS0FBSyxDQUFDO1lBQ1IsU0FBUyxFQUFFLHNCQUFzQjtZQUNqQyxLQUFLLEVBQUUsR0FBRztTQUNiLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRDs7O09BR0c7SUFDSyx1QkFBYyxHQUFyQixVQUFzQixHQUE2QjtRQUNoRCxlQUFLLENBQUMsS0FBSyxDQUFDO1lBQ1IsU0FBUyxFQUFFLGdCQUFn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QzFELGVBQUssQ0FBQyxLQUFLLENBQUM7WUFDUixTQUFTLEVBQUUsc0JBQXNCO1lBQ2pDLEtBQUssRUFBRSxHQUFHO1NBQ2IsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUNNLHdCQUFlLEdBQXRCLFVBQXVCLEdBQTZCO1FBQ2hELGVBQUssQ0FBQyxLQUFLLENBQUM7WUFDUixTQUFTLEVBQUUsaUJBQWlCO1lBQzVCLEtBQUssRUFBRSxHQUFHO1NBQ2IsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUNMLGVBQUM7QUFBRCxDQTVVQSxBQTRVQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFhNU0RLIGZyb20gXCIuLi9zZXJ2ZXIveG1zZGtfY29jb3MvWE1TREtcIjtcclxuaW1wb3J0IHsgVHJhY2tFbnVtIH0gZnJvbSBcIi4vVHJhY2tFbnVtXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUcmFja01nciB7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gb2JqIEFwcOWFg+e0oOeCueWHu1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgQXBwQ2xpY2sob2JqOlRyYWNrRW51bS5BcHBDbGljayl7XHJcbiAgICAgICAgWE1TREsudHJhY2soe1xyXG4gICAgICAgICAgICBldmVudE5hbWU6IFwiQXBwQ2xpY2tcIixcclxuICAgICAgICAgICAgcHJvcHM6IG9ialxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBvYmogQVBQ5rWP6KeI6aG16Z2i77yI5pud5YWJ77yJXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBBcHBWaWV3U2NyZWVuKG9iajpUcmFja0VudW0uQXBwVmlld1NjcmVlbil7XHJcbiAgICAgICAgWE1TREsudHJhY2soe1xyXG4gICAgICAgICAgICBldmVudE5hbWU6IFwiQXBwVmlld1NjcmVlblwiLFxyXG4gICAgICAgICAgICBwcm9wczogb2JqXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBvYmog5by556qX5bGV56S6XHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBBcHBCdXlQcm9kdWN0RGlhbG9nX2hjZGcob2JqOiBUcmFja0VudW0uQXBwQnV5UHJvZHVjdERpYWxvZ19oY2RnKSB7XHJcbiAgICAgICAgWE1TREsudHJhY2soe1xyXG4gICAgICAgICAgICBldmVudE5hbWU6IFwiQXBwQnV5UHJvZHVjdERpYWxvZ19oY2RnXCIsXHJcbiAgICAgICAgICAgIHByb3BzOiBvYmpcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gb2JqIOW8ueeql+eCueWHu1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgQXBwRGlhbG9nQ2xpY2tfaGNkZyhvYmo6IFRyYWNrRW51bS5BcHBEaWFsb2dDbGlja19oY2RnKSB7XHJcbiAgICAgICAgWE1TREsudHJhY2soe1xyXG4gICAgICAgICAgICBldmVudE5hbWU6IFwiQXBwRGlhbG9nQ2xpY2tfaGNkZ1wiLFxyXG4gICAgICAgICAgICBwcm9wczogb2JqXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIG9iaiDnlLPor7fmj5DnjrBcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGFwcGx5X2Zvcl93aXRoZHJhd2FsKG9iajogVHJhY2tFbnVtLmFwcGx5X2Zvcl93aXRoZHJhd2FsKSB7XHJcbiAgICAgICAgWE1TREsudHJhY2soe1xyXG4gICAgICAgICAgICBldmVudE5hbWU6IFwiYXBwbHlfZm9yX3dpdGhkcmF3YWxcIixcclxuICAgICAgICAgICAgcHJvcHM6IG9ialxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBvYmog5paw5Lq65rWB56iLXHJcbiAgICAgKi9cclxuICAgICBzdGF0aWMgcm9va2llX3Byb2Nlc3Mob2JqOiBUcmFja0VudW0ucm9va2llX3Byb2Nlc3MpIHtcclxuICAgICAgICBYTVNESy50cmFjayh7XHJcbiAgICAgICAgICAgIGV2ZW50TmFtZTogXCJyb29raWVfcHJvY2Vzc1wiLFxyXG4gICAgICAgICAgICBwcm9wczogb2JqXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gb2JqIOaWsOS6uua1geeoizJcclxuICAgICAqL1xyXG4gICAgIHN0YXRpYyByb29raWVfcHJvY2Vzc18yKG9iajogVHJhY2tFbnVtLnJvb2tpZV9wcm9jZXNzXzIpIHtcclxuICAgICAgICBYTVNESy50cmFjayh7XHJcbiAgICAgICAgICAgIGV2ZW50TmFtZTogXCJyb29raWVfcHJvY2Vzc18yXCIsXHJcbiAgICAgICAgICAgIHByb3BzOiBvYmpcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gb2JqIOWPjOWAjeaUtuebilxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZG91YmxlX3JldmVudWUob2JqOiBUcmFja0VudW0uZG91YmxlX3JldmVudWUpIHtcclxuICAgICAgICBYTVNESy50cmFjayh7XHJcbiAgICAgICAgICAgIGV2ZW50TmFtZTogXCJkb3VibGVfcmV2ZW51ZVwiLFxyXG4gICAgICAgICAgICBwcm9wczogb2JqXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIG9iaiDpgZPlhbfkvb/nlKjkuovku7ZcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHRvb2xfdXNlZChvYmo6IFRyYWNrRW51bS50b29sX3VzZWQpIHtcclxuICAgICAgICBYTVNESy50cmFjayh7XHJcbiAgICAgICAgICAgIGV2ZW50TmFtZTogXCJ0b29sX3VzZWRcIixcclxuICAgICAgICAgICAgcHJvcHM6IG9ialxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBvYmog56m66ZmN5a6d566xXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBhaXJib3JuZV90cmVhc3VyZShvYmo6IFRyYWNrRW51bS5haXJib3JuZV90cmVhc3VyZSkge1xyXG4gICAgICAgIFhNU0RLLnRyYWNrKHtcclxuICAgICAgICAgICAgZXZlbnROYW1lOiBcImFpcmJvcm5lX3RyZWFzdXJlXCIsXHJcbiAgICAgICAgICAgIHByb3BzOiBvYmpcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gb2JqIOepuumZjemHkeW4gVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYWlyYm9ybmVfZ29sZChvYmo6IFRyYWNrRW51bS5haXJib3JuZV9nb2xkKSB7XHJcbiAgICAgICAgWE1TREsudHJhY2soe1xyXG4gICAgICAgICAgICBldmVudE5hbWU6IFwiYWlyYm9ybmVfZ29sZFwiLFxyXG4gICAgICAgICAgICBwcm9wczogb2JqXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIG9iaiDngrnlh7vku7vliqFcclxuICAgICAqL1xyXG4gICAgc3RhdGljIE1pc3Npb25QcmljZUNsaWNrKG9iajogVHJhY2tFbnVtLk1pc3Npb25QcmljZUNsaWNrKSB7XHJcbiAgICAgICAgWE1TREsudHJhY2soe1xyXG4gICAgICAgICAgICBldmVudE5hbWU6IFwiTWlzc2lvblByaWNlQ2xpY2tcIixcclxuICAgICAgICAgICAgcHJvcHM6IG9ialxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBvYmog562+5Yiw5aWW5Yqx5LqL5Lu2XHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBTaWduaW5fbmV3KG9iajogVHJhY2tFbnVtLlNpZ25pbl9uZXcpIHtcclxuICAgICAgICBYTVNESy50cmFjayh7XHJcbiAgICAgICAgICAgIGV2ZW50TmFtZTogXCJTaWduaW5fbmV3XCIsXHJcbiAgICAgICAgICAgIHByb3BzOiBvYmpcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gb2JqIOmAmuWFs+e7k+adn1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgQXBwR2FtZWRhdGUob2JqOiBUcmFja0VudW0uQXBwR2FtZWRhdGUpIHtcclxuICAgICAgICBYTVNESy50cmFjayh7XHJcbiAgICAgICAgICAgIGV2ZW50TmFtZTogXCJBcHBHYW1lZGF0ZV9oY2RnMVwiLFxyXG4gICAgICAgICAgICBwcm9wczogb2JqXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIG9iaiDngq7loZTop6PplIHkuovku7ZcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHR1cnJldF91bmxvY2sob2JqOiBUcmFja0VudW0udHVycmV0X3VubG9jaykge1xyXG4gICAgICAgIFhNU0RLLnRyYWNrKHtcclxuICAgICAgICAgICAgZXZlbnROYW1lOiBcInR1cnJldF91bmxvY2tcIixcclxuICAgICAgICAgICAgcHJvcHM6IG9ialxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBvYmog5YWz5Y2h5byA5ZCvXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBsZXZlbF9vcGVuKG9iajogVHJhY2tFbnVtLmxldmVsX29wZW4pIHtcclxuICAgICAgICBYTVNESy50cmFjayh7XHJcbiAgICAgICAgICAgIGV2ZW50TmFtZTogXCJsZXZlbF9vcGVuXCIsXHJcbiAgICAgICAgICAgIHByb3BzOiBvYmpcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gb2JqIOS7u+WKoeWujOaIkFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZmluaXNoX3Rhc2sob2JqOiBUcmFja0VudW0uZmluaXNoX3Rhc2spIHtcclxuICAgICAgICBYTVNESy50cmFjayh7XHJcbiAgICAgICAgICAgIGV2ZW50TmFtZTogXCJmaW5pc2hfdGFza1wiLFxyXG4gICAgICAgICAgICBwcm9wczogb2JqXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIG9iaiDmlrDkurrku7vliqFcclxuICAgICAqL1xyXG4gICAgc3RhdGljIG5ld2NvbWVyX21pc3Npb24ob2JqOiBUcmFja0VudW0ubmV3Y29tZXJfbWlzc2lvbikge1xyXG4gICAgICAgIFhNU0RLLnRyYWNrKHtcclxuICAgICAgICAgICAgZXZlbnROYW1lOiBcIm5ld2NvbWVyX21pc3Npb19oY2RnXCIsXHJcbiAgICAgICAgICAgIHByb3BzOiBvYmpcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gb2JqIOeCrueOi+WIhue6olxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYXJ0aWxsZXJ5X2JvbnVzKG9iajogVHJhY2tFbnVtLmFydGlsbGVyeV9ib251cykge1xyXG4gICAgICAgIFhNU0RLLnRyYWNrKHtcclxuICAgICAgICAgICAgZXZlbnROYW1lOiBcImFydGlsbGVyeV9ib251c19oY2RnXCIsXHJcbiAgICAgICAgICAgIHByb3BzOiBvYmpcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gb2JqIOepuuWcsOWuneeusVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZW1wdHlfdHJlYXN1cmUob2JqOiBUcmFja0VudW0uZW1wdHlfdHJlYXN1cmUpIHtcclxuICAgICAgICBYTVNESy50cmFjayh7XHJcbiAgICAgICAgICAgIGV2ZW50TmFtZTogXCJlbXB0eV90cmVhc3VyZV9oY2RnXCIsXHJcbiAgICAgICAgICAgIHByb3BzOiBvYmpcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKlxyXG4gICAgICogQHBhcmFtIG9iaiDku7vliqHmoI/ngrnlh7tcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHRhc2tiYXJfY2xpY2sob2JqOiBUcmFja0VudW0udGFza2Jhcl9jbGljaykge1xyXG4gICAgICAgIFhNU0RLLnRyYWNrKHtcclxuICAgICAgICAgICAgZXZlbnROYW1lOiBcInRhc2tiYXJfY2xpY2tfaGNkZ1wiLFxyXG4gICAgICAgICAgICBwcm9wczogb2JqXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIC8qXHJcbiAgICAgICAgKiBAcGFyYW0gb2JqIOS7u+WKoeagj+eCueWHu1xyXG4gICAgICAgICovXHJcbiAgICBzdGF0aWMgbHVja3liYWdfdGFzayhvYmo6IFRyYWNrRW51bS5sdWNreWJhZ190YXNrKSB7XHJcbiAgICAgICAgWE1TREsudHJhY2soe1xyXG4gICAgICAgICAgICBldmVudE5hbWU6IFwibHVja3liYWdfdGFza1wiLFxyXG4gICAgICAgICAgICBwcm9wczogb2JqXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIFxyXG4gICAgLypcclxuICAgICog5oq95omL5py65Z+L54K5XHJcbiAgICAqL1xyXG5cclxuICAgIHN0YXRpYyBsb3R0b19waG9uZV9jbGljayhvYmo6VHJhY2tFbnVtLmxvdHRvX3Bob25lX2NsaWNrKXtcclxuICAgICAgIFhNU0RLLnRyYWNrKHtcclxuICAgICAgICAgICBldmVudE5hbWU6IFwibG90dG9fcGhvbmVfY2xpY2tcIixcclxuICAgICAgICAgICBwcm9wczogb2JqXHJcbiAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBsb3R0b19jaGFuY2Uob2JqOlRyYWNrRW51bS5sb3R0b19jaGFuY2Upe1xyXG4gICAgICAgWE1TREsudHJhY2soe1xyXG4gICAgICAgICAgIGV2ZW50TmFtZTogXCJsb3R0b19jaGFuY2VcIixcclxuICAgICAgICAgICBwcm9wczogb2JqXHJcbiAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBvYmog5o+Q546w5rS75YqoXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBhY3Rpdml0eV9nZXRNb25leShvYmo6IFRyYWNrRW51bS5hY3Rpdml0eV9nZXRNb25leSl7XHJcbiAgICAgICAgWE1TREsudHJhY2soe1xyXG4gICAgICAgICAgICBldmVudE5hbWU6IFwiYWN0aXZpdHlfZ2V0TW9uZXlcIixcclxuICAgICAgICAgICAgcHJvcHM6IG9ialxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBzdGF0aWMgTHVja0RyYXcob2JqOlRyYWNrRW51bS5MdWNrRHJhdyl7XHJcbiAgICAgICAgWE1TREsudHJhY2soe1xyXG4gICAgICAgICAgICBldmVudE5hbWU6IFwiTHVja0RyYXdcIixcclxuICAgICAgICAgICAgcHJvcHM6IG9ialxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGxvdHRvX2RpYWwob2JqOlRyYWNrRW51bS5sb3R0b19kaWFsKXtcclxuICAgICAgICBYTVNESy50cmFjayh7XHJcbiAgICAgICAgICAgIGV2ZW50TmFtZTogXCJsb3R0b19kaWFsXCIsXHJcbiAgICAgICAgICAgIHByb3BzOiBvYmpcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgc3RhdGljIGxvdHRvX3Bob25lX3Nob3cob2JqOlRyYWNrRW51bS5sb3R0b19waG9uZV9zaG93KXtcclxuICAgICAgICBYTVNESy50cmFjayh7XHJcbiAgICAgICAgICAgIGV2ZW50TmFtZTogXCJsb3R0b19waG9uZV9zaG93XCIsXHJcbiAgICAgICAgICAgIHByb3BzOiBvYmpcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgc3RhdGljIEx1Y2tEcmF3UHJvZHVjdERpYWxvZyhvYmo6VHJhY2tFbnVtLkx1Y2tEcmF3UHJvZHVjdERpYWxvZyl7XHJcbiAgICAgICAgWE1TREsudHJhY2soe1xyXG4gICAgICAgICAgICBldmVudE5hbWU6IFwiTHVja0RyYXdQcm9kdWN0RGlhbG9nXCIsXHJcbiAgICAgICAgICAgIHByb3BzOiBvYmpcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgc3RhdGljIEx1Y2tEcmF3RGlhbG9nQ2xpY2sob2JqOlRyYWNrRW51bS5MdWNrRHJhd0RpYWxvZ0NsaWNrKXtcclxuICAgICAgICBYTVNESy50cmFjayh7XHJcbiAgICAgICAgICAgIGV2ZW50TmFtZTogXCJMdWNrRHJhd0RpYWxvZ0NsaWNrXCIsXHJcbiAgICAgICAgICAgIHByb3BzOiBvYmpcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgc3RhdGljIGxvdHRvX3NpZ25fY2hpcChvYmo6VHJhY2tFbnVtLmxvdHRvX3NpZ25fY2hpcCl7XHJcbiAgICAgICAgWE1TREsudHJhY2soe1xyXG4gICAgICAgICAgICBldmVudE5hbWU6IFwibG90dG9fc2lnbl9jaGlwXCIsXHJcbiAgICAgICAgICAgIHByb3BzOiBvYmpcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgc3RhdGljIGJpZ190dXJudGFibGUob2JqOlRyYWNrRW51bS5iaWdfdHVybnRhYmxlKXtcclxuICAgICAgICBYTVNESy50cmFjayh7XHJcbiAgICAgICAgICAgIGV2ZW50TmFtZTogXCJiaWdfdHVybnRhYmxlXCIsXHJcbiAgICAgICAgICAgIHByb3BzOiBvYmpcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgc3RhdGljIE9ubGluZV9yZXdhcmRzKG9iajpUcmFja0VudW0uT25saW5lX3Jld2FyZHMpe1xyXG4gICAgICAgIFhNU0RLLnRyYWNrKHtcclxuICAgICAgICAgICAgZXZlbnROYW1lOiBcIk9ubGluZV9yZXdhcmRzXCIsXHJcbiAgICAgICAgICAgIHByb3BzOiBvYmpcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgc3RhdGljIHdlbGZhcmVfcmVkX2VudmVsb3BlKG9iajpUcmFja0VudW0ud2VsZmFyZV9yZWRfZW52ZWxvcGUpe1xyXG4gICAgICAgIFhNU0RLLnRyYWNrKHtcclxuICAgICAgICAgICAgZXZlbnROYW1lOiBcIndlbGZhcmVfcmVkX2VudmVsb3BlXCIsXHJcbiAgICAgICAgICAgIHByb3BzOiBvYmpcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgc3RhdGljIGxpdHRsZV9yZWRfZG90cyhvYmo6VHJhY2tFbnVtLmxpdHRsZV9yZWRfZG90cyl7XHJcbiAgICAgICAgWE1TREsudHJhY2soe1xyXG4gICAgICAgICAgICBldmVudE5hbWU6IFwibGl0dGxlX3JlZF9kb3RzXCIsXHJcbiAgICAgICAgICAgIHByb3BzOiBvYmpcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcbiJdfQ==