
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/effect/GameEffect.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c9b136U5TFNeazQHysnLhMi', 'GameEffect');
// Script/effect/GameEffect.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameEffect = void 0;
var NameTs_1 = require("../common/NameTs");
var ModelFunc_1 = require("./ModelFunc");
//电子邮件puhalskijsemen@gmail.com
//源码网站 开vpn全局模式打开 http://web3incubators.com/
//电报https://t.me/gamecode999
exports.GameEffect = {
    playToolCls: function () {
        ModelFunc_1.default.createModel(NameTs_1.default.Tool_Effect_Name.Game_Prop_Cls, cc.director.getScene().getChildByName('Canvas'), function (node, script) {
            if (script) {
            }
        });
    },
    playToolShock: function () {
        ModelFunc_1.default.createModel(NameTs_1.default.Tool_Effect_Name.Game_Prop_Shock, cc.director.getScene().getChildByName('Canvas'), function (node, script) {
            if (script) {
            }
        });
    },
    playToolFrozen: function () {
        ModelFunc_1.default.createModel(NameTs_1.default.Tool_Effect_Name.Game_Prop_Frozen, cc.director.getScene().getChildByName('Canvas'), function (node, script) {
            if (script) {
                script.openPlist();
            }
        });
    },
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxlZmZlY3RcXEdhbWVFZmZlY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQXFDO0FBQ3JDLHlDQUFtQztBQUNuQyw4QkFBOEI7QUFDOUIsNENBQTRDO0FBQzVDLDRCQUE0QjtBQUNmLFFBQUEsVUFBVSxHQUFHO0lBQ3RCLFdBQVc7UUFDUCxtQkFBUyxDQUFDLFdBQVcsQ0FBQyxnQkFBTSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsRUFBRSxVQUFDLElBQUksRUFBRSxNQUFNO1lBQ3ZILElBQUksTUFBTSxFQUFFO2FBRVg7UUFDTCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCxhQUFhO1FBQ1QsbUJBQVMsQ0FBQyxXQUFXLENBQUMsZ0JBQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLEVBQUUsVUFBQyxJQUFJLEVBQUUsTUFBTTtZQUN6SCxJQUFJLE1BQU0sRUFBRTthQUVYO1FBQ0wsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQsY0FBYztRQUNWLG1CQUFTLENBQUMsV0FBVyxDQUFDLGdCQUFNLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLEVBQUUsVUFBQyxJQUFJLEVBQUUsTUFBTTtZQUMxSCxJQUFJLE1BQU0sRUFBRTtnQkFDUixNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7YUFDdEI7UUFDTCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7Q0FDSixDQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5hbWVUcyBmcm9tIFwiLi4vY29tbW9uL05hbWVUc1wiXG5pbXBvcnQgTW9kZWxGdW5jIGZyb20gXCIuL01vZGVsRnVuY1wiXG4vL+eUteWtkOmCruS7tnB1aGFsc2tpanNlbWVuQGdtYWlsLmNvbVxuLy/mupDnoIHnvZHnq5kg5byAdnBu5YWo5bGA5qih5byP5omT5byAIGh0dHA6Ly93ZWIzaW5jdWJhdG9ycy5jb20vXG4vL+eUteaKpWh0dHBzOi8vdC5tZS9nYW1lY29kZTk5OVxuZXhwb3J0IGNvbnN0IEdhbWVFZmZlY3QgPSB7XG4gICAgcGxheVRvb2xDbHMoKXtcbiAgICAgICAgTW9kZWxGdW5jLmNyZWF0ZU1vZGVsKE5hbWVUcy5Ub29sX0VmZmVjdF9OYW1lLkdhbWVfUHJvcF9DbHMsIGNjLmRpcmVjdG9yLmdldFNjZW5lKCkuZ2V0Q2hpbGRCeU5hbWUoJ0NhbnZhcycpLCAobm9kZSwgc2NyaXB0KSA9PiB7XG4gICAgICAgICAgICBpZiAoc2NyaXB0KSB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfSxcblxuICAgIHBsYXlUb29sU2hvY2soKXtcbiAgICAgICAgTW9kZWxGdW5jLmNyZWF0ZU1vZGVsKE5hbWVUcy5Ub29sX0VmZmVjdF9OYW1lLkdhbWVfUHJvcF9TaG9jaywgY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5nZXRDaGlsZEJ5TmFtZSgnQ2FudmFzJyksIChub2RlLCBzY3JpcHQpID0+IHtcbiAgICAgICAgICAgIGlmIChzY3JpcHQpIHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9LFxuXG4gICAgcGxheVRvb2xGcm96ZW4oKXtcbiAgICAgICAgTW9kZWxGdW5jLmNyZWF0ZU1vZGVsKE5hbWVUcy5Ub29sX0VmZmVjdF9OYW1lLkdhbWVfUHJvcF9Gcm96ZW4sIGNjLmRpcmVjdG9yLmdldFNjZW5lKCkuZ2V0Q2hpbGRCeU5hbWUoJ0NhbnZhcycpLCAobm9kZSwgc2NyaXB0KSA9PiB7XG4gICAgICAgICAgICBpZiAoc2NyaXB0KSB7XG4gICAgICAgICAgICAgICAgc2NyaXB0Lm9wZW5QbGlzdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0sXG59Il19