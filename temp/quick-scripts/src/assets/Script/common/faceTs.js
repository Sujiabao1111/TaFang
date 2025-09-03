"use strict";
cc._RF.push(module, '2c8bexbJtlFnpsMFiqr+pi1', 'faceTs');
// Script/common/faceTs.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.propType = exports.propState = exports.updateType = exports.gameNumerical = exports.gamePass = exports.gameState = exports.thingType = void 0;
/**命名类型 */
var thingType;
(function (thingType) {
    //塔防
    thingType[thingType["turret"] = 1] = "turret";
    //天降金币
    thingType[thingType["heavenCoin"] = 2] = "heavenCoin";
    //回收站
    thingType[thingType["recycle"] = 3] = "recycle";
})(thingType = exports.thingType || (exports.thingType = {}));
/**游戏状态 */
var gameState;
(function (gameState) {
    //未开始
    gameState[gameState["default"] = 0] = "default";
    //游戏开始
    gameState[gameState["start"] = 1] = "start";
    //游戏结束
    gameState[gameState["end"] = 2] = "end";
    //游戏暂停
    gameState[gameState["stop"] = 3] = "stop";
})(gameState = exports.gameState || (exports.gameState = {}));
/**通关状态 */
var gamePass;
(function (gamePass) {
    //成功
    gamePass[gamePass["success"] = 1] = "success";
    //失败
    gamePass[gamePass["fail"] = 0] = "fail";
    //最后一关
    gamePass[gamePass["last"] = 2] = "last";
})(gamePass = exports.gamePass || (exports.gamePass = {}));
/**游戏普通数值 */
var gameNumerical;
(function (gameNumerical) {
    //产能最大值
    gameNumerical[gameNumerical["ProductMax"] = 20] = "ProductMax";
    //产能时间
    gameNumerical[gameNumerical["ProductTime"] = 30] = "ProductTime";
    //关闭时间
    gameNumerical[gameNumerical["closeTime"] = 2] = "closeTime";
})(gameNumerical = exports.gameNumerical || (exports.gameNumerical = {}));
/**游戏更新类别 */
var updateType;
(function (updateType) {
    //金币
    updateType[updateType["coin"] = 0] = "coin";
    //红包
    updateType[updateType["hongbao"] = 1] = "hongbao";
    //产能
    updateType[updateType["product"] = 2] = "product";
})(updateType = exports.updateType || (exports.updateType = {}));
/**道具状态 */
var propState;
(function (propState) {
    //结束
    propState[propState["end"] = 0] = "end";
    //开始
    propState[propState["start"] = 1] = "start";
    //进行中
    propState[propState["underway"] = 2] = "underway";
})(propState = exports.propState || (exports.propState = {}));
/**道具类型*/
var propType;
(function (propType) {
    /**冰冻 */
    propType[propType["frozen"] = 1] = "frozen";
    /**电击*/
    propType[propType["shock"] = 2] = "shock";
    /**护罩*/
    propType[propType["shield"] = 3] = "shield";
    /**清屏*/
    propType[propType["cls"] = 4] = "cls";
    /**自动合成*/
    propType[propType["auto"] = 5] = "auto";
    /**增能*/
    propType[propType["energized"] = 6] = "energized";
})(propType = exports.propType || (exports.propType = {}));

cc._RF.pop();