import baseTs from "../base/baseTs";
import { AdPosition } from "../common/AdPosition";
import NameTs from "../common/NameTs";
import pageTs from "../common/pageTs";
import { UrlConst } from "../server/UrlConst";
import AdController from "../server/xmsdk_cocos/AD/AdController";
import XMSDK from "../server/xmsdk_cocos/XMSDK";
import soundController from "../soundController";
import TrackMgr from "../TrackMgr/TrackMgr";
import tool from "../util/tool";
import util from "../util/util";

export interface signRewardData {
    keyId: number	            //type 为 [1-道具] 时表示 [PropsId], 为 [2-点值] 时表示 [PointType]
    rewardPlusValue: number	    //高级奖励数量
    rewardValue: number	        //普通奖励数量
    type: number	            //类型: 1-道具, 2-点值
}

export interface signItemData {
    rewardList: Array<signRewardData>    //奖励
    state: number                        //状态: 1-普通奖励, 2-高级奖励
}


export interface signData {
    list: Array<signItemData>   //每日签到奖励列表
    signDays: number	        //签到天数
    todayChecked: boolean,	    //今日已签到
    userPeriod: number,	        //用户期数
}


const { ccclass, property } = cc._decorator;
@ccclass
export default class gameSign extends baseTs {

    @property({ type: cc.Node, tooltip: "" })
    layoutSignItem: cc.Node = null;

    @property(cc.Node)
    btnsNode: cc.Node = null;

    @property(cc.Node)
    btn_close: cc.Node = null;

    @property(cc.Toggle)
    check_toggle: cc.Toggle = null;

    @property(cc.Label)
    label_check: cc.Label = null;

    @property(cc.Node)
    feed_node: cc.Node = null;

    data: signData = null;
    currentDay: number = null;

    private isInsert:boolean = false;

    onEnable() {
       
        TrackMgr.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: `签到弹窗`,
        })        
       
    }

    init(data){
	
        if(data){
            this.setData(data)
        }

        this.isInsert = Math.random()>.5;

        if(this.isInsert){
            if(!util.adPreObj[AdPosition.SignAwardInsert]){
                util.preloadAd(AdPosition.SignAwardInsert);
            }
        }
        if(!util.adPreObj[AdPosition.VideoSignDouble]){
            util.preloadAd(AdPosition.VideoSignDouble);
        }

        // tool.changeUnit(100000,1);

        if(!util.adPreObj[AdPosition.InfoSignRewardView]){
            util.preloadAd(AdPosition.InfoSignRewardView,true);
        }

    }
    
    


    onDisable() {        
        // AdController.hideInfoAd(AdPosition.InfoSignView);           
        
        // if(!util.adPreObj[AdPosition.InfoSignView]){
        //     util.preloadAd(AdPosition.InfoSignView,true)
        // }        
    }

    isTodaySignOk() {
        return this.btnsNode.getChildByName(`btn_has`).active == true;
    }

    setData(data: signData) {
        this.data = data;
		//console.log("#######################setData : " + JSON.stringify(data))
        this.currentDay = this.data.todayChecked ? this.data.signDays - 1 : this.data.signDays

        for (let m in this.data.list) {                         //签到item内容更新
            let item = this.data.list[m]
            let sign_list = this.layoutSignItem.children;
            if (item && sign_list[m]) {
                let script = sign_list[m].getComponent("SignModel")
                if (this.currentDay == parseInt(m)) {
                    if (this.data.list[m].rewardList && this.data.list[m].rewardList[0]) {
                        this.label_check.string = "观看视频额外领取一份";
                    }
                    if (item.rewardList[0]) {
                        //this.lable_otherNum.string = item.rewardList[0].rewardPlusValue - item.rewardList[0].rewardValue + "";
                    }
                }
                let hasGain = Number(m) < this.data.signDays
                script && script.init({
                    day: Number(m) + 1,
                    rewardList: item.rewardList,
                    isCurrent: this.currentDay == parseInt(m),
                    hasGain: hasGain,
                    showDouble: hasGain ? item.state == 2 : this.check_toggle.isChecked,
                    userPeriod: this.data.userPeriod,
                })
            }
        }

        let delay = 0;
        if (!this.data.todayChecked) {
            delay = 2
        }
        this.scheduleOnce(() => {
            this.btn_close.active = true
        }, delay)

        this.setBtnsVis();
    }

    setBtnsVis() {
        let showBtnName = "";
        if (this.data.todayChecked) {      //是否已经签到
            showBtnName = `btn_has`
        }
        // else if (this.data.todayChecked && (this.data.list[this.currentDay] && this.data.list[this.currentDay].state == 1)) {     //是否再领一次
        //     showBtnName = `btn_againGet`;
        // }
        else if (!this.data.todayChecked && !this.check_toggle.isChecked) {           //是否普通签到
            showBtnName = `btn_single`;

            TrackMgr.AppBuyProductDialog_hcdg({
                dialog_name_hcdg:"单倍签到弹窗"            
            })  
        }
        else if (!this.data.todayChecked && this.check_toggle.isChecked) {            //是否视频签到
            showBtnName = `btn_double`

            TrackMgr.AppBuyProductDialog_hcdg({
                dialog_name_hcdg:"双倍签到弹窗"
            })
        }

        let btns = this.btnsNode.children;
        for (let i = 0; i < btns.length; i++) {
            btns[i].active = false;
        }
        if (this.btnsNode.getChildByName(showBtnName)) {
            this.btnsNode.getChildByName(showBtnName).active = true;
            //预加载离线
            // if(!util.adPreObj[AdPosition.Offline]){
            //     util.preloadAd(AdPosition.Offline);
            // }
            // if(!util.adPreObj[AdPosition.OfflineView]){
            //     util.preloadAd(AdPosition.OfflineView,true);
            // }
        }
    }

    clickSingle() {
        TrackMgr.AppDialogClick_hcdg({            
            dialog_name_hcdg: `签到弹窗`,
            ck_module: "普通领取"
        })
        this.closePage();
        this.openSignReward(1);

        
        
    }

    clickDouble() {
        TrackMgr.AppDialogClick_hcdg({            
            dialog_name_hcdg: `签到弹窗`,
            ck_module: "双倍领取",
            active_ad_hcdg:"激励视频"
        })

        // XMSDK.post({
        //     url: UrlConst.sign_videoGet,
        //     onSuccess: res => {
        //         if (res.code === 0) {
        //             TrackMgr.Signin_new({
        //                 get_state: true,
        //                 get_type: "双倍领取",                                                
        //                 get_days: `第${this.data.signDays + 1}天`,                        
        //             })

        // AdController.loadAd(AdPosition.VideoSignDouble, (res) => {
        //     util.preloadAd(AdPosition.VideoSignDouble);      
        //     this.openSignReward(2);    
        //     this.closePage();
        // })

        this.openSignReward(2);    
        this.closePage();
        //         }
        //         else {
        //             TrackMgr.Signin_new({
        //                 get_state: false,
        //                 get_type: "双倍领取",                                                
        //                 get_days: `第${this.data.signDays + 1}天`,                        
        //             })
        //         }
        //     },
        //     onFail: err => {

        //     }
        // }
        // )
    }

    clickAgainGet() {
        // TrackMgr.AppDialogClick_hcdg({
        //     dialog_page: "游戏中",
        //     dialog_name_hcdg: `签到弹窗`,
        //     ck_module: "额外领取"
        // })

        // AdController.loadAd(AdPosition.VideoAgainGet, (res) => {
        //     XMSDK.post({
        //         url: UrlConst.sign_extraGet,
        //         onSuccess: res => {
        //             if (res.code === 0) {
        //                 this.closePage();

        //                 // TrackMgr.Signin_new({
        //                 //     get_state: true,
        //                 //     get_type: "额外领取",
        //                 //     activity_state: "点击额外领取",
        //                 //     get_coin_num: this.data.list[this.currentDay].rewardList[0].rewardPlusValue - this.data.list[this.currentDay].rewardList[0].rewardValue,
        //                 //     get_days: `第${this.data.signDays + 1}天`,
        //                 //     rounds: this.data.userPeriod + 1
        //                 // })

        //                 this.openSignReward(3);

        //                 // TrackMgr.Signin_new({
        //                 //     get_state: true,
        //                 //     get_type: "额外领取",
        //                 //     activity_state: "领取成功",
        //                 //     get_coin_num: this.data.list[this.currentDay].rewardList[0].rewardPlusValue - this.data.list[this.currentDay].rewardList[0].rewardValue,
        //                 //     get_days: `第${this.data.signDays + 1}天`,
        //                 //     rounds: this.data.userPeriod + 1
        //                 // })
        //             }
        //             else {
        //                 // TrackMgr.Signin_new({
        //                 //     get_state: false,
        //                 //     get_type: "额外领取",
        //                 //     activity_state: "点击额外领取",
        //                 //     get_coin_num: this.data.list[this.currentDay].rewardList[0].rewardPlusValue - this.data.list[this.currentDay].rewardList[0].rewardValue,
        //                 //     get_days: `第${this.data.signDays + 1}天`,
        //                 //     rounds: this.data.userPeriod + 1
        //                 // })
        //             }
        //         },
        //         onFail: err => {

        //         }
        //     }
        //     )
        // })
    }

    openSignReward(type) {
        // UIFunc.openUI(ActivityPannelName.PannelReward, (node, script: PannelReward) => {
        //     if (script) {
        //         script.init(this.data.list[this.currentDay], this.currentDay, type);
        //     }
        // })        
        soundController.singleton.clickAudio();

        TrackMgr.AppBuyProductDialog_hcdg({
            dialog_name_hcdg:"签到成功弹窗"
        })

        let data = {
            list: this.data.list[this.currentDay],
            currentDay: this.currentDay,
            type: type,
            signDays:this.data.signDays+1
        }

        if(this.data && this.data[`callBack`]){            
            data[`callBack`] = this.data[`callBack`]
        }        

        cc.game.emit(NameTs.Game_Pop_Open, {
            name: pageTs.pageName.GameSignReward,
            data: data
        });
    }

    clickClose() {
        soundController.singleton.clickAudio();

        this.closePage();

        TrackMgr.AppDialogClick_hcdg({            
            dialog_name_hcdg: `签到弹窗`,
            ck_module: "关闭"
        })

        if(this.data && this.data[`callBack`]){
            this.data[`callBack`]();
        }

        if(this.isInsert){
            AdController.loadAd(AdPosition.SignAwardInsert, ()=>{console.log("关闭签到奖励插屏广告播放完成")});
            if(util.adPreObj[AdPosition.SignAwardInsert]){
                util.preloadAd(AdPosition.SignAwardInsert);
            }
        }

    }

    cllickCheckMark() {
        this.setData(this.data);

        if (!this.check_toggle.isChecked) {
            TrackMgr.AppDialogClick_hcdg({                
                dialog_name_hcdg: `签到弹窗`,
                ck_module: "取消勾选"
            })
        }
    }
}
