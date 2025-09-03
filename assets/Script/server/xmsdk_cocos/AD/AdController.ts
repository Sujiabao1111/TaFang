/*
 * @Descripttion: 
 * @version: 
 * @Author: mies
 * @Date: 2021-01-27 11:50:30
 * @LastEditors: mies
 * @LastEditTime: 2021-02-08 10:23:26
 */
import { AdPosition } from "../../../common/AdPosition";
import NameTs from "../../../common/NameTs";
import pageTs from "../../../common/pageTs";
import util from "../../../util/util";
import XMSDK from "../XMSDK";
import { AdUtil } from "./AdUtil";
import { AdviewUtil } from "./AdviewUtil";

export default class AdController {

    static AD_CODE = {
        LOAD_SUCCESS: 1,//加载成功
        LOAD_FAIL: 2,//加载失败
        CLICK_AD: 3,//点击成功
        SHOW_SUCCESS: 4,//显示成功
        SHOW_FAIL: 5,//显示失败
        CLOSE_AD: 6,//关闭
        REWARD_SUCCESS: 9,//奖励成功
    }

    //普通广告
    static loadAd(position: number, callback: Function, failback?: Function) {
        console.log(position,'播放视频')
        if (true) {
            callback && callback()
            return
        }
        cc.game.emit(NameTs.Game_Pop_Open, pageTs.pageName.GameAdLoading);
        AdUtil.loadAd(position, (res) => {            
            console.log("检查", JSON.stringify(res), position)
            if (AdUtil.isViewFinished(res) && res.position == position) {
                setTimeout(() => {
                    console.log("播放视频广告成功");
                    util.advertising_num++;
                    XMSDK.trackUserProperties({
                        coin_balance: util.advertising_num,
                    });
                    cc.game.emit(NameTs.Game_SavingPost_AddCoin);
                    callback && callback()
                }, 200);
            }
            else if(res.status == AdController.AD_CODE.LOAD_FAIL){                
                failback && failback();
            }
        })
    }
    static loadInsertAd(position: number, callback: Function) {
        if (true) {
            callback && callback()
            return
        }
        cc.game.emit(NameTs.Game_Pop_Open, pageTs.pageName.GameAdLoading);
        AdUtil.loadAd(position, (res) => {
            // console.log("接收loadAd", res)
            setTimeout(() => {
                console.log("检查", res, position)
                if (AdUtil.isViewFinished(res, true) && res.position == position) {
                    console.log("播放插屏广告成功")
                    callback && callback()
                }
            }, 200);

        })
    }
    static loadInfoAd(position: number, adBoxWidth: number, adBox: cc.Node, isGdtMinAd = false) {
        console.log("asfasfas11"+position)
        if (true) {
            return
        }
        console.log("调用loadInfoad:" + position)
        // cc.game.emit(NameTs.Game_Pop_Open, pageTs.pageName.GameAdLoading);
        AdviewUtil.loadAd(position, adBoxWidth, adBox, isGdtMinAd)
    }
    static hideInfoAd(position) {
        AdviewUtil.hideAd(position)
    }
    static showAd(position: number) {
        AdUtil.showAd(position)
    }
    /**预加载视频或者插屏 */
    static preVideoAd(position: number) {
        AdUtil.loadAdVideo(position)
    }
    /**预加载信息流 */
    static preViewAd(position: number) {
        let adBoxWidth:number = 636 // 一般固定为636
        AdviewUtil.loadPreAd(position,adBoxWidth)
        console.log("asfasfas22"+position)
    }

}
