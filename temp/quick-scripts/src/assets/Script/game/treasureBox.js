"use strict";
cc._RF.push(module, 'a74852h5rVLLpTCdL7pT2sB', 'treasureBox');
// Script/game/treasureBox.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var baseTs_1 = require("../base/baseTs");
var NameTs_1 = require("../common/NameTs");
var pageTs_1 = require("../common/pageTs");
var UrlConst_1 = require("../server/UrlConst");
var soundController_1 = require("../soundController");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var treasureBox = /** @class */ (function (_super) {
    __extends(treasureBox, _super);
    function treasureBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.treasure = null;
        // LIFE-CYCLE CALLBACKS:
        //当前宝箱id
        _this.nowId = null;
        //宝箱时间
        _this.time = null;
        //金币
        _this.coin = 0;
        //剩余次数
        _this.treasureNum = 20;
        return _this;
    }
    treasureBox.prototype.onLoad = function () {
        var _this = this;
        cc.game.on(NameTs_1.default.Game_Treasure_StartTime, function () {
            _this.treasureNum -= 1;
            _this.treasure.active = false;
            _this.time = 180;
        }, this);
        //fix bug
        util_1.default.getdataStr({
            url: UrlConst_1.UrlConst.treasureBox_residual,
            success: function (res) {
                if (!_this.isValid) {
                    return;
                }
                _this.treasureNum = res.times;
                console.log(util_1.default.userData.noviceGuide, 'util.userData.noviceGuide');
                if (util_1.default.userData.noviceGuide == -1) {
                    _this.time = 0;
                }
                // if(this.treasureNum>0&&this.time==0){
                //     this.flyAni();
                // }
            }
        });
        cc.game.on(NameTs_1.default.Game_Treasure_Show, function () {
            _this.time = 0;
        }, this);
    };
    treasureBox.prototype.start = function () {
    };
    /**
     * 起飞
     */
    treasureBox.prototype.flyAni = function () {
        // XMSDK.post({
        // url: UrlConst.treasureBox_Isget,
        //     onSuccess: res => {
        //         if (res.code === 0 && res.data && res.data.showBox != 1) {       //领取过
        //             return null;
        //         }
        //         else {
        //             let data = jsonSingleton.singleton.getJson(NameTs.treasureData);
        //             let treasureId: number = null;
        //             for (let i = 0; i < data.length; i++) {
        //                 let item = data[i];
        //                 if (item.min <= util.userData.turretLevel && item.max > util.userData.turretLevel) {
        //                     treasureId = item.id;
        //                     break;
        //                 }
        //             }
        //             if (treasureId) {
        //                 let checkId = (id) => {
        //                     return id == treasureId;
        //                 }
        //                 let isExist: boolean = util.userData.haveTreasure.some(checkId);
        //                 if (isExist) {
        //                     return null;
        //                 } else {                            
        //                     if (this.nowId == treasureId) {
        //                         return;
        //                     }
        //                     this.nowId = treasureId;
        console.log("漂浮宝箱出现");
        this.treasure.active = true;
        TrackMgr_1.default.airborne_treasure({
            activity_state: "漂浮宝箱出现"
        });
        //                 }                       
        //             }
        //         }
        //     },
        //     onFail: err => {
        //     }
        // }
        // )
        // let id:number = util.checkTreasureShow();
        // if(this.nowId==id){
        //     return;
        // }
        // this.nowId = id;
        // this.treasure.active = true;
        // TrackMgr.airborne_treasure({
        //     activity_state: "漂浮宝箱出现"
        // });
    };
    /**点击宝箱 */
    treasureBox.prototype.clickBtn = function () {
        // if(util.userData.noviceGuide!==-1)return;
        // this.treasure.active = false;
        soundController_1.default.singleton.clickAudio();
        this.showPage(pageTs_1.default.pageName.GameTreasure);
        TrackMgr_1.default.airborne_treasure({
            activity_state: "打开漂浮宝箱"
        });
    };
    treasureBox.prototype.update = function (dt) {
        if (this.time == null || this.treasureNum <= 0)
            return;
        this.time -= dt;
        if (this.time <= 0) {
            this.time = null;
            this.flyAni();
        }
    };
    __decorate([
        property({ type: cc.Node, displayName: "宝箱" })
    ], treasureBox.prototype, "treasure", void 0);
    treasureBox = __decorate([
        ccclass
    ], treasureBox);
    return treasureBox;
}(baseTs_1.default));
exports.default = treasureBox;

cc._RF.pop();