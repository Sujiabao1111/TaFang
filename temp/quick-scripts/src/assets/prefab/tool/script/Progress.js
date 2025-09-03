"use strict";
cc._RF.push(module, '52473RV0xpJzY9OgugQ+mah', 'Progress');
// prefab/tool/script/Progress.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Progress = /** @class */ (function (_super) {
    __extends(Progress, _super);
    function Progress() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rangNode = null;
        _this.rangMaxWidth = 190; //进度条最大值
        _this.rangAddFrontWidth = 0; //进度条前进前的宽度
        _this.rangUpdateWidth = 0; //进度条需要前进到的宽度
        _this.progressName = "proGressPlist";
        _this.startNodePos = null;
        _this.total_pool = {}; //对象池
        _this.total_prefab = {}; //特效粒子
        _this.parent_node = null;
        return _this;
    }
    Progress.prototype.onLoad = function () {
        //this.rangMaxWidth = this.rangNode.parent.width;     //设置进度条最大宽度值
        this.parent_node = cc.director.getScene().getChildByName('Canvas');
        this.initEffect();
    };
    Progress.prototype.onEnable = function () {
        this.rangNode.width = 0;
    };
    Progress.prototype.setPercent = function (percent, startNode) {
        if (startNode) {
            this.startNodePos = startNode.parent.convertToWorldSpaceAR(startNode.getPosition());
        }
        else {
            this.startNodePos = cc.director.getScene().getChildByName('Canvas').getPosition();
        }
        this.rangAddFrontWidth = this.rangNode.width; //没前进前的宽度
        this.rangUpdateWidth = this.rangMaxWidth * percent; //需要前进到的值               
        if (this.rangNode.width == this.rangUpdateWidth) {
            this.rangUpdateWidth = 0;
        }
        else if (this.rangUpdateWidth >= this.rangMaxWidth) {
            this.rangUpdateWidth = this.rangMaxWidth;
        }
    };
    Progress.prototype.setProgressImage = function (percent) {
        this.rangNode.width = this.rangMaxWidth * percent;
    };
    Progress.prototype.update = function () {
        var _this = this;
        if (this.rangUpdateWidth) {
            var range = this.rangUpdateWidth;
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
                var cnt_1 = 1;
                var _loop_1 = function (i) {
                    var aaa = this_1.rangNode.parent.convertToWorldSpaceAR(cc.v2(this_1.rangNode.x, this_1.rangNode.y));
                    var startWPos = this_1.parent_node.convertToNodeSpaceAR(this_1.startNodePos);
                    var targetWPos = this_1.parent_node.convertToNodeSpaceAR(aaa);
                    var moveOutDurationTime2 = 0.2 + Math.random() * 0.2;
                    var moveToDurationTime = 0.2 + Math.random() * 0.3;
                    this_1.createEffect(this_1.progressName, function (node, script) {
                        node.setPosition(startWPos);
                        var radiusTemp = 50 * Math.random() + 10;
                        var radians = cc.misc.degreesToRadians(160 + 360 / cnt_1 * i);
                        var baseV2 = cc.v2(1, 0);
                        var roateV3 = baseV2.rotate(radians).scaleSelf(cc.v2(radiusTemp, radiusTemp));
                        var seq = cc.sequence(cc.moveTo(moveOutDurationTime2, startWPos.add(roateV3)), cc.moveTo(moveToDurationTime, targetWPos).easing(cc.easeOut(1.5)), cc.callFunc(function () {
                            _this.removeEffect(_this.progressName, node);
                        }));
                        node.runAction(seq);
                    });
                };
                var this_1 = this;
                for (var i = 0; i < cnt_1; i++) {
                    _loop_1(i);
                }
            }
        }
    };
    Progress.prototype.getCurWidth = function () {
        return this.rangNode.width;
    };
    Progress.prototype.getMaxWidth = function () {
        return this.rangMaxWidth;
    };
    Progress.prototype.initEffect = function () {
        cc.loader.loadResDir("Effect/" + this.progressName, cc.Prefab, function (err, assets, urls) {
            if (err) {
                console.error("加载失败");
                return;
            }
            if (this.total_prefab) {
                for (var m in assets) {
                    if (assets[m]) {
                        this.total_prefab[assets[m].name] = assets[m];
                        this.total_pool[assets[m].name] = new cc.NodePool();
                    }
                }
                console.log(this.total_prefab);
            }
        }.bind(this));
    };
    Progress.prototype.createEffect = function (name, succ, parent) {
        if (parent === void 0) { parent = this.parent_node; }
        if (this.total_prefab && this.total_prefab[name]) {
            var node = null;
            if (this.total_pool[name].size() > 0) {
                node = this.total_pool[name].get();
                node.parent = parent;
            }
            else {
                node = cc.instantiate(this.total_prefab[name]);
                node.parent = parent;
            }
            if (node) {
                var script = node.getComponent(name);
                if (succ)
                    succ(node, script);
            }
        }
    };
    Progress.prototype.removeEffect = function (name, node, isDestroy) {
        if (isDestroy === void 0) { isDestroy = false; }
        node.destroy();
    };
    Progress.prototype.findDefaultParent = function () {
        return this.parent_node;
    };
    __decorate([
        property(cc.Node)
    ], Progress.prototype, "rangNode", void 0);
    Progress = __decorate([
        ccclass
    ], Progress);
    return Progress;
}(cc.Component));
exports.default = Progress;

cc._RF.pop();