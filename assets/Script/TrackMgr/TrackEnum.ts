export namespace TrackEnum {

    /**
     * app_page_title: 浏览页面标题
     * app_ck_module: 元素点击
     * app_exposure_type: 元素类型
     */
    export interface AppClick {
        app_page_title: string,
        app_ck_module: string,
        app_exposure_type?: string
    }

    /**
     * dialog_page:获取当前页面
     * dialog_name_hcdg:弹窗名称
     */
    export interface AppBuyProductDialog_hcdg {
        dialog_page?: string,
        dialog_name_hcdg: string,
        dialog_enter?:string
    }

    /**
     * app_page_title: 浏览页面标题
     */
    export interface AppViewScreen {
        app_page_title: string
    }

    /**
     * dialog_page:当前页面标题
     * dialog_name_hcdg:弹窗名称
     * ck_module:按钮
     */
    export interface AppDialogClick_hcdg {
        dialog_name_hcdg: string,
        ck_module: string,
        dialog_enter?:string
        active_ad_hcdg?:string,
    }

    /**
     * applications_amount:申请金额
     * application_status:申请状态      成功，失败
     * failure_cause:失败原因           服务器上传原因：
     * applications_amount:申请档位     0.1  0.3  30  50
     * is_satisfy_condition:是否满足提现条件    是  否
     */
    export interface apply_for_withdrawal {
        applications_amount: number,
        application_status: string,
        failure_cause?: string,
        applications_level: number,
        is_satisfy_condition: boolean
        markStr:string
    }

    /**
     * activity_state: 活动类型(1.隐私政策弹窗；2.欢迎页；3.拖拽合成效果页；4.首次解锁炮塔弹窗5.提现金额到账6.合成10级提现提示7.怪兽们出来了8大转盘新人引导)
     * click_event: 点击事件(状态2、5、6、7传（点击任意位置)
     * synthesis_successful: 合成成功(状态4传)
     */
     export interface rookie_process {
        activity_state: string,
        click_event?: string,
        synthesis_successful?: boolean
    }

    export interface rookie_process_2 {
        activity_state: string,
    }

    /**
     * activity_state: 未加速；加速中；次数已用完
     * acceleration_time: 状态2传,看完激励视频后传eg：30s；60s等
     * today_times: 0点刷新
     */
    export interface double_revenue {
        activity_state: string,
        acceleration_time?: string,
        today_times?: number
    }

    /**
     * tool_name: 使用的道具名称    传道具名称，点击时传
     * use_success: 使用成功与否    是：成功    否：失败
     * is_video_tool: 是否为看视频道具  是：看视频获取  否：免费获取
     * level: 关卡      第几关
     */
    export interface tool_used {
        tool_name: string,
        use_success: boolean,
        is_video_tool: boolean,
        level: string,
    }

    /**
     * activity_state: 活动类型     1.漂浮宝箱出现  2.打开漂浮宝箱  3.漂浮宝箱弹窗  4.点击「砸开宝箱」按钮  5.点击「领金币」按钮    6.点击「放弃奖励」按钮
     * button: 点击「砸开宝箱」次数     状态4传     弹窗消失后会记录总数字
     * coin: 金币值     点击「领金币」「放弃奖励」传
     * getcoin_status: 播放玩激励视频或点击「放弃奖励」按钮传成功、失败
     */
    export interface airborne_treasure {
        activity_state: string,
        button?: number,
        coin?: number,
        getcoin_status?: boolean,
    }

    /**
     * activity_state: 活动类型         1.金币下发   2.金币点击  3.金币奖励弹窗  5.点击「领取金币」按钮  5.点击「视频icon领取金币」按钮  6.点击「放弃奖励」按钮
     * distribution_status: 下发状态    状态1传
     * failure_reasons: 失败原因        状态1传
     */
    export interface airborne_gold {
        activity_state: string,
        distribution_status?: boolean,
        failure_reasons?: string
    }

    /**
     * mission_name: 任务名称
     * mission_type: 任务类型       日常任务、成就任务
     * mission_button: 任务按钮     领取；前往
     * mission_coin: 金币数量       点击领取时传
     */
    export interface MissionPriceClick {
        mission_name: string,
        mission_type: string,
        mission_button: string,
        mission_coin?: number
    }

    /**
     * get_state: 领取状态       是否领取成功
     * get_type: 领取类型        普通领取   双倍领取
     * get_days: 领取第x天      第1天   第2天   第3天   第4天   第5天   第6天   第7天
     */
    export interface Signin_new {
        get_state: boolean,
        get_type: string,
        get_days: string,
    }

    /**
     * is_challenge_suc: 是否挑战成功   
     * game_level: 章节
     * level:波数
     * game_time: 挑战时长      单位：秒
     * get_score: 获得奖励      地块；道具名称；地块+道具名称
     * get_coin: 获得金币数
     * use_tool: 使用道具数
     */
    export interface AppGamedate {
        is_challenge_suc: boolean,
        game_level_hcdg: string,
        level_hcdg: string,
        game_time: string,
        get_score?: string,
        get_coin?: string,
        use_tool?: string,
    }

    /**
     * unlock_turret level: 炮塔级别        当前解锁炮塔级别
     * unlocking_time: 解锁时长             记录解锁炮塔距离上一级炮塔时间
     * synthesis_times: 合成次数            本级别与上一级别期间内总合成次数
     * level: 关卡            
     */
    export interface turret_unlock {
        unlock_turret_level: number,
        unlocking_time?: string,
        synthesis_times?: number,
        level: string
    }

    /**
     * number_of_levels: 炮章节        每关开始的时候传
     * level: 关卡数            
     * synthesis_times: 关卡开启次数            
     */
    export interface level_open {
        number_of_levels: string,
        level: string,
        Opening_times?: number,
    }
    /**
     * mission_name	任务名称	字符串
    * mission_type	任务类型	字符串
    * mission_coin	金币数量	数值
     */

    export interface finish_task{
        mission_name:string,
        mission_type:string,
        mission_coin:number
    }

    export interface newcomer_mission {
        activity_state: string,
        receiving_status?: boolean,
        red_dot?: boolean,
        days?: string,
        task_type?: string,
        button_hcdg?: string,
        task_completion_status?: string,
        withdrawal_progress?: string,
        task_show?:boolean
    }

    export interface artillery_bonus {
        activity_state: string,
        receiving_status?: string,
        button_hcdg?: string,
        task_progress?: string,
        artillery_progress?: string,
        Page_source?: string,
    }

    export interface empty_treasure {
        activity_state: string,
        distribution_status?: boolean,
        failure_reasons?: string,
        turret_level?: number,
        pun_number?: string,
    }

    /**
     * activity_state	当前任务类型	字符串	传当前任务栏类型：合成炮塔20次
     * task_progress	任务进度	字符串	传当前任务完成进度
     * task_type	任务归属类型		日常任务/成就任务
     */
    export interface taskbar_click {
        activity_state: string,
        task_progress: string,
        task_type: string,
    }
    export interface luckybag_task {
        activity_state: string,
        task_level?: string,
        button_name?: string,
    }
    

    export interface lotto_phone_click {
        activity_button_click: string,
        activity_state?:string,
    }
    export interface lotto_chance {
        lotto_chance_get: string
    }


    export interface activity_getMoney{
        activity_state:string,
        button_hcdg1?:string,
        tixian_state:string,
        daka_days?:string,
        successful_clock_in?:boolean,        
    }
    export interface LuckDraw {
        awad_name: string,
        awad_result: boolean
    }
    export interface lotto_dial {
        click_lotto_state: string
    }
    export interface lotto_phone_show {
        activity_show: string
    }
    export interface LuckDrawProductDialog {
        awad_dialog: string,
        awad_double_dialog: string,
    }
    export interface LuckDrawDialogClick{
        awad_dialog: string,
        awad_double_dialog: string,
        ck_module:string
    }
    export interface lotto_sign_chip {
        click_sign_button: number,
        is_sign_suc: boolean,
        sign_day: number
    }
    export interface big_turntable{
        activity_state:string,
        lucky_draw?:number,
        lucky_draw_nowly?:number,
        watch_videos?:boolean,
        prize?:string
    }
    export interface Online_rewards{
        activity_state:string,
        reward_state?:string,
        button_name_hcdg?:string,
        collection_completed?:string                        
    }
    export interface welfare_red_envelope{
        activity_state:string,
        button_name_hcdg?:string,
        collection_completed?:string,                           
    }
    export interface little_red_dots{
        activity_state:string,
        activity_position:string
    }
}