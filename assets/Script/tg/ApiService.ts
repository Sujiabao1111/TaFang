
import { AssistCtr } from "../Assist/AssistCtr";
import UserData from "../data/userData";
import { t } from "../Language/LanguageData";
import { Global } from "./Global";
import HttpClient from "./HttpClient";
import { WalletMgr } from "./WalletMgr";
const Telegram = window["Telegram"]


//#region 接口定义
declare global {
  /**
   * 接口响应数据结构
   */
  interface ApiResponse {
    /** 错误码 */
    code?: number;
    /** 返回数据 */
    data?: any;
    /** 错误信息 */
    message?: string;
    /** 是否成功 */
    success: boolean;
  }

  /**
   * 登录接口响应数据结构
   */
  interface LoginResponse extends ApiResponse {
    data: {
      /**
       * JWT令牌字符串
       */
      jwt: string;

      /**
       * 用户账户信息
       */
      user: User;

      /**
       * 用户游戏数据
       */
      userdata: UserData;

      /**
       * 签到天数
       */
      receive_day: number;
    };
    success: boolean;
  }

  /** 返回用户数据 */
  interface UserDataResponse extends ApiResponse {
    code?: number;
    data: {
      userdata: UserData;
    };
    message?: string;
    success: boolean;
  }

  /**
   * 用户基础信息
   */
  interface User {
    /**
     * 用户数据库ID
     */
    id: number;

    /**
     * 平台方用户ID
     */
    openid: string;

    /**
     * 邀请
     */
    inviter: number;

    /**
     * 创建时间(ISO格式)
     */
    createt: string;

    /**
     * 最后登录时间(ISO格式)
     */
    last_login: string;

    /**
     * 钱包地址
     */
    address: string;

    /**
     * 用户名
     */
    name: string;

    /**
     * 头像URL
     */
    avatar: string;

    /**
     * 密码占位符(实际应为加密值)
     */
    password: string;
    /**
     * |用户地区,格式:国家|省|市|区|服务器服务商|,例子:韩国|0|首尔|首尔|亚马逊|
     */
    lastregion: string;
  }


  /**
   * 获取游戏配置接口响应数据结构
   */
  interface GameConfigResponse extends ApiResponse {
    data: {
      cfg: GameConfig
    };
  }

  /**
   * 游戏配置数据
   */
  interface GameConfig {
    /**
     * 箱子配置
     */
    BoxConfigs: { [key: string]: BoxData };

    /**
     * 通用配置
     */
    Config: configData;

    /**
     * 商品SKU
     */
    Skus: { [key: string]: SkuData };

    /**
     * 日常任务配置
     */
    DailyCfg: CfgData[];

    /**
     * 循环任务配置
     */
    LoopCfg: CfgData[];

    /**
     * 道具配置
     */
    PropCfg: propCfgData[];

    /**
      * 周卡奖励配置
      */
    CardsRewardCfg: {
      1: cardsRewardCfgData[]
    };

    /**
     * 排行榜配置
     */
    RankRewardCfg: rankCfgData[];
  }

  /**
    * 排行榜奖励配置数据
    */
  interface rankCfgData {
    id: number;
    /**
     * 排行榜索引
     */
    rankidx: number;
    /**
     * 排行类型 1螺丝榜 2关卡榜 3邀请榜
     */
    rank_type: number;
    /**
     * 奖励类型 1螺丝 2箱子 3钥匙 4道具
     */
    reward_type: number;
    /**
     * 箱子或钥匙或道具id
     */
    rewardid: number;
    /**
     * 奖励数量
     */
    rewardnum: number;
  }
  /**
   * 周卡奖励配置数据
   */
  interface cardsRewardCfgData {
    /**
     * 日期ID
     */
    id: number;

    /**
     * 奖励类型 1螺丝 2箱子 3钥匙
     */
    reward_type: number;

    /**
     * 奖励数量
     */
    reward_num: number;

    /**
     * 奖励ID
     */
    reward_id: number;

    /**
     * 时间戳
     */
    t: number;
  }

  interface CfgData {
    id: number
    reward_id: number
    reward_num: number
    reward_type: number
    sort: number
    t: number
  }

  /**
   * 道具配置数据
   */
  interface propCfgData {
    /**
     * 道具ID
     */
    id: number,
    /**
     * 道具的描述信息
     */
    desc: string
    /**
     * 道具的价格 单位为美分 转星星等于:Math.floor(price / 100 / 0.495 * 25)
     */
    price: number,
    /**
     * 道具的过期时间
     */
    expire: number
    /**
    * 道具的图标
    */
    img: string,

  }

  /** 返回提现数据 */
  interface SubmitWithdrawResponse extends UserDataResponse {
  }

  /**
   * 箱子数据
   */
  interface BoxData {
    id: number,
    name: string,
    screwneed: number,
    minton: number,
    maxton: number,
    level: number,
    minton_show: number,
    maxton_show: number
  }

  /**
   * 通用配置数据
   */
  interface configData {
    id: number,
    minwithdraw: number,
    passvalidate: number,
    dailycoin: number,
    dailybox1: number,
    dailybox2: number,
    dailybox3: number,
    dailygamecoin: number,
    free_gamecoin_min: number,
    free_gamecoin_max: number,
    dailyshare_gamecoin: number,
    dailyinvite_key1: number,
    dailyinvite_key2: number,
    dailyinvite_key3: number
  }

  /**
   * 商品SKU配置数据
   */
  interface SkuData {
    id: number;
    t: number;
    price: number;
    name: string;
    desc: string;
    pricestar: number;
    queue: number;
    dailymin: number;
    dailymax: number;
    catalog: number;
  }

  /**
   * 任务数据
   */
  interface CfgData {
    /** 开始关卡 */
    beginloop: number,
    /** 结束关卡 */
    endloop: number,
    /** 奖励 [类型,数量,概率] */
    prize_prob: number[]
  }

  /**
   * 获取关卡ticket返回数据
   */
  interface TicketResponse extends ApiResponse {
    code?: number;
    data: {
      ticket: string;
    };
    success: boolean;
  }

  /**
   * 获取关卡奖励返回数据
   */
  interface LvPrizeResponse extends ApiResponse {
    code?: number;
    data: LvPrizeData;
    success: boolean;
  }

  /**
   * 关卡奖励数据
   */
  interface LvPrizeData {
    /** 卡包配置信息 */
    cardpack?: CardPackConfigInfo;
    /** 每日奖励 */
    dailyPrizeInfo: PrizeInfo[];
    /** 循环奖励 */
    loopPrizeInfo: PrizeInfo[];
    /** 用户数据 */
    userdata: UserData;
  }

  /**
   * 奖励信息数据
   */
  interface PrizeInfo {
    Tp: number;
    Amt: number;
  }

  /** 兑换钥匙响应类型 */
  interface ExchangeBoxKeyResponse extends UserDataResponse {
  }

  /** 开宝箱响应类型 */
  interface OpenBoxResponse extends UserDataResponse {
  }

  /** 领取周卡每日奖励响应类型 */
  interface GetCardDailyResponse extends UserDataResponse {
    data: {
      userdata: UserData,
      rewards: RewardData[],

      /**
       * 签到天数
       */
      receive_day: number;
    }
  }

  /**
   * 奖励数据结构
   */
  interface RewardData {
    /** 订单数据库id */
    id: number,
    /** 卡类型 */
    t: number,
    /** 奖励类型 1螺丝 2箱子 3钥匙 */
    reward_type: number,
    /** 奖励id 箱子id或者钥匙id */
    reward_id: number,
    /** 奖励数量 */
    reward_num: number,
    /** 领取的是属于第几天的奖励 */
    sort: number
  }


  /**
   * 创建支付订单响应数据结构
   */
  interface PurchaseCreateResponse extends ApiResponse {
    code?: number;
    data: {
      order: PaymentOrder;
    };
    message?: string;
    success: boolean;
  }

  /**
   * 支付订单数据结构
   */
  interface PaymentOrder {
    /** 订单数据库id */
    id: number;
    /** 用户id */
    uid: number;
    /** 订单id */
    oid: string;
    /** 订单行为1-购卡2-其他 */
    ob: number;
    /** 订单数据(skuid) */
    op: string;
    /** 订单状态1-已发起待充值2-已完成3-已失败在` */
    os: number;
    /** 订单支付链接(tgstar) */
    link: string;
    /** 订单支付时间 */
    created_at: string;

    usd: number;
  }

  /**
   * 支付成功确认响应数据结构
   */
  interface PurchaseDoneResponse extends UserDataResponse {
  }

  /**
   * 任务数据接口
   */
  interface TaskData {
    /** 任务id */
    id: number;

    /** 简体任务描述 */
    desc: string;
    /** 阿拉伯语描述 */
    desc_ar: string;
    /** 英语描述 */
    desc_en: string;
    /** 印尼语描述 */
    desc_id: string;
    /** 俄语描述 */
    desc_ru: string;
    /** 泰语描述 */
    desc_th: string;
    /** 繁体描述 */
    desc_zhhant: string;

    /** 分栏类型 1每日任务 2社区任务 */
    column_type: number;
    /** 任务类型 1每日任务 2一次性任务 */
    task_type: number;
    /** 奖励类型  1螺丝 2箱子 3钥匙 */
    reward_type: number;
    /** 奖励id 如果reward_type=2或3,表示箱子id和钥匙id */
    rewardid: number;
    /** 奖励数量 */
    rewardnum: number;
    /** 任务需求类型  */
    task_require_type: number;
    /** 任务需求次数 */
    task_require: number;
    /** 任务进度 */
    task_progress: number;
    /** 是否可领取 1可领取 0不可领取 */
    can_receive: number;
    /** 图标 */
    icon: string;
  }

  /**
   * 任务列表响应结构
   */
  interface TaskListResponse extends ApiResponse {
    code?: number;
    data: TaskData[];
    success: boolean;
  }

  /**
   * 领取任务奖励响应结构
   */
  interface TaskRewardResponse extends UserDataResponse {
  }

  /**
   * 邀请奖励配置
   */
  interface InviteReward {

    id: number;
    /** 奖励类型  1螺丝 2箱子 3钥匙 */
    reward_type: number;
    /** 奖励id 如果reward_type=2或3,表示箱子id和钥匙id */
    rewardid: number;
    /** 奖励数量 */
    rewardnum: number;
    /** 需要邀请的数量 */
    require_users: number;
  }

  /**
   * 邀请信息响应结构
   */
  interface InviteInfoResponse extends ApiResponse {
    code?: number;
    data: {
      /** 已邀请人数 */
      invitecnt: number;
      /** 已领取奖励的id */
      rewarded: number[];
      /** 奖励列表 */
      rewards: InviteReward[];
    };
    success: boolean;
  }

  /**
   * 领取邀请奖励响应结构
   */
  interface InviteRewardResponse extends ApiResponse {
    data: {
      /** 已领取奖励的id */
      id: number;
      rewarded: number[];
      /** 获得的奖励数据 [奖励类型,箱子或者钥匙id,数量] 类型：1螺丝 2宝箱 3钥匙 4道具 */
      rewards: number[];
      userdata: UserData;
    };
    success: boolean;
  }

  /**
   * 邀请玩家列表项
   */
  interface InvitePlayer extends User {
    /** 邀请时间 */
    createt: string;
    /** 邀请人ID */
    inviter: number;
  }

  /**
   * 邀请列表响应结构
   */
  interface InviteListResponse extends ApiResponse {
    data: {
      list: InvitePlayer[];
    };
    success: boolean;
  }
  /**
   * 分享奖励响应结构
   */
  interface ShareRewardResponse extends ApiResponse {
    data: {
      gotcoin: number;
      // userdata: UserData;
    };
    success: boolean;
  }

  /**
   * 头像数据响应结构
   */
  interface AvatarResponse extends ApiResponse {
    data: {
      data: string;
      type: 'svg' | 'png';
    };
    success: boolean;
  }

  /**
   * 排行榜条目数据
   */
  interface RankItem {
    /**  */
    uid?: number;
    /** 头像 */
    avatar?: string;
    /** 昵称 */
    name: string;
    /**  */
    openid?: string;
    /** 分数 */
    score: number;
  }

  /**
   * 排行榜响应结构
   */
  interface RankResponse extends ApiResponse {
    data: {
      /** 排行榜列表 */
      list: RankItem[];
      /** 用户自己的排名 */
      myrank: number;
      /** 用户自己的分数 */
      myscore: number;
    };
    success: boolean;
  }

  /**
   * 排行榜响应结构
  */
  interface TasknotifyResponse extends ApiResponse {
    data?: {
      /** type=12(使用底部三个道具)/13(使用复活)成功时获得的azen币数量 */
      azen: number;
    };
    success: boolean;
  }


  /**
   * 购买道具响应结构
   */
  interface BuyPropResponse extends ApiResponse {
    data: {
      order: PaymentOrder;
    };
    success: boolean;
  }

  /**
   * 使用道具响应结构
   */
  interface UsePropResponse extends ApiResponse {
    success: boolean;
    message?: string;
  }

  /**
 * 购买道具响应结构
 */
  interface GetUserproplist extends ApiResponse {
    // data: [{
    //   "prop_id": number;
    //   "num": number;
    // }];
    success: boolean;
  }

  /**
   * 检查订单状态响应结构
   */
  interface CheckOrderResponse extends ApiResponse {
    success: boolean;
  }

  /**
   * 注册活动响应结构
   */
  interface RegActivityResponse extends ApiResponse {
    success: boolean;
  }

  /**
   * 获取免费金币响应结构
   */
  interface FreeGameCoinResponse extends ApiResponse {
    code?: number;
    data: {
      /** 本次获取的金币数量 */
      gotcoin: number;
      /** 用户数据 */
      userdata: UserData;
    };
    success: boolean;
  }

  /**
   * 挖矿信息
   */
  interface MiningInfo {
    /** 用户ID */
    uid: number;
    /** 当前进度 */
    power: number;
    /** 下次可看广告时间 */
    ts: number;
    /** 总进度 */
    max_power: number;
    /** 克获得的奖励 */
    reward_num: number;
    /** 奖励的币类型，ton或usdt */
    coin_type: string;

    /** 当前挖矿奖励加倍状态 0无 1普通 2超级 */
    double_status: number;
    /** 0未超级加倍 1已使用超级加倍 */
    today_super: number;
    /** 为1表示当前加倍状态从普通升级到超级 */
    auto_up: number;
  }

  /**
   * 获取挖矿信息响应结构
   */
  interface MiningInfoResponse extends ApiResponse {
    data: MiningInfo;
    success: boolean;
  }

  /**
   * 挖矿操作响应结构
   */
  interface MiningResponse extends ApiResponse {
    data: MiningInfo;
    success: boolean;
  }

  /**
   * 领取挖矿奖励响应结构
   */
  interface MiningRewardResponse extends ApiResponse {
    data: MiningInfo;
    rewardnum: number;
    success: boolean;
  }

  /**
   * 设置挖矿翻倍响应结构
   */
  interface MineRewardDoubleResponse extends ApiResponse {
    data: {
      /** 翻倍类型 */
      double_status: number;
      /** 今日是否已经超级加倍 */
      today_super: number;
    };
    success: boolean;
  }

  /**
     * 挖矿邀请列表项
     */
  interface MineInviteItem {
    /** 用户ID */
    uid: number;
    /** 昵称 */
    name: string;
    /** 头像 */
    avatar: string;
    /** 是否通过引导关卡 */
    pass_guide_stage: number;
  }

  /**
   * 获取挖矿邀请列表响应结构
   */
  interface MineInviteListResponse extends ApiResponse {
    data: {
      /** 邀请列表 */
      list: MineInviteItem[];
    };
    success: boolean;
  }

  /**
   * 免广告状态响应结构
   */
  interface AdFreeResponse extends ApiResponse {
    data: {
      /** 今日免广告次数 */
      today_ad_free: number;
    };
    success: boolean;
  }


  /**
  * 获取游戏配置接口响应数据结构
  */
  interface CardPackConfigResponse extends ApiResponse {
    data: CardPackConfigInfo[]
    success: boolean;
  }

  /**
  * 卡包系列响应结构
  */
  interface CardListResponse extends ApiResponse {
    data: CardListInfo[];
    success: boolean;
  }
  /**
  * 卡包响应结构
  */
  interface CardDetailResponse extends ApiResponse {
    data: CardDetailInfo[];
    success: boolean;
  }

  /**
    * 卡包碎片响应结构
    */
  interface CardDebrisResponse extends ApiResponse {
    data: CardDebrisInfo[];
    success: boolean;
  }

  /**
  * 获取收藏的系列响应结构
  */
  interface CollectedSerieResponse extends ApiResponse {
    data: CardListInfo[];
    success: boolean;
  }
  /**
  * 获取收藏的卡片响应结构
  */
  interface CollectedCardsResponse extends ApiResponse {
    data: CardDetailInfo[];
    success: boolean;
  }

  /**
  * 获取拥有卡包的列表响应结构
  */
  interface OwnedPacksListResponse extends ApiResponse {
    data: OwnedPacksListInfo[];
    success: boolean;
  }
  /**
  * 获取拥有卡包的列表响应结构
  */
  interface OpenCardPacksResponse extends ApiResponse {
    data: OpenCardPacksInfo[];
    success: boolean;
  }
  /**
  * 收藏卡响应结构
  */
  interface CardCollectResponse extends ApiResponse {
    success: boolean;
  }

  /**
  * 取消收藏卡响应结构
  */
  interface CardUnCollectResponse extends ApiResponse {
    success: boolean;
  }

  /**
  * 分解卡片响应结构
  */
  interface CardDecomposeResponse extends ApiResponse {
    success: boolean;
  }

  /**
  * 合成卡片响应结构
  */
  interface CardComposeResponse extends ApiResponse {
    success: boolean;
  }
  /**
  * 出售卡片响应结构
  */
  interface SellCardResponse extends ApiResponse {
    success: boolean;
  }
  /**
  * 领取系列奖励响应结构
  */
  interface GetRewardResponse extends ApiResponse {
    data: CardParkRewardInfo[];
    success: boolean;
  }


  /**
   * 卡包配置信息
   */
  interface CardPackConfigInfo {
    /** id */
    id: number;
    /** 价格 */
    price: number;
    /** icon */
    icon: string;
    /** img */
    img: string;
    /** 名字 */
    name: string;
    /** 信息 */
    info: string;
    /** pt */
    pt: number;
    /** 奖励 */
    rewards: string;
    /** 赛季id */
    season_id: number;
    /** usd */
    usd: number;
    /** 开始 */
    start_time: string;
    /** 结束时间 */
    end_time: string;
  }


  /**
  * 卡包系列信息
  */
  interface CardListInfo {
    /** 系列id */
    id: number;
    /** 是否收藏  0:没收藏  1:收藏 */
    is_collected: number;
    /** 图片 */
    img: string;
    /** 系列信息 */
    info: string;
    /** 系列名称 */
    name: string;
    /** 卡包id */
    packid: number;
    /** 创建时间 */
    create_time: string;
    /** 领取奖励 1:可领取  0:不可领取  2:已领取 */
    getall: number;
  }

  /**
  * 卡详细信息
  */
  interface CardDetailInfo {
    /** 系列id */
    series_id: number;
    /** 出售价格 */
    sell_price: number;
    /** rarity:1普通 依次类推 */
    rarity: number;
    /** num=0就是没拥有 */
    num: number;
    /** 是否收藏  0:没收藏  1:收藏 */
    is_collected: number;
    /** 系列是否收藏  0:没收藏  1:收藏 */
    is_collected_series: number;
    /** 图片 */
    image_url: string;
    /** 分解获得  合成所需 碎片数量 */
    debris_num: number;
    /** 卡片id */
    card_id: number;
  }

  /**
  * 卡包系列信息
  */
  interface CardDebrisInfo {
    /** id */
    id: number;
    /** 用户uid */
    uid: number;
    /** rarity:1普通 依次类推 */
    rarity: number;
    /** 数量 */
    num: number;
  }

  /**
 * 卡包系列信息
 */
  interface CardParkRewardInfo {
    /** 奖励类型，1螺丝，2宝箱，3钥匙 */
    0: number;
    /** 宝箱或钥匙id  1:青铜  2:白银  3:黄金  */
    1: number;
    /** 数量 */
    2: number;
  }


  /**
 * 卡包系列信息
 */
  interface OwnedPacksListInfo {
    /** icon */
    icon: string;
    /** img */
    img: string;
    /** info*/
    info: string;
    /** name*/
    name: string;
    /** num */
    num: number;
    /** 包id */
    packid: number;
    /** 钻石价格 */
    price: number;
    /** 赛季id */
    season_id: number;
    /** usd */
    usd: number;
  }
  /**
  * 开卡包系列信息
  */
  interface OpenCardPacksInfo {
    /** 碎片数量 */
    debris_num: number;
    /** id */
    id: number;
    /** image_url*/
    image_url: string;
    /** name*/
    name: string;
    /** rarity:1普通 依次类推 */
    rarity: number;
    /** 出售价格 */
    sell_price: number;
    /** 系列id */
    series_id: number;
    /** 赛季id */
    season_id: number;
    /** create_time */
    create_time: string;
    /** 权重 */
    weight: number;
  }


  /**
  * 代理的广告配置
  */
  interface AgentAdConfigItem {
    id: number;
    ad_type: string;
    ad_id: string;
    daili_id: number;
    weight: number;
    state: number;
  }
  /**
  * 获取代理的广告配置响应结构
  */
  interface AgentAdConfigResponse extends ApiResponse {
    data: AgentAdConfigItem[];
  }

  /**
  * 邮件项数据结构
  */
  interface MailItem {
    /** 邮件ID */
    id: number;
    /** 用户ID */
    uid: number;
    /** 邮件标题 */
    title: string;
    /** 邮件内容 */
    content: string;
    /** 奖励数据（二维数组字符串） */
    rewards: string | null;
    /** 创建时间 */
    createt: string;
    /** 更新时间 */
    updatet: string;
    /** 状态：0未读 1已读未领取 2已读已领取 4删除 */
    state: number;
  }

  /**
   * 邮件列表响应结构
   */
  interface MailListResponse extends ApiResponse {
    data: MailItem[];
  }

  /**
   * 阅读邮件响应结构
   */
  interface ReadMailResponse extends ApiResponse {
    data?: {
      /** 更新后的用户数据（领取奖励时返回） */
      userdata?: UserData;
    };
  }

  /**
   * 换量任务项数据结构
   */
  interface ExchangeTaskItem extends TaskData {
    /** 跳转链接 */
    jump_url?: string;

    updatet?: string;
    complete?: number;
    num?: number;
  }

  /**
   * 换量任务列表响应结构
   */
  interface ExchangeTaskListResponse extends ApiResponse {
    data: ExchangeTaskItem[];
  }

  /**
   * 领取换量任务奖励响应结构
   */
  interface ExchangeTaskRewardResponse extends UserDataResponse {
    // 继承自 UserDataResponse，已包含 userdata
  }
}

//#region 枚举
export enum ErrorCode {
  iota = 0,

  /** 数据解析错误 */
  ErrorParseError,
  /** 数据库错误 */
  ErrorSQLError,
  /** 错误的openid */
  ErrorOpenidError,
  /** 创建用户失败 */
  ErrorCreateUser,
  /** 用户不存在 */
  ErrorUserNotExist,
  /** 创建角色token失败 */
  ErrorCreateToken,
  /** 签名验证失败 */
  ErrorValidateError,
  /** 用户未登录 */
  ErrorUserNotLogin,
  /** 配置不存在 */
  ErrorConfigNotExist,
  /** 资源不足 */
  ErrorResourceNotEnough,
  /** 最低%.2f才可以提现 */
  ErrorCoinNotEnough,
  /** 周卡等级不足 */
  ErrorRankNotEnough,
  /** 尚未实现 */
  ErrorNotImpleted,
  /** 今日已领取 */
  ErrorAlreadyTake,
  /** 已经购买该卡 */
  ErrorAlreadyHaveRank,
  /** 未找到记录 */
  ErrorNotfound,
  /** 订单状态错误 */
  ErrorOrderStatuWrong,
  /** 今日已分享 */
  ErrorTodayShared,
  /** 获取列表失败 */
  ErrorDynamicError,
  /** 无法领取奖励 */
  ErrorClaimReward,
  /** 不能重复购买 */
  ErrorRepeatPurchase,
  /** 不能使用道具 */
  ErrorUseProp,
  /** 广告中途退出 */
  ErrorAdExitsMidway,
}

export enum ErrorMsg {
  /** 不显示错误 */
  // null = 0,
  /** 数据解析错误 */
  ErrorParseErrorStr = 1,
  /** 数据库错误 */
  ErrorSQLErrorStr = 2,
  /** 错误的openid */
  ErrorOpenidErrorStr,
  /** 创建用户失败 */
  ErrorCreateUserStr,
  /** 用户不存在 */
  ErrorUserNotExistStr,
  /** 创建角色token失败 */
  ErrorCreateTokenStr,
  /** 签名验证失败 */
  ErrorValidateErrorStr,
  /** 用户未登录 */
  ErrorUserNotLoginStr,
  /** 配置不存在 */
  ErrorConfigNotExistStr,
  /** 资源不足 */
  ErrorResourceNotEnoughStr,
  /** 最低%.2f才可以提现 */
  ErrorCoinNotEnoughStr,
  /** 周卡等级不足 */
  ErrorRankNotEnoughStr,
  /** 尚未实现 */
  ErrorNotImpletedStr,
  /** 今日已领取 */
  ErrorAlreadyTakeStr,
  /** 已经购买该卡 */
  ErrorAlreadyHaveRankStr = 15,

  /** 未找到记录 */
  ErrorNotfoundStr = 16,
  /** 订单状态错误 */
  ErrorOrderStatuWrongStr = 17,
  /** 今日已分享 */
  ErrorTodaySharedStr = 18,
  /** 获取列表失败 */
  ErrorDynamicError,

  /** 无法领取奖励 */
  ErrorClaimRewardStr = 20,
  /** 不能重复购买 */
  ErrorRepeatPurchaseStr = 21,
  /** 不能使用道具 */
  ErrorUsePropStr = 22,
  /** 广告中途退出 */
  ErrorAdExitsMidway = 23,

}

/**
 * 任务通知类型
 */
export enum TaskNotifyType {
  /** 订阅 */
  Subscribe = 'subscribe',
  /** 加群 */
  AddGroup = 'addgroup',
  /** 投票 */
  Vote = 'vote',
  /** 使用底部三个道具 */
  item = '12',
  /** 使用复活 */
  revive = '13',
}

export enum ChannelType {
  ton = 'ton',
  azen = 'azen',
}


//#endregion


//#region API

/**
 * 业务API服务类，封装具体业务接口
 * @class
 * @example
 * const api = new ApiService({
 *   baseUrl: 'http://api.example.com'
 * });
 * 
 */
export class ApiService {

  // private baseUrl: string = 'https://screwit.vazhenina.com/api';
  // private baseUrl: string = 'http://192.168.2.25:3559';
  // private baseUrl: string = 'https://car.vazhenina.com/api';

  static readonly TEST = false;
  private get baseUrl() {
    if (ApiService.TEST) { // 测试
      return 'https://car.vazhenina.com/testapi'
    }
    return 'https://car.vazhenina.com/api';
  }

  /**
   * HTTP客户端实例
   */
  private http: HttpClient = new HttpClient({
    baseUrl: this.baseUrl
  });

  private static _ins: ApiService;
  static get ins() {
    if (!this._ins) {
      this._ins = new ApiService();
    }
    return this._ins;
  }

  /**
   * 构造函数
   *
   * @param baseUrl 基础URL
   */
  constructor() {
  }


  /** 是否登录 */
  logined: boolean = false;
  /**
   * 用户登录
   *
   * @param openId 用户OpenID
   * @param initData 初始化数据
   * @param iid 邀请者的uid    
   * @returns 返回包含token的对象
   */
  async login(openId: string, initData: string, iid?: number, loginType?: string): Promise<LoginResponse> {
    openId = String(openId)
    // console.log('login:', openId, initData);
    if (!iid) {
      iid = 0;
    }
    else {
      iid = Number(iid);
    }
    const response = await this.http.post<LoginResponse>('/logintg', {
      open_id: openId,
      iid,
      init_data: initData,
      login_type: loginType,
    });
    if (response && response?.response && response.response?.success) {
      this.http.setAuthToken(response.response.data.jwt);
      Global.ins.receive_day = response.response?.data?.receive_day;
      // Global.ins.initPlayer(response.data.user, response.data.userdata);
      console.log("登录成功", response);
      this.logined = true;
    }
    else {
      console.log("登录失败", response);
      this.logined = false;
    }
    return response.response;
  }


  /**
   * 获取用户信息
   *
   * @returns 返回用户信息的响应数据
   */
  async getUserinfo(is_update_user: boolean = true): Promise<UserDataResponse> {
    const response = await this.http.post<UserDataResponse>('/getuserinfo', null, { auth: true });
    if (response && response?.response && response.response?.success) {
      console.log("获取用户信息", response);
      Global.ins.setUserData(response.response.data?.userdata, is_update_user);
      return response?.response;
    }
    else {
      console.log("获取用户信息失败", response);
    }
  }

  /**
   * 获取游戏配置信息
   *
   * @returns 返回获取的配置信息
   */
  async getConfigs(): Promise<GameConfigResponse> {
    const response = await this.http.post<GameConfigResponse>('/configs', null, { auth: false });
    console.log('getConfigs  gameConfig:', response);
    if (response.status >= 400) {
      return null;
    }
    Global.ins.gameConfig = response.response.data.cfg;
    return response.response;
  }

  /**
   * 提交提现请求
   *
   * @param amount 提现金额
   * @param channel 提现渠道，可选参数，渠道,不传或者空字符默认为ton
   * @param walletAddress 提现地址
   * @returns 提交结果
   */
  async submitWithdraw(amount: number, channel?: ChannelType) {
    const response = await this.http.post<SubmitWithdrawResponse>('/submitwithdraw',
      { a: amount, channel, addr: WalletMgr.ins.getAddress() }, { auth: true });
    if (response.status == 200 && response.response?.success) {
      Global.ins.setUserData(response.response.data.userdata);
    }
    return response;
  }

  /**
    * 返回票据信息
    */
  async getTicket(gid: number) {
    const response = await this.http.post<TicketResponse>('/openstage', { gid }, { auth: true });
    if (response && response.response.data?.ticket) {
      Global.ins.ticket = response.response.data.ticket;
      return response.response.data.ticket;
    }

    // UIManager.ins.showWindowTips({
    //   // title: t('tips.networkError'),
    //   tips: this.getErrorMessage(response.response) + '\n\nCode:' + response.status + '-' + gid + '-' + Global.ins.userData.stage + '-' + Global.ins.cur_got_coins,
    //   yes_text: t('tips.retry'),
    //   yes_cb: async () => {
    //     this.getTicket(gid);
    //   },
    //   no_text: t('main.backHome'),
    //   no_cb: () => {
    //     UIManager.ins.closeAll();
    //     UIManager.ins.showUI("MenuUI", BUNDLE_TYPE_ENUM.GAME_PLAY);
    //   }
    // })
  }




  /**
 * 获取关卡奖励信息
 * @param gid 关卡id
 * 
 * @returns 
 */
  async getLvPrize(gid: number, check_coin: number) {
    let ticket = Global.ins.ticket;
    if (!ticket) {
      // Global.ins.ticket = ticket = await this.getTicket(GlobalData.cur_lvl);
      return;
    }
    const response = await this.http.post<LvPrizeResponse>('/passstage', { ticket, gid, check_coin }, { auth: true });
    if (response.status == 200 && response.response?.success) {
      Global.ins.setUserData(response.response.data.userdata);
      Global.ins.ticket = undefined;
    }
    return response;
  }


  // /**
  //  * 兑换宝箱钥匙
  //  * @param type 宝箱类型 (使用BoxType枚举)
  //  */
  // async exchangeBoxKey(type: BoxType): Promise<ApiMsg<ExchangeBoxKeyResponse>> {
  //   const response = await this.http.post<ExchangeBoxKeyResponse>(
  //     '/exchangeboxkey',
  //     { t: type },
  //     { auth: true }
  //   );

  //   return response;
  // }

  // /**
  //  * 开启宝箱
  //  * @param type 宝箱类型 (使用BoxType枚举)
  //  */
  // async openBox(type: BoxType): Promise<ApiMsg<OpenBoxResponse>> {
  //   const response = await this.http.post<OpenBoxResponse>(
  //     '/openbox',
  //     { t: type },
  //     { auth: true }
  //   );
  //   return response;
  // }

  /**
   * 绑定钱包
   *
   * @param addr 钱包地址
   * @returns 返回连接钱包的响应结果
   */
  async bindWallet(addr: string): Promise<ApiMsg<IResponseData>> {
    const response = await this.http.post<IResponseData>('/bindwallet', {
      addr
    }, { auth: true });
    return response;
  }

  /**
   * 解绑钱包
   *
   * @returns 解绑操作的响应数据
   */
  async unbindWallet(): Promise<ApiMsg<IResponseData>> {
    const response = await this.http.post<IResponseData>('/unbindingwallet', {}, { auth: true });
    return response;
  }

  // /**
  //  * 领取卡每日奖励
  //  * @param type 卡类型 1周卡2月卡3年卡
  //  */
  // async carddaily(type: CardType): Promise<ApiMsg<GetCardDailyResponse>> {
  //   const response = await this.http.post<GetCardDailyResponse>(
  //     '/carddaily',
  //     { t: type },
  //     { auth: true }
  //   );
  //   if (response.status == 200 && response.response?.success) {
  //     Global.ins.receive_day = response.response.data.receive_day;
  //     Global.ins.setUserData(response.response.data.userdata);
  //   }
  //   return response;
  // }

  /**
   * 创建支付订单
   * @param skuid 商品SKU ID
   * @returns 支付订单信息
   */
  async purchaseCreate(skuid: number): Promise<ApiMsg<PurchaseCreateResponse>> {
    let params = {
      skuid
    };
    if (window?.playdeckIsOpen) {
      params["payment_from"] = "playdeck"
    }
    const response = await this.http.post<PurchaseCreateResponse>(
      '/purchasecreate',
      { skuid },
      { auth: true }
    );

    if (response.response?.success) {
      console.log('订单创建成功:', response.response.data.order);
    }
    return response;
  }

  /**
   * 确认支付成功
   * @param id 订单数据库ID
   * @param orderId 订单字符串ID
   * @returns 更新后的订单信息及用户数据
   */
  async purchaseDone(id: number, orderId: string): Promise<ApiMsg<PurchaseDoneResponse>> {
    const response = await this.http.post<PurchaseDoneResponse>(
      '/purchasedone',
      {
        id,
        order_id: orderId
      },
      { auth: true }
    );

    console.log('支付确认', response);
    if (response.response?.success) {
      // 如果需要更新本地用户数据可在此处理
    }
    return response;
  }

  /**
   * 获取任务列表
   * @returns 任务数据数组
   */
  async getTaskList(): Promise<ApiMsg<TaskListResponse>> {
    const response = await this.http.post<TaskListResponse>(
      '/tasklist',
      {},
      { auth: true }
    );

    if (response.response?.success) {
      console.log('任务列表获取成功:', response.response.data);
    }
    return response;
  }

  /**
   * 领取任务奖励
   * @param tid 任务ID
   * @returns 更新后的用户数据
   */
  async claimTaskReward(tid: number): Promise<ApiMsg<TaskRewardResponse>> {
    const response = await this.http.post<TaskRewardResponse>(
      '/gettaskreward',
      { tid },
      { auth: true }
    );

    if (response.response?.success) {
      console.log('任务奖励领取成功:', response.response.data.userdata);
      // 可在此处添加用户数据更新逻辑
      Global.ins.setUserData(response.response.data.userdata, false);
    }
    return response;
  }

  /**
    * 获取邀请信息
    * @returns 包含邀请数据和奖励配置的响应
    */
  async getInviteInfo(): Promise<ApiMsg<InviteInfoResponse>> {
    const response = await this.http.post<InviteInfoResponse>(
      '/getinviteinfo',
      {},
      { auth: true }
    );

    if (response.response?.success) {
      console.log('邀请信息获取成功:', response.response.data);
    }
    return response;
  }

  /**
   * 领取邀请奖励
   * @param rewardId 奖励配置ID
   * @returns 更新后的用户数据
   */
  async claimInviteReward(rewardId: number): Promise<ApiMsg<InviteRewardResponse>> {
    const response = await this.http.post<InviteRewardResponse>(
      '/getinvitereward',
      { tid: rewardId },
      { auth: true }
    );

    if (response.response?.success) {
      console.log('邀请奖励领取成功:', response.response.data.userdata);
      Global.ins.setUserData(response.response.data.userdata);
    }
    return response;
  }

  /**
   * 获取邀请玩家列表
   * @param pageNo 页码（从0开始）
   * @param pageSize 每页数量
   */
  async getInviteList(pageNo: number, pageSize: number): Promise<ApiMsg<InviteListResponse>> {
    const response = await this.http.post<InviteListResponse>(
      '/getinvitelist',
      { pageNo, pageSize },
      { auth: true }
    );

    if (response.response?.success) {
      console.log('邀请列表获取成功:', response.response.data.list);
    }
    return response;
  }

  /**
   * 上报分享行为获取奖励
   * @returns 包含获得的游戏币和用户数据
   */
  async reportShare(gid?: number): Promise<ApiMsg<ShareRewardResponse>> {
    const response = await this.http.post<ShareRewardResponse>(
      '/aftershare',
      { gid },
      { auth: true }
    );

    if (response.response?.success) {
      console.log('分享成功:', response);
      // Global.ins.setUserData(response.response.data.userdata);
    }
    return response;
  }

  /**
  * 获取排行榜数据
  * @param rankType 排行榜类型（使用RankType枚举）
  * @param pageNo 页码（从0开始）
  * @param pageSize 每页数量
  * @returns 包含排行榜列表和用户个人排名数据
  */
  async getRankList(
    // rankType: RankType,
    pageNo: number,
    pageSize: number
  ): Promise<ApiMsg<RankResponse>> {
    const response = await this.http.post<RankResponse>(
      '/rank',
      {
        // rank_type: rankType,
        pageNo,
        pageSize
      },
      { auth: true }
    );

    if (response.response?.success) {
      // console.log(`获取${RankType[rankType]}榜成功`, response.response.data);
    }
    return response;
  }

  /**
   * 上报任务完成情况（订阅/加群/投票）
   * @param notifyType 通知类型 subscribe/addgroup/vote/12(使用底部三个道具)/13(使用复活) 字符串
   */
  async reportTaskNotify(
    notifyType: TaskNotifyType,
  ): Promise<ApiMsg<TasknotifyResponse>> {
    let ticket;
    let gid;
    switch (notifyType) {
      case TaskNotifyType.Subscribe:
      case TaskNotifyType.AddGroup:
      case TaskNotifyType.Vote:
        break;
      default:
        // gid = GlobalData.cur_lvl
        ticket = Global.ins.ticket;
        if (!ticket) {
          // Global.ins.ticket = ticket = await this.getTicket(GlobalData.cur_lvl);
        }
        break;
    }
    const response = await this.http.post<{ success: boolean }>(
      '/tasknotify',
      {
        open_id: Global.ins.user?.openid,
        type: String(notifyType),
        ticket,
        gid,
      },
      { auth: false } // 不需要认证
    );
    return response;
  }


  /**
    * 购买道具
    * @param propId 道具ID
    * @returns 支付订单信息
    */
  async buyProp(propId: number, stage: number): Promise<ApiMsg<BuyPropResponse>> {
    let params = {
      prop_id: propId,
      stage
    }
    if (window?.playdeckIsOpen) {
      params["payment_from"] = "playdeck"
    }
    const response = await this.http.post<BuyPropResponse>(
      '/buyprop',
      params,
      { auth: true }
    );

    if (response.response?.success) {
      console.log('道具订单创建成功:', response.response.data.order);
    }
    return response;
  }


  /**
    * 购买道具
    * @param propId 道具ID
    * @returns 支付订单信息
    */
  async mallbuyProp(propId: number, num: number): Promise<ApiMsg<BuyPropResponse>> {
    let params = {
      prop_id: propId,
      num: num
    }
    if (window?.playdeckIsOpen) {
      params["payment_from"] = "playdeck"
    }
    const response = await this.http.post<BuyPropResponse>(
      '/mallbuyprop',
      params,
      { auth: true }
    );

    if (response.response?.success) {
      console.log('商城道具订单创建成功:', response.response.data);
    }
    return response;
  }

  /**
  * 购买道具操作流程封装
  *
  * @param successCallback 成功回调
  * @param propId 道具ID
  * @param stage 关卡
  */
  // async buyPropOperation(successCallback: Function, propId: PropType, num: number) {
  //   const buyResult = await this.mallbuyProp(propId, num);
  //   if (buyResult.status != 200 || !buyResult.response?.success) {
  //     UIManager.ins.showToast(t("tips.orderCreateFailed"));
  //     return;
  //   }

  //   if (CC_DEBUG) {
  //     let oid = buyResult.response.data.order.oid;
  //     await ApiService.ins.getPurchasedone(oid);
  //     successCallback();
  //     ApiService.ins.getUserProplist();
  //     UIManager.ins.showToast(t("tips.purchaseSuccess"));
  //     return;
  //   }

  //   try {
  //     let rsp = buyResult.response;
  //     let url = rsp.data.order.link;
  //     await new Promise((resolve) => {
  //       Global.ins.payment(rsp.data.order, async (status) => {
  //         console.log(`tg star pay status :${status}`);
  //         const checkFun = async (count: number) => {
  //           const m = await ApiService.ins.checkOrder(rsp.data.order.oid);
  //           if (m.status === 200 && m.response?.success) {
  //             UIManager.ins.showToast(t("tips.purchaseSuccess"));
  //             successCallback();
  //             ApiService.ins.getUserProplist();
  //             resolve(true);
  //           } else {
  //             if (--count > 0) {
  //               console.log('checkOrder again', count);
  //               await new Promise(resolve => setTimeout(resolve, 2000));
  //               await checkFun(count);
  //             }
  //             else {
  //               ApiService.ins.showError(m);
  //             }
  //             resolve(false);
  //           }
  //         }

  //         if (status === "paid") {
  //           // 4. 确认订单支付状态
  //           //这里处理检查订单，请求checkorder
  //           await checkFun(5);
  //         }
  //         else {
  //           console.log("tg star pay status :" + status);
  //           resolve(false);
  //         }
  //       })
  //     });

  //   } catch (error) {
  //     console.log('handlePropOperation error', error);
  //     UIManager.ins.showToast(t("tips.paymentPending"));
  //   }


  // }


  /**
   * 获取玩家身上的道具列表
   * @param propId 道具ID
   */
  // async getUserProplist(): Promise<ApiMsg<GetUserproplist>> {
  //   const response = await this.http.post<GetUserproplist>(
  //     '/getuserproplist',
  //     {}, // 空请求体
  //     { auth: true }
  //   );

  //   if (response.response?.success) {
  //     Global.ins.proplist = response.response.data.props;
  //     Global.ins.getUserProplist();
  //     EventManager.ins.emit(EVENT_NAME_ENUM.UPDATE_PROPLIST);
  //     console.log('获取玩家身上的道具列表:', response.response.data);
  //   }
  //   return response;
  // }

  /**
  * 获取玩家身上的道具列表
  * @param order_id 支付订单信息
  * @returns 
  */
  async getPurchasedone(order_id): Promise<ApiMsg<GetUserproplist>> {
    const response = await this.http.post<GetUserproplist>(
      '/purchasedone',
      { order_id: order_id }, // 空请求体
      { auth: true }
    );
    return response;
  }



  // /**
  //  * 确认道具购买成功
  //  * @param orderId 订单ID
  //  */
  // async confirmPropPurchase(orderId: string): Promise<ApiMsg<{ success: boolean }>> {
  //   const response = await this.http.post<{ success: boolean }>(
  //     '/buypropdone',
  //     { order_id: orderId },
  //     { auth: true }
  //   );

  //   if (response.response?.success) {
  //     console.log('道具购买确认成功');
  //   }
  //   return response;
  // }

  /**
   * 能否使用道具
   * @param propId 道具ID
   */
  // async getUserprop(propId: PropType = PropType.SkipStage): Promise<boolean> {
  //   const payload: any = { prop_id: propId };

  //   const response = await this.http.post<UsePropResponse>(
  //     '/getuserprop',
  //     payload,
  //     { auth: true }
  //   );

  //   if (response.status == 200 && response.response?.success) {
  //     console.log('道具可以使用');
  //     return true;
  //   }
  //   console.log('道具不可以使用');
  //   return false;
  // }
  /**
   * 使用道具
   * @param propId 道具ID
   * @param stage 目标关卡（可选）
   */
  // async useProp(propId: PropType, stage?: number): Promise<ApiMsg<UsePropResponse>> {
  //   const payload: any = { prop_id: propId, stage };
  //   const response = await this.http.post<UsePropResponse>(
  //     '/useprop',
  //     payload,
  //     { auth: true }
  //   );

  //   if (response.response?.success) {
  //     console.log('道具使用成功');
  //   }
  //   return response;
  // }


  /**
  * 道具操作流程封装
  *
  * @param successCallback 成功回调
  * @param propId 道具ID
  * @param stage 关卡
  */
  // async handlePropOperation(successCallback: Function, propId: PropType, stage?: number) {
  //   try {
  //     // 1. 尝试使用道具
  //     const canUse = await this.getUserprop(propId);
  //     if (canUse) {
  //       const useResult = await this.useProp(propId, stage);
  //       if (useResult.status == 200 && useResult.response?.success) {
  //         successCallback();
  //         UIManager.ins.showToast(t("tips.propsuccess"));
  //         return;
  //       }
  //     }


  //     // 2. 使用失败时弹出确认窗口
  //     UIManager.ins.showWindowTips({
  //       /** 确认按钮回调 */
  //       yes_cb: async () => {
  //         // 3. 创建购买订单
  //         const buyResult = await this.buyProp(propId, stage);
  //         if (buyResult.status != 200 || !buyResult.response?.success) {
  //           UIManager.ins.showToast(t("tips.orderCreateFailed"));
  //           return;
  //         }
  //         try {
  //           let rsp = buyResult.response;
  //           let url = rsp.data.order.link;
  //           await new Promise((resolve) => {
  //             Global.ins.payment(rsp.data.order, async (status) => {
  //               console.log(`tg star pay status :${status}`);

  //               const checkFun = async (count: number) => {
  //                 const m = await ApiService.ins.checkOrder(rsp.data.order.oid);
  //                 if (m.status === 200 && m.response?.success) {
  //                   UIManager.ins.showToast(t("tips.purchaseSuccess"));
  //                   // 5. 尝试使用道具
  //                   const useResult = await this.useProp(propId, stage);

  //                   if (useResult.status == 200 && useResult.response?.success) {
  //                     successCallback();
  //                   }
  //                   else {
  //                     EventManager.ins.emit(EVENT_NAME_ENUM.UPDATE_USER);
  //                     ApiService.ins.showError(useResult);
  //                   }

  //                   resolve(true);
  //                   // this.home_action.updataPage();
  //                 }
  //                 else {
  //                   // PopMgr.ins.popLayer.showLabelTips(m.message);
  //                   if (--count > 0) {
  //                     console.log('checkOrder again', count);
  //                     await new Promise(resolve => setTimeout(resolve, 2000));
  //                     await checkFun(count);
  //                   }
  //                   else {
  //                     ApiService.ins.showError(m);
  //                   }

  //                   resolve(false);
  //                 }

  //               }

  //               if (status === "paid") {
  //                 // 4. 确认订单支付状态
  //                 //这里处理检查订单，请求checkorder
  //                 await checkFun(5);
  //               }
  //               else {
  //                 // await checkFun(5);
  //                 console.log("tg star pay status :" + status);

  //                 resolve(false);

  //               }
  //             })
  //           });

  //         } catch (error) {
  //           console.log('handlePropOperation error', error);
  //           UIManager.ins.showToast(t("tips.paymentPending"));
  //         }
  //       },
  //       yes_text: t("tips.confirm"),
  //       no_text: t("tips.cancel"),
  //       tips: t("tips.insufficientPropsConfirm")
  //     });
  //   } catch (error) {
  //     console.error("道具操作流程异常:", error);
  //     UIManager.ins.showToast(t("tips.networkError"));
  //   }
  // }

  /**
   * 检查订单支付状态
   * @param orderId 订单ID (创建订单时返回的order.oid)
   * @returns 订单是否支付成功
   */
  async checkOrder(orderId: string): Promise<ApiMsg<CheckOrderResponse>> {
    const response = await this.http.post<CheckOrderResponse>(
      '/checkorder',
      { order_id: orderId },
      { auth: true } // 需要认证
    );

    if (response.status >= 400 || !response.response?.success) {
      console.error('订单状态检查失败:', response);
      // UIManager.ins.showToast(t('tips.orderCheckFailed'));
    } else {
      console.log('订单状态检查成功:', response);
    }

    return response;
  }

  /**
   * 注册活动（领取奖励）
   * @returns 活动是否注册成功
   */
  async regActivity(): Promise<boolean> {
    const response = await this.http.post<RegActivityResponse>(
      '/regactivity',
      {}, // 空请求体
      { auth: true } // 需要认证
    );

    if (response.status >= 400 || !response.response?.success) {
      console.warn('没有注册奖励:', response);
      // PopMgr.ins.popLayer.showLabelTips(i18n.t('tips.activityRegistrationFailed'));
    } else {
      console.log('注册奖励领取成功:', response);
    }

    return response.response?.success;
  }





  /**
   * 加入频道
   */
  // joinChannel() {
  //   if (CC_DEBUG) {
  //     console.log("joinChannel");
  //     EventManager.ins.emit(EVENT_NAME_ENUM.ACTIVATED);
  //     return;
  //   }
  //   let url = "https://t.me/GemJamChannel";
  //   Global.ins.openTelegramLink(url);
  // }

  /**
   * 加入群组
   */
  // joinGroup() {
  //   if (CC_DEBUG) {
  //     console.log("joinGroup");
  //     EventManager.ins.emit(EVENT_NAME_ENUM.ACTIVATED);
  //     return;
  //   }
  //   let url = "https://t.me/GemJamOffcialCommunity";
  //   Global.ins.openTelegramLink(url);
  // }

  /**
   * 去投票
   */
  // async toVote() {
  //   if (CC_DEBUG) {
  //     console.log("toVote");
  //     EventManager.ins.emit(EVENT_NAME_ENUM.ACTIVATED);
  //     return;
  //   }
  //   await ApiService.ins.reportTaskNotify(TaskNotifyType.Vote);
  //   let url = "https://t.me/tapps_bot/center?startapp=app_gemjam";
  //   Global.ins.openTelegramLink(url);
  // }

  /**
  * 分享游戏
  */
  // async shareGame(_gid?: number): Promise<ApiMsg<ShareRewardResponse>> {
  //   const response = await ApiService.ins.reportShare(_gid);
  //   if (CC_DEBUG) {
  //     console.log("shareGame");
  //     EventManager.ins.emit(EVENT_NAME_ENUM.ACTIVATED);
  //   } else {
  //     let shareText = '🚙 You’re no hero.\nYou’re a thief—on your first mission.\nNo weapons. Just speed and brains.\n💎 Get in. Grab the loot. Get out alive.\nBut this is just the beginning…';
  //     const encodedText = encodeURIComponent(shareText);
  //     let url = "https://t.me/share/url?url=https://t.me/GemJam_bot/gemjam?startapp=" + Global.ins.user.id + '&text=' + encodedText;
  //     Global.ins.openTelegramLink(url);
  //   }
  //   return response;
  // }

  /**
  * 分享游戏到X
   */
  // async shareGame_X(_gid?: number): Promise<ApiMsg<ShareRewardResponse>> {
  //   const response = await ApiService.ins.reportShare(_gid);

  //   if (CC_DEBUG) {
  //     console.log("shareGame");
  //     EventManager.ins.emit(EVENT_NAME_ENUM.ACTIVATED);
  //   }
  //   else {
  //     // 分离文本和URL，分别编码
  //     const rawText = t('tips.shareMessage');
  //     const appUrl = `https://t.me/GemJam_bot/gemjam?startapp=${Global.ins.user.id}`;

  //     // 使用Twitter官方推荐的参数格式：text + url
  //     const encodedText = encodeURIComponent(rawText);
  //     const encodedUrl = encodeURIComponent(appUrl);

  //     // 构造标准Twitter分享链接
  //     const twitterIntentUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
  //     console.log(twitterIntentUrl);
  //     Global.ins.openLink(twitterIntentUrl)
  //   }
  //   return response;
  // }


  /**
  * 获取免费金币
  * @returns 包含本次获取金币数和用户数据的响应
  */
  async getFreeGameCoin(): Promise<ApiMsg<FreeGameCoinResponse>> {
    const response = await this.http.post<FreeGameCoinResponse>(
      '/caidan',
      {}, // 空请求体
      { auth: true } // 需要token认证
    );

    if (response.response?.success) {
      // 更新全局用户数据
      // Global.ins.setUserData(response.response.data.userdata);
      console.log('获取免费金币成功:', response.response.data.gotcoin);
    } else {
      console.error('获取免费金币失败:', response);
      // 显示错误提示
      // PopMgr.ins.popLayer.showLabelTips(i18n.t('tips.getFreeCoinFailed'));
    }

    return response;
  }


  /**
   * 获取Telegram头像
   * @param iconUrl Telegram头像URL
   * @returns 包含base64编码的图片数据
   */
  async getTelegramAvatar(iconUrl: string): Promise<ApiMsg<AvatarResponse>> {
    const response = await this.http.post<AvatarResponse>(
      '/getAvatar',
      { iconurl: iconUrl },
      { auth: false, repeatMode: 'queue' } // 不需要认证
    );

    if (response.response?.success) {
      // console.log('头像获取成功:', response.response);
    }
    return response;
  }




  /**
 * 获取错误信息
 *
 * @param code 错误响应，可以是字符串或ErrorMsg对象
 * @returns 返回对应的错误提示信息，如果未找到则返回"未知错误"
 */
  getErrorMessage(response?: ApiResponse, defaultMsg: string = t('tips.networkError')) {
    if (!response || response.code == undefined) {
      return defaultMsg;
    }
    const key = ErrorMsg[response?.code]
    let msg = t('tips.' + key)
    if (msg) {
      return msg;
    }

    return defaultMsg;
  }

  /**
   * 显示错误信息
   *
   * @param response 错误响应，可以是字符串或ErrorMsg对象
   */
  showError(response: ApiMsg) {
    const msg = this.getErrorMessage(response?.response);
    AssistCtr.showToastTip(msg);
  }


  /**
   * 检查今日免广告状态
   * @returns 包含免广告次数的响应数据
   */
  async isAdFree(): Promise<number> {
    const response = await this.http.post<AdFreeResponse>(
      '/adfree',
      {},
      { auth: true } // 需要token认证
    );

    if (response.status === 200 && response.response?.success) {
      console.log('免广告状态:', response.response.data.today_ad_free);
      return response.response.data.today_ad_free;
    } else {
      console.log('获取免广告状态失败:', response);
      return 0;
    }
  }


  /**
  * 获取用户挖矿信息
  * @returns 挖矿信息响应
  */
  async getMineInfo(): Promise<ApiMsg<MiningInfoResponse>> {
    const response = await this.http.post<MiningInfoResponse>(
      '/getmineinfo',
      {},
      { auth: true }
    );

    if (response.response?.success) {
      console.log('获取挖矿信息成功:', response.response.data);
    }
    return response;
  }

  /**
   * 领取挖矿奖励
   * @param addr 钱包地址
   * @returns 奖励领取结果
   */
  async getMineReward(addr: string): Promise<ApiMsg<MiningRewardResponse>> {
    const response = await this.http.post<MiningRewardResponse>(
      '/getminereward',
      { addr },
      { auth: true }
    );

    if (response.response?.success) {
      console.log('领取挖矿奖励成功:', response.response.data);
    }
    return response;
  }

  /**
 * 在挖矿内点击看广告的时候上报
 * @returns 上报结果
 */
  async reportMineVideo(): Promise<ApiMsg<ApiResponse>> {
    const response = await this.http.post<ApiResponse>(
      '/reportminevideo',
      {},
      { auth: true }
    );

    if (response.response?.success) {
      console.log('广告点击上报成功');
    }
    return response;
  }

  /**
  * 执行挖矿操作
  * @returns 挖矿结果
  */
  async mining(): Promise<ApiMsg<MiningResponse>> {
    const response = await this.http.post<MiningResponse>(
      '/mining',
      {},
      { auth: true }
    );

    if (response.response?.success) {
      console.log('挖矿成功:', response.response.data);
    }
    return response;
  }

  /**
 * 设置挖矿翻倍
 * @param type 翻倍类型
 * @returns 翻倍操作结果
 */
  async minerewarddouble(type: number): Promise<ApiMsg<MineRewardDoubleResponse>> {
    const response = await this.http.post<MineRewardDoubleResponse>(
      '/minerewarddouble',
      { t: type },
      { auth: true }
    );

    if (response.status === 200 && response.response?.success) {
      console.log('挖矿翻倍设置成功:', response.response.data);
    }
    return response;
  }

  /**
  * 获取挖矿邀请列表
  * @returns 包含挖矿邀请列表的响应
  */
  async getmineinvitelist(): Promise<ApiMsg<MineInviteListResponse>> {
    const response = await this.http.post<MineInviteListResponse>(
      '/getmineinvitelist',
      {},
      { auth: true }
    );

    if (response.status === 200 && response.response?.success) {
      console.log('挖矿邀请列表获取成功:', response.response.data.list);
    }
    return response;
  }

  /**
  * 获取代理广告配置
  * @param inviter 当前玩家的邀请者ID
  * @returns 代理广告配置列表
  */
  async getAgentAdConfig(inviter: number): Promise<ApiMsg<AgentAdConfigResponse>> {
    if (!inviter) {
      return { status: 400, message: '', response: null };
    }
    const response = await this.http.post<AgentAdConfigResponse>(
      '/agentadconfig',
      { inviter },
      { auth: false } // 不需要认证
    );

    if (response.response?.success) {
      console.log('代理广告配置获取成功:', response.response.data);
    } else {
      console.warn('获取代理广告配置失败:', response);
    }

    return response;
  }

  /**
  * 获取邮件列表
  * @param pageNo 页码（从0开始）
  * @param pageSize 每页数据数量
  * @returns 邮件列表数据
  */
  async getMailList(
    pageNo: number = 0,
    pageSize: number = 15
  ): Promise<ApiMsg<MailListResponse>> {
    const response = await this.http.post<MailListResponse>(
      '/getmail',
      { pageNo, pageSize },
      { auth: true } // 需要认证
    );

    if (response.response?.success) {
      console.log('邮件列表获取成功:', response.response.data);
    } else {
      console.warn('邮件列表获取失败:', response);
    }
    return response;
  }


  /**
  * 阅读/领取邮件
  * @param mailId 邮件ID
  * @param state 操作类型：1=阅读邮件，2=领取奖励，4=删除邮件
  * @returns 操作结果（领取奖励时包含用户数据）
  */
  // async readMail(mailId: number, state: number): Promise<ApiMsg<ReadMailResponse>> {
  //   const response = await this.http.post<ReadMailResponse>(
  //     '/readmail',
  //     { mail_id: mailId, state },
  //     { auth: true } // 需要认证
  //   );

  //   if (response.status === 200 && response.response?.success) {
  //     console.log('邮件操作成功:', response.response);

  //     // 如果领取奖励成功，更新本地用户数据
  //     if (state === 2 && response.response.data?.userdata) {
  //       Global.ins.setUserData(response.response.data.userdata);
  //       EventManager.ins.emit(EVENT_NAME_ENUM.UPDATE_MAIL);
  //     }
  //   } else {
  //     console.warn('邮件操作失败:', response);
  //   }
  //   return response;
  // }

  /**
  * 获取换量任务列表
  * @returns 换量任务列表
  */
  async getExchangeTaskList(): Promise<ApiMsg<ExchangeTaskListResponse>> {
    const response = await this.http.post<ExchangeTaskListResponse>(
      '/getexchangetasklist',
      {}, // 空请求体
      { auth: true } // 需要认证
    );

    if (response.status === 200 && response.response?.success) {
      console.log('换量任务列表获取成功:', response.response.data);
    } else {
      console.warn('换量任务列表获取失败:', response);
    }
    return response;
  }

  /**
   * 通知完成换量任务
   * @param tid 任务ID
   * @returns 操作结果
   */
  async completeExchangeTask(tid: number): Promise<ApiMsg<ApiResponse>> {
    const response = await this.http.post<ApiResponse>(
      '/completeexchangetask',
      { tid },
      { auth: true } // 需要认证
    );

    if (response.status === 200 && response.response?.success) {
      console.log(`任务 ${tid} 完成上报成功`);
    } else {
      console.warn(`任务 ${tid} 完成上报失败:`, response);
    }
    return response;
  }

  /**
   * 领取换量任务奖励
   * @param tid 任务ID
   * @returns 更新后的用户数据
   */
  async getExchangeTaskReward(tid: number): Promise<ApiMsg<ExchangeTaskRewardResponse>> {
    const response = await this.http.post<ExchangeTaskRewardResponse>(
      '/getexchangetaskreward',
      { tid },
      { auth: true } // 需要认证
    );

    if (response.status === 200 && response.response?.success) {
      console.log(`任务 ${tid} 奖励领取成功`);
      // 更新全局用户数据
      Global.ins.setUserData(response.response.data.userdata);
    }
    return response;
  }


  // ===================================卡包================================

  /**
 * 获取游戏配置信息
 *
 * @returns 返回获取的配置信息
 */
  async getCardPackConfigs(): Promise<CardPackConfigResponse> {
    const response = await this.http.post<CardPackConfigResponse>('/getcardpackconfig', null, { auth: false });
    if (response.status >= 400) {
      return null;
    }
    Global.ins.cardPackConfig = response.response.data;
    console.log('getcardpackconfig  getcardpackconfig:', Global.ins.cardPackConfig);
    return response.response;
  }

  /**
    *   // 获取系列列表
    * @returns 获取系列列表结果
    */
  async seriesList(): Promise<ApiMsg<CardListResponse>> {
    const response = await this.http.post<CardListResponse>(
      '/getserieslist',
      {},
      { auth: true }
    );

    if (response.response?.success) {
      console.log('获取系列列表结果:', response.response.data);
    }
    return response;
  }
  /**
    *  获取系列详情 带token，{"series_id": 1}  
    * @returns 获取系列详情结果
    */
  async seriesDetail(series_id: number): Promise<ApiMsg<CardDetailResponse>> {
    const response = await this.http.post<CardDetailResponse>(
      '/getseriesdetail',
      { series_id },
      { auth: true }
    );

    if (response.response?.success) {
      console.log('获取系列详情结果:', response.response.data);
    }
    return response;
  }

  /**
   *   // 获取碎片数量
   * @returns 获取碎片数量结果
   */
  async cardDebris(): Promise<ApiMsg<CardDebrisResponse>> {
    const response = await this.http.post<CardDebrisResponse>(
      '/getcarddebris',
      {},
      { auth: true }
    );

    if (response.response?.success) {
      console.log('获取碎片结果:', response.response.data);
    }
    return response;
  }

  /**
  *   // 获取收藏的系列
  * @returns 获取收藏的系列结果
  */
  async collectedSeries(): Promise<ApiMsg<CollectedSerieResponse>> {
    const response = await this.http.post<CollectedSerieResponse>(
      '/getcollectedseries',
      {},
      { auth: true }
    );

    if (response.response?.success) {
      console.log('获取收藏的系列结果:', response.response.data);
    }
    return response;
  }

  /**
  *   // 获取收藏的卡牌
  * @returns 获取收藏的卡牌结果  /getcollectedcards  带token，{"pageNo": 0, "pageSize": 15}   // 获取收藏的卡牌
  */
  async collectedCards(pageNo: number = 0, pageSize: number = 15): Promise<ApiMsg<CollectedCardsResponse>> {
    const response = await this.http.post<CollectedCardsResponse>(
      '/getcollectedcards',
      { pageNo, pageSize },
      { auth: true }
    );

    if (response.response?.success) {
      console.log('获取收藏的卡牌结果:', response.response.data);
    }
    return response;
  }

  /**
    *   // 获取拥有卡包的列表
    * @returns 获取拥有卡包的列表结果  /getownedpackslist  带token就行  // 获取拥有卡包的列表
    */
  async ownedPacksList(): Promise<ApiMsg<OwnedPacksListResponse>> {
    const response = await this.http.post<OwnedPacksListResponse>(
      '/getownedpackslist',
      {},
      { auth: true }
    );

    if (response.response?.success) {
      console.log('获取拥有卡包的列表结果:', response.response.data);
    }
    return response;
  }

  /**
    *  开包
    *  pack_id
    *  count
    * @returns 开包结果 
    */
  async openCardPacks(pack_id: number, count: number): Promise<ApiMsg<OpenCardPacksResponse>> {
    const response = await this.http.post<OpenCardPacksResponse>(
      '/opencardpacks',
      { pack_id, count },
      { auth: true }
    );

    if (response.response?.success) {
      console.log('开包列表结果:', response.response.data);
    }
    return response;
  }

  /**
    * 收藏
    * 传{"card_id": 卡片id}// 收藏卡牌 ，传{"series_id": 系列id}  // 收藏系列
    * isSeries:number 1=系列 0=卡片
    * @returns 收藏结果 
    */
  async cardCollect(isSeries: number, id: number): Promise<ApiMsg<CardCollectResponse>> {
    let response = null;
    if (isSeries == 1) {
      response = await this.http.post<CardCollectResponse>(
        '/cardpack/collect',
        { series_id: id },
        { auth: true }
      );
    } else {
      response = await this.http.post<CardCollectResponse>(
        '/cardpack/collect',
        { card_id: id },
        { auth: true }
      );
    }

    if (response.response?.success) {
      console.log('收藏结果:', response.response.success);
    }
    return response;
  }

  /**
    * 取消收藏
    * 传{"card_id": 卡片id}// 取消收藏卡牌 ，传{"series_id": 系列id} // 取消收藏系列
    * @returns 取消收藏结果 
    */
  async cardUnCollect(isSeries: number, id: number): Promise<ApiMsg<CardUnCollectResponse>> {
    let response = null;
    if (isSeries == 1) {
      response = await this.http.post<CardUnCollectResponse>(
        '/cardpack/uncollect',
        { series_id: id },
        { auth: true }
      );
    } else {
      response = await this.http.post<CardUnCollectResponse>(
        '/cardpack/uncollect',
        { card_id: id },
        { auth: true }
      );
    }

    if (response.response?.success) {
      console.log('取消收藏结果:', response.response.success);
    }
    return response;
  }


  /**
   * 分解卡牌
   *  {"card_id": 卡牌id,"count": 数量}  // 分解卡牌
   * @returns 分解结果 
   */
  async cardDecompose(card_id: number, count: number): Promise<ApiMsg<CardDecomposeResponse>> {
    let response = await this.http.post<CardDecomposeResponse>(
      '/cardpack/decompose',
      { card_id: card_id, count: count },
      { auth: true }
    );

    if (response.response?.success) {
      console.log('分解卡牌结果:', response.response.success);
    }
    return response;
  }

  /**
    * 合成卡片
    *  {"card_id": 卡片id}
    * @returns 合成结果 
    */
  async cardCompose(card_id: number): Promise<ApiMsg<CardComposeResponse>> {
    let response = await this.http.post<CardComposeResponse>(
      '/cardpack/compose',
      { card_id: card_id },
      { auth: true }
    );

    if (response.response?.success) {
      console.log('合成结果:', response.response.success);
    }
    return response;
  }


  /**
  * 出售卡牌
  * {"card_id": 卡牌id,"count": 数量}        // 出售卡牌
  * @returns 分解结果 
  */
  async sellCard(card_id: number, count: number): Promise<ApiMsg<SellCardResponse>> {
    let response = await this.http.post<SellCardResponse>(
      '/cardpack/sell',
      { card_id: card_id, count: count },
      { auth: true }
    );

    if (response.response?.success) {
      console.log('出售卡牌结果:', response.response.success);
    }
    return response;
  }

  /**
  * 领取系列奖励
  * {"series_id": 系列id} //领取系列奖励
  * @returns 领取系列奖励结果 
  */
  async getReward(series_id: number): Promise<ApiMsg<GetRewardResponse>> {
    let response = await this.http.post<GetRewardResponse>(
      '/cardpack/getreward',
      { series_id: series_id },
      { auth: true }
    );

    if (response.response?.success) {
      console.log('领取系列奖励结果:', response.response.data);
    }
    return response;
  }

  /**
   * 购买卡包
   * @param skuid 卡包id
   * @param num 购买数量
   * @param order_type 订单类型，3=购买卡包
   * @param pay_type 支付类型，"usd"或"game_coin"
   * @param payment_from 来源，"或"playdeck"或"azen"或"azen-app"
   * @returns 支付订单信息
   */

  async buyCardPacks(skuid: number, num: number, order_type: number = 3, pay_type: string, payment_from: string): Promise<ApiMsg<BuyPropResponse>> {
    let params = {
      skuid: skuid,
      num: num,
      order_type: order_type,
      pay_type: pay_type, // "usd"或"game_coin"
      payment_from: "" // ""或"playdeck"或"azen"或"azen-app"
    }
    if (window?.playdeckIsOpen) {
      params["payment_from"] = "playdeck"
    }
    const response = await this.http.post<BuyPropResponse>(
      '/buycardpacks',
      params,
      { auth: true }
    );

    if (response.response?.success) {
      console.log('商城卡包道具订单创建成功:', response.response.data);
    }
    return response;
  }


  /**
    * 购买卡包操作流程封装
     * @param skuid 卡包id
   * @param num 购买数量
   * @param order_type 订单类型，3=购买卡包
   * @param pay_type 支付类型，"usd"或"game_coin"
   * @param payment_from 来源，"或"playdeck"或"azen"或"azen-app"
   * @returns 支付订单信息
    */
  // async buyCardPacksFun(successCallback: Function, skuid: number, num: number, order_type: number = 3,
  //   pay_type: string, payment_from: string): Promise<void> {

  //   const buyResult = await this.buyCardPacks(skuid, num, order_type, pay_type, payment_from);
  //   if (buyResult.status != 200 || !buyResult.response?.success) {
  //     UIManager.ins.showToast(t("tips.orderCreateFailed"));
  //     return;
  //   }

  //   if (CC_DEBUG) {
  //     let oid = buyResult.response.data.order.oid;
  //     await ApiService.ins.getPurchasedone(oid);
  //     UIManager.ins.showToast(t("tips.purchaseSuccess"));
  //     return;
  //   }

  //   try {
  //     let rsp = buyResult.response;
  //     await new Promise((resolve) => {
  //       Global.ins.payment(rsp.data.order, async (status) => {
  //         console.log(`tg star pay status :${status}`);
  //         const checkFun = async (count: number) => {
  //           const m = await ApiService.ins.checkOrder(rsp.data.order.oid);
  //           if (m.status === 200 && m.response?.success) {
  //             UIManager.ins.showToast(t("tips.purchaseSuccess"));
  //             successCallback();
  //             // ApiService.ins.getUserProplist();
  //             resolve(true);
  //           } else {
  //             if (--count > 0) {
  //               console.log('checkOrder again', count);
  //               await new Promise(resolve => setTimeout(resolve, 2000));
  //               await checkFun(count);
  //             }
  //             else {
  //               ApiService.ins.showError(m);
  //             }
  //             resolve(false);
  //           }
  //         }

  //         if (status === "paid") {
  //           // 4. 确认订单支付状态
  //           //这里处理检查订单，请求checkorder
  //           await checkFun(5);
  //         }
  //         else {
  //           console.log("tg star pay status :" + status);
  //           resolve(false);
  //         }
  //       })
  //     });

  //   } catch (error) {
  //     console.log('handlePropOperation error', error);
  //     UIManager.ins.showToast(t("tips.paymentPending"));
  //   }
  // }
}