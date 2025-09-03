import { AssistCtr } from "../Assist/AssistCtr";
import baseTs from "../base/baseTs";
import { AdPosition } from "../common/AdPosition";
import { propProperty, propType } from "../common/faceTs";
import NameTs from "../common/NameTs";
import pageTs from "../common/pageTs";
import { UrlConst } from "../server/UrlConst";
import AdController from "../server/xmsdk_cocos/AD/AdController";
import XMSDK from "../server/xmsdk_cocos/XMSDK";
import soundController from "../soundController";
import TrackMgr from "../TrackMgr/TrackMgr";
import tool from "../util/tool";
import util from "../util/util";

const { ccclass, property } = cc._decorator;

@ccclass
export default class propItem extends baseTs {

    @property({ type: cc.Label, displayName: "名字" })
    private nameLabel: cc.Label = null;

    @property({ type: cc.Label, displayName: "说明" })
    private explainLabel: cc.Label = null;

    @property({ type: cc.Label, displayName: "持续时间" })
    private timeLabel: cc.Label = null;

    @property({ type: cc.Label, displayName: "数量" })
    private numLabel: cc.Label = null;

    @property({ type: cc.Sprite, displayName: "图片" })
    private pic: cc.Sprite = null;

    @property({ type: cc.Label, displayName: "等级" })
    private levelLabel: cc.Label = null;

    @property({ type: cc.Node, displayName: "限制盒子" })
    private astrictBox: cc.Node = null;

    @property({ type: cc.Node, displayName: "增加" })
    private addIcon: cc.Node = null;

    private initData;

    //道具数量
    private propNum: number = 0;
    //是否被限制
    private isAstrict: boolean;

    //列表id
    private id: number;
    //道具id
    private propId: number;

    onLoad() {
        cc.game.on(NameTs.Game_PropItem_Update, this.setData, this);
        cc.game.on(NameTs.Game_Start, this.updateData, this);
    }

    start() {

    }

    updateData() {
        if (this.initData) {
            this.init(this.initData);
        }
    }

    /**
     * 初始化
     * @param data 数据
     */
    init(data) {

        this.initData = data;

        this.id = this.initData.id;

        this.nameLabel.string = this.initData.configName;

        // if(this.initData.propIssueDetailList[0].propsId==propType.auto){
        //     this.node.active = false;
        // }


        if(this.isAstrict && (util.userData.customs.big >= this.initData.propIssueDetailList[0].level)){
            TrackMgr.AppBuyProductDialog_hcdg({
                dialog_name_hcdg:"恭喜解锁新道具"
            });
            
            TrackMgr.AppDialogClick_hcdg({
                dialog_name_hcdg: "恭喜解锁新道具",
                ck_module:"收下",
            })
        }

        this.isAstrict = util.userData.customs.big < this.initData.propIssueDetailList[0].level;
        this.propId = this.initData.propIssueDetailList[0].propsId;

        if (this.initData.time > 0) {
            this.timeLabel.string = this.initData.time + "s";
        } else {
            this.timeLabel.node.active = false;
        }

        this.explainLabel.string = this.initData.explain;

        this.loadAny("texture/prop/prop" + this.propId, cc.SpriteFrame, res => {

            this.pic.spriteFrame = res;

        });


        this.astrictBox.active = this.isAstrict;

        if (this.isAstrict) {
            this.pic.node.color = cc.color(148, 148, 148, 255);
            this.numLabel.node.getParent().active = this.addIcon.active = false;
            this.levelLabel.string = "炮塔" + this.initData.level + "级\n解锁"
        }
        else {
            this.pic.node.color = cc.color(255, 255, 255, 255);
        }

        this.setData();

    }

    /**
     * 使用
     */
    UseBtn() {
        let data = tool.GetArrData("type", this.propId, util.propConfig);
        if(data && data.name != ""){
            TrackMgr.AppClick({
                app_page_title: "首页",
                app_ck_module: `道具-${data.name}`,
                app_exposure_type: "banner",
            })
        }


        if (this.isAstrict) {
            if (this.initData && this.initData.propIssueDetailList[0] && this.initData.propIssueDetailList[0].level) {
                AssistCtr.showToastTip(`${this.initData.propIssueDetailList[0].level}关解锁`);
            }
            else {
                AssistCtr.showToastTip("限制道具,还未到等级");
            }
            soundController.singleton.playMusic(NameTs.clickNoAllowed);
            return;
        }
        soundController.singleton.clickAudio();

        if (this.propNum <= 0) {
            

            TrackMgr.AppBuyProductDialog_hcdg({
                dialog_name_hcdg:"未获得该道具"
            })
            TrackMgr.AppDialogClick_hcdg({
                dialog_name_hcdg: "未获得该道具",
                ck_module:"领取",
            })
            cc.game.emit(NameTs.Game_Pop_Open, {
                name: pageTs.pageName.GameToolGet,
                data: {
                    id: this.id,
                    propId: this.propId,       
                    node: this.node
                }
            });
            util.props_number++;
            XMSDK.trackUserProperties({
                props_number: util.props_number,
            });
            return;
        }
        util.post({
            url: UrlConst.useProp,
            data: { propId: this.propId },
            success: () => {

            },
            fail: () => {
                this.sendMTrack(false, false);
            }
        });

        util.UseProp(this.propId);
        this.setData();
        console.log("使用道具", this.propId);
        this.sendMTrack(true, false);
        util.gamePropNum += 1;
        
    }

    /**是否 */
    sendMTrack(isSuccess: boolean, isVideo: boolean) {

        let data = tool.GetArrData("type", this.propId, util.propConfig);

        TrackMgr.tool_used({
            tool_name: data.name,
            use_success: isSuccess,
            is_video_tool: isVideo,
            level: "第" + util.userData.customs.big + "关",
        })

    }

    /**设置一下道具数量 */
    setData() {

        this.propNum = util.GetPropNum(this.propId);
        
        this.numLabel.node.getParent().active = this.propNum > 0;

        this.addIcon.active = this.propNum == 0;

        this.numLabel.string = this.propNum + "";
        
        // this.node.width = this.propNum == 0?0:80;
    }

    

    // update (dt) {}
}
