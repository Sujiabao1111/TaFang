export default class ModelFunc {
    static prefab_list: Map<string, cc.Prefab> = new Map()
    static pool_list: Map<string, cc.NodePool> = new Map()
    static createModel(name, parent, callback) {
        if (!this.pool_list[name]) {
            this.pool_list[name] = new cc.NodePool()
        }

        if (this.prefab_list[name]) {
            var temp: cc.Node = null;
            if (this.pool_list[name].size() > 0) {
                temp = this.pool_list[name].get()
            } else {
                temp = cc.instantiate(this.prefab_list[name])
            }
            temp.parent = parent
            temp.name = name;
            var script = temp.getComponent(name)
            callback && callback(temp, script)
        } else {
            let path = `prefab/effect/${name}`;
            cc.loader.loadRes(path, cc.Prefab, function (err, prefab) {
                if (err) {
                    cc.error(err.message || err);
                    return;
                }
                var temp = cc.instantiate(prefab);
                var script = temp.getComponent(name)
                temp.parent = parent;
                temp.name = name;
                callback && callback(temp, script)
                this.prefab_list[name] = prefab
            }.bind(this));
        }
    }
    static removeModel(name: string, node: cc.Node) {
        if (!this.pool_list[name]) {
            this.pool_list[name] = new cc.NodePool()
        }
        this.pool_list[name].put(node)
    }

}
