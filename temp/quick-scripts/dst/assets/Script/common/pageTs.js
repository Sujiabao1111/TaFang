
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/common/pageTs.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxjb21tb25cXHBhZ2VUcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0lBQUE7SUFtTUEsQ0FBQztJQWpNRyxNQUFNO0lBQ0MsZUFBUSxHQUFHO1FBRWQsVUFBVTtRQUNWLFNBQVMsRUFBRSxXQUFXO1FBQ3RCLFVBQVU7UUFDVixPQUFPLEVBQUUsU0FBUztRQUNsQixVQUFVO1FBQ1YsUUFBUSxFQUFFLFVBQVU7UUFDcEIsVUFBVTtRQUNWLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLFFBQVE7UUFDUixRQUFRLEVBQUUsVUFBVTtRQUNwQixRQUFRO1FBQ1IsUUFBUSxFQUFFLFVBQVU7UUFDcEIsWUFBWTtRQUNaLGNBQWMsRUFBRSxnQkFBZ0I7UUFDaEMsaUJBQWlCO1FBQ2pCLGFBQWEsRUFBRSxlQUFlO1FBQzlCLFdBQVc7UUFDWCxlQUFlLEVBQUUsaUJBQWlCO1FBQ2xDLFNBQVM7UUFDVCxVQUFVLEVBQUUsWUFBWTtRQUN4QixXQUFXO1FBQ1gsZ0JBQWdCLEVBQUUsa0JBQWtCO1FBQ3BDLFVBQVU7UUFDVixZQUFZLEVBQUUsY0FBYztRQUM1QixRQUFRO1FBQ1IsUUFBUSxFQUFFLFVBQVU7UUFDcEIsUUFBUTtRQUNSLFVBQVUsRUFBRSxZQUFZO1FBQ3hCLFVBQVU7UUFDVixhQUFhLEVBQUUsZUFBZTtRQUM5QixjQUFjO1FBQ2QsZ0JBQWdCLEVBQUUsa0JBQWtCO1FBQ3BDLFVBQVU7UUFDVixZQUFZLEVBQUUsY0FBYztRQUM1QixVQUFVO1FBQ1YsU0FBUyxFQUFFLFdBQVc7UUFDdEIsV0FBVztRQUNYLFVBQVUsRUFBRSxZQUFZO1FBQ3hCLFVBQVU7UUFDVixXQUFXLEVBQUUsYUFBYTtRQUMxQixZQUFZO1FBQ1osY0FBYyxFQUFFLGdCQUFnQjtRQUNoQyxZQUFZO1FBQ1osV0FBVyxFQUFFLGFBQWE7UUFDMUIsWUFBWTtRQUNaLGFBQWEsRUFBRSxlQUFlO1FBQzlCLFlBQVk7UUFDWixXQUFXLEVB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O1FBQ1YsYUFBYSxFQUFFLDBCQUEwQjtRQUN6QyxlQUFlO1FBQ2Ysb0JBQW9CLEVBQUUsaUNBQWlDO1FBQ3ZELGVBQWU7UUFDZixrQkFBa0IsRUFBRSwrQkFBK0I7UUFDbkQsY0FBYztRQUNkLG1CQUFtQixFQUFFLGdDQUFnQztRQUNyRCxZQUFZO1FBQ1osa0JBQWtCLEVBQUMsK0JBQStCO1FBRWxELGFBQWE7UUFDYixlQUFlLEVBQUUsNEJBQTRCO1FBRTdDLFVBQVU7UUFDVixXQUFXLEVBQUMsd0JBQXdCO1FBRXBDLFNBQVM7UUFDVCxhQUFhLEVBQUMsMEJBQTBCO0tBQzNDLENBQUE7SUFFRCxjQUFjO0lBQ1AsbUJBQVksR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMscUJBQXFCLEVBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUMxSCxhQUFhO0lBQ04saUJBQVUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMscUJBQXFCLEVBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBQyxNQUFNLENBQUMsUUFBUSxDQUFDLG1CQUFtQixFQUFFLENBQUE7SUFDN0osVUFBVTtJQUNILGlCQUFVLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBRW5GLGFBQUM7Q0FuTUQsQUFtTUMsSUFBQTtrQkFuTW9CLE1BQU0iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBwYWdlVHMge1xuXG4gICAgLy/lnLrmma/lkI3lrZdcbiAgICBzdGF0aWMgcGFnZU5hbWUgPSB7XG5cbiAgICAgICAgLyoq5ri45oiP5byA5aeLICovXG4gICAgICAgIEdhbWVTdGFydDogXCJHYW1lU3RhcnRcIixcbiAgICAgICAgLyoq5ri45oiP57uT5p2fICovXG4gICAgICAgIEdhbWVFbmQ6IFwiR2FtZUVuZFwiLFxuICAgICAgICAvKirmuLjmiI/pgJrlhbMgKi9cbiAgICAgICAgR2FtZVBhc3M6IFwiR2FtZVBhc3NcIixcbiAgICAgICAgLyoq5ri45oiP6K6+572uICovXG4gICAgICAgIEdhbWVTZXQ6IFwiR2FtZVNldFwiLFxuICAgICAgICAvKirpgZPlhbcgKi9cbiAgICAgICAgR2FtZVByb3A6IFwiR2FtZVByb3BcIixcbiAgICAgICAgLyoq562+5YiwICovXG4gICAgICAgIEdhbWVTaWduOiBcIkdhbWVTaWduXCIsXG4gICAgICAgIC8qKuetvuWIsOWlluWKseW8ueeqlyoqL1xuICAgICAgICBHYW1lU2lnblJld2FyZDogXCJHYW1lU2lnblJld2FyZFwiLFxuICAgICAgICAvKirop4bpopHliqDovb1Mb2FkaW5nICovXG4gICAgICAgIEdhbWVBZExvYWRpbmc6IFwiR2FtZUFkTG9hZGluZ1wiLFxuICAgICAgICAvKiror7fmsYLlpLHotKXmoYYgKi9cbiAgICAgICAgR2FtZU5ldHdvcmtMb3N0OiBcIkdhbWVOZXR3b3JrTG9zdFwiLFxuICAgICAgICAvKirmj5DnjrDmoYYgKi9cbiAgICAgICAgR2FtZVdhbGxldDogXCJHYW1lV2FsbGV0XCIsXG4gICAgICAgIC8qKuaPkOeOsOiusOW9leahhiAqL1xuICAgICAgICBHYW1lV2FsbGV0UmVjb3JkOiBcIkdhbWVXYWxsZXRSZWNvcmRcIixcbiAgICAgICAgLyoq5pS255uK5Y+M5YCNICovXG4gICAgICAgIEdhbWVFYXJuaW5nczogXCJHYW1lRWFybmluZ3NcIixcbiAgICAgICAgLyoq5Lu75YqhICovXG4gICAgICAgIEdhbWVUYXNrOiBcIkdhbWVUYXNrXCIsXG4gICAgICAgIC8qKuWbvumJtCAqL1xuICAgICAgICBHYW1lVHVKaWFuOiBcIkdhbWVUdUppYW5cIixcbiAgICAgICAgLyoq5oy955WZ56qX5Y+jICovXG4gICAgICAgIEdhbWVEZXRlbnRpb246IFwiR2FtZURldGVudGlvblwiLFxuICAgICAgICAvKirlpKnpmY3ph5HluIHlpZblirHlvLnnqpcgKi9cbiAgICAgICAgR2FtZUhlYXZlblJld2FyZDogXCJHYW1lSGVhdmVuUmV3YXJkXCIsXG4gICAgICAgIC8qKuWuneeuseW8ueeqlyAqL1xuICAgICAgICBHYW1lVHJlYXN1cmU6IFwiR2FtZVRyZWFzdXJlXCIsXG4gICAgICAgIC8qKuaWsOaJi+W8ueeqlyAqL1xuICAgICAgICBHYW1lR3VpZGU6IFwiR2FtZUd1aWRlXCIsXG4gICAgICAgIC8qKuaWsOaJi+W8ueeqlzIgKi9cbiAgICAgICAgR2FtZUd1aWRlMjogXCJHYW1lR3VpZGUyXCIsXG4gICAgICAgIC8qKuWNh+e6p+W8ueeqlyAqL1xuICAgICAgICBHYW1lVXBncmFkZTogXCJHYW1lVXBncmFkZVwiLFxuICAgICAgICAvKirmuLjmiI/pgJrlhbPlpZblirEgKi9cbiAgICAgICAgR2FtZVBhc3NSZXdhcmQ6IFwiR2FtZVBhc3NSZXdhcmRcIixcbiAgICAgICAgLyoq5ri45oiP56a757q/5pS255uKICovXG4gICAgICAgIEdhbWVPZmZsaW5lOiBcIkdhbWVPZmZsaW5lXCIsXG4gICAgICAgIC8qKuWinuWKoOeCruWhlOW8ueeqlyAqL1xuICAgICAgICBHYW1lR2V0VHVycmV0OiBcIkdhbWVHZXRUdXJyZXRcIixcbiAgICAgICAgLyoq6YGT5YW36I635Y+W5by556qXICovXG4gICAgICAgIEdhbWVUb29sR2V0OiBcIkdhbWVUb29sR2V0XCIsXG4gICAgICAgIC8qKuWcqOe6v+WlluWKseW8ueeqlyAqL1xuICAgICAgICBHYW1lT25MaW5lUHJpemU6IFwiR2FtZU9uTGluZVByaXplXCIsXG4gICAgICAgIC8qKuiOt+WPlumineWklueCruWhlCAqL1xuICAgICAgICBHYW1lR2V0T3RoZXJUdXJyZXQ6IFwiR2FtZUdldE90aGVyVHVycmV0XCIsXG4gICAgICAgIC8qKuaWsOS6uuS7u+WKoSAqL1xuICAgICAgICBHYW1lTmV3UGxheWVyVGFzazogXCJHYW1lTmV3UGxheWVyVGFza1wiLFxuICAgICAgICAvKirngq7njovku7vliqEgKi9cbiAgICAgICAgR2FtZUtpbmdQYW86IFwiR2FtZUtpbmdQYW9cIixcbiAgICAgICAgLyoq54Ku546L5Lu75Yqh6L+b5bqm56qX5Y+jICovXG4gICAgICAgIEdhbWVLaW5nUGFvUHJvZ3Jlc3M6IFwiR2FtZUtpbmdQYW9Qcm9ncmVzc1wiLFxuICAgICAgICAvKirku7vliqHlpZblirEgKi9cbiAgICAgICAgR2FtZVRhc2tSZXdhcmQ6IFwiR2FtZVRhc2tSZXdhcmRcIixcbiAgICAgICAgLyoq6YeR5biB5aWW5YqxICovXG4gICAgICAgIEdhbWVDb2luUmV3YXJkOiBcIkdhbWVDb2luUmV3YXJkXCIsXG4gICAgICAgIC8qKuaKveaJi+acuueVjOmdoiAqL1xuICAgICAgICBOZXdCaWdXaGVlbENvbnRyb2xsZXI6IFwiTmV3QmlnV2hlZWxDb250cm9sbGVyXCIsXG4gICAgICAgIC8qKuaKveaJi+acuuWlluWKsSAqL1xuICAgICAgICBOZXdCaWdXaGVlbFByaXplOiBcIk5ld0JpZ1doZWVsUHJpemVcIixcbiAgICAgICAgLyoq6I635b6X5aWW5YqxICovXG4gICAgICAgIE5ld0JpZ1doZWVsUHJpemVBd2FyZDogXCJOZXdCaWdXaGVlbFByaXplQXdhcmRcIixcbiAgICAgICAgLyoq6YeR5biB6L2s55uYICovICBcblxuXG4gICAgICAgIC8qKuetvuWIsOWkhOWcqOe6v+WlluWKseW8ueWHuiAqL1xuICAgICAgICBHYW1lT25Qcml6ZUdldFJld2FyZDogXCJHYW1lT25Qcml6ZUdldFJld2FyZFwiLFxuICAgICAgICAvKirpmo/mnLrnuqLljIXlvLnlh7ogKi9cbiAgICAgICAgR2FtZVJhbmRvbVJlZFByaXplOiBcIkdhbWVSYW5kb21SZWRQcml6ZVwiLFxuICAgICAgICAvKirlkIjmiJDngq7loZTpmo/mnLrnuqLljIUgKi9cbiAgICAgICAgR2FtZVR1cnJldFJhbmRvbVJlZDogXCJHYW1lVHVycmV0UmFuZG9tUmVkXCIsXG5cbiAgICAgICAgR2FtZUdvbGRXaGVlbDogXCJHYW1lR29sZFdoZWVsXCIsXG4gICAgICAgIC8qKuinhumikeiOt+WPlueCruWhlCAqLyAgXG4gICAgICAgIEdhbWVHZXRWaWRlb1R1cnJldDpcIkdhbWVHZXRWaWRlb1R1cnJldFwiLFxuXG4gICAgICAgIFxuICAgICAgICAvKirmuLjmiI/pgJrlhbPlpZblirEyICovXG4gICAgICAgIEdhbWVQYXNzUmV3YXJkMjogXCJHYW1lUGFzc1Jld2FyZDJcIixcbiAgICAgICAgXG4gICAgICAgIC8qKumHkeW4gei/m+W6piAqL1xuICAgICAgICBHYW1lRWFyblBybzpcIkdhbWVFYXJuUHJvXCIsXG4gICAgICAgIFxuICAgICAgICAvKirlrZjpkrHnvZAgKi9cbiAgICAgICAgR2FtZVNhdmluZ1BvdDpcIkdhbWVTYXZpbmdQb3RcIlxuICAgIH1cbiAgICAvL+WKoOi9veWcsOWdgFxuICAgIHN0YXRpYyBwYWdlVXJsID0ge1xuICAgICAgICAvKirmuLjmiI/lvIDlp4sgKi9cbiAgICAgICAgR2FtZVN0YXJ0OiBcInByZWZhYi9wb3AvZ2FtZVN0YXJ0XCIsXG4gICAgICAgIC8qKua4uOaIj+e7k+adnyAqL1xuICAgICAgICBHYW1lRW5kOiBcInByZWZhYi9wb3AvZ2FtZUVuZFwiLFxuICAgICAgICAvKirmuLjmiI/nu5PmnZ8gKi9cbiAgICAgICAgR2FtZVBhc3M6IFwicHJlZmFiL3BvcC9nYW1lUGFzc1wiLFxuICAgICAgICAvKirmuLjmiI/orr7nva4gKi9cbiAgICAgICAgR2FtZVNldDogXCJwcmVmYWIvcG9wL2dhbWVTZXRcIixcbiAgICAgICAgLyoq6YGT5YW3Ki9cbiAgICAgICAgR2FtZVByb3A6IFwicHJlZmFiL3BvcC9nYW1lUHJvcFwiLFxuICAgICAgICAvKirnrb7liLAgKi9cbiAgICAgICAgR2FtZVNpZ246IFwicHJlZmFiL3BvcC9nYW1lU2lnblwiLFxuICAgICAgICAvKirnrb7liLDlpZblirHlvLnnqpcqKi9cbiAgICAgICAgR2FtZVNpZ25SZXdhcmQ6IFwicHJlZmFiL3BvcC9nYW1lU2lnblJld2FyZFwiLFxuICAgICAgICAvKirop4bpopHliqDovb1Mb2FkaW5nICovXG4gICAgICAgIEdhbWVBZExvYWRpbmc6IFwicHJlZmFiL3BvcC9nYW1lQWRMb2FkaW5nXCIsXG4gICAgICAgIC8qKuivt+axguWksei0peahhiAqL1xuICAgICAgICBHYW1lTmV0d29ya0xvc3Q6IFwicHJlZmFiL3BvcC9nYW1lTmV0d29ya0xvc3RcIixcbiAgICAgICAgLyoq5o+Q546w5qGGICovXG4gICAgICAgIEdhbWVXYWxsZXQ6IFwicHJlZmFiL3BvcC9nYW1lV2FsbGV0XCIsXG4gICAgICAgIC8qKuaPkOeOsOiusOW9leahhiAqL1xuICAgICAgICBHYW1lV2FsbGV0UmVjb3JkOiBcInByZWZhYi9wb3AvZ2FtZVdhbGxldFJlY29yZFwiLFxuICAgICAgICAvKirmj5DnjrDorrDlvZXmoYYgKi9cbiAgICAgICAgR2FtZUVhcm5pbmdzOiBcInByZWZhYi9wb3AvZ2FtZUVhcm5pbmdzXCIsXG4gICAgICAgIC8qKuetvuWIsCAqL1xuICAgICAgICBHYW1lVGFzazogXCJwcmVmYWIvcG9wL2dhbWVUYXNrXCIsXG4gICAgICAgIC8qKuWbvumJtCAqL1xuICAgICAgICBHYW1lVHVKaWFuOiBcInByZWZhYi9wb3AvZ2FtZVR1SmlhblwiLFxuICAgICAgICAvKirmjL3nlZnnqpflj6MgKi9cbiAgICAgICAgR2FtZURldGVudGlvbjogXCJwcmVmYWIvcG9wL2dhbWVEZXRlbnRpb25cIixcbiAgICAgICAgLyoq5aSp6ZmN5aWW5Yqx5by556qXICovXG4gICAgICAgIEdhbWVIZWF2ZW5SZXdhcmQ6IFwicHJlZmFiL3BvcC9nYW1lSGVhdmVuUmV3YXJkXCIsXG4gICAgICAgIC8qKuWuneeuseW8ueeqlyAqL1xuICAgICAgICBHYW1lVHJlYXN1cmU6IFwicHJlZmFiL3BvcC9nYW1lVHJlYXN1cmVcIixcbiAgICAgICAgLyoq5paw5omL5by556qXICovXG4gICAgICAgIEdhbWVHdWlkZTogXCJwcmVmYWIvcG9wL2dhbWVHdWlkZVwiLFxuICAgICAgICAvKirmlrDmiYvlvLnnqpcyICovXG4gICAgICAgIEdhbWVHdWlkZTI6IFwicHJlZmFiL3BvcC9nYW1lR3VpZGUyXCIsXG4gICAgICAgIC8qKuWNh+e6p+W8ueeqlyAqL1xuICAgICAgICBHYW1lVXBncmFkZTogXCJwcmVmYWIvcG9wL2dhbWVVcGdyYWRlXCIsXG4gICAgICAgIC8qKua4uOaIj+mAmuWFs+WlluWKsSAqL1xuICAgICAgICBHYW1lUGFzc1Jld2FyZDogXCJwcmVmYWIvcG9wL2dhbWVQYXNzUmV3YXJkXCIsXG4gICAgICAgIC8qKua4uOaIj+emu+e6v+aUtuebiiAqL1xuICAgICAgICBHYW1lT2ZmbGluZTogXCJwcmVmYWIvcG9wL2dhbWVPZmZsaW5lXCIsXG4gICAgICAgIC8qKuWinuWKoOeCruWhlOW8ueeqlyAqL1xuICAgICAgICBHYW1lR2V0VHVycmV0OiBcInByZWZhYi9wb3AvZ2FtZUdldFR1cnJldFwiLFxuICAgICAgICAvKirpgZPlhbfojrflj5blvLnnqpcgKi9cbiAgICAgICAgR2FtZVRvb2xHZXQ6IFwicHJlZmFiL3BvcC9nYW1lVG9vbEdldFwiLFxuICAgICAgICAvKirlnKjnur/lpZblirHlvLnnqpcgKi9cbiAgICAgICAgR2FtZU9uTGluZVByaXplOiBcInByZWZhYi9wb3AvZ2FtZU9uTGluZVByaXplXCIsXG4gICAgICAgIC8qKuiOt+WPlumineWklueCruWhlCAqL1xuICAgICAgICBHYW1lR2V0T3RoZXJUdXJyZXQ6IFwicHJlZmFiL3BvcC9nYW1lR2V0T3RoZXJUdXJyZXRcIixcbiAgICAgICAgLyoq5Lu75Yqh5aWW5YqxICovXG4gICAgICAgIEdhbWVUYXNrUmV3YXJkOiBcInByZWZhYi9wb3AvZ2FtZVRhc2tSZXdhcmRcIixcbiAgICAgICAgLyoq6YeR5biB5aWW5YqxICovXG4gICAgICAgIEdhbWVDb2luUmV3YXJkOiBcInByZWZhYi9wb3AvZ2FtZUNvaW5SZXdhcmRcIixcbiAgICAgICAgLyoq5paw5Lq65Lu75YqhICovXG4gICAgICAgIEdhbWVOZXdQbGF5ZXJUYXNrOiBcInByZWZhYi9wb3AvZ2FtZU5ld1BsYXllclRhc2tcIixcbiAgICAgICAgLyoq54Ku546L5Lu75YqhICovXG4gICAgICAgIEdhbWVLaW5nUGFvOiBcInByZWZhYi9wb3AvZ2FtZUtpbmdQYW9cIixcbiAgICAgICAgLyoq54Ku546L5Lu75Yqh6L+b5bqm56qX5Y+jICovXG4gICAgICAgIEdhbWVLaW5nUGFvUHJvZ3Jlc3M6IFwicHJlZmFiL3BvcC9nYW1lS2luZ1Bhb1Byb2dyZXNzXCIsXG4gICAgICAgIC8qKuaKveaJi+acuueVjOmdoiAqL1xuICAgICAgICBOZXdCaWdXaGVlbENvbnRyb2xsZXI6IFwicHJlZmFiL2JpZ3doZWVsL25ld0JpZ1doZWVsQ29udHJvbGxlclwiLFxuICAgICAgICAvKirmir3miYvmnLrlpZblirEgKi9cbiAgICAgICAgTmV3QmlnV2hlZWxQcml6ZTogXCJwcmVmYWIvYmlnd2hlZWwvbmV3QmlnV2hlZWxQcml6ZVwiLFxuICAgICAgICAvKirojrflvpflpZblirEgKi9cbiAgICAgICAgTmV3QmlnV2hlZWxQcml6ZUF3YXJkOiBcInByZWZhYi9iaWd3aGVlbC9uZXdCaWdXaGVlbFByaXplQXdhcmRcIixcbiAgICAgICAgLyoq6YeR5biB6L2s55uYICovXG4gICAgICAgIEdhbWVHb2xkV2hlZWw6IFwicHJlZmFiL3BvcC9nYW1lR29sZFdoZWVsXCIsXG4gICAgICAgIC8qKuetvuWIsOWkhOWcqOe6v+WlluWKseW8ueWHuiAqL1xuICAgICAgICBHYW1lT25Qcml6ZUdldFJld2FyZDogXCJwcmVmYWIvcG9wL2dhbWVPblByaXplR2V0UmV3YXJkXCIsXG4gICAgICAgIC8qKuetvuWIsOWkhOWcqOe6v+WlluWKseW8ueWHuiAqL1xuICAgICAgICBHYW1lUmFuZG9tUmVkUHJpemU6IFwicHJlZmFiL3BvcC9nYW1lUmFuZG9tUmVkUHJpemVcIixcbiAgICAgICAgLyoq5ZCI5oiQ54Ku5aGU6ZqP5py657qi5YyFICovXG4gICAgICAgIEdhbWVUdXJyZXRSYW5kb21SZWQ6IFwicHJlZmFiL3BvcC9nYW1lVHVycmV0UmFuZG9tUmVkXCIsXG4gICAgICAgIC8qKuinhumikeiOt+WPlueCruWhlCAqLyAgXG4gICAgICAgIEdhbWVHZXRWaWRlb1R1cnJldDpcInByZWZhYi9wb3AvZ2FtZUdldFZpZGVvVHVycmV0XCIsXG4gICAgICAgIFxuICAgICAgICAvKirmuLjmiI/pgJrlhbPlpZblirEyICovXG4gICAgICAgIEdhbWVQYXNzUmV3YXJkMjogXCJwcmVmYWIvcG9wL2dhbWVQYXNzUmV3YXJkMlwiLFxuXG4gICAgICAgIC8qKumHkeW4gei/m+W6piAqL1xuICAgICAgICBHYW1lRWFyblBybzpcInByZWZhYi9wb3AvZ2FtZUVhcm5Qcm9cIixcbiAgICAgICAgXG4gICAgICAgIC8qKuWtmOmSsee9kCAqL1xuICAgICAgICBHYW1lU2F2aW5nUG90OlwicHJlZmFiL3BvcC9nYW1lU2F2aW5nUG90XCJcbiAgICB9XG5cbiAgICAvKirpnIDopoHmmoLlgZzmuLjmiI/nmoTpobXpnaIqL1xuICAgIHN0YXRpYyBzdG9wR2FtZVBhZ2UgPSBbcGFnZVRzLnBhZ2VOYW1lLkdhbWVLaW5nUGFvLHBhZ2VUcy5wYWdlTmFtZS5OZXdCaWdXaGVlbENvbnRyb2xsZXIscGFnZVRzLnBhZ2VOYW1lLkdhbWVPbkxpbmVQcml6ZV07XG4gICAgLyoq5YWB6K645LqM57qn5by556qX55qEICovXG4gICAgc3RhdGljIHR3b1BvcFBhZ2UgPSBbcGFnZVRzLnBhZ2VOYW1lLkdhbWVLaW5nUGFvLHBhZ2VUcy5wYWdlTmFtZS5OZXdCaWdXaGVlbENvbnRyb2xsZXIscGFnZVRzLnBhZ2VOYW1lLkdhbWVXYWxsZXRSZWNvcmQscGFnZVRzLnBhZ2VOYW1lLkdhbWVLaW5nUGFvUHJvZ3Jlc3MsXVxuICAgIC8qKuacgOmrmOWxgue6pyAqL1xuICAgIHN0YXRpYyB0b3BQb3BQYWdlID0gW3BhZ2VUcy5wYWdlTmFtZS5HYW1lV2FsbGV0LHBhZ2VUcy5wYWdlTmFtZS5HYW1lR29sZFdoZWVsXTtcbiAgICBcbn1cbiJdfQ==