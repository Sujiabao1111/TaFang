
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/common/pool.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3fc1bWUYuRGfrz/ATv0QIaQ', 'pool');
// Script/common/pool.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pool = /** @class */ (function () {
    /**
     *
     * @param prefab 预制体
     * @param num 创建多少个
     */
    function pool(prefab, num) {
        if (num === void 0) { num = 10; }
        prefab.active = false;
        this.prefab = prefab;
        this.init(prefab, num);
    }
    /**
     * 初始化
     * @param prefab 预制体
     * @param num 创建多少个
     */
    pool.prototype.init = function (prefab, num) {
        if (num === void 0) { num = 10; }
        this.pool = new cc.NodePool();
        for (var i = 0; i < num; i++) {
            var enemy = cc.instantiate(prefab); // 创建节点
            enemy.active = false;
            this.pool.put(enemy); // 通过 put 接口放入对象池
        }
    };
    /**
     * 创建
     * @param parentNode 父节点
     * @param data
     */
    pool.prototype.createEnemy = function (parentNode, data) {
        if (data === void 0) { data = {}; }
        var enemy = null;
        if (this.pool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
            enemy = this.pool.get();
        }
        else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            enemy = cc.instantiate(this.prefab);
        }
        enemy.parent = parentNode; // 将生成的敌人加入节点树
        var enemyTs = enemy.getComponent(enemy.name);
        if (enemyTs)
            enemyTs.init && enemyTs.init(data); //接下来就可以调用 enemy 身上的脚本进行初始化
        enemy.active = true;
        return enemy;
    };
    /**
     * 回收
     * @param enemy 节点
     */
    pool.prototype.onEnemyKilled = function (enemy) {
        if (enemy && enemy.name) {
            if (this.prefab && enemy.name == this.prefab.name) {
                //     // enemy 应该是一个 cc.Node
                enemy.active = false;
                this.pool.put(enemy); // 和初始化时的方法一样，将节点放进对象池，这个方法会同时调用节点的 removeFromParent
            }
            else {
                enemy.destroy();
                enemy.removeFromParent();
                enemy = null;
            }
        }
    };
    /**
     * 清理对象池
     */
    pool.prototype.clearPool = function () {
        this.pool.clear();
    };
    return pool;
}());
exports.default = pool;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxjb21tb25cXHBvb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTtJQU1JOzs7O09BSUc7SUFDSCxjQUFZLE1BQWUsRUFBRSxHQUFnQjtRQUFoQixvQkFBQSxFQUFBLFFBQWdCO1FBQ3pDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBRTNCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ssbUJBQUksR0FBWixVQUFhLE1BQWUsRUFBRSxHQUFnQjtRQUFoQixvQkFBQSxFQUFBLFFBQWdCO1FBRTFDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDOUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMxQixJQUFJLEtBQUssR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTztZQUMzQyxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLGlCQUFpQjtTQUMxQztJQUNMLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsMEJBQVcsR0FBWCxVQUFZLFVBQW1CLEVBQUUsSUFBUztRQUFULHFCQUFBLEVBQUEsU0FBUztRQUN0QyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLDJCQUEyQjtZQUNuRCxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUMzQjthQUFNLEVBQUUsbURBQW1EO1lBQ3hELEtBQUssR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN2QztRQUNELEtBQUssQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDLENBQUMsY0FBYztRQUN6QyxJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QyxJQUFJLE9BQU87WUFBRSxPQUFPLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQywyQkFBMkI7UUFDNUUsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDcEIsT0FBTyxLQUFLLENBQUE7SUFDaEIsQ0FBQztJQUdEOzs7T0FHRztJQUVILDRCQUFhLEdBQWIsVUFBYyxLQUFjO1FBQ3hCLElBQUksS0FBSyxJQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUU7WUFDbkIsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7Z0JBQy9DLDZCQUE2QjtnQkFDN0IsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsb0RBQW9EO2FBQzdFO2lCQUNJO2dCQUNELEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDaEIsS0FBSyxDQUFDLGdCQUFnQixFQUFFLENBQUM7Z0JBQ3pCLEtBQUssR0FBRyxJQUFJLENBQUM7YUFDaEI7U0FDSjtJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNILHdCQUFTLEdBQVQ7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFDTCxXQUFDO0FBQUQsQ0EvRUEsQUErRUMsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgcG9vbCB7XG5cbiAgICBwcml2YXRlIHBvb2w6IGNjLk5vZGVQb29sO1xuXG4gICAgcHJpdmF0ZSBwcmVmYWI6IGNjLk5vZGU7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gcHJlZmFiIOmihOWItuS9k1xuICAgICAqIEBwYXJhbSBudW0g5Yib5bu65aSa5bCR5LiqXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocHJlZmFiOiBjYy5Ob2RlLCBudW06IG51bWJlciA9IDEwKSB7XG4gICAgICAgIHByZWZhYi5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wcmVmYWIgPSBwcmVmYWI7XG4gICAgICAgIHRoaXMuaW5pdChwcmVmYWIsIG51bSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliJ3lp4vljJZcbiAgICAgKiBAcGFyYW0gcHJlZmFiIOmihOWItuS9k1xuICAgICAqIEBwYXJhbSBudW0g5Yib5bu65aSa5bCR5LiqXG4gICAgICovXG4gICAgcHJpdmF0ZSBpbml0KHByZWZhYjogY2MuTm9kZSwgbnVtOiBudW1iZXIgPSAxMCkge1xuXG4gICAgICAgIHRoaXMucG9vbCA9IG5ldyBjYy5Ob2RlUG9vbCgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bTsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgZW5lbXkgPSBjYy5pbnN0YW50aWF0ZShwcmVmYWIpOyAvLyDliJvlu7roioLngrlcbiAgICAgICAgICAgIGVuZW15LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5wb29sLnB1dChlbmVteSk7IC8vIOmAmui/hyBwdXQg5o6l5Y+j5pS+5YWl5a+56LGh5rGgXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliJvlu7pcbiAgICAgKiBAcGFyYW0gcGFyZW50Tm9kZSDniLboioLngrlcbiAgICAgKiBAcGFyYW0gZGF0YSBcbiAgICAgKi9cbiAgICBjcmVhdGVFbmVteShwYXJlbnROb2RlOiBjYy5Ob2RlLCBkYXRhID0ge30pOiBjYy5Ob2RlIHtcbiAgICAgICAgbGV0IGVuZW15ID0gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMucG9vbC5zaXplKCkgPiAwKSB7IC8vIOmAmui/hyBzaXplIOaOpeWPo+WIpOaWreWvueixoeaxoOS4reaYr+WQpuacieepuumXsueahOWvueixoVxuICAgICAgICAgICAgZW5lbXkgPSB0aGlzLnBvb2wuZ2V0KCk7XG4gICAgICAgIH0gZWxzZSB7IC8vIOWmguaenOayoeacieepuumXsuWvueixoe+8jOS5n+WwseaYr+WvueixoeaxoOS4reWkh+eUqOWvueixoeS4jeWkn+aXtu+8jOaIkeS7rOWwseeUqCBjYy5pbnN0YW50aWF0ZSDph43mlrDliJvlu7pcbiAgICAgICAgICAgIGVuZW15ID0gY2MuaW5zdGFudGlhdGUodGhpcy5wcmVmYWIpO1xuICAgICAgICB9XG4gICAgICAgIGVuZW15LnBhcmVudCA9IHBhcmVudE5vZGU7IC8vIOWwhueUn+aIkOeahOaVjOS6uuWKoOWFpeiKgueCueagkVxuICAgICAgICBsZXQgZW5lbXlUcyA9IGVuZW15LmdldENvbXBvbmVudChlbmVteS5uYW1lKTtcbiAgICAgICAgaWYgKGVuZW15VHMpIGVuZW15VHMuaW5pdCAmJiBlbmVteVRzLmluaXQoZGF0YSk7IC8v5o6l5LiL5p2l5bCx5Y+v5Lul6LCD55SoIGVuZW15IOi6q+S4iueahOiEmuacrOi/m+ihjOWIneWni+WMllxuICAgICAgICBlbmVteS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICByZXR1cm4gZW5lbXlcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIOWbnuaUtlxuICAgICAqIEBwYXJhbSBlbmVteSDoioLngrlcbiAgICAgKi9cblxuICAgIG9uRW5lbXlLaWxsZWQoZW5lbXk6IGNjLk5vZGUpIHtcbiAgICAgICAgaWYgKGVuZW15JiZlbmVteS5uYW1lKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmVmYWIgJiYgZW5lbXkubmFtZSA9PSB0aGlzLnByZWZhYi5uYW1lKSB7XG4gICAgICAgICAgICAgICAgLy8gICAgIC8vIGVuZW15IOW6lOivpeaYr+S4gOS4qiBjYy5Ob2RlXG4gICAgICAgICAgICAgICAgZW5lbXkuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5wb29sLnB1dChlbmVteSk7IC8vIOWSjOWIneWni+WMluaXtueahOaWueazleS4gOagt++8jOWwhuiKgueCueaUvui/m+WvueixoeaxoO+8jOi/meS4quaWueazleS8muWQjOaXtuiwg+eUqOiKgueCueeahCByZW1vdmVGcm9tUGFyZW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbmVteS5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgZW5lbXkucmVtb3ZlRnJvbVBhcmVudCgpO1xuICAgICAgICAgICAgICAgIGVuZW15ID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOa4heeQhuWvueixoeaxoFxuICAgICAqL1xuICAgIGNsZWFyUG9vbCgpIHtcbiAgICAgICAgdGhpcy5wb29sLmNsZWFyKCk7XG4gICAgfVxufVxuIl19