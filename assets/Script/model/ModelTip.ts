import baseTs from "../base/baseTs";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ModelTip extends baseTs {

    @property(cc.Label)
    tip_label: cc.Label = null;

    showMessage(text: string) {
        this.tip_label.string = text
        this.node.active = true;        
        this.node.position = cc.v3(0, 0, 0)
        this.node.opacity = 255;
        // this.node.runAction(cc.sequence(cc.moveBy(1, 0, 100), cc.fadeOut(0.5), cc.callFunc(() => {
        //     this.node.active = true;
        // })));
        cc.tween(this.node).to(1,{y:100}).to(.5,{opacity:0}).call(()=>{
            this.node.active = false;
        }).start();
    }
    showSpecailMessage(text: string, position: cc.Vec3, delayTime: number = 2) {
        this.tip_label.string = text
        this.node.position = position
        this.node.opacity = 255
        this.node.runAction(cc.sequence(cc.moveBy(delayTime / 2, 0, 100), cc.delayTime(delayTime / 4), cc.fadeOut(delayTime / 4), cc.callFunc(() => {
            this.node.active = false;
        })))

    }
}
