"use strict";
cc._RF.push(module, '7efccun505N/5LYXaaI3nCq', 'Loading');
// Script/server/xmsdk_cocos/Utils/Loading.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loading = void 0;
var Loading = /** @class */ (function () {
    function Loading(_text, disableClick) {
        this.loadingIns = null;
        this.loading = false;
        this.text = _text;
        this.disableClick = disableClick;
    }
    Loading.prototype.openLoading = function (text) {
        // if(!this.loading){
        //     this.loading = true;
        //     cc.loader.loadRes('/Prefabs/Loading', (err, prefab)=>{
        //         this.loading = false;
        //         if (err) {
        //             cc.error(err.message || err);
        //             return null;
        //         }
        //         this.loadingIns = cc.instantiate(prefab);
        //         this.loadingIns.getComponent('LoadinController').setListenerStatus(this.disableClick);
        //         if(text){
        //             this.loadingIns.getChildByName('content').getChildByName('label').getComponent(cc.Label).string = text; 
        //         }
        //         cc.director.getScene().getComponentInChildren(cc.Canvas).node.addChild(this.loadingIns);
        //     });
        // }   
    };
    Loading.prototype.closeLoading = function () {
        // if(this.loadingIns){
        //     this.loadingIns.destroy();
        // }else{
        //     let loadingNode = cc.director.getScene().getComponentInChildren(cc.Canvas).node.getChildByName('Loading');
        //     if(loadingNode){
        //         loadingNode.removeFromParent();
        //     }else{
        //         let sid = setInterval(()=>{
        //             if(cc.director.getScene().getComponentInChildren(cc.Canvas).node.getChildByName('Loading')){
        //                 cc.director.getScene().getComponentInChildren(cc.Canvas).node.getChildByName('Loading').removeFromParent();
        //                 clearInterval(sid);
        //             }
        //         },200)
        //     }
        // }
    };
    return Loading;
}());
exports.Loading = Loading;

cc._RF.pop();