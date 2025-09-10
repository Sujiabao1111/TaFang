
const { ccclass, property } = cc._decorator;

@ccclass
export default class Loading extends cc.Component {

    @property(cc.Node)
    icon: cc.Node = null;

    protected onLoad(): void {

    }

    public show(timeOut: number) {
        cc.Tween.stopAllByTarget(this.icon);
        this.icon.angle = 0;
        cc.tween(this.icon)
            .to(4, { angle: -360 })
            .call(() => {
                this.icon.angle = 0;
            })
            .union()
            .repeatForever()
            .start();

        this.scheduleOnce(() => {
            cc.Tween.stopAllByTarget(this.icon);
            this.node.destroy();
        }, timeOut)
    }
}
