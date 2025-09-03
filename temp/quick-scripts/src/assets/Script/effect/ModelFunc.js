"use strict";
cc._RF.push(module, '56c43ls+7lFuYuNe6gQlJEl', 'ModelFunc');
// Script/effect/ModelFunc.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ModelFunc = /** @class */ (function () {
    function ModelFunc() {
    }
    ModelFunc.createModel = function (name, parent, callback) {
        if (!this.pool_list[name]) {
            this.pool_list[name] = new cc.NodePool();
        }
        if (this.prefab_list[name]) {
            var temp = null;
            if (this.pool_list[name].size() > 0) {
                temp = this.pool_list[name].get();
            }
            else {
                temp = cc.instantiate(this.prefab_list[name]);
            }
            temp.parent = parent;
            temp.name = name;
            var script = temp.getComponent(name);
            callback && callback(temp, script);
        }
        else {
            var path = "prefab/effect/" + name;
            cc.loader.loadRes(path, cc.Prefab, function (err, prefab) {
                if (err) {
                    cc.error(err.message || err);
                    return;
                }
                var temp = cc.instantiate(prefab);
                var script = temp.getComponent(name);
                temp.parent = parent;
                temp.name = name;
                callback && callback(temp, script);
                this.prefab_list[name] = prefab;
            }.bind(this));
        }
    };
    ModelFunc.removeModel = function (name, node) {
        if (!this.pool_list[name]) {
            this.pool_list[name] = new cc.NodePool();
        }
        this.pool_list[name].put(node);
    };
    ModelFunc.prefab_list = new Map();
    ModelFunc.pool_list = new Map();
    return ModelFunc;
}());
exports.default = ModelFunc;

cc._RF.pop();