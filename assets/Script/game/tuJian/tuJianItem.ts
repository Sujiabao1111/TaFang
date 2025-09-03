import { AssistCtr } from "../../Assist/AssistCtr";
import baseTs from "../../base/baseTs";
import NameTs from "../../common/NameTs";
import TrackMgr from "../../TrackMgr/TrackMgr";
import util from "../../util/util";

// export interface signData {
//     list: Array<signItemData>   //每日签到奖励列表
//     signDays: number	        //签到天数
//     todayChecked: boolean,	    //今日已签到
//     userPeriod: number,	        //用户期数
// }

const { ccclass, property } = cc._decorator;

@ccclass
export default class tuJianItem extends baseTs {

    @property({ type: cc.Sprite, displayName: "图鉴icon" })
    image_icon: cc.Sprite = null;

    @property({ type: cc.Sprite, displayName: "图鉴icon2" })
    image_icon2: cc.Sprite = null;

    @property({ type: cc.Sprite, displayName: "图鉴框" })
    image_frame: cc.Sprite = null;

    @property(cc.SpriteFrame)
    frameSprArray: Array<cc.SpriteFrame> = [];

    @property(cc.Node)
    haveNode: cc.Node = null;

    @property(cc.Node)
    noHaveNode: cc.Node = null;

    @property(cc.Node)
    turret: cc.Node = null;

    @property(cc.Node)
    monster: cc.Node = null;

    @property(cc.Label)
    lable_lv:cc.Label = null;

    @property(cc.Label)
    lable_name:cc.Label = null;    

    private initData: any;

    start() {

    }

    onLoad() {

    }

    init(data) {
        if (data && data.data) {
            this.initData = data.data;
            this.node.zIndex = data.id;
            this.updateData();
        }
        else {
            this.node.destroy();
        }
    }

    updateData() {
        let data = this.initData;
        if (data.walkCd) {        //怪兽
            this.haveNode.active = true;
            this.noHaveNode.active = false;

            this.loadImage(Number(data.sprite), 2, (res)=>{                    
                if(this.image_icon) this.image_icon.spriteFrame = res;
            }, ()=>{if(this.node) this.node.destroy();})
            this.image_icon2.node.active = false;
        }
        else {                   //炮塔
            let curLv = util.userData.turretLevel;
            if (curLv >= parseInt(this.initData.level)) {
                this.haveNode.active = true;
                this.noHaveNode.active = false;

                this.loadAny(data.body, cc.SpriteFrame, (res)=>{                    
                    if(this.image_icon) this.image_icon.spriteFrame = res;
                }, ()=>{if(this.node) this.node.destroy();})
    
                //this.image_icon2.node.active = false;
                this.loadAny(data.foot, cc.SpriteFrame, (res)=>{                    
                    if(this.image_icon2) this.image_icon2.spriteFrame = res;
                }, ()=>{
                    if(this.node) this.image_icon2.spriteFrame = null;
                })

                this.image_icon2.node.x = Number(data.TujianItemX);
                this.image_icon2.node.y = Number(data.TujianItemY);
    
                // if(AssistCtr.checkTuJian(data.level)){
                //     this.image_icon2.node.x = 0; 
                //     this.image_icon2.node.y = 0;
                //     if(data.level == 5){
                //         this.image_icon2.node.y = -2;
                //     }
                //     else if(data.level == 9){
                //         this.image_icon2.node.x = -1;
                //         this.image_icon2.node.y = -3;
                //     }  
                //     else if(data.level == 17){                        
                //         this.image_icon2.node.y = -3;
                //     }       
                //     else if(data.level == 30){
                //         this.image_icon2.node.x = 2;
                //         this.image_icon2.node.y = 1;
                //     } 
                //     else if(data.level == 29){                        
                //         this.image_icon2.node.y = -4;
                //     }   
                //     else if(data.level == 38){                        
                //         this.image_icon2.node.y = -17;
                //     }                         
                // }
                // else{
                //     this.image_icon2.node.y = -26;
                // }
            }
            else {
                this.haveNode.active = false;

                this.noHaveNode.active = true;
                this.turret.active = true;
                this.monster.active = false;

            }
        }                
        this.lable_lv.string = `Lv${data.level}`;        
        this.lable_name.string = `${data.name}`;
    }

    /**
     * 点击
     */
    click() {
        if (this.haveNode.active) {
            TrackMgr.AppClick({
                app_page_title: "图鉴",
                app_ck_module: "炮王进度",
                app_exposure_type: "Icon",
            });
            
            cc.game.emit(NameTs.Game_TuJian_UpData, {
                target: this,
                data: this.initData
            });
        }
    }

    /**
     * 设置点击状态
     */
    setCliCkState(state) {
        if (this.haveNode.active) {
            let tempColor = new cc.Color();
            if(state){
                this.lable_lv.node.color = tempColor.fromHEX("#FEE6B7");
                this.lable_name.node.color = tempColor.fromHEX("#FEE6B7");
            }
            else{
                this.lable_lv.node.color = tempColor.fromHEX("#BB420E");
                this.lable_name.node.color = tempColor.fromHEX("#BB420E");
            }

            this.image_frame.spriteFrame = state ? this.frameSprArray[1] : this.frameSprArray[0];
        }
    }
}
