export default class pageTs {

    //场景名字
    static pageName = {

      
        /**游戏结束 */
        GameEnd: "GameEnd",
        /**游戏设置 */
        GameSet: "GameSet",
        /**道具 */
        GameProp: "GameProp",
        /**签到 */
        GameSign: "GameSign",
        /**请求失败框 */
        GameNetworkLost: "GameNetworkLost",
        /**提现框 */
        GameWallet: "GameWallet",
        /**提现记录框 */
        GameWalletRecord: "GameWalletRecord",
        /**任务 */
        GameTask: "GameTask",
        /**图鉴 */
        GameTuJian: "GameTuJian",
        /**天降金币奖励弹窗 */
        GameHeavenReward: "GameHeavenReward",
        /**宝箱弹窗 */
        GameTreasure: "GameTreasure",
        /**新手弹窗 */
        GameGuide: "GameGuide",
        /**升级弹窗 */
        GameUpgrade: "GameUpgrade",
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
        /**任务奖励 */
        GameTaskReward: "GameTaskReward",
        /**金币奖励 */
        GameCoinReward: "GameCoinReward",


        /**随机红包弹出 */
        GameRandomRedPrize: "GameRandomRedPrize",
        /**合成炮塔随机红包 */
        GameTurretRandomRed: "GameTurretRandomRed",

        GameGoldWheel: "GameGoldWheel",
        /**视频获取炮塔 */
        GameGetVideoTurret: "GameGetVideoTurret",


        /**游戏通关奖励 */
        GamePassReward: "GamePassReward",


        /**奖励弹窗 */
        GameRewardPro: "GameRewardPro",
    }


    //加载地址
    static pageUrl = {
      
        /**游戏结束 */
        GameEnd: "prefab/pop/gameEnd",

        /**游戏设置 */
        GameSet: "prefab/pop/gameSet",
        /**道具*/
        GameProp: "prefab/pop/gameProp",
        /**签到 */
        GameSign: "prefab/pop/gameSign",

        /**请求失败框 */
        GameNetworkLost: "prefab/pop/gameNetworkLost",
        /**提现框 */
        GameWallet: "prefab/pop/gameWallet",
        /**提现记录框 */
        GameWalletRecord: "prefab/pop/gameWalletRecord",
        /**签到 */
        GameTask: "prefab/pop/gameTask",
        /**图鉴 */
        GameTuJian: "prefab/pop/gameTuJian",
        /**天降奖励弹窗 */
        GameHeavenReward: "prefab/pop/gameHeavenReward",
        /**宝箱弹窗 */
        GameTreasure: "prefab/pop/gameTreasure",
        /**新手弹窗 */
        GameGuide: "prefab/pop/gameGuide",
        /**升级弹窗 */
        GameUpgrade: "prefab/pop/gameUpgrade",


        /**道具获取弹窗 */
        GameToolGet: "prefab/pop/gameToolGet",

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
        /**金币转盘 */
        GameGoldWheel: "prefab/pop/gameGoldWheel",

        /**签到处在线奖励弹出 */
        GameRandomRedPrize: "prefab/pop/gameRandomRedPrize",
        /**合成炮塔随机红包 */
        GameTurretRandomRed: "prefab/pop/gameTurretRandomRed",
        /**视频获取炮塔 */
        GameGetVideoTurret: "prefab/pop/gameGetVideoTurret",

        /**游戏通关奖励 */
        GamePassReward: "prefab/pop/gamePassReward",

     

        /**奖励弹窗 */
        GameRewardPro: "prefab/pop/gameRewardPro",

    }




    /**需要暂停游戏的页面*/
    static stopGamePage = [pageTs.pageName.GameKingPao, pageTs.pageName.GameOnLinePrize, pageTs.pageName.GameWallet];
    /**允许二级弹窗的 */
    static twoPopPage = [pageTs.pageName.GameKingPao, pageTs.pageName.GameWalletRecord,]
    /**最高层级 */
    static topPopPage = [pageTs.pageName.GameWallet, pageTs.pageName.GameGoldWheel];

}
