
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/server/xmsdk_cocos/Adapter/PlatformFactory.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4b2c3R79eFEno47g5GOQeyG', 'PlatformFactory');
// Script/server/xmsdk_cocos/Adapter/PlatformFactory.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PreviewPlatform_1 = require("./PreviewPlatform");
var InnerWebPlatform_1 = require("./InnerWebPlatform");
var AndroidNativePlatform_1 = require("./AndroidNativePlatform");
var PlatformFactory = /** @class */ (function () {
    function PlatformFactory() {
    }
    Object.defineProperty(PlatformFactory, "Ins", {
        get: function () {
            if (PlatformFactory._ins == null) {
                if (true && !window["_dsbridge"]) {
                    console.log('cocos直接点击那个预览按钮，在浏览器打开');
                    //cocos直接点击那个预览按钮，在浏览器打开
                    PlatformFactory._ins = new PreviewPlatform_1.default();
                }
                else if (cc.sys.isBrowser) {
                    console.log('app内嵌网页');
                    //浏览器
                    PlatformFactory._ins = new InnerWebPlatform_1.default();
                }
                else if (cc.sys.os == cc.sys.OS_ANDROID) {
                    console.log('安卓原生');
                    //安卓原生
                    PlatformFactory._ins = new AndroidNativePlatform_1.default();
                }
            }
            return PlatformFactory._ins;
        },
        enumerable: false,
        configurable: true
    });
    // 单例模式
    PlatformFactory._ins = null;
    return PlatformFactory;
}());
exports.default = PlatformFactory;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxzZXJ2ZXJcXHhtc2RrX2NvY29zXFxBZGFwdGVyXFxQbGF0Zm9ybUZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxxREFBZ0Q7QUFDaEQsdURBQWtEO0FBQ2xELGlFQUE0RDtBQUU1RDtJQUFBO0lBdUJBLENBQUM7SUFsQkcsc0JBQWtCLHNCQUFHO2FBQXJCO1lBQ0ksSUFBSSxlQUFlLENBQUMsSUFBSSxJQUFJLElBQUksRUFBRTtnQkFDOUIsSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUU7b0JBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQztvQkFDdEMsd0JBQXdCO29CQUN4QixlQUFlLENBQUMsSUFBSSxHQUFHLElBQUkseUJBQWUsRUFBRSxDQUFDO2lCQUNoRDtxQkFBTSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFO29CQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUN2QixLQUFLO29CQUNMLGVBQWUsQ0FBQyxJQUFJLEdBQUcsSUFBSSwwQkFBZ0IsRUFBRSxDQUFDO2lCQUNqRDtxQkFBTSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFO29CQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUNwQixNQUFNO29CQUNOLGVBQWUsQ0FBQyxJQUFJLEdBQUcsSUFBSSwrQkFBcUIsRUFBRSxDQUFDO2lCQUN0RDthQUNKO1lBQ0QsT0FBTyxlQUFlLENBQUMsSUFBSSxDQUFDO1FBQ2hDLENBQUM7OztPQUFBO0lBcEJELE9BQU87SUFDUSxvQkFBSSxHQUFjLElBQUksQ0FBQztJQW9CMUMsc0JBQUM7Q0F2QkQsQUF1QkMsSUFBQTtrQkF2Qm9CLGVBQWUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSVBsYXRmb3JtIGZyb20gXCIuL0Jhc2UvSVBsYXRmb3JtXCI7XG5pbXBvcnQgUHJldmlld1BsYXRmb3JtIGZyb20gXCIuL1ByZXZpZXdQbGF0Zm9ybVwiO1xuaW1wb3J0IElubmVyV2ViUGxhdGZvcm0gZnJvbSBcIi4vSW5uZXJXZWJQbGF0Zm9ybVwiO1xuaW1wb3J0IEFuZHJvaWROYXRpdmVQbGF0Zm9ybSBmcm9tIFwiLi9BbmRyb2lkTmF0aXZlUGxhdGZvcm1cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxhdGZvcm1GYWN0b3J5IHtcblxuICAgIC8vIOWNleS+i+aooeW8j1xuICAgIHByaXZhdGUgc3RhdGljIF9pbnM6IElQbGF0Zm9ybSA9IG51bGw7XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldCBJbnMoKTogSVBsYXRmb3JtIHtcbiAgICAgICAgaWYgKFBsYXRmb3JtRmFjdG9yeS5faW5zID09IG51bGwpIHtcbiAgICAgICAgICAgIGlmICh0cnVlICYmICF3aW5kb3dbXCJfZHNicmlkZ2VcIl0pIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY29jb3Pnm7TmjqXngrnlh7vpgqPkuKrpooTop4jmjInpkq7vvIzlnKjmtY/op4jlmajmiZPlvIAnKTtcbiAgICAgICAgICAgICAgICAvL2NvY29z55u05o6l54K55Ye76YKj5Liq6aKE6KeI5oyJ6ZKu77yM5Zyo5rWP6KeI5Zmo5omT5byAXG4gICAgICAgICAgICAgICAgUGxhdGZvcm1GYWN0b3J5Ll9pbnMgPSBuZXcgUHJldmlld1BsYXRmb3JtKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNjLnN5cy5pc0Jyb3dzZXIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnYXBw5YaF5bWM572R6aG1Jyk7XG4gICAgICAgICAgICAgICAgLy/mtY/op4jlmahcbiAgICAgICAgICAgICAgICBQbGF0Zm9ybUZhY3RvcnkuX2lucyA9IG5ldyBJbm5lcldlYlBsYXRmb3JtKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfQU5EUk9JRCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCflronljZPljp/nlJ8nKTtcbiAgICAgICAgICAgICAgICAvL+WuieWNk+WOn+eUn1xuICAgICAgICAgICAgICAgIFBsYXRmb3JtRmFjdG9yeS5faW5zID0gbmV3IEFuZHJvaWROYXRpdmVQbGF0Zm9ybSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQbGF0Zm9ybUZhY3RvcnkuX2lucztcbiAgICB9XG59Il19