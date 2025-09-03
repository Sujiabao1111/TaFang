import baseTs from "../base/baseTs";

/*
 * @Descripttion: 
 * @version: 
 * @Author: mies
 * @Date: 2021-02-23 17:14:05
 * @LastEditors: mies
 * @LastEditTime: 2021-03-01 10:20:35
 */
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewBigWheelPrizeAward extends cc.Component {
    @property(cc.Label)
    lable_num: cc.Label = null
    @property(cc.Sprite)
    iconImage: cc.Sprite = null
    @property(cc.Node)
    viewport: cc.Node = null

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onEnable() {
        // this.TempNodeController = Global.TempNode.getComponent('TempNodeController')
        // this.TempNodeController.showNode();
        this.viewport.opacity = 255;
    }

    startAni(spriteFrame, point) {
        this.node.active = true
        this.iconImage.spriteFrame = spriteFrame
        this.lable_num.string = "+" + point
        // let gameIndex = Global.get("playerCurGold");
        // let spriteFrame = this.showImgGold;
        // let userPoint = gameIndex - point;
        // let temp = this.TempNodeController.showComp(userPoint, 2, 2);
        // this.lable_num.string = `+${point}`;

        setTimeout(() => {
            //     this.playAnimate(false, spriteFrame, null, temp, () => {
            //         let temp = this.TempNodeController.showComp(gameIndex, 2, 2);
            //         uiFunc.closeUI("NewBigWheelPrizeAward");
            //     });
            //     this.closePage();
            this.node.active = false
        }, 1500);

    }

    // closeMy(){    
    //     console.log("奖励后进来44");    
    //     uiFunc.closeUI("NewBigWheelPrizeAward");
    // },

    onDisable() {
        // if (this.TempNodeController) this.TempNodeController.hideNode()

        // ClientEvent.dispatch("gold_count", {});
    }

    start() {

    }
    closePage() {

    }
    // update (dt) {},
}
