
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/ui/turretBuy.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '796adA9zfhNt7qa0rj7i0GM', 'turretBuy');
// Script/ui/turretBuy.ts

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
var soundController_1 = require("../soundController");
var TrackMgr_1 = require("../TrackMgr/TrackMgr");
var tool_1 = require("../util/tool");
var util_1 = require("../util/util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var turretBuy = /** @class */ (function (_super) {
    __extends(turretBuy, _super);
    function turretBuy() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.touchNode = null; //用于拖动位置的
        _this.buyBtnNode = null; //购买按钮
        _this.levelLabel = null;
        _this.videoNum = null;
        _this.paoBody = null;
        //接触时间
        _this.touchTime = 0;
        //是否在接触
        _this.isTouch = false;
        _this.level = null;
        _this.turretNum = 0;
        return _this;
    }
    turretBuy.prototype.onLoad = function () {
        var _this = this;
        this.setVideoNum();
        var initPos = this.node.getPosition();
        this.node.on(cc.Node.EventType.TOUCH_START, function () {
            TrackMgr_1.default.AppClick({
                app_page_title: "首页",
                app_ck_module: "炮塔",
                app_exposure_type: "banner",
            });
            _this.touchTime = 0;
            _this.isTouch = true;
            cc.tween(_this.buyBtnNode).to(.1, { scale: 1.1 }).start();
            cc.tween(_this.node).to(.1, { scale: 1.1 }).start();
        }, this);
        //预加载空降炮塔信息流
        // if(!util.adPreObj[AdPosition.GetOtherTurretView]&&util.userData.product==5){
        //     util.preloadAd(AdPosition.GetOtherTurretView,true);
        // }
        // if(util.userData.product==0&&!util.adPreObj[AdPosition.GetTurretView]){
        //     util.preloadAd(AdPosition.GetTurretView,true);
        // }
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            if (util_1.default.userData.noviceGuide == 1 || util_1.default.userData.product == 0)
                return;
            var movePos = event.getDelta();
            _this.node.x += movePos.x;
            _this.node.y += movePos.y;
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            soundController_1.default.singleton.clickAudio();
            if (util_1.default.checkTestB(NameTs_1.default.new_hand_test)) {
                if (util_1.default.userData.noviceGuide == 2) {
                    cc.game.emit(NameTs_1.default.Game_Turret_Creator);
                    TrackMgr_1.default.rookie_process_2({
                        activity_state: "点击任意位置购买炮塔"
                    });
                    cc.game.emit(NameTs_1.default.Game_Novice_Open, 3);
                    return;
                }
            }
            else if (util_1.default.userData.noviceGuide == 1) {
                cc.game.emit(NameTs_1.default.Game_Turret_Creator);
                cc.game.emit(NameTs_1.default.Game_Novice_Open, 2);
                return;
            }
            if (util_1.default.userData.product == 5 && Math.random() < .5 && util_1.default.userData.airborneCount > 0) {
                _this.showPage(pageTs_1.default.pageName.GameGetOtherTurret, _this.level);
                return;
            }
            else {
                console.log("不出现天降炮塔!");
            }
            //预加载空降炮塔信息流
            // if(!util.adPreObj[AdPosition.GetOtherTurretView]&&util.userData.product==6){
            //     util.preloadAd(AdPosition.GetOtherTurretView,true);
            // }
            if (util_1.default.userData.product == 1) {
                // if(!util.adPreObj[AdPosition.GetTurretView]){
                //     util.preloadAd(AdPosition.GetTurretView,true);
                // }
                _this.setVideoNum();
            }
            if (util_1.default.userData.product == 0 && util_1.default.userData.GetTurretNum > 0) {
                _this.showPage(pageTs_1.default.pageName.GameGetVideoTurret, { num: _this.turretNum });
                return;
            }
            if (_this.touchTime < .3) {
                cc.game.emit(NameTs_1.default.Game_Turret_Creator, { level: _this.level });
            }
            else {
                var poolBox = _this.touchNode;
                var pos = _this.node.getParent().convertToWorldSpaceAR(_this.node.getPosition());
                pos = poolBox.convertToNodeSpaceAR(pos);
                util_1.default.checkTouchPool(pos, function (num) {
                    if (num !== 100 && num && util_1.default.checkNoExist(num)) {
                        cc.game.emit(NameTs_1.default.Game_Turret_Creator, { level: _this.level, location: num });
                    }
                });
            }
            soundController_1.default.singleton.clickAudio();
            _this.node.setPosition(initPos);
            cc.tween(_this.buyBtnNode).to(.1, { scale: 1 }).start();
            cc.tween(_this.node).to(.1, { scale: 1 }).start();
            TrackMgr_1.default.AppClick({
                app_page_title: "首页",
                app_ck_module: "放置炮塔",
                app_exposure_type: "banner",
            });
        }, this);
        cc.game.on(NameTs_1.default.Game_Buy_update, function () {
            _this.setLevel();
        }, this);
        this.setLevel();
    };
    turretBuy.prototype.start = function () {
    };
    /**
     * 更新炮塔
     */
    turretBuy.prototype.setLevel = function () {
        this.level = util_1.default.getBuyRandomLevel();
        this.levelLabel.string = String(this.level);
        //炮塔属性
        this.turretData = util_1.default.GetTurretData(this.level);
        // this.loadSprite("body",res=>{
        //     this.paoBody.spriteFrame = res;
        // });
        // this.loadSprite("foot",res=>{
        //     this.paoFoot.spriteFrame = res;
        // });
        this.loadSpine(this.paoBody, "pao");
    };
    turretBuy.prototype.update = function (dt) {
        if (this.isTouch) {
            this.touchTime += dt;
        }
    };
    /**
     * 设置视频炮塔数量
     */
    turretBuy.prototype.setVideoNum = function () {
        this.turretNum = tool_1.default.GetRandom(8, 12);
        this.videoNum.string = "+" + this.turretNum;
    };
    /**
     * 加载图片
     */
    // loadSprite(name:string,call:Function){
    //     cc.resources.load("/texture/turret/"+name+"_"+this.level,cc.SpriteFrame,(err,res:cc.SpriteFrame)=>{
    //         if(err){
    //             console.error("找不到该图片",err);
    //             return;
    //         }
    //         call(res);
    //     });
    // }
    /**
     * 加载图片
     */
    turretBuy.prototype.loadSpine = function (spine, name) {
        //console.log(this.turretData,'name==========')
        var _this = this;
        cc.resources.load("spine/turret/" + this.turretData.DynamicResources + "/" + name + "/" + this.turretData.spineName, sp.SkeletonData, function (error, sp) {
            spine.skeletonData = sp;
            _this.paoBody.node.y = Number(_this.turretData.buyY);
        });
    };
    __decorate([
        property(cc.Node)
    ], turretBuy.prototype, "touchNode", void 0);
    __decorate([
        property(cc.Node)
    ], turretBuy.prototype, "buyBtnNode", void 0);
    __decorate([
        property({ displayName: "等级", type: cc.Label })
    ], turretBuy.prototype, "levelLabel", void 0);
    __decorate([
        property({ displayName: "视频炮塔", type: cc.Label })
    ], turretBuy.prototype, "videoNum", void 0);
    __decorate([
        property({ type: sp.Skeleton, displayName: "炮" })
    ], turretBuy.prototype, "paoBody", void 0);
    turretBuy = __decorate([
        ccclass
    ], turretBuy);
    return turretBuy;
}(baseTs_1.default));
exports.default = turretBuy;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFx1aVxcdHVycmV0QnV5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFvQztBQUVwQywyQ0FBc0M7QUFDdEMsMkNBQXNDO0FBRXRDLHNEQUFpRDtBQUNqRCxpREFBNEM7QUFDNUMscUNBQWdDO0FBQ2hDLHFDQUFnQztBQUUxQixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF1Qyw2QkFBTTtJQUE3QztRQUFBLHFFQW9OQztRQWpORyxlQUFTLEdBQVcsSUFBSSxDQUFDLENBQUMsU0FBUztRQUduQyxnQkFBVSxHQUFXLElBQUksQ0FBQyxDQUFDLE1BQU07UUFHakMsZ0JBQVUsR0FBYSxJQUFJLENBQUM7UUFJNUIsY0FBUSxHQUFhLElBQUksQ0FBQztRQUcxQixhQUFPLEdBQWdCLElBQUksQ0FBQztRQUU1QixNQUFNO1FBQ0UsZUFBUyxHQUFVLENBQUMsQ0FBQztRQUM3QixPQUFPO1FBQ0MsYUFBTyxHQUFXLEtBQUssQ0FBQztRQUV4QixXQUFLLEdBQVUsSUFBSSxDQUFDO1FBSXBCLGVBQVMsR0FBVSxDQUFDLENBQUM7O0lBeUxqQyxDQUFDO0lBdkxHLDBCQUFNLEdBQU47UUFBQSxpQkEwR0M7UUF4R0csSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRW5CLElBQUksT0FBTyxHQUFZLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDL0MsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFDO1lBQ3ZDLGtCQUFRLENBQUMsUUFBUSxDQUFDO2dCQUNkLGNBQWMsRUFBRSxJQUFJO2dCQUNwQixhQUFhLEVBQUUsSUFBSTtnQkFDbkIsaUJBQWlCLEVBQUUsUUFBUTthQUM5QixDQUFD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RSxDQUFDO1lBQ3hCLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2RCxDQUFDLENBQUMsQ0FBQztJQUVQLENBQUM7SUFoTkQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztnREFDTztJQUd6QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2lEQUNRO0lBRzFCO1FBREMsUUFBUSxDQUFDLEVBQUMsV0FBVyxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLEtBQUssRUFBQyxDQUFDO2lEQUNmO0lBSTVCO1FBREMsUUFBUSxDQUFDLEVBQUMsV0FBVyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLEtBQUssRUFBQyxDQUFDOytDQUNuQjtJQUcxQjtRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsUUFBUSxFQUFDLFdBQVcsRUFBQyxHQUFHLEVBQUMsQ0FBQzs4Q0FDakI7SUFoQlgsU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQW9ON0I7SUFBRCxnQkFBQztDQXBORCxBQW9OQyxDQXBOc0MsZ0JBQU0sR0FvTjVDO2tCQXBOb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBiYXNlVHMgZnJvbSBcIi4uL2Jhc2UvYmFzZVRzXCI7XG5pbXBvcnQgeyBBZFBvc2l0aW9uIH0gZnJvbSBcIi4uL2NvbW1vbi9BZFBvc2l0aW9uXCI7XG5pbXBvcnQgTmFtZVRzIGZyb20gXCIuLi9jb21tb24vTmFtZVRzXCI7XG5pbXBvcnQgcGFnZVRzIGZyb20gXCIuLi9jb21tb24vcGFnZVRzXCI7XG5pbXBvcnQgQWRDb250cm9sbGVyIGZyb20gXCIuLi9zZXJ2ZXIveG1zZGtfY29jb3MvQUQvQWRDb250cm9sbGVyXCI7XG5pbXBvcnQgc291bmRDb250cm9sbGVyIGZyb20gXCIuLi9zb3VuZENvbnRyb2xsZXJcIjtcbmltcG9ydCBUcmFja01nciBmcm9tIFwiLi4vVHJhY2tNZ3IvVHJhY2tNZ3JcIjtcbmltcG9ydCB0b29sIGZyb20gXCIuLi91dGlsL3Rvb2xcIjtcbmltcG9ydCB1dGlsIGZyb20gXCIuLi91dGlsL3V0aWxcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB0dXJyZXRCdXkgZXh0ZW5kcyBiYXNlVHMge1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgdG91Y2hOb2RlOmNjLk5vZGUgPSBudWxsOyAvL+eUqOS6juaLluWKqOS9jee9rueahFxuICAgIFxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGJ1eUJ0bk5vZGU6Y2MuTm9kZSA9IG51bGw7IC8v6LSt5Lmw5oyJ6ZKuXG5cbiAgICBAcHJvcGVydHkoe2Rpc3BsYXlOYW1lOlwi562J57qnXCIsdHlwZTpjYy5MYWJlbH0pXG4gICAgbGV2ZWxMYWJlbDogY2MuTGFiZWwgPSBudWxsO1xuICAgIFxuICAgIFxuICAgIEBwcm9wZXJ0eSh7ZGlzcGxheU5hbWU6XCLop4bpopHngq7loZRcIix0eXBlOmNjLkxhYmVsfSlcbiAgICB2aWRlb051bTogY2MuTGFiZWwgPSBudWxsO1xuICAgIFxuICAgIEBwcm9wZXJ0eSh7dHlwZTpzcC5Ta2VsZXRvbixkaXNwbGF5TmFtZTpcIueCrlwifSlcbiAgICBwYW9Cb2R5OiBzcC5Ta2VsZXRvbiA9IG51bGw7XG5cbiAgICAvL+aOpeinpuaXtumXtFxuICAgIHByaXZhdGUgdG91Y2hUaW1lOm51bWJlciA9IDA7XG4gICAgLy/mmK/lkKblnKjmjqXop6ZcbiAgICBwcml2YXRlIGlzVG91Y2g6Ym9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSBsZXZlbDpudW1iZXIgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSB0dXJyZXREYXRhOmFueTtcblxuICAgIHByaXZhdGUgdHVycmV0TnVtOm51bWJlciA9IDA7XG5cbiAgICBvbkxvYWQgKCkge1xuXG4gICAgICAgIHRoaXMuc2V0VmlkZW9OdW0oKTtcblxuICAgICAgICBsZXQgaW5pdFBvczpjYy5WZWMyICA9IHRoaXMubm9kZS5nZXRQb3NpdGlvbigpO1xuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsKCk9PntcbiAgICAgICAgICAgIFRyYWNrTWdyLkFwcENsaWNrKHtcbiAgICAgICAgICAgICAgICBhcHBfcGFnZV90aXRsZTogXCLpppbpobVcIixcbiAgICAgICAgICAgICAgICBhcHBfY2tfbW9kdWxlOiBcIueCruWhlFwiLFxuICAgICAgICAgICAgICAgIGFwcF9leHBvc3VyZV90eXBlOiBcImJhbm5lclwiLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHRoaXMudG91Y2hUaW1lID0gMDtcbiAgICAgICAgICAgIHRoaXMuaXNUb3VjaCA9IHRydWU7XG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLmJ1eUJ0bk5vZGUpLnRvKC4xLHtzY2FsZToxLjF9KS5zdGFydCgpO1xuICAgICAgICAgICAgY2MudHdlZW4odGhpcy5ub2RlKS50byguMSx7c2NhbGU6MS4xfSkuc3RhcnQoKTtcbiAgICAgICAgfSx0aGlzKTtcbiAgICAgICAgXG5cbiAgICAgICAgXG4gICAgICAgIC8v6aKE5Yqg6L2956m66ZmN54Ku5aGU5L+h5oGv5rWBXG4gICAgICAgIC8vIGlmKCF1dGlsLmFkUHJlT2JqW0FkUG9zaXRpb24uR2V0T3RoZXJUdXJyZXRWaWV3XSYmdXRpbC51c2VyRGF0YS5wcm9kdWN0PT01KXtcbiAgICAgICAgLy8gICAgIHV0aWwucHJlbG9hZEFkKEFkUG9zaXRpb24uR2V0T3RoZXJUdXJyZXRWaWV3LHRydWUpO1xuICAgICAgICAvLyB9XG5cbiAgICAgICAgLy8gaWYodXRpbC51c2VyRGF0YS5wcm9kdWN0PT0wJiYhdXRpbC5hZFByZU9ialtBZFBvc2l0aW9uLkdldFR1cnJldFZpZXddKXtcbiAgICAgICAgLy8gICAgIHV0aWwucHJlbG9hZEFkKEFkUG9zaXRpb24uR2V0VHVycmV0Vmlldyx0cnVlKTtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLChldmVudCk9PntcbiAgICAgICAgICAgIGlmKHV0aWwudXNlckRhdGEubm92aWNlR3VpZGU9PTF8fHV0aWwudXNlckRhdGEucHJvZHVjdD09MClyZXR1cm47XG4gICAgICAgICAgICBsZXQgbW92ZVBvczpjYy5WZWMyID0gZXZlbnQuZ2V0RGVsdGEoKTtcbiAgICAgICAgICAgIHRoaXMubm9kZS54ICs9bW92ZVBvcy54O1xuICAgICAgICAgICAgdGhpcy5ub2RlLnkgKz1tb3ZlUG9zLnk7IFxuXG4gICAgICAgIH0sdGhpcyk7XG5cbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwoZXZlbnQpPT57XG4gICAgICAgICAgICBzb3VuZENvbnRyb2xsZXIuc2luZ2xldG9uLmNsaWNrQXVkaW8oKTtcbiAgICAgICAgICAgIGlmKHV0aWwuY2hlY2tUZXN0QihOYW1lVHMubmV3X2hhbmRfdGVzdCkpe1xuICAgICAgICAgICAgICAgIGlmKHV0aWwudXNlckRhdGEubm92aWNlR3VpZGU9PTIpe1xuICAgICAgICAgICAgICAgICAgICBjYy5nYW1lLmVtaXQoTmFtZVRzLkdhbWVfVHVycmV0X0NyZWF0b3IpO1xuICAgICAgICAgICAgICAgICAgICBUcmFja01nci5yb29raWVfcHJvY2Vzc18yKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2aXR5X3N0YXRlOlwi54K55Ye75Lu75oSP5L2N572u6LSt5Lmw54Ku5aGUXCJcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9Ob3ZpY2VfT3BlbiwzKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNlIGlmKHV0aWwudXNlckRhdGEubm92aWNlR3VpZGU9PTEpe1xuICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9UdXJyZXRfQ3JlYXRvcik7XG4gICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX05vdmljZV9PcGVuLDIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHV0aWwudXNlckRhdGEucHJvZHVjdD09NSYmTWF0aC5yYW5kb20oKTwuNSYmdXRpbC51c2VyRGF0YS5haXJib3JuZUNvdW50PjApe1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1BhZ2UocGFnZVRzLnBhZ2VOYW1lLkdhbWVHZXRPdGhlclR1cnJldCx0aGlzLmxldmVsKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuS4jeWHuueOsOWkqemZjeeCruWhlCFcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy/pooTliqDovb3nqbrpmY3ngq7loZTkv6Hmga/mtYFcbiAgICAgICAgICAgIC8vIGlmKCF1dGlsLmFkUHJlT2JqW0FkUG9zaXRpb24uR2V0T3RoZXJUdXJyZXRWaWV3XSYmdXRpbC51c2VyRGF0YS5wcm9kdWN0PT02KXtcbiAgICAgICAgICAgIC8vICAgICB1dGlsLnByZWxvYWRBZChBZFBvc2l0aW9uLkdldE90aGVyVHVycmV0Vmlldyx0cnVlKTtcbiAgICAgICAgICAgIC8vIH1cblxuICAgICAgICAgICAgaWYodXRpbC51c2VyRGF0YS5wcm9kdWN0PT0xKXtcbiAgICAgICAgICAgICAgICAvLyBpZighdXRpbC5hZFByZU9ialtBZFBvc2l0aW9uLkdldFR1cnJldFZpZXddKXtcbiAgICAgICAgICAgICAgICAvLyAgICAgdXRpbC5wcmVsb2FkQWQoQWRQb3NpdGlvbi5HZXRUdXJyZXRWaWV3LHRydWUpO1xuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICB0aGlzLnNldFZpZGVvTnVtKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHV0aWwudXNlckRhdGEucHJvZHVjdD09MCYmdXRpbC51c2VyRGF0YS5HZXRUdXJyZXROdW0+MCl7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UGFnZShwYWdlVHMucGFnZU5hbWUuR2FtZUdldFZpZGVvVHVycmV0LHtudW06dGhpcy50dXJyZXROdW19KTsgIFxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRoaXMudG91Y2hUaW1lPC4zKXsgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY2MuZ2FtZS5lbWl0KE5hbWVUcy5HYW1lX1R1cnJldF9DcmVhdG9yLHtsZXZlbDp0aGlzLmxldmVsfSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBsZXQgcG9vbEJveDpjYy5Ob2RlID0gdGhpcy50b3VjaE5vZGU7XG4gICAgICAgICAgICAgICAgbGV0IHBvczpjYy5WZWMyID0gdGhpcy5ub2RlLmdldFBhcmVudCgpLmNvbnZlcnRUb1dvcmxkU3BhY2VBUih0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSk7XG4gICAgICAgICAgICAgICAgcG9zID0gcG9vbEJveC5jb252ZXJ0VG9Ob2RlU3BhY2VBUihwb3MpO1xuICAgICAgICAgICAgICAgIHV0aWwuY2hlY2tUb3VjaFBvb2wocG9zLChudW0pPT57XG4gICAgICAgICAgICAgICAgICAgIGlmKG51bSE9PTEwMCYmbnVtJiZ1dGlsLmNoZWNrTm9FeGlzdChudW0pKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmdhbWUuZW1pdChOYW1lVHMuR2FtZV9UdXJyZXRfQ3JlYXRvcix7bGV2ZWw6dGhpcy5sZXZlbCxsb2NhdGlvbjpudW19KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc291bmRDb250cm9sbGVyLnNpbmdsZXRvbi5jbGlja0F1ZGlvKCk7XG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24oaW5pdFBvcyk7XG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLmJ1eUJ0bk5vZGUpLnRvKC4xLHtzY2FsZToxfSkuc3RhcnQoKTtcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMubm9kZSkudG8oLjEse3NjYWxlOjF9KS5zdGFydCgpO1xuICAgICAgICAgICAgVHJhY2tNZ3IuQXBwQ2xpY2soe1xuICAgICAgICAgICAgICAgIGFwcF9wYWdlX3RpdGxlOiBcIummlumhtVwiLFxuICAgICAgICAgICAgICAgIGFwcF9ja19tb2R1bGU6IFwi5pS+572u54Ku5aGUXCIsXG4gICAgICAgICAgICAgICAgYXBwX2V4cG9zdXJlX3R5cGU6IFwiYmFubmVyXCIsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSx0aGlzKTtcblxuICAgICAgICBjYy5nYW1lLm9uKE5hbWVUcy5HYW1lX0J1eV91cGRhdGUsKCk9PntcblxuICAgICAgICAgICAgdGhpcy5zZXRMZXZlbCgpO1xuXG4gICAgICAgIH0sdGhpcyk7XG5cbiAgICAgICAgdGhpcy5zZXRMZXZlbCgpO1xuICAgIH1cblxuICAgIHN0YXJ0ICgpIHtcblxuICAgIH1cbiAgICBcblxuICAgIC8qKlxuICAgICAqIOabtOaWsOeCruWhlFxuICAgICAqL1xuICAgIHNldExldmVsKCl7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmxldmVsID0gdXRpbC5nZXRCdXlSYW5kb21MZXZlbCgpO1xuICAgICAgICB0aGlzLmxldmVsTGFiZWwuc3RyaW5nID0gU3RyaW5nKHRoaXMubGV2ZWwpO1xuXG4gICAgICAgIC8v54Ku5aGU5bGe5oCnXG4gICAgICAgIHRoaXMudHVycmV0RGF0YSA9IHV0aWwuR2V0VHVycmV0RGF0YSh0aGlzLmxldmVsKTtcblxuICAgICAgICAvLyB0aGlzLmxvYWRTcHJpdGUoXCJib2R5XCIscmVzPT57XG4gICAgICAgIC8vICAgICB0aGlzLnBhb0JvZHkuc3ByaXRlRnJhbWUgPSByZXM7XG4gICAgICAgIC8vIH0pO1xuICAgICAgICAvLyB0aGlzLmxvYWRTcHJpdGUoXCJmb290XCIscmVzPT57XG4gICAgICAgIC8vICAgICB0aGlzLnBhb0Zvb3Quc3ByaXRlRnJhbWUgPSByZXM7XG4gICAgICAgIC8vIH0pO1xuXG4gICAgICAgIFxuICAgICAgICB0aGlzLmxvYWRTcGluZSh0aGlzLnBhb0JvZHksXCJwYW9cIik7XG5cbiAgICB9XG5cbiAgICB1cGRhdGUgKGR0KSB7XG5cbiAgICAgICAgaWYodGhpcy5pc1RvdWNoKXtcbiAgICAgICAgICAgIHRoaXMudG91Y2hUaW1lKz1kdDtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6K6+572u6KeG6aKR54Ku5aGU5pWw6YePXG4gICAgICovXG4gICAgc2V0VmlkZW9OdW0oKXtcblxuICAgICAgICB0aGlzLnR1cnJldE51bSA9IHRvb2wuR2V0UmFuZG9tKDgsMTIpO1xuXG4gICAgICAgIHRoaXMudmlkZW9OdW0uc3RyaW5nID0gXCIrXCIrdGhpcy50dXJyZXROdW07XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliqDovb3lm77niYdcbiAgICAgKi9cbiAgICAvLyBsb2FkU3ByaXRlKG5hbWU6c3RyaW5nLGNhbGw6RnVuY3Rpb24pe1xuICAgIC8vICAgICBjYy5yZXNvdXJjZXMubG9hZChcIi90ZXh0dXJlL3R1cnJldC9cIituYW1lK1wiX1wiK3RoaXMubGV2ZWwsY2MuU3ByaXRlRnJhbWUsKGVycixyZXM6Y2MuU3ByaXRlRnJhbWUpPT57XG5cbiAgICAvLyAgICAgICAgIGlmKGVycil7XG4gICAgLy8gICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIuaJvuS4jeWIsOivpeWbvueJh1wiLGVycik7XG4gICAgLy8gICAgICAgICAgICAgcmV0dXJuO1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICAgICAgY2FsbChyZXMpO1xuXG4gICAgLy8gICAgIH0pO1xuICAgIC8vIH1cblxuICAgIC8qKlxuICAgICAqIOWKoOi9veWbvueJh1xuICAgICAqL1xuICAgIGxvYWRTcGluZShzcGluZTpzcC5Ta2VsZXRvbixuYW1lOnN0cmluZyl7XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLnR1cnJldERhdGEsJ25hbWU9PT09PT09PT09JylcblxuICAgICAgICBjYy5yZXNvdXJjZXMubG9hZChcInNwaW5lL3R1cnJldC9cIit0aGlzLnR1cnJldERhdGEuRHluYW1pY1Jlc291cmNlcytcIi9cIituYW1lK1wiL1wiK3RoaXMudHVycmV0RGF0YS5zcGluZU5hbWUsc3AuU2tlbGV0b25EYXRhLCAoZXJyb3IsIHNwOnNwLlNrZWxldG9uRGF0YSkgPT4ge1xuICAgICAgICAgICAgc3BpbmUuc2tlbGV0b25EYXRhID0gc3A7XG4gICAgICAgICAgICB0aGlzLnBhb0JvZHkubm9kZS55ID0gTnVtYmVyKHRoaXMudHVycmV0RGF0YS5idXlZKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG59XG4iXX0=