import { AssistCtr } from "../Assist/AssistCtr";
import baseTs from "../base/baseTs";
import NameTs from "../common/NameTs";
import pageTs from "../common/pageTs";
import { UrlConst } from "../server/UrlConst";
import soundController from "../soundController";
import TrackMgr from "../TrackMgr/TrackMgr";
import util from "../util/util";

const { ccclass, property } = cc._decorator;

@ccclass
export default class earnProgress extends baseTs {


    @property(cc.ProgressBar)
    private taskProgress: cc.ProgressBar = null; //任务进度条

    @property(cc.Label)
    private tasklabel1: cc.Label = null; // 当前击杀数

    @property(cc.Label)
    private tasklabel2: cc.Label = null; // 需要击杀数

    @property(cc.Label)
    private getTime: cc.Label = null; //可以领多少次


    @property(cc.Node)
    private hand: cc.Node = null; //手势

    private coin: number = 500; //默认500

    private initData: any = null;

    private isRuning: boolean = false; //是否在动
    private isHand: boolean = false; //是否在动

    private nowGear: number = null;//默认进度3000
    private handNum: number = 3;//默认次数
    private userCoin: number = null;
    private curKillsNum: number = 0;
    private nextGearNum: number = 100;



    onLoad() {

        // cc.game.on(NameTs.Game_Task_Progress, ()=>{
        //     this.setState();
        // });

        this.handNum = util.getStorage(util.localDiary.earnProgress)
        if (this.handNum == null) {
            this.handNum = 3;
            util.setStorage(util.localDiary.earnProgress, 3);
        }


        this.init();


        // 监听击杀进度
        cc.game.on(NameTs.Game_Kills_Updata, () => {
            if (!this.initData) return;
            this.tasklabel1.string = (this.curKillsNum += 1) + "";

            this.taskProgress.progress = this.curKillsNum / this.nextGearNum;


            // this.initData.canReceiveTimes -= 1;
            // this.setState(this.initData);
            // this.checkFill();
            // if (this.handNum > 0) {
            //     this.handNum -= 1;
            //     // this.hand.active = true;
            //     util.setStorage(util.localDiary.earnProgress, this.handNum);
            // } else {
            //     this.hand.active = false;
            // }
        }, this);


        // //监听金币进度
        // cc.game.on(NameTs.Game_EarnProgress_Updata, () => {

        //     if (!this.initData) return;
        //     this.initData.canReceiveTimes -= 1;
        //     this.setState(this.initData);
        //     this.checkFill();
        //     if (this.handNum > 0) {
        //         this.handNum -= 1;
        //         // this.hand.active = true;
        //         util.setStorage(util.localDiary.earnProgress, this.handNum);
        //     } else {
        //         this.hand.active = false;
        //     }
        // }, this);


        // //监听金币进度
        // cc.game.on(NameTs.Game_Wallet_AddCoin, (res) => {
        //     if (!this.initData) return;
        //     if (res > 0) {
        //         this.userCoin += res;
        //         this.setState(this.initData);
        //         this.checkFill();
        //     }

        // }, this);



    }

    /**
     * 检查是否满了
     */
    checkFill() {
        if (this.userCoin >= this.initData.nextGear) {
            console.log("进度已满，重新请求")
            util.sendCoinData(() => {
                this.init();
            });


        }
    }

    init() {
        util.getdataStr({
            url: UrlConst.earnProgressIndex,
            success: data => {
                this.setState(data);
            },
            fail: (err) => {
                console.log("请求失败，暂时将这个关闭掉");
                this.node.active = false;
            }
        });

    }

    /**
     * 展现任务
     */
    showGameEarn() {

        if (this.initData.canReceiveTimes <= 0) {
            AssistCtr.showToastTip("再赚取" + (this.initData.nextGear - this.userCoin) + "红包");
            return;
        }

        soundController.singleton.clickAudio();
        this.showPage(pageTs.pageName.GameEarnPro, { coin: this.coin });
        this.isHand = false;
        this.hand.active = false;
        this.isRuning = false;
    }

    /**设置状态 */

    setState(data) {
        this.initData = data;
        if (!this.initData || (this.initData && !this.initData.reward)) {
            console.log("初始化数据不存在！隐藏该功能!");
            this.node.active = false;
            return;
        }
        this.coin = this.initData.reward;
        if (this.nowGear) {
            if (this.nowGear !== this.initData.nextGear) {
                this.nowGear = this.initData.nextGear;
            }
        } else {
            this.nowGear = this.initData.nextGear;
        }

        if (!this.userCoin) {
            this.userCoin = this.initData.point;
        }


        this.tasklabel1.string = this.curKillsNum + "";
        this.tasklabel2.string = "/" + this.nextGearNum;

        this.taskProgress.progress = this.curKillsNum / this.nextGearNum;


        this.initData.canReceiveTimes = 0
        this.getTime.string = this.initData.canReceiveTimes;

        this.getTime.node.parent.active = this.initData.canReceiveTimes > 0;

        this.getTime.node.parent.active = false;

        if (this.initData.canReceiveTimes > 0) {
            this.playAni();
        } else {
            this.isRuning = false;
        }

        // this.checkHand();


        // this.hand.active = this.handNum > 0 && this.initData.canReceiveTimes > 0;




    }

    private playAni() {
        if (this.isRuning) return;
        this.isRuning = true;

    }

}
