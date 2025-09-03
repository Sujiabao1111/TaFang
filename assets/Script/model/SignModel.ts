import util from "../util/util";

let propPacakgeName = ["", "开局道具包", "局内道具包"]

const { ccclass, property } = cc._decorator;

@ccclass
export default class PageSignReward extends cc.Component{

    @property(cc.Node)
    img_single:cc.Node = null;

    @property(cc.Node)
    img_double:cc.Node = null;
    
    @property(cc.Label)
    lable_reward:cc.Label = null;

    @property(cc.Label)
    lable_propNum:cc.Label = null;

    @property(cc.SpriteFrame)
    bg_image_list:Array<cc.SpriteFrame> = [];

    @property(cc.Sprite)
    img_frame:cc.Sprite = null;

    @property(cc.Label)
    day_label:cc.Label = null;

    @property(cc.Node)
    check_node:cc.Node = null;

    @property(cc.Node)
    img_signMask:cc.Node = null;

    day = null;
    data = null;
    isPropPackage = null;
    rewardList = null;
    showDouble = null;
    hasGain = null;
    isCurrent = null;
    isSeven = null;    
    isNewGain = null;

    init(data) {
        this.day = data.day
        this.data = data
        this.isPropPackage = data.isPropPackage
        this.rewardList = data.rewardList
        this.showDouble = data.showDouble
        this.hasGain = data.hasGain
        this.isCurrent = data.isCurrent
        this.isSeven = data.day == 7        
        this.day_label.string = this.day; 
        //this.img_prop.node.opacity = this.hasGain ? 153 : 255
        this.updateUI()
    }

    updateIsNewGain() {
        this.isNewGain = true
    }

    updateUI() {     
        if(this.img_single && this.img_double){
            this.img_single.active = false;
            this.img_double.active = false;
        }

        if (this.rewardList && this.rewardList[0]) {
            let item = this.rewardList[0]
            let isPoint = false
            if (this.isPropPackage) {
                this.lable_reward.string = propPacakgeName[this.isPropPackage]
                //this.img_prop.spriteFrame = this.pacakge_image_list[this.isPropPackage]
                this.lable_propNum.string = this.showDouble ? "x2" : ""
                this.lable_propNum.node.active = Number(this.lable_propNum.string) > 1
                this.lable_reward.fontSize = this.day == 7 ? 28 : 20;
            } else {
                if(!this.isSeven && this.day != 3){
                    // AssistCtr.findPropSprite(item.type, item.keyId, (spr)=>{
                    //     this.img_prop.spriteFrame = spr;
                    // })
                }
                let reward_prop_text = ""
                if (item.type == 1) {
                    reward_prop_text = this.showDouble ? item.rewardPlusValue : item.rewardValue
                    reward_prop_text = Number(reward_prop_text) > 1 ? "x" + reward_prop_text : ""                    
                    this.lable_propNum.string = reward_prop_text
                    this.lable_reward.fontSize = 20
                } else {
                    if(this.day != 3 && this.day != 7){
                        this.lable_reward.string = this.showDouble ? item.rewardPlusValue : item.rewardValue;
                    }                    
                    else{
                        let gold = this.showDouble ? item.rewardPlusValue : item.rewardValue; 
                        // this.lable_reward.string = `${gold/util.userData.exchangeRate}元`;     
                        this.lable_reward.string = gold;     
                    }
                    if(this.isSeven || this.day == 3){
                        //this.lable_reward.string = `${parseInt(this.lable_reward.string) / GameInfo.getChangeRate()}元`;
                    }                    
                    this.lable_reward.fontSize = 28
                    this.lable_propNum.string = reward_prop_text
                    isPoint = true
                }
            }                
            let reward_prop_color = this.isCurrent && !this.hasGain ? new cc.Color(83, 158, 13, 255) : new cc.Color(197, 102, 0, 255)    
            
            let tempColor = new cc.Color();
            if(this.isCurrent && !this.hasGain){
                this.lable_reward.node.color = tempColor.fromHEX(`#E50000`);
            }
            else{
                this.lable_reward.node.color = tempColor.fromHEX(`#E6682A`);
            }            


            if (this.isSeven) {
                if (!this.hasGain && !this.isCurrent) {                    
                    reward_prop_color = new cc.Color(68, 130, 245, 255)
                }                           
            }
            if (this.lable_reward) {
                this.lable_reward.node.active = true;

                if(!this.isSeven){
                    //this.lable_reward.getComponent(cc.LabelOutline).color = reward_color;
                }                
            }
            if (this.lable_propNum) {
                this.lable_propNum.node.active = !isPoint
                this.lable_propNum.getComponent(cc.LabelOutline).color = reward_prop_color
            }

            
            // if (this.data.userPeriod >= 1 && (this.isSeven || this.day == 3)) {
            //     this.lable_reward.string = "红包币";                   
            // }


        }

        if(this.img_single && this.img_double && this.day != 3){
            if(this.showDouble){
                this.img_double.active = true;
                //this.img_double.opacity = this.hasGain ? 153 : 255
    
                this.img_single.active = false;            
            }
            else{
                this.img_double.active = false;
    
                this.img_single.active = true;
                //this.img_single.opacity = this.hasGain ? 153 : 255
            }
        }


        this.check_node.active = this.hasGain
        if (this.hasGain) {
            if (this.isNewGain) {
                this.isNewGain = false            
                this.check_node.active = true;                
            } 
            //this.node.opacity = 204;
            this.img_signMask.active = true;
        } else {
            this.check_node.active = false;
            //this.node.opacity = 255;
            this.img_signMask.active = false;
        }
        
        if (this.img_frame && !this.isSeven) {
            let key = this.hasGain ? 2 : this.isCurrent ? 1 : 0
            if(key == 2){
                this.img_frame.node.opacity = 204;
            }
            else{
                this.img_frame.node.opacity = 255;
            }

            if(this.hasGain){
                this.img_frame.spriteFrame = this.bg_image_list[1];
            }
            else{
                this.img_frame.spriteFrame = this.bg_image_list[key];
            }                    
        }
    }
};
