/*
 * @Descripttion: 用于控制奖励的收发
 * @version: 
 * @Author: mies
 * @Date: 2021-02-24 10:28:56
 * @LastEditors: mies
 * @LastEditTime: 2021-02-25 10:41:27
 */
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { propType, updateType } from "../common/faceTs";
import util from "../util/util";

const { ccclass, property } = cc._decorator;
const PointName = [
    "金币",
    "红包",
    "炮台"
]
const PropName = ["冰冻", "电击", "护罩", "清屏", "自动合成", "增能"]
@ccclass
export default class RewardController extends cc.Component {
    public static instance: RewardController = null
    @property([cc.SpriteFrame])
    pointSprite: Array<cc.SpriteFrame> = []
    @property([cc.SpriteFrame])
    pointBigSprite: Array<cc.SpriteFrame> = []

    @property([cc.SpriteFrame])
    propSprite: Array<cc.SpriteFrame> = []

    @property([cc.SpriteFrame])
    phoneSprite: Array<cc.SpriteFrame> = []

    onLoad() {
        RewardController.instance = this
    }
    findPointSprite(pointId: number) {
        return this.pointSprite[pointId] || this.pointSprite[0]
    }
    findPointBigSprite(pointId: number) {
        return this.pointBigSprite[pointId] || this.pointBigSprite[0]
    }

    findPropSprite(propId: number) {
        return this.propSprite[propId] || this.propSprite[0]
    }

    findPhoneSprite(propId: number) {
        return this.phoneSprite[propId] || this.phoneSprite[0]
    }
    findPropName(propId: number) {
        return PropName[propId]
    }
    findPointName(pointId: number) {
        return PointName[pointId]
    }
    gainPoint(pointId: number, count: number) {
        if (pointId == updateType.coin) {
            util.addCoin(count)
        } else if (pointId == updateType.product) {
            util.addProduct(count)
        }
    }
    gainProp(propId: number, count: number) {
        let arr: Array<string> = Object.keys(propType)
        util.userData.prop[arr[propId - 1]].num += count
    }
    /**
     * 播放一个贝塞尔曲线的播放轨迹,用于金币，砖石，道具飞入背包
     * @param spriteFrame 
     * @param startNode 
     * @param target 
     * @param callback 
     * @param scale 
     */
    playAnimate(spriteFrame: cc.SpriteFrame, startNode: cc.Node, targetNode: cc.Node, callback: Function) {
        let canvasNode = cc.director.getScene().getChildByName('Canvas');
        let startPos = canvasNode.convertToNodeSpaceAR(startNode.convertToWorldSpaceAR(cc.v2(0, 0)));
        let endPos = canvasNode.convertToNodeSpaceAR(targetNode.convertToWorldSpaceAR(cc.v2(0, 0)));

        let node = new cc.Node();
        node.setContentSize(136, 136);
        node.zIndex = 2001;
        node.setPosition(startPos);
        let sprite = node.addComponent(cc.Sprite);
        sprite.spriteFrame = spriteFrame;
        sprite.type = cc.Sprite.Type.SIMPLE;
        sprite.sizeMode = cc.Sprite.SizeMode.RAW;
        sprite.trim = false;
        node.parent = canvasNode;
        let actions = [];
        let midPos = cc.v2(startPos.x + 150, startPos.y - 150);
        let bezier = [startPos, midPos, endPos];
        let bezierTo = cc.bezierTo(0.5, bezier);
        let scaleTo = cc.scaleTo(0.5, 0.3, 0.3)
        actions.push(cc.delayTime(0.3));
        actions.push(cc.spawn(scaleTo, bezierTo));
        actions.push(cc.fadeOut(0.2))
        actions.push(cc.callFunc(() => {
            node.destroy();
            callback && callback(targetNode);
        }))

        node.runAction(cc.sequence(actions));
    }
}
