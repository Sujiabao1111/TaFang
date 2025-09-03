import { AssistCtr } from "../Assist/AssistCtr";
import baseTs from "../base/baseTs";
import { AdPosition } from "../common/AdPosition";
import { gamePass, gameState, propState, propType } from "../common/faceTs";
import NameTs from "../common/NameTs";
import pageTs from "../common/pageTs";
import RedController from "../controlelr/RedController";
import userData from "../data/userData";
import { GameEffect } from "../effect/GameEffect";
import { UrlConst } from "../server/UrlConst";
import AdController from "../server/xmsdk_cocos/AD/AdController";
import XMSDK from "../server/xmsdk_cocos/XMSDK";
import soundController from "../soundController";
import TrackMgr from "../TrackMgr/TrackMgr";
import util from "../util/util";

const { ccclass, property } = cc._decorator;

@ccclass
export default class game extends baseTs {


    // @property(cc.Label)
    // customsLabel: cc.Label = null; //关卡label

    @property(dragonBones.ArmatureDisplay)
    crystal: dragonBones.ArmatureDisplay = null;   //水晶

    @property(cc.Node)
    ske_hudun: cc.Node = null;   //护盾

    @property(cc.Sprite)
    image_bg: cc.Sprite = null;  //背景图

    @property(cc.SpriteFrame)
    image_bgArray: Array<cc.SpriteFrame> = [];  //背景图集

    private onceOpenGame = true;    //是否第一次开始游戏

    onLoad() {


        util.offlineTurretProduct();

        cc.game.on(NameTs.Game_End, (res) => {
            switch (res) {
                case gamePass.success:
                    this.showPass();
                    this.checkBgImage();
                    break;
                case gamePass.fail:
                    // this.showEnd();

                    this.crystal.playAnimation("paota_boom", 1);

                    this.scheduleOnce(() => {
                        this.crystal.playAnimation("paota_piaofu", -1);
                        cc.game.emit(NameTs.Game_Again);
                        util.showEmptyBox();   //送一个空降宝箱
                    }, 1);

                    TrackMgr.AppGamedate({
                        is_challenge_suc: false,
                        game_level_hcdg: "第" + util.userData.customs.big + "关",
                        level_hcdg: "第" + util.userData.customs.small + "波",
                        game_time: util.gameTime.toFixed(1) + "s",
                        use_tool: String(util.gamePropNum),
                    });
                    break;
            }
        }, this);

        cc.game.on(NameTs.Game_Start, () => {
            if (!this.onceOpenGame) {    //不是第一次开始游戏才送
                util.showEmptyBox();   //送一个空降宝箱
            }
            this.onceOpenGame = false;

            if (util.userData.customs.big == 2 && util.userData.customs.small == 2) {
                if (!util.isOkSign) {
                    this.showSign();
                }
            }

            // if (util.userData.customs.small == util.mapConfig.length) {
            //     if (!util.adPreObj[AdPosition.GamePssView]) {
            //         util.preloadAd(AdPosition.GamePssView, true);
            //     }
            // }
            // util.levelState = gameState.start;
            //更新关卡title
            cc.game.emit(NameTs.Game_View_CustomsUpdata);
            //加载关卡怪兽
            cc.game.emit(NameTs.Game_Load_Monster);
            for (let i = 0; i < util.userData.prop.length; i++) {
                if (i == propType.auto - 1) continue;
                util.userData.prop[i].time = null;
                util.userData.prop[i].use = propState.end;
                if (util.userData.prop[i].type == 3) {
                    this.closeShield();
                }
            }
            util.Opening_times_level++;
            TrackMgr.level_open({
                number_of_levels: "第" + util.userData.customs.big + "关",
                level: "第" + util.userData.customs.small + "波",
                Opening_times: util.Opening_times_level,
            });
            XMSDK.trackUserProperties({
                level_num: util.userData.customs.big + "-" + util.userData.customs.small,
            });
        }, this);


        //监听弹窗
        cc.game.on(NameTs.Game_Pop_Open, res => {
            let name = res.name ? res.name : res;
            switch (name) {
                case pageTs.pageName.GameSet:
                    this.showSet();
                    break;
                case pageTs.pageName.GameProp:
                    this.showProp();
                    break;
                case pageTs.pageName.GameSign:
                    this.showSign(res.data);
                    break;
                case pageTs.pageName.GameSignReward:
                    this.showSignReward(res.data);
                    break;
                case pageTs.pageName.GameWallet:
                    this.showWallet();
                    break;
                case pageTs.pageName.GameWalletRecord:
                    this.showWalletRecord();
                    break;
                case pageTs.pageName.GameNetworkLost:
                    this.showNetworkLost(res.data);
                    break;
                case pageTs.pageName.GameTuJian:
                    this.showTuJian();
                    break;
                case pageTs.pageName.GameEarnings:
                    this.showEarnings();
                    break;
                case pageTs.pageName.GameTask:
                    this.showTask();
                    break;
                case pageTs.pageName.GameDetention:
                    this.showDetention();
                    break;
                case pageTs.pageName.GameAdLoading:
                    this.showAdLoading();
                    break;
                case pageTs.pageName.GameUpgrade:
                    let nowTime:number = new Date().getTime();
                    let time = Math.floor((nowTime - util.userData.unlocking_time)/1000);
                    console.log(time,'time')
                    TrackMgr.turret_unlock({
                        unlock_turret_level : util.userData.turretLevel,
                        unlocking_time:time+"s",
                        synthesis_times:util.userData.synthesis_times,
                        level:"第"+util.userData.customs.big+"-"+util.userData.customs.small+"关"
            
                    });
                    util.userData.unlocking_time = nowTime;
                    util.userData.synthesis_times = 0;
                    console.log(util.userData.noviceGuide,'util.userData.noviceGuide')

                    if(util.userData.turretLevel==5){
                        //等级5级时候主动弹出
                        this.showPage(pageTs.pageName.GameGoldWheel);
                    }

                    if(util.checkTestB(NameTs.new_hand_test)&&util.userData.noviceGuide==3){
                        cc.game.emit(NameTs.Game_Novice_Open,4);
                        util.sendTurretData();
                    }else{
                        if(util.checkTestB(NameTs.lock_turret_test)&&(util.userData.turretLevel>2&&util.userData.turretLevel<8)){
                            console.log("B用户3-7级，不触发弹窗")
                            util.sendTurretData();
                        }else{
                            this.showUpgrade();
                        }
                    }
                    break;
                case pageTs.pageName.GameToolGet:
                    this.showToolGet(res.data);
                    break;
                case pageTs.pageName.GameOnLinePrize:
                    this.showOnLinePrize(res.data);
                    break;
                case pageTs.pageName.GameNewPlayerTask:
                    this.showNewPlayerTask();
                    break;
                case pageTs.pageName.GameKingPao:
                    this.showKingPao();
                    break;
                case pageTs.pageName.GameKingPaoProgress:
                    this.showKingPaoProgress(res.data);
                    break;
                case pageTs.pageName.GameOnPrizeGetReward:
                    this.showOnPrizeGetRewared(res.data);
                    break;
                case pageTs.pageName.GameRandomRedPrize:
                    this.showRandomRedPrize(res.data);
                    break;
                case pageTs.pageName.GameTurretRandomRed:
                    this.showTurretRandomRed();
                    break;
            }

        }, this);

        // XMSDK.post({
        //     url: UrlConst.sign_main,
        //     onSuccess: res => {
        //         cc.error("请求成功", res)
        //         if (res.code === 0 && res.data) {

        //         }
        //         else {

        //         }
        //     },
        //     onFail: err => {

        //     }
        // }
        // )        

        // this.showPage(pageTs.pageName.GameOffline);

        // cc.game.emit(NameTs.Game_Pop_Open, {
        //     name: pageTs.pageName.GameOnLinePrize,
        //     data: {
        //         point: 300
        //     }
        // });


        cc.game.on(NameTs.Game_Tool_Use, (type) => {
            if (type == propType.cls) {                         //清屏        
                soundController.singleton.playMusic(NameTs.ToolMusicCls);
                GameEffect.playToolCls();
            } else if (type == propType.auto) {                  //自动合成

            }
            else if (type == propType.shock) {                  //电击
                soundController.singleton.playMusic(NameTs.ToolMusicShock);
                GameEffect.playToolShock();
            }
            else if (type == propType.shield) {                 //护盾
                soundController.singleton.playMusic(NameTs.ToolMusicShield);
                this.openShield();
            }
            else if (type == propType.frozen) {                 //冰冻
            GameEffect.playToolFrozen();
            }
        }, this);

        cc.game.on(NameTs.Close_Shield, () => {

            this.closeShield();

        }, this);

        console.log(util.userData.noviceGuide, 'util.userData.noviceGuide')
        if (util.userData.noviceGuide !== -1 && util.userData.turretLevel < 2) {
            util.userData.noviceGuide = 1;
            if(util.checkTestB(NameTs.new_hand_test)){
                this.showPage(pageTs.pageName.GameGuide);
            }else{
                this.showPage(pageTs.pageName.GameGuide2);
            }
            util.sendTurretData();
 //fix bug

            XMSDK.getdataStr({
                url: UrlConst.sign_main,
                onSuccess: res => {
                    if (res.code === 0 && res.data) {
                        if (res && res.data) {
                            util.isOkSign = res.data.todayChecked;
                        }
                    }
                },
                onFail: err => {

                }
            }
            )
        } else {
            if (util.userData.newUser) {
                if (util.userData.offlineIncome&&util.userData.offlineIncome.reward>0) {
                    this.showPage(pageTs.pageName.GameOffline);
                } else {
                    // this.showPage(pageTs.pageName.GameStart);
                    this.FistGameStart(1);
                }
				 //fix bug
				 
                XMSDK.getdataStr({
                    url: UrlConst.sign_main,
                    onSuccess: res => {
                        if (res.code === 0 && res.data) {
                            if (res && res.data) {
                                util.isOkSign = res.data.todayChecked;

                            }
                        }
                    },
                    onFail: err => {

                    }
                }
                )
            }
            else {
				 //fix bug
				 
                XMSDK.getdataStr({
                    url: UrlConst.sign_main,
                    onSuccess: res => {
                        if (res.code === 0 && res.data) {
                            console.log(res.data, 'res.data')
                            if (res.data && !res.data.todayChecked) {
                                res.data[`callBack`] = () => {
                                    // this.showPage(pageTs.pageName.GameStart);
                                    this.FistGameStart(2);
                                }
                                this.showPage(pageTs.pageName.GameSign, res.data);
                            }
                            else {
                                if (util.userData.offlineIncome&&util.userData.offlineIncome.reward>0) {
                                    this.showPage(pageTs.pageName.GameOffline);
                                }
                                else {
                                    res.data[`callBack`] = () => {
                                        // this.showPage(pageTs.pageName.GameStart);
                                        this.FistGameStart(3);
                                    }
                                    this.showPage(pageTs.pageName.GameSign, res.data);
                                }
                            }

                            if (res && res.data) {
                                util.isOkSign = res.data.todayChecked;

                                //预加载离线
                                // if (!util.adPreObj[AdPosition.Offline]) {
                                //     util.preloadAd(AdPosition.Offline);
                                // }
                                // if (!util.adPreObj[AdPosition.OfflineView]) {
                                //     util.preloadAd(AdPosition.OfflineView, true);
                                // }

                            }
                        }
                        else {
                            // this.showPage(pageTs.pageName.GameStart);
                            this.FistGameStart(4);
                        }
                    },
                    onFail: err => {

                    }
                }
                )
            }
        }
        this.openOnlineTime();
        this.openOnLinePrizeTimer();
        this.checkBgImage();       

        cc.game.on(cc.game.EVENT_HIDE, () => {
            console.log("cocos游戏进入后台时触发的事件。")
            //退出时间
            util.setStorage(util.localDiary.offlineTime,new Date().getTime());
            XMSDK.trackUserProperties({
                synthesis_times_hcdg: util.userData.synthesis_All,
            });
            util.userData.synthesis_All = 0;             

            util.setStorage(util.localDiary.onlineTime, util.onlineTimeNum);
            util.setStorage(util.localDiary.randomRedTimeNum, util.randomRedTimeNum);
        }, this);

        cc.game.on(cc.game.EVENT_SHOW, () => {
            console.log("cocos游戏进入前台运行时触发的事件。")            
            util.offlineTurretProduct();      
        }, this);


        TrackMgr.AppViewScreen({
            app_page_title: "首页"
        });

        if (!util.userData.unlocking_time) {
            util.userData.unlocking_time = new Date().getTime();
            util.setStorage(util.localDiary.unlocking_time, util.userData.unlocking_time)
        }      
    }
            
    openOnlineTime(){
        if(!util.chekcToday()){            
            util.setStorage(util.localDiary.onlineTime, 0);            
        }
        let onTime = util.getStorage(util.localDiary.onlineTime)
        if(onTime == null){            
            util.setStorage(util.localDiary.onlineTime, 0);
        } 

        util.onlineTimeNum = onTime;
        this.schedule(()=>{
            util.onlineTimeNum++;             
            RedController.checkMainSignRed();
        }, 1)
    }

    checkBgImage() {
        //替换背景图片
        let bgImageData = AssistCtr.checkLvBg(util.userData.customs.big);
        let bgIndex = bgImageData.mapId - 1;

        if(this.image_bg && this.image_bgArray){
            if (this.image_bgArray[bgIndex]) {
                this.image_bg.spriteFrame = this.image_bgArray[bgIndex];
            }
            else {
                this.image_bg.spriteFrame = this.image_bgArray[0];
            }
        }
        // let tempColor = new cc.Color();
        // this.customsLabel.node.color = tempColor.fromHEX(bgImageData.color);
    }


    start() {
        cc.game.emit(NameTs.Close_LoadPage)
    }

    private onLinePrizeTimer;           //在线奖励倒计时器
    private onLinePrizeTimeNum = 0;     //在线奖励倒计时时间
    /**
     * 打开在线奖励
     */
    openOnLinePrizeTimer() {
        if (!this.onLinePrizeTimer) {
            this.onLinePrizeTimer = setInterval(() => {
                if (util.levelState != gameState.stop) {
                    this.onLinePrizeTimeNum++;
                    if (this.onLinePrizeTimeNum > util.online_time) {        //在线打怪半个小时后自动弹窗在线奖励弹窗
                        this.closeOnLinePrizeTimer();
                         //fix bug
						 
						XMSDK.getdataStr({
                            url: UrlConst.getOnLinePrize,
                            onSuccess: res => {
                                if (res.code == 0 && res.data) {
                                    let data = res.data;
                                    if (data.point) {
                                        cc.game.emit(NameTs.Game_Pop_Open, {
                                            name: pageTs.pageName.GameOnLinePrize,
                                            data: {
                                                point: data.point
                                            }
                                        });
                                        this.onLinePrizeTimeNum = 0;
                                    }
                                    else if (Math.floor(Number(data.leftTime) / 1000) < util.online_time) {
                                        this.onLinePrizeTimeNum = Math.floor(Number(data.leftTime) / 1000);
                                    }
                                    this.openOnLinePrizeTimer();
                                }
                                else {
                                    AssistCtr.showToastTip(res.message);
                                }
                            },
                            onFail: err => {

                            }
                        })
                    }
                }
            }, 1000)
        }
    }

    /**
     * 关闭在线奖励
     */
    closeOnLinePrizeTimer() {
        if (this.onLinePrizeTimer != null) {
            clearInterval(this.onLinePrizeTimer);
            this.onLinePrizeTimer = null;
        }
    }


    /**
     * 开启护盾
     */
    openShield() {
        this.ske_hudun.getComponent(dragonBones.ArmatureDisplay).playAnimation("hudun", 1)
        this.ske_hudun.active = true;
    }

    /**
     * 关闭护盾
     */
    closeShield() {
        this.ske_hudun.active = false;
    }


    /**
     * 结束游戏
     */
    showEnd() {
        TrackMgr.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: "通关失败"
        })

        this.showPage(pageTs.pageName.GameEnd);

    }

    /**
     * 通关成功
     */

    showPass() {
        TrackMgr.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: "通关成功"
        })


        util.Opening_times_level = 0;
        // this.showPage(pageTs.pageName.GamePass);
        this.showPage(pageTs.pageName.GamePassReward2);

        // XMSDK.post({
        //     url: UrlConst.gameLevelCompleted,
        //     data:{
        //         // level:
        //     },
        //     onSuccess: res => {
        //         console.log("请求成功gameLevelIndex", res)
        //         if (res.code === 0 && res.data) {

        //         }
        //         else {

        //         }
        //     },
        //     onFail: err => {

        //     }
        // });

    }

    /**
     * 设置
     */

    showSet() {

        this.showPage(pageTs.pageName.GameSet);

    }

    /**
     * 道具
     */

    showProp() {

        this.showPage(pageTs.pageName.GameProp);

    }


    /**
     * 签到
     */
    showSign(data = null) {
		 //fix bug
		 
        XMSDK.getdataStr({
            url: UrlConst.sign_main,
            onSuccess: res => {
                if (res.code === 0 && res.data) {
                    this.showPage(pageTs.pageName.GameSign, res.data);
                }
                else {

                }
            },
            onFail: err => {

            }
        }
        )
    }

    /**     
     * 签到奖励
     */
    showSignReward(data = null) {
        this.showPage(pageTs.pageName.GameSignReward, data);
    }



    /**
    * 提现
     */
    showWallet() {
        util.sendTurretData(() => {
             //fix bug
			 
			XMSDK.getdataStr({
                url: UrlConst.wallet_main2,
                onSuccess: res => {
                    if (res.code === 0 && res.data) {
                        this.showPage(pageTs.pageName.GameWallet, res.data);
                    }
                    else {

                    }
                },
                onFail: err => {

                }
            }
            )
        });

    }

    /**
     * 提现记录页
     */
    showWalletRecord() {
        this.showPage(pageTs.pageName.GameWalletRecord);
    }

    /**
     * 请求失败框
     */
    showNetworkLost(data) {
        this.showPage(pageTs.pageName.GameNetworkLost, data);
    }

    /**
     * 图鉴
     */
    showTuJian() {
        this.showPage(pageTs.pageName.GameTuJian);
    }
    /**
     * 收益翻倍
     */
    showEarnings() {
        this.showPage(pageTs.pageName.GameEarnings);
    }

    /**
     * 任务
     */
    showTask() {

        util.getdataStr({
            url: UrlConst.task_day_main,
            success: (res) => {
                this.showPage(pageTs.pageName.GameTask,res);     
            }
        });
    }


    /**
     * 挽留
     */
    showDetention() {
        this.showPage(pageTs.pageName.GameDetention);
    }

    /**
     * 视频加载loading
     */
    showAdLoading() {
        this.showPage(pageTs.pageName.GameAdLoading);
    }
    /**
     * 升级
     */
    showUpgrade() {
        this.showPage(pageTs.pageName.GameUpgrade);
    }

    /**
     * 道具获取弹窗
     */
    showToolGet(data) {
        this.showPage(pageTs.pageName.GameToolGet, data);
    }

    /**
    * 开启在线奖励倒计时
    */
    showOnLinePrize(data) {
        this.showPage(pageTs.pageName.GameOnLinePrize, data);
    }

    /**
     * 开启新手任务
     */
    showNewPlayerTask() {
       //fix bug
	    XMSDK.getdataStr({
            url: UrlConst.newPlayerTaskData,
            onSuccess: res => {
				console.log("99999999999999999### showNewPlayerTask ： "+res.data )
                if (res.code === 0 && res.data) {
                    this.showPage(pageTs.pageName.GameNewPlayerTask, res.data);
                }
                else {

                }
            },
            onFail: err => {

            }
        }
        )
		
		
		
    }

    /**
     * 炮王任务
     */
    showKingPao() {
		 //fix bug
		 
        XMSDK.getdataStr({
            url: UrlConst.kingPaoTaskData,
            onSuccess: res => {
                if (res.code === 0 && res.data) {
                    this.showPage(pageTs.pageName.GameKingPao, res.data);
                }
                else {
                    if (res) {
                        AssistCtr.showToastTip(res.message);
                    }
                }
            },
            onFail: err => {

            }
        })
    }

    /**
     * 炮王任务进度
     */
    showKingPaoProgress(clickData) {
        if (clickData) {
            TrackMgr.artillery_bonus({
                activity_state: `点击「炮王进度」任务`,
                button_hcdg: `加10%按钮`,
                task_progress: `${clickData.progress}`,
                Page_source: clickData.clickTarget ? "图鉴" : "百万分红"
            })
        }
		
		 //fix bug
		
        XMSDK.getdataStr({
            url: UrlConst.kingPaoProgress,
            onSuccess: res => {
                if (res.code === 0) {
                    if (res.data && res.data.status == 1 && res.data.sign) {
                        AssistCtr.showToastTip(`今日打卡成功!明日再来哦~`);
                    }
                    else if (res.data && res.data.status == 2 && util.isOkSign) {
                        AssistCtr.showToastTip(`今日已签到!明日再来哦~`);
                    }
                    else {
                        this.showPage(pageTs.pageName.GameKingPaoProgress, res.data);
                    }
                }
                else {
                    if (res) {
                        AssistCtr.showToastTip(res.message);
                    }
                }
            },
            onFail: err => {

            }
        })
    }

    /**
     * 签到处在线奖励红包
     */
    showOnPrizeGetRewared(data) {
        if (data && data.prizeRedData) {
            this.showPage(pageTs.pageName.GameOnPrizeGetReward, data.prizeRedData);
        }
    }

    /**
     * 打开随机红包
     */
    showRandomRedPrize(data) {
        this.showPage(pageTs.pageName.GameRandomRedPrize,data);
    }

    /**
     * 打开合成炮塔随机红包
     */
    showTurretRandomRed(){
        this.showPage(pageTs.pageName.GameTurretRandomRed);
    }


    /**
     * 第一次开始游戏
     */

    FistGameStart(e){
        this.scheduleOnce(()=>{
            cc.game.emit(NameTs.Game_Start);
        },.3);
    }
}
