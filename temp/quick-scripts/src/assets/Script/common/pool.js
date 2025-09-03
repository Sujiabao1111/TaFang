"use strict";
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