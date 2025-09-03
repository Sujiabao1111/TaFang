"use strict";
cc._RF.push(module, 'fb78eFfpM1KUaeHFMAO+tes', 'pageTs');
// Script/common/pageTs.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pageTs = /** @class */ (function () {
    function pageTs() {
    }
    //场景名字
    pageTs.pageName = {
        /**游戏开始 */
        GameStart: "GameStart",
        /**游戏结束 */
        GameEnd: "GameEnd",
        /**游戏通关 */
        GamePass: "GamePass",
        /**游戏设置 */
        GameSet: "GameSet",
        /**道具 */
        GameProp: "GameProp",
        /**签到 */
        GameSign: "GameSign",
        /**签到奖励弹窗**/
        GameSignReward: "GameSignReward",
        /**视频加载Loading */
        GameAdLoading: "GameAdLoading",
        /**请求失败框 */
        GameNetworkLost: "GameNetworkLost",
        /**提现框 */
        GameWallet: "GameWallet",
        /**提现记录框 */
        GameWalletRecord: "GameWalletRecord",
        /**收益双倍 */
        GameEarnings: "GameEarnings",
        /**任务 */
        GameTask: "GameTask",
        /**图鉴 */
        GameTuJian: "GameTuJian",
        /**挽留窗口 */
        GameDetention: "GameDetention",
        /**天降金币奖励弹窗 */
        GameHeavenReward: "GameHeavenReward",
        /**宝箱弹窗 */
        GameTreasure: "GameTreasure",
        /**新手弹窗 */
        GameGuide: "GameGuide",
        /**新手弹窗2 */
        GameGuide2: "GameGuide2",
        /**升级弹窗 */
        GameUpgrade: "GameUpgrade",
        /**游戏通关奖励 */
        GamePassReward: "GamePassReward",
        /**游戏离线收益 */
        GameOffline: "GameOffline",
        /**增加炮塔弹窗 */
        GameGetTurret: "GameGetTurret",
        /**道具获取弹窗 */
        GameToolGet: "GameToolGet",
        /**在线奖励弹窗 */
        GameOnLinePrize: "GameOnLinePrize",
        /**获取额外炮塔 */
        GameGetOtherTurret: "GameGetOtherTurret",
        /**新人任务 */
        GameNewPlayerTask: "GameNewPlayerTask",
        /**炮王任务 */
        GameKingPao: "GameKingPao",
        /**炮王任务进度窗口 */
        GameKingPaoProgress: "GameKingPaoProgress",
        /**任务奖励 */
        GameTaskReward: "GameTaskReward",
        /**金币奖励 */
        GameCoinReward: "GameCoinReward",
        /**抽手机界面 */
        NewBigWheelController: "NewBigWheelController",
        /**抽手机奖励 */
        NewBigWheelPrize: "NewBigWheelPrize",
        /**获得奖励 */
        NewBigWheelPrizeAward: "NewBigWheelPrizeAward",
        /**金币转盘 */
        /**签到处在线奖励弹出 */
        GameOnPrizeGetReward: "GameOnPrizeGetReward",
        /**随机红包弹出 */
        GameRandomRedPrize: "GameRandomRedPrize",
        /**合成炮塔随机红包 */
        GameTurretRandomRed: "GameTurretRandomRed",
        GameGoldWheel: "GameGoldWheel",
        /**视频获取炮塔 */
        GameGetVideoTurret: "GameGetVideoTurret",
        /**游戏通关奖励2 */
        GamePassReward2: "GamePassReward2",
        /**金币进度 */
        GameEarnPro: "GameEarnPro",
        /**存钱罐 */
        GameSavingPot: "GameSavingPot"
    };
    //加载地址
    pageTs.pageUrl = {
        /**游戏开始 */
        GameStart: "prefab/pop/gameStart",
        /**游戏结束 */
        GameEnd: "prefab/pop/gameEnd",
        /**游戏结束 */
        GamePass: "prefab/pop/gamePass",
        /**游戏设置 */
        GameSet: "prefab/pop/gameSet",
        /**道具*/
        GameProp: "prefab/pop/gameProp",
        /**签到 */
        GameSign: "prefab/pop/gameSign",
        /**签到奖励弹窗**/
        GameSignReward: "prefab/pop/gameSignReward",
        /**视频加载Loading */
        GameAdLoading: "prefab/pop/gameAdLoading",
        /**请求失败框 */
        GameNetworkLost: "prefab/pop/gameNetworkLost",
        /**提现框 */
        GameWallet: "prefab/pop/gameWallet",
        /**提现记录框 */
        GameWalletRecord: "prefab/pop/gameWalletRecord",
        /**提现记录框 */
        GameEarnings: "prefab/pop/gameEarnings",
        /**签到 */
        GameTask: "prefab/pop/gameTask",
        /**图鉴 */
        GameTuJian: "prefab/pop/gameTuJian",
        /**挽留窗口 */
        GameDetention: "prefab/pop/gameDetention",
        /**天降奖励弹窗 */
        GameHeavenReward: "prefab/pop/gameHeavenReward",
        /**宝箱弹窗 */
        GameTreasure: "prefab/pop/gameTreasure",
        /**新手弹窗 */
        GameGuide: "prefab/pop/gameGuide",
        /**新手弹窗2 */
        GameGuide2: "prefab/pop/gameGuide2",
        /**升级弹窗 */
        GameUpgrade: "prefab/pop/gameUpgrade",
        /**游戏通关奖励 */
        GamePassReward: "prefab/pop/gamePassReward",
        /**游戏离线收益 */
        GameOffline: "prefab/pop/gameOffline",
        /**增加炮塔弹窗 */
        GameGetTurret: "prefab/pop/gameGetTurret",
        /**道具获取弹窗 */
        GameToolGet: "prefab/pop/gameToolGet",
        /**在线奖励弹窗 */
        GameOnLinePrize: "prefab/pop/gameOnLinePrize",
        /**获取额外炮塔 */
        GameGetOtherTurret: "prefab/pop/gameGetOtherTurret",
        /**任务奖励 */
        GameTaskReward: "prefab/pop/gameTaskReward",
        /**金币奖励 */
        GameCoinReward: "prefab/pop/gameCoinReward",
        /**新人任务 */
        GameNewPlayerTask: "prefab/pop/gameNewPlayerTask",
        /**炮王任务 */
        GameKingPao: "prefab/pop/gameKingPao",
        /**炮王任务进度窗口 */
        GameKingPaoProgress: "prefab/pop/gameKingPaoProgress",
        /**抽手机界面 */
        NewBigWheelController: "prefab/bigwheel/newBigWheelController",
        /**抽手机奖励 */
        NewBigWheelPrize: "prefab/bigwheel/newBigWheelPrize",
        /**获得奖励 */
        NewBigWheelPrizeAward: "prefab/bigwheel/newBigWheelPrizeAward",
        /**金币转盘 */
        GameGoldWheel: "prefab/pop/gameGoldWheel",
        /**签到处在线奖励弹出 */
        GameOnPrizeGetReward: "prefab/pop/gameOnPrizeGetReward",
        /**签到处在线奖励弹出 */
        GameRandomRedPrize: "prefab/pop/gameRandomRedPrize",
        /**合成炮塔随机红包 */
        GameTurretRandomRed: "prefab/pop/gameTurretRandomRed",
        /**视频获取炮塔 */
        GameGetVideoTurret: "prefab/pop/gameGetVideoTurret",
        /**游戏通关奖励2 */
        GamePassReward2: "prefab/pop/gamePassReward2",
        /**金币进度 */
        GameEarnPro: "prefab/pop/gameEarnPro",
        /**存钱罐 */
        GameSavingPot: "prefab/pop/gameSavingPot"
    };
    /**需要暂停游戏的页面*/
    pageTs.stopGamePage = [pageTs.pageName.GameKingPao, pageTs.pageName.NewBigWheelController, pageTs.pageName.GameOnLinePrize];
    /**允许二级弹窗的 */
    pageTs.twoPopPage = [pageTs.pageName.GameKingPao, pageTs.pageName.NewBigWheelController, pageTs.pageName.GameWalletRecord, pageTs.pageName.GameKingPaoProgress,];
    /**最高层级 */
    pageTs.topPopPage = [pageTs.pageName.GameWallet, pageTs.pageName.GameGoldWheel];
    return pageTs;
}());
exports.default = pageTs;

cc._RF.pop();