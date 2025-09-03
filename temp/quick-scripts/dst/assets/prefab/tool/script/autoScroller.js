
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/prefab/tool/script/autoScroller.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xccHJlZmFiXFx0b29sXFxzY3JpcHRcXGF1dG9TY3JvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFLLFdBS0o7QUFMRCxXQUFLLFdBQVc7SUFFWix5REFBYyxDQUFBO0lBQ2QscURBQVksQ0FBQTtJQUNaLDZDQUFRLENBQUE7QUFDWixDQUFDLEVBTEksV0FBVyxLQUFYLFdBQVcsUUFLZjtBQUVLLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTBDLGdDQUFZO0lBQXREO1FBQUEscUVBOE9DO1FBM09XLGFBQU8sR0FBWSxJQUFJLENBQUM7UUFHeEIsYUFBTyxHQUFjLElBQUksQ0FBQztRQUcxQixnQkFBVSxHQUFrQixJQUFJLENBQUM7UUFFakMsV0FBSyxHQUFHLEVBQUUsQ0FBQztRQUVYLGlCQUFXLEdBQUcsQ0FBQyxDQUFDLENBQVksTUFBTTtRQUVsQyxvQkFBYyxHQUFHLEdBQUcsQ0FBQyxDQUFPLE1BQU07UUFFbEMscUJBQWUsR0FBRyxDQUFDLENBQUMsQ0FBUSxnQkFBZ0I7UUFFNUMscUJBQWUsR0FBRyxDQUFDLENBQUMsQ0FBUSxnQkFBZ0I7UUFFNUMsZ0JBQVUsR0FBRyxFQUFFLENBQUMsQ0FBWSxjQUFjO1FBRTFDLG1CQUFhLEdBQUcsRUFBRSxDQUFDLENBQVMsUUFBUTtRQUVwQyxpQkFBVyxHQUFHLElBQUksQ0FBQyxDQUFTLFNBQVM7UUFHckMsWUFBTSxHQUFhLFlBQVksQ0FBQztRQUdoQyxnQkFBVSxHQUFXLENBQUMsQ0FBQztRQUd2QixpQkFBVyxHQUFnQixXQUFXLENBQUMsVUFBVSxDQUFDO1FBR2xELGNBQVEsR0FBVyxDQUFDLENBQUM7UUFHckIsY0FBUSxHQUFXLENBQUMsQ0FBQztRQUdyQixpQkFBVyxHQUFXLENBQUMsQ0FBQztRQUV4QixnQkFBVSxH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Iiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJlbnVtIEFycmFuZ2VtZW50IC8v5o6S5bqP5p6a5Li+XHJcbntcclxuICAgIEhvcml6b250YWwgPSAxLCAvL+awtOW5s1xyXG4gICAgVmVydGljYWwgPSAyLCAgIC8v5Z6C55u0XHJcbiAgICBHcmlkID0gMywgICAgICAgLy/ooajmoLxcclxufVxyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGF1dG9TY3JvbGxlciBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIGNvbnRlbnQ6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBwcml2YXRlIHByZUl0ZW06IGNjLlByZWZhYiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlNjcm9sbFZpZXcpXHJcbiAgICBwcml2YXRlIHNjcm9sbFZpZXc6IGNjLlNjcm9sbFZpZXcgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgaXRlbXMgPSBbXTtcclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZVRpbWVyID0gMDsgICAgICAgICAgICAvL+abtOaWsOaXtumXtFxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlSW50ZXJ2YWwgPSAwLjI7ICAgICAgIC8v5pu05paw6Ze06ZqUXHJcblxyXG4gICAgcHJpdmF0ZSBsYXN0Q29udGVudFBvc1kgPSAwOyAgICAgICAgLy/kvb/nlKjov5nkuKrlj5jph4/mnaXliKTmlq3mmK/kuIrov5jmmK/kuItcclxuXHJcbiAgICBwcml2YXRlIGxhc3RDb250ZW50UG9zWCA9IDA7ICAgICAgICAvL+S9v+eUqOi/meS4quWPmOmHj+adpeWIpOaWreaYr+W3pui/mOaYr+WPs1xyXG5cclxuICAgIHByaXZhdGUgdG90YWxDb3VudCA9IDUwOyAgICAgICAgICAgIC8v5pW05Liq5YiX6KGo6ZyA6KaB5aSa5bCRICAgIFxyXG5cclxuICAgIHByaXZhdGUgaW52aXRlQWxsRGF0YSA9IFtdOyAgICAgICAgIC8v5YiX6KGo5YWo6YOo5L+h5oGvXHJcblxyXG4gICAgcHJpdmF0ZSBpc09uY2VFbnRlciA9IHRydWU7ICAgICAgICAgLy/mmK/lkKbnrKzkuIDmrKHov5vlhaVcclxuIFxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuU3RyaW5nLCBkaXNwbGF5TmFtZTogXCLohJrmnKzlkI0o6ZyA6KaBc2V0RGF0YSxnZXRJdGVtSWQpXCIgfSlcclxuICAgIHByaXZhdGUgdHNOYW1lOmNjLlN0cmluZyA9IFwidHVKaWFuSXRlbVwiO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkludGVnZXIsIGRpc3BsYXlOYW1lOiBcIuWunumZheS4iuimgeeUn+aIkOWkmuWwkVwiIH0pXHJcbiAgICBwcml2YXRlIHNwYXduQ291bnQ6IG51bWJlciA9IDg7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuRW51bShBcnJhbmdlbWVudCksIGRpc3BsYXlOYW1lOiBcIuaOkuW6j+aemuS4vlwiIH0pXHJcbiAgICBwcml2YXRlIGFycmFuZ2VtZW50OiBBcnJhbmdlbWVudCA9IEFycmFuZ2VtZW50Lkhvcml6b250YWw7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuSW50ZWdlciwgZGlzcGxheU5hbWU6IFwi6Ze06LedWFwiLCB2aXNpYmxlKCkgeyByZXR1cm4gKHRoaXMuYXJyYW5nZW1lbnQgPT0gQXJyYW5nZW1lbnQuSG9yaXpvbnRhbCB8fCB0aGlzLmFycmFuZ2VtZW50ID09IEFycmFuZ2VtZW50LkdyaWQpOyB9IH0pXHJcbiAgICBwcml2YXRlIHNwYWNpbmdYOiBudW1iZXIgPSA4O1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkludGVnZXIsIGRpc3BsYXlOYW1lOiBcIumXtOi3nVlcIiwgdmlzaWJsZSgpIHsgcmV0dXJuICh0aGlzLmFycmFuZ2VtZW50ID09IEFycmFuZ2VtZW50LlZlcnRpY2FsIHx8IHRoaXMuYXJyYW5nZW1lbnQgPT0gQXJyYW5nZW1lbnQuR3JpZCk7IH0gfSlcclxuICAgIHByaXZhdGUgc3BhY2luZ1k6IG51bWJlciA9IDg7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuSW50ZWdlciwgZGlzcGxheU5hbWU6IFwi5q+P6KGM5pyA5aSa5aSa5bCR5LiqXCIsIHZpc2libGUoKSB7IHJldHVybiAodGhpcy5hcnJhbmdlbWVudCA9PSBBcnJhbmdlbWVudC5HcmlkKTsgfSB9KVxyXG4gICAgcHJpdmF0ZSBzcGFjZU1heE51bTogbnVtYmVyID0gODtcclxuXHJcbiAgICBwcml2YXRlIGJ1ZmZlclpvbmU6IG51bWJlciA9IDYwMDsgLy/lvZPnianlk4HkuI3lnKhidWZmZXJab25l5pe277yM5oiR5Lus6YeN5paw5pS+572u5a6DICAgIFxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0RGF0YShkYXRhOiBBcnJheTxhbnk+KSB7XHJcbiAgICAgICAgdGhpcy5pbnZpdGVBbGxEYXRhID0gZGF0YTtcclxuICAgICAgICB0aGlzLnRvdGFsQ291bnQgPSBkYXRhLmxlbmd0aDtcclxuICAgICAgICBpZiAodGhpcy5pc09uY2VFbnRlcikge1xyXG4gICAgICAgICAgICB0aGlzLmlzT25jZUVudGVyID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkVuYWJsZSgpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgb25EaXNhYmxlKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBzdGFydCgpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKGR0KSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVUaW1lciArPSBkdDtcclxuICAgICAgICBpZiAodGhpcy51cGRhdGVUaW1lciA8IHRoaXMudXBkYXRlSW50ZXJ2YWwpIHJldHVybjsgLy93ZSBkb24ndCBuZWVkIHRvIGRvIHRoZSBtYXRoIGV2ZXJ5IGZyYW1lXHJcbiAgICAgICAgdGhpcy51cGRhdGVUaW1lciA9IDA7XHJcbiAgICAgICAgaWYgKHRoaXMuYXJyYW5nZW1lbnQgPT0gQXJyYW5nZW1lbnQuVmVydGljYWwpIHtcclxuICAgICAgICAgICAgdGhpcy52ZXJ0aWNhbEZ1bigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLmFycmFuZ2VtZW50ID09IEFycmFuZ2VtZW50Lkhvcml6b250YWwpIHtcclxuICAgICAgICAgICAgdGhpcy5ob3Jpem9udGFsRnVuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuYXJyYW5nZW1lbnQgPT0gQXJyYW5nZW1lbnQuR3JpZCkge1xyXG4gICAgICAgICAgICB0aGlzLmdyaWRGdW4oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/nq5bmjpJcclxuICAgIHZlcnRpY2FsRnVuKCkge1xyXG4gICAgICAgIGxldCBpdGVtcyA9IHRoaXMuaXRlbXM7XHJcbiAgICAgICAgbGV0IGJ1ZmZlciA9IHRoaXMuYnVmZmVyWm9uZTtcclxuICAgICAgICBsZXQgaXNEb3duID0gdGhpcy5zY3JvbGxWaWV3LmNvbnRlbnQueSA8IHRoaXMubGFzdENvbnRlbnRQb3NZOyAvLyBzY3JvbGxpbmcgZGlyZWN0aW9uICAgICAgICBcclxuICAgICAgICBsZXQgb2Zmc2V0ID0gKHRoaXMucHJlSXRlbS5kYXRhLmhlaWdodCArIHRoaXMuc3BhY2luZ1kpICogdGhpcy5pdGVtcy5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICBsZXQgdmlld1BvcyA9IHRoaXMuZ2V0UG9zaXRpb25JblZpZXcoaXRlbXNbaV0pO1xyXG4gICAgICAgICAgICBpZiAoaXNEb3duKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodmlld1Bvcy55IDwgLWJ1ZmZlciAmJiBpdGVtc1tpXS55ICsgb2Zmc2V0IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zW2ldLnkgPSBpdGVtc1tpXS55ICsgb2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpdGVtID0gaXRlbXNbaV0uZ2V0Q29tcG9uZW50KHRoaXMudHNOYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbUlkID0gaXRlbS5nZXRJdGVtSWQoKSAtIGl0ZW1zLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENvbXBvbmVudCh0aGlzLnRzTmFtZSkuc2V0RGF0YShpdGVtSWQsIHRoaXMuaW52aXRlQWxsRGF0YVtpdGVtSWRdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh2aWV3UG9zLnkgPiBidWZmZXIgJiYgaXRlbXNbaV0ueSAtIG9mZnNldCA+IC10aGlzLmNvbnRlbnQuaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXNbaV0ueSA9IGl0ZW1zW2ldLnkgLSBvZmZzZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBpdGVtc1tpXS5nZXRDb21wb25lbnQodGhpcy50c05hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpdGVtSWQgPSBpdGVtLmdldEl0ZW1JZCgpICsgaXRlbXMubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KHRoaXMudHNOYW1lKS5zZXREYXRhKGl0ZW1JZCwgdGhpcy5pbnZpdGVBbGxEYXRhW2l0ZW1JZF0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubGFzdENvbnRlbnRQb3NZID0gdGhpcy5zY3JvbGxWaWV3LmNvbnRlbnQueTtcclxuICAgIH1cclxuXHJcbiAgICAvL+aoquaOklxyXG4gICAgaG9yaXpvbnRhbEZ1bigpIHtcclxuICAgICAgICBsZXQgaXRlbXMgPSB0aGlzLml0ZW1zO1xyXG4gICAgICAgIGxldCBidWZmZXIgPSB0aGlzLmJ1ZmZlclpvbmU7XHJcbiAgICAgICAgbGV0IGlzUmlnaHQgPSB0aGlzLnNjcm9sbFZpZXcuY29udGVudC54ID4gdGhpcy5sYXN0Q29udGVudFBvc1g7IC8vIHNjcm9sbGluZyBkaXJlY3Rpb24gICAgICAgXHJcbiAgICAgICAgbGV0IG9mZnNldCA9ICh0aGlzLnByZUl0ZW0uZGF0YS53aWR0aCArIHRoaXMuc3BhY2luZ1gpICogdGhpcy5pdGVtcy5sZW5ndGg7IFxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgbGV0IHZpZXdQb3MgPSB0aGlzLmdldFBvc2l0aW9uSW5WaWV3KGl0ZW1zW2ldKTtcclxuICAgICAgICAgICAgaWYgKGlzUmlnaHQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh2aWV3UG9zLnggPiBidWZmZXIgJiYgaXRlbXNbaV0ueCAtIG9mZnNldCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtc1tpXS54ID0gaXRlbXNbaV0ueCAtIG9mZnNldDtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IGl0ZW1zW2ldLmdldENvbXBvbmVudCh0aGlzLnRzTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW1JZCA9IGl0ZW0uZ2V0SXRlbUlkKCkgLSBpdGVtcy5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQodGhpcy50c05hbWUpLnNldERhdGEoaXRlbUlkLCB0aGlzLmludml0ZUFsbERhdGFbaXRlbUlkXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodmlld1Bvcy54IDwgLWJ1ZmZlciAmJiBpdGVtc1tpXS54ICsgb2Zmc2V0IDwgdGhpcy5jb250ZW50LndpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXNbaV0ueCA9IGl0ZW1zW2ldLnggKyBvZmZzZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBpdGVtc1tpXS5nZXRDb21wb25lbnQodGhpcy50c05hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpdGVtSWQgPSBpdGVtLmdldEl0ZW1JZCgpICsgaXRlbXMubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KHRoaXMudHNOYW1lKS5zZXREYXRhKGl0ZW1JZCwgdGhpcy5pbnZpdGVBbGxEYXRhW2l0ZW1JZF0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubGFzdENvbnRlbnRQb3NYID0gdGhpcy5zY3JvbGxWaWV3LmNvbnRlbnQueDtcclxuICAgIH1cclxuXHJcbiAgICAvL+ihqOagvFxyXG4gICAgZ3JpZEZ1bigpIHtcclxuICAgICAgICBsZXQgaXRlbXMgPSB0aGlzLml0ZW1zO1xyXG4gICAgICAgIGxldCBidWZmZXIgPSB0aGlzLmJ1ZmZlclpvbmU7XHJcbiAgICAgICAgbGV0IGlzRG93biA9IHRoaXMuc2Nyb2xsVmlldy5jb250ZW50LnkgPCB0aGlzLmxhc3RDb250ZW50UG9zWTsgLy8gc2Nyb2xsaW5nIGRpcmVjdGlvbiAgICAgICAgICAgICAgICBcclxuICAgICAgICBsZXQgb2Zmc2V0ID0gKHRoaXMucHJlSXRlbS5kYXRhLmhlaWdodCArIHRoaXMuc3BhY2luZ1kpICogTWF0aC5jZWlsKHRoaXMuaXRlbXMubGVuZ3RoIC8gdGhpcy5zcGFjZU1heE51bSk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgbGV0IHZpZXdQb3MgPSB0aGlzLmdldFBvc2l0aW9uSW5WaWV3KGl0ZW1zW2ldKTtcclxuICAgICAgICAgICAgaWYgKGlzRG93bikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZpZXdQb3MueSA8IC1idWZmZXIgJiYgaXRlbXNbaV0ueSArIG9mZnNldCA8IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IGl0ZW1zW2ldLmdldENvbXBvbmVudCh0aGlzLnRzTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW1JZCA9IGl0ZW0uZ2V0SXRlbUlkKCkgLSBpdGVtcy5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5pbnZpdGVBbGxEYXRhW2l0ZW1JZF0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtc1tpXS55ID0gaXRlbXNbaV0ueSArIG9mZnNldDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQodGhpcy50c05hbWUpLnNldERhdGEoaXRlbUlkLCB0aGlzLmludml0ZUFsbERhdGFbaXRlbUlkXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZpZXdQb3MueSA+IGJ1ZmZlciAmJiBpdGVtc1tpXS55IC0gb2Zmc2V0ID4gLXRoaXMuY29udGVudC5oZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IGl0ZW1zW2ldLmdldENvbXBvbmVudCh0aGlzLnRzTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW1JZCA9IGl0ZW0uZ2V0SXRlbUlkKCkgKyBpdGVtcy5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5pbnZpdGVBbGxEYXRhW2l0ZW1JZF0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtc1tpXS55ID0gaXRlbXNbaV0ueSAtIG9mZnNldDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQodGhpcy50c05hbWUpLnNldERhdGEoaXRlbUlkLCB0aGlzLmludml0ZUFsbERhdGFbaXRlbUlkXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICAgICAgdGhpcy5sYXN0Q29udGVudFBvc1kgPSB0aGlzLnNjcm9sbFZpZXcuY29udGVudC55OyAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0aWFsaXplKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmFycmFuZ2VtZW50ID09IEFycmFuZ2VtZW50LlZlcnRpY2FsKSB7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuY29udGVudC5hbmNob3JYID0gMC41O1xyXG4gICAgICAgICAgICAvLyB0aGlzLmNvbnRlbnQuYW5jaG9yWSA9IDE7ICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuaGVpZ2h0ID0gdGhpcy50b3RhbENvdW50ICogKHRoaXMucHJlSXRlbS5kYXRhLmhlaWdodCArIHRoaXMuc3BhY2luZ1kpICsgdGhpcy5zcGFjaW5nWTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNwYXduQ291bnQ7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnByZUl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmFkZENoaWxkKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgaXRlbS5zZXRQb3NpdGlvbigwLCAtaXRlbS5oZWlnaHQgKiAoMC41ICsgaSkgLSB0aGlzLnNwYWNpbmdZICogKGkgKyAxKSk7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmdldENvbXBvbmVudCh0aGlzLnRzTmFtZSkuc2V0RGF0YShpLCB0aGlzLmludml0ZUFsbERhdGFbaV0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYnVmZmVyWm9uZSA9IHRoaXMuc2Nyb2xsVmlldy5ub2RlLmhlaWdodDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5hcnJhbmdlbWVudCA9PSBBcnJhbmdlbWVudC5Ib3Jpem9udGFsKSB7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuY29udGVudC5hbmNob3JYID0gMDtcclxuICAgICAgICAgICAgLy8gdGhpcy5jb250ZW50LmFuY2hvclkgPSAwLjU7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudC53aWR0aCA9IHRoaXMudG90YWxDb3VudCAqICh0aGlzLnByZUl0ZW0uZGF0YS53aWR0aCArIHRoaXMuc3BhY2luZ1gpICsgdGhpcy5zcGFjaW5nWDtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zcGF3bkNvdW50OyArK2kpIHtcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy5wcmVJdGVtKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5hZGRDaGlsZChpdGVtKTtcclxuICAgICAgICAgICAgICAgIGl0ZW0uc2V0UG9zaXRpb24oaXRlbS53aWR0aCAqICgwLjUgKyBpKSArIHRoaXMuc3BhY2luZ1ggKiAoaSArIDEpLCAwKTtcclxuICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KHRoaXMudHNOYW1lKS5zZXREYXRhKGksIHRoaXMuaW52aXRlQWxsRGF0YVtpXSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1zLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuYnVmZmVyWm9uZSA9IHRoaXMuc2Nyb2xsVmlldy5ub2RlLndpZHRoO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLmFycmFuZ2VtZW50ID09IEFycmFuZ2VtZW50LkdyaWQpIHtcclxuICAgICAgICAgICAgLy8gdGhpcy5jb250ZW50LmFuY2hvclggPSAwO1xyXG4gICAgICAgICAgICAvLyB0aGlzLmNvbnRlbnQuYW5jaG9yWSA9IDE7ICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICBsZXQgbGluZU51bSA9IE1hdGguY2VpbCh0aGlzLnRvdGFsQ291bnQgLyB0aGlzLnNwYWNlTWF4TnVtKTtcclxuICAgICAgICAgICAgdGhpcy5jb250ZW50LndpZHRoID0gdGhpcy5zcGFjZU1heE51bSAqICh0aGlzLnByZUl0ZW0uZGF0YS53aWR0aCArIHRoaXMuc3BhY2luZ1gpICsgdGhpcy5zcGFjaW5nWDtcclxuICAgICAgICAgICAgdGhpcy5jb250ZW50LmhlaWdodCA9IGxpbmVOdW0gKiAodGhpcy5wcmVJdGVtLmRhdGEuaGVpZ2h0ICsgdGhpcy5zcGFjaW5nWSkgKyB0aGlzLnNwYWNpbmdZO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuc3Bhd25Db3VudCAlIDIgIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zcGF3bkNvdW50ICs9IDE7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBjcmVhdE51bSA9IDA7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGluZU51bTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuc3BhY2VNYXhOdW07IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjcmVhdE51bSA8IHRoaXMuc3Bhd25Db3VudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IGNjLmluc3RhbnRpYXRlKHRoaXMucHJlSXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5hZGRDaGlsZChpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5zZXRQb3NpdGlvbihpdGVtLndpZHRoICogKDAuNSArIGopICsgdGhpcy5zcGFjaW5nWCAqIChqICsgMSksIC1pdGVtLmhlaWdodCAqICgwLjUgKyBpKSAtIHRoaXMuc3BhY2luZ1kgKiAoaSArIDEpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQodGhpcy50c05hbWUpLnNldERhdGEoY3JlYXROdW0sIHRoaXMuaW52aXRlQWxsRGF0YVtjcmVhdE51bV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1zLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0TnVtKys7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmJ1ZmZlclpvbmUgPSB0aGlzLnNjcm9sbFZpZXcubm9kZS5oZWlnaHQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0UG9zaXRpb25JblZpZXcoaXRlbSkge1xyXG4gICAgICAgIGxldCB3b3JsZFBvcyA9IGl0ZW0ucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihpdGVtLnBvc2l0aW9uKTtcclxuICAgICAgICBsZXQgdmlld1BvcyA9IHRoaXMuc2Nyb2xsVmlldy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHdvcmxkUG9zKTtcclxuICAgICAgICByZXR1cm4gdmlld1Bvc1xyXG4gICAgfVxyXG59XHJcbiJdfQ==