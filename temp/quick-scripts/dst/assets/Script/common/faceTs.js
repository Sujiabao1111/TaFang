
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/common/faceTs.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxjb21tb25cXGZhY2VUcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1Q0EsVUFBVTtBQUNWLElBQVksU0FXWDtBQVhELFdBQVksU0FBUztJQUVqQixJQUFJO0lBQ0osNkNBQVUsQ0FBQTtJQUVWLE1BQU07SUFDTixxREFBVSxDQUFBO0lBRVYsS0FBSztJQUNMLCtDQUFPLENBQUE7QUFFWCxDQUFDLEVBWFcsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFXcEI7QUF3RkQsVUFBVTtBQUNWLElBQVksU0FXWDtBQVhELFdBQVksU0FBUztJQUVqQixLQUFLO0lBQ0wsK0NBQVcsQ0FBQTtJQUNYLE1BQU07SUFDTiwyQ0FBUyxDQUFBO0lBQ1QsTUFBTTtJQUNOLHVDQUFPLENBQUE7SUFDUCxNQUFNO0lBQ04seUNBQVEsQ0FBQTtBQUVaLENBQUMsRUFYVyxTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQVdwQjtBQUVELFVBQVU7QUFDVixJQUFZLFFBU1g7QUFURCxXQUFZLFFBQVE7SUFFaEIsSUFBSTtJQUNKLDZDQUFXLENBQUE7SUFDWCxJQUFJO0lBQ0osdUNBQVEsQ0FBQTtJQUNSLE1BQU07SUFDTix1Q0FBUSxDQUFBO0FBRVosQ0FBQyxFQVRXLFFBQVEsR0FBUixnQkFBUSxLQUFSLGdCQUFRLFFBU25CO0FBRUQsWUFBWTtBQUNaLElBQVksYUFXWDtBQVhELFdBQVksYUFBYTtJQUVyQixPQUFPO0lBQ1AsOERBQWUsQ0FBQTtJQUdmLE1BQU07SUFDTixnRUFBZ0IsQ0FBQTtJQUVoQixNQUFNO0lBQ04sMkRBQWEsQ0FBQTtBQUNqQixDQUFDLEVBWFcsYUFBYSxHQUFiLHFCQUFhLEtBQWIscUJBQWEsUUFXeEI7QUFFRCxZQUFZO0FBQ1osSUFBWSxVQVNYO0FBVEQsV0FBWSxVQUFVO0lBRWxCLElBQUk7SUFDSiwyQ0FBUSxDQUFBO0lBRVIsSUFBSTtJQUNKLGlEQUFPLENBQUE7SUFDUCxJQUFJO0lBQ0osaURBQU8sQ0FBQTtBQUNYLENBQUMsRUFUVyxVQUFVLEdBQVYsa0JBQVUsS0FBVixrQkFBVSxRQVNyQjtBQXlCRCxVQUFVO0FBQ1YsSUFBWSxTQVNYO0FBVEQsV0FBWSxTQUFTO0lBRWpCLElBQUk7SUFDSix1Q0FBTSxDQUFBO0lBQ04sSUFBSTtJQUNKLDJDQUFLLENBQUE7SUFDTCxLQUFLO0lBQ0wsaURBQVEsQ0FBQTtBQUVaLENBQUMsRUFUVyxTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQVNwQjtBQWtCRCxTQUFTO0FBQ1QsSUFBWSxRQWNYO0FBZEQsV0FBWSxRQUFRO0lBRWhCLFFBQVE7SUFDUiwyQ0FBVSxDQUFBO0lBQ1YsT0FBTztJQUNQLHlDQUFLLENBQUE7SUFDTCxPQUFPO0lBQ1AsMkNBQU0sQ0FBQTtJQUNOLE9BQU87SUFDUCxxQ0FBRyxDQUFBO0lBQ0gsU0FBUztJQUNULHVDQUFJLENBQUE7SUFDSixPQUFPO0lBQ1AsaURBQVMsQ0FBQTtBQUNiLENBQUMsRUFkVyxRQUFRLEdBQVIsZ0JBQVEsS0FBUixnQkFBUSxRQWNuQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxuLyoq5rGg5aGY5q+P5Liq5L2N572u55qE5pWw5o2uICovXG5leHBvcnQgaW50ZXJmYWNlIFBvb2xJbmZve1xuICAgIC8v5L2N572uXG4gICAgbm86bnVtYmVyXG4gICAgLy/nrYnnuqdcbiAgICBsZXZlbDpudW1iZXIsXG4gICAgLy/mmK/lkKbop6PplIFcbiAgICBzdGF0ZTpudW1iZXIsXG59XG5cbi8qKuaxoOWhmOavj+S4quS9jee9rueahOaVsOaNriAqL1xuZXhwb3J0IGludGVyZmFjZSBIZWF2ZW5Qb29sSW5mb3tcbiAgICAvL+S9jee9rlxuICAgIG5vOm51bWJlclxuICAgIC8v56m66ZmN6YeR5biBaWRcbiAgICBpZDpudW1iZXJcbiAgICAvL+mHkeW4geaVsFxuICAgIHZhbHVlOm51bWJlclxufVxuXG4vKirlrp3nrrHnmoTmlbDmja4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVHJlYXN1cmVJbmZve1xuICAgIC8vaWRcbiAgICBpZDpudW1iZXJcbiAgICAvL+aYr+WQpumihuWPluS6hjDmnKrpooYgMemihuWPliAy5pS+5byDXG4gICAgc3RhdGU6bnVtYmVyLFxufVxuXG4vKirlhbPljaEgKi9cbmV4cG9ydCBpbnRlcmZhY2UgY3VzdG9tc0luZm97XG4gICAgXG4gICAgLy/lpKflhbPljaFcbiAgICBiaWc6bnVtYmVyLFxuICAgIC8v5bCP5YWz5Y2hXG4gICAgc21hbGw6bnVtYmVyXG59XG5cblxuLyoq5ZG95ZCN57G75Z6LICovXG5leHBvcnQgZW51bSB0aGluZ1R5cGV7XG5cbiAgICAvL+WhlOmYslxuICAgIHR1cnJldCA9IDEsXG5cbiAgICAvL+WkqemZjemHkeW4gVxuICAgIGhlYXZlbkNvaW4sXG5cbiAgICAvL+WbnuaUtuermVxuICAgIHJlY3ljbGVcblxufVxuXG4vKirmgKrlhb3nmoTlsZ7mgKcgKi9cbmV4cG9ydCBpbnRlcmZhY2UgbW9uc3RlckluZm97XG5cbiAgICAvKirnrYnnuqcgKi9cbiAgICBsZXZlbDpudW1iZXIsXG4gICAgLyoq6KGA6YePICovXG4gICAgaHA6bnVtYmVyLFxuICAgIC8qKuenu+WKqOaXtumXtCAqL1xuICAgIHdhbGtUaW1lOm51bWJlcixcbiAgICAvKirnp7vliqhjZCAqL1xuICAgIHdhbGtDZDpudW1iZXIsXG4gICAgLyoq5ZCN5a2XICovXG4gICAgbmFtZTpzdHJpbmdcbiAgICAvKirph5HluIEgKi9cbiAgICBjb2luOm51bWJlcixcbiAgICAvKirpgJ/luqYgKi9cbiAgICBzcGVlZDpudW1iZXIsXG4gICAgLyoq5o+P6L+wICovXG4gICAgZGVzY3JpYnRpb246c3RyaW5nLFxuICAgIC8qKum+memqqOWbvueJhyAqL1xuICAgIGFybWF0dXJlOnN0cmluZyxcbiAgICAvKirpvpnpqqjliqjnlLsgKi9cbiAgICBhbmltYXRpb246c3RyaW5nLFxuICAgIC8qKum+memqqOWkp+WwjyAqL1xuICAgIHNjYWxlOm51bWJlclxuXG4gICAgXG59XG5cbi8qKueCruW8ueWxnuaApyAqL1xuZXhwb3J0IGludGVyZmFjZSBidWxsZXRJbmZve1xuXG4gICAgLyoq5ZOq56eN57G75Z6LICovXG4gICAgdHlwZTpudW1iZXIsXG4gICAgLyoq5oCq5YW9aWQgKi9cbiAgICB0YXJnZXRJZDpudW1iZXIsXG4gICAgLyoq5b2T5YmN5L2N572uICovXG4gICAgaW5pdFBvczpjYy5WZWMyLFxuICAgIC8qKumjnuihjOmAn+W6piAqL1xuICAgIHNwZWVkOm51bWJlcixcbiAgICAvKirmlLvlh7vlipsgKi9cbiAgICBhdGs6bnVtYmVyLFxuICAgIC8qKuaatOWHu+eOhyAqL1xuICAgIGNyaXQ6bnVtYmVyLFxufVxuXG5cbi8qKuWhlOmYsuWxnuaApyAqL1xuZXhwb3J0IGludGVyZmFjZSB0dXJyZXRJbmZve1xuXG4gICAgLyoq5ZCN5a2XICovXG4gICAgbmFtZTpzdHJpbmcsXG4gICAgLyoq55m76K6wICovXG4gICAgbGV2ZWw6bnVtYmVyLFxuICAgIC8qKuaUu+WHu2NkICovXG4gICAgY2Q6bnVtYmVyLFxuICAgIC8qKuaUu+WHu+WKmyAqL1xuICAgIGF0azpudW1iZXIsXG4gICAgLyoq5pq05Ye75Lyk5a6zICovXG4gICAgY3JpdDpudW1iZXIsXG4gICAgLyoq5pq05Ye75qaC546HICovXG4gICAgY3JpdFByb2I6bnVtYmVyLFxuICAgIC8qKueCruW8ueexu+WeiyAqL1xuICAgIGJ1bGxldFR5cGU6bnVtYmVyLFxuICAgIC8qKui+k+WHuuS8pOWusyAqL1xuICAgIGh1cnQ6bnVtYmVyLCAgICBcbiAgICAvKirpgJ/luqYgKi9cbiAgICBzcGVlZDpudW1iZXIsXG4gICAgLyoq6b6Z6aqoICovXG4gICAgRHluYW1pY1Jlc291cmNlczpudW1iZXIsXG4gICAgLyoq54Ku5aGU5ZCN5a2XKi9cbiAgICBzcGluZU5hbWU6c3RyaW5nLFxuICAgIC8qKuaYr+WQpumqqOmqvCAqL1xuICAgIGJ1bGxldFNwaW5lOm51bWJlcixcbiAgICAvKirmmK/lkKbluKbmnInngq7lj6MgKi9cbiAgICBtb3V0aDpudW1iZXIsXG4gICAgLyoq54Ku5Y+j5ZCN5a2XICovXG4gICAgbW91dGhOYW1lOnN0cmluZyxcbiAgICAvKirngq7lj6NZ55qE5L2N572uICovXG4gICAgbW91dGhZOm51bWJlclxuICAgIC8qKuWtkOW8ueWPkeWwhOS9jee9ruWinuWKoFkgKi9cbiAgICBidWxsZXRZOm51bWJlclxuICAgIC8qKueCruWhlOaYr+WQpuaXi+i9rCAqL1xuICAgIHJvdGF0aW9uOm51bWJlclxufVxuXG4vKirmuLjmiI/nirbmgIEgKi9cbmV4cG9ydCBlbnVtIGdhbWVTdGF0ZXtcblxuICAgIC8v5pyq5byA5aeLXG4gICAgZGVmYXVsdCA9IDAsXG4gICAgLy/muLjmiI/lvIDlp4tcbiAgICBzdGFydCA9IDEsXG4gICAgLy/muLjmiI/nu5PmnZ9cbiAgICBlbmQgPSAyLFxuICAgIC8v5ri45oiP5pqC5YGcXG4gICAgc3RvcCA9IDMsXG5cbn1cblxuLyoq6YCa5YWz54q25oCBICovXG5leHBvcnQgZW51bSBnYW1lUGFzc3tcblxuICAgIC8v5oiQ5YqfXG4gICAgc3VjY2VzcyA9IDEsXG4gICAgLy/lpLHotKVcbiAgICBmYWlsID0gMCxcbiAgICAvL+acgOWQjuS4gOWFs1xuICAgIGxhc3QgPSAyLFxuXG59XG5cbi8qKua4uOaIj+aZrumAmuaVsOWAvCAqL1xuZXhwb3J0IGVudW0gZ2FtZU51bWVyaWNhbHtcblxuICAgIC8v5Lqn6IO95pyA5aSn5YC8XG4gICAgUHJvZHVjdE1heCA9IDIwLFxuXG4gICAgXG4gICAgLy/kuqfog73ml7bpl7RcbiAgICBQcm9kdWN0VGltZSA9IDMwLFxuICAgIFxuICAgIC8v5YWz6Zet5pe26Ze0XG4gICAgY2xvc2VUaW1lID0gMiAsXG59XG5cbi8qKua4uOaIj+abtOaWsOexu+WIqyAqL1xuZXhwb3J0IGVudW0gdXBkYXRlVHlwZXtcblxuICAgIC8v6YeR5biBXG4gICAgY29pbiA9IDAsXG5cbiAgICAvL+e6ouWMhVxuICAgIGhvbmdiYW8sXG4gICAgLy/kuqfog71cbiAgICBwcm9kdWN0XG59XG5cbi8qKumfs+aViOmFjee9riAqL1xuZXhwb3J0IGludGVyZmFjZSBzb3VuZEluZm97XG5cbiAgICAvKirog4zmma/pn7PmlYgqL1xuICAgIGJnbTpudW1iZXIsXG4gICAgLyoq5pmu6YCa6Z+z5pWIICovXG4gICAgc291bmQ6bnVtYmVyLFxuICAgIFxufVxuXG5cbi8qKumBk+WFtyAqL1xuZXhwb3J0IGludGVyZmFjZSBwcm9wSW5mb3tcbiAgICBcbiAgICAvKirlk6rkuKrpgZPlhbcgKi9cbiAgICB0eXBlOm51bWJlcixcbiAgICAvKirmlbDph48qL1xuICAgIG51bTpudW1iZXIsXG4gICAgLyoq5pe26Ze0Ki9cbiAgICB0aW1lOm51bWJlcixcbiAgICAvKirkvb/nlKgqL1xuICAgIHVzZTpudW1iZXIsXG59XG4vKirpgZPlhbfnirbmgIEgKi9cbmV4cG9ydCBlbnVtIHByb3BTdGF0ZXtcblxuICAgIC8v57uT5p2fXG4gICAgZW5kPSAwLFxuICAgIC8v5byA5aeLXG4gICAgc3RhcnQsXG4gICAgLy/ov5vooYzkuK1cbiAgICB1bmRlcndheVxuXG59XG5cblxuLyoq6YGT5YW35bGe5oCnKi9cbmV4cG9ydCBpbnRlcmZhY2UgcHJvcFByb3BlcnR5e1xuICAgIFxuICAgIC8qKuWTquS4qumBk+WFtyAqL1xuICAgIHR5cGU6bnVtYmVyLFxuICAgIC8qKuWQjeWtlyovXG4gICAgbmFtZTpzdHJpbmcsXG4gICAgLyoq6K+05piOKi9cbiAgICBleHBsYWluOnN0cmluZyxcbiAgICAvKirmjIHnu63ml7bpl7QqL1xuICAgIHRpbWU6bnVtYmVyLFxuICAgIC8qKumZkOWItuetiee6pyovXG4gICAgbGV2ZWw6bnVtYmVyLFxufVxuXG4vKirpgZPlhbfnsbvlnosqL1xuZXhwb3J0IGVudW0gcHJvcFR5cGV7XG4gICAgXG4gICAgLyoq5Yaw5Ya7ICovXG4gICAgZnJvemVuID0gMSxcbiAgICAvKirnlLXlh7sqL1xuICAgIHNob2NrLFxuICAgIC8qKuaKpOe9qSovXG4gICAgc2hpZWxkLFxuICAgIC8qKua4heWxjyovXG4gICAgY2xzLFxuICAgIC8qKuiHquWKqOWQiOaIkCovXG4gICAgYXV0byxcbiAgICAvKirlop7og70qL1xuICAgIGVuZXJnaXplZFxufVxuXG5cbiJdfQ==