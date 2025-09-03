
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/pop/gamePropBox.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ba13duip7RHKqrTplvFUvAC', 'gamePropBox');
// Script/pop/gamePropBox.ts

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
var baseTs_1 = require("../base/baseTs");
var NameTs_1 = require("../common/NameTs");
var propItem_1 = require("../prop/propItem");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gamePropBox = /** @class */ (function (_super) {
    __extends(gamePropBox, _super);
    function gamePropBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.layOutContent = null;
        _this.ScrollView = null;
        _this.propData = new Map();
        return _this;
        // update (dt) {}
    }
    gamePropBox.prototype.onLoad = function () {
        var _this = this;
        /**道具 */
        // let propData = jsonSingleton.singleton.getJson(NameTs.propData);
        this.loadAny("prefab/prop/propItem2", cc.Prefab, function (pre) {
            if (util_1.default && util_1.default.propData) {
                util_1.default.propData.forEach(function (value) {
                    var item = cc.instantiate(pre);
                    item.setParent(_this.layOutContent);
                    var itemTs = item.getComponent(propItem_1.default);
                    if (itemTs)
                        itemTs.init && itemTs.init(value);
                    _this.propData.set("prop_" + value.propIssueDetailList[0].propsId, item);
                });
            }
            cc.game.emit(NameTs_1.default.Game_PropItem_Update);
            _this.ScrollView.scrollToPercentHorizontal(.05, .2);
        });
        cc.game.on(NameTs_1.default.Game_PropItem_Update, function () {
            _this.checkUpDateProp();
        }, this);
    };
    gamePropBox.prototype.start = function () {
    };
    gamePropBox.prototype.onEnable = function () {
    };
    /**
     *
     */
    gamePropBox.prototype.checkUpDateProp = function () {
        var num = 0; //道具大于0的有几个
        for (var i = 0; i < util_1.default.userData.prop.length; i++) {
            var item = this.propData.get("prop_" + util_1.default.userData.prop[i].type);
            console.log(util_1.default.userData.prop[i].num, 'util.userData.prop[i].num');
            if (item) {
                item.active = util_1.default.userData.prop[i].num > 0;
            }
            if (util_1.default.userData.prop[i].num > 0) {
                num++;
            }
        }
        if (num == 1) {
            this.node.width = 120;
        }
        else if (num == 2) {
            this.node.width = 200;
        }
        else {
            this.node.width = 255;
        }
        this.node.height = num == 0 ? 0 : 90;
    };
    __decorate([
        property({ type: cc.Node, displayName: "layout框" })
    ], gamePropBox.prototype, "layOutContent", void 0);
    __decorate([
        property({ type: cc.ScrollView, displayName: "滚动条" })
    ], gamePropBox.prototype, "ScrollView", void 0);
    gamePropBox = __decorate([
        ccclass
    ], gamePropBox);
    return gamePropBox;
}(baseTs_1.default));
exports.default = gamePropBox;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwb3BcXGdhbWVQcm9wQm94LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFvQztBQUVwQywyQ0FBc0M7QUFDdEMsNkNBQXdDO0FBRXhDLHFDQUFnQztBQUMxQixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF5QywrQkFBTTtJQUEvQztRQUFBLHFFQXFFQztRQWxFVyxtQkFBYSxHQUFZLElBQUksQ0FBQztRQUc5QixnQkFBVSxHQUFrQixJQUFJLENBQUM7UUFFakMsY0FBUSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7O1FBNEQ3QixpQkFBaUI7SUFDckIsQ0FBQztJQTNERyw0QkFBTSxHQUFOO1FBQUEsaUJBc0JDO1FBcEJHLFFBQVE7UUFDUixtRUFBbUU7UUFDbkUsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsRUFBQyxFQUFFLENBQUMsTUFBTSxFQUFDLFVBQUMsR0FBYTtZQUN6RCxJQUFHLGNBQUksSUFBSSxjQUFJLENBQUMsUUFBUSxFQUFDO2dCQUNyQixjQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQUs7b0JBQ3hCLElBQUksSUFBSSxHQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3ZDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUNuQyxJQUFJLE1BQU0sR0FBWSxJQUFJLENBQUMsWUFBWSxDQUFDLGtCQUFRLENBQUMsQ0FBQztvQkFDbEQsSUFBRyxNQUFNO3dCQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDMUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3pFLENBQUMsQ0FBQyxDQUFDO2FBQ047WUFDRCxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDMUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyx5QkFBeUIsQ0FBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLENBQUM7UUFDdEQsQ0FBQyxDQUFDLENBQUM7UUFHSCxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBTSxDQUFDLG9CQUFvQixFQUFDO1lBQ25DLEtBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUMzQixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDYixDQUFDO0lBRUQsMkJBQUssR0FBTDtJQUVBLENBQUM7SUFFRCw4QkFBUSxHQUFSO0lBRUEsQ0FBQztJQUNEOztPQUVHO0lBQ0gscUNBQWUsR0FBZjtRQUNJLElBQUksR0FBRyxHQUFVLENBQUMsQ0FBQyxDQUFBLFdBQVc7UUFDOUIsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxHQUFDLGNBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFBQztZQUMxQyxJQUFJLElBQUksR0FBVyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEdBQUMsY0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDekUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUMsMkJBQTJCLENBQUMsQ0FBQztZQUNuRSxJQUFHLElBQUksRUFBQztnQkFDSixJQUFJLENBQUMsTUFBTSxHQUFHLGNBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7YUFDL0M7WUFDRCxJQUFHLGNBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUM7Z0JBQzdCLEdBQUcsRUFBRSxDQUFDO2FBQ1Q7U0FDSjtRQUVELElBQUcsR0FBRyxJQUFFLENBQUMsRUFBQztZQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztTQUN6QjthQUFLLElBQUcsR0FBRyxJQUFJLENBQUMsRUFBQztZQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztTQUN6QjthQUFJO1lBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1NBQ3pCO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxJQUFFLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQSxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQTlERDtRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsSUFBSSxFQUFDLFdBQVcsRUFBQyxTQUFTLEVBQUMsQ0FBQztzREFDVDtJQUd0QztRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsVUFBVSxFQUFDLFdBQVcsRUFBQyxLQUFLLEVBQUMsQ0FBQzttREFDUjtJQU54QixXQUFXO1FBRC9CLE9BQU87T0FDYSxXQUFXLENBcUUvQjtJQUFELGtCQUFDO0NBckVELEFBcUVDLENBckV3QyxnQkFBTSxHQXFFOUM7a0JBckVvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJhc2VUcyBmcm9tIFwiLi4vYmFzZS9iYXNlVHNcIjtcbmltcG9ydCBqc29uU2luZ2xldG9uIGZyb20gXCIuLi9iYXNlL2pzb25TaW5nbGV0b25cIjtcbmltcG9ydCBOYW1lVHMgZnJvbSBcIi4uL2NvbW1vbi9OYW1lVHNcIjtcbmltcG9ydCBwcm9wSXRlbSBmcm9tIFwiLi4vcHJvcC9wcm9wSXRlbVwiO1xuaW1wb3J0IHsgVXJsQ29uc3QgfSBmcm9tIFwiLi4vc2VydmVyL1VybENvbnN0XCI7XG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vdXRpbC91dGlsXCI7XG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGdhbWVQcm9wQm94IGV4dGVuZHMgYmFzZVRzIHtcblxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5Ob2RlLGRpc3BsYXlOYW1lOlwibGF5b3V05qGGXCJ9KVxuICAgIHByaXZhdGUgbGF5T3V0Q29udGVudDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoe3R5cGU6Y2MuU2Nyb2xsVmlldyxkaXNwbGF5TmFtZTpcIua7muWKqOadoVwifSlcbiAgICBwcml2YXRlIFNjcm9sbFZpZXc6IGNjLlNjcm9sbFZpZXcgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBwcm9wRGF0YSA9IG5ldyBNYXAoKTtcblxuICAgIG9uTG9hZCAoKSB7XG5cbiAgICAgICAgLyoq6YGT5YW3ICovXG4gICAgICAgIC8vIGxldCBwcm9wRGF0YSA9IGpzb25TaW5nbGV0b24uc2luZ2xldG9uLmdldEpzb24oTmFtZVRzLnByb3BEYXRhKTtcbiAgICAgICAgdGhpcy5sb2FkQW55KFwicHJlZmFiL3Byb3AvcHJvcEl0ZW0yXCIsY2MuUHJlZmFiLChwcmU6Y2MuUHJlZmFiKT0+e1xuICAgICAgICAgICAgaWYodXRpbCAmJiB1dGlsLnByb3BEYXRhKXtcbiAgICAgICAgICAgICAgICB1dGlsLnByb3BEYXRhLmZvckVhY2goKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpdGVtOmNjLk5vZGUgPSBjYy5pbnN0YW50aWF0ZShwcmUpO1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnNldFBhcmVudCh0aGlzLmxheU91dENvbnRlbnQpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbVRzOnByb3BJdGVtID0gaXRlbS5nZXRDb21wb25lbnQocHJvcEl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICBpZihpdGVtVHMpaXRlbVRzLmluaXQmJml0ZW1Ucy5pbml0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wRGF0YS5zZXQoXCJwcm9wX1wiK3ZhbHVlLnByb3BJc3N1ZURldGFpbExpc3RbMF0ucHJvcHNJZCxpdGVtKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9Qcm9wSXRlbV9VcGRhdGUpO1xuICAgICAgICAgICAgdGhpcy5TY3JvbGxWaWV3LnNjcm9sbFRvUGVyY2VudEhvcml6b250YWwoLjA1LC4yKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgXG4gICAgICAgIGNjLmdhbWUub24oTmFtZVRzLkdhbWVfUHJvcEl0ZW1fVXBkYXRlLCgpPT57XG4gICAgICAgICAgICB0aGlzLmNoZWNrVXBEYXRlUHJvcCgpO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICB9XG4gICAgXG4gICAgc3RhcnQgKCkge1xuXG4gICAgfVxuXG4gICAgb25FbmFibGUoKXtcbiAgICAgICAgXG4gICAgfVxuICAgIC8qKlxuICAgICAqIFxuICAgICAqL1xuICAgIGNoZWNrVXBEYXRlUHJvcCgpe1xuICAgICAgICBsZXQgbnVtOm51bWJlciA9IDA7Ly/pgZPlhbflpKfkuo4w55qE5pyJ5Yeg5LiqXG4gICAgICAgIGZvcihsZXQgaSA9IDA7aTx1dGlsLnVzZXJEYXRhLnByb3AubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICBsZXQgaXRlbTpjYy5Ob2RlID0gdGhpcy5wcm9wRGF0YS5nZXQoXCJwcm9wX1wiK3V0aWwudXNlckRhdGEucHJvcFtpXS50eXBlKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHV0aWwudXNlckRhdGEucHJvcFtpXS5udW0sJ3V0aWwudXNlckRhdGEucHJvcFtpXS5udW0nKTtcbiAgICAgICAgICAgIGlmKGl0ZW0pe1xuICAgICAgICAgICAgICAgIGl0ZW0uYWN0aXZlID0gdXRpbC51c2VyRGF0YS5wcm9wW2ldLm51bSA+IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih1dGlsLnVzZXJEYXRhLnByb3BbaV0ubnVtID4gMCl7XG4gICAgICAgICAgICAgICAgbnVtKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZihudW09PTEpe1xuICAgICAgICAgICAgdGhpcy5ub2RlLndpZHRoID0gMTIwO1xuICAgICAgICB9ZWxzZSBpZihudW0gPT0gMil7XG4gICAgICAgICAgICB0aGlzLm5vZGUud2lkdGggPSAyMDA7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5ub2RlLndpZHRoID0gMjU1O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubm9kZS5oZWlnaHQgPSBudW09PTA/MDo5MDtcbiAgICB9XG5cblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=