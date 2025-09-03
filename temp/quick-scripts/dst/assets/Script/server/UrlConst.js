
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/server/UrlConst.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'bbef0d/iitNo5GpcVtt8cjo', 'UrlConst');
// Script/server/UrlConst.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlConst = void 0;
/*
 * @Descripttion:
 * @version:
 * @Author: mies
 * @Date: 2021-02-23 10:56:22
 * @LastEditors: mies
 * @LastEditTime: 2021-02-25 21:17:45
 */
/**
 * 接口枚举
 */
exports.UrlConst = {
    gameInfoIndex: "/hcdg-account/api/userGameLevel/propsAndGoldPoint",
    gameLevelIndex: "/hcdg-account/api/userGameLevel/index",
    gameLevelCompleted: "/hcdg-account/api/userGameLevel/completed",
    gameLevelReport: "/hcdg-account/api/mapSnapshot/report",
    redpackLevelIndex: "/hcdg-account/api/redEnvelope/completedReward",
    redpackLevelGain: "/hcdg-account/api/redEnvelope/open",
    redpackRandomIndex: "/hcdg-account/api/redEnvelope/randomReward",
    redpackRandomGain: "/hcdg-account/api/redEnvelope/randomRewardCheckIn",
    redpackRandomDouble: "/hcdg-account/api/redEnvelope/randomRewardCheckInPlus",
    redpackFirstGain: "/hcdg-account/api/redEnvelope/newUserReward",
    newRedPackMain: "/hcdg-account/api/redEnvelope/newUserReward",
    videoUpLoad: "/hcdg-account/api/watchAdVideo/upload",
    doubleEarn: "/hcdg-account/api/income/index",
    activateEarn: "/hcdg-account/api/income/activate",
    //道具相关
    getToolList: "/hcdg-account/api/gameProp",
    getPropCofigList: "/hcdg-account/api/gameProp/config",
    getProp: "/hcdg-account/api/gameProp/receive",
    useProp: "/hcdg-account/api/gameProp/use",
    getUseProp: "/hcdg-account/api/gameProp/receiveAndUseByPropId",
    //提现相关接口
    wallet_main: "/hcdg-account/api/cashOut/index",
    wallet_main2: "/hcdg-account/api/cashOut/v2/index",
    wallet_record: "/hcdg-account/api/cashOut/record",
    wallet_get: "/hcdg-account/api/cashOut/action",
    //签到相关接口
    sign_main: "/hcdg-account/api/sign/index",
    sign_commonGet: "/hcdg-account/api/sign/checkIn",
    sign_extraGet: "/hcdg-account/api/sign/checkInExtra",
    sign_videoGet: "/hcdg-account/api/sign/checkInPlus",
    //任务相关接口    
    task_day_main: "/hcdg-account/api/dailyTask/index",
    task_day_commonGet: "/hcdg-account/api/dailyTask/checkIn",
    task_day_doubleGet: "/hcdg-account/api/dailyTask/checkInPlus",
    achievement_main: "/hcdg-account/api/achievementTask/index",
    achievement_commonGet: "/hcdg-account/api/achievementTask/checkIn",
    achievement_doubleGet: "/hcdg-account/api/achievementTask/checkInPlus",
    task_pass_main: "/hcdg-account/api/levelPassTask/index",
    task_pass_commonGet: "/hcdg-account/api/levelPassTask/checkIn",
    task_pass_doubleGet: "/hcdg-account/api/levelPassTask/checkInPlus",
    //天降金币
    heavenCoin_main: "/hcdg-account/api/airborneGold/list",
    heavenCoin_get: "/hcdg-account/api/airborneGold/get",
    heavenCoin_receive: "/hcdg-account/api/airborneGold/receive",
    //宝箱
    treasureBox_get: "/hcdg-account/api/goldTreasureBox/receive",
    treasureBox_Isget: "/hcdg-account/api/goldTreasureBox/show",
    treasureBox_residual: "/hcdg-account/api/goldTreasureBox/residual",
    treasureBox_get2: "/hcdg-account/api/goldTreasureBox/receiveV2",
    //获取配置表
    getConfigData: "/hcdg-account/api/commonParam/map",
    //获取离线状态
    getOffline: "/hcdg-account/api/offlineIncome/index",
    getOfflineCommon: "/hcdg-account/api/offlineIncome/receive",
    getOfflineDouble: "/hcdg-account/api/offlineIncome/receiveDouble",
    //获取在线时长
    getOnLinePrize: "/hcdg-account/api/onlineDuration/receive",
    //获取额外炮塔
    getairborneBattery: "/hcdg-account/api/airborneBattery/index",
    receiveAirborneBattery: "/hcdg-account/api/airborneBattery/receive",
    watchVideoAddBattery: "/hcdg-account/api/dailyTask/watchVideoAddBattery",
    //新人任务
    newPlayerTaskData: "/hcdg-account/api/withdrawTask/index",
    newPlayerTaskGet: "/hcdg-account/api/withdrawTask/receive",
    //炮王任务
    kingPaoTaskData: "/hcdg-account/api/turretKingTask/index",
    kingPaoOpen: "/hcdg-account/api/turretKingTask/clockIn",
    kingPaoGet: "/hcdg-account/api/turretKingTask/receive",
    kingPaoProgress: "/hcdg-account/api/turretKingTask/process",
    //视频打卡
    videoCardMain: "/hcdg-account/api/videoClockIn/index",
    videoCardOk: "/hcdg-account/api/videoClockIn/completed",
    //抽手机相关接口
    newBigWheel_index: '/hcdg-account/api/phoneFragments/v2/index',
    newBigWheel_taskCheckIn: "/hcdg-account/api/phoneFragments/taskCheckIn",
    newBigWheel_action: "/hcdg-account/api/phoneFragments/v2/action",
    newBigWheel_watch: "/hcdg-account/api/phoneFragments/v2/watch",
    newBigWheel_checkIn: "/hcdg-account/api/phoneFragments/checkIn",
    newBigWheel_actionDouble: "/hcdg-account/api/phoneFragments/actionDouble",
    //金币转盘相关接口
    goldWheel_index: "/hcdg-account/api/turntable/index",
    goldWheel_action: "/hcdg-account/api/turntable/action",
    goldWheel_checkIn: "/hcdg-account/api/turntable/checkIn",
    goldWheel_receive: "/hcdg-account/api/turntable/receiveStageReward",
    //签到处在线红包接口
    onPrizeGetRewardMain: "/hcdg-account/api/onlineReward/index",
    onPrizeGetRewardGet: "/hcdg-account/api/onlineReward/receive",
    //福利红包接口
    btnRandomRedCount: "/hcdg-account/api/welfareRedEnvelope/remainingTimes",
    btnRandomRedGet: "/hcdg-account/api/welfareRedEnvelope/receive",
    //累计金币进度
    earnProgressIndex: "/hcdg-account/api/progressBar/index",
    earnProgressReceive: "/hcdg-account/api/progressBar/receive",
    //存钱罐
    savingPotIndex: "/hcdg-account/api/piggyBank/index",
    savingPotReceive: "/hcdg-account/api/piggyBank/receive",
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxzZXJ2ZXJcXFVybENvbnN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7O0dBT0c7QUFDSDs7R0FFRztBQUNVLFFBQUEsUUFBUSxHQUFHO0lBQ3BCLGFBQWEsRUFBRSxtREFBbUQ7SUFDbEUsY0FBYyxFQUFFLHVDQUF1QztJQUN2RCxrQkFBa0IsRUFBRSwyQ0FBMkM7SUFDL0QsZUFBZSxFQUFFLHNDQUFzQztJQUN2RCxpQkFBaUIsRUFBRSwrQ0FBK0M7SUFDbEUsZ0JBQWdCLEVBQUUsb0NBQW9DO0lBQ3RELGtCQUFrQixFQUFFLDRDQUE0QztJQUNoRSxpQkFBaUIsRUFBRSxtREFBbUQ7SUFDdEUsbUJBQW1CLEVBQUUsdURBQXVEO0lBQzVFLGdCQUFnQixFQUFFLDZDQUE2QztJQUMvRCxjQUFjLEVBQUUsNkNBQTZDO0lBQzdELFdBQVcsRUFBRSx1Q0FBdUM7SUFDcEQsVUFBVSxFQUFFLGdDQUFnQztJQUM1QyxZQUFZLEVBQUUsbUNBQW1DO0lBRWpELE1BQU07SUFDTixXQUFXLEVBQUUsNEJBQTRCO0lBQ3pDLGdCQUFnQixFQUFFLG1DQUFtQztJQUNyRCxPQUFPLEVBQUUsb0NBQW9DO0lBQzdDLE9BQU8sRUFBRSxnQ0FBZ0M7SUFDekMsVUFBVSxFQUFFLGtEQUFrRDtJQUU5RCxRQUFRO0lBQ1IsV0FBVyxFQUFFLGlDQUFpQztJQUM5QyxZQUFZLEVBQUUsb0NBQW9DO0lBQ2xELGFBQWEsRUFBRSxrQ0FBa0M7SUFDakQsVUFBVSxFQUFFLGtDQUFrQztJQUU5QyxRQUFRO0lBQ1IsU0FBUyxFQUFFLDhCQUE4QjtJQUN6QyxjQUFjLEVBQUUsZ0NBQWdDO0lBQ2hELGFBQWEsRUFBRSxxQ0FBcUM7SUFDcEQsYUFBYSxFQUFFLG9DQUFvQztJQUVuRCxZQUFZO0lBQ1osYUFBYSxFQUFFLG1DQUFtQztJQUNsRCxrQkFBa0IsRUFBRSxxQ0FBcUM7SUFDekQsa0JBQWtCLEVBQUUseUNBQXlDO0lBQzdELGdCQUFnQixFQUFFLHlDQUF5QztJQUMzRCxxQkFBcUIsRUFBRSwyQ0FBMkM7SUFDbEUscUJBQXFCLEVBQUUsK0NBQStDO0lBQ3RFLGNBQWMsRUFBRSx1Q0FBdUM7SUFDdkQsbUJBQW1CLEVBQUUseUNBQXlDO0lBQzlELG1CQUFtQixFQUFFLDZDQUE2QztJQUVsRSxNQUFNO0lBQ04sZUFBZSxFQUFFLHFDQUFxQztJQUN0RCxjQUFjLEVBQUUsb0NBQW9DO0lBQ3BELGtCQUFrQixFQUFFLHdDQUF3QztJQUU1RCxJQUFJO0lBQ0osZUFBZSxFQUFFLDJDQUEyQztJQUM1RCxpQkFBaUIsRUFBRSx3Q0FBd0M7SUFDM0Qsb0JBQW9CLEVBQUUsNENBQTRDO0lBQ2xFLGdCQUFnQixFQUFFLDZDQUE2QztJQUcvRCxPQUFPO0lBQ1AsYUFBYSxFQUFFLG1DQUFtQztJQUdsRCxRQUFRO0lBQ1IsVUFBVSxFQUFFLHVDQUF1QztJQUNuRCxnQkFBZ0IsRUFBRSx5Q0FBeUM7SUFDM0QsZ0JBQWdCLEVBQUUsK0NBQStDO0lBRWpFLFFBQVE7SUFDUixjQUFjLEVBQUUsMENBQTBDO0lBRTFELFFBQVE7SUFDUixrQkFBa0IsRUFBRSx5Q0FBeUM7SUFDN0Qsc0JBQXNCLEVBQUUsMkNBQTJDO0lBQ25FLG9CQUFvQixFQUFFLGtEQUFrRDtJQUd4RSxNQUFNO0lBQ04saUJBQWlCLEVBQUUsc0NBQXNDO0lBQ3pELGdCQUFnQixFQUFFLHdDQUF3QztJQUUxRCxNQUFNO0lBQ04sZUFBZSxFQUFFLHdDQUF3QztJQUN6RCxXQUFXLEVBQUUsMENBQTBDO0lBQ3ZELFVBQVUsRUFBRSwwQ0FBMEM7SUFDdEQsZUFBZSxFQUFFLDBDQUEwQztJQUUzRCxNQUFNO0lBQ04sYUFBYSxFQUFFLHNDQUFzQztJQUNyRCxXQUFXLEVBQUUsMENBQTBDO0lBRXZELFNBQVM7SUFDVCxpQkFBaUIsRUFBRSwyQ0FBMkM7SUFDOUQsdUJBQXVCLEVBQUUsOENBQThDO0lBQ3ZFLGtCQUFrQixFQUFFLDRDQUE0QztJQUNoRSxpQkFBaUIsRUFBRSwyQ0FBMkM7SUFDOUQsbUJBQW1CLEVBQUUsMENBQTBDO0lBQy9ELHdCQUF3QixFQUFFLCtDQUErQztJQUV6RSxVQUFVO0lBQ1YsZUFBZSxFQUFFLG1DQUFtQztJQUNwRCxnQkFBZ0IsRUFBRSxvQ0FBb0M7SUFDdEQsaUJBQWlCLEVBQUUscUNBQXFDO0lBQ3hELGlCQUFpQixFQUFFLGdEQUFnRDtJQUVuRSxXQUFXO0lBQ1gsb0JBQW9CLEVBQUUsc0NBQXNDO0lBQzVELG1CQUFtQixFQUFFLHdDQUF3QztJQUU3RCxRQUFRO0lBQ1IsaUJBQWlCLEVBQUMscURBQXFEO0lBQ3ZFLGVBQWUsRUFBQyw4Q0FBOEM7SUFFOUQsUUFBUTtJQUNSLGlCQUFpQixFQUFDLHFDQUFxQztJQUN2RCxtQkFBbUIsRUFBQyx1Q0FBdUM7SUFFM0QsS0FBSztJQUNMLGNBQWMsRUFBQyxtQ0FBbUM7SUFDbEQsZ0JBQWdCLEVBQUMscUNBQXFDO0NBSXpELENBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQERlc2NyaXB0dGlvbjogXG4gKiBAdmVyc2lvbjogXG4gKiBAQXV0aG9yOiBtaWVzXG4gKiBARGF0ZTogMjAyMS0wMi0yMyAxMDo1NjoyMlxuICogQExhc3RFZGl0b3JzOiBtaWVzXG4gKiBATGFzdEVkaXRUaW1lOiAyMDIxLTAyLTI1IDIxOjE3OjQ1XG4gKi9cbi8qKlxuICog5o6l5Y+j5p6a5Li+XG4gKi9cbmV4cG9ydCBjb25zdCBVcmxDb25zdCA9IHtcbiAgICBnYW1lSW5mb0luZGV4OiBcIi9oY2RnLWFjY291bnQvYXBpL3VzZXJHYW1lTGV2ZWwvcHJvcHNBbmRHb2xkUG9pbnRcIiwvL+mmlumhteS/oeaBr1xuICAgIGdhbWVMZXZlbEluZGV4OiBcIi9oY2RnLWFjY291bnQvYXBpL3VzZXJHYW1lTGV2ZWwvaW5kZXhcIiwvL+iOt+WPluWFs+WNoeS/oeaBr1xuICAgIGdhbWVMZXZlbENvbXBsZXRlZDogXCIvaGNkZy1hY2NvdW50L2FwaS91c2VyR2FtZUxldmVsL2NvbXBsZXRlZFwiLC8v5a6M5oiQ5YWz5Y2h5L+h5oGvXG4gICAgZ2FtZUxldmVsUmVwb3J0OiBcIi9oY2RnLWFjY291bnQvYXBpL21hcFNuYXBzaG90L3JlcG9ydFwiLC8v5Y+R6YCB5b+r54WnXG4gICAgcmVkcGFja0xldmVsSW5kZXg6IFwiL2hjZGctYWNjb3VudC9hcGkvcmVkRW52ZWxvcGUvY29tcGxldGVkUmV3YXJkXCIsXG4gICAgcmVkcGFja0xldmVsR2FpbjogXCIvaGNkZy1hY2NvdW50L2FwaS9yZWRFbnZlbG9wZS9vcGVuXCIsXG4gICAgcmVkcGFja1JhbmRvbUluZGV4OiBcIi9oY2RnLWFjY291bnQvYXBpL3JlZEVudmVsb3BlL3JhbmRvbVJld2FyZFwiLFxuICAgIHJlZHBhY2tSYW5kb21HYWluOiBcIi9oY2RnLWFjY291bnQvYXBpL3JlZEVudmVsb3BlL3JhbmRvbVJld2FyZENoZWNrSW5cIiwvL+maj+acuue6ouWMheWNleWAjVxuICAgIHJlZHBhY2tSYW5kb21Eb3VibGU6IFwiL2hjZGctYWNjb3VudC9hcGkvcmVkRW52ZWxvcGUvcmFuZG9tUmV3YXJkQ2hlY2tJblBsdXNcIiwvL+maj+acuue6ouWMheWPjOWAjVxuICAgIHJlZHBhY2tGaXJzdEdhaW46IFwiL2hjZGctYWNjb3VudC9hcGkvcmVkRW52ZWxvcGUvbmV3VXNlclJld2FyZFwiLFxuICAgIG5ld1JlZFBhY2tNYWluOiBgL2hjZGctYWNjb3VudC9hcGkvcmVkRW52ZWxvcGUvbmV3VXNlclJld2FyZGAsICAgICAgICAvL+aWsOeUqOaIt+WlluWKsVxuICAgIHZpZGVvVXBMb2FkOiBcIi9oY2RnLWFjY291bnQvYXBpL3dhdGNoQWRWaWRlby91cGxvYWRcIixcbiAgICBkb3VibGVFYXJuOiBcIi9oY2RnLWFjY291bnQvYXBpL2luY29tZS9pbmRleFwiLC8v5Y+M5YCN5pS255uKXG4gICAgYWN0aXZhdGVFYXJuOiBcIi9oY2RnLWFjY291bnQvYXBpL2luY29tZS9hY3RpdmF0ZVwiLC8v5r+A5rS75Y+M5YCN5pS255uKXG5cbiAgICAvL+mBk+WFt+ebuOWFs1xuICAgIGdldFRvb2xMaXN0OiBgL2hjZGctYWNjb3VudC9hcGkvZ2FtZVByb3BgLCAgICAgICAgIC8v6I635Y+W55So5oi35ri45oiP6YGT5YW35YiX6KGoXG4gICAgZ2V0UHJvcENvZmlnTGlzdDogYC9oY2RnLWFjY291bnQvYXBpL2dhbWVQcm9wL2NvbmZpZ2AsICAgICAgICAgLy/ojrflj5bpgZPlhbfphY3nva7liJfooahcbiAgICBnZXRQcm9wOiBgL2hjZGctYWNjb3VudC9hcGkvZ2FtZVByb3AvcmVjZWl2ZWAsICAgICAgICAgICAgICAgIC8v6aKG5Y+W6YGT5YW3XG4gICAgdXNlUHJvcDogYC9oY2RnLWFjY291bnQvYXBpL2dhbWVQcm9wL3VzZWAsIC8v5L2/55So6YGT5YW3XG4gICAgZ2V0VXNlUHJvcDogYC9oY2RnLWFjY291bnQvYXBpL2dhbWVQcm9wL3JlY2VpdmVBbmRVc2VCeVByb3BJZGAsIC8v55yL6KeG6aKR6aKG5Y+W5bm25L2/55So6YGT5YW3XG5cbiAgICAvL+aPkOeOsOebuOWFs+aOpeWPo1xuICAgIHdhbGxldF9tYWluOiBgL2hjZGctYWNjb3VudC9hcGkvY2FzaE91dC9pbmRleGAsICAgICAgIC8v5o+Q546w6aaW6aG1XG4gICAgd2FsbGV0X21haW4yOiBgL2hjZGctYWNjb3VudC9hcGkvY2FzaE91dC92Mi9pbmRleGAsICAgICAgIC8v5o+Q546w6aaW6aG1XG4gICAgd2FsbGV0X3JlY29yZDogYC9oY2RnLWFjY291bnQvYXBpL2Nhc2hPdXQvcmVjb3JkYCwgICAgLy/mj5DnjrDorrDlvZVcbiAgICB3YWxsZXRfZ2V0OiBgL2hjZGctYWNjb3VudC9hcGkvY2FzaE91dC9hY3Rpb25gLCAgICAgICAvL+eri+WNs+aPkOeOsFxuXG4gICAgLy/nrb7liLDnm7jlhbPmjqXlj6NcbiAgICBzaWduX21haW46IGAvaGNkZy1hY2NvdW50L2FwaS9zaWduL2luZGV4YCwgICAgICAgIC8v562+5Yiw6aaW6aG1XG4gICAgc2lnbl9jb21tb25HZXQ6IGAvaGNkZy1hY2NvdW50L2FwaS9zaWduL2NoZWNrSW5gLCAvL+aZrumAmuetvuWIsFxuICAgIHNpZ25fZXh0cmFHZXQ6IGAvaGNkZy1hY2NvdW50L2FwaS9zaWduL2NoZWNrSW5FeHRyYWAsIC8v6aKd5aSW562+5YiwXG4gICAgc2lnbl92aWRlb0dldDogYC9oY2RnLWFjY291bnQvYXBpL3NpZ24vY2hlY2tJblBsdXNgLCAgLy/pq5jnuqfnrb7liLBcblxuICAgIC8v5Lu75Yqh55u45YWz5o6l5Y+jICAgIFxuICAgIHRhc2tfZGF5X21haW46IGAvaGNkZy1hY2NvdW50L2FwaS9kYWlseVRhc2svaW5kZXhgLCAgICAgICAgICAgICAgIC8v5q+P5pel5Lu75Yqh562+5Yiw5o6l5Y+j77ya5Lu75Yqh6aaW6aG1XG4gICAgdGFza19kYXlfY29tbW9uR2V0OiBgL2hjZGctYWNjb3VudC9hcGkvZGFpbHlUYXNrL2NoZWNrSW5gLCAgICAgICAgLy/mr4/ml6Xku7vliqHnrb7liLDmjqXlj6PvvJrmma7pgJrpooblj5ZcbiAgICB0YXNrX2RheV9kb3VibGVHZXQ6IGAvaGNkZy1hY2NvdW50L2FwaS9kYWlseVRhc2svY2hlY2tJblBsdXNgLCAgICAvL+avj+aXpeS7u+WKoeetvuWIsOaOpeWPo++8muWkmuWAjemihuWPliAgIFxuICAgIGFjaGlldmVtZW50X21haW46IGAvaGNkZy1hY2NvdW50L2FwaS9hY2hpZXZlbWVudFRhc2svaW5kZXhgLCAgICAgICAgIC8v5oiQ5bCx5Lu75Yqh5o6l5Y+j77ya5Lu75Yqh6aaW6aG1IFxuICAgIGFjaGlldmVtZW50X2NvbW1vbkdldDogYC9oY2RnLWFjY291bnQvYXBpL2FjaGlldmVtZW50VGFzay9jaGVja0luYCwgICAgICAgICAvL+aIkOWwseS7u+WKoeaOpeWPo++8muaZrumAmumihuWPliBcbiAgICBhY2hpZXZlbWVudF9kb3VibGVHZXQ6IGAvaGNkZy1hY2NvdW50L2FwaS9hY2hpZXZlbWVudFRhc2svY2hlY2tJblBsdXNgLCAgICAgICAgIC8v5oiQ5bCx5Lu75Yqh5o6l5Y+j77ya5aSa5YCN6aKG5Y+WICBcbiAgICB0YXNrX3Bhc3NfbWFpbjogYC9oY2RnLWFjY291bnQvYXBpL2xldmVsUGFzc1Rhc2svaW5kZXhgLCAgICAgICAgICAgICAgIC8v6Zev5YWz5Lu75Yqh562+5Yiw5o6l5Y+j77ya5Lu75Yqh6aaW6aG1XG4gICAgdGFza19wYXNzX2NvbW1vbkdldDogYC9oY2RnLWFjY291bnQvYXBpL2xldmVsUGFzc1Rhc2svY2hlY2tJbmAsICAgICAgICAvL+mXr+WFs+S7u+WKoeetvuWIsOaOpeWPo++8muaZrumAmumihuWPllxuICAgIHRhc2tfcGFzc19kb3VibGVHZXQ6IGAvaGNkZy1hY2NvdW50L2FwaS9sZXZlbFBhc3NUYXNrL2NoZWNrSW5QbHVzYCwgICAgLy/pl6/lhbPku7vliqHnrb7liLDmjqXlj6PvvJrlpJrlgI3pooblj5YgICBcblxuICAgIC8v5aSp6ZmN6YeR5biBXG4gICAgaGVhdmVuQ29pbl9tYWluOiBgL2hjZGctYWNjb3VudC9hcGkvYWlyYm9ybmVHb2xkL2xpc3RgLCAvL+iOt+WPluWkqemZjemHkeW4geeahOWIl+ihqFxuICAgIGhlYXZlbkNvaW5fZ2V0OiBgL2hjZGctYWNjb3VudC9hcGkvYWlyYm9ybmVHb2xkL2dldGAsICAgIC8v6I635Y+W5aSp6ZmN6YeR5biBICBcbiAgICBoZWF2ZW5Db2luX3JlY2VpdmU6IGAvaGNkZy1hY2NvdW50L2FwaS9haXJib3JuZUdvbGQvcmVjZWl2ZWAsICAgIC8v5o+Q5Lqk6YeR5biBIFxuXG4gICAgLy/lrp3nrrFcbiAgICB0cmVhc3VyZUJveF9nZXQ6IGAvaGNkZy1hY2NvdW50L2FwaS9nb2xkVHJlYXN1cmVCb3gvcmVjZWl2ZWAsICAgIC8v6aKG5Y+W5a6d566x6YeR5biBIFxuICAgIHRyZWFzdXJlQm94X0lzZ2V0OiBgL2hjZGctYWNjb3VudC9hcGkvZ29sZFRyZWFzdXJlQm94L3Nob3dgLCAgICAvL+ajgOafpeaYr+WQpumihuWPluWuneeusemHkeW4gSBcbiAgICB0cmVhc3VyZUJveF9yZXNpZHVhbDogYC9oY2RnLWFjY291bnQvYXBpL2dvbGRUcmVhc3VyZUJveC9yZXNpZHVhbGAsICAgIC8v5Ymp5L2Z5qyh5pWwXG4gICAgdHJlYXN1cmVCb3hfZ2V0MjogYC9oY2RnLWFjY291bnQvYXBpL2dvbGRUcmVhc3VyZUJveC9yZWNlaXZlVjJgLCAgICAvL+mihuWPluWuneeusemHkeW4gSDvvIjml6Dop4TliJnniYjmnKzvvIlcblxuXG4gICAgLy/ojrflj5bphY3nva7ooahcbiAgICBnZXRDb25maWdEYXRhOiBgL2hjZGctYWNjb3VudC9hcGkvY29tbW9uUGFyYW0vbWFwYCwgLy/ojrflj5bphY3nva7ooahcblxuXG4gICAgLy/ojrflj5bnprvnur/nirbmgIFcbiAgICBnZXRPZmZsaW5lOiBgL2hjZGctYWNjb3VudC9hcGkvb2ZmbGluZUluY29tZS9pbmRleGAsIC8v6I635Y+W56a757q/54q25oCBXG4gICAgZ2V0T2ZmbGluZUNvbW1vbjogYC9oY2RnLWFjY291bnQvYXBpL29mZmxpbmVJbmNvbWUvcmVjZWl2ZWAsIC8v5pmu6YCa6aKG5Y+WXG4gICAgZ2V0T2ZmbGluZURvdWJsZTogYC9oY2RnLWFjY291bnQvYXBpL29mZmxpbmVJbmNvbWUvcmVjZWl2ZURvdWJsZWAsIC8v5Y+M5YCN6aKG5Y+WXG5cbiAgICAvL+iOt+WPluWcqOe6v+aXtumVv1xuICAgIGdldE9uTGluZVByaXplOiBgL2hjZGctYWNjb3VudC9hcGkvb25saW5lRHVyYXRpb24vcmVjZWl2ZWAsICAvL+mihuWPluWcqOe6v+aXtumVv+WlluWKsVxuXG4gICAgLy/ojrflj5bpop3lpJbngq7loZRcbiAgICBnZXRhaXJib3JuZUJhdHRlcnk6IGAvaGNkZy1hY2NvdW50L2FwaS9haXJib3JuZUJhdHRlcnkvaW5kZXhgLC8v6I635Y+W56m66ZmN54Ku5aGU6aaW6aG15qyh5pWwXG4gICAgcmVjZWl2ZUFpcmJvcm5lQmF0dGVyeTogYC9oY2RnLWFjY291bnQvYXBpL2FpcmJvcm5lQmF0dGVyeS9yZWNlaXZlYCwvL+iOt+WPlueCruWhlFxuICAgIHdhdGNoVmlkZW9BZGRCYXR0ZXJ5OiBgL2hjZGctYWNjb3VudC9hcGkvZGFpbHlUYXNrL3dhdGNoVmlkZW9BZGRCYXR0ZXJ5YCwvL+eci+inhumikeiOt+W+l+eCruWhlOiusOW9lVxuXG5cbiAgICAvL+aWsOS6uuS7u+WKoVxuICAgIG5ld1BsYXllclRhc2tEYXRhOiBgL2hjZGctYWNjb3VudC9hcGkvd2l0aGRyYXdUYXNrL2luZGV4YCwgICAgICAgLy/mlrDkurrku7vliqHpppbpobVcbiAgICBuZXdQbGF5ZXJUYXNrR2V0OiBgL2hjZGctYWNjb3VudC9hcGkvd2l0aGRyYXdUYXNrL3JlY2VpdmVgLCAgICAgIC8v5paw5Lq65Lu75Yqh6aKG5Y+WXG5cbiAgICAvL+eCrueOi+S7u+WKoVxuICAgIGtpbmdQYW9UYXNrRGF0YTogYC9oY2RnLWFjY291bnQvYXBpL3R1cnJldEtpbmdUYXNrL2luZGV4YCwgICAgICAgICAgICAgIC8v54Ku546L5Lu75Yqh6aaW6aG1ICAgIFxuICAgIGtpbmdQYW9PcGVuOiBgL2hjZGctYWNjb3VudC9hcGkvdHVycmV0S2luZ1Rhc2svY2xvY2tJbmAsICAgICAgICAgICAgICAgIC8v54Ku546L5Lu75Yqh5omT5byAXG4gICAga2luZ1Bhb0dldDogYC9oY2RnLWFjY291bnQvYXBpL3R1cnJldEtpbmdUYXNrL3JlY2VpdmVgLCAgICAgICAgICAgICAgICAgLy/ngq7njovlhZHmjaLku7vliqFcbiAgICBraW5nUGFvUHJvZ3Jlc3M6IGAvaGNkZy1hY2NvdW50L2FwaS90dXJyZXRLaW5nVGFzay9wcm9jZXNzYCwgICAgICAgICAgICAgICAgIC8v54Ku546L5Lu75Yqh6L+b5bqmXG5cbiAgICAvL+inhumikeaJk+WNoVxuICAgIHZpZGVvQ2FyZE1haW46IGAvaGNkZy1hY2NvdW50L2FwaS92aWRlb0Nsb2NrSW4vaW5kZXhgLCAgICAgICAgIC8v5LuK5pel5omT5Y2h5oOF5Ya1XG4gICAgdmlkZW9DYXJkT2s6IGAvaGNkZy1hY2NvdW50L2FwaS92aWRlb0Nsb2NrSW4vY29tcGxldGVkYCwgICAgICAgLy/lrozmiJDmiZPljaFcblxuICAgIC8v5oq95omL5py655u45YWz5o6l5Y+jXG4gICAgbmV3QmlnV2hlZWxfaW5kZXg6ICcvaGNkZy1hY2NvdW50L2FwaS9waG9uZUZyYWdtZW50cy92Mi9pbmRleCcsXG4gICAgbmV3QmlnV2hlZWxfdGFza0NoZWNrSW46IFwiL2hjZGctYWNjb3VudC9hcGkvcGhvbmVGcmFnbWVudHMvdGFza0NoZWNrSW5cIiwvL+mihuWPluS7u+WKoVxuICAgIG5ld0JpZ1doZWVsX2FjdGlvbjogXCIvaGNkZy1hY2NvdW50L2FwaS9waG9uZUZyYWdtZW50cy92Mi9hY3Rpb25cIixcbiAgICBuZXdCaWdXaGVlbF93YXRjaDogXCIvaGNkZy1hY2NvdW50L2FwaS9waG9uZUZyYWdtZW50cy92Mi93YXRjaFwiLC8v55yL5bm/5ZGK6YeN572uXG4gICAgbmV3QmlnV2hlZWxfY2hlY2tJbjogXCIvaGNkZy1hY2NvdW50L2FwaS9waG9uZUZyYWdtZW50cy9jaGVja0luXCIsLy/nrb7liLBcbiAgICBuZXdCaWdXaGVlbF9hY3Rpb25Eb3VibGU6IFwiL2hjZGctYWNjb3VudC9hcGkvcGhvbmVGcmFnbWVudHMvYWN0aW9uRG91YmxlXCIsLy/mir3miYvmnLrnv7vlgI1cblxuICAgIC8v6YeR5biB6L2s55uY55u45YWz5o6l5Y+jXG4gICAgZ29sZFdoZWVsX2luZGV4OiBcIi9oY2RnLWFjY291bnQvYXBpL3R1cm50YWJsZS9pbmRleFwiLC8v6YeR5biB6L2s55uY6aaW6aG1XG4gICAgZ29sZFdoZWVsX2FjdGlvbjogXCIvaGNkZy1hY2NvdW50L2FwaS90dXJudGFibGUvYWN0aW9uXCIsLy/ph5HluIHovaznm5jmir3lpZZcbiAgICBnb2xkV2hlZWxfY2hlY2tJbjogXCIvaGNkZy1hY2NvdW50L2FwaS90dXJudGFibGUvY2hlY2tJblwiLC8v6YeR6L2s55uY5pmu6YCa6aKG5Y+WXG4gICAgZ29sZFdoZWVsX3JlY2VpdmU6IFwiL2hjZGctYWNjb3VudC9hcGkvdHVybnRhYmxlL3JlY2VpdmVTdGFnZVJld2FyZFwiLC8v6aKG5Y+W6Zi25q615aWW5YqxXG5cbiAgICAvL+etvuWIsOWkhOWcqOe6v+e6ouWMheaOpeWPo1xuICAgIG9uUHJpemVHZXRSZXdhcmRNYWluOiBcIi9oY2RnLWFjY291bnQvYXBpL29ubGluZVJld2FyZC9pbmRleFwiLCAgIC8v5Zyo57q/5aWW5Yqx5piO57uGXG4gICAgb25Qcml6ZUdldFJld2FyZEdldDogXCIvaGNkZy1hY2NvdW50L2FwaS9vbmxpbmVSZXdhcmQvcmVjZWl2ZVwiLCAgLy/pooblj5blnKjnur/nuqLljIUgICAgXG5cbiAgICAvL+emj+WIqee6ouWMheaOpeWPo1xuICAgIGJ0blJhbmRvbVJlZENvdW50OlwiL2hjZGctYWNjb3VudC9hcGkvd2VsZmFyZVJlZEVudmVsb3BlL3JlbWFpbmluZ1RpbWVzXCIsICAgIC8v5Ymp5L2Z5qyh5pWwXG4gICAgYnRuUmFuZG9tUmVkR2V0OlwiL2hjZGctYWNjb3VudC9hcGkvd2VsZmFyZVJlZEVudmVsb3BlL3JlY2VpdmVcIiwgICAgICAgICAgICAgLy/pooblj5bnpo/liKnnuqLljIVcblxuICAgIC8v57Sv6K6h6YeR5biB6L+b5bqmXG4gICAgZWFyblByb2dyZXNzSW5kZXg6XCIvaGNkZy1hY2NvdW50L2FwaS9wcm9ncmVzc0Jhci9pbmRleFwiLCAgICAgICAgICAgICAvL+mmlumhtVxuICAgIGVhcm5Qcm9ncmVzc1JlY2VpdmU6XCIvaGNkZy1hY2NvdW50L2FwaS9wcm9ncmVzc0Jhci9yZWNlaXZlXCIsICAgICAgICAgICAgIC8v6aKG5Y+W6YeR5biBXG4gICAgXG4gICAgLy/lrZjpkrHnvZBcbiAgICBzYXZpbmdQb3RJbmRleDpcIi9oY2RnLWFjY291bnQvYXBpL3BpZ2d5QmFuay9pbmRleFwiLCAgICAgICAgICAgICAvL+mmlumhtVxuICAgIHNhdmluZ1BvdFJlY2VpdmU6XCIvaGNkZy1hY2NvdW50L2FwaS9waWdneUJhbmsvcmVjZWl2ZVwiLCAgICAgICAgICAgICAvL+mihuWPlumHkeW4gVxuXG5cblxufVxuZXhwb3J0IGludGVyZmFjZSBTZXJ2ZXJDb25maWcge1xuICAgIHVybDogc3RyaW5nXG4gICAgZGF0YT86IGFueVxuICAgIG1ldGhvZD86IHN0cmluZ1xuICAgIHRpbWVvdXQ/OiBudW1iZXJcbiAgICBoZWFkZXI/OiBvYmplY3RcbiAgICBvblN1Y2Nlc3M6IEZ1bmN0aW9uXG4gICAgb25GYWlsPzogRnVuY3Rpb25cbiAgICBvbkNvbXBsZXRlPzogRnVuY3Rpb25cbn0vL+abtC3lpJot5rqQLeeggS3ogZQt57O7LVE6MzAtMzg3LTQ1OS01NSJdfQ==