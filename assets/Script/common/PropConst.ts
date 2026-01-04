
/**
 * @description PROPS 奖励类型
 */
export let REWARD_TYPE1 = {
    PROPS: 1,//道具
    POINT: 2//货币
}


export let PROPS = {
    "1": {
        id: 1,
        icon: "icon_daoju_shuaxin",
        name: "刷新",
        nameEn: "flush",
        tip: `重新排列图形`
    },
}

export let PROPS_GAME = {
    "1": {
        propId: 1,
        name: "刷新",
        tip: `重新排列图形`,
        propNum: 0
    },
}

/**
 * @description 货币类型 1：钻石 2：金币 3：HP
 * @param name/name2 spriteFrame 索引
 * @param index game/index 接口下发对应的key
 * @param price 看广告获得的奖励
 */
export const POINT = {
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
export const POINT_ENUM = {
    'diamond': 1,
    'gold': 2,
    'health': 3,
}

export const PROPS_ENMU = {
    hp3: 1,
    hp5: 2,
    hp30: 3,
    hp1: 13,
    step3: 4,
    step5: 5,
    TNT: 6,
}

export const COST_TYPE = {
    PROP: 1,//道具
    POINT: 2,//点值
}

// 奖励类型
export const REWARD_KEY = {
    baoxiang: 1, //空地宝箱
    zaixian: 2, //在线奖励
    zhuanpan: 3, //转盘抽奖
    kills: 4, //累计击杀
    box: 5, //悬浮宝箱
    zpljjl: 6, //转盘累计奖励
}

// 奖励类型
export const REWARD_TYPE = {
    gold: 1, //金币
    turret: 2, //炮台
}
// 购买的类型
export const BuyType = {
    PayCheckin: 0, //付费签到
    OneDayVIP: 2, //一日VIP
    RandomTurret: 3, //随机炮塔
    PassVIP: 4, //通行证
}
// 是否加倍
export const ISDOUBLE = {
    no: 0,
    yes: 1,
}


/**奖励类型 */
export enum RewardNodeType {
    Fudai = 'fudai', // 福袋
    Kills = 'Kills', // 击杀
    Box = 'Box', // 漂浮宝箱
}

/** 发布类型 */
export enum RELEASE_TYPE_ENUM {
    /** 本地测试 */
    local = "local",
    /** 可发布测试模式 */
    h5 = "h5",

    /** IOS  appStore */
    ios = "ios",
    /** 本地测试 */
    android = "android",

    Telegram = "Telegram",
}