
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxjb21tb25cXHBhZ2VUcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0lBQUE7SUFtTUEsQ0FBQztJQWpNRyxNQUFNO0lBQ0MsZUFBUSxHQUFHO1FBRWQsVUFBVTtRQUNWLFNBQVMsRUFBRSxXQUFXO1FBQ3RCLFVBQVU7UUFDVixPQUFPLEVBQUUsU0FBUztRQUNsQixVQUFVO1FBQ1YsUUFBUSxFQUFFLFVBQVU7UUFDcEIsVUFBVTtRQUNWLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLFFBQVE7UUFDUixRQUFRLEVBQUUsVUFBVTtRQUNwQixRQUFRO1FBQ1IsUUFBUSxFQUFFLFVBQVU7UUFDcEIsWUFBWTtRQUNaLGNBQWMsRUFBRSxnQkFBZ0I7UUFDaEMsaUJBQWlCO1FBQ2pCLGFBQWEsRUFBRSxlQUFlO1FBQzlCLFdBQVc7UUFDWCxlQUFlLEVBQUUsaUJBQWlCO1FBQ2xDLFNBQVM7UUFDVCxVQUFVLEVBQUUsWUFBWTtRQUN4QixXQUFXO1FBQ1gsZ0JBQWdCLEVBQUUsa0JBQWtCO1FBQ3BDLFVBQVU7UUFDVixZQUFZLEVBQUUsY0FBYztRQUM1QixRQUFRO1FBQ1IsUUFBUSxFQUFFLFVBQVU7UUFDcEIsUUFBUTtRQUNSLFVBQVUsRUFBRSxZQUFZO1FBQ3hCLFVBQVU7UUFDVixhQUFhLEVBQUUsZUFBZTtRQUM5QixjQUFjO1FBQ2QsZ0JBQWdCLEVBQUUsa0JBQWtCO1FBQ3BDLFVBQVU7UUFDVixZQUFZLEVBQUUsY0FBYztRQUM1QixVQUFVO1FBQ1YsU0FBUyxFQUFFLFdBQVc7UUFDdEIsV0FBVztRQUNYLFVBQVUsRUFBRSxZQUFZO1FBQ3hCLFVBQVU7UUFDVixXQUFXLEVBQUUsYUFBYTtRQUMxQixZQUFZO1FBQ1osY0FBYyxFQUFFLGdCQUFnQjtRQUNoQyxZQUFZO1FBQ1osV0FBVyxFQUFFLGFBQWE7UUFDMUIsWUFBWTtRQUNaLGFBQWEsRUFBRSxlQUFlO1FBQzlCLFlBQVk7UUFDWixXQUFXLEVB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O1FBQ1YsYUFBYSxFQUFFLDBCQUEwQjtRQUN6QyxlQUFlO1FBQ2Ysb0JBQW9CLEVBQUUsaUNBQWlDO1FBQ3ZELGVBQWU7UUFDZixrQkFBa0IsRUFBRSwrQkFBK0I7UUFDbkQsY0FBYztRQUNkLG1CQUFtQixFQUFFLGdDQUFnQztRQUNyRCxZQUFZO1FBQ1osa0JBQWtCLEVBQUMsK0JBQStCO1FBRWxELGFBQWE7UUFDYixlQUFlLEVBQUUsNEJBQTRCO1FBRTdDLFVBQVU7UUFDVixXQUFXLEVBQUMsd0JBQXdCO1FBRXBDLFNBQVM7UUFDVCxhQUFhLEVBQUMsMEJBQTBCO0tBQzNDLENBQUE7SUFFRCxjQUFjO0lBQ1AsbUJBQVksR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMscUJBQXFCLEVBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUMxSCxhQUFhO0lBQ04saUJBQVUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMscUJBQXFCLEVBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBQyxNQUFNLENBQUMsUUFBUSxDQUFDLG1CQUFtQixFQUFFLENBQUE7SUFDN0osVUFBVTtJQUNILGlCQUFVLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBRW5GLGFBQUM7Q0FuTUQsQUFtTUMsSUFBQTtrQkFuTW9CLE1BQU0iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBwYWdlVHMge1xyXG5cclxuICAgIC8v5Zy65pmv5ZCN5a2XXHJcbiAgICBzdGF0aWMgcGFnZU5hbWUgPSB7XHJcblxyXG4gICAgICAgIC8qKua4uOaIj+W8gOWniyAqL1xyXG4gICAgICAgIEdhbWVTdGFydDogXCJHYW1lU3RhcnRcIixcclxuICAgICAgICAvKirmuLjmiI/nu5PmnZ8gKi9cclxuICAgICAgICBHYW1lRW5kOiBcIkdhbWVFbmRcIixcclxuICAgICAgICAvKirmuLjmiI/pgJrlhbMgKi9cclxuICAgICAgICBHYW1lUGFzczogXCJHYW1lUGFzc1wiLFxyXG4gICAgICAgIC8qKua4uOaIj+iuvue9riAqL1xyXG4gICAgICAgIEdhbWVTZXQ6IFwiR2FtZVNldFwiLFxyXG4gICAgICAgIC8qKumBk+WFtyAqL1xyXG4gICAgICAgIEdhbWVQcm9wOiBcIkdhbWVQcm9wXCIsXHJcbiAgICAgICAgLyoq562+5YiwICovXHJcbiAgICAgICAgR2FtZVNpZ246IFwiR2FtZVNpZ25cIixcclxuICAgICAgICAvKirnrb7liLDlpZblirHlvLnnqpcqKi9cclxuICAgICAgICBHYW1lU2lnblJld2FyZDogXCJHYW1lU2lnblJld2FyZFwiLFxyXG4gICAgICAgIC8qKuinhumikeWKoOi9vUxvYWRpbmcgKi9cclxuICAgICAgICBHYW1lQWRMb2FkaW5nOiBcIkdhbWVBZExvYWRpbmdcIixcclxuICAgICAgICAvKiror7fmsYLlpLHotKXmoYYgKi9cclxuICAgICAgICBHYW1lTmV0d29ya0xvc3Q6IFwiR2FtZU5ldHdvcmtMb3N0XCIsXHJcbiAgICAgICAgLyoq5o+Q546w5qGGICovXHJcbiAgICAgICAgR2FtZVdhbGxldDogXCJHYW1lV2FsbGV0XCIsXHJcbiAgICAgICAgLyoq5o+Q546w6K6w5b2V5qGGICovXHJcbiAgICAgICAgR2FtZVdhbGxldFJlY29yZDogXCJHYW1lV2FsbGV0UmVjb3JkXCIsXHJcbiAgICAgICAgLyoq5pS255uK5Y+M5YCNICovXHJcbiAgICAgICAgR2FtZUVhcm5pbmdzOiBcIkdhbWVFYXJuaW5nc1wiLFxyXG4gICAgICAgIC8qKuS7u+WKoSAqL1xyXG4gICAgICAgIEdhbWVUYXNrOiBcIkdhbWVUYXNrXCIsXHJcbiAgICAgICAgLyoq5Zu+6Ym0ICovXHJcbiAgICAgICAgR2FtZVR1SmlhbjogXCJHYW1lVHVKaWFuXCIsXHJcbiAgICAgICAgLyoq5oy955WZ56qX5Y+jICovXHJcbiAgICAgICAgR2FtZURldGVudGlvbjogXCJHYW1lRGV0ZW50aW9uXCIsXHJcbiAgICAgICAgLyoq5aSp6ZmN6YeR5biB5aWW5Yqx5by556qXICovXHJcbiAgICAgICAgR2FtZUhlYXZlblJld2FyZDogXCJHYW1lSGVhdmVuUmV3YXJkXCIsXHJcbiAgICAgICAgLyoq5a6d566x5by556qXICovXHJcbiAgICAgICAgR2FtZVRyZWFzdXJlOiBcIkdhbWVUcmVhc3VyZVwiLFxyXG4gICAgICAgIC8qKuaWsOaJi+W8ueeqlyAqL1xyXG4gICAgICAgIEdhbWVHdWlkZTogXCJHYW1lR3VpZGVcIixcclxuICAgICAgICAvKirmlrDmiYvlvLnnqpcyICovXHJcbiAgICAgICAgR2FtZUd1aWRlMjogXCJHYW1lR3VpZGUyXCIsXHJcbiAgICAgICAgLyoq5Y2H57qn5by556qXICovXHJcbiAgICAgICAgR2FtZVVwZ3JhZGU6IFwiR2FtZVVwZ3JhZGVcIixcclxuICAgICAgICAvKirmuLjmiI/pgJrlhbPlpZblirEgKi9cclxuICAgICAgICBHYW1lUGFzc1Jld2FyZDogXCJHYW1lUGFzc1Jld2FyZFwiLFxyXG4gICAgICAgIC8qKua4uOaIj+emu+e6v+aUtuebiiAqL1xyXG4gICAgICAgIEdhbWVPZmZsaW5lOiBcIkdhbWVPZmZsaW5lXCIsXHJcbiAgICAgICAgLyoq5aKe5Yqg54Ku5aGU5by556qXICovXHJcbiAgICAgICAgR2FtZUdldFR1cnJldDogXCJHYW1lR2V0VHVycmV0XCIsXHJcbiAgICAgICAgLyoq6YGT5YW36I635Y+W5by556qXICovXHJcbiAgICAgICAgR2FtZVRvb2xHZXQ6IFwiR2FtZVRvb2xHZXRcIixcclxuICAgICAgICAvKirlnKjnur/lpZblirHlvLnnqpcgKi9cclxuICAgICAgICBHYW1lT25MaW5lUHJpemU6IFwiR2FtZU9uTGluZVByaXplXCIsXHJcbiAgICAgICAgLyoq6I635Y+W6aKd5aSW54Ku5aGUICovXHJcbiAgICAgICAgR2FtZUdldE90aGVyVHVycmV0OiBcIkdhbWVHZXRPdGhlclR1cnJldFwiLFxyXG4gICAgICAgIC8qKuaWsOS6uuS7u+WKoSAqL1xyXG4gICAgICAgIEdhbWVOZXdQbGF5ZXJUYXNrOiBcIkdhbWVOZXdQbGF5ZXJUYXNrXCIsXHJcbiAgICAgICAgLyoq54Ku546L5Lu75YqhICovXHJcbiAgICAgICAgR2FtZUtpbmdQYW86IFwiR2FtZUtpbmdQYW9cIixcclxuICAgICAgICAvKirngq7njovku7vliqHov5vluqbnqpflj6MgKi9cclxuICAgICAgICBHYW1lS2luZ1Bhb1Byb2dyZXNzOiBcIkdhbWVLaW5nUGFvUHJvZ3Jlc3NcIixcclxuICAgICAgICAvKirku7vliqHlpZblirEgKi9cclxuICAgICAgICBHYW1lVGFza1Jld2FyZDogXCJHYW1lVGFza1Jld2FyZFwiLFxyXG4gICAgICAgIC8qKumHkeW4geWlluWKsSAqL1xyXG4gICAgICAgIEdhbWVDb2luUmV3YXJkOiBcIkdhbWVDb2luUmV3YXJkXCIsXHJcbiAgICAgICAgLyoq5oq95omL5py655WM6Z2iICovXHJcbiAgICAgICAgTmV3QmlnV2hlZWxDb250cm9sbGVyOiBcIk5ld0JpZ1doZWVsQ29udHJvbGxlclwiLFxyXG4gICAgICAgIC8qKuaKveaJi+acuuWlluWKsSAqL1xyXG4gICAgICAgIE5ld0JpZ1doZWVsUHJpemU6IFwiTmV3QmlnV2hlZWxQcml6ZVwiLFxyXG4gICAgICAgIC8qKuiOt+W+l+WlluWKsSAqL1xyXG4gICAgICAgIE5ld0JpZ1doZWVsUHJpemVBd2FyZDogXCJOZXdCaWdXaGVlbFByaXplQXdhcmRcIixcclxuICAgICAgICAvKirph5HluIHovaznm5ggKi8gIFxyXG5cclxuXHJcbiAgICAgICAgLyoq562+5Yiw5aSE5Zyo57q/5aWW5Yqx5by55Ye6ICovXHJcbiAgICAgICAgR2FtZU9uUHJpemVHZXRSZXdhcmQ6IFwiR2FtZU9uUHJpemVHZXRSZXdhcmRcIixcclxuICAgICAgICAvKirpmo/mnLrnuqLljIXlvLnlh7ogKi9cclxuICAgICAgICBHYW1lUmFuZG9tUmVkUHJpemU6IFwiR2FtZVJhbmRvbVJlZFByaXplXCIsXHJcbiAgICAgICAgLyoq5ZCI5oiQ54Ku5aGU6ZqP5py657qi5YyFICovXHJcbiAgICAgICAgR2FtZVR1cnJldFJhbmRvbVJlZDogXCJHYW1lVHVycmV0UmFuZG9tUmVkXCIsXHJcblxyXG4gICAgICAgIEdhbWVHb2xkV2hlZWw6IFwiR2FtZUdvbGRXaGVlbFwiLFxyXG4gICAgICAgIC8qKuinhumikeiOt+WPlueCruWhlCAqLyAgXHJcbiAgICAgICAgR2FtZUdldFZpZGVvVHVycmV0OlwiR2FtZUdldFZpZGVvVHVycmV0XCIsXHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIC8qKua4uOaIj+mAmuWFs+WlluWKsTIgKi9cclxuICAgICAgICBHYW1lUGFzc1Jld2FyZDI6IFwiR2FtZVBhc3NSZXdhcmQyXCIsXHJcbiAgICAgICAgXHJcbiAgICAgICAgLyoq6YeR5biB6L+b5bqmICovXHJcbiAgICAgICAgR2FtZUVhcm5Qcm86XCJHYW1lRWFyblByb1wiLFxyXG4gICAgICAgIFxyXG4gICAgICAgIC8qKuWtmOmSsee9kCAqL1xyXG4gICAgICAgIEdhbWVTYXZpbmdQb3Q6XCJHYW1lU2F2aW5nUG90XCJcclxuICAgIH1cclxuICAgIC8v5Yqg6L295Zyw5Z2AXHJcbiAgICBzdGF0aWMgcGFnZVVybCA9IHtcclxuICAgICAgICAvKirmuLjmiI/lvIDlp4sgKi9cclxuICAgICAgICBHYW1lU3RhcnQ6IFwicHJlZmFiL3BvcC9nYW1lU3RhcnRcIixcclxuICAgICAgICAvKirmuLjmiI/nu5PmnZ8gKi9cclxuICAgICAgICBHYW1lRW5kOiBcInByZWZhYi9wb3AvZ2FtZUVuZFwiLFxyXG4gICAgICAgIC8qKua4uOaIj+e7k+adnyAqL1xyXG4gICAgICAgIEdhbWVQYXNzOiBcInByZWZhYi9wb3AvZ2FtZVBhc3NcIixcclxuICAgICAgICAvKirmuLjmiI/orr7nva4gKi9cclxuICAgICAgICBHYW1lU2V0OiBcInByZWZhYi9wb3AvZ2FtZVNldFwiLFxyXG4gICAgICAgIC8qKumBk+WFtyovXHJcbiAgICAgICAgR2FtZVByb3A6IFwicHJlZmFiL3BvcC9nYW1lUHJvcFwiLFxyXG4gICAgICAgIC8qKuetvuWIsCAqL1xyXG4gICAgICAgIEdhbWVTaWduOiBcInByZWZhYi9wb3AvZ2FtZVNpZ25cIixcclxuICAgICAgICAvKirnrb7liLDlpZblirHlvLnnqpcqKi9cclxuICAgICAgICBHYW1lU2lnblJld2FyZDogXCJwcmVmYWIvcG9wL2dhbWVTaWduUmV3YXJkXCIsXHJcbiAgICAgICAgLyoq6KeG6aKR5Yqg6L29TG9hZGluZyAqL1xyXG4gICAgICAgIEdhbWVBZExvYWRpbmc6IFwicHJlZmFiL3BvcC9nYW1lQWRMb2FkaW5nXCIsXHJcbiAgICAgICAgLyoq6K+35rGC5aSx6LSl5qGGICovXHJcbiAgICAgICAgR2FtZU5ldHdvcmtMb3N0OiBcInByZWZhYi9wb3AvZ2FtZU5ldHdvcmtMb3N0XCIsXHJcbiAgICAgICAgLyoq5o+Q546w5qGGICovXHJcbiAgICAgICAgR2FtZVdhbGxldDogXCJwcmVmYWIvcG9wL2dhbWVXYWxsZXRcIixcclxuICAgICAgICAvKirmj5DnjrDorrDlvZXmoYYgKi9cclxuICAgICAgICBHYW1lV2FsbGV0UmVjb3JkOiBcInByZWZhYi9wb3AvZ2FtZVdhbGxldFJlY29yZFwiLFxyXG4gICAgICAgIC8qKuaPkOeOsOiusOW9leahhiAqL1xyXG4gICAgICAgIEdhbWVFYXJuaW5nczogXCJwcmVmYWIvcG9wL2dhbWVFYXJuaW5nc1wiLFxyXG4gICAgICAgIC8qKuetvuWIsCAqL1xyXG4gICAgICAgIEdhbWVUYXNrOiBcInByZWZhYi9wb3AvZ2FtZVRhc2tcIixcclxuICAgICAgICAvKirlm77pibQgKi9cclxuICAgICAgICBHYW1lVHVKaWFuOiBcInByZWZhYi9wb3AvZ2FtZVR1SmlhblwiLFxyXG4gICAgICAgIC8qKuaMveeVmeeql+WPoyAqL1xyXG4gICAgICAgIEdhbWVEZXRlbnRpb246IFwicHJlZmFiL3BvcC9nYW1lRGV0ZW50aW9uXCIsXHJcbiAgICAgICAgLyoq5aSp6ZmN5aWW5Yqx5by556qXICovXHJcbiAgICAgICAgR2FtZUhlYXZlblJld2FyZDogXCJwcmVmYWIvcG9wL2dhbWVIZWF2ZW5SZXdhcmRcIixcclxuICAgICAgICAvKirlrp3nrrHlvLnnqpcgKi9cclxuICAgICAgICBHYW1lVHJlYXN1cmU6IFwicHJlZmFiL3BvcC9nYW1lVHJlYXN1cmVcIixcclxuICAgICAgICAvKirmlrDmiYvlvLnnqpcgKi9cclxuICAgICAgICBHYW1lR3VpZGU6IFwicHJlZmFiL3BvcC9nYW1lR3VpZGVcIixcclxuICAgICAgICAvKirmlrDmiYvlvLnnqpcyICovXHJcbiAgICAgICAgR2FtZUd1aWRlMjogXCJwcmVmYWIvcG9wL2dhbWVHdWlkZTJcIixcclxuICAgICAgICAvKirljYfnuqflvLnnqpcgKi9cclxuICAgICAgICBHYW1lVXBncmFkZTogXCJwcmVmYWIvcG9wL2dhbWVVcGdyYWRlXCIsXHJcbiAgICAgICAgLyoq5ri45oiP6YCa5YWz5aWW5YqxICovXHJcbiAgICAgICAgR2FtZVBhc3NSZXdhcmQ6IFwicHJlZmFiL3BvcC9nYW1lUGFzc1Jld2FyZFwiLFxyXG4gICAgICAgIC8qKua4uOaIj+emu+e6v+aUtuebiiAqL1xyXG4gICAgICAgIEdhbWVPZmZsaW5lOiBcInByZWZhYi9wb3AvZ2FtZU9mZmxpbmVcIixcclxuICAgICAgICAvKirlop7liqDngq7loZTlvLnnqpcgKi9cclxuICAgICAgICBHYW1lR2V0VHVycmV0OiBcInByZWZhYi9wb3AvZ2FtZUdldFR1cnJldFwiLFxyXG4gICAgICAgIC8qKumBk+WFt+iOt+WPluW8ueeqlyAqL1xyXG4gICAgICAgIEdhbWVUb29sR2V0OiBcInByZWZhYi9wb3AvZ2FtZVRvb2xHZXRcIixcclxuICAgICAgICAvKirlnKjnur/lpZblirHlvLnnqpcgKi9cclxuICAgICAgICBHYW1lT25MaW5lUHJpemU6IFwicHJlZmFiL3BvcC9nYW1lT25MaW5lUHJpemVcIixcclxuICAgICAgICAvKirojrflj5bpop3lpJbngq7loZQgKi9cclxuICAgICAgICBHYW1lR2V0T3RoZXJUdXJyZXQ6IFwicHJlZmFiL3BvcC9nYW1lR2V0T3RoZXJUdXJyZXRcIixcclxuICAgICAgICAvKirku7vliqHlpZblirEgKi9cclxuICAgICAgICBHYW1lVGFza1Jld2FyZDogXCJwcmVmYWIvcG9wL2dhbWVUYXNrUmV3YXJkXCIsXHJcbiAgICAgICAgLyoq6YeR5biB5aWW5YqxICovXHJcbiAgICAgICAgR2FtZUNvaW5SZXdhcmQ6IFwicHJlZmFiL3BvcC9nYW1lQ29pblJld2FyZFwiLFxyXG4gICAgICAgIC8qKuaWsOS6uuS7u+WKoSAqL1xyXG4gICAgICAgIEdhbWVOZXdQbGF5ZXJUYXNrOiBcInByZWZhYi9wb3AvZ2FtZU5ld1BsYXllclRhc2tcIixcclxuICAgICAgICAvKirngq7njovku7vliqEgKi9cclxuICAgICAgICBHYW1lS2luZ1BhbzogXCJwcmVmYWIvcG9wL2dhbWVLaW5nUGFvXCIsXHJcbiAgICAgICAgLyoq54Ku546L5Lu75Yqh6L+b5bqm56qX5Y+jICovXHJcbiAgICAgICAgR2FtZUtpbmdQYW9Qcm9ncmVzczogXCJwcmVmYWIvcG9wL2dhbWVLaW5nUGFvUHJvZ3Jlc3NcIixcclxuICAgICAgICAvKirmir3miYvmnLrnlYzpnaIgKi9cclxuICAgICAgICBOZXdCaWdXaGVlbENvbnRyb2xsZXI6IFwicHJlZmFiL2JpZ3doZWVsL25ld0JpZ1doZWVsQ29udHJvbGxlclwiLFxyXG4gICAgICAgIC8qKuaKveaJi+acuuWlluWKsSAqL1xyXG4gICAgICAgIE5ld0JpZ1doZWVsUHJpemU6IFwicHJlZmFiL2JpZ3doZWVsL25ld0JpZ1doZWVsUHJpemVcIixcclxuICAgICAgICAvKirojrflvpflpZblirEgKi9cclxuICAgICAgICBOZXdCaWdXaGVlbFByaXplQXdhcmQ6IFwicHJlZmFiL2JpZ3doZWVsL25ld0JpZ1doZWVsUHJpemVBd2FyZFwiLFxyXG4gICAgICAgIC8qKumHkeW4gei9rOebmCAqL1xyXG4gICAgICAgIEdhbWVHb2xkV2hlZWw6IFwicHJlZmFiL3BvcC9nYW1lR29sZFdoZWVsXCIsXHJcbiAgICAgICAgLyoq562+5Yiw5aSE5Zyo57q/5aWW5Yqx5by55Ye6ICovXHJcbiAgICAgICAgR2FtZU9uUHJpemVHZXRSZXdhcmQ6IFwicHJlZmFiL3BvcC9nYW1lT25Qcml6ZUdldFJld2FyZFwiLFxyXG4gICAgICAgIC8qKuetvuWIsOWkhOWcqOe6v+WlluWKseW8ueWHuiAqL1xyXG4gICAgICAgIEdhbWVSYW5kb21SZWRQcml6ZTogXCJwcmVmYWIvcG9wL2dhbWVSYW5kb21SZWRQcml6ZVwiLFxyXG4gICAgICAgIC8qKuWQiOaIkOeCruWhlOmaj+acuue6ouWMhSAqL1xyXG4gICAgICAgIEdhbWVUdXJyZXRSYW5kb21SZWQ6IFwicHJlZmFiL3BvcC9nYW1lVHVycmV0UmFuZG9tUmVkXCIsXHJcbiAgICAgICAgLyoq6KeG6aKR6I635Y+W54Ku5aGUICovICBcclxuICAgICAgICBHYW1lR2V0VmlkZW9UdXJyZXQ6XCJwcmVmYWIvcG9wL2dhbWVHZXRWaWRlb1R1cnJldFwiLFxyXG4gICAgICAgIFxyXG4gICAgICAgIC8qKua4uOaIj+mAmuWFs+WlluWKsTIgKi9cclxuICAgICAgICBHYW1lUGFzc1Jld2FyZDI6IFwicHJlZmFiL3BvcC9nYW1lUGFzc1Jld2FyZDJcIixcclxuXHJcbiAgICAgICAgLyoq6YeR5biB6L+b5bqmICovXHJcbiAgICAgICAgR2FtZUVhcm5Qcm86XCJwcmVmYWIvcG9wL2dhbWVFYXJuUHJvXCIsXHJcbiAgICAgICAgXHJcbiAgICAgICAgLyoq5a2Y6ZKx572QICovXHJcbiAgICAgICAgR2FtZVNhdmluZ1BvdDpcInByZWZhYi9wb3AvZ2FtZVNhdmluZ1BvdFwiXHJcbiAgICB9XHJcblxyXG4gICAgLyoq6ZyA6KaB5pqC5YGc5ri45oiP55qE6aG16Z2iKi9cclxuICAgIHN0YXRpYyBzdG9wR2FtZVBhZ2UgPSBbcGFnZVRzLnBhZ2VOYW1lLkdhbWVLaW5nUGFvLHBhZ2VUcy5wYWdlTmFtZS5OZXdCaWdXaGVlbENvbnRyb2xsZXIscGFnZVRzLnBhZ2VOYW1lLkdhbWVPbkxpbmVQcml6ZV07XHJcbiAgICAvKirlhYHorrjkuoznuqflvLnnqpfnmoQgKi9cclxuICAgIHN0YXRpYyB0d29Qb3BQYWdlID0gW3BhZ2VUcy5wYWdlTmFtZS5HYW1lS2luZ1BhbyxwYWdlVHMucGFnZU5hbWUuTmV3QmlnV2hlZWxDb250cm9sbGVyLHBhZ2VUcy5wYWdlTmFtZS5HYW1lV2FsbGV0UmVjb3JkLHBhZ2VUcy5wYWdlTmFtZS5HYW1lS2luZ1Bhb1Byb2dyZXNzLF1cclxuICAgIC8qKuacgOmrmOWxgue6pyAqL1xyXG4gICAgc3RhdGljIHRvcFBvcFBhZ2UgPSBbcGFnZVRzLnBhZ2VOYW1lLkdhbWVXYWxsZXQscGFnZVRzLnBhZ2VOYW1lLkdhbWVHb2xkV2hlZWxdO1xyXG4gICAgXHJcbn1cclxuIl19