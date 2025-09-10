
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/common/NameTs.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4fcf0tcFGlITI+5723jThxi', 'NameTs');
// Script/common/NameTs.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NameTs = /** @class */ (function () {
    function NameTs() {
    }
    //炮台拿起
    NameTs.Game_Turret_PickUp = "Game_Turret_PickUp";
    //炮台放下
    NameTs.Game_Turret_PutDown = "Game_Turret_PutDown";
    //创建炮台
    NameTs.Game_Turret_Creator = "Game_Turret_Creator";
    //销毁炮台
    NameTs.Game_Turret_Killed = "Game_Turret_Killed";
    //升级炮台
    NameTs.Game_Turret_UpLevel = "Game_Turret_UpLevel";
    /**交换炮台*/
    NameTs.Game_Turret_Change = "Game_Turret_Change";
    //销毁怪兽
    NameTs.Game_Monster_Killed = "Game_Monster_Killed";
    //受伤怪兽
    NameTs.Game_Monster_Bruise = "Game_Monster_Bruise";
    //开始创建炮台
    NameTs.Game_Start_CreatorTurret = "Game_Start_CreatorTurret";
    //创建子弹
    NameTs.Game_Turret_Bullet_Creator = "Game_Turret_Bullet_Creator";
    //销毁子弹
    NameTs.Game_Turret_Bullet_Killed = "Game_Turret_Bullet_Killed";
    //创建伤害
    NameTs.Game_Hurt_Creator = "Game_Hurt_Creator";
    //销毁伤害
    NameTs.Game_Hurt_Killed = "Game_Hurt_Killed";
    //创建暴击伤害
    NameTs.Game_Hurt_Crit_Creator = "Game_Hurt_Crit_Creator";
    //销毁暴击伤害
    NameTs.Game_Hurt_Crit_Killed = "Game_Hurt_Crit_Killed";
    //创建等级背景
    NameTs.Game_LevelBg_Creator = "Game_LevelBg_Creator";
    //销毁等级背景
    NameTs.Game_LevelBg_Killed = "Game_LevelBg_Killed";
    //创建等级label
    NameTs.Game_LevelLabel_Creator = "Game_LevelLabel_Creator";
    //销毁等级label
    NameTs.Game_LevelLabel_Killed = "Game_LevelLabel_Killed";
    //双倍收益
    NameTs.Game_Earnings_Linster = "Game_Earnings_Linster";
    //血条创建
    NameTs.Game_Monster_Hp_Creater = "Game_Monster_Hp_Creater";
    //血条销毁
    NameTs.Game_Monster_Hp_Killed = "Game_Monster_Hp_Killed";
    //血条监听
    NameTs.Game_Monster_Hp_Linster = "Game_Monster_Hp_Linster";
    //血
    NameTs.Game_Monster_Blood_Creater = "Game_Monster_Blood_Creater";
    //血
    NameTs.Game_Monster_Blood_Killed = "Game_Monster_Blood_Killed";
    //影子创建
    NameTs.Game_Monster_Shadow_Creater = "Game_Monster_Shadow_Creater";
    //影子销毁
    NameTs.Game_Monster_Shadow_Killed = "Game_Monster_Shadow_Killed";
    //影子监听
    NameTs.Game_Monster_Shadow_Linster = "Game_Monster_Shadow_Linster";
    //位置
    NameTs.Game_Same_Place_PickUp = "Game_Same_Place_PickUp";
    NameTs.Game_Same_Place_PutDown = "Game_Same_Place_PutDown";
    //创建炸开
    NameTs.Game_Bullet_Boom_Creator = "Game_Bullet_Boom_Creator";
    //销毁砸开
    NameTs.Game_Bullet_Boom_Killed = "Game_Bullet_Boom_Killed";
    /**炮弹json*/
    NameTs.bulletData = "bulletData";
    /**购买json*/
    NameTs.buyData = "buyData";
    /**天降金币json*/
    NameTs.coinData = "coinData";
    /**关卡json*/
    NameTs.gkData = "gk";
    /**地图json*/
    NameTs.mapData = "mapData";
    /**怪兽json*/
    NameTs.monsterData = "monsterData";
    /**怪物关卡json*/
    NameTs.monsterIdData = "monsterIdData";
    /**道具json*/
    NameTs.propData = "propData";
    /**宝箱json*/
    NameTs.treasureData = "treasureData";
    /**炮台json*/
    NameTs.turretData = "turretData";
    //关卡更新
    NameTs.Game_View_CustomsUpdata = "Game_View_CustomsUpdata";
    //用户数据更新
    NameTs.Game_View_UserDataUpdata = "Game_View_UserDataUpdata";
    //钱包
    NameTs.Game_Wallet_AddCoin = "Game_Wallet_AddCoin";
    //解锁位置
    NameTs.Game_Unlock_Place = "Game_Unlock_Place";
    //空地宝箱展示
    NameTs.Show_Empty_Box = "Show_Empty_Box";
    //空地宝箱展示
    NameTs.Click_Empty_Box = "Click_Empty_Box";
    //结束游戏
    NameTs.Game_End = "Game_End";
    //更新任务游戏
    NameTs.Game_Task_Progress = "Game_Task_Progress";
    //开始游戏
    NameTs.Game_Start = "Game_Start";
    //暂停游戏
    NameTs.Game_Stop = "Game_Stop";
    //继续游戏
    NameTs.Game_Resume = "Game_Resume";
    //加载怪兽
    NameTs.Game_Load_Monster = "Game_Load_Monster";
    //重玩游戏
    NameTs.Game_Again = "Game_Again";
    //怪物消除所有
    NameTs.Game_Monster_clearAll = "Game_Monster_clearAll";
    //金币特效
    NameTs.Game_Effect_coin = "Game_Effect_coin";
    //炮塔特效
    NameTs.Game_Effect_turret = "Game_Effect_turret";
    //金币数字
    NameTs.Game_Effect_num = "Game_Effect_num";
    //回收天降金币
    NameTs.Game_Heaven_killed = "Game_Heaven_killed";
    //宝箱出现
    NameTs.Game_Treasure_StartTime = "Game_Treasure_StartTime";
    NameTs.Game_Treasure_Show = "Game_Treasure_Show";
    //新手指导开启
    NameTs.Game_Novice_Open = "Game_Novice_Open";
    //新手指导关闭
    NameTs.Game_Novice_Close = "Game_Novice_Close";
    //领取新手任务成功
    NameTs.Game_NewPlayerTaskGet = "Game_NewPlayerTaskGet";
    //关闭新手任务
    NameTs.Game_CloseNewPlayerTask = "Game_CloseNewPlayerTask";
    //炮王任务更新
    NameTs.Game_KingPaoTask_Update = "Game_KingPaoTask_Update";
    //购买更新
    NameTs.Game_Buy_update = "Game_Buy_update";
    //任务更新
    NameTs.Game_Task_updata = "Game_Task_updata";
    NameTs.Game_Main_Task_updata = "Game_Main_Task_updata";
    //任务红点
    NameTs.Game_Task_redPoint = "Game_Task_redPoint";
    //道具栏更新
    NameTs.Game_PropItem_Update = "Game_PropItem_Update";
    NameTs.Game_Tool_Use = "Game_Tool_Use";
    NameTs.Tool_Effect_Name = {
        //怪物消除特效
        Game_Prop_Cls: "EffectToolCls",
        //炮塔自动合成
        Game_Prop_Atuo: "Game_Prop_Atuo",
        //电击道具
        Game_Prop_Shock: "EffectToolShock",
        //护盾道具
        Game_Prop_Shield: "Game_Prop_Shield",
        //冰冻
        Game_Prop_Frozen: "EffectToolFrozen"
    };
    //关闭护盾
    NameTs.Close_Shield = "Close_Shield";
    //关闭自动合成
    NameTs.Close_Prop_Atuo = "Close_Prop_Atuo";
    //图鉴展现更新
    NameTs.Game_TuJian_UpData = "Game_TuJian_UpData";
    //游戏弹窗页面
    NameTs.Game_Pop_Open = "Game_Pop_Open";
    //道具使用
    NameTs.Game_Prop_Use = "Game_Prop_Use";
    //背景音效
    NameTs.Game_Music_BGM = "sound/bgm_1";
    //点击音效
    NameTs.Game_Music_Click = "sound/btn";
    //未点击
    NameTs.clickNoAllowed = "sound/clickNoAllowed";
    //怪物音效
    NameTs.Game_Monster_Dead = "sound/monsterDead";
    //闪电音效 
    NameTs.ToolMusicShock = "sound/ToolMusicShock";
    //护盾音效
    NameTs.ToolMusicShield = "sound/ToolMusicShield";
    //清屏音效
    NameTs.ToolMusicCls = "sound/ToolMusicCls";
    //金币汇集音效
    NameTs.music_goldAdd = "sound/addGold";
    //双倍收益音效
    NameTs.Game_Earing = "sound/earning";
    NameTs.Gold_Wheel = "sound/goldWheel";
    //s
    NameTs.Gola_Wheel_Get = "sound/getGold";
    //背景音效
    // static Game_Music_Gold = "sound/bgm_1";
    // //背景音效
    // static Game_Music_BGM = "sound/bgm_1";
    // //背景音效
    // static Game_Music_BGM = "sound/bgm_1";
    //展示toast
    NameTs.Show_Toast = "Show_Toast";
    //关闭广告加载loading
    NameTs.Close_AdLoading = "Close_AdLoading";
    //安卓端监听事件
    NameTs.onGamePause = "onGamePause";
    NameTs.onGameResume = "onGameResume";
    NameTs.retryTokenSuccess = "retryTokenSuccess";
    NameTs.onBackPressed = "onBackPressed";
    NameTs.bindWechatSuccess = "bindWechatSuccess"; //微信授权后回调
    /**AB测试组 */
    NameTs.lock_turret_test = "lock_turret_test"; //解锁炮塔
    NameTs.heaven_coin_test = "heaven_coin_test"; //天降金币
    NameTs.new_hand_test = "new_hand_test"; //新手流程
    //关掉load页面
    NameTs.Close_LoadPage = "Close_LoadPage";
    //在线奖励事件
    NameTs.onPrizeGetUpdate = "onPrizeGetUpdate"; //在线奖励更新
    //福利红包事件
    NameTs.randomRedUpdate = "randomRedUpdate"; //福利红包更新
    //检查首页签到红点
    NameTs.red_sign_update = "red_sign_update";
    //更新金币进度
    NameTs.Game_EarnProgress_Updata = "Game_EarnProgress_Updata";
    /**看完视频后存钱罐 */
    NameTs.Game_SavingPost_AddCoin = "Game_SavingPost_Add";
    NameTs.Game_SavingPost_Icon = "Game_SavingPost_Icon";
    NameTs.Game_SavingPost_Lock = "Game_SavingPost_Lock";
    return NameTs;
}());
exports.default = NameTs;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxjb21tb25cXE5hbWVUcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNBO0lBQUE7SUF5UkEsQ0FBQztJQXZSRyxNQUFNO0lBQ0MseUJBQWtCLEdBQUcsb0JBQW9CLENBQUM7SUFDakQsTUFBTTtJQUNDLDBCQUFtQixHQUFHLHFCQUFxQixDQUFDO0lBQ25ELE1BQU07SUFDQywwQkFBbUIsR0FBRyxxQkFBcUIsQ0FBQztJQUNuRCxNQUFNO0lBQ0MseUJBQWtCLEdBQUcsb0JBQW9CLENBQUM7SUFDakQsTUFBTTtJQUNDLDBCQUFtQixHQUFHLHFCQUFxQixDQUFDO0lBQ25ELFNBQVM7SUFDRix5QkFBa0IsR0FBRyxvQkFBb0IsQ0FBQztJQUNqRCxNQUFNO0lBQ0MsMEJBQW1CLEdBQUcscUJBQXFCLENBQUM7SUFDbkQsTUFBTTtJQUNDLDBCQUFtQixHQUFHLHFCQUFxQixDQUFDO0lBQ25ELFFBQVE7SUFDRCwrQkFBd0IsR0FBRywwQkFBMEIsQ0FBQztJQUU3RCxNQUFNO0lBQ0MsaUNBQTBCLEdBQUcsNEJBQTRCLENBQUM7SUFDakUsTUFBTTtJQUNDLGdDQUF5QixHQUFHLDJCQUEyQixDQUFDO0lBQy9ELE1BQU07SUFDQyx3QkFBaUIsR0FBRyxtQkFBbUIsQ0FBQztJQUMvQyxNQUFNO0lBQ0MsdUJBQWdCLEdBQUcsa0JBQWtCLENBQUM7SUFDN0MsUUFBUTtJQUNELDZCQUFzQixHQUFHLHdCQUF3QixDQUFDO0lBQ3pELFFBQVE7SUFDRCw0QkFBcUIsR0FBRyx1QkFBdUIsQ0FBQztJQUN2RCxRQUFRO0lBQ0QsMkJBQW9CLEdBQUcsc0JBQXNCLENBQUM7SUFDckQsUUFBUTtJQUNELDBCQUFtQixHQUFHLHFCQUFxQixDQUFDO0lBQ25ELFdBQVc7SUFDSiw4QkFBdUIsR0FBRyx5QkFBeUIsQ0FBQztJQUMzRCxXQUFXO0lBQ0osNkJBQXNCLEdBQUcsd0JBQXdCLENBQUM7SUFJekQsTUFBTTtJQUNDLDRC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O0NBelJELEFBeVJDLElBQUE7a0JBelJvQixNQUFNIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOYW1lVHMge1xuXG4gICAgLy/ngq7lj7Dmi7/otbdcbiAgICBzdGF0aWMgR2FtZV9UdXJyZXRfUGlja1VwID0gXCJHYW1lX1R1cnJldF9QaWNrVXBcIjtcbiAgICAvL+eCruWPsOaUvuS4i1xuICAgIHN0YXRpYyBHYW1lX1R1cnJldF9QdXREb3duID0gXCJHYW1lX1R1cnJldF9QdXREb3duXCI7XG4gICAgLy/liJvlu7rngq7lj7BcbiAgICBzdGF0aWMgR2FtZV9UdXJyZXRfQ3JlYXRvciA9IFwiR2FtZV9UdXJyZXRfQ3JlYXRvclwiO1xuICAgIC8v6ZSA5q+B54Ku5Y+wXG4gICAgc3RhdGljIEdhbWVfVHVycmV0X0tpbGxlZCA9IFwiR2FtZV9UdXJyZXRfS2lsbGVkXCI7XG4gICAgLy/ljYfnuqfngq7lj7BcbiAgICBzdGF0aWMgR2FtZV9UdXJyZXRfVXBMZXZlbCA9IFwiR2FtZV9UdXJyZXRfVXBMZXZlbFwiO1xuICAgIC8qKuS6pOaNoueCruWPsCovXG4gICAgc3RhdGljIEdhbWVfVHVycmV0X0NoYW5nZSA9IFwiR2FtZV9UdXJyZXRfQ2hhbmdlXCI7XG4gICAgLy/plIDmr4HmgKrlhb1cbiAgICBzdGF0aWMgR2FtZV9Nb25zdGVyX0tpbGxlZCA9IFwiR2FtZV9Nb25zdGVyX0tpbGxlZFwiO1xuICAgIC8v5Y+X5Lyk5oCq5YW9XG4gICAgc3RhdGljIEdhbWVfTW9uc3Rlcl9CcnVpc2UgPSBcIkdhbWVfTW9uc3Rlcl9CcnVpc2VcIjtcbiAgICAvL+W8gOWni+WIm+W7uueCruWPsFxuICAgIHN0YXRpYyBHYW1lX1N0YXJ0X0NyZWF0b3JUdXJyZXQgPSBcIkdhbWVfU3RhcnRfQ3JlYXRvclR1cnJldFwiO1xuXG4gICAgLy/liJvlu7rlrZDlvLlcbiAgICBzdGF0aWMgR2FtZV9UdXJyZXRfQnVsbGV0X0NyZWF0b3IgPSBcIkdhbWVfVHVycmV0X0J1bGxldF9DcmVhdG9yXCI7XG4gICAgLy/plIDmr4HlrZDlvLlcbiAgICBzdGF0aWMgR2FtZV9UdXJyZXRfQnVsbGV0X0tpbGxlZCA9IFwiR2FtZV9UdXJyZXRfQnVsbGV0X0tpbGxlZFwiO1xuICAgIC8v5Yib5bu65Lyk5a6zXG4gICAgc3RhdGljIEdhbWVfSHVydF9DcmVhdG9yID0gXCJHYW1lX0h1cnRfQ3JlYXRvclwiO1xuICAgIC8v6ZSA5q+B5Lyk5a6zXG4gICAgc3RhdGljIEdhbWVfSHVydF9LaWxsZWQgPSBcIkdhbWVfSHVydF9LaWxsZWRcIjtcbiAgICAvL+WIm+W7uuaatOWHu+S8pOWus1xuICAgIHN0YXRpYyBHYW1lX0h1cnRfQ3JpdF9DcmVhdG9yID0gXCJHYW1lX0h1cnRfQ3JpdF9DcmVhdG9yXCI7XG4gICAgLy/plIDmr4HmmrTlh7vkvKTlrrNcbiAgICBzdGF0aWMgR2FtZV9IdXJ0X0NyaXRfS2lsbGVkID0gXCJHYW1lX0h1cnRfQ3JpdF9LaWxsZWRcIjtcbiAgICAvL+WIm+W7uuetiee6p+iDjOaZr1xuICAgIHN0YXRpYyBHYW1lX0xldmVsQmdfQ3JlYXRvciA9IFwiR2FtZV9MZXZlbEJnX0NyZWF0b3JcIjtcbiAgICAvL+mUgOavgeetiee6p+iDjOaZr1xuICAgIHN0YXRpYyBHYW1lX0xldmVsQmdfS2lsbGVkID0gXCJHYW1lX0xldmVsQmdfS2lsbGVkXCI7XG4gICAgLy/liJvlu7rnrYnnuqdsYWJlbFxuICAgIHN0YXRpYyBHYW1lX0xldmVsTGFiZWxfQ3JlYXRvciA9IFwiR2FtZV9MZXZlbExhYmVsX0NyZWF0b3JcIjtcbiAgICAvL+mUgOavgeetiee6p2xhYmVsXG4gICAgc3RhdGljIEdhbWVfTGV2ZWxMYWJlbF9LaWxsZWQgPSBcIkdhbWVfTGV2ZWxMYWJlbF9LaWxsZWRcIjtcblxuXG5cbiAgICAvL+WPjOWAjeaUtuebilxuICAgIHN0YXRpYyBHYW1lX0Vhcm5pbmdzX0xpbnN0ZXIgPSBcIkdhbWVfRWFybmluZ3NfTGluc3RlclwiO1xuXG5cbiAgICAvL+ihgOadoeWIm+W7ulxuICAgIHN0YXRpYyBHYW1lX01vbnN0ZXJfSHBfQ3JlYXRlciA9IFwiR2FtZV9Nb25zdGVyX0hwX0NyZWF0ZXJcIjtcbiAgICAvL+ihgOadoemUgOavgVxuICAgIHN0YXRpYyBHYW1lX01vbnN0ZXJfSHBfS2lsbGVkID0gXCJHYW1lX01vbnN0ZXJfSHBfS2lsbGVkXCI7XG4gICAgLy/ooYDmnaHnm5HlkKxcbiAgICBzdGF0aWMgR2FtZV9Nb25zdGVyX0hwX0xpbnN0ZXIgPSBcIkdhbWVfTW9uc3Rlcl9IcF9MaW5zdGVyXCI7XG5cbiAgICAvL+ihgFxuICAgIHN0YXRpYyBHYW1lX01vbnN0ZXJfQmxvb2RfQ3JlYXRlciA9IFwiR2FtZV9Nb25zdGVyX0Jsb29kX0NyZWF0ZXJcIjtcbiAgICAvL+ihgFxuICAgIHN0YXRpYyBHYW1lX01vbnN0ZXJfQmxvb2RfS2lsbGVkID0gXCJHYW1lX01vbnN0ZXJfQmxvb2RfS2lsbGVkXCI7XG5cblxuICAgIC8v5b2x5a2Q5Yib5bu6XG4gICAgc3RhdGljIEdhbWVfTW9uc3Rlcl9TaGFkb3dfQ3JlYXRlciA9IFwiR2FtZV9Nb25zdGVyX1NoYWRvd19DcmVhdGVyXCI7XG4gICAgLy/lvbHlrZDplIDmr4FcbiAgICBzdGF0aWMgR2FtZV9Nb25zdGVyX1NoYWRvd19LaWxsZWQgPSBcIkdhbWVfTW9uc3Rlcl9TaGFkb3dfS2lsbGVkXCI7XG4gICAgLy/lvbHlrZDnm5HlkKxcbiAgICBzdGF0aWMgR2FtZV9Nb25zdGVyX1NoYWRvd19MaW5zdGVyID0gXCJHYW1lX01vbnN0ZXJfU2hhZG93X0xpbnN0ZXJcIjtcblxuICAgIC8v5L2N572uXG4gICAgc3RhdGljIEdhbWVfU2FtZV9QbGFjZV9QaWNrVXAgPSBcIkdhbWVfU2FtZV9QbGFjZV9QaWNrVXBcIjtcbiAgICBzdGF0aWMgR2FtZV9TYW1lX1BsYWNlX1B1dERvd24gPSBcIkdhbWVfU2FtZV9QbGFjZV9QdXREb3duXCI7XG5cbiAgICAvL+WIm+W7uueCuOW8gFxuICAgIHN0YXRpYyBHYW1lX0J1bGxldF9Cb29tX0NyZWF0b3IgPSBcIkdhbWVfQnVsbGV0X0Jvb21fQ3JlYXRvclwiO1xuICAgIC8v6ZSA5q+B56C45byAXG4gICAgc3RhdGljIEdhbWVfQnVsbGV0X0Jvb21fS2lsbGVkID0gXCJHYW1lX0J1bGxldF9Cb29tX0tpbGxlZFwiO1xuXG4gICAgLyoq54Ku5by5anNvbiovXG4gICAgc3RhdGljIGJ1bGxldERhdGEgPSBcImJ1bGxldERhdGFcIjtcbiAgICAvKirotK3kubBqc29uKi9cbiAgICBzdGF0aWMgYnV5RGF0YSA9IFwiYnV5RGF0YVwiO1xuICAgIC8qKuWkqemZjemHkeW4gWpzb24qL1xuICAgIHN0YXRpYyBjb2luRGF0YSA9IFwiY29pbkRhdGFcIjtcbiAgICAvKirlhbPljaFqc29uKi9cbiAgICBzdGF0aWMgZ2tEYXRhID0gXCJna1wiO1xuICAgIC8qKuWcsOWbvmpzb24qL1xuICAgIHN0YXRpYyBtYXBEYXRhID0gXCJtYXBEYXRhXCI7XG4gICAgLyoq5oCq5YW9anNvbiovXG4gICAgc3RhdGljIG1vbnN0ZXJEYXRhID0gXCJtb25zdGVyRGF0YVwiO1xuICAgIC8qKuaAqueJqeWFs+WNoWpzb24qL1xuICAgIHN0YXRpYyBtb25zdGVySWREYXRhID0gXCJtb25zdGVySWREYXRhXCI7XG4gICAgLyoq6YGT5YW3anNvbiovXG4gICAgc3RhdGljIHByb3BEYXRhID0gXCJwcm9wRGF0YVwiO1xuICAgIC8qKuWuneeusWpzb24qL1xuICAgIHN0YXRpYyB0cmVhc3VyZURhdGEgPSBcInRyZWFzdXJlRGF0YVwiO1xuICAgIC8qKueCruWPsGpzb24qL1xuICAgIHN0YXRpYyB0dXJyZXREYXRhID0gXCJ0dXJyZXREYXRhXCI7XG5cblxuXG5cblxuICAgIC8v5YWz5Y2h5pu05pawXG4gICAgc3RhdGljIEdhbWVfVmlld19DdXN0b21zVXBkYXRhID0gXCJHYW1lX1ZpZXdfQ3VzdG9tc1VwZGF0YVwiO1xuICAgIC8v55So5oi35pWw5o2u5pu05pawXG4gICAgc3RhdGljIEdhbWVfVmlld19Vc2VyRGF0YVVwZGF0YSA9IFwiR2FtZV9WaWV3X1VzZXJEYXRhVXBkYXRhXCI7XG5cbiAgICAvL+mSseWMhVxuICAgIHN0YXRpYyBHYW1lX1dhbGxldF9BZGRDb2luID0gXCJHYW1lX1dhbGxldF9BZGRDb2luXCI7XG5cbiAgICAvL+ino+mUgeS9jee9rlxuICAgIHN0YXRpYyBHYW1lX1VubG9ja19QbGFjZSA9IFwiR2FtZV9VbmxvY2tfUGxhY2VcIjtcblxuICAgIC8v56m65Zyw5a6d566x5bGV56S6XG4gICAgc3RhdGljIFNob3dfRW1wdHlfQm94ID0gXCJTaG93X0VtcHR5X0JveFwiO1xuXG4gICAgLy/nqbrlnLDlrp3nrrHlsZXnpLpcbiAgICBzdGF0aWMgQ2xpY2tfRW1wdHlfQm94ID0gXCJDbGlja19FbXB0eV9Cb3hcIjtcblxuICAgIC8v57uT5p2f5ri45oiPXG4gICAgc3RhdGljIEdhbWVfRW5kID0gXCJHYW1lX0VuZFwiO1xuICAgIC8v5pu05paw5Lu75Yqh5ri45oiPXG4gICAgc3RhdGljIEdhbWVfVGFza19Qcm9ncmVzcyA9IFwiR2FtZV9UYXNrX1Byb2dyZXNzXCI7XG4gICAgLy/lvIDlp4vmuLjmiI9cbiAgICBzdGF0aWMgR2FtZV9TdGFydCA9IFwiR2FtZV9TdGFydFwiO1xuICAgIC8v5pqC5YGc5ri45oiPXG4gICAgc3RhdGljIEdhbWVfU3RvcCA9IFwiR2FtZV9TdG9wXCI7XG4gICAgLy/nu6fnu63muLjmiI9cbiAgICBzdGF0aWMgR2FtZV9SZXN1bWUgPSBcIkdhbWVfUmVzdW1lXCI7XG4gICAgLy/liqDovb3mgKrlhb1cbiAgICBzdGF0aWMgR2FtZV9Mb2FkX01vbnN0ZXIgPSBcIkdhbWVfTG9hZF9Nb25zdGVyXCI7XG4gICAgLy/ph43njqnmuLjmiI9cbiAgICBzdGF0aWMgR2FtZV9BZ2FpbiA9IFwiR2FtZV9BZ2FpblwiO1xuICAgIC8v5oCq54mp5raI6Zmk5omA5pyJXG4gICAgc3RhdGljIEdhbWVfTW9uc3Rlcl9jbGVhckFsbCA9IFwiR2FtZV9Nb25zdGVyX2NsZWFyQWxsXCI7XG5cbiAgICAvL+mHkeW4geeJueaViFxuICAgIHN0YXRpYyBHYW1lX0VmZmVjdF9jb2luID0gXCJHYW1lX0VmZmVjdF9jb2luXCI7XG5cbiAgICAvL+eCruWhlOeJueaViFxuICAgIHN0YXRpYyBHYW1lX0VmZmVjdF90dXJyZXQgPSBcIkdhbWVfRWZmZWN0X3R1cnJldFwiO1xuXG4gICAgLy/ph5HluIHmlbDlrZdcbiAgICBzdGF0aWMgR2FtZV9FZmZlY3RfbnVtID0gXCJHYW1lX0VmZmVjdF9udW1cIjtcblxuICAgIC8v5Zue5pS25aSp6ZmN6YeR5biBXG4gICAgc3RhdGljIEdhbWVfSGVhdmVuX2tpbGxlZCA9IFwiR2FtZV9IZWF2ZW5fa2lsbGVkXCI7XG5cbiAgICAvL+WuneeuseWHuueOsFxuICAgIHN0YXRpYyBHYW1lX1RyZWFzdXJlX1N0YXJ0VGltZSA9IFwiR2FtZV9UcmVhc3VyZV9TdGFydFRpbWVcIjtcbiAgICBzdGF0aWMgR2FtZV9UcmVhc3VyZV9TaG93ID0gXCJHYW1lX1RyZWFzdXJlX1Nob3dcIjtcblxuICAgIC8v5paw5omL5oyH5a+85byA5ZCvXG4gICAgc3RhdGljIEdhbWVfTm92aWNlX09wZW4gPSBcIkdhbWVfTm92aWNlX09wZW5cIjtcbiAgICAvL+aWsOaJi+aMh+WvvOWFs+mXrVxuICAgIHN0YXRpYyBHYW1lX05vdmljZV9DbG9zZSA9IFwiR2FtZV9Ob3ZpY2VfQ2xvc2VcIjtcblxuICAgIC8v6aKG5Y+W5paw5omL5Lu75Yqh5oiQ5YqfXG4gICAgc3RhdGljIEdhbWVfTmV3UGxheWVyVGFza0dldCA9IFwiR2FtZV9OZXdQbGF5ZXJUYXNrR2V0XCI7XG4gICAgLy/lhbPpl63mlrDmiYvku7vliqFcbiAgICBzdGF0aWMgR2FtZV9DbG9zZU5ld1BsYXllclRhc2sgPSBcIkdhbWVfQ2xvc2VOZXdQbGF5ZXJUYXNrXCI7XG4gICAgLy/ngq7njovku7vliqHmm7TmlrBcbiAgICBzdGF0aWMgR2FtZV9LaW5nUGFvVGFza19VcGRhdGUgPSBcIkdhbWVfS2luZ1Bhb1Rhc2tfVXBkYXRlXCI7XG4gICAgLy/otK3kubDmm7TmlrBcbiAgICBzdGF0aWMgR2FtZV9CdXlfdXBkYXRlID0gXCJHYW1lX0J1eV91cGRhdGVcIjtcblxuXG4gICAgLy/ku7vliqHmm7TmlrBcbiAgICBzdGF0aWMgR2FtZV9UYXNrX3VwZGF0YSA9IFwiR2FtZV9UYXNrX3VwZGF0YVwiO1xuICAgIHN0YXRpYyBHYW1lX01haW5fVGFza191cGRhdGEgPSBcIkdhbWVfTWFpbl9UYXNrX3VwZGF0YVwiO1xuXG4gICAgLy/ku7vliqHnuqLngrlcbiAgICBzdGF0aWMgR2FtZV9UYXNrX3JlZFBvaW50ID0gXCJHYW1lX1Rhc2tfcmVkUG9pbnRcIjtcblxuICAgIC8v6YGT5YW35qCP5pu05pawXG4gICAgc3RhdGljIEdhbWVfUHJvcEl0ZW1fVXBkYXRlID0gYEdhbWVfUHJvcEl0ZW1fVXBkYXRlYDtcblxuXG4gICAgc3RhdGljIEdhbWVfVG9vbF9Vc2UgPSBgR2FtZV9Ub29sX1VzZWA7XG5cbiAgICBzdGF0aWMgVG9vbF9FZmZlY3RfTmFtZSA9IHtcbiAgICAgICAgLy/mgKrnianmtojpmaTnibnmlYhcbiAgICAgICAgR2FtZV9Qcm9wX0NsczogXCJFZmZlY3RUb29sQ2xzXCIsXG4gICAgICAgIC8v54Ku5aGU6Ieq5Yqo5ZCI5oiQXG4gICAgICAgIEdhbWVfUHJvcF9BdHVvOiBcIkdhbWVfUHJvcF9BdHVvXCIsXG4gICAgICAgIC8v55S15Ye76YGT5YW3XG4gICAgICAgIEdhbWVfUHJvcF9TaG9jazogXCJFZmZlY3RUb29sU2hvY2tcIixcbiAgICAgICAgLy/miqTnm77pgZPlhbdcbiAgICAgICAgR2FtZV9Qcm9wX1NoaWVsZDogXCJHYW1lX1Byb3BfU2hpZWxkXCIsXG4gICAgICAgIC8v5Yaw5Ya7XG4gICAgICAgIEdhbWVfUHJvcF9Gcm96ZW46IFwiRWZmZWN0VG9vbEZyb3plblwiXG4gICAgfVxuXG4gICAgLy/lhbPpl63miqTnm75cbiAgICBzdGF0aWMgQ2xvc2VfU2hpZWxkID0gXCJDbG9zZV9TaGllbGRcIlxuICAgIC8v5YWz6Zet6Ieq5Yqo5ZCI5oiQXG4gICAgc3RhdGljIENsb3NlX1Byb3BfQXR1byA9IFwiQ2xvc2VfUHJvcF9BdHVvXCJcblxuXG4gICAgLy/lm77pibTlsZXnjrDmm7TmlrBcbiAgICBzdGF0aWMgR2FtZV9UdUppYW5fVXBEYXRhID0gXCJHYW1lX1R1Smlhbl9VcERhdGFcIjtcblxuICAgIC8v5ri45oiP5by556qX6aG16Z2iXG4gICAgc3RhdGljIEdhbWVfUG9wX09wZW4gPSBcIkdhbWVfUG9wX09wZW5cIjtcblxuICAgIC8v6YGT5YW35L2/55SoXG4gICAgc3RhdGljIEdhbWVfUHJvcF9Vc2UgPSBcIkdhbWVfUHJvcF9Vc2VcIjtcblxuICAgIC8v6IOM5pmv6Z+z5pWIXG4gICAgc3RhdGljIEdhbWVfTXVzaWNfQkdNID0gXCJzb3VuZC9iZ21fMVwiO1xuICAgIC8v54K55Ye76Z+z5pWIXG4gICAgc3RhdGljIEdhbWVfTXVzaWNfQ2xpY2sgPSBcInNvdW5kL2J0blwiO1xuICAgIC8v5pyq54K55Ye7XG4gICAgc3RhdGljIGNsaWNrTm9BbGxvd2VkID0gXCJzb3VuZC9jbGlja05vQWxsb3dlZFwiO1xuICAgIC8v5oCq54mp6Z+z5pWIXG4gICAgc3RhdGljIEdhbWVfTW9uc3Rlcl9EZWFkID0gXCJzb3VuZC9tb25zdGVyRGVhZFwiO1xuICAgIC8v6Zeq55S16Z+z5pWIIFxuICAgIHN0YXRpYyBUb29sTXVzaWNTaG9jayA9IFwic291bmQvVG9vbE11c2ljU2hvY2tcIjtcbiAgICAvL+aKpOebvumfs+aViFxuICAgIHN0YXRpYyBUb29sTXVzaWNTaGllbGQgPSBcInNvdW5kL1Rvb2xNdXNpY1NoaWVsZFwiO1xuICAgIC8v5riF5bGP6Z+z5pWIXG4gICAgc3RhdGljIFRvb2xNdXNpY0NscyA9IFwic291bmQvVG9vbE11c2ljQ2xzXCI7XG5cbiAgICAvL+mHkeW4geaxh+mbhumfs+aViFxuICAgIHN0YXRpYyBtdXNpY19nb2xkQWRkID0gXCJzb3VuZC9hZGRHb2xkXCI7XG4gICAgLy/lj4zlgI3mlLbnm4rpn7PmlYhcbiAgICBzdGF0aWMgR2FtZV9FYXJpbmcgPSBcInNvdW5kL2Vhcm5pbmdcIjtcblxuICAgIHN0YXRpYyBHb2xkX1doZWVsID0gXCJzb3VuZC9nb2xkV2hlZWxcIlxuICAgIC8vc1xuICAgIHN0YXRpYyBHb2xhX1doZWVsX0dldCA9IFwic291bmQvZ2V0R29sZFwiXG5cbiAgICAvL+iDjOaZr+mfs+aViFxuICAgIC8vIHN0YXRpYyBHYW1lX011c2ljX0dvbGQgPSBcInNvdW5kL2JnbV8xXCI7XG4gICAgLy8gLy/og4zmma/pn7PmlYhcbiAgICAvLyBzdGF0aWMgR2FtZV9NdXNpY19CR00gPSBcInNvdW5kL2JnbV8xXCI7XG4gICAgLy8gLy/og4zmma/pn7PmlYhcbiAgICAvLyBzdGF0aWMgR2FtZV9NdXNpY19CR00gPSBcInNvdW5kL2JnbV8xXCI7XG5cblxuICAgIC8v5bGV56S6dG9hc3RcbiAgICBzdGF0aWMgU2hvd19Ub2FzdCA9IGBTaG93X1RvYXN0YDtcblxuICAgIC8v5YWz6Zet5bm/5ZGK5Yqg6L29bG9hZGluZ1xuICAgIHN0YXRpYyBDbG9zZV9BZExvYWRpbmcgPSBgQ2xvc2VfQWRMb2FkaW5nYDtcblxuICAgIC8v5a6J5Y2T56uv55uR5ZCs5LqL5Lu2XG4gICAgc3RhdGljIG9uR2FtZVBhdXNlID0gXCJvbkdhbWVQYXVzZVwiO1xuICAgIHN0YXRpYyBvbkdhbWVSZXN1bWUgPSBcIm9uR2FtZVJlc3VtZVwiO1xuICAgIHN0YXRpYyByZXRyeVRva2VuU3VjY2VzcyA9IFwicmV0cnlUb2tlblN1Y2Nlc3NcIjtcbiAgICBzdGF0aWMgb25CYWNrUHJlc3NlZCA9IFwib25CYWNrUHJlc3NlZFwiO1xuICAgIHN0YXRpYyBiaW5kV2VjaGF0U3VjY2VzcyA9IFwiYmluZFdlY2hhdFN1Y2Nlc3NcIjsgICAvL+W+ruS/oeaOiOadg+WQjuWbnuiwg1xuXG5cbiAgICAvKipBQua1i+ivlee7hCAqL1xuICAgIHN0YXRpYyBsb2NrX3R1cnJldF90ZXN0ID0gXCJsb2NrX3R1cnJldF90ZXN0XCI7IC8v6Kej6ZSB54Ku5aGUXG4gICAgc3RhdGljIGhlYXZlbl9jb2luX3Rlc3QgPSBcImhlYXZlbl9jb2luX3Rlc3RcIjsgLy/lpKnpmY3ph5HluIFcbiAgICBzdGF0aWMgbmV3X2hhbmRfdGVzdCA9IFwibmV3X2hhbmRfdGVzdFwiOy8v5paw5omL5rWB56iLXG5cblxuXG4gICAgLy/lhbPmjolsb2Fk6aG16Z2iXG4gICAgc3RhdGljIENsb3NlX0xvYWRQYWdlID0gYENsb3NlX0xvYWRQYWdlYDtcblxuICAgIC8v5Zyo57q/5aWW5Yqx5LqL5Lu2XG4gICAgc3RhdGljIG9uUHJpemVHZXRVcGRhdGUgPSBgb25Qcml6ZUdldFVwZGF0ZWA7ICAgICAvL+WcqOe6v+WlluWKseabtOaWsFxuXG4gICAgLy/npo/liKnnuqLljIXkuovku7ZcbiAgICBzdGF0aWMgcmFuZG9tUmVkVXBkYXRlID0gYHJhbmRvbVJlZFVwZGF0ZWA7ICAgICAgIC8v56aP5Yip57qi5YyF5pu05pawXG5cbiAgICAvL+ajgOafpemmlumhteetvuWIsOe6oueCuVxuICAgIHN0YXRpYyByZWRfc2lnbl91cGRhdGUgPSBcInJlZF9zaWduX3VwZGF0ZVwiO1xuXG5cbiAgICAvL+abtOaWsOmHkeW4gei/m+W6plxuICAgIHN0YXRpYyBHYW1lX0Vhcm5Qcm9ncmVzc19VcGRhdGEgPSBcIkdhbWVfRWFyblByb2dyZXNzX1VwZGF0YVwiO1xuXG4gICAgLyoq55yL5a6M6KeG6aKR5ZCO5a2Y6ZKx572QICovXG4gICAgc3RhdGljIEdhbWVfU2F2aW5nUG9zdF9BZGRDb2luID0gXCJHYW1lX1NhdmluZ1Bvc3RfQWRkXCI7XG4gICAgc3RhdGljIEdhbWVfU2F2aW5nUG9zdF9JY29uID0gXCJHYW1lX1NhdmluZ1Bvc3RfSWNvblwiO1xuICAgIHN0YXRpYyBHYW1lX1NhdmluZ1Bvc3RfTG9jayA9IFwiR2FtZV9TYXZpbmdQb3N0X0xvY2tcIjtcbn1cbiJdfQ==