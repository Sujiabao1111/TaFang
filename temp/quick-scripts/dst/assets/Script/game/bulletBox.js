
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/game/bulletBox.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd66b7rxShZHwKH9nxWf7FjU', 'bulletBox');
// Script/game/bulletBox.ts

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
var pool_1 = require("../common/pool");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var bulletBox = /** @class */ (function (_super) {
    __extends(bulletBox, _super);
    function bulletBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    bulletBox.prototype.onLoad = function () {
        var _this = this;
        /**初始化对象池 */
        this.loadAny("prefab/turret/turretBullet", cc.Prefab, function (res) {
            var item = cc.instantiate(res);
            _this.bulletPool = new pool_1.default(item, 10);
        });
        /**初始化对象池 */
        this.loadAny("prefab/turret/BulletBoom", cc.Prefab, function (res) {
            var item = cc.instantiate(res);
            _this.boomPool = new pool_1.default(item, 40);
        });
        /**监听创建 */
        cc.game.on(NameTs_1.default.Game_Turret_Bullet_Creator, function (data) {
            _this.bulletPool.createEnemy(_this.node, data);
        }, this);
        /**监听创建 */
        cc.game.on(NameTs_1.default.Game_Bullet_Boom_Creator, function (data) {
            _this.boomPool.createEnemy(_this.node, data);
        }, this);
        /**监听销毁 */
        cc.game.on(NameTs_1.default.Game_Turret_Bullet_Killed, function (data) {
            _this.bulletPool.onEnemyKilled(data);
        }, this);
        /**监听销毁 */
        cc.game.on(NameTs_1.default.Game_Bullet_Boom_Killed, function (data) {
            _this.boomPool.onEnemyKilled(data);
        }, this);
    };
    bulletBox.prototype.start = function () {
    };
    bulletBox = __decorate([
        ccclass
    ], bulletBox);
    return bulletBox;
}(baseTs_1.default));
exports.default = bulletBox;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxnYW1lXFxidWxsZXRCb3gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUNBQW9DO0FBQ3BDLDJDQUFzQztBQUN0Qyx1Q0FBa0M7QUFHNUIsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBdUMsNkJBQU07SUFBN0M7O0lBbUVBLENBQUM7SUEzREcsMEJBQU0sR0FBTjtRQUFBLGlCQWlEQztRQS9DRyxZQUFZO1FBQ1osSUFBSSxDQUFDLE9BQU8sQ0FBQyw0QkFBNEIsRUFBQyxFQUFFLENBQUMsTUFBTSxFQUFDLFVBQUMsR0FBRztZQUVwRCxJQUFJLElBQUksR0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRXZDLEtBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxjQUFJLENBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRXhDLENBQUMsQ0FBQyxDQUFDO1FBRUgsWUFBWTtRQUNaLElBQUksQ0FBQyxPQUFPLENBQUMsMEJBQTBCLEVBQUMsRUFBRSxDQUFDLE1BQU0sRUFBQyxVQUFDLEdBQUc7WUFFbEQsSUFBSSxJQUFJLEdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUV2QyxLQUFJLENBQUMsUUFBUSxHQUFHLElBQUksY0FBSSxDQUFDLElBQUksRUFBQyxFQUFFLENBQUMsQ0FBQztRQUV0QyxDQUFDLENBQUMsQ0FBQztRQUVILFVBQVU7UUFDVixFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBTSxDQUFDLDBCQUEwQixFQUFDLFVBQUMsSUFBSTtZQUU5QyxLQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxLQUFJLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxDQUFDO1FBRWhELENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQztRQUVSLFVBQVU7UUFDVixFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBTSxDQUFDLHdCQUF3QixFQUFDLFVBQUMsSUFBSTtZQUU1QyxLQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxLQUFJLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxDQUFDO1FBRTlDLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQztRQUVSLFVBQVU7UUFDVixFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBTSxDQUFDLHlCQUF5QixFQUFDLFVBQUMsSUFBSTtZQUU3QyxLQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV4QyxDQUFDLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFFUixVQUFVO1FBQ1YsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsZ0JBQU0sQ0FBQyx1QkFBdUIsRUFBQyxVQUFDLElBQUk7WUFFM0MsS0FBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdEMsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFDO0lBR1osQ0FBQztJQUVELHlCQUFLLEdBQUw7SUFFQSxDQUFDO0lBN0RnQixTQUFTO1FBRDdCLE9BQU87T0FDYSxTQUFTLENBbUU3QjtJQUFELGdCQUFDO0NBbkVELEFBbUVDLENBbkVzQyxnQkFBTSxHQW1FNUM7a0JBbkVvQixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJhc2VUcyBmcm9tIFwiLi4vYmFzZS9iYXNlVHNcIjtcbmltcG9ydCBOYW1lVHMgZnJvbSBcIi4uL2NvbW1vbi9OYW1lVHNcIjtcbmltcG9ydCBwb29sIGZyb20gXCIuLi9jb21tb24vcG9vbFwiO1xuaW1wb3J0IHV0aWwgZnJvbSBcIi4uL3V0aWwvdXRpbFwiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGJ1bGxldEJveCBleHRlbmRzIGJhc2VUcyB7XG5cbiAgICAvKirlrZDlvLnlr7nosaHmsaAgKi9cbiAgICBwcml2YXRlIGJ1bGxldFBvb2w6cG9vbDsgXG4gICAgXG4gICAgLyoq54K45byA5a+56LGh5rGgICovXG4gICAgcHJpdmF0ZSBib29tUG9vbDpwb29sOyBcblxuICAgIG9uTG9hZCAoKSB7XG5cbiAgICAgICAgLyoq5Yid5aeL5YyW5a+56LGh5rGgICovXG4gICAgICAgIHRoaXMubG9hZEFueShcInByZWZhYi90dXJyZXQvdHVycmV0QnVsbGV0XCIsY2MuUHJlZmFiLChyZXMpPT57XG5cbiAgICAgICAgICAgIGxldCBpdGVtOmNjLk5vZGUgPSBjYy5pbnN0YW50aWF0ZShyZXMpO1xuXG4gICAgICAgICAgICB0aGlzLmJ1bGxldFBvb2wgPSBuZXcgcG9vbChpdGVtLDEwKTtcblxuICAgICAgICB9KTtcblxuICAgICAgICAvKirliJ3lp4vljJblr7nosaHmsaAgKi9cbiAgICAgICAgdGhpcy5sb2FkQW55KFwicHJlZmFiL3R1cnJldC9CdWxsZXRCb29tXCIsY2MuUHJlZmFiLChyZXMpPT57XG5cbiAgICAgICAgICAgIGxldCBpdGVtOmNjLk5vZGUgPSBjYy5pbnN0YW50aWF0ZShyZXMpO1xuXG4gICAgICAgICAgICB0aGlzLmJvb21Qb29sID0gbmV3IHBvb2woaXRlbSw0MCk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoq55uR5ZCs5Yib5bu6ICovXG4gICAgICAgIGNjLmdhbWUub24oTmFtZVRzLkdhbWVfVHVycmV0X0J1bGxldF9DcmVhdG9yLChkYXRhKT0+e1xuXG4gICAgICAgICAgICB0aGlzLmJ1bGxldFBvb2wuY3JlYXRlRW5lbXkodGhpcy5ub2RlLGRhdGEpO1xuXG4gICAgICAgIH0sdGhpcyk7XG5cbiAgICAgICAgLyoq55uR5ZCs5Yib5bu6ICovXG4gICAgICAgIGNjLmdhbWUub24oTmFtZVRzLkdhbWVfQnVsbGV0X0Jvb21fQ3JlYXRvciwoZGF0YSk9PntcblxuICAgICAgICAgICAgdGhpcy5ib29tUG9vbC5jcmVhdGVFbmVteSh0aGlzLm5vZGUsZGF0YSk7XG5cbiAgICAgICAgfSx0aGlzKTtcblxuICAgICAgICAvKirnm5HlkKzplIDmr4EgKi9cbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9UdXJyZXRfQnVsbGV0X0tpbGxlZCwoZGF0YSk9PntcblxuICAgICAgICAgICAgdGhpcy5idWxsZXRQb29sLm9uRW5lbXlLaWxsZWQoZGF0YSk7XG4gICAgICAgICAgICBcbiAgICAgICAgfSx0aGlzKTtcblxuICAgICAgICAvKirnm5HlkKzplIDmr4EgKi9cbiAgICAgICAgY2MuZ2FtZS5vbihOYW1lVHMuR2FtZV9CdWxsZXRfQm9vbV9LaWxsZWQsKGRhdGEpPT57XG5cbiAgICAgICAgICAgIHRoaXMuYm9vbVBvb2wub25FbmVteUtpbGxlZChkYXRhKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9LHRoaXMpO1xuXG5cbiAgICB9XG5cbiAgICBzdGFydCAoKSB7XG5cbiAgICB9XG5cblxuICAgIFxuICAgIFxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=