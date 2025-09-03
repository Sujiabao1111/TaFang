import { AssistCtr } from "../Assist/AssistCtr";
import baseTs from "../base/baseTs";
import { AdPosition } from "../common/AdPosition";
import NameTs from "../common/NameTs";
import turret from "../game/turret/turret";
import { UrlConst } from "../server/UrlConst";
import AdController from "../server/xmsdk_cocos/AD/AdController";
import XMSDK from "../server/xmsdk_cocos/XMSDK";
import TrackMgr from "../TrackMgr/TrackMgr";
import util from "../util/util";


const { ccclass, property } = cc._decorator;

@ccclass
export default class gameRandomRedPrize extends baseTs {


    @property(cc.RichText)
    lable_prizeNum: cc.RichText = null;

    @property(cc.Node)
    btn_closeNode: cc.Node = null;

    @property(cc.Label)
    lable_goldNum:cc.Label = null;

    @property(cc.Node)
    feed_node1: cc.Node = null;


    
    @property({type:cc.Node,displayName:"倍数"})
    private multipleNode:cc.Node = null;

    private redAmountNum = 200;
    private power = 3;

    private coinItem:cc.Node = null;

    start() {

        cc.tween(this.multipleNode).repeatForever(
            cc.tween().to(.3,{angle:10}).to(.2,{angle:0})
        ).start();

        
        this.coinItem = util.GlobalMap.get("RandomRed")||this.node;

        console.log(this.coinItem.x,this.coinItem.y,'asfasfasf12412=================')
    }

    onEnable() {
        TrackMgr.AppBuyProductDialog_hcdg({
            dialog_name_hcdg: "福利红包弹窗展示"
        })
        AdController.loadInfoAd(AdPosition.randomRedPrizeView, 636, this.feed_node1);//636:feedNode信息流容器节点的宽度
    }


    onDisable() {        
        AdController.hideInfoAd(AdPosition.randomRedPrizeView);

    }

    init(data) {

        TrackMgr.welfare_red_envelope({
            activity_state:"福利红包弹窗展示"
        })


        this.lable_goldNum.string = `+${this.redAmountNum}`;
        this.lable_prizeNum.string = `<outline color=#D25400 width=4><color=#FFFC00>${this.redAmountNum * this.power}</color>`

        this.btn_closeNode.active = false;
        this.scheduleOnce(() => {
            this.btn_closeNode.active = true;
        }, 3);
    }

    clickGet() {
        TrackMgr.welfare_red_envelope({
            activity_state:"福利红包弹窗点击",
            button_name_hcdg:"直接领取"
        })

        TrackMgr.welfare_red_envelope({
            activity_state:"领取成功",
            collection_completed:"直接领取成功"
        })

        TrackMgr.AppDialogClick_hcdg({
            dialog_name_hcdg: '福利红包弹窗展示',
            ck_module: '直接领取'
        })

        XMSDK.getdataStr({
            url: UrlConst.btnRandomRedGet,
            onSuccess: res => {
                if (res.code === 0) {
                    if(!this.isValid){
                        return;
                    }
                    console.log("普通领取！")
                    cc.game.emit(NameTs.Game_Effect_coin, {node:this.coinItem, value: this.redAmountNum,num:10 });
                    util.addTermCoin(this.redAmountNum);
                    AssistCtr.showToastTip("获得"+(this.redAmountNum)+"红包币");
                    cc.game.emit(NameTs.randomRedUpdate);
                    this.closePage();
                } else {
                    AssistCtr.showToastTip(res.message || '网络出错~');
                    cc.game.emit(NameTs.randomRedUpdate);
                    this.closePage();
                }
            },
            onFail: res => {
                AssistCtr.showToastTip("网络出错~");
                cc.game.emit(NameTs.randomRedUpdate);
                this.closePage();
            }
        })
        cc.game.emit(NameTs.Game_Task_updata);
    }

    clickDoubleGet() {
        TrackMgr.welfare_red_envelope({
            activity_state:"福利红包弹窗点击",
            button_name_hcdg:"领取600红包币"
        })

        TrackMgr.AppDialogClick_hcdg({
            dialog_name_hcdg: '福利红包弹窗展示',
            ck_module: '领取600红包币',
            active_ad_hcdg:"激励视频"
        })
        AdController.loadAd(AdPosition.randomRedPrize, (res) => {
            
            // TrackMgr.AppBuyProductDialog_hcdg({
            //     dialog_name_hcdg: "福利红包翻倍成功弹窗展示"
            // })

            TrackMgr.welfare_red_envelope({
                activity_state:"领取成功",
                collection_completed:"视频领取成功"
            })

            XMSDK.getdataStr({
                url: UrlConst.btnRandomRedGet,
                onSuccess: res => {
                    if (res.code === 0) {
                        if(!this.isValid){
                            return;
                        }
                        console.log("翻倍领取！")
                        cc.game.emit(NameTs.randomRedUpdate);
                        cc.game.emit(NameTs.Game_Effect_coin, { node:this.coinItem,value: this.redAmountNum * this.power,num:10});
                        util.addTermCoin(this.redAmountNum * this.power);
                        AssistCtr.showToastTip("获得"+(this.redAmountNum * this.power)+"红包币");
                        this.closePage();
                    } else {
                        XMSDK.toast(res.message || '网络出错~', 2.5, 1);
                        cc.game.emit(NameTs.randomRedUpdate);
                        this.closePage();
                    }
                },
                onFail: res => {
                    AssistCtr.showToastTip("网络出错~");
                    cc.game.emit(NameTs.randomRedUpdate);
                    this.closePage();
                }
            })
        }, () => {
            cc.game.emit(NameTs.randomRedUpdate);
            this.closePage();
            AssistCtr.showToastTip("加载视频失败，请稍后！");
            
        })
    }

    clickDoubleGet2() {
        TrackMgr.welfare_red_envelope({
            activity_state:"领取成功",
            collection_completed:"视频领取成功"
        })

        TrackMgr.AppDialogClick_hcdg({
            dialog_name_hcdg: '福利红包翻倍成功弹窗展示',
            ck_module: '开心收下'
        })

        XMSDK.getdataStr({
            url: UrlConst.btnRandomRedGet,
            onSuccess: res => {
                if (res.code === 0) {
                    if(!this.isValid){
                        return;
                    }
                    console.log("翻倍领取！")
                    cc.game.emit(NameTs.Game_Effect_coin, {node:this.coinItem, value: this.redAmountNum * this.power,num:10});
                    util.addTermCoin(this.redAmountNum * this.power);
                    AssistCtr.showToastTip("获得"+(this.redAmountNum * this.power)+"红包币");
                } else {
                    XMSDK.toast(res.message || '网络出错~', 2.5, 1);
                }
            },
            onFail: res => {

            }
        })
        this.closePage();
        cc.game.emit(NameTs.Game_Task_updata);
    }



}
