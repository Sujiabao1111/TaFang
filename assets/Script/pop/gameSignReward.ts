import { AssistCtr } from "../Assist/AssistCtr";
import baseTs from "../base/baseTs";
import { AdPosition } from "../common/AdPosition";
import { gameNumerical } from "../common/faceTs";
import NameTs from "../common/NameTs";
import { UrlConst } from "../server/UrlConst";
import AdController from "../server/xmsdk_cocos/AD/AdController";
import XMSDK from "../server/xmsdk_cocos/XMSDK";
import soundController from "../soundController";
import TrackMgr from "../TrackMgr/TrackMgr";
import util from "../util/util";
import gameSign, { signItemData, signRewardData } from "./gameSign";

export const SignDayRedpack = [0, 0, 1, 0, 0, 0, 1]
const { ccclass, property } = cc._decorator;

@ccclass
export default class PannelReward extends baseTs {
    @property(cc.Node)
    viewport: cc.Node = null;

    @property(cc.Node)
    passView: cc.Node = null;

    @property(cc.Node)
    doubleGoldNode: cc.Node = null;

    @property(cc.Label)
    lable_redAddNum: cc.Label = null;

    @property(cc.Label)
    lable_changNum: cc.Label = null;

    @property(cc.Label)
    lable_rewardListTipGold: cc.Label = null;

    @property(cc.Node)
    feed_node: cc.Node = null;
    
    @property(cc.Node)
    doubleBtnNode: cc.Node = null;
    
    @property(cc.Node)
    closeBtnNode: cc.Node = null;

    @property(cc.Node)
    getBtnNode: cc.Node = null;


    //---------------过度页------------------------
    @property(cc.Sprite)
    img_prize: cc.Sprite = null;

    @property(cc.Label)
    lable_prize: cc.Label = null;

    @property(cc.SpriteFrame)
    img_goldIcon: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    img_redIcon: cc.SpriteFrame = null;
    @property({type:cc.Node,displayName:"倍数"})
    private multipleNode:cc.Node = null;
    
    @property({type:cc.Label,displayName:"倍数金币"})
    private lable_addGold2:cc.Label = null;
    

    data = null;
    gaintype = null;
    rewardList: Array<signRewardData> = null;
    rewardNodeList = null;


    tempNode = null;
    isRedpack = null;
    addGold = null;   
    /**签到天数 */
    signDays:number = 1;

    /**是否改变了 */
    isChange:boolean = false;

    onEnable() {
        // UIFunc.openUI(ActivityPannelName.PannelTempNode, (node, script) => {
        //     this.tempNode = node;
        // })        
        AssistCtr.checkIsOpenInserAd(AdPosition.SignAwardInsert)

        
        this.scheduleOnce(()=>{

            this.closeBtnNode.active = true;

        },gameNumerical.closeTime);
        cc.tween(this.multipleNode).repeatForever(
            cc.tween().to(.3,{angle:10}).to(.2,{angle:0})
        ).start();
    }

    onDisable() {
        // if (this.tempNode) {
        //     UIFunc.closeUI(ActivityPannelName.PannelTempNode);
        //     this.tempNode = null;
        // }
        AdController.hideInfoAd(AdPosition.InfoSignRewardView);

        if(util.adPreObj[AdPosition.InfoSignRewardView]){
            util.preloadAd(AdPosition.InfoSignRewardView,true);
        }

        if(this.data && this.data[`callBack`]){
            this.data[`callBack`]();
        }

        util.isOkSign = true;
        cc.game.emit(NameTs.Game_KingPaoTask_Update);
    }

    init(signAwardData) {
        this.isChange = false;
        let data = signAwardData.list;
        let index = signAwardData.currentDay;
        let gaintype = signAwardData.type;
        this.signDays = signAwardData.signDays;
        if (gaintype == 1) {
            this.viewport.active = true;
            this.passView.active = false;
            AdController.loadInfoAd(AdPosition.InfoSignRewardView, 636, this.feed_node);//636:feedNode信息流容器节点的宽度            
        }
        else {
            this.viewport.active = false;
            this.passView.active = true;

            AdController.loadAd(AdPosition.VideoSignDouble, (res) => {
                AdController.loadInfoAd(AdPosition.InfoSignRewardView, 636, this.feed_node);//636:feedNode信息流容器节点的宽度  
                if(util.adPreObj[AdPosition.VideoSignDouble]){
                    util.preloadAd(AdPosition.VideoSignDouble);
                }
            }, () => {
                AssistCtr.showToastTip("加载视频失败，请稍后！");
            })

            setTimeout(() => {
                this.viewport&&(this.viewport.active = true);
                this.passView&&(this.passView.active = false); 
            }, 10000);
        }

        this.data = signAwardData;
        this.gaintype = gaintype;
        this.viewport.opacity = 255;
        this.rewardList = data.rewardList;
        this.isRedpack = SignDayRedpack[index];
        let item = this.rewardList[0];
        let change = util.userData.exchangeRate;
        let gold = 0;

        this.doubleBtnNode.active = this.gaintype==1;

        this.getBtnNode.active = this.gaintype==2;

        if (item) {
            gold = this.gaintype == 1 ? item.rewardValue : this.gaintype == 2 ? item.rewardPlusValue : item.rewardPlusValue - item.rewardValue
            this.lable_redAddNum.string = "+" + gold+"红包币";
            this.lable_changNum.string = `红包${util.userData.coin + gold} ≈ ${((util.userData.coin + gold) / change).toFixed(2)}元`;
            this.lable_rewardListTipGold.string = `${util.userData.coin + gold} ≈ ${((util.userData.coin + gold) / change).toFixed(2)}元`;

            this.lable_addGold2.string = gold*2+"";
        }

        if (!this.isRedpack) {
            this.img_prize.spriteFrame = this.img_goldIcon;
            this.lable_prize.string = `+${gold}`+"红包币";
        }
        else {
            this.img_prize.spriteFrame = this.img_redIcon;
            this.lable_prize.string = `+${gold / util.userData.exchangeRate}元`;
        }

        this.addGold = gold;
        //GameInfo.gainGold(gold);

        if(this.gaintype==2){
            TrackMgr.AppBuyProductDialog_hcdg({
                dialog_name_hcdg:"普通签到成功弹窗"
            })
        }
        
    }

    

    finishAnimation() {        
        this.closePage();
    }

    startAnimation() {
        TrackMgr.AppDialogClick_hcdg({                
            dialog_name_hcdg: `签到成功弹窗`,
            ck_module: "收下"
        })

        soundController.singleton.clickAudio();
        let callback = () => {
            if (!this.isRedpack) {
                for (let m in this.rewardList) {
                    // AssistCtr.findPropSprite(this.rewardList[m].type, this.rewardList[m].keyId, (spriteFrame) => {
                    //     if (this.rewardNodeList[m]) {
                    //         let temp = this.tempNode.getComponent(PannelTempNode).getGoldNode();
                    //         AssistCtr.playAnimate(spriteFrame, this.rewardNodeList[m], temp, () => {
                    //             this.finishAnimation();
                    //         });
                    //     }

                    // }, () => {
                    //     cc.error("加载图片失败", this.rewardList[m].type, this.rewardList[m].keyId);
                    //     this.quit();
                    // })
                    //cc.game.emit(NameTs.Game_Effect_coin,{node:this.rewardNodeList[m], value:res.coin});
                }
                cc.game.emit(NameTs.Game_Effect_coin, { node: this.doubleGoldNode, value: this.addGold });
                this.finishAnimation();
            }
            else {
                cc.game.emit(NameTs.Game_Effect_coin, { node: this.doubleGoldNode, value: this.addGold });
                this.finishAnimation();

                // let temp = this.tempNode.getComponent(PannelTempNode).getGoldNode();
                // AssistCtr.playAnimate(this.doubleGoldNode.getComponent(cc.Sprite).spriteFrame, this.doubleGoldNode, temp, () => {
                //     this.finishAnimation();
                // });
            }
            AssistCtr.loadAdInsertVideo(AdPosition.SignAwardInsert, ()=>{console.log("签到奖励插屏广告播放完成")});
        }
        this.viewport.runAction(cc.sequence(cc.fadeOut(0.3), cc.callFunc(callback)))
    }


    /**双倍收下 */
    doubleBtn(e,res){
        soundController.singleton.clickAudio();
        
        
        

        let num = Number(res);

        if(this.gaintype==2||this.isChange){
            num = 1;
        }

        let url:string = num?UrlConst.sign_videoGet:UrlConst.sign_commonGet;

        let day:string = `第${this.signDays}天`;

        let coin:number = num?this.rewardList[0].rewardPlusValue:this.rewardList[0].rewardValue;

        let successFn = ()=>{
			
            XMSDK.getdataStr({
                url,
                onSuccess: res => {
                    if (res.code === 0) {
                        this.closePage();
                        
                        AssistCtr.loadAdInsertVideo(AdPosition.SignAwardInsert, ()=>{console.log("签到奖励插屏广告播放完成")});
                        cc.game.emit(NameTs.Game_Effect_coin, { node: this.doubleGoldNode, value: coin ,num:10});
                    }
                    else {
                        TrackMgr.Signin_new({
                            get_state: false,
                            get_type: this.isChange||this.gaintype==2?"双倍领取":"单倍直接领取",                                                
                            get_days: day,                        
                        })
                    }
                },
                onFail: err => {
					
                }
            })
						this.closePage();
                        
                        //AssistCtr.loadAdInsertVideo(AdPosition.SignAwardInsert, ()=>{console.log("签到奖励插屏广告播放完成")});
                        //cc.game.emit(NameTs.Game_Effect_coin, { node: this.doubleGoldNode, value: coin ,num:10});

        }

        if(num==1&&this.gaintype==1&&!this.isChange){
            this.viewport&&(this.viewport.active = false);
            this.passView&&(this.passView.active = true);

            this.lable_prize.string = "+" + coin+"红包币";
            AdController.loadAd(AdPosition.VideoSignDouble, (res) => { 
                // successFn();
                if(util.adPreObj[AdPosition.VideoSignDouble]){
                    util.preloadAd(AdPosition.VideoSignDouble);
                }
                console.log("看视频")
                this.doubleBtnNode&&(this.doubleBtnNode.active = false);
                this.getBtnNode&&(this.getBtnNode.active = true);
                this.lable_redAddNum.string = "+" + coin+"红包币";
                // this.gaintype = 2;
                this.isChange = true;
                AdController.loadInfoAd(AdPosition.InfoSignRewardView, 636, this.feed_node);//636:feedNode信息流容器节点的宽度  
            }, () => {
                AssistCtr.showToastTip("加载视频失败，请稍后！");
            });

            AdController.hideInfoAd(AdPosition.InfoSignRewardView);
            setTimeout(() => {
                this.viewport&&(this.viewport.active = true);
                this.passView&&(this.passView.active = false); 
            }, 10000);

            TrackMgr.AppDialogClick_hcdg({            
                dialog_name_hcdg: `普通签到成功弹窗`,
                ck_module: "翻倍领取",             
                active_ad_hcdg:"激励视频"   
            })

        }else{
            successFn();
            let text:string = this.isChange||this.gaintype==2?"双倍领取":"单倍直接领取";
            TrackMgr.Signin_new({
                get_state: true,
                get_type: text,                                                
                get_days: day,                        
            })  
            console.log("不看视频")     
            if(!this.isChange&&this.gaintype!==2){
                TrackMgr.AppDialogClick_hcdg({            
                    dialog_name_hcdg: `普通签到成功弹窗`,
                    ck_module: "直接领取"
                }) 
            }
            TrackMgr.AppDialogClick_hcdg({                
                dialog_name_hcdg: `签到成功弹窗`,
                ck_module: "收下"
            });
        }

        

    }
};
