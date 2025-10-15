import util from "../util/util";

let propPacakgeName = ["", "开局道具包", "局内道具包"]

const { ccclass, property } = cc._decorator;

@ccclass
export default class PageSignReward extends cc.Component {

    @property(cc.Label)
    private lable_reward: cc.Label = null;

    @property(cc.SpriteFrame)
    private bg_image_list: Array<cc.SpriteFrame> = [];

    @property(cc.Sprite)
    private img_frame: cc.Sprite = null;

    @property(cc.Label)
    private day_label: cc.Label = null;

    @property(cc.Node)
    private check_node: cc.Node = null;

    @property(cc.Node)
    private img_signMask: cc.Node = null;

    private day = null;
    private _data: SignInConfig = null;
    private rewards = null;
    init(data: SignInConfig, key: number, curDay: number, isSginedToday?: boolean) {
        this._data = data;
        this.day_label.string = data.day.toString();
        this.rewards = JSON.parse(data.rewards);
        this.lable_reward.string = this.rewards[0][2].toString();
        this.img_frame.spriteFrame = this.bg_image_list[0];
        if (key == curDay && !isSginedToday) {
            this.img_frame.spriteFrame = this.bg_image_list[1];
        }

        this.check_node.active = false
        if ((curDay > key) || (curDay == key && isSginedToday)) {
            this.check_node.active = true
        }
        this.img_signMask.active = key > curDay;
    }


};
