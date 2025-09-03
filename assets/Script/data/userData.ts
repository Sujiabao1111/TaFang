/*
 * @Descripttion: 
 * @version: 
 * @Author: mies
 * @Date: 2021-02-23 10:56:22
 * @LastEditors: mies
 * @LastEditTime: 2021-02-24 16:26:03
 */
import { customsInfo, HeavenPoolInfo, PoolInfo, propInfo, TreasureInfo } from "../common/faceTs";

export default class userData {

    //池塘数据
    pool: PoolInfo[];

    //金币
    coin: number;

    //红包数据
    hongbao: number;

    //关卡
    customs: customsInfo

    //生产了多少个
    product: number

    //当前最高炮塔的等级
    turretLevel: number

    //道具
    prop: propInfo[]

    //金币换人民币汇率
    exchangeRate: number

    //是否是新用户
    newUser:boolean

    //合成多少次
    compoundTimes:number//更-多-源-码-联-系-Q:30-387-459-55

    //新手引导是否过了
    noviceGuide:number
    //购买了多少次
    buyCount:number
    //购买了多少次
    heavenPool:HeavenPoolInfo[]
    //哪个格子出现了空地宝箱
    emptyBoxNo:number = -1;

    //已经出现了的宝箱
    haveTreasure:number[]

    //期间获取的金币数（签到）
    termCoin:number

    //获取离线金币
    offlineIncome:{
        multipleReward:number, //翻倍的
        reward:number //单倍的
    }
    //版本
    version:number
    //炮塔获取次数
    GetTurretNum:number
    //获取当天时间
    GetDayTime:number
    //是否首次点击
    autoProp:number
    //空降炮塔
    airborneCount:number
    //合成次数
    synthesis_times:number
    //合成次数
    synthesis_All:number
    //解锁时间
    unlocking_time:number
    //道具详细表
    propConfig:any
    //抵御次数
    resistAttackTimes:number
    //本地存储合成次数
    localCompoundTime:number

    //抽收集每次进入的时间
    dayEnterSignNum:number
    //金币转盘次数
    goldWheelCount:number

    /**存钱罐*/
    savingPotNum:number
}
