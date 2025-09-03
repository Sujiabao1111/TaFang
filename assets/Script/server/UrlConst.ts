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
export const UrlConst = {
    gameInfoIndex: "/hcdg-account/api/userGameLevel/propsAndGoldPoint",//首页信息
    gameLevelIndex: "/hcdg-account/api/userGameLevel/index",//获取关卡信息
    gameLevelCompleted: "/hcdg-account/api/userGameLevel/completed",//完成关卡信息
    gameLevelReport: "/hcdg-account/api/mapSnapshot/report",//发送快照
    redpackLevelIndex: "/hcdg-account/api/redEnvelope/completedReward",
    redpackLevelGain: "/hcdg-account/api/redEnvelope/open",
    redpackRandomIndex: "/hcdg-account/api/redEnvelope/randomReward",
    redpackRandomGain: "/hcdg-account/api/redEnvelope/randomRewardCheckIn",//随机红包单倍
    redpackRandomDouble: "/hcdg-account/api/redEnvelope/randomRewardCheckInPlus",//随机红包双倍
    redpackFirstGain: "/hcdg-account/api/redEnvelope/newUserReward",
    newRedPackMain: `/hcdg-account/api/redEnvelope/newUserReward`,        //新用户奖励
    videoUpLoad: "/hcdg-account/api/watchAdVideo/upload",
    doubleEarn: "/hcdg-account/api/income/index",//双倍收益
    activateEarn: "/hcdg-account/api/income/activate",//激活双倍收益

    //道具相关
    getToolList: `/hcdg-account/api/gameProp`,         //获取用户游戏道具列表
    getPropCofigList: `/hcdg-account/api/gameProp/config`,         //获取道具配置列表
    getProp: `/hcdg-account/api/gameProp/receive`,                //领取道具
    useProp: `/hcdg-account/api/gameProp/use`, //使用道具
    getUseProp: `/hcdg-account/api/gameProp/receiveAndUseByPropId`, //看视频领取并使用道具

    //提现相关接口
    wallet_main: `/hcdg-account/api/cashOut/index`,       //提现首页
    wallet_main2: `/hcdg-account/api/cashOut/v2/index`,       //提现首页
    wallet_record: `/hcdg-account/api/cashOut/record`,    //提现记录
    wallet_get: `/hcdg-account/api/cashOut/action`,       //立即提现

    //签到相关接口
    sign_main: `/hcdg-account/api/sign/index`,        //签到首页
    sign_commonGet: `/hcdg-account/api/sign/checkIn`, //普通签到
    sign_extraGet: `/hcdg-account/api/sign/checkInExtra`, //额外签到
    sign_videoGet: `/hcdg-account/api/sign/checkInPlus`,  //高级签到

    //任务相关接口    
    task_day_main: `/hcdg-account/api/dailyTask/index`,               //每日任务签到接口：任务首页
    task_day_commonGet: `/hcdg-account/api/dailyTask/checkIn`,        //每日任务签到接口：普通领取
    task_day_doubleGet: `/hcdg-account/api/dailyTask/checkInPlus`,    //每日任务签到接口：多倍领取   
    achievement_main: `/hcdg-account/api/achievementTask/index`,         //成就任务接口：任务首页 
    achievement_commonGet: `/hcdg-account/api/achievementTask/checkIn`,         //成就任务接口：普通领取 
    achievement_doubleGet: `/hcdg-account/api/achievementTask/checkInPlus`,         //成就任务接口：多倍领取  
    task_pass_main: `/hcdg-account/api/levelPassTask/index`,               //闯关任务签到接口：任务首页
    task_pass_commonGet: `/hcdg-account/api/levelPassTask/checkIn`,        //闯关任务签到接口：普通领取
    task_pass_doubleGet: `/hcdg-account/api/levelPassTask/checkInPlus`,    //闯关任务签到接口：多倍领取   

    //天降金币
    heavenCoin_main: `/hcdg-account/api/airborneGold/list`, //获取天降金币的列表
    heavenCoin_get: `/hcdg-account/api/airborneGold/get`,    //获取天降金币  
    heavenCoin_receive: `/hcdg-account/api/airborneGold/receive`,    //提交金币 

    //宝箱
    treasureBox_get: `/hcdg-account/api/goldTreasureBox/receive`,    //领取宝箱金币 
    treasureBox_Isget: `/hcdg-account/api/goldTreasureBox/show`,    //检查是否领取宝箱金币 
    treasureBox_residual: `/hcdg-account/api/goldTreasureBox/residual`,    //剩余次数
    treasureBox_get2: `/hcdg-account/api/goldTreasureBox/receiveV2`,    //领取宝箱金币 （无规则版本）


    //获取配置表
    getConfigData: `/hcdg-account/api/commonParam/map`, //获取配置表


    //获取离线状态
    getOffline: `/hcdg-account/api/offlineIncome/index`, //获取离线状态
    getOfflineCommon: `/hcdg-account/api/offlineIncome/receive`, //普通领取
    getOfflineDouble: `/hcdg-account/api/offlineIncome/receiveDouble`, //双倍领取

    //获取在线时长
    getOnLinePrize: `/hcdg-account/api/onlineDuration/receive`,  //领取在线时长奖励

    //获取额外炮塔
    getairborneBattery: `/hcdg-account/api/airborneBattery/index`,//获取空降炮塔首页次数
    receiveAirborneBattery: `/hcdg-account/api/airborneBattery/receive`,//获取炮塔
    watchVideoAddBattery: `/hcdg-account/api/dailyTask/watchVideoAddBattery`,//看视频获得炮塔记录


    //新人任务
    newPlayerTaskData: `/hcdg-account/api/withdrawTask/index`,       //新人任务首页
    newPlayerTaskGet: `/hcdg-account/api/withdrawTask/receive`,      //新人任务领取

    //炮王任务
    kingPaoTaskData: `/hcdg-account/api/turretKingTask/index`,              //炮王任务首页    
    kingPaoOpen: `/hcdg-account/api/turretKingTask/clockIn`,                //炮王任务打开
    kingPaoGet: `/hcdg-account/api/turretKingTask/receive`,                 //炮王兑换任务
    kingPaoProgress: `/hcdg-account/api/turretKingTask/process`,                 //炮王任务进度

    //视频打卡
    videoCardMain: `/hcdg-account/api/videoClockIn/index`,         //今日打卡情况
    videoCardOk: `/hcdg-account/api/videoClockIn/completed`,       //完成打卡

    //抽手机相关接口
    newBigWheel_index: '/hcdg-account/api/phoneFragments/v2/index',
    newBigWheel_taskCheckIn: "/hcdg-account/api/phoneFragments/taskCheckIn",//领取任务
    newBigWheel_action: "/hcdg-account/api/phoneFragments/v2/action",
    newBigWheel_watch: "/hcdg-account/api/phoneFragments/v2/watch",//看广告重置
    newBigWheel_checkIn: "/hcdg-account/api/phoneFragments/checkIn",//签到
    newBigWheel_actionDouble: "/hcdg-account/api/phoneFragments/actionDouble",//抽手机翻倍

    //金币转盘相关接口
    goldWheel_index: "/hcdg-account/api/turntable/index",//金币转盘首页
    goldWheel_action: "/hcdg-account/api/turntable/action",//金币转盘抽奖
    goldWheel_checkIn: "/hcdg-account/api/turntable/checkIn",//金转盘普通领取
    goldWheel_receive: "/hcdg-account/api/turntable/receiveStageReward",//领取阶段奖励

    //签到处在线红包接口
    onPrizeGetRewardMain: "/hcdg-account/api/onlineReward/index",   //在线奖励明细
    onPrizeGetRewardGet: "/hcdg-account/api/onlineReward/receive",  //领取在线红包    

    //福利红包接口
    btnRandomRedCount:"/hcdg-account/api/welfareRedEnvelope/remainingTimes",    //剩余次数
    btnRandomRedGet:"/hcdg-account/api/welfareRedEnvelope/receive",             //领取福利红包

    //累计金币进度
    earnProgressIndex:"/hcdg-account/api/progressBar/index",             //首页
    earnProgressReceive:"/hcdg-account/api/progressBar/receive",             //领取金币
    
    //存钱罐
    savingPotIndex:"/hcdg-account/api/piggyBank/index",             //首页
    savingPotReceive:"/hcdg-account/api/piggyBank/receive",             //领取金币



}
export interface ServerConfig {
    url: string
    data?: any
    method?: string
    timeout?: number
    header?: object
    onSuccess: Function
    onFail?: Function
    onComplete?: Function
}//更-多-源-码-联-系-Q:30-387-459-55