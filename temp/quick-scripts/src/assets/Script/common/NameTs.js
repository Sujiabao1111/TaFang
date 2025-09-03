"use strict";
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