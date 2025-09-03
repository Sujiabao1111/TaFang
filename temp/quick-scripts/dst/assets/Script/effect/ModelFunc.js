
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/effect/ModelFunc.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxlZmZlY3RcXE1vZGVsRnVuYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0lBQUE7SUEwQ0EsQ0FBQztJQXZDVSxxQkFBVyxHQUFsQixVQUFtQixJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVE7UUFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtTQUMzQztRQUVELElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN4QixJQUFJLElBQUksR0FBWSxJQUFJLENBQUM7WUFDekIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRTtnQkFDakMsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUE7YUFDcEM7aUJBQU07Z0JBQ0gsSUFBSSxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO2FBQ2hEO1lBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUE7WUFDcEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDakIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUNwQyxRQUFRLElBQUksUUFBUSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQTtTQUNyQzthQUFNO1lBQ0gsSUFBSSxJQUFJLEdBQUcsbUJBQWlCLElBQU0sQ0FBQztZQUNuQyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFVLEdBQUcsRUFBRSxNQUFNO2dCQUNwRCxJQUFJLEdBQUcsRUFBRTtvQkFDTCxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLElBQUksR0FBRyxDQUFDLENBQUM7b0JBQzdCLE9BQU87aUJBQ1Y7Z0JBQ0QsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDbEMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDcEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO2dCQUNqQixRQUFRLElBQUksUUFBUSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQTtnQkFDbEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUE7WUFDbkMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ2pCO0lBQ0wsQ0FBQztJQUNNLHFCQUFXLEdBQWxCLFVBQW1CLElBQVksRUFBRSxJQUFhO1FBQzFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUE7U0FDM0M7UUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNsQyxDQUFDO0lBdkNNLHFCQUFXLEdBQTJCLElBQUksR0FBRyxFQUFFLENBQUE7SUFDL0MsbUJBQVMsR0FBNkIsSUFBSSxHQUFHLEVBQUUsQ0FBQTtJQXdDMUQsZ0JBQUM7Q0ExQ0QsQUEwQ0MsSUFBQTtrQkExQ29CLFNBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBNb2RlbEZ1bmMge1xuICAgIHN0YXRpYyBwcmVmYWJfbGlzdDogTWFwPHN0cmluZywgY2MuUHJlZmFiPiA9IG5ldyBNYXAoKVxuICAgIHN0YXRpYyBwb29sX2xpc3Q6IE1hcDxzdHJpbmcsIGNjLk5vZGVQb29sPiA9IG5ldyBNYXAoKVxuICAgIHN0YXRpYyBjcmVhdGVNb2RlbChuYW1lLCBwYXJlbnQsIGNhbGxiYWNrKSB7XG4gICAgICAgIGlmICghdGhpcy5wb29sX2xpc3RbbmFtZV0pIHtcbiAgICAgICAgICAgIHRoaXMucG9vbF9saXN0W25hbWVdID0gbmV3IGNjLk5vZGVQb29sKClcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnByZWZhYl9saXN0W25hbWVdKSB7XG4gICAgICAgICAgICB2YXIgdGVtcDogY2MuTm9kZSA9IG51bGw7XG4gICAgICAgICAgICBpZiAodGhpcy5wb29sX2xpc3RbbmFtZV0uc2l6ZSgpID4gMCkge1xuICAgICAgICAgICAgICAgIHRlbXAgPSB0aGlzLnBvb2xfbGlzdFtuYW1lXS5nZXQoKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0ZW1wID0gY2MuaW5zdGFudGlhdGUodGhpcy5wcmVmYWJfbGlzdFtuYW1lXSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRlbXAucGFyZW50ID0gcGFyZW50XG4gICAgICAgICAgICB0ZW1wLm5hbWUgPSBuYW1lO1xuICAgICAgICAgICAgdmFyIHNjcmlwdCA9IHRlbXAuZ2V0Q29tcG9uZW50KG5hbWUpXG4gICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayh0ZW1wLCBzY3JpcHQpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgcGF0aCA9IGBwcmVmYWIvZWZmZWN0LyR7bmFtZX1gO1xuICAgICAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMocGF0aCwgY2MuUHJlZmFiLCBmdW5jdGlvbiAoZXJyLCBwcmVmYWIpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNjLmVycm9yKGVyci5tZXNzYWdlIHx8IGVycik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHRlbXAgPSBjYy5pbnN0YW50aWF0ZShwcmVmYWIpO1xuICAgICAgICAgICAgICAgIHZhciBzY3JpcHQgPSB0ZW1wLmdldENvbXBvbmVudChuYW1lKVxuICAgICAgICAgICAgICAgIHRlbXAucGFyZW50ID0gcGFyZW50O1xuICAgICAgICAgICAgICAgIHRlbXAubmFtZSA9IG5hbWU7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2sodGVtcCwgc2NyaXB0KVxuICAgICAgICAgICAgICAgIHRoaXMucHJlZmFiX2xpc3RbbmFtZV0gPSBwcmVmYWJcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIHJlbW92ZU1vZGVsKG5hbWU6IHN0cmluZywgbm9kZTogY2MuTm9kZSkge1xuICAgICAgICBpZiAoIXRoaXMucG9vbF9saXN0W25hbWVdKSB7XG4gICAgICAgICAgICB0aGlzLnBvb2xfbGlzdFtuYW1lXSA9IG5ldyBjYy5Ob2RlUG9vbCgpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wb29sX2xpc3RbbmFtZV0ucHV0KG5vZGUpXG4gICAgfVxuXG59XG4iXX0=