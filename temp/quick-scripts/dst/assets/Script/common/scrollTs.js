
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/common/scrollTs.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxjb21tb25cXHNjcm9sbFRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0JBQTBCO0FBRTFCO0lBYUksa0JBQVksTUFBYyxFQUFDLFVBQXdCLEVBQUMsVUFBb0IsRUFBQyxJQUFRLEVBQUMsR0FBd0I7UUFBeEIsb0JBQUEsRUFBQSxNQUFhLElBQUksQ0FBQyxNQUFNO1FBRXRHLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxjQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBQyxFQUFFLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUdELHVCQUFJLEdBQUo7UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFDbEIsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFFLEVBQUM7WUFDekIsSUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDO2dCQUNaLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNuQztTQUNKO1FBRUQsb0VBQW9FO1FBRXBFLDJCQUEyQjtRQUMzQiw4QkFBOEI7UUFFOUIsV0FBVztRQUVYLGlFQUFpRTtRQUVqRSwyQkFBMkI7UUFDM0IsNkJBQTZCO1FBRTdCLFdBQVc7SUFFZixDQUFDO0lBR0QsMkJBQVEsR0FBUixVQUFTLEdBQVUsRUFBQyxNQUFjO1FBRTlCLElBQUcsSUFBSSxDQUFDLFFBQVEsR0FBQyxHQUFHLEdBQUMsQ0FBQyxJQUFFLE1BQU07WUFBQyxPQUFPO1FBQ3RDLElBQUk7UUFDSixLQUFJLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBQyxDQUFDLEdBQUMsQ0FBQyxHQUFFO1lBQ2pCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQzFFLENBQUMsRUFBRSxDQUFDO1NBQ1A7UUFFRCxJQUFJO1FBQ0osS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxHQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUUsRUFBQztZQUNwQixJQUFJLEVBQUUsR0FBVSxJQUFJLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQztZQUM5QixJQUFHLE1BQU0sRUFBQztnQkFDTixFQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDO2FBQzFCO1lBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ3JDO1FBRUQsSUFBSSxPQUFPLEdBQVcsQ0FBQyxDQUFDO1FBQ3hCLElBQUcsTUFBTSxFQUFDO1lBQ04sSUFBSSxDQUFDLFFBQVEsSUFBRyxHQUFHLENBQUM7WUFDcEIsSUFBSSxDQUFDLE1BQU0sSUFBRyxHQUFHLENBQUM7WUFDbEIsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDO1NBQzNDO2FBQUk7WUFDRCxJQUFJLENBQUMsUUFBUSxJQUFHLEdBQUcsQ0FBQztZQUNwQixJQUFJLENBQUMsTUFBTSxJQUFHLEdBQUcsQ0FBQztZQUNsQixPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxFQUFFLENBQUM7U0FDM0M7UUFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUdEOzs7T0FHRztJQUNILDZCQUFVLEdBQVYsVUFBVyxDQUFDLEVBQUMsSUFBSTtRQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUMsRUFBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLElBQUksTUFBQSxFQUFDLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsNEJBQVMsR0FBVCxVQUFVLElBQVk7UUFFbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFbEMsQ0FBQztJQUVMLGVBQUM7QUFBRCxDQXJHQSxBQXFHQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBvb2wgZnJvbSBcIi4vcG9vbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBzY3JvbGxUc3tcblxuICAgIHByaXZhdGUgcGFyZW50OmNjLk5vZGU7IC8v5Zyo5ZOq6YeM55Sf5oiQXG4gICAgcHJpdmF0ZSBzY3JvbGxWaWV3OmNjLlNjcm9sbFZpZXc7Ly/mu5rliqhcbiAgICBwcml2YXRlIHByZWZhYkl0ZW06Y2MuTm9kZTsvL2l0ZW3nmoToioLngrlcbiAgICBwcml2YXRlIG51bTpudW1iZXI7Ly/pu5jorqTlj6rnlKgyMOS4qlxuICAgIHByaXZhdGUgZGF0YTphbnk7Ly/mlbDmja5cblxuICAgIHByaXZhdGUgcG9vbDpwb29sO1xuXG4gICAgcHJpdmF0ZSBzdGFydE51bTpudW1iZXI7XG4gICAgcHJpdmF0ZSBlbmROdW06bnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IocGFyZW50OmNjLk5vZGUsc2Nyb2xsVmlldzpjYy5TY3JvbGxWaWV3LHByZWZhYkl0ZW06Y2MuUHJlZmFiLGRhdGE6YW55LG51bTpudW1iZXIgPSBkYXRhLmxlbmd0aCl7XG5cbiAgICAgICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgICAgIHRoaXMuc2Nyb2xsVmlldyA9IHNjcm9sbFZpZXc7XG4gICAgICAgIHRoaXMucHJlZmFiSXRlbSA9IGNjLmluc3RhbnRpYXRlKHByZWZhYkl0ZW0pO1xuICAgICAgICB0aGlzLm51bSA9IG51bTtcbiAgICAgICAgdGhpcy5wb29sID0gbmV3IHBvb2wodGhpcy5wcmVmYWJJdGVtLDIwKTtcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuXG5cbiAgICBpbml0KCl7XG4gICAgICAgIHRoaXMuZW5kTnVtID0gdGhpcy5udW07XG4gICAgICAgIHRoaXMuc3RhcnROdW0gPSAwO1xuICAgICAgICBmb3IobGV0IGkgPSAwO2k8dGhpcy5udW07aSsrKXtcbiAgICAgICAgICAgIGlmKHRoaXMuZGF0YVtpXSl7XG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVJdGVtKGksdGhpcy5kYXRhW2ldKTtcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRoaXMuc2Nyb2xsVmlldy5ub2RlLm9uKFwic2Nyb2xsLXRvLWJvdHRvbVwiLChyZXM6Y2MuU2Nyb2xsVmlldyk9PntcblxuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coXCLliY3lh4/lkI7liqBcIik7XG4gICAgICAgIC8vICAgICB0aGlzLmNyZWF0ZUZuKDgsZmFsc2UpO1xuXG4gICAgICAgIC8vIH0sdGhpcyk7XG5cbiAgICAgICAgLy8gdGhpcy5zY3JvbGxWaWV3Lm5vZGUub24oXCJzY3JvbGwtdG8tdG9wXCIsKHJlczpjYy5TY3JvbGxWaWV3KT0+e1xuXG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhcIuWJjeWKoOWQjuWHj1wiKTtcbiAgICAgICAgLy8gICAgIHRoaXMuY3JlYXRlRm4oOCx0cnVlKTtcblxuICAgICAgICAvLyB9LHRoaXMpO1xuXG4gICAgfVxuXG5cbiAgICBjcmVhdGVGbihudW06bnVtYmVyLGJlZm9yZTpib29sZWFuKXtcblxuICAgICAgICBpZih0aGlzLnN0YXJ0TnVtLW51bTwwJiZiZWZvcmUpcmV0dXJuO1xuICAgICAgICAvL+WHj+aOiVxuICAgICAgICBmb3IobGV0IGkgPSBudW07aT4wOyl7XG4gICAgICAgICAgICB0aGlzLmNsZWFySXRlbSh0aGlzLnBhcmVudC5jaGlsZHJlblshYmVmb3JlPzA6dGhpcy5wYXJlbnQuY2hpbGRyZW5Db3VudF0pO1xuICAgICAgICAgICAgaS0tO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvL+WinuWKoFxuICAgICAgICBmb3IobGV0IGkgPSAwO2k8bnVtO2krKyl7XG4gICAgICAgICAgICBsZXQgaWQ6bnVtYmVyID0gdGhpcy5lbmROdW0raTtcbiAgICAgICAgICAgIGlmKGJlZm9yZSl7XG4gICAgICAgICAgICAgICAgaWQgPSB0aGlzLnN0YXJ0TnVtLTEtaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY3JlYXRlSXRlbShpZCx0aGlzLmRhdGFbaWRdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzY3JvbGxZOm51bWJlciAgPSAwO1xuICAgICAgICBpZihiZWZvcmUpe1xuICAgICAgICAgICAgdGhpcy5zdGFydE51bSAtPW51bTtcbiAgICAgICAgICAgIHRoaXMuZW5kTnVtIC09bnVtO1xuICAgICAgICAgICAgc2Nyb2xsWSA9IHRoaXMucHJlZmFiSXRlbS5oZWlnaHQqMysyKjEwO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMuc3RhcnROdW0gKz1udW07XG4gICAgICAgICAgICB0aGlzLmVuZE51bSArPW51bTtcbiAgICAgICAgICAgIHNjcm9sbFkgPSB0aGlzLnByZWZhYkl0ZW0uaGVpZ2h0KjIrMSoxMDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNjcm9sbFZpZXcuc2V0Q29udGVudFBvc2l0aW9uKGNjLnYyKDAsc2Nyb2xsWSkpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICog5Yib5bu6XG4gICAgICogQHBhcmFtIGRhdGEg5pWw5o2uXG4gICAgICovXG4gICAgY3JlYXRlSXRlbShpLGRhdGEpe1xuICAgICAgICB0aGlzLnBvb2wuY3JlYXRlRW5lbXkodGhpcy5wYXJlbnQse2lkOmksZGF0YX0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWbnuaUtlxuICAgICAqIEBwYXJhbSBub2RlIOiKgueCuVxuICAgICAqL1xuICAgIGNsZWFySXRlbShub2RlOmNjLk5vZGUpe1xuXG4gICAgICAgIHRoaXMucG9vbC5vbkVuZW15S2lsbGVkKG5vZGUpO1xuXG4gICAgfVxuICAgIFxufVxuIl19