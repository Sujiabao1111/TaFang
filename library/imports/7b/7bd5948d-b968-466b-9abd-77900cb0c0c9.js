"use strict";
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