import { AssistCtr } from "../Assist/AssistCtr";
import { marquee } from "../pop/gameKingPao";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Marquee extends cc.Component {

    @property(cc.Node)
    marqueeList: cc.Node = null;

    @property(cc.Node)
    lable_marqueeItem: cc.Node = null;


    start () {

    }    

    updateMarqueeList(strArray) {
        this.marqueeList.stopAllActions();
        this.marqueeList.removeAllChildren();
        let totalHeight = 0;
        this.marqueeList.y = 27

        if(strArray.length == 2){
            strArray.push(strArray[0]);
        }        

        if (this.marqueeList.children.length == 0) {
            strArray.map((item:marquee, index) => {
                let marqueeItem = cc.instantiate(this.lable_marqueeItem);
                marqueeItem.getComponent(cc.RichText).string = `${item.msg}   ${item.time}`;
                marqueeItem.active = true;
                this.marqueeList.addChild(marqueeItem);
                totalHeight += marqueeItem.height;
            });
        }
        let count = 0;
        let running = cc.tween(this.marqueeList)
            .repeatForever(
                cc.tween()
                    .by(1, { y: totalHeight / strArray.length })
                    .delay(2)
                    .call(() => {
                        count++;
                        if (count >= this.marqueeList.childrenCount - 1) {
                            count = 0;
                            this.marqueeList.y = 27;
                        }
                    })
            );
        this.scheduleOnce(() => {
            running.start();
        }, 0);
    }
}
