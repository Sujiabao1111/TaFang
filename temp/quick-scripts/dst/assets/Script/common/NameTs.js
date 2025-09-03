
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
    /**炮台json*/
    NameTs.turretData = "turretData2";
    /**地图json*/
    NameTs.mapData = "mapData";
    /**怪兽json*/
    NameTs.monsterData = "monsterData";
    /**购买json*/
    NameTs.buyData = "buyData3";
    /**道具json*/
    NameTs.propData = "propData";
    /**天降金币json*/
    NameTs.coinData = "coinData";
    /**宝箱json*/
    NameTs.treasureData = "treasureData";
    /**怪物关卡json*/
    NameTs.monsterIdData = "monsterIdData";
    /**炮弹json*/
    NameTs.bulletData = "bulletData";
    /**关卡json*/
    NameTs.gkData = "gk";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxjb21tb25cXE5hbWVUcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNBO0lBQUE7SUFtUkEsQ0FBQztJQWpSRyxNQUFNO0lBQ0MseUJBQWtCLEdBQUcsb0JBQW9CLENBQUM7SUFDakQsTUFBTTtJQUNDLDBCQUFtQixHQUFHLHFCQUFxQixDQUFDO0lBQ25ELE1BQU07SUFDQywwQkFBbUIsR0FBRyxxQkFBcUIsQ0FBQztJQUNuRCxNQUFNO0lBQ0MseUJBQWtCLEdBQUcsb0JBQW9CLENBQUM7SUFDakQsTUFBTTtJQUNDLDBCQUFtQixHQUFHLHFCQUFxQixDQUFDO0lBQ25ELFNBQVM7SUFDRix5QkFBa0IsR0FBRyxvQkFBb0IsQ0FBQztJQUNqRCxNQUFNO0lBQ0MsMEJBQW1CLEdBQUcscUJBQXFCLENBQUM7SUFDbkQsTUFBTTtJQUNDLDBCQUFtQixHQUFHLHFCQUFxQixDQUFDO0lBQ25ELFFBQVE7SUFDRCwrQkFBd0IsR0FBRywwQkFBMEIsQ0FBQztJQUU3RCxNQUFNO0lBQ0MsaUNBQTBCLEdBQUcsNEJBQTRCLENBQUM7SUFDakUsTUFBTTtJQUNDLGdDQUF5QixHQUFHLDJCQUEyQixDQUFDO0lBQy9ELE1BQU07SUFDQyx3QkFBaUIsR0FBRyxtQkFBbUIsQ0FBQztJQUMvQyxNQUFNO0lBQ0MsdUJBQWdCLEdBQUcsa0JBQWtCLENBQUM7SUFDN0MsUUFBUTtJQUNELDZCQUFzQixHQUFHLHdCQUF3QixDQUFDO0lBQ3pELFFBQVE7SUFDRCw0QkFBcUIsR0FBRyx1QkFBdUIsQ0FBQztJQUN2RCxRQUFRO0lBQ0QsMkJBQW9CLEdBQUcsc0JBQXNCLENBQUM7SUFDckQsUUFBUTtJQUNELDBCQUFtQixHQUFHLHFCQUFxQixDQUFDO0lBQ25ELFdBQVc7SUFDSiw4QkFBdUIsR0FBRyx5QkFBeUIsQ0FBQztJQUMzRCxXQUFXO0lBQ0osNkJBQXNCLEdBQUcsd0JBQXdCLENBQUM7SUFJekQsTUFBTTtJQUNDLDRC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IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOYW1lVHMge1xuXG4gICAgLy/ngq7lj7Dmi7/otbdcbiAgICBzdGF0aWMgR2FtZV9UdXJyZXRfUGlja1VwID0gXCJHYW1lX1R1cnJldF9QaWNrVXBcIjtcbiAgICAvL+eCruWPsOaUvuS4i1xuICAgIHN0YXRpYyBHYW1lX1R1cnJldF9QdXREb3duID0gXCJHYW1lX1R1cnJldF9QdXREb3duXCI7XG4gICAgLy/liJvlu7rngq7lj7BcbiAgICBzdGF0aWMgR2FtZV9UdXJyZXRfQ3JlYXRvciA9IFwiR2FtZV9UdXJyZXRfQ3JlYXRvclwiO1xuICAgIC8v6ZSA5q+B54Ku5Y+wXG4gICAgc3RhdGljIEdhbWVfVHVycmV0X0tpbGxlZCA9IFwiR2FtZV9UdXJyZXRfS2lsbGVkXCI7XG4gICAgLy/ljYfnuqfngq7lj7BcbiAgICBzdGF0aWMgR2FtZV9UdXJyZXRfVXBMZXZlbCA9IFwiR2FtZV9UdXJyZXRfVXBMZXZlbFwiO1xuICAgIC8qKuS6pOaNoueCruWPsCovXG4gICAgc3RhdGljIEdhbWVfVHVycmV0X0NoYW5nZSA9IFwiR2FtZV9UdXJyZXRfQ2hhbmdlXCI7XG4gICAgLy/plIDmr4HmgKrlhb1cbiAgICBzdGF0aWMgR2FtZV9Nb25zdGVyX0tpbGxlZCA9IFwiR2FtZV9Nb25zdGVyX0tpbGxlZFwiO1xuICAgIC8v5Y+X5Lyk5oCq5YW9XG4gICAgc3RhdGljIEdhbWVfTW9uc3Rlcl9CcnVpc2UgPSBcIkdhbWVfTW9uc3Rlcl9CcnVpc2VcIjtcbiAgICAvL+W8gOWni+WIm+W7uueCruWPsFxuICAgIHN0YXRpYyBHYW1lX1N0YXJ0X0NyZWF0b3JUdXJyZXQgPSBcIkdhbWVfU3RhcnRfQ3JlYXRvclR1cnJldFwiO1xuXG4gICAgLy/liJvlu7rlrZDlvLlcbiAgICBzdGF0aWMgR2FtZV9UdXJyZXRfQnVsbGV0X0NyZWF0b3IgPSBcIkdhbWVfVHVycmV0X0J1bGxldF9DcmVhdG9yXCI7XG4gICAgLy/plIDmr4HlrZDlvLlcbiAgICBzdGF0aWMgR2FtZV9UdXJyZXRfQnVsbGV0X0tpbGxlZCA9IFwiR2FtZV9UdXJyZXRfQnVsbGV0X0tpbGxlZFwiO1xuICAgIC8v5Yib5bu65Lyk5a6zXG4gICAgc3RhdGljIEdhbWVfSHVydF9DcmVhdG9yID0gXCJHYW1lX0h1cnRfQ3JlYXRvclwiO1xuICAgIC8v6ZSA5q+B5Lyk5a6zXG4gICAgc3RhdGljIEdhbWVfSHVydF9LaWxsZWQgPSBcIkdhbWVfSHVydF9LaWxsZWRcIjtcbiAgICAvL+WIm+W7uuaatOWHu+S8pOWus1xuICAgIHN0YXRpYyBHYW1lX0h1cnRfQ3JpdF9DcmVhdG9yID0gXCJHYW1lX0h1cnRfQ3JpdF9DcmVhdG9yXCI7XG4gICAgLy/plIDmr4HmmrTlh7vkvKTlrrNcbiAgICBzdGF0aWMgR2FtZV9IdXJ0X0NyaXRfS2lsbGVkID0gXCJHYW1lX0h1cnRfQ3JpdF9LaWxsZWRcIjtcbiAgICAvL+WIm+W7uuetiee6p+iDjOaZr1xuICAgIHN0YXRpYyBHYW1lX0xldmVsQmdfQ3JlYXRvciA9IFwiR2FtZV9MZXZlbEJnX0NyZWF0b3JcIjtcbiAgICAvL+mUgOavgeetiee6p+iDjOaZr1xuICAgIHN0YXRpYyBHYW1lX0xldmVsQmdfS2lsbGVkID0gXCJHYW1lX0xldmVsQmdfS2lsbGVkXCI7XG4gICAgLy/liJvlu7rnrYnnuqdsYWJlbFxuICAgIHN0YXRpYyBHYW1lX0xldmVsTGFiZWxfQ3JlYXRvciA9IFwiR2FtZV9MZXZlbExhYmVsX0NyZWF0b3JcIjtcbiAgICAvL+mUgOavgeetiee6p2xhYmVsXG4gICAgc3RhdGljIEdhbWVfTGV2ZWxMYWJlbF9LaWxsZWQgPSBcIkdhbWVfTGV2ZWxMYWJlbF9LaWxsZWRcIjtcblxuICAgIFxuXG4gICAgLy/lj4zlgI3mlLbnm4pcbiAgICBzdGF0aWMgR2FtZV9FYXJuaW5nc19MaW5zdGVyID0gXCJHYW1lX0Vhcm5pbmdzX0xpbnN0ZXJcIjtcblxuXG4gICAgLy/ooYDmnaHliJvlu7pcbiAgICBzdGF0aWMgR2FtZV9Nb25zdGVyX0hwX0NyZWF0ZXIgPSBcIkdhbWVfTW9uc3Rlcl9IcF9DcmVhdGVyXCI7XG4gICAgLy/ooYDmnaHplIDmr4FcbiAgICBzdGF0aWMgR2FtZV9Nb25zdGVyX0hwX0tpbGxlZCA9IFwiR2FtZV9Nb25zdGVyX0hwX0tpbGxlZFwiO1xuICAgIC8v6KGA5p2h55uR5ZCsXG4gICAgc3RhdGljIEdhbWVfTW9uc3Rlcl9IcF9MaW5zdGVyID0gXCJHYW1lX01vbnN0ZXJfSHBfTGluc3RlclwiO1xuXG4gICAgLy/ooYBcbiAgICBzdGF0aWMgR2FtZV9Nb25zdGVyX0Jsb29kX0NyZWF0ZXIgPSBcIkdhbWVfTW9uc3Rlcl9CbG9vZF9DcmVhdGVyXCI7XG4gICAgLy/ooYBcbiAgICBzdGF0aWMgR2FtZV9Nb25zdGVyX0Jsb29kX0tpbGxlZCA9IFwiR2FtZV9Nb25zdGVyX0Jsb29kX0tpbGxlZFwiO1xuXG5cbiAgICAvL+W9seWtkOWIm+W7ulxuICAgIHN0YXRpYyBHYW1lX01vbnN0ZXJfU2hhZG93X0NyZWF0ZXIgPSBcIkdhbWVfTW9uc3Rlcl9TaGFkb3dfQ3JlYXRlclwiO1xuICAgIC8v5b2x5a2Q6ZSA5q+BXG4gICAgc3RhdGljIEdhbWVfTW9uc3Rlcl9TaGFkb3dfS2lsbGVkID0gXCJHYW1lX01vbnN0ZXJfU2hhZG93X0tpbGxlZFwiO1xuICAgIC8v5b2x5a2Q55uR5ZCsXG4gICAgc3RhdGljIEdhbWVfTW9uc3Rlcl9TaGFkb3dfTGluc3RlciA9IFwiR2FtZV9Nb25zdGVyX1NoYWRvd19MaW5zdGVyXCI7XG5cbiAgICAvL+S9jee9rlxuICAgIHN0YXRpYyBHYW1lX1NhbWVfUGxhY2VfUGlja1VwID0gXCJHYW1lX1NhbWVfUGxhY2VfUGlja1VwXCI7XG4gICAgc3RhdGljIEdhbWVfU2FtZV9QbGFjZV9QdXREb3duID0gXCJHYW1lX1NhbWVfUGxhY2VfUHV0RG93blwiO1xuXG4gICAgLy/liJvlu7rngrjlvIBcbiAgICBzdGF0aWMgR2FtZV9CdWxsZXRfQm9vbV9DcmVhdG9yID0gXCJHYW1lX0J1bGxldF9Cb29tX0NyZWF0b3JcIjtcbiAgICAvL+mUgOavgeeguOW8gFxuICAgIHN0YXRpYyBHYW1lX0J1bGxldF9Cb29tX0tpbGxlZCA9IFwiR2FtZV9CdWxsZXRfQm9vbV9LaWxsZWRcIjtcblxuICAgIC8qKueCruWPsGpzb24qL1xuICAgIHN0YXRpYyB0dXJyZXREYXRhID0gXCJ0dXJyZXREYXRhMlwiO1xuICAgIC8qKuWcsOWbvmpzb24qL1xuICAgIHN0YXRpYyBtYXBEYXRhID0gXCJtYXBEYXRhXCI7XG4gICAgLyoq5oCq5YW9anNvbiovXG4gICAgc3RhdGljIG1vbnN0ZXJEYXRhID0gXCJtb25zdGVyRGF0YVwiO1xuICAgIC8qKui0reS5sGpzb24qL1xuICAgIHN0YXRpYyBidXlEYXRhID0gXCJidXlEYXRhM1wiO1xuICAgIC8qKumBk+WFt2pzb24qL1xuICAgIHN0YXRpYyBwcm9wRGF0YSA9IFwicHJvcERhdGFcIjtcbiAgICAvKirlpKnpmY3ph5HluIFqc29uKi9cbiAgICBzdGF0aWMgY29pbkRhdGEgPSBcImNvaW5EYXRhXCI7XG4gICAgLyoq5a6d566xanNvbiovXG4gICAgc3RhdGljIHRyZWFzdXJlRGF0YSA9IFwidHJlYXN1cmVEYXRhXCI7XG4gICAgLyoq5oCq54mp5YWz5Y2hanNvbiovXG4gICAgc3RhdGljIG1vbnN0ZXJJZERhdGEgPSBcIm1vbnN0ZXJJZERhdGFcIjtcbiAgICAvKirngq7lvLlqc29uKi9cbiAgICBzdGF0aWMgYnVsbGV0RGF0YSA9IFwiYnVsbGV0RGF0YVwiO1xuXHQvKirlhbPljaFqc29uKi9cbiAgICBzdGF0aWMgZ2tEYXRhID0gXCJna1wiO1xuXG4gICAgLy/lhbPljaHmm7TmlrBcbiAgICBzdGF0aWMgR2FtZV9WaWV3X0N1c3RvbXNVcGRhdGEgPSBcIkdhbWVfVmlld19DdXN0b21zVXBkYXRhXCI7XG4gICAgLy/nlKjmiLfmlbDmja7mm7TmlrBcbiAgICBzdGF0aWMgR2FtZV9WaWV3X1VzZXJEYXRhVXBkYXRhID0gXCJHYW1lX1ZpZXdfVXNlckRhdGFVcGRhdGFcIjtcblxuICAgIC8v6ZKx5YyFXG4gICAgc3RhdGljIEdhbWVfV2FsbGV0X0FkZENvaW4gPSBcIkdhbWVfV2FsbGV0X0FkZENvaW5cIjtcblxuICAgIC8v6Kej6ZSB5L2N572uXG4gICAgc3RhdGljIEdhbWVfVW5sb2NrX1BsYWNlID0gXCJHYW1lX1VubG9ja19QbGFjZVwiO1xuXG4gICAgLy/nqbrlnLDlrp3nrrHlsZXnpLpcbiAgICBzdGF0aWMgU2hvd19FbXB0eV9Cb3ggPSBcIlNob3dfRW1wdHlfQm94XCI7XG5cbiAgICAvL+epuuWcsOWuneeuseWxleekulxuICAgIHN0YXRpYyBDbGlja19FbXB0eV9Cb3ggPSBcIkNsaWNrX0VtcHR5X0JveFwiO1xuXG4gICAgLy/nu5PmnZ/muLjmiI9cbiAgICBzdGF0aWMgR2FtZV9FbmQgPSBcIkdhbWVfRW5kXCI7XG4gICAgLy/mm7TmlrDku7vliqHmuLjmiI9cbiAgICBzdGF0aWMgR2FtZV9UYXNrX1Byb2dyZXNzID0gXCJHYW1lX1Rhc2tfUHJvZ3Jlc3NcIjtcbiAgICAvL+W8gOWni+a4uOaIj1xuICAgIHN0YXRpYyBHYW1lX1N0YXJ0ID0gXCJHYW1lX1N0YXJ0XCI7XG4gICAgLy/mmoLlgZzmuLjmiI9cbiAgICBzdGF0aWMgR2FtZV9TdG9wID0gXCJHYW1lX1N0b3BcIjtcbiAgICAvL+e7p+e7rea4uOaIj1xuICAgIHN0YXRpYyBHYW1lX1Jlc3VtZSA9IFwiR2FtZV9SZXN1bWVcIjtcbiAgICAvL+WKoOi9veaAquWFvVxuICAgIHN0YXRpYyBHYW1lX0xvYWRfTW9uc3RlciA9IFwiR2FtZV9Mb2FkX01vbnN0ZXJcIjtcbiAgICAvL+mHjeeOqea4uOaIj1xuICAgIHN0YXRpYyBHYW1lX0FnYWluID0gXCJHYW1lX0FnYWluXCI7XG4gICAgLy/mgKrnianmtojpmaTmiYDmnIlcbiAgICBzdGF0aWMgR2FtZV9Nb25zdGVyX2NsZWFyQWxsID0gXCJHYW1lX01vbnN0ZXJfY2xlYXJBbGxcIjtcblxuICAgIC8v6YeR5biB54m55pWIXG4gICAgc3RhdGljIEdhbWVfRWZmZWN0X2NvaW4gPSBcIkdhbWVfRWZmZWN0X2NvaW5cIjtcbiAgICAvL+eCruWhlOeJueaViFxuICAgIHN0YXRpYyBHYW1lX0VmZmVjdF90dXJyZXQgPSBcIkdhbWVfRWZmZWN0X3R1cnJldFwiO1xuXG4gICAgLy/ph5HluIHmlbDlrZdcbiAgICBzdGF0aWMgR2FtZV9FZmZlY3RfbnVtID0gXCJHYW1lX0VmZmVjdF9udW1cIjtcblxuICAgIC8v5Zue5pS25aSp6ZmN6YeR5biBXG4gICAgc3RhdGljIEdhbWVfSGVhdmVuX2tpbGxlZCA9IFwiR2FtZV9IZWF2ZW5fa2lsbGVkXCI7XG5cbiAgICAvL+WuneeuseWHuueOsFxuICAgIHN0YXRpYyBHYW1lX1RyZWFzdXJlX1N0YXJ0VGltZSA9IFwiR2FtZV9UcmVhc3VyZV9TdGFydFRpbWVcIjtcbiAgICBzdGF0aWMgR2FtZV9UcmVhc3VyZV9TaG93ID0gXCJHYW1lX1RyZWFzdXJlX1Nob3dcIjtcblxuICAgIC8v5paw5omL5oyH5a+85byA5ZCvXG4gICAgc3RhdGljIEdhbWVfTm92aWNlX09wZW4gPSBcIkdhbWVfTm92aWNlX09wZW5cIjtcbiAgICAvL+aWsOaJi+aMh+WvvOWFs+mXrVxuICAgIHN0YXRpYyBHYW1lX05vdmljZV9DbG9zZSA9IFwiR2FtZV9Ob3ZpY2VfQ2xvc2VcIjtcblxuICAgIC8v6aKG5Y+W5paw5omL5Lu75Yqh5oiQ5YqfXG4gICAgc3RhdGljIEdhbWVfTmV3UGxheWVyVGFza0dldCA9IFwiR2FtZV9OZXdQbGF5ZXJUYXNrR2V0XCI7XG4gICAgLy/lhbPpl63mlrDmiYvku7vliqFcbiAgICBzdGF0aWMgR2FtZV9DbG9zZU5ld1BsYXllclRhc2sgPSBcIkdhbWVfQ2xvc2VOZXdQbGF5ZXJUYXNrXCI7XG4gICAgLy/ngq7njovku7vliqHmm7TmlrBcbiAgICBzdGF0aWMgR2FtZV9LaW5nUGFvVGFza19VcGRhdGUgPSBcIkdhbWVfS2luZ1Bhb1Rhc2tfVXBkYXRlXCI7XG5cbiAgICAvL+i0reS5sOabtOaWsFxuICAgIHN0YXRpYyBHYW1lX0J1eV91cGRhdGUgPSBcIkdhbWVfQnV5X3VwZGF0ZVwiO1xuXG5cbiAgICAvL+S7u+WKoeabtOaWsFxuICAgIHN0YXRpYyBHYW1lX1Rhc2tfdXBkYXRhID0gXCJHYW1lX1Rhc2tfdXBkYXRhXCI7XG4gICAgc3RhdGljIEdhbWVfTWFpbl9UYXNrX3VwZGF0YSA9IFwiR2FtZV9NYWluX1Rhc2tfdXBkYXRhXCI7XG5cbiAgICAvL+S7u+WKoee6oueCuVxuICAgIHN0YXRpYyBHYW1lX1Rhc2tfcmVkUG9pbnQgPSBcIkdhbWVfVGFza19yZWRQb2ludFwiO1xuXG4gICAgLy/pgZPlhbfmoI/mm7TmlrBcbiAgICBzdGF0aWMgR2FtZV9Qcm9wSXRlbV9VcGRhdGUgPSBgR2FtZV9Qcm9wSXRlbV9VcGRhdGVgO1xuXG5cbiAgICBzdGF0aWMgR2FtZV9Ub29sX1VzZSA9IGBHYW1lX1Rvb2xfVXNlYDtcblxuICAgIHN0YXRpYyBUb29sX0VmZmVjdF9OYW1lID0ge1xuICAgICAgICAvL+aAqueJqea2iOmZpOeJueaViFxuICAgICAgICBHYW1lX1Byb3BfQ2xzOiBcIkVmZmVjdFRvb2xDbHNcIixcbiAgICAgICAgLy/ngq7loZToh6rliqjlkIjmiJBcbiAgICAgICAgR2FtZV9Qcm9wX0F0dW86IFwiR2FtZV9Qcm9wX0F0dW9cIixcbiAgICAgICAgLy/nlLXlh7vpgZPlhbdcbiAgICAgICAgR2FtZV9Qcm9wX1Nob2NrOiBcIkVmZmVjdFRvb2xTaG9ja1wiLFxuICAgICAgICAvL+aKpOebvumBk+WFt1xuICAgICAgICBHYW1lX1Byb3BfU2hpZWxkOiBcIkdhbWVfUHJvcF9TaGllbGRcIixcbiAgICAgICAgLy/lhrDlhrtcbiAgICAgICAgR2FtZV9Qcm9wX0Zyb3plbjogXCJFZmZlY3RUb29sRnJvemVuXCJcbiAgICB9XG5cbiAgICAvL+WFs+mXreaKpOebvlxuICAgIHN0YXRpYyBDbG9zZV9TaGllbGQgPSBcIkNsb3NlX1NoaWVsZFwiXG5cblxuICAgIC8v5Zu+6Ym05bGV546w5pu05pawXG4gICAgc3RhdGljIEdhbWVfVHVKaWFuX1VwRGF0YSA9IFwiR2FtZV9UdUppYW5fVXBEYXRhXCI7XG5cbiAgICAvL+a4uOaIj+W8ueeql+mhtemdolxuICAgIHN0YXRpYyBHYW1lX1BvcF9PcGVuID0gXCJHYW1lX1BvcF9PcGVuXCI7XG5cbiAgICAvL+mBk+WFt+S9v+eUqFxuICAgIHN0YXRpYyBHYW1lX1Byb3BfVXNlID0gXCJHYW1lX1Byb3BfVXNlXCI7XG5cbiAgICAvL+iDjOaZr+mfs+aViFxuICAgIHN0YXRpYyBHYW1lX011c2ljX0JHTSA9IFwic291bmQvYmdtXzFcIjtcbiAgICAvL+eCueWHu+mfs+aViFxuICAgIHN0YXRpYyBHYW1lX011c2ljX0NsaWNrID0gXCJzb3VuZC9idG5cIjtcbiAgICAvL+acqueCueWHu1xuICAgIHN0YXRpYyBjbGlja05vQWxsb3dlZCA9IFwic291bmQvY2xpY2tOb0FsbG93ZWRcIjtcbiAgICAvL+aAqueJqemfs+aViFxuICAgIHN0YXRpYyBHYW1lX01vbnN0ZXJfRGVhZCA9IFwic291bmQvbW9uc3RlckRlYWRcIjtcbiAgICAvL+mXqueUtemfs+aViCBcbiAgICBzdGF0aWMgVG9vbE11c2ljU2hvY2sgPSBcInNvdW5kL1Rvb2xNdXNpY1Nob2NrXCI7XG4gICAgLy/miqTnm77pn7PmlYhcbiAgICBzdGF0aWMgVG9vbE11c2ljU2hpZWxkID0gXCJzb3VuZC9Ub29sTXVzaWNTaGllbGRcIjtcbiAgICAvL+a4heWxj+mfs+aViFxuICAgIHN0YXRpYyBUb29sTXVzaWNDbHMgPSBcInNvdW5kL1Rvb2xNdXNpY0Nsc1wiO1xuXG4gICAgLy/ph5HluIHmsYfpm4bpn7PmlYhcbiAgICBzdGF0aWMgbXVzaWNfZ29sZEFkZCA9IFwic291bmQvYWRkR29sZFwiO1xuICAgIC8v5Y+M5YCN5pS255uK6Z+z5pWIXG4gICAgc3RhdGljIEdhbWVfRWFyaW5nID0gXCJzb3VuZC9lYXJuaW5nXCI7XG5cbiAgICBzdGF0aWMgR29sZF9XaGVlbCA9IFwic291bmQvZ29sZFdoZWVsXCJcbiAgICAvL3NcbiAgICBzdGF0aWMgR29sYV9XaGVlbF9HZXQgPSBcInNvdW5kL2dldEdvbGRcIlxuXG4gICAgLy/og4zmma/pn7PmlYhcbiAgICAvLyBzdGF0aWMgR2FtZV9NdXNpY19Hb2xkID0gXCJzb3VuZC9iZ21fMVwiO1xuICAgIC8vIC8v6IOM5pmv6Z+z5pWIXG4gICAgLy8gc3RhdGljIEdhbWVfTXVzaWNfQkdNID0gXCJzb3VuZC9iZ21fMVwiO1xuICAgIC8vIC8v6IOM5pmv6Z+z5pWIXG4gICAgLy8gc3RhdGljIEdhbWVfTXVzaWNfQkdNID0gXCJzb3VuZC9iZ21fMVwiO1xuXG5cbiAgICAvL+WxleekunRvYXN0XG4gICAgc3RhdGljIFNob3dfVG9hc3QgPSBgU2hvd19Ub2FzdGA7XG5cbiAgICAvL+WFs+mXreW5v+WRiuWKoOi9vWxvYWRpbmdcbiAgICBzdGF0aWMgQ2xvc2VfQWRMb2FkaW5nID0gYENsb3NlX0FkTG9hZGluZ2A7XG5cbiAgICAvL+WuieWNk+err+ebkeWQrOS6i+S7tlxuICAgIHN0YXRpYyBvbkdhbWVQYXVzZSA9IFwib25HYW1lUGF1c2VcIjtcbiAgICBzdGF0aWMgb25HYW1lUmVzdW1lID0gXCJvbkdhbWVSZXN1bWVcIjtcbiAgICBzdGF0aWMgcmV0cnlUb2tlblN1Y2Nlc3MgPSBcInJldHJ5VG9rZW5TdWNjZXNzXCI7XG4gICAgc3RhdGljIG9uQmFja1ByZXNzZWQgPSBcIm9uQmFja1ByZXNzZWRcIjtcbiAgICBzdGF0aWMgYmluZFdlY2hhdFN1Y2Nlc3MgPSBcImJpbmRXZWNoYXRTdWNjZXNzXCI7ICAgLy/lvq7kv6HmjojmnYPlkI7lm57osINcblxuXG4gICAgLyoqQULmtYvor5Xnu4QgKi9cbiAgICBzdGF0aWMgbG9ja190dXJyZXRfdGVzdCA9IFwibG9ja190dXJyZXRfdGVzdFwiOyAvL+ino+mUgeeCruWhlFxuICAgIHN0YXRpYyBoZWF2ZW5fY29pbl90ZXN0ID0gXCJoZWF2ZW5fY29pbl90ZXN0XCI7IC8v5aSp6ZmN6YeR5biBXG4gICAgc3RhdGljIG5ld19oYW5kX3Rlc3QgPSBcIm5ld19oYW5kX3Rlc3RcIjsvL+aWsOaJi+a1geeoi1xuXG5cbiAgICBcbiAgICAvL+WFs+aOiWxvYWTpobXpnaJcbiAgICBzdGF0aWMgQ2xvc2VfTG9hZFBhZ2UgPSBgQ2xvc2VfTG9hZFBhZ2VgO1xuXG4gICAgLy/lnKjnur/lpZblirHkuovku7ZcbiAgICBzdGF0aWMgb25Qcml6ZUdldFVwZGF0ZSA9IGBvblByaXplR2V0VXBkYXRlYDsgICAgIC8v5Zyo57q/5aWW5Yqx5pu05pawXG5cbiAgICAvL+emj+WIqee6ouWMheS6i+S7tlxuICAgIHN0YXRpYyByYW5kb21SZWRVcGRhdGUgPSBgcmFuZG9tUmVkVXBkYXRlYDsgICAgICAgLy/npo/liKnnuqLljIXmm7TmlrBcblxuICAgIC8v5qOA5p+l6aaW6aG1562+5Yiw57qi54K5XG4gICAgc3RhdGljIHJlZF9zaWduX3VwZGF0ZSA9IFwicmVkX3NpZ25fdXBkYXRlXCI7XG5cblxuICAgIC8v5pu05paw6YeR5biB6L+b5bqmXG4gICAgc3RhdGljIEdhbWVfRWFyblByb2dyZXNzX1VwZGF0YSA9IFwiR2FtZV9FYXJuUHJvZ3Jlc3NfVXBkYXRhXCI7XG5cbiAgICAvKirnnIvlrozop4bpopHlkI7lrZjpkrHnvZAgKi9cbiAgICBzdGF0aWMgR2FtZV9TYXZpbmdQb3N0X0FkZENvaW4gPSBcIkdhbWVfU2F2aW5nUG9zdF9BZGRcIjtcbiAgICBzdGF0aWMgR2FtZV9TYXZpbmdQb3N0X0ljb24gPSBcIkdhbWVfU2F2aW5nUG9zdF9JY29uXCI7XG4gICAgc3RhdGljIEdhbWVfU2F2aW5nUG9zdF9Mb2NrID0gXCJHYW1lX1NhdmluZ1Bvc3RfTG9ja1wiO1xufVxuIl19