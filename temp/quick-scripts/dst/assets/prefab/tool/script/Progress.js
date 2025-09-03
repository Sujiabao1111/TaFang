
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/prefab/tool/script/Progress.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xccHJlZmFiXFx0b29sXFxzY3JpcHRcXFByb2dyZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFNLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXNDLDRCQUFZO0lBQWxEO1FBQUEscUVBK0lDO1FBNUlHLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFFekIsa0JBQVksR0FBRyxHQUFHLENBQUMsQ0FBZSxRQUFRO1FBQzFDLHVCQUFpQixHQUFHLENBQUMsQ0FBQyxDQUFVLFdBQVc7UUFDM0MscUJBQWUsR0FBRyxDQUFDLENBQUMsQ0FBWSxhQUFhO1FBSXJDLGtCQUFZLEdBQUcsZUFBZSxDQUFBO1FBQzlCLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBRTdCLGdCQUFVLEdBQUcsRUFBRSxDQUFBLENBQUEsS0FBSztRQUNwQixrQkFBWSxHQUFHLEVBQUUsQ0FBQSxDQUFBLE1BQU07UUFDdkIsaUJBQVcsR0FBWSxJQUFJLENBQUM7O0lBK0h4QyxDQUFDO0lBM0hHLHlCQUFNLEdBQU47UUFDSSxrRUFBa0U7UUFDbEUsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELDJCQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVELDZCQUFVLEdBQVYsVUFBVyxPQUFlLEVBQUUsU0FBbUI7UUFDM0MsSUFBSSxTQUFTLEVBQUU7WUFDWCxJQUFJLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFB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QUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtnQkFDOUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7YUFDeEI7WUFDRCxJQUFJLElBQUksRUFBRTtnQkFDTixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFBO2dCQUNwQyxJQUFJLElBQUk7b0JBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQTthQUMvQjtTQUNKO0lBQ0wsQ0FBQztJQUVELCtCQUFZLEdBQVosVUFBYSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQWlCO1FBQWpCLDBCQUFBLEVBQUEsaUJBQWlCO1FBQ3RDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUNsQixDQUFDO0lBRUQsb0NBQWlCLEdBQWpCO1FBQ0ksT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFBO0lBQzNCLENBQUM7SUEzSUQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs4Q0FDTztJQUhSLFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0ErSTVCO0lBQUQsZUFBQztDQS9JRCxBQStJQyxDQS9JcUMsRUFBRSxDQUFDLFNBQVMsR0ErSWpEO2tCQS9Jb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9ncmVzcyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICByYW5nTm9kZTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgcmFuZ01heFdpZHRoID0gMTkwOyAgICAgICAgICAgICAgIC8v6L+b5bqm5p2h5pyA5aSn5YC8XHJcbiAgICByYW5nQWRkRnJvbnRXaWR0aCA9IDA7ICAgICAgICAgIC8v6L+b5bqm5p2h5YmN6L+b5YmN55qE5a695bqmXHJcbiAgICByYW5nVXBkYXRlV2lkdGggPSAwOyAgICAgICAgICAgIC8v6L+b5bqm5p2h6ZyA6KaB5YmN6L+b5Yiw55qE5a695bqmXHJcblxyXG4gICAgdGVtcEFkZFdpZHRoO1xyXG5cclxuICAgIHByaXZhdGUgcHJvZ3Jlc3NOYW1lID0gXCJwcm9HcmVzc1BsaXN0XCJcclxuICAgIHByaXZhdGUgc3RhcnROb2RlUG9zOiBjYy5WZWMyID0gbnVsbDtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSB0b3RhbF9wb29sID0ge30vL+WvueixoeaxoFxyXG4gICAgcHJpdmF0ZSB0b3RhbF9wcmVmYWIgPSB7fS8v54m55pWI57KS5a2QXHJcbiAgICBwcml2YXRlIHBhcmVudF9ub2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIHRhcmdldFdpZHRoO1xyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICAvL3RoaXMucmFuZ01heFdpZHRoID0gdGhpcy5yYW5nTm9kZS5wYXJlbnQud2lkdGg7ICAgICAvL+iuvue9rui/m+W6puadoeacgOWkp+WuveW6puWAvFxyXG4gICAgICAgIHRoaXMucGFyZW50X25vZGUgPSBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpLmdldENoaWxkQnlOYW1lKCdDYW52YXMnKTtcclxuICAgICAgICB0aGlzLmluaXRFZmZlY3QoKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkVuYWJsZSgpIHtcclxuICAgICAgICB0aGlzLnJhbmdOb2RlLndpZHRoID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBzZXRQZXJjZW50KHBlcmNlbnQ6IG51bWJlciwgc3RhcnROb2RlPzogY2MuTm9kZSkgeyAgICAgICAgXHJcbiAgICAgICAgaWYgKHN0YXJ0Tm9kZSkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0Tm9kZVBvcyA9IHN0YXJ0Tm9kZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKHN0YXJ0Tm9kZS5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnROb2RlUG9zID0gY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5nZXRDaGlsZEJ5TmFtZSgnQ2FudmFzJykuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yYW5nQWRkRnJvbnRXaWR0aCA9IHRoaXMucmFuZ05vZGUud2lkdGg7ICAgICAgICAgICAgICAgICAvL+ayoeWJjei/m+WJjeeahOWuveW6plxyXG4gICAgICAgIHRoaXMucmFuZ1VwZGF0ZVdpZHRoID0gdGhpcy5yYW5nTWF4V2lkdGggKiBwZXJjZW50OyAgICAgICAgICAgLy/pnIDopoHliY3ov5vliLDnmoTlgLwgICAgICAgICAgICAgICBcclxuICAgICAgICBpZih0aGlzLnJhbmdOb2RlLndpZHRoID09IHRoaXMucmFuZ1VwZGF0ZVdpZHRoKXtcclxuICAgICAgICAgICAgdGhpcy5yYW5nVXBkYXRlV2lkdGggPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHRoaXMucmFuZ1VwZGF0ZVdpZHRoID49IHRoaXMucmFuZ01heFdpZHRoKXtcclxuICAgICAgICAgICAgdGhpcy5yYW5nVXBkYXRlV2lkdGggPSB0aGlzLnJhbmdNYXhXaWR0aDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UHJvZ3Jlc3NJbWFnZShwZXJjZW50Om51bWJlcil7XHJcbiAgICAgICAgdGhpcy5yYW5nTm9kZS53aWR0aCA9IHRoaXMucmFuZ01heFdpZHRoICogcGVyY2VudDtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucmFuZ1VwZGF0ZVdpZHRoKSB7XHJcbiAgICAgICAgICAgIGxldCByYW5nZSA9IHRoaXMucmFuZ1VwZGF0ZVdpZHRoO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5yYW5nTm9kZS53aWR0aCA8IHJhbmdlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJhbmdOb2RlLndpZHRoICs9IChyYW5nZSAtIHRoaXMucmFuZ0FkZEZyb250V2lkdGgpIC8gMjA7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yYW5nTm9kZS53aWR0aCA+PSByYW5nZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmFuZ05vZGUud2lkdGggPSByYW5nZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5yYW5nTm9kZS53aWR0aCA+PSByYW5nZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yYW5nVXBkYXRlV2lkdGggPSAwO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5zdGFydE5vZGVQb3MpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjbnQgPSAxO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjbnQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBhYWEgPSB0aGlzLnJhbmdOb2RlLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MudjIodGhpcy5yYW5nTm9kZS54LCB0aGlzLnJhbmdOb2RlLnkpKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGFydFdQb3MgPSB0aGlzLnBhcmVudF9ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHRoaXMuc3RhcnROb2RlUG9zKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXRXUG9zID0gdGhpcy5wYXJlbnRfbm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihhYWEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1vdmVPdXREdXJhdGlvblRpbWUyID0gMC4yICsgTWF0aC5yYW5kb20oKSAqIDAuMjtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBtb3ZlVG9EdXJhdGlvblRpbWUgPSAwLjIgKyBNYXRoLnJhbmRvbSgpICogMC4zO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlRWZmZWN0KHRoaXMucHJvZ3Jlc3NOYW1lLCAobm9kZSwgc2NyaXB0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuc2V0UG9zaXRpb24oc3RhcnRXUG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmFkaXVzVGVtcCA9IDUwICogTWF0aC5yYW5kb20oKSArIDEwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByYWRpYW5zID0gY2MubWlzYy5kZWdyZWVzVG9SYWRpYW5zKDE2MCArIDM2MCAvIGNudCAqIGkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBiYXNlVjIgPSBjYy52MigxLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgcm9hdGVWMyA9IGJhc2VWMi5yb3RhdGUocmFkaWFucykuc2NhbGVTZWxmKGNjLnYyKHJhZGl1c1RlbXAsIHJhZGl1c1RlbXApKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VxID0gY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5tb3ZlVG8obW92ZU91dER1cmF0aW9uVGltZTIsIHN0YXJ0V1Bvcy5hZGQocm9hdGVWMykpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MubW92ZVRvKG1vdmVUb0R1cmF0aW9uVGltZSwgdGFyZ2V0V1BvcykuZWFzaW5nKGNjLmVhc2VPdXQoMS41KSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVFZmZlY3QodGhpcy5wcm9ncmVzc05hbWUsIG5vZGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUucnVuQWN0aW9uKHNlcSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRDdXJXaWR0aCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yYW5nTm9kZS53aWR0aDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRNYXhXaWR0aCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yYW5nTWF4V2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdEVmZmVjdCgpIHtcclxuICAgICAgICBjYy5sb2FkZXIubG9hZFJlc0RpcihgRWZmZWN0LyR7dGhpcy5wcm9ncmVzc05hbWV9YCwgY2MuUHJlZmFiLCBmdW5jdGlvbiAoZXJyLCBhc3NldHMsIHVybHMpIHtcclxuICAgICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIuWKoOi9veWksei0pVwiKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy50b3RhbF9wcmVmYWIpe1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgbSBpbiBhc3NldHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXNzZXRzW21dKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudG90YWxfcHJlZmFiW2Fzc2V0c1ttXS5uYW1lXSA9IGFzc2V0c1ttXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50b3RhbF9wb29sW2Fzc2V0c1ttXS5uYW1lXSA9IG5ldyBjYy5Ob2RlUG9vbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMudG90YWxfcHJlZmFiKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVFZmZlY3QobmFtZSwgc3VjYywgcGFyZW50ID0gdGhpcy5wYXJlbnRfbm9kZSkgey8v55Sf5oiQ54m55pWIXHJcbiAgICAgICAgaWYgKHRoaXMudG90YWxfcHJlZmFiICYmIHRoaXMudG90YWxfcHJlZmFiW25hbWVdKSB7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gbnVsbFxyXG4gICAgICAgICAgICBpZiAodGhpcy50b3RhbF9wb29sW25hbWVdLnNpemUoKSA+IDApIHtcclxuICAgICAgICAgICAgICAgIG5vZGUgPSB0aGlzLnRvdGFsX3Bvb2xbbmFtZV0uZ2V0KClcclxuICAgICAgICAgICAgICAgIG5vZGUucGFyZW50ID0gcGFyZW50O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMudG90YWxfcHJlZmFiW25hbWVdKVxyXG4gICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBwYXJlbnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG5vZGUpIHtcclxuICAgICAgICAgICAgICAgIGxldCBzY3JpcHQgPSBub2RlLmdldENvbXBvbmVudChuYW1lKVxyXG4gICAgICAgICAgICAgICAgaWYgKHN1Y2MpIHN1Y2Mobm9kZSwgc2NyaXB0KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZUVmZmVjdChuYW1lLCBub2RlLCBpc0Rlc3Ryb3kgPSBmYWxzZSkgey8v56e76Zmk54m55pWIXHJcbiAgICAgICAgbm9kZS5kZXN0cm95KClcclxuICAgIH1cclxuXHJcbiAgICBmaW5kRGVmYXVsdFBhcmVudCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnRfbm9kZVxyXG4gICAgfVxyXG59XHJcbiJdfQ==