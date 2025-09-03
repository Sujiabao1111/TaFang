
/**
 * @ 图片绕指定圆心进行圆周运动
 */
 
const {ccclass, property} = cc._decorator;
 //电子邮件puhalskijsemen@gmail.com
//源码网站 开vpn全局模式打开 http://web3incubators.com/
//电报https://t.me/gamecode999
@ccclass
export default class spineParticle extends cc.Component {
 
    // 圆心
    @property
    circleCenter: cc.Vec2 = cc.v2(0, 0);
 
    // 半径
    @property
    circleRadius: number = 0;
 
    // 车速
    @property
    carSpeed: number = 30;
 
    // 弧度
    radian: number = 0;
 
    onLoad () {
        //this.circleRadius = this.node.parent.width / 2;        
        //this.schedule(this.circleMove, 0.01);
    }
 
    update (dt) {
        // 先计算弧度
        this.radian += dt * (this.carSpeed/100);
        let x = this.circleRadius * Math.cos(this.radian) + this.circleCenter.x; 
        let y = this.circleRadius * Math.sin(this.radian) + this.circleCenter.y;
        //let angle = 360- 180/Math.PI*this.radian;
        //this.sprCar.node.angle = angle;        
        this.node.x = x;
        this.node.y = y;
    }
}
 
