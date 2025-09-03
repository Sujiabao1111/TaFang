
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/game/turret/BulletBoom.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5d80b4pn+dOpIQekAZc889l', 'BulletBoom');
// Script/game/turret/BulletBoom.ts

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
var NameTs_1 = require("../../common/NameTs");
var util_1 = require("../../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BulletBoom = /** @class */ (function (_super) {
    __extends(BulletBoom, _super);
    function BulletBoom() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.spine = null;
        return _this;
    }
    BulletBoom.prototype.start = function () {
    };
    /**初始化 */
    BulletBoom.prototype.init = function (data) {
        var _this = this;
        this.bulletData = util_1.default.GetBulletData(data.type);
        var monsetrName = util_1.default.userData.customs.big + "-" + util_1.default.userData.customs.small + "_Monster_" + data.id;
        var targetNode = util_1.default.MonsterMap.get(monsetrName);
        if (!targetNode) {
            this.destroyBoom();
            return;
        }
        this.node.setPosition(targetNode.getPosition());
        this.loadSpine(data.type);
        this.node.y += Number(this.bulletData.boomY);
        // this.scheduleOnce(()=>{
        //     this.destroyBoom();
        // },5);
        this.spine.setCompleteListener(function () {
            _this.destroyBoom();
        });
    };
    /**
     * 加载龙骨
     * @param type 类型
     */
    BulletBoom.prototype.loadSpine = function (type) {
        var _this = this;
        var name = this.bulletData.boom;
        cc.resources.load("spine/turret/" + type + "/boom/" + name, sp.SkeletonData, function (error, sp) {
            if (error) {
                return;
            }
            _this.spine.skeletonData = sp;
            _this.spine.setAnimation(0, "animation", false);
        });
    };
    /**回收自己 */
    BulletBoom.prototype.destroyBoom = function () {
        //回收自己
        cc.game.emit(NameTs_1.default.Game_Bullet_Boom_Killed, this.node);
    };
    __decorate([
        property({ type: sp.Skeleton, displayName: "爆炸" })
    ], BulletBoom.prototype, "spine", void 0);
    BulletBoom = __decorate([
        ccclass
    ], BulletBoom);
    return BulletBoom;
}(cc.Component));
exports.default = BulletBoom;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxnYW1lXFx0dXJyZXRcXEJ1bGxldEJvb20udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsOENBQXlDO0FBQ3pDLHdDQUFtQztBQUU3QixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF3Qyw4QkFBWTtJQUFwRDtRQUFBLHFFQStEQztRQTNEVyxXQUFLLEdBQWdCLElBQUksQ0FBQzs7SUEyRHRDLENBQUM7SUF2REcsMEJBQUssR0FBTDtJQUVBLENBQUM7SUFFRCxTQUFTO0lBQ1QseUJBQUksR0FBSixVQUFLLElBQUk7UUFBVCxpQkEwQkM7UUF0QkcsSUFBSSxDQUFDLFVBQVUsR0FBRyxjQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVoRCxJQUFJLFdBQVcsR0FBVSxjQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUMsR0FBRyxHQUFDLGNBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBQyxXQUFXLEdBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUN2RyxJQUFJLFVBQVUsR0FBVyxjQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUUxRCxJQUFHLENBQUMsVUFBVSxFQUFDO1lBQ1gsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ25CLE9BQU07U0FDVDtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRzFCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTdDLDBCQUEwQjtRQUMxQiwwQkFBMEI7UUFDMUIsUUFBUTtRQUNSLElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUM7WUFDM0IsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7T0FHRztJQUNILDhCQUFTLEdBQVQsVUFBVSxJQUFXO1FBQXJCLGlCQVVDO1FBVEcsSUFBSSxJQUFJLEdBQVUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7UUFDdkMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFDLElBQUksR0FBQyxRQUFRLEdBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsVUFBQyxLQUFLLEVBQUUsRUFBa0I7WUFDNUYsSUFBRyxLQUFLLEVBQUM7Z0JBQ0wsT0FBTzthQUNWO1lBQ0QsS0FBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1lBQzdCLEtBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBQyxXQUFXLEVBQUMsS0FBSyxDQUFDLENBQUM7UUFDakQsQ0FBQyxDQUFDLENBQUM7SUFFUCxDQUFDO0lBRUQsVUFBVTtJQUNWLGdDQUFXLEdBQVg7UUFDSSxNQUFNO1FBQ04sRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQU0sQ0FBQyx1QkFBdUIsRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQXpERDtRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsUUFBUSxFQUFFLFdBQVcsRUFBQyxJQUFJLEVBQUMsQ0FBQzs2Q0FDYjtJQUpqQixVQUFVO1FBRDlCLE9BQU87T0FDYSxVQUFVLENBK0Q5QjtJQUFELGlCQUFDO0NBL0RELEFBK0RDLENBL0R1QyxFQUFFLENBQUMsU0FBUyxHQStEbkQ7a0JBL0RvQixVQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJhc2VUcyBmcm9tIFwiLi4vLi4vYmFzZS9iYXNlVHNcIjtcbmltcG9ydCB7IGJ1bGxldEluZm8sIGdhbWVTdGF0ZSB9IGZyb20gXCIuLi8uLi9jb21tb24vZmFjZVRzXCI7XG5pbXBvcnQgTmFtZVRzIGZyb20gXCIuLi8uLi9jb21tb24vTmFtZVRzXCI7XG5pbXBvcnQgdXRpbCBmcm9tIFwiLi4vLi4vdXRpbC91dGlsXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnVsbGV0Qm9vbSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cblxuICAgIEBwcm9wZXJ0eSh7dHlwZTpzcC5Ta2VsZXRvbiAsZGlzcGxheU5hbWU6XCLniIbngrhcIn0pXG4gICAgcHJpdmF0ZSBzcGluZTpzcC5Ta2VsZXRvbiAgPSBudWxsO1xuXG4gICAgLy/lrZDlvLnmlbDmja5cbiAgICBwcml2YXRlIGJ1bGxldERhdGE6YW55O1xuICAgIHN0YXJ0ICgpIHtcblxuICAgIH1cblxuICAgIC8qKuWIneWni+WMliAqL1xuICAgIGluaXQoZGF0YSl7XG5cbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICB0aGlzLmJ1bGxldERhdGEgPSB1dGlsLkdldEJ1bGxldERhdGEoZGF0YS50eXBlKTtcbiAgICAgICAgXG4gICAgICAgIGxldCBtb25zZXRyTmFtZTpzdHJpbmcgPSB1dGlsLnVzZXJEYXRhLmN1c3RvbXMuYmlnK1wiLVwiK3V0aWwudXNlckRhdGEuY3VzdG9tcy5zbWFsbCtcIl9Nb25zdGVyX1wiK2RhdGEuaWQ7XG4gICAgICAgIGxldCB0YXJnZXROb2RlOmNjLk5vZGUgPSB1dGlsLk1vbnN0ZXJNYXAuZ2V0KG1vbnNldHJOYW1lKTtcblxuICAgICAgICBpZighdGFyZ2V0Tm9kZSl7XG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lCb29tKCk7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbih0YXJnZXROb2RlLmdldFBvc2l0aW9uKCkpO1xuICAgICAgICB0aGlzLmxvYWRTcGluZShkYXRhLnR5cGUpO1xuICAgICAgIFxuXG4gICAgICAgIHRoaXMubm9kZS55ICs9IE51bWJlcih0aGlzLmJ1bGxldERhdGEuYm9vbVkpO1xuXG4gICAgICAgIC8vIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XG4gICAgICAgIC8vICAgICB0aGlzLmRlc3Ryb3lCb29tKCk7XG4gICAgICAgIC8vIH0sNSk7XG4gICAgICAgIHRoaXMuc3BpbmUuc2V0Q29tcGxldGVMaXN0ZW5lcigoKT0+e1xuICAgICAgICAgICAgdGhpcy5kZXN0cm95Qm9vbSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliqDovb3pvpnpqqhcbiAgICAgKiBAcGFyYW0gdHlwZSDnsbvlnotcbiAgICAgKi9cbiAgICBsb2FkU3BpbmUodHlwZTpudW1iZXIpe1xuICAgICAgICBsZXQgbmFtZTpzdHJpbmcgPSB0aGlzLmJ1bGxldERhdGEuYm9vbTtcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoXCJzcGluZS90dXJyZXQvXCIrdHlwZStcIi9ib29tL1wiK25hbWUsc3AuU2tlbGV0b25EYXRhLCAoZXJyb3IsIHNwOnNwLlNrZWxldG9uRGF0YSkgPT4ge1xuICAgICAgICAgICAgaWYoZXJyb3IpeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zcGluZS5za2VsZXRvbkRhdGEgPSBzcDtcbiAgICAgICAgICAgIHRoaXMuc3BpbmUuc2V0QW5pbWF0aW9uKDAsXCJhbmltYXRpb25cIixmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgLyoq5Zue5pS26Ieq5bexICovXG4gICAgZGVzdHJveUJvb20oKXtcbiAgICAgICAgLy/lm57mlLboh6rlt7FcbiAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX0J1bGxldF9Cb29tX0tpbGxlZCx0aGlzLm5vZGUpO1xuICAgIH1cblxufVxuIl19