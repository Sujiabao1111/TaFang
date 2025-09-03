/*
 * @Descripttion: 
 * @version: 
 * @Author: mies
 * @Date: 2021-02-23 17:14:05
 * @LastEditors: mies
 * @LastEditTime: 2021-02-24 11:40:04
 */

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewBigWheelMarquee extends cc.Component {
    //获得奖励轮播
    @property(cc.Node)
    marqueeList: cc.Node = null
    @property(cc.Node)
    marqueeBg: cc.Node = null
    @property(cc.Prefab)
    marqueeItemPrefab: cc.Prefab = null

    start() {

    }

    updateMarqueeList(data) {
        if (!data.prevPeriodList) return;
        this.marqueeList.stopAllActions();
        this.marqueeList.y = 0;
        this.marqueeList.removeAllChildren();
        let totalHeight = 0;
        data.prevPeriodList.map((item, index) => {
            let marqueeItem = cc.instantiate(this.marqueeItemPrefab);
            marqueeItem.getComponent(cc.Label).string = item;
            this.marqueeList.addChild(marqueeItem);
            totalHeight += marqueeItem.height;
        });
        let count = 0;
        let running = cc.tween(this.marqueeList)
            .repeatForever(
                cc.tween()
                    .by(1, { y: totalHeight / data.prevPeriodList.length })
                    .delay(2)
                    .call(() => {
                        count++;
                        if (count >= this.marqueeList.childrenCount - 1) {
                            count = 0;
                            this.marqueeList.y = 0;
                        }
                    })
            );
        this.scheduleOnce(() => {
            running.start();
        }, 0);
    }
}
