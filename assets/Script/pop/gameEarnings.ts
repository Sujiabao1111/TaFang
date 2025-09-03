import { AssistCtr } from "../Assist/AssistCtr";
import baseTs from "../base/baseTs";
import { AdPosition } from "../common/AdPosition";
import NameTs from "../common/NameTs";
import { UrlConst } from "../server/UrlConst";
import AdController from "../server/xmsdk_cocos/AD/AdController";
import soundController from "../soundController";
import TrackMgr from "../TrackMgr/TrackMgr";
import tool from "../util/tool";
import util from "../util/util";

const { ccclass, property } = cc._decorator;

@ccclass
export default class gameEarnings extends baseTs {

    @property({ type: cc.Node, displayName: "layout盒子" })
    private layoutNode: cc.Node = null;

    @property({ type: cc.Label, displayName: "时间" })
    private timeLabel: cc.Label = null;

    @property({ type: [cc.Node], displayName: "状态盒子" })
    private stateArr: cc.Node[] = [];

    @property({ type: cc.Node, displayName: "信息流" })
    private feed_node: cc.Node = null;

    // onLoad () {}

    private data: any;

    private time: number = 0;

    //当前第几个
    private no: number = -1;

    //类型
    popupState: number;

    init() {

        util.post({
            url: UrlConst.doubleEarn,
            success: (res) => {
                if(!this.isValid){
                    return;
                }
                this.getState(res);
            }
        });


        // let json =  {
        //     leftTime: 0,
        //     list:[
        //         {incomeNodeName: "30s", incomeNodeId: 30, incomeNodeTime: "30"},
        //         {incomeNodeName: "100s", incomeNodeId: 100, incomeNodeTime: "100"},
        //         {incomeNodeName: "150s", incomeNodeId: 150, incomeNodeTime: "150"},
        //         {incomeNodeName: "200s", incomeNodeId: 200, incomeNodeTime: "200"},
        //         {incomeNodeName: "300s", incomeNodeId: 300, incomeNodeTime: "300"}
        //     ],
        //     nowLitNode: -1,
        //     popupState: 1
        // }
        // this.getState(json);

        /**加载双倍收益视频 */
        // if (!util.adPreObj[AdPosition.Earning]) {
        //     util.preloadAd(AdPosition.Earning);
        // }
    }

    start() {

    }

    /**
     * 设置状态
     * @param data 数据
     */
    getState(data) {

        this.data = data;

        if (data && data.list && this.layoutNode && this.layoutNode.children) {
            this.layoutNode.children.forEach((item, index) => {                
                let dataItem = data.list[index];
                //查找第几个
                if (dataItem && data.nowLitNode == dataItem.incomeNodeId && data.nowLitNode !== -1) {
                    this.no = index;
                }
                console.log(dataItem.incomeNodeId <= data.nowLitNode, 'dataItem.incomeNodeId<=data.nowLitNode')
                if (item) {
                    //改变颜色
                    item.children[0].active = dataItem.incomeNodeId <= data.nowLitNode;
                    //改变颜色
                    if (dataItem.incomeNodeId <= data.nowLitNode) {
                        if (dataItem.incomeNodeId == data.nowLitNode && data.popupState == 1) {
                            item.children[1].opacity = 255;
                        } else {
                            item.children[1].opacity = 102;
                        }
                    }
                    //修改节点label文字
                    item.children[1].children[0].getComponent(cc.Label).string = dataItem.incomeNodeName;
                    if (index > 0 && dataItem.incomeNodeId <= data.nowLitNode) {
                        item.children[2].active = true;
                    }
                }
            })
        }
        //转化为s
        this.time = Math.floor(data.leftTime / 1000);
        console.log(data.popupState, 'data.popupState', this.no)
        this.setState(data.popupState);
    }

    /**开启倒计时 */
    openDJS() {
        this.schedule(() => {
            this.time -= 1;
            if (this.time <= 0) {
                this.time = 0;
                this.no += 1;
                if (this.no >= this.data.list.length) {
                    this.data.popupState = 2;
                    this.data.incomeNodeId = this.data.list[this.data.list.length - 1].incomeNodeId;
                } else {
                    this.data.popupState = 0;
                    this.data.incomeNodeId = this.data.list[this.no];
                }
                this.getState(this.data);
                this.unscheduleAllCallbacks();
            }
            this.timeLabel.string = tool.changeTime(this.time);
        }, 1);
    }


    /**
     * 状态 未加速-0，加速中-1，加速次数已用完-2
     * @param type 
     */
    setState(type: number) {
        this.stateArr[0].active =
            this.stateArr[1].active =
            this.stateArr[2].active = false;
        let text: string = null;
        this.popupState = type;
        switch (type) {
            case 0:
                TrackMgr.double_revenue({
                    activity_state: "未加速",
                    today_times: this.data.list.length - this.no - 1
                });

                TrackMgr.AppBuyProductDialog_hcdg({
                    dialog_name_hcdg: "收益翻倍弹窗（未加速状态）"
                })

                break;
            case 1:
                TrackMgr.AppBuyProductDialog_hcdg({
                    dialog_name_hcdg: "收益翻倍弹窗（加速中）"
                })
                cc.game.emit(NameTs.Game_Earnings_Linster, this.time);
                this.openDJS();
                break;
            case 2:
                TrackMgr.AppBuyProductDialog_hcdg({
                    dialog_name_hcdg: "收益翻倍弹窗（次数用完）"
                })

                text = "次数已用完";
                TrackMgr.double_revenue({
                    activity_state: "未次数已用完加速",
                });
                break;
        }

        this.stateArr[type].active = true;

    }

    /**
     * 关闭页面
     */
    closeBtn() {
        soundController.singleton.clickAudio();
        this.closePage();

        let text = null;
        switch (this.popupState) {
            case 0:
                text = "收益翻倍弹窗（未加速状态）";

                break;
            case 1:
                text = "收益翻倍弹窗（加速中）";
                break;
            case 2:
                text = "收益翻倍弹窗（次数用完）";
                break;
        }

        TrackMgr.AppDialogClick_hcdg({
            dialog_name_hcdg: text,
            ck_module: "关闭",
        })
    }

    /**
     * 开启
     */
    openBtn() {
        soundController.singleton.clickAudio();
        if(!this.data)return;
        if (this.data.popupState == 2) {
            AssistCtr.showToastTip("加速次数已用完");
            return;
        }

        AdController.loadAd(AdPosition.Earning, () => {
            // util.preloadAd(AdPosition.Earning);
            util.post({
                url: UrlConst.activateEarn,
                success: (res) => {
                    AssistCtr.showToastTip("加速成功");
                    this.no += 1;
                    util.doubleEarn.use = true;
                    let time: number = Number(this.data.list[this.no].incomeNodeTime);
                    util.doubleEarn.time = time;
                    this.data.incomeNodeId = time;
                    this.data.leftTime = time * 1000;
                    this.data.popupState = 1;
                    this.data.nowLitNode = time;
                    this.getState(this.data);
                    TrackMgr.double_revenue({
                        activity_state: "加速中",
                        acceleration_time: time + "s"
                    });

                    TrackMgr.AppDialogClick_hcdg({
                        dialog_name_hcdg: "收益翻倍弹窗（未加速状态）",
                        ck_module: "免费领取",
                        active_ad_hcdg:"激励视频"
                    })
                },
                fail: () => {
                    AssistCtr.showToastTip("加速失败");
                }
            })
        }, () => {
            AssistCtr.showToastTip("加载视频失败，请稍后！");
        });
    }

    onEnable() {
        AdController.loadInfoAd(AdPosition.EarningView, 636, this.feed_node);//636:feedNode信息流容器节点的宽度
    }


    onDisable() {
        AdController.hideInfoAd(AdPosition.EarningView);
    }


    // update (dt) {}
}
