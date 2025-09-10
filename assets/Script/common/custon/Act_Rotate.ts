
const { ccclass, property, menu } = cc._decorator;

@ccclass
export class Act_Rotate extends cc.Component {
    @property({ tooltip: '旋转1圈的时间' })
    speed: number = 2;

    protected onLoad() {

    }

    start() {
        cc.tween(this.node)
            .by(this.speed, { angle: 360 })
            .repeatForever()
            .start();
    }
}


