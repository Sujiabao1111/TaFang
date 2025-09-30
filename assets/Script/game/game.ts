import { AssistCtr } from "../Assist/AssistCtr";
import baseTs from "../base/baseTs";
import { gamePass, gameState, propState, propType } from "../common/faceTs";
import NameTs from "../common/NameTs";
import pageTs from "../common/pageTs";
import RedController from "../controlelr/RedController";
import UserData from "../data/userData";
import { GameEffect } from "../effect/GameEffect";
import { setLanguage } from "../Language/LanguageData";
import { UrlConst } from "../server/UrlConst";
import XMSDK from "../server/xmsdk_cocos/XMSDK";
import soundController from "../soundController";
import { AdManager } from "../tg/AdManager";
import { ApiService } from "../tg/ApiService";
import { Global } from "../tg/Global";
import { Tools } from "../util/Tools";
import util from "../util/util";

const { ccclass, property } = cc._decorator;

@ccclass
export default class game extends baseTs {

    @property(dragonBones.ArmatureDisplay)
    private crystal: dragonBones.ArmatureDisplay = null;   //水晶

    @property(cc.Node)
    private ske_hudun: cc.Node = null;   //护盾

    @property(cc.Node)
    private bgNode: cc.Node = null;  // 背景

    private onceOpenGame = true;    //是否第一次开始游戏

    public get _userData(): UserData {
        return util.userData;
    }


    onLoad() {
        util.offlineTurretProduct();
        AdManager.initTgAd();


        // 设置语言
        let languageType = Tools.getStorage("LanguageType");
        let index = languageType == undefined || languageType == null ? 1 : languageType;
        setLanguage(Number(index));

        soundController.singleton.initIsPlayMusic();
        soundController.singleton.playBGM();

        this.checkBgImage();

        cc.game.on(NameTs.Game_End, (res) => {
            switch (res) {
                case gamePass.success:
                    console.log("==========大关结束===========");
                    util.Opening_times_level = 0;
                    this.showPage(pageTs.pageName.GamePassReward);
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
                    break;
                case gamePass.smallSuccess:
                    console.log("==========小关结束===========");
                    this.showPage(pageTs.pageName.GamePassReward);
                    break;
            }
        }, this);

        cc.game.on(NameTs.Game_Start, () => {
            if (!this.onceOpenGame) {    //不是第一次开始游戏才送
                console.log("送一个空降宝箱Game_Start");

                util.showEmptyBox();   //送一个空降宝箱
            }

            this.onceOpenGame = false;

            if (this._userData.customs.big == 2 && this._userData.customs.small == 2) {
                if (!util.isOkSign) {
                    this.showSign();
                }
            }

            // util.levelState = gameState.start;

            // 更新关卡title
            cc.game.emit(NameTs.Game_View_CustomsUpdata);

            //加载关卡怪兽
            cc.game.emit(NameTs.Game_Load_Monster);

            // 道具
            for (let i = 0; i < this._userData.prop.length; i++) {
                if (i == propType.auto - 1) continue;
                this._userData.prop[i].time = null;
                this._userData.prop[i].use = propState.end;
                if (this._userData.prop[i].type == 3) {
                    this.closeShield();
                }
            }

            util.Opening_times_level++;

            // XMSDK.trackUserProperties({
            //     level_num: this._userData.customs.big + "-" + this._userData.customs.small,
            // });

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

                case pageTs.pageName.GameTask:
                    this.showTask();
                    break;


                case pageTs.pageName.GameAdLoading:
                    this.showAdLoading();
                    break;
                case pageTs.pageName.GameUpgrade:
                    let nowTime: number = new Date().getTime();
                    let time = Math.floor((nowTime - this._userData.unlocking_time) / 1000);
                    console.log(time, 'time')
                    this._userData.unlocking_time = nowTime;
                    this._userData.synthesis_times = 0;

                    if (this._userData.turretLevel == 5) {
                        // 等级5级时候主动弹出
                        this.showPage(pageTs.pageName.GameGoldWheel);
                    }

                    if (this._userData.noviceGuide == 3) {
                        cc.game.emit(NameTs.Game_Novice_Open, 4);
                    } else {
                        if (this._userData.turretLevel > 2 && this._userData.turretLevel < 8) {
                            console.log("B用户3-7级，不触发弹窗")
                        } else {
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

        // 关闭护盾
        cc.game.on(NameTs.Close_Shield, () => {
            this.closeShield();
        }, this);

        console.log("新手引导是否过了:", Global.ins.userData.pass_guide_stage)
        let userData = Global.ins.userData;
        if (!userData.pass_guide_stage && this._userData.turretLevel < 2 && userData.stage == 0) {
            this._userData.noviceGuide = 1;
            Global.ins.userData.pass_guide_stage = 1;
            this.showPage(pageTs.pageName.GameGuide);
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
            if (this._userData.newUser) {
                if (this._userData.offlineIncome && this._userData.offlineIncome.reward > 0) {
                } else {
                    // this.showPage(pageTs.pageName.GameStart);
                    this.FistGameStart(1);
                }

            }
            else {

            }
        }
        this.openOnlineTime();
        // this.openOnLinePrizeTimer();


        cc.game.on(cc.game.EVENT_HIDE, () => {
            console.log("cocos游戏进入后台时触发的事件。")
            //退出时间
            util.setStorage(util.localDiary.offlineTime, new Date().getTime());
            XMSDK.trackUserProperties({
                synthesis_times_hcdg: this._userData.synthesis_All,
            });
            this._userData.synthesis_All = 0;

            util.setStorage(util.localDiary.onlineTime, util.onlineTimeNum);
            util.setStorage(util.localDiary.randomRedTimeNum, util.randomRedTimeNum);
            util.setStorage(util.localDiary.autoPropTime, util.autoPropTimeNum);
        }, this);

        cc.game.on(cc.game.EVENT_SHOW, () => {
            console.log("cocos游戏进入前台运行时触发的事件。")
            util.offlineTurretProduct();
        }, this);


        if (!this._userData.unlocking_time) {
            this._userData.unlocking_time = new Date().getTime();
            util.setStorage(util.localDiary.unlocking_time, this._userData.unlocking_time)
        }
    }

    openOnlineTime() {
        if (!util.chekcToday()) {
            util.setStorage(util.localDiary.onlineTime, 0);
        }
        let onTime = util.getStorage(util.localDiary.onlineTime)
        if (onTime == null) {
            util.setStorage(util.localDiary.onlineTime, 0);
        }

        util.onlineTimeNum = onTime;
        this.schedule(() => {
            util.onlineTimeNum++;
            RedController.checkMainSignRed();
        }, 1)
    }

    /**
    * 替换背景图片
    */
    checkBgImage() {
        let bgImageData = AssistCtr.checkLvBg(this._userData.customs.big);
        let bgIndex = bgImageData.mapId - 1;
        bgIndex = bgIndex < 0 || bgIndex > 2 ? 0 : bgIndex;
        for (let i = 0; i < this.bgNode.children.length; i++) {
            this.bgNode.children[i].active = bgIndex == i;
        }
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
        this.showPage(pageTs.pageName.GameEnd);
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
    * 提现
     */
    showWallet() {
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
     * 任务
     */
    async showTask() {
        // util.getdataStr({
        //     url: UrlConst.task_day_main,
        //     success: (res) => {
        //         this.showPage(pageTs.pageName.GameTask, res);
        //     }
        // });

        let res = await ApiService.ins.getTask();
        if (res.response?.success) {
            this.showPage(pageTs.pageName.GameTask, res.response.data);
        }
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
    async showNewPlayerTask() {
        let res = await ApiService.ins.getNewbenefits();
        if (res.response.success) {
            this.showPage(pageTs.pageName.GameNewPlayerTask, res.response.data);
        }
    }

    /**
     * 炮王任务
     */
    async showKingPao() {
        let res = await ApiService.ins.getCheckInInfo();
        if (res.response.success) {
            this.showPage(pageTs.pageName.GameKingPao, res.response.data);
        }
    }

    /**
     * 炮王任务进度
     */
    showKingPaoProgress(clickData) {
        if (clickData) {

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
        this.showPage(pageTs.pageName.GameRandomRedPrize, data);
    }

    /**
     * 打开合成炮塔随机红包
     */
    showTurretRandomRed() {
        this.showPage(pageTs.pageName.GameTurretRandomRed);
    }


    /**
     * 第一次开始游戏
     */

    FistGameStart(e) {
        this.scheduleOnce(() => {
            cc.game.emit(NameTs.Game_Start);
        }, .3);
    }
}
