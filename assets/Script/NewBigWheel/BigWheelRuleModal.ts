import soundController from "../soundController";
import TrackMgr from "../TrackMgr/TrackMgr";

/*
 * @Descripttion: 
 * @version: 
 * @Author: mies
 * @Date: 2021-02-24 14:45:47
 * @LastEditors: mies
 * @LastEditTime: 2021-03-02 14:34:06
 */
const { ccclass, property } = cc._decorator;

@ccclass
export default class BigWheelRuleModal extends cc.Component {
    @property(cc.RichText)
    lable_content: cc.RichText = null
    onClose(event) {
        if (event) {
            soundController.singleton.clickAudio()
        }
        this.node.destroy();
        TrackMgr.AppDialogClick_hcdg({
            dialog_name_hcdg: '大转盘规则弹窗',
            ck_module: '关闭'
        })
    }
    open(beginDate, endDate) {
        this.node.parent = cc.Canvas.instance.node;
        this.node.active = true;
        this.node.opacity = 0;

        console.log("规则开始时间", beginDate);
        console.log("规则结束时间", endDate);

        this.lable_content.string = `1、本活动为概率抽奖，在活动期内集齐手机碎片或抽中手机即可免费兑换华为P40手机，碎片收集活动周期为7天，7天后手机碎片清零；\n\n2、每个用户每天有1次免费抽奖机会，抽奖机会仅当天有效，未使用则第二天清零，次日重置抽奖次数；\n\n3、免费抽奖次数使用完后可通过观看视频和完成指定任务获取额外抽奖次数，观看视频获得抽奖次数每日上限10次；\n\n4、兑换商品时，需要填写收货信息（包括姓名、联系方式、收货地址等），商品将在3天内寄出；\n\n<size=28>本期活动时间:${beginDate}至${endDate}</size>`;

        cc.tween(this.node)
            .to(.2, { opacity: 255 })
            .start();
            TrackMgr.AppBuyProductDialog_hcdg({
                dialog_page: '幸运大转盘页',
                dialog_name_hcdg: '大转盘规则弹窗'
            })
    }
}
