
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
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
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
        property({ displayName: "脚本名(需要setData,getItemId)" })
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xccHJlZmFiXFx0b29sXFxzY3JpcHRcXGF1dG9TY3JvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFLLFdBS0o7QUFMRCxXQUFLLFdBQVc7SUFFWix5REFBYyxDQUFBO0lBQ2QscURBQVksQ0FBQTtJQUNaLDZDQUFRLENBQUE7QUFDWixDQUFDLEVBTEksV0FBVyxLQUFYLFdBQVcsUUFLZjtBQUVLLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTBDLGdDQUFZO0lBQXREO1FBQUEscUVBOE9DO1FBM09XLGFBQU8sR0FBWSxJQUFJLENBQUM7UUFHeEIsYUFBTyxHQUFjLElBQUksQ0FBQztRQUcxQixnQkFBVSxHQUFrQixJQUFJLENBQUM7UUFFakMsV0FBSyxHQUFHLEVBQUUsQ0FBQztRQUVYLGlCQUFXLEdBQUcsQ0FBQyxDQUFDLENBQVksTUFBTTtRQUVsQyxvQkFBYyxHQUFHLEdBQUcsQ0FBQyxDQUFPLE1BQU07UUFFbEMscUJBQWUsR0FBRyxDQUFDLENBQUMsQ0FBUSxnQkFBZ0I7UUFFNUMscUJBQWUsR0FBRyxDQUFDLENBQUMsQ0FBUSxnQkFBZ0I7UUFFNUMsZ0JBQVUsR0FBRyxFQUFFLENBQUMsQ0FBWSxjQUFjO1FBRTFDLG1CQUFhLEdBQUcsRUFBRSxDQUFDLENBQVMsUUFBUTtRQUVwQyxpQkFBVyxHQUFHLElBQUksQ0FBQyxDQUFTLFNBQVM7UUFHckMsWUFBTSxHQUFXLFlBQVksQ0FBQztRQUc5QixnQkFBVSxHQUFXLENBQUMsQ0FBQztRQUd2QixpQkFBVyxHQUFnQixXQUFXLENBQUMsVUFBVSxDQUFDO1FBR2xELGNBQVEsR0FBVyxDQUFDLENBQUM7UUFHckIsY0FBUSxHQUFXLENBQUMsQ0FBQztRQUdyQixpQkFBVyxHQUFXLENBQUMsQ0FBQztRQUV4QixnQkFBVSxH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dGVudCI6WyJlbnVtIEFycmFuZ2VtZW50IC8v5o6S5bqP5p6a5Li+XHJcbntcclxuICAgIEhvcml6b250YWwgPSAxLCAvL+awtOW5s1xyXG4gICAgVmVydGljYWwgPSAyLCAgIC8v5Z6C55u0XHJcbiAgICBHcmlkID0gMywgICAgICAgLy/ooajmoLxcclxufVxyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGF1dG9TY3JvbGxlciBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIGNvbnRlbnQ6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBwcml2YXRlIHByZUl0ZW06IGNjLlByZWZhYiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlNjcm9sbFZpZXcpXHJcbiAgICBwcml2YXRlIHNjcm9sbFZpZXc6IGNjLlNjcm9sbFZpZXcgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgaXRlbXMgPSBbXTtcclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZVRpbWVyID0gMDsgICAgICAgICAgICAvL+abtOaWsOaXtumXtFxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlSW50ZXJ2YWwgPSAwLjI7ICAgICAgIC8v5pu05paw6Ze06ZqUXHJcblxyXG4gICAgcHJpdmF0ZSBsYXN0Q29udGVudFBvc1kgPSAwOyAgICAgICAgLy/kvb/nlKjov5nkuKrlj5jph4/mnaXliKTmlq3mmK/kuIrov5jmmK/kuItcclxuXHJcbiAgICBwcml2YXRlIGxhc3RDb250ZW50UG9zWCA9IDA7ICAgICAgICAvL+S9v+eUqOi/meS4quWPmOmHj+adpeWIpOaWreaYr+W3pui/mOaYr+WPs1xyXG5cclxuICAgIHByaXZhdGUgdG90YWxDb3VudCA9IDUwOyAgICAgICAgICAgIC8v5pW05Liq5YiX6KGo6ZyA6KaB5aSa5bCRICAgIFxyXG5cclxuICAgIHByaXZhdGUgaW52aXRlQWxsRGF0YSA9IFtdOyAgICAgICAgIC8v5YiX6KGo5YWo6YOo5L+h5oGvXHJcblxyXG4gICAgcHJpdmF0ZSBpc09uY2VFbnRlciA9IHRydWU7ICAgICAgICAgLy/mmK/lkKbnrKzkuIDmrKHov5vlhaVcclxuXHJcbiAgICBAcHJvcGVydHkoeyBkaXNwbGF5TmFtZTogXCLohJrmnKzlkI0o6ZyA6KaBc2V0RGF0YSxnZXRJdGVtSWQpXCIgfSlcclxuICAgIHByaXZhdGUgdHNOYW1lOiBzdHJpbmcgPSBcInR1Smlhbkl0ZW1cIjtcclxuXHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5JbnRlZ2VyLCBkaXNwbGF5TmFtZTogXCLlrp7pmYXkuIropoHnlJ/miJDlpJrlsJFcIiB9KVxyXG4gICAgcHJpdmF0ZSBzcGF3bkNvdW50OiBudW1iZXIgPSA4O1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkVudW0oQXJyYW5nZW1lbnQpLCBkaXNwbGF5TmFtZTogXCLmjpLluo/mnprkuL5cIiB9KVxyXG4gICAgcHJpdmF0ZSBhcnJhbmdlbWVudDogQXJyYW5nZW1lbnQgPSBBcnJhbmdlbWVudC5Ib3Jpem9udGFsO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkludGVnZXIsIGRpc3BsYXlOYW1lOiBcIumXtOi3nVhcIiwgdmlzaWJsZSgpIHsgcmV0dXJuICh0aGlzLmFycmFuZ2VtZW50ID09IEFycmFuZ2VtZW50Lkhvcml6b250YWwgfHwgdGhpcy5hcnJhbmdlbWVudCA9PSBBcnJhbmdlbWVudC5HcmlkKTsgfSB9KVxyXG4gICAgcHJpdmF0ZSBzcGFjaW5nWDogbnVtYmVyID0gODtcclxuXHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5JbnRlZ2VyLCBkaXNwbGF5TmFtZTogXCLpl7Tot51ZXCIsIHZpc2libGUoKSB7IHJldHVybiAodGhpcy5hcnJhbmdlbWVudCA9PSBBcnJhbmdlbWVudC5WZXJ0aWNhbCB8fCB0aGlzLmFycmFuZ2VtZW50ID09IEFycmFuZ2VtZW50LkdyaWQpOyB9IH0pXHJcbiAgICBwcml2YXRlIHNwYWNpbmdZOiBudW1iZXIgPSA4O1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkludGVnZXIsIGRpc3BsYXlOYW1lOiBcIuavj+ihjOacgOWkmuWkmuWwkeS4qlwiLCB2aXNpYmxlKCkgeyByZXR1cm4gKHRoaXMuYXJyYW5nZW1lbnQgPT0gQXJyYW5nZW1lbnQuR3JpZCk7IH0gfSlcclxuICAgIHByaXZhdGUgc3BhY2VNYXhOdW06IG51bWJlciA9IDg7XHJcblxyXG4gICAgcHJpdmF0ZSBidWZmZXJab25lOiBudW1iZXIgPSA2MDA7IC8v5b2T54mp5ZOB5LiN5ZyoYnVmZmVyWm9uZeaXtu+8jOaIkeS7rOmHjeaWsOaUvue9ruWugyAgICBcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXREYXRhKGRhdGE6IEFycmF5PGFueT4pIHtcclxuICAgICAgICB0aGlzLmludml0ZUFsbERhdGEgPSBkYXRhO1xyXG4gICAgICAgIHRoaXMudG90YWxDb3VudCA9IGRhdGEubGVuZ3RoO1xyXG4gICAgICAgIGlmICh0aGlzLmlzT25jZUVudGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNPbmNlRW50ZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uRW5hYmxlKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBvbkRpc2FibGUoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoZHQpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZVRpbWVyICs9IGR0O1xyXG4gICAgICAgIGlmICh0aGlzLnVwZGF0ZVRpbWVyIDwgdGhpcy51cGRhdGVJbnRlcnZhbCkgcmV0dXJuOyAvL3dlIGRvbid0IG5lZWQgdG8gZG8gdGhlIG1hdGggZXZlcnkgZnJhbWVcclxuICAgICAgICB0aGlzLnVwZGF0ZVRpbWVyID0gMDtcclxuICAgICAgICBpZiAodGhpcy5hcnJhbmdlbWVudCA9PSBBcnJhbmdlbWVudC5WZXJ0aWNhbCkge1xyXG4gICAgICAgICAgICB0aGlzLnZlcnRpY2FsRnVuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuYXJyYW5nZW1lbnQgPT0gQXJyYW5nZW1lbnQuSG9yaXpvbnRhbCkge1xyXG4gICAgICAgICAgICB0aGlzLmhvcml6b250YWxGdW4oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5hcnJhbmdlbWVudCA9PSBBcnJhbmdlbWVudC5HcmlkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JpZEZ1bigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+erluaOklxyXG4gICAgdmVydGljYWxGdW4oKSB7XHJcbiAgICAgICAgbGV0IGl0ZW1zID0gdGhpcy5pdGVtcztcclxuICAgICAgICBsZXQgYnVmZmVyID0gdGhpcy5idWZmZXJab25lO1xyXG4gICAgICAgIGxldCBpc0Rvd24gPSB0aGlzLnNjcm9sbFZpZXcuY29udGVudC55IDwgdGhpcy5sYXN0Q29udGVudFBvc1k7IC8vIHNjcm9sbGluZyBkaXJlY3Rpb24gICAgICAgIFxyXG4gICAgICAgIGxldCBvZmZzZXQgPSAodGhpcy5wcmVJdGVtLmRhdGEuaGVpZ2h0ICsgdGhpcy5zcGFjaW5nWSkgKiB0aGlzLml0ZW1zLmxlbmd0aDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgIGxldCB2aWV3UG9zID0gdGhpcy5nZXRQb3NpdGlvbkluVmlldyhpdGVtc1tpXSk7XHJcbiAgICAgICAgICAgIGlmIChpc0Rvd24pIHtcclxuICAgICAgICAgICAgICAgIGlmICh2aWV3UG9zLnkgPCAtYnVmZmVyICYmIGl0ZW1zW2ldLnkgKyBvZmZzZXQgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXNbaV0ueSA9IGl0ZW1zW2ldLnkgKyBvZmZzZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBpdGVtc1tpXS5nZXRDb21wb25lbnQodGhpcy50c05hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpdGVtSWQgPSBpdGVtLmdldEl0ZW1JZCgpIC0gaXRlbXMubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KHRoaXMudHNOYW1lKS5zZXREYXRhKGl0ZW1JZCwgdGhpcy5pbnZpdGVBbGxEYXRhW2l0ZW1JZF0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZpZXdQb3MueSA+IGJ1ZmZlciAmJiBpdGVtc1tpXS55IC0gb2Zmc2V0ID4gLXRoaXMuY29udGVudC5oZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtc1tpXS55ID0gaXRlbXNbaV0ueSAtIG9mZnNldDtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IGl0ZW1zW2ldLmdldENvbXBvbmVudCh0aGlzLnRzTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW1JZCA9IGl0ZW0uZ2V0SXRlbUlkKCkgKyBpdGVtcy5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQodGhpcy50c05hbWUpLnNldERhdGEoaXRlbUlkLCB0aGlzLmludml0ZUFsbERhdGFbaXRlbUlkXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sYXN0Q29udGVudFBvc1kgPSB0aGlzLnNjcm9sbFZpZXcuY29udGVudC55O1xyXG4gICAgfVxyXG5cclxuICAgIC8v5qiq5o6SXHJcbiAgICBob3Jpem9udGFsRnVuKCkge1xyXG4gICAgICAgIGxldCBpdGVtcyA9IHRoaXMuaXRlbXM7XHJcbiAgICAgICAgbGV0IGJ1ZmZlciA9IHRoaXMuYnVmZmVyWm9uZTtcclxuICAgICAgICBsZXQgaXNSaWdodCA9IHRoaXMuc2Nyb2xsVmlldy5jb250ZW50LnggPiB0aGlzLmxhc3RDb250ZW50UG9zWDsgLy8gc2Nyb2xsaW5nIGRpcmVjdGlvbiAgICAgICBcclxuICAgICAgICBsZXQgb2Zmc2V0ID0gKHRoaXMucHJlSXRlbS5kYXRhLndpZHRoICsgdGhpcy5zcGFjaW5nWCkgKiB0aGlzLml0ZW1zLmxlbmd0aDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgIGxldCB2aWV3UG9zID0gdGhpcy5nZXRQb3NpdGlvbkluVmlldyhpdGVtc1tpXSk7XHJcbiAgICAgICAgICAgIGlmIChpc1JpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodmlld1Bvcy54ID4gYnVmZmVyICYmIGl0ZW1zW2ldLnggLSBvZmZzZXQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXNbaV0ueCA9IGl0ZW1zW2ldLnggLSBvZmZzZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBpdGVtc1tpXS5nZXRDb21wb25lbnQodGhpcy50c05hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpdGVtSWQgPSBpdGVtLmdldEl0ZW1JZCgpIC0gaXRlbXMubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KHRoaXMudHNOYW1lKS5zZXREYXRhKGl0ZW1JZCwgdGhpcy5pbnZpdGVBbGxEYXRhW2l0ZW1JZF0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZpZXdQb3MueCA8IC1idWZmZXIgJiYgaXRlbXNbaV0ueCArIG9mZnNldCA8IHRoaXMuY29udGVudC53aWR0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zW2ldLnggPSBpdGVtc1tpXS54ICsgb2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpdGVtID0gaXRlbXNbaV0uZ2V0Q29tcG9uZW50KHRoaXMudHNOYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbUlkID0gaXRlbS5nZXRJdGVtSWQoKSArIGl0ZW1zLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENvbXBvbmVudCh0aGlzLnRzTmFtZSkuc2V0RGF0YShpdGVtSWQsIHRoaXMuaW52aXRlQWxsRGF0YVtpdGVtSWRdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxhc3RDb250ZW50UG9zWCA9IHRoaXMuc2Nyb2xsVmlldy5jb250ZW50Lng7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ooajmoLxcclxuICAgIGdyaWRGdW4oKSB7XHJcbiAgICAgICAgbGV0IGl0ZW1zID0gdGhpcy5pdGVtcztcclxuICAgICAgICBsZXQgYnVmZmVyID0gdGhpcy5idWZmZXJab25lO1xyXG4gICAgICAgIGxldCBpc0Rvd24gPSB0aGlzLnNjcm9sbFZpZXcuY29udGVudC55IDwgdGhpcy5sYXN0Q29udGVudFBvc1k7IC8vIHNjcm9sbGluZyBkaXJlY3Rpb24gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgbGV0IG9mZnNldCA9ICh0aGlzLnByZUl0ZW0uZGF0YS5oZWlnaHQgKyB0aGlzLnNwYWNpbmdZKSAqIE1hdGguY2VpbCh0aGlzLml0ZW1zLmxlbmd0aCAvIHRoaXMuc3BhY2VNYXhOdW0pO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgIGxldCB2aWV3UG9zID0gdGhpcy5nZXRQb3NpdGlvbkluVmlldyhpdGVtc1tpXSk7XHJcbiAgICAgICAgICAgIGlmIChpc0Rvd24pIHtcclxuICAgICAgICAgICAgICAgIGlmICh2aWV3UG9zLnkgPCAtYnVmZmVyICYmIGl0ZW1zW2ldLnkgKyBvZmZzZXQgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBpdGVtc1tpXS5nZXRDb21wb25lbnQodGhpcy50c05hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpdGVtSWQgPSBpdGVtLmdldEl0ZW1JZCgpIC0gaXRlbXMubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmludml0ZUFsbERhdGFbaXRlbUlkXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtc1tpXS55ID0gaXRlbXNbaV0ueSArIG9mZnNldDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQodGhpcy50c05hbWUpLnNldERhdGEoaXRlbUlkLCB0aGlzLmludml0ZUFsbERhdGFbaXRlbUlkXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZpZXdQb3MueSA+IGJ1ZmZlciAmJiBpdGVtc1tpXS55IC0gb2Zmc2V0ID4gLXRoaXMuY29udGVudC5oZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IGl0ZW1zW2ldLmdldENvbXBvbmVudCh0aGlzLnRzTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW1JZCA9IGl0ZW0uZ2V0SXRlbUlkKCkgKyBpdGVtcy5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaW52aXRlQWxsRGF0YVtpdGVtSWRdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zW2ldLnkgPSBpdGVtc1tpXS55IC0gb2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENvbXBvbmVudCh0aGlzLnRzTmFtZSkuc2V0RGF0YShpdGVtSWQsIHRoaXMuaW52aXRlQWxsRGF0YVtpdGVtSWRdKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sYXN0Q29udGVudFBvc1kgPSB0aGlzLnNjcm9sbFZpZXcuY29udGVudC55O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdGlhbGl6ZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5hcnJhbmdlbWVudCA9PSBBcnJhbmdlbWVudC5WZXJ0aWNhbCkge1xyXG4gICAgICAgICAgICAvLyB0aGlzLmNvbnRlbnQuYW5jaG9yWCA9IDAuNTtcclxuICAgICAgICAgICAgLy8gdGhpcy5jb250ZW50LmFuY2hvclkgPSAxOyAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgdGhpcy5jb250ZW50LmhlaWdodCA9IHRoaXMudG90YWxDb3VudCAqICh0aGlzLnByZUl0ZW0uZGF0YS5oZWlnaHQgKyB0aGlzLnNwYWNpbmdZKSArIHRoaXMuc3BhY2luZ1k7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zcGF3bkNvdW50OyArK2kpIHtcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy5wcmVJdGVtKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5hZGRDaGlsZChpdGVtKTtcclxuICAgICAgICAgICAgICAgIGl0ZW0uc2V0UG9zaXRpb24oMCwgLWl0ZW0uaGVpZ2h0ICogKDAuNSArIGkpIC0gdGhpcy5zcGFjaW5nWSAqIChpICsgMSkpO1xyXG4gICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQodGhpcy50c05hbWUpLnNldERhdGEoaSwgdGhpcy5pbnZpdGVBbGxEYXRhW2ldKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXRlbXMucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmJ1ZmZlclpvbmUgPSB0aGlzLnNjcm9sbFZpZXcubm9kZS5oZWlnaHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuYXJyYW5nZW1lbnQgPT0gQXJyYW5nZW1lbnQuSG9yaXpvbnRhbCkge1xyXG4gICAgICAgICAgICAvLyB0aGlzLmNvbnRlbnQuYW5jaG9yWCA9IDA7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuY29udGVudC5hbmNob3JZID0gMC41OyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQud2lkdGggPSB0aGlzLnRvdGFsQ291bnQgKiAodGhpcy5wcmVJdGVtLmRhdGEud2lkdGggKyB0aGlzLnNwYWNpbmdYKSArIHRoaXMuc3BhY2luZ1g7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc3Bhd25Db3VudDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IGNjLmluc3RhbnRpYXRlKHRoaXMucHJlSXRlbSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuYWRkQ2hpbGQoaXRlbSk7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnNldFBvc2l0aW9uKGl0ZW0ud2lkdGggKiAoMC41ICsgaSkgKyB0aGlzLnNwYWNpbmdYICogKGkgKyAxKSwgMCk7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmdldENvbXBvbmVudCh0aGlzLnRzTmFtZSkuc2V0RGF0YShpLCB0aGlzLmludml0ZUFsbERhdGFbaV0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmJ1ZmZlclpvbmUgPSB0aGlzLnNjcm9sbFZpZXcubm9kZS53aWR0aDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5hcnJhbmdlbWVudCA9PSBBcnJhbmdlbWVudC5HcmlkKSB7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuY29udGVudC5hbmNob3JYID0gMDtcclxuICAgICAgICAgICAgLy8gdGhpcy5jb250ZW50LmFuY2hvclkgPSAxOyAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgbGV0IGxpbmVOdW0gPSBNYXRoLmNlaWwodGhpcy50b3RhbENvdW50IC8gdGhpcy5zcGFjZU1heE51bSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudC53aWR0aCA9IHRoaXMuc3BhY2VNYXhOdW0gKiAodGhpcy5wcmVJdGVtLmRhdGEud2lkdGggKyB0aGlzLnNwYWNpbmdYKSArIHRoaXMuc3BhY2luZ1g7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5oZWlnaHQgPSBsaW5lTnVtICogKHRoaXMucHJlSXRlbS5kYXRhLmhlaWdodCArIHRoaXMuc3BhY2luZ1kpICsgdGhpcy5zcGFjaW5nWTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNwYXduQ291bnQgJSAyICE9IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3Bhd25Db3VudCArPSAxO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgY3JlYXROdW0gPSAwO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpbmVOdW07IGkrKykge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLnNwYWNlTWF4TnVtOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY3JlYXROdW0gPCB0aGlzLnNwYXduQ291bnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnByZUl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuYWRkQ2hpbGQoaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uc2V0UG9zaXRpb24oaXRlbS53aWR0aCAqICgwLjUgKyBqKSArIHRoaXMuc3BhY2luZ1ggKiAoaiArIDEpLCAtaXRlbS5oZWlnaHQgKiAoMC41ICsgaSkgLSB0aGlzLnNwYWNpbmdZICogKGkgKyAxKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KHRoaXMudHNOYW1lKS5zZXREYXRhKGNyZWF0TnVtLCB0aGlzLmludml0ZUFsbERhdGFbY3JlYXROdW1dKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdE51bSsrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5idWZmZXJab25lID0gdGhpcy5zY3JvbGxWaWV3Lm5vZGUuaGVpZ2h0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFBvc2l0aW9uSW5WaWV3KGl0ZW0pIHtcclxuICAgICAgICBsZXQgd29ybGRQb3MgPSBpdGVtLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoaXRlbS5wb3NpdGlvbik7XHJcbiAgICAgICAgbGV0IHZpZXdQb3MgPSB0aGlzLnNjcm9sbFZpZXcubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUih3b3JsZFBvcyk7XHJcbiAgICAgICAgcmV0dXJuIHZpZXdQb3NcclxuICAgIH1cclxufVxyXG4iXX0=