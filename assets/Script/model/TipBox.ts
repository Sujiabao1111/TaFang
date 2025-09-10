import NameTs from "../common/NameTs";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TipBox extends cc.Component {

    @property(cc.Node)
    tipsNode: cc.Node = null;


    protected onLoad(): void {
        this.node.removeAllChildren();
        cc.director.on(NameTs.Show_Toast, res => {
            let tipNode = cc.instantiate(this.tipsNode);
            tipNode.parent = this.node;
            tipNode.position = cc.v3(0, 0, 0)
            tipNode.getChildByName("label").getComponent(cc.Label).string = res;

            this.showMessage(tipNode)
        }, this);
    }

    showMessage(item: cc.Node) {
        item.active = true;
        item.position = cc.v3(0, 0, 0)
        // item.opacity = 255;

        //action
        cc.tween(item)
            .delay(1.3)
            .to(1, { opacity: 0 }, { easing: cc.easing.quintOut })
            .start();

        cc.tween(item)
            .to(1, { position: cc.v3(0, 150) }, { easing: cc.easing.quintOut })
            .delay(0.3)
            .to(1, { position: cc.v3(0, 0) }, { easing: cc.easing.quintOut })
            .call((node: cc.Prefab) => node.destroy())
            .start();


        // cc.tween(item).to(1, { y: 250 }).to(0.8, { opacity: 0 }).call(() => {
        //     item.destroy();
        // }).start();
    }

    // showSpecailMessage(text: string, position: cc.Vec3, delayTime: number = 2) {
    //     this.tip_label.string = text
    //     this.node.position = position
    //     this.node.opacity = 255
    //     this.node.runAction(cc.sequence(cc.moveBy(delayTime / 2, 0, 100), cc.delayTime(delayTime / 4), cc.fadeOut(delayTime / 4), cc.callFunc(() => {
    //         this.node.active = false;
    //     })))

    // }

    // update (dt) {}
}
