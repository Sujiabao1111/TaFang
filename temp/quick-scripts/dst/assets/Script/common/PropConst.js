
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/common/PropConst.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7bd59SNuWhGa5q9d5AMsMDJ', 'PropConst');
// Script/common/PropConst.ts

"use strict";
// 1  hp_3  生命值+3
// 2  hp_5  生命值+5
// 3  hp_30  生命值+30
// 4  step_3  步数+3
// 5  step_5  步数+5
// 6  TNT  TNT
// 7  all_powerful_clear  万能消
// 8  wooden_hammer  小木锤
// 9  flush  刷新道具
// 10  rocket  火箭
// 11  horizontal_clear  横排消除
// 12  vertical_clear  竖排消除
Object.defineProperty(exports, "__esModule", { value: true });
exports.COST_TYPE = exports.PROPS_ENMU = exports.POINT_ENUM = exports.POINT = exports.PROPS_GAME = exports.PROPS = exports.REWARD_TYPE = void 0;
/**
 * @description PROPS 道具类型
 */
exports.REWARD_TYPE = {
    PROPS: 1,
    POINT: 2 //货币
};
exports.PROPS = {
    "1": {
        id: 1,
        icon: "icon_daoju_shuaxin",
        name: "刷新",
        nameEn: "flush",
        tip: "\u91CD\u65B0\u6392\u5217\u56FE\u5F62"
    },
};
exports.PROPS_GAME = {
    "1": {
        propId: 1,
        name: "刷新",
        tip: "\u91CD\u65B0\u6392\u5217\u56FE\u5F62",
        propNum: 0
    },
};
/**
 * @description 货币类型 1：钻石 2：金币 3：HP
 * @param name/name2 spriteFrame 索引
 * @param index game/index 接口下发对应的key
 * @param price 看广告获得的奖励
 */
exports.POINT = {
    '1': {
        name: 'icon_qiandaocoin',
        index: 'goldPoint',
        price: 30,
        label: '金币',
        id: 2,
        name2: 'glod',
        name3: 'gold2',
        nameBig: '',
    },
    '2': {
        name: 'icon_qiandaocoin',
        index: 'goldPoint',
        price: 30,
        label: '金币',
        id: 2,
        name2: 'glod',
        name3: 'gold2',
        nameBig: '',
    },
    '3': {
        name: 'health',
        index: 'healthPoint',
        price: 5,
        label: '生命',
        id: 3,
        name2: 'health2',
        nameBig: '',
    }
};
exports.POINT_ENUM = {
    'diamond': 1,
    'gold': 2,
    'health': 3,
};
exports.PROPS_ENMU = {
    hp3: 1,
    hp5: 2,
    hp30: 3,
    hp1: 13,
    step3: 4,
    step5: 5,
    TNT: 6,
};
exports.COST_TYPE = {
    PROP: 1,
    POINT: 2,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxjb21tb25cXFByb3BDb25zdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUJBQWlCO0FBQ2pCLGlCQUFpQjtBQUNqQixtQkFBbUI7QUFDbkIsa0JBQWtCO0FBQ2xCLGtCQUFrQjtBQUNsQixjQUFjO0FBQ2QsNkJBQTZCO0FBQzdCLHdCQUF3QjtBQUN4QixpQkFBaUI7QUFDakIsaUJBQWlCO0FBQ2pCLDZCQUE2QjtBQUM3QiwyQkFBMkI7OztBQUUzQjs7R0FFRztBQUNRLFFBQUEsV0FBVyxHQUFHO0lBQ3JCLEtBQUssRUFBRSxDQUFDO0lBQ1IsS0FBSyxFQUFFLENBQUMsQ0FBQSxJQUFJO0NBQ2YsQ0FBQTtBQUNVLFFBQUEsS0FBSyxHQUFHO0lBQ2YsR0FBRyxFQUFFO1FBQ0QsRUFBRSxFQUFFLENBQUM7UUFDTCxJQUFJLEVBQUUsb0JBQW9CO1FBQzFCLElBQUksRUFBRSxJQUFJO1FBQ1YsTUFBTSxFQUFFLE9BQU87UUFDZixHQUFHLEVBQUUsc0NBQVE7S0FDaEI7Q0FDSixDQUFBO0FBRVUsUUFBQSxVQUFVLEdBQUc7SUFDcEIsR0FBRyxFQUFFO1FBQ0QsTUFBTSxFQUFFLENBQUM7UUFDVCxJQUFJLEVBQUUsSUFBSTtRQUNWLEdBQUcsRUFBRSxzQ0FBUTtRQUNiLE9BQU8sRUFBRSxDQUFDO0tBQ2I7Q0FDSixDQUFBO0FBRUQ7Ozs7O0dBS0c7QUFDVSxRQUFBLEtBQUssR0FBRztJQUNqQixHQUFHLEVBQUU7UUFDRCxJQUFJLEVBQUUsa0JBQWtCO1FBQ3hCLEtBQUssRUFBRSxXQUFXO1FBQ2xCLEtBQUssRUFBRSxFQUFFO1FBQ1QsS0FBSyxFQUFFLElBQUk7UUFDWCxFQUFFLEVBQUUsQ0FBQztRQUNMLEtBQUssRUFBRSxNQUFNO1FBQ2IsS0FBSyxFQUFFLE9BQU87UUFDZCxPQUFPLEVBQUUsRUFBRTtLQUNkO0lBQ0QsR0FBRyxFQUFFO1FBQ0QsSUFBSSxFQUFFLGtCQUFrQjtRQUN4QixLQUFLLEVBQUUsV0FBVztRQUNsQixLQUFLLEVBQUUsRUFBRTtRQUNULEtBQUssRUFBRSxJQUFJO1FBQ1gsRUFBRSxFQUFFLENBQUM7UUFDTCxLQUFLLEVBQUUsTUFBTTtRQUNiLEtBQUssRUFBRSxPQUFPO1FBQ2QsT0FBTyxFQUFFLEVBQUU7S0FDZDtJQUNELEdBQUcsRUFBRTtRQUNELElBQUksRUFBRSxRQUFRO1FBQ2QsS0FBSyxFQUFFLGFBQWE7UUFDcEIsS0FBSyxFQUFFLENBQUM7UUFDUixLQUFLLEVBQUUsSUFBSTtRQUNYLEVBQUUsRUFBRSxDQUFDO1FBQ0wsS0FBSyxFQUFFLFNBQVM7UUFDaEIsT0FBTyxFQUFFLEVBQUU7S0FDZDtDQUNKLENBQUM7QUFDVyxRQUFBLFVBQVUsR0FBRztJQUN0QixTQUFTLEVBQUUsQ0FBQztJQUNaLE1BQU0sRUFBRSxDQUFDO0lBQ1QsUUFBUSxFQUFFLENBQUM7Q0FDZCxDQUFBO0FBRVksUUFBQSxVQUFVLEdBQUc7SUFDdEIsR0FBRyxFQUFFLENBQUM7SUFDTixHQUFHLEVBQUUsQ0FBQztJQUNOLElBQUksRUFBRSxDQUFDO0lBQ1AsR0FBRyxFQUFFLEVBQUU7SUFDUCxLQUFLLEVBQUUsQ0FBQztJQUNSLEtBQUssRUFBRSxDQUFDO0lBQ1IsR0FBRyxFQUFFLENBQUM7Q0FDVCxDQUFBO0FBRVksUUFBQSxTQUFTLEdBQUc7SUFDckIsSUFBSSxFQUFFLENBQUM7SUFDUCxLQUFLLEVBQUUsQ0FBQztDQUNYLENBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyAxICBocF8zICDnlJ/lkb3lgLwrM1xuLy8gMiAgaHBfNSAg55Sf5ZG95YC8KzVcbi8vIDMgIGhwXzMwICDnlJ/lkb3lgLwrMzBcbi8vIDQgIHN0ZXBfMyAg5q2l5pWwKzNcbi8vIDUgIHN0ZXBfNSAg5q2l5pWwKzVcbi8vIDYgIFROVCAgVE5UXG4vLyA3ICBhbGxfcG93ZXJmdWxfY2xlYXIgIOS4h+iDvea2iFxuLy8gOCAgd29vZGVuX2hhbW1lciAg5bCP5pyo6ZSkXG4vLyA5ICBmbHVzaCAg5Yi35paw6YGT5YW3XG4vLyAxMCAgcm9ja2V0ICDngavnrq1cbi8vIDExICBob3Jpem9udGFsX2NsZWFyICDmqKrmjpLmtojpmaRcbi8vIDEyICB2ZXJ0aWNhbF9jbGVhciAg56uW5o6S5raI6ZmkXG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIFBST1BTIOmBk+WFt+exu+Wei1xuICovXG5leHBvcnQgbGV0IFJFV0FSRF9UWVBFID0ge1xuICAgIFBST1BTOiAxLC8v6YGT5YW3XG4gICAgUE9JTlQ6IDIvL+i0p+W4gVxufVxuZXhwb3J0IGxldCBQUk9QUyA9IHtcbiAgICBcIjFcIjoge1xuICAgICAgICBpZDogMSxcbiAgICAgICAgaWNvbjogXCJpY29uX2Rhb2p1X3NodWF4aW5cIixcbiAgICAgICAgbmFtZTogXCLliLfmlrBcIixcbiAgICAgICAgbmFtZUVuOiBcImZsdXNoXCIsXG4gICAgICAgIHRpcDogYOmHjeaWsOaOkuWIl+WbvuW9omBcbiAgICB9LFxufVxuXG5leHBvcnQgbGV0IFBST1BTX0dBTUUgPSB7XG4gICAgXCIxXCI6IHtcbiAgICAgICAgcHJvcElkOiAxLFxuICAgICAgICBuYW1lOiBcIuWIt+aWsFwiLFxuICAgICAgICB0aXA6IGDph43mlrDmjpLliJflm77lvaJgLFxuICAgICAgICBwcm9wTnVtOiAwXG4gICAgfSxcbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb24g6LSn5biB57G75Z6LIDHvvJrpkrvnn7MgMu+8mumHkeW4gSAz77yaSFBcbiAqIEBwYXJhbSBuYW1lL25hbWUyIHNwcml0ZUZyYW1lIOe0ouW8lVxuICogQHBhcmFtIGluZGV4IGdhbWUvaW5kZXgg5o6l5Y+j5LiL5Y+R5a+55bqU55qEa2V5XG4gKiBAcGFyYW0gcHJpY2Ug55yL5bm/5ZGK6I635b6X55qE5aWW5YqxXG4gKi9cbmV4cG9ydCBjb25zdCBQT0lOVCA9IHtcbiAgICAnMSc6IHtcbiAgICAgICAgbmFtZTogJ2ljb25fcWlhbmRhb2NvaW4nLFxuICAgICAgICBpbmRleDogJ2dvbGRQb2ludCcsXG4gICAgICAgIHByaWNlOiAzMCxcbiAgICAgICAgbGFiZWw6ICfph5HluIEnLFxuICAgICAgICBpZDogMixcbiAgICAgICAgbmFtZTI6ICdnbG9kJyxcbiAgICAgICAgbmFtZTM6ICdnb2xkMicsXG4gICAgICAgIG5hbWVCaWc6ICcnLFxuICAgIH0sXG4gICAgJzInOiB7XG4gICAgICAgIG5hbWU6ICdpY29uX3FpYW5kYW9jb2luJyxcbiAgICAgICAgaW5kZXg6ICdnb2xkUG9pbnQnLFxuICAgICAgICBwcmljZTogMzAsXG4gICAgICAgIGxhYmVsOiAn6YeR5biBJyxcbiAgICAgICAgaWQ6IDIsXG4gICAgICAgIG5hbWUyOiAnZ2xvZCcsXG4gICAgICAgIG5hbWUzOiAnZ29sZDInLFxuICAgICAgICBuYW1lQmlnOiAnJyxcbiAgICB9LFxuICAgICczJzoge1xuICAgICAgICBuYW1lOiAnaGVhbHRoJyxcbiAgICAgICAgaW5kZXg6ICdoZWFsdGhQb2ludCcsXG4gICAgICAgIHByaWNlOiA1LFxuICAgICAgICBsYWJlbDogJ+eUn+WRvScsXG4gICAgICAgIGlkOiAzLFxuICAgICAgICBuYW1lMjogJ2hlYWx0aDInLFxuICAgICAgICBuYW1lQmlnOiAnJyxcbiAgICB9XG59O1xuZXhwb3J0IGNvbnN0IFBPSU5UX0VOVU0gPSB7XG4gICAgJ2RpYW1vbmQnOiAxLFxuICAgICdnb2xkJzogMixcbiAgICAnaGVhbHRoJzogMyxcbn1cblxuZXhwb3J0IGNvbnN0IFBST1BTX0VOTVUgPSB7XG4gICAgaHAzOiAxLFxuICAgIGhwNTogMixcbiAgICBocDMwOiAzLFxuICAgIGhwMTogMTMsXG4gICAgc3RlcDM6IDQsXG4gICAgc3RlcDU6IDUsXG4gICAgVE5UOiA2LFxufVxuXG5leHBvcnQgY29uc3QgQ09TVF9UWVBFID0ge1xuICAgIFBST1A6IDEsLy/pgZPlhbdcbiAgICBQT0lOVDogMiwvL+eCueWAvFxufSJdfQ==