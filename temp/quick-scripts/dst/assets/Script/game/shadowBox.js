
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/game/shadowBox.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '19c6cAihYZL74p1NOb8D7x3', 'shadowBox');
// Script/game/shadowBox.ts

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
var NameTs_1 = require("../common/NameTs");
var pool_1 = require("../common/pool");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var shadowBox = /** @class */ (function (_super) {
    __extends(shadowBox, _super);
    function shadowBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.shadowPre = null;
        return _this;
        // update (dt) {}
    }
    shadowBox.prototype.onLoad = function () {
        var _this = this;
        var item = cc.instantiate(this.shadowPre);
        this.shadowPool = new pool_1.default(item, 1);
        /**监听创建 */
        cc.game.on(NameTs_1.default.Game_Monster_Shadow_Creater, function (data) {
            _this.shadowPool.createEnemy(_this.node, data);
        }, this);
        /**监听销毁 */
        cc.game.on(NameTs_1.default.Game_Monster_Shadow_Killed, function (data) {
            _this.shadowPool.onEnemyKilled(data);
        }, this);
    };
    shadowBox.prototype.start = function () {
    };
    __decorate([
        property({ type: cc.Prefab, displayName: "影子" })
    ], shadowBox.prototype, "shadowPre", void 0);
    shadowBox = __decorate([
        ccclass
    ], shadowBox);
    return shadowBox;
}(cc.Component));
exports.default = shadowBox;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxnYW1lXFxzaGFkb3dCb3gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQXNDO0FBQ3RDLHVDQUFrQztBQUU1QixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF1Qyw2QkFBWTtJQUFuRDtRQUFBLHFFQStCQztRQTVCVyxlQUFTLEdBQWEsSUFBSSxDQUFDOztRQTJCbkMsaUJBQWlCO0lBQ3JCLENBQUM7SUF0QkcsMEJBQU0sR0FBTjtRQUFBLGlCQWVDO1FBZEcsSUFBSSxJQUFJLEdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLGNBQUksQ0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFFbkMsVUFBVTtRQUNWLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGdCQUFNLENBQUMsMkJBQTJCLEVBQUMsVUFBQyxJQUFJO1lBQy9DLEtBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEtBQUksQ0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEQsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFDO1FBRVIsVUFBVTtRQUNWLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGdCQUFNLENBQUMsMEJBQTBCLEVBQUMsVUFBQyxJQUFJO1lBQzlDLEtBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hDLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQztJQUdaLENBQUM7SUFFRCx5QkFBSyxHQUFMO0lBRUEsQ0FBQztJQXpCRDtRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsTUFBTSxFQUFDLFdBQVcsRUFBQyxJQUFJLEVBQUMsQ0FBQztnREFDVDtJQUhsQixTQUFTO1FBRDdCLE9BQU87T0FDYSxTQUFTLENBK0I3QjtJQUFELGdCQUFDO0NBL0JELEFBK0JDLENBL0JzQyxFQUFFLENBQUMsU0FBUyxHQStCbEQ7a0JBL0JvQixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi4vY29tbW9uL05hbWVUc1wiO1xuaW1wb3J0IHBvb2wgZnJvbSBcIi4uL2NvbW1vbi9wb29sXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgc2hhZG93Qm94IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5QcmVmYWIsZGlzcGxheU5hbWU6XCLlvbHlrZBcIn0pXG4gICAgcHJpdmF0ZSBzaGFkb3dQcmU6Y2MuUHJlZmFiID0gbnVsbDtcblxuICAgIFxuICAgIC8qKuihgOmHj+WvueixoeaxoCAqL1xuICAgIHByaXZhdGUgc2hhZG93UG9vbDpwb29sOyBcblxuICAgIG9uTG9hZCAoKSB7XG4gICAgICAgIGxldCBpdGVtOmNjLk5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnNoYWRvd1ByZSk7XG4gICAgICAgIHRoaXMuc2hhZG93UG9vbCA9IG5ldyBwb29sKGl0ZW0sMSk7XG4gICAgICAgIFxuICAgICAgICAvKirnm5HlkKzliJvlu7ogKi9cbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9Nb25zdGVyX1NoYWRvd19DcmVhdGVyLChkYXRhKT0+e1xuICAgICAgICAgICAgdGhpcy5zaGFkb3dQb29sLmNyZWF0ZUVuZW15KHRoaXMubm9kZSxkYXRhKTtcbiAgICAgICAgfSx0aGlzKTtcblxuICAgICAgICAvKirnm5HlkKzplIDmr4EgKi9cbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9Nb25zdGVyX1NoYWRvd19LaWxsZWQsKGRhdGEpPT57XG4gICAgICAgICAgICB0aGlzLnNoYWRvd1Bvb2wub25FbmVteUtpbGxlZChkYXRhKTtcbiAgICAgICAgfSx0aGlzKTtcblxuXG4gICAgfVxuXG4gICAgc3RhcnQgKCkge1xuXG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cbiJdfQ==