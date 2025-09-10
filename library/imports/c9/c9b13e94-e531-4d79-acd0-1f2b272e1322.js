"use strict";
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