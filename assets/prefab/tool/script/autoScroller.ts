enum Arrangement //排序枚举
{
    Horizontal = 1, //水平
    Vertical = 2,   //垂直
    Grid = 3,       //表格
}

const { ccclass, property } = cc._decorator;

@ccclass
export default class autoScroller extends cc.Component {

    @property(cc.Node)
    private content: cc.Node = null;

    @property(cc.Prefab)
    private preItem: cc.Prefab = null;

    @property(cc.ScrollView)
    private scrollView: cc.ScrollView = null;

    private items = [];

    private updateTimer = 0;            //更新时间

    private updateInterval = 0.2;       //更新间隔

    private lastContentPosY = 0;        //使用这个变量来判断是上还是下

    private lastContentPosX = 0;        //使用这个变量来判断是左还是右

    private totalCount = 50;            //整个列表需要多少    

    private inviteAllData = [];         //列表全部信息

    private isOnceEnter = true;         //是否第一次进入
 
    @property({ type: cc.String, displayName: "脚本名(需要setData,getItemId)" })
    private tsName:cc.String = "tuJianItem";

    @property({ type: cc.Integer, displayName: "实际上要生成多少" })
    private spawnCount: number = 8;

    @property({ type: cc.Enum(Arrangement), displayName: "排序枚举" })
    private arrangement: Arrangement = Arrangement.Horizontal;

    @property({ type: cc.Integer, displayName: "间距X", visible() { return (this.arrangement == Arrangement.Horizontal || this.arrangement == Arrangement.Grid); } })
    private spacingX: number = 8;

    @property({ type: cc.Integer, displayName: "间距Y", visible() { return (this.arrangement == Arrangement.Vertical || this.arrangement == Arrangement.Grid); } })
    private spacingY: number = 8;

    @property({ type: cc.Integer, displayName: "每行最多多少个", visible() { return (this.arrangement == Arrangement.Grid); } })
    private spaceMaxNum: number = 8;

    private bufferZone: number = 600; //当物品不在bufferZone时，我们重新放置它    

    onLoad() {
        
    }

    public setData(data: Array<any>) {
        this.inviteAllData = data;
        this.totalCount = data.length;
        if (this.isOnceEnter) {
            this.isOnceEnter = false;
            this.initialize();
        }
    }

    onEnable() {

    }

    onDisable() {

    }

    start() {

    }

    update(dt) {
        this.updateTimer += dt;
        if (this.updateTimer < this.updateInterval) return; //we don't need to do the math every frame
        this.updateTimer = 0;
        if (this.arrangement == Arrangement.Vertical) {
            this.verticalFun();
        }
        else if (this.arrangement == Arrangement.Horizontal) {
            this.horizontalFun();
        }
        else if (this.arrangement == Arrangement.Grid) {
            this.gridFun();
        }
    }

    //竖排
    verticalFun() {
        let items = this.items;
        let buffer = this.bufferZone;
        let isDown = this.scrollView.content.y < this.lastContentPosY; // scrolling direction        
        let offset = (this.preItem.data.height + this.spacingY) * this.items.length;
        for (let i = 0; i < items.length; ++i) {
            let viewPos = this.getPositionInView(items[i]);
            if (isDown) {
                if (viewPos.y < -buffer && items[i].y + offset < 0) {
                    items[i].y = items[i].y + offset;
                    let item = items[i].getComponent(this.tsName);
                    let itemId = item.getItemId() - items.length;
                    item.getComponent(this.tsName).setData(itemId, this.inviteAllData[itemId]);
                }
            } else {
                if (viewPos.y > buffer && items[i].y - offset > -this.content.height) {
                    items[i].y = items[i].y - offset;
                    let item = items[i].getComponent(this.tsName);
                    let itemId = item.getItemId() + items.length;
                    item.getComponent(this.tsName).setData(itemId, this.inviteAllData[itemId]);
                }
            }
        }
        this.lastContentPosY = this.scrollView.content.y;
    }

    //横排
    horizontalFun() {
        let items = this.items;
        let buffer = this.bufferZone;
        let isRight = this.scrollView.content.x > this.lastContentPosX; // scrolling direction       
        let offset = (this.preItem.data.width + this.spacingX) * this.items.length; 
        for (let i = 0; i < items.length; ++i) {
            let viewPos = this.getPositionInView(items[i]);
            if (isRight) {
                if (viewPos.x > buffer && items[i].x - offset > 0) {
                    items[i].x = items[i].x - offset;
                    let item = items[i].getComponent(this.tsName);
                    let itemId = item.getItemId() - items.length;
                    item.getComponent(this.tsName).setData(itemId, this.inviteAllData[itemId]);
                }
            } else {
                if (viewPos.x < -buffer && items[i].x + offset < this.content.width) {
                    items[i].x = items[i].x + offset;
                    let item = items[i].getComponent(this.tsName);
                    let itemId = item.getItemId() + items.length;
                    item.getComponent(this.tsName).setData(itemId, this.inviteAllData[itemId]);
                }
            }
        }
        this.lastContentPosX = this.scrollView.content.x;
    }

    //表格
    gridFun() {
        let items = this.items;
        let buffer = this.bufferZone;
        let isDown = this.scrollView.content.y < this.lastContentPosY; // scrolling direction                
        let offset = (this.preItem.data.height + this.spacingY) * Math.ceil(this.items.length / this.spaceMaxNum);

        for (let i = 0; i < items.length; ++i) {
            let viewPos = this.getPositionInView(items[i]);
            if (isDown) {
                if (viewPos.y < -buffer && items[i].y + offset < 0) {
                    let item = items[i].getComponent(this.tsName);
                    let itemId = item.getItemId() - items.length;
                    if(this.inviteAllData[itemId]){
                        items[i].y = items[i].y + offset;
                        item.getComponent(this.tsName).setData(itemId, this.inviteAllData[itemId]);
                    }
                }
            } else {
                if (viewPos.y > buffer && items[i].y - offset > -this.content.height) {
                    let item = items[i].getComponent(this.tsName);
                    let itemId = item.getItemId() + items.length;
                    if(this.inviteAllData[itemId]){
                        items[i].y = items[i].y - offset;
                        item.getComponent(this.tsName).setData(itemId, this.inviteAllData[itemId]);
                    }
                }
            }
        }        
        this.lastContentPosY = this.scrollView.content.y;        
    }

    private initialize() {
        if (this.arrangement == Arrangement.Vertical) {
            // this.content.anchorX = 0.5;
            // this.content.anchorY = 1;            

            this.content.height = this.totalCount * (this.preItem.data.height + this.spacingY) + this.spacingY;
            for (let i = 0; i < this.spawnCount; ++i) {
                let item = cc.instantiate(this.preItem);
                this.content.addChild(item);
                item.setPosition(0, -item.height * (0.5 + i) - this.spacingY * (i + 1));
                item.getComponent(this.tsName).setData(i, this.inviteAllData[i]);
                this.items.push(item);
            }
            this.bufferZone = this.scrollView.node.height;
        }
        else if (this.arrangement == Arrangement.Horizontal) {
            // this.content.anchorX = 0;
            // this.content.anchorY = 0.5;            
            this.content.width = this.totalCount * (this.preItem.data.width + this.spacingX) + this.spacingX;

            for (let i = 0; i < this.spawnCount; ++i) {
                let item = cc.instantiate(this.preItem);
                this.content.addChild(item);
                item.setPosition(item.width * (0.5 + i) + this.spacingX * (i + 1), 0);
                item.getComponent(this.tsName).setData(i, this.inviteAllData[i]);
                this.items.push(item);
            }

            this.bufferZone = this.scrollView.node.width;
        }
        else if (this.arrangement == Arrangement.Grid) {
            // this.content.anchorX = 0;
            // this.content.anchorY = 1;            

            let lineNum = Math.ceil(this.totalCount / this.spaceMaxNum);
            this.content.width = this.spaceMaxNum * (this.preItem.data.width + this.spacingX) + this.spacingX;
            this.content.height = lineNum * (this.preItem.data.height + this.spacingY) + this.spacingY;

            if (this.spawnCount % 2 != 0) {
                this.spawnCount += 1;
            }

            let creatNum = 0;
            for (let i = 0; i < lineNum; i++) {
                for (let j = 0; j < this.spaceMaxNum; j++) {
                    if (creatNum < this.spawnCount) {
                        let item = cc.instantiate(this.preItem);
                        this.content.addChild(item);
                        item.setPosition(item.width * (0.5 + j) + this.spacingX * (j + 1), -item.height * (0.5 + i) - this.spacingY * (i + 1));
                        item.getComponent(this.tsName).setData(creatNum, this.inviteAllData[creatNum]);
                        this.items.push(item);
                        creatNum++;
                    }
                }
            }

            this.bufferZone = this.scrollView.node.height;
        }
    }

    private getPositionInView(item) {
        let worldPos = item.parent.convertToWorldSpaceAR(item.position);
        let viewPos = this.scrollView.node.convertToNodeSpaceAR(worldPos);
        return viewPos
    }
}
