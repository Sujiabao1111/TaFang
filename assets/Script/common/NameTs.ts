
export default class NameTs {

    //炮台拿起
    static Game_Turret_PickUp = "Game_Turret_PickUp";
    //炮台放下
    static Game_Turret_PutDown = "Game_Turret_PutDown";
    //创建炮台
    static Game_Turret_Creator = "Game_Turret_Creator";
    //销毁炮台
    static Game_Turret_Killed = "Game_Turret_Killed";
    //升级炮台
    static Game_Turret_UpLevel = "Game_Turret_UpLevel";
    /**交换炮台*/
    static Game_Turret_Change = "Game_Turret_Change";
    //销毁怪兽
    static Game_Monster_Killed = "Game_Monster_Killed";
    //受伤怪兽
    static Game_Monster_Bruise = "Game_Monster_Bruise";
    //开始创建炮台
    static Game_Start_CreatorTurret = "Game_Start_CreatorTurret";

    //创建子弹
    static Game_Turret_Bullet_Creator = "Game_Turret_Bullet_Creator";
    //销毁子弹
    static Game_Turret_Bullet_Killed = "Game_Turret_Bullet_Killed";
    //创建伤害
    static Game_Hurt_Creator = "Game_Hurt_Creator";
    //销毁伤害
    static Game_Hurt_Killed = "Game_Hurt_Killed";
    //创建暴击伤害
    static Game_Hurt_Crit_Creator = "Game_Hurt_Crit_Creator";
    //销毁暴击伤害
    static Game_Hurt_Crit_Killed = "Game_Hurt_Crit_Killed";
    //创建等级背景
    static Game_LevelBg_Creator = "Game_LevelBg_Creator";
    //销毁等级背景
    static Game_LevelBg_Killed = "Game_LevelBg_Killed";
    //创建等级label
    static Game_LevelLabel_Creator = "Game_LevelLabel_Creator";
    //销毁等级label
    static Game_LevelLabel_Killed = "Game_LevelLabel_Killed";

    

    //双倍收益
    static Game_Earnings_Linster = "Game_Earnings_Linster";


    //血条创建
    static Game_Monster_Hp_Creater = "Game_Monster_Hp_Creater";
    //血条销毁
    static Game_Monster_Hp_Killed = "Game_Monster_Hp_Killed";
    //血条监听
    static Game_Monster_Hp_Linster = "Game_Monster_Hp_Linster";

    //血
    static Game_Monster_Blood_Creater = "Game_Monster_Blood_Creater";
    //血
    static Game_Monster_Blood_Killed = "Game_Monster_Blood_Killed";


    //影子创建
    static Game_Monster_Shadow_Creater = "Game_Monster_Shadow_Creater";
    //影子销毁
    static Game_Monster_Shadow_Killed = "Game_Monster_Shadow_Killed";
    //影子监听
    static Game_Monster_Shadow_Linster = "Game_Monster_Shadow_Linster";

    //位置
    static Game_Same_Place_PickUp = "Game_Same_Place_PickUp";
    static Game_Same_Place_PutDown = "Game_Same_Place_PutDown";

    //创建炸开
    static Game_Bullet_Boom_Creator = "Game_Bullet_Boom_Creator";
    //销毁砸开
    static Game_Bullet_Boom_Killed = "Game_Bullet_Boom_Killed";

    /**炮台json*/
    static turretData = "turretData2";
    /**地图json*/
    static mapData = "mapData";
    /**怪兽json*/
    static monsterData = "monsterData";
    /**购买json*/
    static buyData = "buyData3";
    /**道具json*/
    static propData = "propData";
    /**天降金币json*/
    static coinData = "coinData";
    /**宝箱json*/
    static treasureData = "treasureData";
    /**怪物关卡json*/
    static monsterIdData = "monsterIdData";
    /**炮弹json*/
    static bulletData = "bulletData";
	/**关卡json*/
    static gkData = "gk";

    //关卡更新
    static Game_View_CustomsUpdata = "Game_View_CustomsUpdata";
    //用户数据更新
    static Game_View_UserDataUpdata = "Game_View_UserDataUpdata";

    //钱包
    static Game_Wallet_AddCoin = "Game_Wallet_AddCoin";

    //解锁位置
    static Game_Unlock_Place = "Game_Unlock_Place";

    //空地宝箱展示
    static Show_Empty_Box = "Show_Empty_Box";

    //空地宝箱展示
    static Click_Empty_Box = "Click_Empty_Box";

    //结束游戏
    static Game_End = "Game_End";
    //更新任务游戏
    static Game_Task_Progress = "Game_Task_Progress";
    //开始游戏
    static Game_Start = "Game_Start";
    //暂停游戏
    static Game_Stop = "Game_Stop";
    //继续游戏
    static Game_Resume = "Game_Resume";
    //加载怪兽
    static Game_Load_Monster = "Game_Load_Monster";
    //重玩游戏
    static Game_Again = "Game_Again";
    //怪物消除所有
    static Game_Monster_clearAll = "Game_Monster_clearAll";

    //金币特效
    static Game_Effect_coin = "Game_Effect_coin";
    //炮塔特效
    static Game_Effect_turret = "Game_Effect_turret";

    //金币数字
    static Game_Effect_num = "Game_Effect_num";

    //回收天降金币
    static Game_Heaven_killed = "Game_Heaven_killed";

    //宝箱出现
    static Game_Treasure_StartTime = "Game_Treasure_StartTime";
    static Game_Treasure_Show = "Game_Treasure_Show";

    //新手指导开启
    static Game_Novice_Open = "Game_Novice_Open";
    //新手指导关闭
    static Game_Novice_Close = "Game_Novice_Close";

    //领取新手任务成功
    static Game_NewPlayerTaskGet = "Game_NewPlayerTaskGet";
    //关闭新手任务
    static Game_CloseNewPlayerTask = "Game_CloseNewPlayerTask";
    //炮王任务更新
    static Game_KingPaoTask_Update = "Game_KingPaoTask_Update";

    //购买更新
    static Game_Buy_update = "Game_Buy_update";


    //任务更新
    static Game_Task_updata = "Game_Task_updata";
    static Game_Main_Task_updata = "Game_Main_Task_updata";

    //任务红点
    static Game_Task_redPoint = "Game_Task_redPoint";

    //道具栏更新
    static Game_PropItem_Update = `Game_PropItem_Update`;


    static Game_Tool_Use = `Game_Tool_Use`;

    static Tool_Effect_Name = {
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
    }

    //关闭护盾
    static Close_Shield = "Close_Shield"


    //图鉴展现更新
    static Game_TuJian_UpData = "Game_TuJian_UpData";

    //游戏弹窗页面
    static Game_Pop_Open = "Game_Pop_Open";

    //道具使用
    static Game_Prop_Use = "Game_Prop_Use";

    //背景音效
    static Game_Music_BGM = "sound/bgm_1";
    //点击音效
    static Game_Music_Click = "sound/btn";
    //未点击
    static clickNoAllowed = "sound/clickNoAllowed";
    //怪物音效
    static Game_Monster_Dead = "sound/monsterDead";
    //闪电音效 
    static ToolMusicShock = "sound/ToolMusicShock";
    //护盾音效
    static ToolMusicShield = "sound/ToolMusicShield";
    //清屏音效
    static ToolMusicCls = "sound/ToolMusicCls";

    //金币汇集音效
    static music_goldAdd = "sound/addGold";
    //双倍收益音效
    static Game_Earing = "sound/earning";

    static Gold_Wheel = "sound/goldWheel"
    //s
    static Gola_Wheel_Get = "sound/getGold"

    //背景音效
    // static Game_Music_Gold = "sound/bgm_1";
    // //背景音效
    // static Game_Music_BGM = "sound/bgm_1";
    // //背景音效
    // static Game_Music_BGM = "sound/bgm_1";


    //展示toast
    static Show_Toast = `Show_Toast`;

    //关闭广告加载loading
    static Close_AdLoading = `Close_AdLoading`;

    //安卓端监听事件
    static onGamePause = "onGamePause";
    static onGameResume = "onGameResume";
    static retryTokenSuccess = "retryTokenSuccess";
    static onBackPressed = "onBackPressed";
    static bindWechatSuccess = "bindWechatSuccess";   //微信授权后回调


    /**AB测试组 */
    static lock_turret_test = "lock_turret_test"; //解锁炮塔
    static heaven_coin_test = "heaven_coin_test"; //天降金币
    static new_hand_test = "new_hand_test";//新手流程


    
    //关掉load页面
    static Close_LoadPage = `Close_LoadPage`;

    //在线奖励事件
    static onPrizeGetUpdate = `onPrizeGetUpdate`;     //在线奖励更新

    //福利红包事件
    static randomRedUpdate = `randomRedUpdate`;       //福利红包更新

    //检查首页签到红点
    static red_sign_update = "red_sign_update";


    //更新金币进度
    static Game_EarnProgress_Updata = "Game_EarnProgress_Updata";

    /**看完视频后存钱罐 */
    static Game_SavingPost_AddCoin = "Game_SavingPost_Add";
    static Game_SavingPost_Icon = "Game_SavingPost_Icon";
    static Game_SavingPost_Lock = "Game_SavingPost_Lock";
}
