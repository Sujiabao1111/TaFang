import XMSDK from "../server/xmsdk_cocos/XMSDK";
import { TrackEnum } from "./TrackEnum";

export default class TrackMgr {


    /**
     * 
     * @param obj App元素点击
     */
    static AppClick(obj:TrackEnum.AppClick){
        XMSDK.track({
            eventName: "AppClick",
            props: obj
        })
    }

    /**
     * 
     * @param obj APP浏览页面（曝光）
     */
    static AppViewScreen(obj:TrackEnum.AppViewScreen){
        XMSDK.track({
            eventName: "AppViewScreen",
            props: obj
        })
    }


    /**
     * 
     * @param obj 弹窗展示
     */
    static AppBuyProductDialog_hcdg(obj: TrackEnum.AppBuyProductDialog_hcdg) {
        XMSDK.track({
            eventName: "AppBuyProductDialog_hcdg",
            props: obj
        })
    }

    

    /**
     * 
     * @param obj 弹窗点击
     */
    static AppDialogClick_hcdg(obj: TrackEnum.AppDialogClick_hcdg) {
        XMSDK.track({
            eventName: "AppDialogClick_hcdg",
            props: obj
        })
    }

    /**
     * 
     * @param obj 申请提现
     */
    static apply_for_withdrawal(obj: TrackEnum.apply_for_withdrawal) {
        XMSDK.track({
            eventName: "apply_for_withdrawal",
            props: obj
        })
    }

    /**
     * 
     * @param obj 新人流程
     */
     static rookie_process(obj: TrackEnum.rookie_process) {
        XMSDK.track({
            eventName: "rookie_process",
            props: obj
        })
    }
    /**
     * 
     * @param obj 新人流程2
     */
     static rookie_process_2(obj: TrackEnum.rookie_process_2) {
        XMSDK.track({
            eventName: "rookie_process_2",
            props: obj
        })
    }

    /**
     * 
     * @param obj 双倍收益
     */
    static double_revenue(obj: TrackEnum.double_revenue) {
        XMSDK.track({
            eventName: "double_revenue",
            props: obj
        })
    }

    /**
     * 
     * @param obj 道具使用事件
     */
    static tool_used(obj: TrackEnum.tool_used) {
        XMSDK.track({
            eventName: "tool_used",
            props: obj
        })
    }

    /**
     * 
     * @param obj 空降宝箱
     */
    static airborne_treasure(obj: TrackEnum.airborne_treasure) {
        XMSDK.track({
            eventName: "airborne_treasure",
            props: obj
        })
    }

    /**
     * 
     * @param obj 空降金币
     */
    static airborne_gold(obj: TrackEnum.airborne_gold) {
        XMSDK.track({
            eventName: "airborne_gold",
            props: obj
        })
    }

    /**
     * 
     * @param obj 点击任务
     */
    static MissionPriceClick(obj: TrackEnum.MissionPriceClick) {
        XMSDK.track({
            eventName: "MissionPriceClick",
            props: obj
        })
    }

    /**
     * 
     * @param obj 签到奖励事件
     */
    static Signin_new(obj: TrackEnum.Signin_new) {
        XMSDK.track({
            eventName: "Signin_new",
            props: obj
        })
    }

    /**
     * 
     * @param obj 通关结束
     */
    static AppGamedate(obj: TrackEnum.AppGamedate) {
        XMSDK.track({
            eventName: "AppGamedate_hcdg1",
            props: obj
        })
    }

    /**
     * 
     * @param obj 炮塔解锁事件
     */
    static turret_unlock(obj: TrackEnum.turret_unlock) {
        XMSDK.track({
            eventName: "turret_unlock",
            props: obj
        })
    }

    /**
     * 
     * @param obj 关卡开启
     */
    static level_open(obj: TrackEnum.level_open) {
        XMSDK.track({
            eventName: "level_open",
            props: obj
        })
    }

    /**
     * 
     * @param obj 任务完成
     */
    static finish_task(obj: TrackEnum.finish_task) {
        XMSDK.track({
            eventName: "finish_task",
            props: obj
        })
    }

    /**
     * 
     * @param obj 新人任务
     */
    static newcomer_mission(obj: TrackEnum.newcomer_mission) {
        XMSDK.track({
            eventName: "newcomer_missio_hcdg",
            props: obj
        })
    }

    /**
     * 
     * @param obj 炮王分红
     */
    static artillery_bonus(obj: TrackEnum.artillery_bonus) {
        XMSDK.track({
            eventName: "artillery_bonus_hcdg",
            props: obj
        })
    }

    /**
     * 
     * @param obj 空地宝箱
     */
    static empty_treasure(obj: TrackEnum.empty_treasure) {
        XMSDK.track({
            eventName: "empty_treasure_hcdg",
            props: obj
        })
    }
    
    /*
     * @param obj 任务栏点击
     */
    static taskbar_click(obj: TrackEnum.taskbar_click) {
        XMSDK.track({
            eventName: "taskbar_click_hcdg",
            props: obj
        })
    }
    /*
        * @param obj 任务栏点击
        */
    static luckybag_task(obj: TrackEnum.luckybag_task) {
        XMSDK.track({
            eventName: "luckybag_task",
            props: obj
        })
    }
    
    /*
    * 抽手机埋点
    */

    static lotto_phone_click(obj:TrackEnum.lotto_phone_click){
       XMSDK.track({
           eventName: "lotto_phone_click",
           props: obj
       })
    }

    static lotto_chance(obj:TrackEnum.lotto_chance){
       XMSDK.track({
           eventName: "lotto_chance",
           props: obj
       })
    }
    /**
     * 
     * @param obj 提现活动
     */
    static activity_getMoney(obj: TrackEnum.activity_getMoney){
        XMSDK.track({
            eventName: "activity_getMoney",
            props: obj
        })
    }
    static LuckDraw(obj:TrackEnum.LuckDraw){
        XMSDK.track({
            eventName: "LuckDraw",
            props: obj
        })
    }

    static lotto_dial(obj:TrackEnum.lotto_dial){
        XMSDK.track({
            eventName: "lotto_dial",
            props: obj
        })
    }
    static lotto_phone_show(obj:TrackEnum.lotto_phone_show){
        XMSDK.track({
            eventName: "lotto_phone_show",
            props: obj
        })
    }
    static LuckDrawProductDialog(obj:TrackEnum.LuckDrawProductDialog){
        XMSDK.track({
            eventName: "LuckDrawProductDialog",
            props: obj
        })
    }
    static LuckDrawDialogClick(obj:TrackEnum.LuckDrawDialogClick){
        XMSDK.track({
            eventName: "LuckDrawDialogClick",
            props: obj
        })
    }
    static lotto_sign_chip(obj:TrackEnum.lotto_sign_chip){
        XMSDK.track({
            eventName: "lotto_sign_chip",
            props: obj
        })
    }
    static big_turntable(obj:TrackEnum.big_turntable){
        XMSDK.track({
            eventName: "big_turntable",
            props: obj
        })
    }
    static Online_rewards(obj:TrackEnum.Online_rewards){
        XMSDK.track({
            eventName: "Online_rewards",
            props: obj
        })
    }
    static welfare_red_envelope(obj:TrackEnum.welfare_red_envelope){
        XMSDK.track({
            eventName: "welfare_red_envelope",
            props: obj
        })
    }
    static little_red_dots(obj:TrackEnum.little_red_dots){
        XMSDK.track({
            eventName: "little_red_dots",
            props: obj
        })
    }
}
