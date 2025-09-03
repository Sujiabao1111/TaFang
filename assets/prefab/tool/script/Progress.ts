const { ccclass, property } = cc._decorator;

@ccclass
export default class Progress extends cc.Component {

    @property(cc.Node)
    rangNode: cc.Node = null;

    rangMaxWidth = 190;               //进度条最大值
    rangAddFrontWidth = 0;          //进度条前进前的宽度
    rangUpdateWidth = 0;            //进度条需要前进到的宽度

    tempAddWidth;

    private progressName = "proGressPlist"
    private startNodePos: cc.Vec2 = null;
    
    private total_pool = {}//对象池
    private total_prefab = {}//特效粒子
    private parent_node: cc.Node = null;

    private targetWidth;

    onLoad() {
        //this.rangMaxWidth = this.rangNode.parent.width;     //设置进度条最大宽度值
        this.parent_node = cc.director.getScene().getChildByName('Canvas');
        this.initEffect();
    }

    onEnable() {
        this.rangNode.width = 0;
    }

    setPercent(percent: number, startNode?: cc.Node) {        
        if (startNode) {
            this.startNodePos = startNode.parent.convertToWorldSpaceAR(startNode.getPosition());
        }
        else {
            this.startNodePos = cc.director.getScene().getChildByName('Canvas').getPosition();
        }
        this.rangAddFrontWidth = this.rangNode.width;                 //没前进前的宽度
        this.rangUpdateWidth = this.rangMaxWidth * percent;           //需要前进到的值               
        if(this.rangNode.width == this.rangUpdateWidth){
            this.rangUpdateWidth = 0;
        }
        else if(this.rangUpdateWidth >= this.rangMaxWidth){
            this.rangUpdateWidth = this.rangMaxWidth;
        }
    }

    setProgressImage(percent:number){
        this.rangNode.width = this.rangMaxWidth * percent;
    }

    update() {
        if (this.rangUpdateWidth) {
            let range = this.rangUpdateWidth;
            if (this.rangNode.width < range) {
                this.rangNode.width += (range - this.rangAddFrontWidth) / 20;
                if (this.rangNode.width >= range) {
                    this.rangNode.width = range;
                }
            }
            if (this.rangNode.width >= range) {
                this.rangUpdateWidth = 0;
            }

            if (this.startNodePos) {
                let cnt = 1;
                for (let i = 0; i < cnt; i++) {
                    let aaa = this.rangNode.parent.convertToWorldSpaceAR(cc.v2(this.rangNode.x, this.rangNode.y));
                    const startWPos = this.parent_node.convertToNodeSpaceAR(this.startNodePos);
                    const targetWPos = this.parent_node.convertToNodeSpaceAR(aaa);
                    const moveOutDurationTime2 = 0.2 + Math.random() * 0.2;
                    const moveToDurationTime = 0.2 + Math.random() * 0.3;
                    this.createEffect(this.progressName, (node, script) => {
                        node.setPosition(startWPos);
                        const radiusTemp = 50 * Math.random() + 10;
                        const radians = cc.misc.degreesToRadians(160 + 360 / cnt * i);
                        const baseV2 = cc.v2(1, 0);
                        const roateV3 = baseV2.rotate(radians).scaleSelf(cc.v2(radiusTemp, radiusTemp));
                        const seq = cc.sequence(
                            cc.moveTo(moveOutDurationTime2, startWPos.add(roateV3)),
                            cc.moveTo(moveToDurationTime, targetWPos).easing(cc.easeOut(1.5)),
                            cc.callFunc(() => {
                                this.removeEffect(this.progressName, node)
                            }),
                        );

                        node.runAction(seq);
                    })
                }
            }
        }
    }

    getCurWidth() {
        return this.rangNode.width;
    }

    getMaxWidth() {
        return this.rangMaxWidth;
    }

    initEffect() {
        cc.loader.loadResDir(`Effect/${this.progressName}`, cc.Prefab, function (err, assets, urls) {
            if (err) {
                console.error("加载失败")
                return
            }
            if(this.total_prefab){
                for (let m in assets) {
                    if (assets[m]) {
                        this.total_prefab[assets[m].name] = assets[m];
                        this.total_pool[assets[m].name] = new cc.NodePool();
                    }
                }
                console.log(this.total_prefab)
            }
        }.bind(this));
    }

    createEffect(name, succ, parent = this.parent_node) {//生成特效
        if (this.total_prefab && this.total_prefab[name]) {
            let node = null
            if (this.total_pool[name].size() > 0) {
                node = this.total_pool[name].get()
                node.parent = parent;
            } else {
                node = cc.instantiate(this.total_prefab[name])
                node.parent = parent;
            }
            if (node) {
                let script = node.getComponent(name)
                if (succ) succ(node, script)
            }
        }
    }

    removeEffect(name, node, isDestroy = false) {//移除特效
        node.destroy()
    }

    findDefaultParent() {
        return this.parent_node
    }
}
