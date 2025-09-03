
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/server/xmsdk_cocos/Utils/Loading.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxzZXJ2ZXJcXHhtc2RrX2NvY29zXFxVdGlsc1xcTG9hZGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtJQU1JLGlCQUFZLEtBQWEsRUFBRSxZQUFxQjtRQUxoRCxlQUFVLEdBQVksSUFBSSxDQUFDO1FBRzNCLFlBQU8sR0FBVyxLQUFLLENBQUM7UUFHcEIsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7UUFDbEIsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7SUFDckMsQ0FBQztJQUNNLDZCQUFXLEdBQWxCLFVBQW1CLElBQWE7UUFDNUIscUJBQXFCO1FBQ3JCLDJCQUEyQjtRQUUzQiw2REFBNkQ7UUFDN0QsZ0NBQWdDO1FBQ2hDLHFCQUFxQjtRQUNyQiw0Q0FBNEM7UUFDNUMsMkJBQTJCO1FBQzNCLFlBQVk7UUFDWixvREFBb0Q7UUFDcEQsaUdBQWlHO1FBQ2pHLG9CQUFvQjtRQUNwQix1SEFBdUg7UUFDdkgsWUFBWTtRQUNaLG1HQUFtRztRQUVuRyxVQUFVO1FBQ1YsT0FBTztJQUNYLENBQUM7SUFFTSw4QkFBWSxHQUFuQjtRQUNJLHVCQUF1QjtRQUN2QixpQ0FBaUM7UUFDakMsU0FBUztRQUNULGlIQUFpSDtRQUNqSCx1QkFBdUI7UUFDdkIsMENBQTBDO1FBQzFDLGFBQWE7UUFDYixzQ0FBc0M7UUFDdEMsMkdBQTJHO1FBQzNHLDhIQUE4SDtRQUM5SCxzQ0FBc0M7UUFDdEMsZ0JBQWdCO1FBRWhCLGlCQUFpQjtRQUNqQixRQUFRO1FBQ1IsSUFBSTtJQUNSLENBQUM7SUFDTCxjQUFDO0FBQUQsQ0FqREEsQUFpREMsSUFBQTtBQWpEWSwwQkFBTyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBMb2FkaW5nIHtcbiAgICBsb2FkaW5nSW5zOiBjYy5Ob2RlID0gbnVsbDtcbiAgICB0ZXh0OiBzdHJpbmc7XG4gICAgZGlzYWJsZUNsaWNrOiBib29sZWFuO1xuICAgIGxvYWRpbmc6Ym9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IoX3RleHQ6IHN0cmluZywgZGlzYWJsZUNsaWNrOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMudGV4dCA9IF90ZXh0O1xuICAgICAgICB0aGlzLmRpc2FibGVDbGljayA9IGRpc2FibGVDbGljaztcbiAgICB9XG4gICAgcHVibGljIG9wZW5Mb2FkaW5nKHRleHQ/OiBzdHJpbmcpOiB2b2lke1xuICAgICAgICAvLyBpZighdGhpcy5sb2FkaW5nKXtcbiAgICAgICAgLy8gICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgLy8gICAgIGNjLmxvYWRlci5sb2FkUmVzKCcvUHJlZmFicy9Mb2FkaW5nJywgKGVyciwgcHJlZmFiKT0+e1xuICAgICAgICAvLyAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAvLyAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgY2MuZXJyb3IoZXJyLm1lc3NhZ2UgfHwgZXJyKTtcbiAgICAgICAgLy8gICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgIHRoaXMubG9hZGluZ0lucyA9IGNjLmluc3RhbnRpYXRlKHByZWZhYik7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5sb2FkaW5nSW5zLmdldENvbXBvbmVudCgnTG9hZGluQ29udHJvbGxlcicpLnNldExpc3RlbmVyU3RhdHVzKHRoaXMuZGlzYWJsZUNsaWNrKTtcbiAgICAgICAgLy8gICAgICAgICBpZih0ZXh0KXtcbiAgICAgICAgLy8gICAgICAgICAgICAgdGhpcy5sb2FkaW5nSW5zLmdldENoaWxkQnlOYW1lKCdjb250ZW50JykuZ2V0Q2hpbGRCeU5hbWUoJ2xhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0ZXh0OyBcbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5nZXRDb21wb25lbnRJbkNoaWxkcmVuKGNjLkNhbnZhcykubm9kZS5hZGRDaGlsZCh0aGlzLmxvYWRpbmdJbnMpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAvLyAgICAgfSk7XG4gICAgICAgIC8vIH0gICBcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xvc2VMb2FkaW5nKCk6IHZvaWR7XG4gICAgICAgIC8vIGlmKHRoaXMubG9hZGluZ0lucyl7XG4gICAgICAgIC8vICAgICB0aGlzLmxvYWRpbmdJbnMuZGVzdHJveSgpO1xuICAgICAgICAvLyB9ZWxzZXtcbiAgICAgICAgLy8gICAgIGxldCBsb2FkaW5nTm9kZSA9IGNjLmRpcmVjdG9yLmdldFNjZW5lKCkuZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihjYy5DYW52YXMpLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ0xvYWRpbmcnKTtcbiAgICAgICAgLy8gICAgIGlmKGxvYWRpbmdOb2RlKXtcbiAgICAgICAgLy8gICAgICAgICBsb2FkaW5nTm9kZS5yZW1vdmVGcm9tUGFyZW50KCk7XG4gICAgICAgIC8vICAgICB9ZWxzZXtcbiAgICAgICAgLy8gICAgICAgICBsZXQgc2lkID0gc2V0SW50ZXJ2YWwoKCk9PntcbiAgICAgICAgLy8gICAgICAgICAgICAgaWYoY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5nZXRDb21wb25lbnRJbkNoaWxkcmVuKGNjLkNhbnZhcykubm9kZS5nZXRDaGlsZEJ5TmFtZSgnTG9hZGluZycpKXtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGNjLmRpcmVjdG9yLmdldFNjZW5lKCkuZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihjYy5DYW52YXMpLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ0xvYWRpbmcnKS5yZW1vdmVGcm9tUGFyZW50KCk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHNpZCk7XG4gICAgICAgIC8vICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgIC8vICAgICAgICAgfSwyMDApXG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cbiAgICB9XG59Il19