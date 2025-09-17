import baseTs from "../base/baseTs";
import NameTs from "../common/NameTs";
import util from "../util/util";

const { ccclass, property } = cc._decorator;

@ccclass
export default class turretRecycle extends baseTs {

    @property({ displayName: "等级", type: cc.Label })
    levelLabel: cc.Label = null;

    @property({ type: sp.Skeleton, displayName: "炮" })
    paoBody: sp.Skeleton = null;

    @property(cc.Node)
    xingLayout: cc.Node = null;

    //是否在接触
    private isTouch: boolean = false;

    private level: number = null;

    private targetNode: cc.Node;

    private turretData: any;

    onLoad() {
        //拿起
        cc.game.on(NameTs.Game_Turret_PickUp, (res) => {
            this.isTouch = true;
            this.node.opacity = 255;
            this.targetNode = util.GlobalMap.get("turret_" + res.host);
            this.setXingNode();
            if (this.level !== res.level) {
                this.level = res.level;
                this.setLevel();
            }
        }, this);

        //放下
        cc.game.on(NameTs.Game_Turret_PutDown, (res) => {
            this.isTouch = false;
            this.targetNode = null;
            this.node.setPosition(cc.winSize.width, 0);

        }, this);
    }

    update() {
        if (this.isTouch && this.targetNode) {
            this.node.setPosition(this.targetNode.getPosition());
        }
    }

    /**
     * 更新炮塔
     */
    setLevel() {
        //炮塔属性
        this.turretData = util.GetTurretData(this.level);
        this.levelLabel.string = String(this.level);
        this.loadSpine(this.paoBody, "pao");
        this.setXingNode();
    }

    private setXingNode() {
        this.xingLayout.active = this.level >= 39;
        if (this.xingLayout.active) {
            let xingData = util.getLevelXing(this.level);
            for (let i = 0; i < this.xingLayout.children.length; i++) {
                this.xingLayout.children[i].active = i < xingData.iconCount;
            }
        }
    }

    /**
     * 加载图片
     */
    loadSpine(spine: sp.Skeleton, name: string) {
        cc.resources.load("spine/turret/" + this.turretData.DynamicResources + "/" + name + "/" + this.turretData.spineName, sp.SkeletonData, (error, sp: sp.SkeletonData) => {
            spine.skeletonData = sp;
        });

    }
}
