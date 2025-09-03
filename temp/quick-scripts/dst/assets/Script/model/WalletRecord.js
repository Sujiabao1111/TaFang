
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/model/WalletRecord.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '76d58CQSGFObp6iA+fvtlfG', 'WalletRecord');
// Script/model/WalletRecord.ts

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
var WalletRecord = /** @class */ (function (_super) {
    __extends(WalletRecord, _super);
    function WalletRecord() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lable_money = null;
        _this.lable_time = null;
        _this.lable_state = null;
        _this.lable_explain = null;
        _this.haveExplain = null;
        return _this;
        // update (dt) {},
    }
    WalletRecord.prototype.start = function () {
    };
    WalletRecord.prototype.onDisable = function () {
    };
    WalletRecord.prototype.updateData = function (data) {
        var self = this;
        self.lable_money.string = data.amount + "\u5143";
        self.lable_time.string = self.formatDate(data.createTime);
        var tempColor = new cc.Color();
        if (data.state == 0) {
            self.lable_state.string = "审核中";
            self.lable_state.node.color = tempColor.fromHEX("#FF7709");
        }
        else if (data.state == 2) {
            self.lable_state.string = "审核不通过";
            self.lable_state.node.color = tempColor.fromHEX("#CD241E");
        }
        else if (data.state == 3) {
            self.lable_state.string = "审核已转账";
            self.lable_state.node.color = tempColor.fromHEX("#1E9914");
        }
        if (data.state != 2) {
            self.haveExplain.active = false;
            self.lable_explain.node.active = false;
            self.node.height = 140;
        }
        else {
            self.lable_explain.string = data.remark;
            self.lable_explain.node.active = true;
            self.haveExplain.active = true;
            self.node.height = 280;
        }
    };
    WalletRecord.prototype.formatDate = function (date) {
        var date = new Date(date);
        var YY = date.getFullYear() + '-';
        var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
        var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return YY + MM + DD + " " + hh + mm + ss;
    };
    __decorate([
        property(cc.Label)
    ], WalletRecord.prototype, "lable_money", void 0);
    __decorate([
        property(cc.Label)
    ], WalletRecord.prototype, "lable_time", void 0);
    __decorate([
        property(cc.Label)
    ], WalletRecord.prototype, "lable_state", void 0);
    __decorate([
        property(cc.Label)
    ], WalletRecord.prototype, "lable_explain", void 0);
    __decorate([
        property(cc.Node)
    ], WalletRecord.prototype, "haveExplain", void 0);
    WalletRecord = __decorate([
        ccclass
    ], WalletRecord);
    return WalletRecord;
}(cc.Component));
exports.default = WalletRecord;
;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxtb2RlbFxcV2FsbGV0UmVjb3JkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlNLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTBDLGdDQUFZO0lBQXREO1FBQUEscUVBc0VDO1FBbkVHLGlCQUFXLEdBQVksSUFBSSxDQUFDO1FBRzVCLGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBRzNCLGlCQUFXLEdBQVksSUFBSSxDQUFDO1FBRzVCLG1CQUFhLEdBQVksSUFBSSxDQUFDO1FBRzlCLGlCQUFXLEdBQVcsSUFBSSxDQUFDOztRQXNEM0Isa0JBQWtCO0lBQ3RCLENBQUM7SUFyREcsNEJBQUssR0FBTDtJQUVBLENBQUM7SUFFRCxnQ0FBUyxHQUFUO0lBRUEsQ0FBQztJQUVELGlDQUFVLEdBQVYsVUFBVyxJQUFxQjtRQUM1QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQU0sSUFBSSxDQUFDLE1BQU0sV0FBRyxDQUFDO1FBQzVDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRTFELElBQUksU0FBUyxHQUFHLElBQUksRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRS9CLElBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEVBQUM7WUFDZixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDaEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDOUQ7YUFDSSxJQUFHLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxFQUFDO1lBQ3BCLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQztZQUNsQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUM5RDthQUNJLElBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEVBQUM7WUFDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQzlEO1FBRUQsSUFBRyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsRUFBQztZQUNmLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNoQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztTQUMxQjthQUNHO1lBQ0EsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUN4QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUMvQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7U0FDMUI7SUFDTCxDQUFDO0lBRUQsaUNBQVUsR0FBVixVQUFXLElBQUk7UUFDWCxJQUFJLElBQUksR0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBQ2xDLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUM5RixJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUN6RSxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNoRixJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUN0RixJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBQ2hGLE9BQU8sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUUsR0FBRyxHQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO0lBQzFDLENBQUM7SUFoRUQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztxREFDUztJQUc1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO29EQUNRO0lBRzNCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7cURBQ1M7SUFHNUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzt1REFDVztJQUc5QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3FEQUNTO0lBZlYsWUFBWTtRQURoQyxPQUFPO09BQ2EsWUFBWSxDQXNFaEM7SUFBRCxtQkFBQztDQXRFRCxBQXNFQyxDQXRFeUMsRUFBRSxDQUFDLFNBQVMsR0FzRXJEO2tCQXRFb0IsWUFBWTtBQXNFaEMsQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHdhbGxldFJlY29yZERhdGEgfSBmcm9tIFwiLi4vcG9wL2dhbWVXYWxsZXRSZWNvcmRcIjtcbmltcG9ydCBzb3VuZENvbnRyb2xsZXIgZnJvbSBcIi4uL3NvdW5kQ29udHJvbGxlclwiO1xuXG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXYWxsZXRSZWNvcmQgZXh0ZW5kcyBjYy5Db21wb25lbnR7ICAgXG4gICAgXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGxhYmxlX21vbmV5OmNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBsYWJsZV90aW1lOmNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBsYWJsZV9zdGF0ZTpjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbGFibGVfZXhwbGFpbjpjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBoYXZlRXhwbGFpbjpjYy5Ob2RlID0gbnVsbDtcblxuICAgIHN0YXJ0ICgpIHtcblxuICAgIH0gICBcblxuICAgIG9uRGlzYWJsZSgpe1xuICAgICAgICBcbiAgICB9XG5cbiAgICB1cGRhdGVEYXRhKGRhdGE6d2FsbGV0UmVjb3JkRGF0YSl7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgc2VsZi5sYWJsZV9tb25leS5zdHJpbmcgPSBgJHtkYXRhLmFtb3VudH3lhYNgO1xuICAgICAgICBzZWxmLmxhYmxlX3RpbWUuc3RyaW5nID0gc2VsZi5mb3JtYXREYXRlKGRhdGEuY3JlYXRlVGltZSk7XG5cbiAgICAgICAgbGV0IHRlbXBDb2xvciA9IG5ldyBjYy5Db2xvcigpO1xuXG4gICAgICAgIGlmKGRhdGEuc3RhdGUgPT0gMCl7XG4gICAgICAgICAgICBzZWxmLmxhYmxlX3N0YXRlLnN0cmluZyA9IFwi5a6h5qC45LitXCI7XG4gICAgICAgICAgICBzZWxmLmxhYmxlX3N0YXRlLm5vZGUuY29sb3IgPSB0ZW1wQ29sb3IuZnJvbUhFWChcIiNGRjc3MDlcIik7XG4gICAgICAgIH0gXG4gICAgICAgIGVsc2UgaWYoZGF0YS5zdGF0ZSA9PSAyKXtcbiAgICAgICAgICAgIHNlbGYubGFibGVfc3RhdGUuc3RyaW5nID0gXCLlrqHmoLjkuI3pgJrov4dcIjtcbiAgICAgICAgICAgIHNlbGYubGFibGVfc3RhdGUubm9kZS5jb2xvciA9IHRlbXBDb2xvci5mcm9tSEVYKFwiI0NEMjQxRVwiKTsgICAgICAgICAgICBcbiAgICAgICAgfSBcbiAgICAgICAgZWxzZSBpZihkYXRhLnN0YXRlID09IDMpe1xuICAgICAgICAgICAgc2VsZi5sYWJsZV9zdGF0ZS5zdHJpbmcgPSBcIuWuoeaguOW3sui9rOi0plwiO1xuICAgICAgICAgICAgc2VsZi5sYWJsZV9zdGF0ZS5ub2RlLmNvbG9yID0gdGVtcENvbG9yLmZyb21IRVgoXCIjMUU5OTE0XCIpO1xuICAgICAgICB9ICAgICAgICBcblxuICAgICAgICBpZihkYXRhLnN0YXRlICE9IDIpeyAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgc2VsZi5oYXZlRXhwbGFpbi5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHNlbGYubGFibGVfZXhwbGFpbi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgc2VsZi5ub2RlLmhlaWdodCA9IDE0MDsgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBzZWxmLmxhYmxlX2V4cGxhaW4uc3RyaW5nID0gZGF0YS5yZW1hcms7XG4gICAgICAgICAgICBzZWxmLmxhYmxlX2V4cGxhaW4ubm9kZS5hY3RpdmUgPSB0cnVlOyAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgc2VsZi5oYXZlRXhwbGFpbi5hY3RpdmUgPSB0cnVlOyAgICAgICBcbiAgICAgICAgICAgIHNlbGYubm9kZS5oZWlnaHQgPSAyODA7ICAgICAgICAgICAgICAgXG4gICAgICAgIH0gICAgICAgIFxuICAgIH1cblxuICAgIGZvcm1hdERhdGUoZGF0ZSkge1xuICAgICAgICB2YXIgZGF0ZTphbnkgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgdmFyIFlZID0gZGF0ZS5nZXRGdWxsWWVhcigpICsgJy0nO1xuICAgICAgICB2YXIgTU0gPSAoZGF0ZS5nZXRNb250aCgpICsgMSA8IDEwID8gJzAnICsgKGRhdGUuZ2V0TW9udGgoKSArIDEpIDogZGF0ZS5nZXRNb250aCgpICsgMSkgKyAnLSc7XG4gICAgICAgIHZhciBERCA9IChkYXRlLmdldERhdGUoKSA8IDEwID8gJzAnICsgKGRhdGUuZ2V0RGF0ZSgpKSA6IGRhdGUuZ2V0RGF0ZSgpKTtcbiAgICAgICAgdmFyIGhoID0gKGRhdGUuZ2V0SG91cnMoKSA8IDEwID8gJzAnICsgZGF0ZS5nZXRIb3VycygpIDogZGF0ZS5nZXRIb3VycygpKSArICc6JztcbiAgICAgICAgdmFyIG1tID0gKGRhdGUuZ2V0TWludXRlcygpIDwgMTAgPyAnMCcgKyBkYXRlLmdldE1pbnV0ZXMoKSA6IGRhdGUuZ2V0TWludXRlcygpKSArICc6JztcbiAgICAgICAgdmFyIHNzID0gKGRhdGUuZ2V0U2Vjb25kcygpIDwgMTAgPyAnMCcgKyBkYXRlLmdldFNlY29uZHMoKSA6IGRhdGUuZ2V0U2Vjb25kcygpKTtcbiAgICAgICAgcmV0dXJuIFlZICsgTU0gKyBERCArXCIgXCIraGggKyBtbSArIHNzO1xuICAgIH1cblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxufTtcbiJdfQ==