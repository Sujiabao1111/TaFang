import { AssistCtr } from "../Assist/AssistCtr";
import baseTs from "../base/baseTs";
import { AdPosition } from "../common/AdPosition";
import NameTs from "../common/NameTs";
import { UrlConst } from "../server/UrlConst";
import AdController from "../server/xmsdk_cocos/AD/AdController";
import TrackMgr from "../TrackMgr/TrackMgr";
import tool from "../util/tool";
import util from "../util/util";

const { ccclass, property } = cc._decorator;

@ccclass
export default class gameToolGet extends baseTs {

    @property(cc.Node)
    viewport:cc.Node = null;

    @property(cc.Node)
    bgNode:cc.Node = null;

    @property(cc.Sprite)
    toolSpr:cc.Sprite = null;    

    @property(dragonBones.ArmatureDisplay)
    foguang_ske:dragonBones.ArmatureDisplay = null;

    start() {
        this.foguang_ske.getComponent(dragonBones.ArmatureDisplay).playAnimation("foguang-all", 1)
    }

    onEnable(){
        this.toolSpr.node.active = true;
        this.bgNode.opacity = 255;

        TrackMgr.AppBuyProductDialog_hcdg({
            dialog_name_hcdg:"道具过渡页"
        })
         
    }

    init(info){
        this.loadAny("texture/prop/prop" + info.propId, cc.SpriteFrame, res => {
            this.toolSpr.spriteFrame = res;
            AdController.loadAd(AdPosition.Prop, () => {
                this.getTool(info);
            }, ()=>{                
                this.closePage();
                AssistCtr.showToastTip("加载视频失败，请稍后！");
                
            });
        }, ()=>{
            this.getTool(info);
        });
    }

    getTool(info){
        util.post({
            url: UrlConst.getProp,
            data: { configId: info.id },
            success: (res) => {
                if(!this.isValid){
                    return;
                }

                let data = tool.GetArrData("propId", info.propId, res.propsList);
                util.userData.prop[Number(data.propId) - 1].num += Number(data.propNum);                    
                //console.log("获取道具", data);
                // let propConfig = tool.GetArrData("type", info.propId, util.propConfig);
                // if (propConfig) {
                //     AssistCtr.showToastTip(`恭喜获得${propConfig.name}道具`);
                // }                                    
                TrackMgr.tool_used({            
                    tool_name : data.name,
                    use_success: true,
                    is_video_tool: true,
                    level: "第"+util.userData.customs.big+"关",
                })                    
                this.flyAni(info.node);
            },
            fail: () => {             
                let data = tool.GetArrData("type", info.propId, util.propConfig);       
                TrackMgr.tool_used({            
                    tool_name : data.name,
                    use_success: false,
                    is_video_tool: true,
                    level: "第"+util.userData.customs.big+"关",
                })
                this.closePage();
            }
        });
    }

    flyAni(node:cc.Node){        
        cc.tween(this.bgNode).delay(1).to(0.3,{opacity:0}).call(()=>{
            this.toolSpr.node.active = false;
            AssistCtr.playAnimate(this.toolSpr.spriteFrame, this.toolSpr.node, node, ()=>{
                cc.game.emit(NameTs.Game_PropItem_Update);
                this.closePage();
            })
        }).start();
    }

    // update (dt) {}
}
