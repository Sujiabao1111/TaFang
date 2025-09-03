"use strict";
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