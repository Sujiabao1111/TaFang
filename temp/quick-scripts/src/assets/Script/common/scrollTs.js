"use strict";
cc._RF.push(module, '0d903RlUDJA0oTJXorxy6o+', 'scrollTs');
// Script/common/scrollTs.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pool_1 = require("./pool");
var scrollTs = /** @class */ (function () {
    function scrollTs(parent, scrollView, prefabItem, data, num) {
        if (num === void 0) { num = data.length; }
        this.parent = parent;
        this.scrollView = scrollView;
        this.prefabItem = cc.instantiate(prefabItem);
        this.num = num;
        this.pool = new pool_1.default(this.prefabItem, 20);
        this.data = data;
        this.init();
    }
    scrollTs.prototype.init = function () {
        this.endNum = this.num;
        this.startNum = 0;
        for (var i = 0; i < this.num; i++) {
            if (this.data[i]) {
                this.createItem(i, this.data[i]);
            }
        }
        // this.scrollView.node.on("scroll-to-bottom",(res:cc.ScrollView)=>{
        //     console.log("前减后加");
        //     this.createFn(8,false);
        // },this);
        // this.scrollView.node.on("scroll-to-top",(res:cc.ScrollView)=>{
        //     console.log("前加后减");
        //     this.createFn(8,true);
        // },this);
    };
    scrollTs.prototype.createFn = function (num, before) {
        if (this.startNum - num < 0 && before)
            return;
        //减掉
        for (var i = num; i > 0;) {
            this.clearItem(this.parent.children[!before ? 0 : this.parent.childrenCount]);
            i--;
        }
        //增加
        for (var i = 0; i < num; i++) {
            var id = this.endNum + i;
            if (before) {
                id = this.startNum - 1 - i;
            }
            this.createItem(id, this.data[id]);
        }
        var scrollY = 0;
        if (before) {
            this.startNum -= num;
            this.endNum -= num;
            scrollY = this.prefabItem.height * 3 + 2 * 10;
        }
        else {
            this.startNum += num;
            this.endNum += num;
            scrollY = this.prefabItem.height * 2 + 1 * 10;
        }
        this.scrollView.setContentPosition(cc.v2(0, scrollY));
    };
    /**
     * 创建
     * @param data 数据
     */
    scrollTs.prototype.createItem = function (i, data) {
        this.pool.createEnemy(this.parent, { id: i, data: data });
    };
    /**
     * 回收
     * @param node 节点
     */
    scrollTs.prototype.clearItem = function (node) {
        this.pool.onEnemyKilled(node);
    };
    return scrollTs;
}());
exports.default = scrollTs;

cc._RF.pop();