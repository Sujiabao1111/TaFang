"use strict";
cc._RF.push(module, '868a4q2myJNAIc0AKAjVmxE', 'autoScroller');
// prefab/tool/script/autoScroller.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Arrangement;
(function (Arrangement) {
    Arrangement[Arrangement["Horizontal"] = 1] = "Horizontal";
    Arrangement[Arrangement["Vertical"] = 2] = "Vertical";
    Arrangement[Arrangement["Grid"] = 3] = "Grid";
})(Arrangement || (Arrangement = {}));
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var autoScroller = /** @class */ (function (_super) {
    __extends(autoScroller, _super);
    function autoScroller() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.content = null;
        _this.preItem = null;
        _this.scrollView = null;
        _this.items = [];
        _this.updateTimer = 0; //更新时间
        _this.updateInterval = 0.2; //更新间隔
        _this.lastContentPosY = 0; //使用这个变量来判断是上还是下
        _this.lastContentPosX = 0; //使用这个变量来判断是左还是右
        _this.totalCount = 50; //整个列表需要多少    
        _this.inviteAllData = []; //列表全部信息
        _this.isOnceEnter = true; //是否第一次进入
        _this.tsName = "tuJianItem";
        _this.spawnCount = 8;
        _this.arrangement = Arrangement.Horizontal;
        _this.spacingX = 8;
        _this.spacingY = 8;
        _this.spaceMaxNum = 8;
        _this.bufferZone = 600; //当物品不在bufferZone时，我们重新放置它    
        return _this;
    }
    autoScroller.prototype.onLoad = function () {
    };
    autoScroller.prototype.setData = function (data) {
        this.inviteAllData = data;
        this.totalCount = data.length;
        if (this.isOnceEnter) {
            this.isOnceEnter = false;
            this.initialize();
        }
    };
    autoScroller.prototype.onEnable = function () {
    };
    autoScroller.prototype.onDisable = function () {
    };
    autoScroller.prototype.start = function () {
    };
    autoScroller.prototype.update = function (dt) {
        this.updateTimer += dt;
        if (this.updateTimer < this.updateInterval)
            return; //we don't need to do the math every frame
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
    };
    //竖排
    autoScroller.prototype.verticalFun = function () {
        var items = this.items;
        var buffer = this.bufferZone;
        var isDown = this.scrollView.content.y < this.lastContentPosY; // scrolling direction        
        var offset = (this.preItem.data.height + this.spacingY) * this.items.length;
        for (var i = 0; i < items.length; ++i) {
            var viewPos = this.getPositionInView(items[i]);
            if (isDown) {
                if (viewPos.y < -buffer && items[i].y + offset < 0) {
                    items[i].y = items[i].y + offset;
                    var item = items[i].getComponent(this.tsName);
                    var itemId = item.getItemId() - items.length;
                    item.getComponent(this.tsName).setData(itemId, this.inviteAllData[itemId]);
                }
            }
            else {
                if (viewPos.y > buffer && items[i].y - offset > -this.content.height) {
                    items[i].y = items[i].y - offset;
                    var item = items[i].getComponent(this.tsName);
                    var itemId = item.getItemId() + items.length;
                    item.getComponent(this.tsName).setData(itemId, this.inviteAllData[itemId]);
                }
            }
        }
        this.lastContentPosY = this.scrollView.content.y;
    };
    //横排
    autoScroller.prototype.horizontalFun = function () {
        var items = this.items;
        var buffer = this.bufferZone;
        var isRight = this.scrollView.content.x > this.lastContentPosX; // scrolling direction       
        var offset = (this.preItem.data.width + this.spacingX) * this.items.length;
        for (var i = 0; i < items.length; ++i) {
            var viewPos = this.getPositionInView(items[i]);
            if (isRight) {
                if (viewPos.x > buffer && items[i].x - offset > 0) {
                    items[i].x = items[i].x - offset;
                    var item = items[i].getComponent(this.tsName);
                    var itemId = item.getItemId() - items.length;
                    item.getComponent(this.tsName).setData(itemId, this.inviteAllData[itemId]);
                }
            }
            else {
                if (viewPos.x < -buffer && items[i].x + offset < this.content.width) {
                    items[i].x = items[i].x + offset;
                    var item = items[i].getComponent(this.tsName);
                    var itemId = item.getItemId() + items.length;
                    item.getComponent(this.tsName).setData(itemId, this.inviteAllData[itemId]);
                }
            }
        }
        this.lastContentPosX = this.scrollView.content.x;
    };
    //表格
    autoScroller.prototype.gridFun = function () {
        var items = this.items;
        var buffer = this.bufferZone;
        var isDown = this.scrollView.content.y < this.lastContentPosY; // scrolling direction                
        var offset = (this.preItem.data.height + this.spacingY) * Math.ceil(this.items.length / this.spaceMaxNum);
        for (var i = 0; i < items.length; ++i) {
            var viewPos = this.getPositionInView(items[i]);
            if (isDown) {
                if (viewPos.y < -buffer && items[i].y + offset < 0) {
                    var item = items[i].getComponent(this.tsName);
                    var itemId = item.getItemId() - items.length;
                    if (this.inviteAllData[itemId]) {
                        items[i].y = items[i].y + offset;
                        item.getComponent(this.tsName).setData(itemId, this.inviteAllData[itemId]);
                    }
                }
            }
            else {
                if (viewPos.y > buffer && items[i].y - offset > -this.content.height) {
                    var item = items[i].getComponent(this.tsName);
                    var itemId = item.getItemId() + items.length;
                    if (this.inviteAllData[itemId]) {
                        items[i].y = items[i].y - offset;
                        item.getComponent(this.tsName).setData(itemId, this.inviteAllData[itemId]);
                    }
                }
            }
        }
        this.lastContentPosY = this.scrollView.content.y;
    };
    autoScroller.prototype.initialize = function () {
        if (this.arrangement == Arrangement.Vertical) {
            // this.content.anchorX = 0.5;
            // this.content.anchorY = 1;            
            this.content.height = this.totalCount * (this.preItem.data.height + this.spacingY) + this.spacingY;
            for (var i = 0; i < this.spawnCount; ++i) {
                var item = cc.instantiate(this.preItem);
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
            for (var i = 0; i < this.spawnCount; ++i) {
                var item = cc.instantiate(this.preItem);
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
            var lineNum = Math.ceil(this.totalCount / this.spaceMaxNum);
            this.content.width = this.spaceMaxNum * (this.preItem.data.width + this.spacingX) + this.spacingX;
            this.content.height = lineNum * (this.preItem.data.height + this.spacingY) + this.spacingY;
            if (this.spawnCount % 2 != 0) {
                this.spawnCount += 1;
            }
            var creatNum = 0;
            for (var i = 0; i < lineNum; i++) {
                for (var j = 0; j < this.spaceMaxNum; j++) {
                    if (creatNum < this.spawnCount) {
                        var item = cc.instantiate(this.preItem);
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
    };
    autoScroller.prototype.getPositionInView = function (item) {
        var worldPos = item.parent.convertToWorldSpaceAR(item.position);
        var viewPos = this.scrollView.node.convertToNodeSpaceAR(worldPos);
        return viewPos;
    };
    __decorate([
        property(cc.Node)
    ], autoScroller.prototype, "content", void 0);
    __decorate([
        property(cc.Prefab)
    ], autoScroller.prototype, "preItem", void 0);
    __decorate([
        property(cc.ScrollView)
    ], autoScroller.prototype, "scrollView", void 0);
    __decorate([
        property({ type: cc.String, displayName: "脚本名(需要setData,getItemId)" })
    ], autoScroller.prototype, "tsName", void 0);
    __decorate([
        property({ type: cc.Integer, displayName: "实际上要生成多少" })
    ], autoScroller.prototype, "spawnCount", void 0);
    __decorate([
        property({ type: cc.Enum(Arrangement), displayName: "排序枚举" })
    ], autoScroller.prototype, "arrangement", void 0);
    __decorate([
        property({ type: cc.Integer, displayName: "间距X", visible: function () { return (this.arrangement == Arrangement.Horizontal || this.arrangement == Arrangement.Grid); } })
    ], autoScroller.prototype, "spacingX", void 0);
    __decorate([
        property({ type: cc.Integer, displayName: "间距Y", visible: function () { return (this.arrangement == Arrangement.Vertical || this.arrangement == Arrangement.Grid); } })
    ], autoScroller.prototype, "spacingY", void 0);
    __decorate([
        property({ type: cc.Integer, displayName: "每行最多多少个", visible: function () { return (this.arrangement == Arrangement.Grid); } })
    ], autoScroller.prototype, "spaceMaxNum", void 0);
    autoScroller = __decorate([
        ccclass
    ], autoScroller);
    return autoScroller;
}(cc.Component));
exports.default = autoScroller;

cc._RF.pop();