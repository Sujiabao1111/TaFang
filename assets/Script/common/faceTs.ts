
/**池塘每个位置的数据 */
export interface PoolInfo{
    //位置
    no:number
    //等级
    level:number,
    //是否解锁
    state:number,
}

/**池塘每个位置的数据 */
export interface HeavenPoolInfo{
    //位置
    no:number
    //空降金币id
    id:number
    //金币数
    value:number
}

/**宝箱的数据 */
export interface TreasureInfo{
    //id
    id:number
    //是否领取了0未领 1领取 2放弃
    state:number,
}

/**关卡 */
export interface customsInfo{
    
    //大关卡
    big:number,
    //小关卡
    small:number
}


/**命名类型 */
export enum thingType{

    //塔防
    turret = 1,

    //天降金币
    heavenCoin,

    //回收站
    recycle

}

/**怪兽的属性 */
export interface monsterInfo{

    /**等级 */
    level:number,
    /**血量 */
    hp:number,
    /**移动时间 */
    walkTime:number,
    /**移动cd */
    walkCd:number,
    /**名字 */
    name:string
    /**金币 */
    coin:number,
    /**速度 */
    speed:number,
    /**描述 */
    describtion:string,
    /**龙骨图片 */
    armature:string,
    /**龙骨动画 */
    animation:string,
    /**龙骨大小 */
    scale:number

    
}

/**炮弹属性 */
export interface bulletInfo{

    /**哪种类型 */
    type:number,
    /**怪兽id */
    targetId:number,
    /**当前位置 */
    initPos:cc.Vec2,
    /**飞行速度 */
    speed:number,
    /**攻击力 */
    atk:number,
    /**暴击率 */
    crit:number,
}


/**塔防属性 */
export interface turretInfo{

    /**名字 */
    name:string,
    /**登记 */
    level:number,
    /**攻击cd */
    cd:number,
    /**攻击力 */
    atk:number,
    /**暴击伤害 */
    crit:number,
    /**暴击概率 */
    critProb:number,
    /**炮弹类型 */
    bulletType:number,
    /**输出伤害 */
    hurt:number,    
    /**速度 */
    speed:number,
    /**龙骨 */
    DynamicResources:number,
    /**炮塔名字*/
    spineName:string,
    /**是否骨骼 */
    bulletSpine:number,
    /**是否带有炮口 */
    mouth:number,
    /**炮口名字 */
    mouthName:string,
    /**炮口Y的位置 */
    mouthY:number
    /**子弹发射位置增加Y */
    bulletY:number
    /**炮塔是否旋转 */
    rotation:number
}

/**游戏状态 */
export enum gameState{

    //未开始
    default = 0,
    //游戏开始
    start = 1,
    //游戏结束
    end = 2,
    //游戏暂停
    stop = 3,

}

/**通关状态 */
export enum gamePass{

    //成功
    success = 1,
    //失败
    fail = 0,
    //最后一关
    last = 2,

}

/**游戏普通数值 */
export enum gameNumerical{

    //产能最大值
    ProductMax = 20,

    
    //产能时间
    ProductTime = 30,
    
    //关闭时间
    closeTime = 2 ,
}

/**游戏更新类别 */
export enum updateType{

    //金币
    coin = 0,

    //红包
    hongbao,
    //产能
    product
}

/**音效配置 */
export interface soundInfo{

    /**背景音效*/
    bgm:number,
    /**普通音效 */
    sound:number,
    
}


/**道具 */
export interface propInfo{
    
    /**哪个道具 */
    type:number,
    /**数量*/
    num:number,
    /**时间*/
    time:number,
    /**使用*/
    use:number,
}
/**道具状态 */
export enum propState{

    //结束
    end= 0,
    //开始
    start,
    //进行中
    underway

}


/**道具属性*/
export interface propProperty{
    
    /**哪个道具 */
    type:number,
    /**名字*/
    name:string,
    /**说明*/
    explain:string,
    /**持续时间*/
    time:number,
    /**限制等级*/
    level:number,
}

/**道具类型*/
export enum propType{
    
    /**冰冻 */
    frozen = 1,
    /**电击*/
    shock,
    /**护罩*/
    shield,
    /**清屏*/
    cls,
    /**自动合成*/
    auto,
    /**增能*/
    energized
}


