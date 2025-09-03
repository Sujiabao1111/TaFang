// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { AssistCtr } from "../Assist/AssistCtr";
import baseTs from "../base/baseTs";
import { AdPosition } from "../common/AdPosition";
import NameTs from "../common/NameTs";
import { onPrizeRedItemData } from "../onPrizeGet/OnPrizeGet";
import { UrlConst } from "../server/UrlConst";
import AdController from "../server/xmsdk_cocos/AD/AdController";
import XMSDK from "../server/xmsdk_cocos/XMSDK";
import TrackMgr from "../TrackMgr/TrackMgr";
import util from "../util/util";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends baseTs {

    @property(cc.RichText)
    lable_prizeNum: cc.RichText = null;

    @property(cc.Node)
    btn_closeNode: cc.Node = null;

    @property(cc.Label)
    lable_goldNum: cc.Label = null;

    @property(cc.Node)
    feed_node: cc.Node = null;
    
    @property({type:cc.Node,displayName:"倍数"})
    private multipleNode:cc.Node = null;
    
    @property({type:cc.Label,displayName:"倍数字"})
    private multipleLabel:cc.Label = null;

    initData: onPrizeRedItemData = null;

    isClick = false;

    start() {

    }

    init(data: onPrizeRedItemData) {
        if (data) {
            this.initData = data;
            this.lable_prizeNum.string = `<color=#FFFFFF><outline color=#D25400 width=4><color=#FFFC00>${data.doubleAmount}</color>`
            this.lable_goldNum.string = `+${this.initData.amount}`;

            this.multipleLabel.string = parseInt(String(data.doubleAmount/this.initData.amount))+"倍";

            this.btn_closeNode.active = false;
            this.scheduleOnce(() => {
                this.btn_closeNode.active = true;
            }, 3)

            TrackMgr.Online_rewards({
                activity_state: "奖励弹窗展示",
                reward_state: `${this.initData.waitTime / 60}分钟`,
            })
        }
        
        cc.tween(this.multipleNode).repeatForever(
            cc.tween().to(.3,{angle:10}).to(.2,{angle:0})
        ).start();
    }

    clickGet() {
        if (!this.initData) {
            return;
        }
        if(this.isClick){
            return;
        }
        this.isClick = true;

        TrackMgr.Online_rewards({
            activity_state: "奖励弹窗点击",
            button_name_hcdg: `直接领取`,
            reward_state: `${this.initData.waitTime / 60}分钟`,
        })
        TrackMgr.Online_rewards({
            activity_state: "领取完毕",
            collection_completed: `直接领取成功`,
        })
        XMSDK.getdataStr({
            url: UrlConst.onPrizeGetRewardGet,
            onSuccess: res => {
                if (!this.isValid) {
                    return;
                }
                if (res.code === 0) {
                    cc.game.emit(NameTs.Game_Effect_coin, { value: this.initData.amount, num: 5, parent: cc.director.getScene().getChildByName('Canvas') });
                    util.addTermCoin(this.initData.amount);
                    this.closePage();
                } else {
                    this.closePage();
                    XMSDK.toast(res.message || '网络出错~', 2.5, 1);
                }

                this.isClick = false;
            },
            onFail: res => {
                this.closePage();
                this.isClick = false;
            }
        })
    }

    clickDoubleGet() {
        if (!this.initData||(this.initData&&!this.initData.doubleAmount)) {
            return;
        }
        if(this.isClick){
            return;
        }
        this.isClick = true;

        TrackMgr.Online_rewards({
            activity_state: "奖励弹窗点击",
            button_name_hcdg: `翻倍领${this.initData.doubleAmount}`,
            reward_state: `${this.initData.waitTime / 60}分钟`,
        })

        AdController.loadAd(AdPosition.OnPrizeGet, (res) => {
            XMSDK.getdataStr({
                url: UrlConst.onPrizeGetRewardGet,
                onSuccess: res => {
                    if (res.code === 0) {
                        if (!this.isValid) {
                            return;
                        }

                        TrackMgr.Online_rewards({
                            activity_state: "领取完毕",
                            collection_completed: `视频领取成功`,
                        })


                        cc.game.emit(NameTs.Game_Effect_coin, { value: this.initData.doubleAmount, num: 5, parent: cc.director.getScene().getChildByName('Canvas') });
                        util.addTermCoin(this.initData.doubleAmount);

                        this.closePage();
                    } else {
                        this.closePage();
                        XMSDK.toast(res.message || '网络出错~', 2.5, 1);
                    }

                    this.isClick = false;
                },
                onFail: res => {                    
                    this.closePage();                    
                    this.isClick = false;
                }
            })
        }, () => {
            TrackMgr.Online_rewards({
                activity_state: "领取完毕",
                collection_completed: `视频领取失败`,
            })            
            this.closePage();
            this.isClick = false;
            AssistCtr.showToastTip("加载视频失败，请稍后！");
            
        })
    }

    onEnable() {
        AdController.loadInfoAd(AdPosition.onPrizeGetView, 636, this.feed_node);//636:feedNode信息流容器节点的宽度
    }


    onDisable() {
        AdController.hideInfoAd(AdPosition.onPrizeGetView);
        cc.game.emit(NameTs.onPrizeGetUpdate);
    }
}
